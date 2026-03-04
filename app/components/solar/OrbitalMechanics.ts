import * as THREE from 'three';

export interface OrbitParams {
    radius: number;
    color?: number;
    segments?: number;
    lineWidth?: number;
    opacity?: number;
    eccentricity?: number;
    inclination?: number;
    ascendingNode?: number;
    argumentOfPeriapsis?: number;
}

export interface TransferParams {
    startRadius: number;
    endRadius: number;
    color?: number;
    segments?: number;
    lineWidth?: number;
    opacity?: number;
    startPosition?: THREE.Vector3;
    endPosition?: THREE.Vector3;
    inclination?: number;
    endPeriod?: number;
}

export class Orbit {
    protected geometry: THREE.BufferGeometry;
    protected material: THREE.LineBasicMaterial;
    protected line: THREE.Line;
    protected points: THREE.Vector3[] = [];
    protected params: OrbitParams;

    constructor(params: OrbitParams) {
        this.params = {
            color: 0x444444,
            segments: 360,
            lineWidth: 1,
            opacity: 0.5,
            eccentricity: 0,
            inclination: 0,
            ascendingNode: 0,
            argumentOfPeriapsis: 0,
            ...params
        };

        this.points = this.calculateOrbit();
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.material = new THREE.LineBasicMaterial({
            color: this.params.color,
            transparent: true,
            opacity: this.params.opacity,
            linewidth: this.params.lineWidth
        });
        this.line = new THREE.Line(this.geometry, this.material);
    }

    private calculateOrbitRadius(semiMajorAxis: number, eccentricity: number, theta: number): number {
        // Use the same approach as TransferOrbit for consistency
        const periapsis = semiMajorAxis * (1 - eccentricity);
        const apoapsis = semiMajorAxis * (1 + eccentricity);
        const a = (periapsis + apoapsis) / 2;
        const e = (apoapsis - periapsis) / (apoapsis + periapsis);
        return a * (1 - e * e) / (1 + e * Math.cos(theta));
    }

    protected calculateOrbit(): THREE.Vector3[] {
        const points: THREE.Vector3[] = [];
        const {
            radius: semiMajorAxis,
            segments = 360,
            eccentricity = 0,
            inclination = 0,
            ascendingNode = 0,
            argumentOfPeriapsis = 0
        } = this.params;

        // Apply rotations in same order as original
        const rotX = new THREE.Matrix4().makeRotationX(inclination);
        const rotY = new THREE.Matrix4().makeRotationY(ascendingNode);
        const rotZ = new THREE.Matrix4().makeRotationZ(argumentOfPeriapsis);

        // Create combined rotation matrix
        const rotMatrix = new THREE.Matrix4()
            .multiply(rotY)
            .multiply(rotX)
            .multiply(rotZ);

        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;

            // Calculate radius using the same approach as TransferOrbit
            const r = this.calculateOrbitRadius(semiMajorAxis, eccentricity, theta);

            const point = new THREE.Vector3(
                r * Math.cos(theta),
                0,
                r * Math.sin(theta)
            );

            // Apply orbital rotations
            point.applyMatrix4(rotMatrix);
            points.push(point);
        }

        return points;
    }

    getPosition(time: number): THREE.Vector3 {
        const theta = time % (Math.PI * 2);
        const {
            radius: semiMajorAxis,
            eccentricity = 0,
            inclination = 0,
            ascendingNode = 0,
            argumentOfPeriapsis = 0
        } = this.params;

        // Use same radius calculation as orbit points
        const r = this.calculateOrbitRadius(semiMajorAxis, eccentricity, theta);

        const position = new THREE.Vector3(
            r * Math.cos(theta),
            0,
            r * Math.sin(theta)
        );

        // Apply same rotations as orbit points
        const rotX = new THREE.Matrix4().makeRotationX(inclination);
        const rotY = new THREE.Matrix4().makeRotationY(ascendingNode);
        const rotZ = new THREE.Matrix4().makeRotationZ(argumentOfPeriapsis);

        position.applyMatrix4(new THREE.Matrix4()
            .multiply(rotY)
            .multiply(rotX)
            .multiply(rotZ));

        return position;
    }

    getMesh(): THREE.Line {
        return this.line;
    }

    dispose(): void {
        this.geometry.dispose();
        this.material.dispose();
    }

    setVisible(visible: boolean): void {
        this.line.visible = visible;
    }
}

