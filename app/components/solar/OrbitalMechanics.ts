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

export class TransferOrbit extends Orbit {
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
        const e = Math.abs(endRadius - startRadius) / (endRadius + startRadius);  // Eccentricity

        super({
            radius: startRadius,  // Use startRadius as base radius
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

export const calculateOptimalPhaseAngle = (r1: number, r2: number): number => {
    // Calculate transfer orbit period
    const a = (r1 + r2) / 2;
    const transferPeriod = 2 * Math.PI * Math.sqrt(a * a * a);
    const transferTime = transferPeriod / 2; // Time for half the transfer orbit

    // Calculate Mars' angular movement during transfer
    const marsPeriod = 2 * Math.PI * Math.sqrt(r2 * r2 * r2);
    const marsAngularVel = 2 * Math.PI / marsPeriod;
    const marsAngle = marsAngularVel * transferTime;

    // For a Hohmann transfer, Mars needs to be ahead by π - marsAngle
    return Math.PI - marsAngle;
}

export const getCurrentPhaseAngle = (earthPos: THREE.Vector3, marsPos: THREE.Vector3): number => {
    const earthAngle = Math.atan2(earthPos.z, earthPos.x);
    const marsAngle = Math.atan2(marsPos.z, marsPos.x);

    // Calculate phase angle (how far Mars is ahead of Earth)
    let phaseAngle = marsAngle - earthAngle;
    if (phaseAngle < 0) phaseAngle += 2 * Math.PI;

    return phaseAngle;
}

export const calculateTimeToWindow = (
    currentPhase: number,
    targetPhase: number,
    earthOrbitRadius: number,
    marsOrbitRadius: number,
    timeMultiplier: number
): { realSeconds: number, earthMonths: number } => {
    // Calculate actual periods
    const earthPeriod = 2 * Math.PI * Math.sqrt(earthOrbitRadius * earthOrbitRadius * earthOrbitRadius);
    const marsPeriod = 2 * Math.PI * Math.sqrt(marsOrbitRadius * marsOrbitRadius * marsOrbitRadius);

    // Angular velocities in radians per simulation second
    const earthVel = 2 * Math.PI / earthPeriod;
    const marsVel = 2 * Math.PI / marsPeriod;
    const relativeVel = marsVel - earthVel;

    // Calculate phase difference needed
    let angleDiff = currentPhase - targetPhase;
    if (angleDiff < 0) angleDiff += 2 * Math.PI;

    // Time needed in simulation seconds
    const simTime = angleDiff / Math.abs(relativeVel);

    // Convert to real seconds
    // Since simulation runs timeMultiplier times faster than real time,
    // if something takes X simulation seconds, it takes X/timeMultiplier real seconds
    // TODO / 5 is a hack because we have accounted for the real time multipler - will fix
    const realSeconds = (simTime / timeMultiplier) / 5;

    // Convert to Earth months (using sim time, not real time)
    const earthMonths = (simTime / earthPeriod) * 12;

    return {
        realSeconds: Math.max(0, realSeconds),
        earthMonths: Math.max(0, earthMonths)
    };
}

