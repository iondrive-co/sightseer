import * as THREE from 'three';

export interface OrbitParams {
    radius: number;
    color?: number;
    segments?: number;
    lineWidth?: number;
    opacity?: number;
}

export interface TransferParams {
    startRadius: number;
    endRadius: number;
    color?: number;
    segments?: number;
    lineWidth?: number;
    opacity?: number;
    startPosition?: THREE.Vector3;
}

export class Orbit {
    protected geometry: THREE.BufferGeometry;
    protected material: THREE.LineBasicMaterial;
    protected line: THREE.Line;
    protected points: THREE.Vector3[] = [];

    constructor({
                    radius,
                    color = 0x444444,
                    segments = 360,
                    lineWidth = 1,
                    opacity = 0.5
                }: OrbitParams) {
        this.points = this.calculateCircularOrbit(radius, segments);
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.material = new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity,
            linewidth: lineWidth
        });
        this.line = new THREE.Line(this.geometry, this.material);
    }

    protected calculateCircularOrbit(radius: number, segments: number): THREE.Vector3[] {
        const points: THREE.Vector3[] = [];
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(
                Math.cos(theta) * radius,
                0,
                Math.sin(theta) * radius
            ));
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
        const radius = this.points[0].length();
        return new THREE.Vector3(
            Math.cos(theta) * radius,
            0,
            Math.sin(theta) * radius
        );
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

        super({ radius: 0, color, segments: 2, lineWidth, opacity });

        // Calculate transfer orbit parameters
        const a = (startRadius + endRadius) / 2;  // Semi-major axis
        const e = Math.abs(endRadius - startRadius) / (endRadius + startRadius);  // Eccentricity

        if (startPosition) {
            const startAngle = Math.atan2(startPosition.z, startPosition.x);

            this.fullPoints = [];
            if (e < 1) {
                for (let i = 0; i <= segments; i++) {
                    const t = i / segments;
                    // Reduced from Math.PI to Math.PI * 0.95 to reduce overshoot
                    const theta = startAngle + t * (Math.PI * 0.95);
                    const r = (a * (1 - e * e)) / (1 + e * Math.cos(theta - startAngle));
                    this.fullPoints.push(new THREE.Vector3(
                        r * Math.cos(theta),
                        0,
                        r * Math.sin(theta)
                    ));
                }
            }
        } else {
            // Basic transfer from x-axis (unchanged)
            this.fullPoints = [];
            for (let i = 0; i <= segments; i++) {
                const theta = (i / segments) * Math.PI;
                const r = (a * (1 - e * e)) / (1 + e * Math.cos(theta));
                this.fullPoints.push(new THREE.Vector3(
                    r * Math.cos(theta),
                    0,
                    r * Math.sin(theta)
                ));
            }
        }

        this.updateProgress(0);
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
        this.line.geometry.dispose(); // Clean up old geometry
        this.line.geometry = newGeometry;
        this.geometry = newGeometry;
    }
}

export class OrbitalSystem {
    private scene: THREE.Scene;
    private orbits: Map<string, Orbit> = new Map();
    private transfers: Map<string, TransferOrbit> = new Map();

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    addOrbit(name: string, params: OrbitParams): void {
        const orbit = new Orbit(params);
        this.orbits.set(name, orbit);
        this.scene.add(orbit.getMesh());
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
    }
}