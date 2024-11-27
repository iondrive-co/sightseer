import * as THREE from 'three';

export interface CelestialBodyConfig {
    name: string;
    radius: number;
    orbitRadius: number;
    color: number;
    period: number;
    rotationSpeed?: number;
    type: 'planet' | 'dwarf-planet' | 'asteroid' | 'comet' | 'moon';
    parentBody?: string;  // For moons, reference to parent planet
    texture?: string;     // Future support for textures
    rings?: RingConfig;
    atmosphere?: AtmosphereConfig;
}

export interface RingConfig {
    innerRadius: number;
    outerRadius: number;
    color: number;
    opacity: number;
}

export interface AtmosphereConfig {
    color: number;
    opacity: number;
    scale: number;  // How much bigger than the planet
}

export interface TransferConfig {
    name: string;
    startBody: string;
    endBody: string;
    color: number;
    opacity: number;
    lineWidth: number;
}

export interface OrbitConfig {
    color: number;
    opacity: number;
    lineWidth: number;
    visible: boolean;
}

export interface SimulationConfig {
    timeMultiplier: number;
    earthYear: number;  // Seconds in Earth year
    transferCooldown: number;
    launchWindowTolerance: number;
    phaseAngle: number;
}

export interface SceneConfig {
    backgroundColor: number;
    ambientLightIntensity: number;
    sunLightIntensity: number;
}

export const DEFAULT_SIMULATION_CONFIG: SimulationConfig = {
    timeMultiplier: 2,
    earthYear: 12,
    transferCooldown: 2000,
    launchWindowTolerance: 0.05,
    phaseAngle: (45 * Math.PI) / 180
};

export const DEFAULT_SCENE_CONFIG: SceneConfig = {
    backgroundColor: 0x111111,
    ambientLightIntensity: 1.0,
    sunLightIntensity: 2.0,
};

export const CAMERA_CONFIG = {
    fov: 60,
    aspectRatio: typeof window !== "undefined" ? window.innerWidth / window.innerHeight : 16 / 9,
    near: 0.1,
    far: 2000,
    position: {
        x: 0,
        y: 150,
        z: 300,
    },
    lookAt: { x: 0, y: 0, z: 0 },
};

export const SUN_CONFIG = {
    radius: 8,
    color: 0xff9933,
    rotationSpeed: 0.005
};

export const CELESTIAL_BODIES: CelestialBodyConfig[] = [
    {
        name: 'mercury',
        radius: 3,
        orbitRadius: 25,
        color: 0x999999,
        period: 0.24,
        rotationSpeed: 0.02,
        type: 'planet'
    },
    {
        name: 'venus',
        radius: 4,
        orbitRadius: 40,
        color: 0xffcc99,
        period: 0.62,
        rotationSpeed: 0.02,
        type: 'planet'
    },
    {
        name: 'earth',
        radius: 5,
        orbitRadius: 60,
        color: 0x3333ff,
        period: 1.0,
        rotationSpeed: 0.02,
        type: 'planet'
    },
    {
        name: 'mars',
        radius: 4,
        orbitRadius: 80,
        color: 0xff4444,
        period: 1.88,
        rotationSpeed: 0.02,
        type: 'planet'
    }
];

// Transfer orbit configurations
export const DEFAULT_TRANSFER_CONFIG: Partial<TransferConfig> = {
    color: 0xff0000,
    opacity: 0.7,
    lineWidth: 2
};

export const calculateOrbitPosition = (
    radius: number,
    angle: number
): THREE.Vector3 => {
    return new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
    );
};

export const calculatePhaseAngle = (
    body1Pos: THREE.Vector3,
    body2Pos: THREE.Vector3
): number => {
    const angle1 = Math.atan2(body1Pos.z, body1Pos.x);
    let angle2 = Math.atan2(body2Pos.z, body2Pos.x);
    if (angle2 < angle1) angle2 += 2 * Math.PI;
    return angle2 - angle1;
};

export const formatCountdown = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
};