class TransferOrbit extends Orbit {
    private progress: number = 0;
    private readonly fullPoints: THREE.Vector3[] = [];
    public readonly transferDuration: number; // in simulation seconds

    constructor(params: TransferParams) {
        const {
            startRadius,
            endRadius,
            startPosition,
            endPosition,
            endPeriod,
            color = 0x00ff00,
            segments = 100,
            lineWidth = 2,
            opacity = 0.7
        } = params;

        // Use actual distances from positions when available
        const actualStartR = startPosition ? Math.sqrt(startPosition.x ** 2 + startPosition.z ** 2) : startRadius;
        const actualEndR = endPosition ? Math.sqrt(endPosition.x ** 2 + endPosition.z ** 2) : endRadius;

        const ra = Math.max(actualEndR, actualStartR);
        const rp = Math.min(actualEndR, actualStartR);
        const e = (ra - rp) / (ra + rp);

        super({
            radius: actualStartR,
            color,
            segments,
            lineWidth,
            opacity,
            eccentricity: e
        });

        // Compute transfer duration via Kepler's 3rd law (in simulation time units)
        const a = (actualStartR + actualEndR) / 2;
        // T = 2π√(a³/μ), but in our system orbit period is proportional to a^1.5
        // Transfer time is half the full orbital period of the transfer ellipse
        // Use Earth's orbit as reference: period=1yr at r=earthOrbitRadius
        const earthR = 149600000 / 3000000; // ~49.87
        const transferPeriodYears = Math.pow(a / earthR, 1.5);
        this.transferDuration = transferPeriodYears * 0.5; // Half-orbit in Earth years

        if (startPosition) {
            this.calculateTransferPoints(startPosition, actualStartR, actualEndR, endPeriod, segments);
        }
        this.updateProgress(0);
    }

    private calculateTransferPoints(
        startPosition: THREE.Vector3,
        startR: number,
        endR: number,
        endPeriod: number | undefined,
        segments: number
    ): void {
        const startAngle = Math.atan2(startPosition.z, startPosition.x);
        const a = (startR + endR) / 2;
        const e = Math.abs(endR - startR) / (endR + startR);

        // Predict Mars's angle at arrival: it moves during the transfer
        // Transfer takes half the period of the transfer ellipse
        let arrivalAngle = startAngle + Math.PI; // default: 180° sweep
        if (endPeriod) {
            const marsAngularVel = (2 * Math.PI) / endPeriod; // rad per year
            const marsCurrentAngle = startAngle + Math.PI; // approximate (from phase angle)
            const marsAngleTraversed = marsAngularVel * this.transferDuration;
            // The sweep angle should end where Mars will be
            arrivalAngle = startAngle + Math.PI + (marsAngleTraversed - Math.PI / endPeriod);
        }

        const totalSweep = arrivalAngle - startAngle;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const theta = t * Math.PI; // true anomaly along transfer ellipse
            const r = a * (1 - e * e) / (1 + e * Math.cos(theta));

            // Map the position angle to sweep from start to arrival
            const posAngle = startAngle + t * totalSweep;

            const point = new THREE.Vector3(
                r * Math.cos(posAngle),
                0,
                r * Math.sin(posAngle)
            );
            this.fullPoints.push(point);
        }
    }

    updateProgress(progress: number): void {
        if (!this.fullPoints || this.fullPoints.length < 2) {
            console.error('Invalid points array for transfer orbit');
            return;
        }
        this.progress = Math.min(1, Math.max(0, progress));
        const numPoints = Math.max(2, Math.ceil(this.fullPoints.length * this.progress));
        const visiblePoints = this.fullPoints.slice(0, numPoints);
        const newGeometry = new THREE.BufferGeometry().setFromPoints(visiblePoints);
        this.line.geometry.dispose();
        this.line.geometry = newGeometry;
        this.geometry = newGeometry;
    }
}

