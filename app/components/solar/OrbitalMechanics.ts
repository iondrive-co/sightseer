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
    inclination?: number;
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

    protected calculateOrbit(): THREE.Vector3[] {
        const points: THREE.Vector3[] = [];
        const {
            radius,
            segments = 360,
            eccentricity = 0,
            inclination = 0,
            ascendingNode = 0,
            argumentOfPeriapsis = 0
        } = this.params;

        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const r = radius * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(theta));

            const point = new THREE.Vector3(
                r * Math.cos(theta),
                0,
                r * Math.sin(theta)
            );

            // Apply orbital elements
            point.applyAxisAngle(new THREE.Vector3(1, 0, 0), inclination);
            point.applyAxisAngle(new THREE.Vector3(0, 1, 0), ascendingNode);
            point.applyAxisAngle(new THREE.Vector3(0, 1, 0), argumentOfPeriapsis);

            points.push(point);
        }
        return points;
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

    getPosition(time: number): THREE.Vector3 {
        const theta = time % (Math.PI * 2);
        const {
            radius,
            eccentricity = 0,
            inclination = 0,
            ascendingNode = 0,
            argumentOfPeriapsis = 0
        } = this.params;

        const r = radius * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(theta));
        const position = new THREE.Vector3(
            r * Math.cos(theta),
            0,
            r * Math.sin(theta)
        );

        position.applyAxisAngle(new THREE.Vector3(1, 0, 0), inclination);
        position.applyAxisAngle(new THREE.Vector3(0, 1, 0), ascendingNode);
        position.applyAxisAngle(new THREE.Vector3(0, 1, 0), argumentOfPeriapsis);

        return position;
    }
}

class TransferOrbit extends Orbit {
    private progress: number = 0;
    private readonly fullPoints: THREE.Vector3[] = [];

    constructor(params: TransferParams) {
        const {
            startRadius,
            endRadius,
            startPosition,
            color = 0x00ff00,
            segments = 100,
            lineWidth = 2,
            opacity = 0.7
        } = params;

        // Calculate transfer orbit parameters
        const ra = Math.max(endRadius, startRadius);    // Apoapsis radius
        const rp = Math.min(endRadius, startRadius);    // Periapsis radius
        const e = (ra - rp) / (ra + rp);               // Eccentricity

        super({
            radius: startRadius,
            color,
            segments,
            lineWidth,
            opacity,
            eccentricity: e
        });

        if (startPosition) {
            this.calculateTransferPoints(startPosition, startRadius, endRadius, segments);
        }
        this.updateProgress(0);
    }

    private calculateTransferPoints(
        startPosition: THREE.Vector3,
        startRadius: number,
        endRadius: number,
        segments: number
    ): void {
        const startAngle = Math.atan2(startPosition.z, startPosition.x);
        const a = (startRadius + endRadius) / 2;
        const e = Math.abs(endRadius - startRadius) / (endRadius + startRadius);

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const theta = t * Math.PI;  // Half orbit for transfer
            const r = a * (1 - e * e) / (1 + e * Math.cos(theta));

            const point = new THREE.Vector3(
                r * Math.cos(theta + startAngle),
                0,
                r * Math.sin(theta + startAngle)
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

    addTransferFromPosition(name: string, params: TransferParams, startPosition: THREE.Vector3): void {
        this.addTransfer(name, { ...params, startPosition });
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

    let angleDiff = currentPhase - targetPhase;
    if (angleDiff < 0) angleDiff += 2 * Math.PI;

    const simTime = angleDiff / Math.abs(relativeVel);

    return {
        realSeconds: Math.max(0, simTime / timeMultiplier),
        earthMonths: Math.max(0, (simTime / earthYear) * 12)
    };
}