export class OrbitalSystem {
    private scene: THREE.Scene;
    private orbits: Map<string, Orbit> = new Map();
    private transfers: Map<string, TransferOrbit> = new Map();
    private parentOrbits: Map<string, string> = new Map();

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    addOrbit(name: string, params: OrbitParams, parentName?: string): void {
        const orbit = new Orbit(params);
        this.orbits.set(name, orbit);
        this.scene.add(orbit.getMesh());
        if (parentName) {
            this.parentOrbits.set(name, parentName);
        }
    }

    addTransfer(name: string, params: TransferParams): void {
        const transfer = new TransferOrbit(params);
        this.transfers.set(name, transfer);
        this.scene.add(transfer.getMesh());
        transfer.setVisible(false);
    }

    addTransferFromPosition(name: string, params: TransferParams, startPosition: THREE.Vector3): TransferOrbit {
        const transfer = new TransferOrbit({ ...params, startPosition });
        this.transfers.set(name, transfer);
        this.scene.add(transfer.getMesh());
        transfer.setVisible(false);
        return transfer;
    }

    getOrbit(name: string): Orbit | undefined {
        return this.orbits.get(name);
    }

    getTransfer(name: string): TransferOrbit | undefined {
        return this.transfers.get(name);
    }

    disposeAll(): void {
        this.orbits.forEach(orbit => orbit.dispose());
        this.transfers.forEach(transfer => transfer.dispose());
        this.orbits.clear();
        this.transfers.clear();
        this.parentOrbits.clear();
    }
}

export const calculateOptimalPhaseAngle = (
    r1: number,
    r2: number
): number => {
    // Calculate semi-major axes
    const a_transfer = (r1 + r2) / 2;

    // Calculate transfer time (half the orbital period)
    const transfer_period = 2 * Math.PI * Math.sqrt(a_transfer * a_transfer * a_transfer);
    const transfer_time = transfer_period / 2;

    // Calculate Mars period
    const mars_period = 2 * Math.PI * Math.sqrt(r2 * r2 * r2);

    // Calculate how far Mars moves during transfer
    const mars_angle = (transfer_time / mars_period) * 2 * Math.PI;

    // For a Hohmann transfer, we need Mars to be ahead by 180° minus
    // the angle it travels during transfer
    return Math.PI - mars_angle;
}

export const getCurrentPhaseAngle = (earthPos: THREE.Vector3, marsPos: THREE.Vector3): number => {
    const earthAngle = Math.atan2(earthPos.z, earthPos.x);
    const marsAngle = Math.atan2(marsPos.z, marsPos.x);

    let phaseAngle = marsAngle - earthAngle;
    if (phaseAngle < 0) phaseAngle += 2 * Math.PI;

    return phaseAngle;
}

export const calculateTimeToWindow = (
    currentPhase: number,
    targetPhase: number,
    timeMultiplier: number,
    earthYear: number = 365
): { realSeconds: number, earthMonths: number } => {
    // Angular velocities (same as animation loop)
    const earthVel = 2 * Math.PI / earthYear;
    const marsVel = earthVel / 1.88;
    const relativeVel = marsVel - earthVel;

    // The phase angle decreases over time (Earth is faster than Mars),
    // so we want the angle Earth still needs to "close" to reach the target
    let angleDiff = currentPhase - targetPhase;
    // Normalize to [0, 2π) — this is how far the phase must decrease
    angleDiff = ((angleDiff % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    // If very close to 2π, the window is imminent
    if (angleDiff > 2 * Math.PI - 0.1) angleDiff = 0;

    const simTime = angleDiff / Math.abs(relativeVel);

    return {
        realSeconds: Math.max(0, simTime / timeMultiplier),
        earthMonths: Math.max(0, (simTime / earthYear) * 12)
    };
}
