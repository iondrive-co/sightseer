export interface CelestialBodyConfig {
    name: string;
    radius: number;
    orbitRadius: number;
    color: number;
    period: number;
    eccentricity: number;
    inclination: number;
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

// Note: We'll use a scale factor to make the visualization work in our viewport
// Real values in km: Sun=696,340, Mercury=2,440, Venus=6,052, Earth=6,371, Mars=3,390
// Real distances in million km: Mercury=57.9, Venus=108.2, Earth=149.6, Mars=227.9

// Scale factors to make the visualization work:
// 1. Size scale: 1 unit = ~10,000 km (for celestial body sizes)
// 2. Distance scale: 1 unit = ~3 million km (for orbit distances)
// These scales are chosen to make the visualization visible while maintaining relative proportions
export const SCALE_FACTORS = {
    SIZE: 1/2000,      // 1 unit = 2,000 km
    DISTANCE: 1/3000000 // 1 unit = 3 million km
};

export const SUN_CONFIG = {
    // Draw at 1/25 the real scale so we can see planets
    radius: 696340 * SCALE_FACTORS.SIZE * (1/25), // ~69.6 units
    color: 0xffd700,
    rotationSpeed: 0.001,
    emissiveIntensity: 1.0,
    coronaScale: 1.2
};

export const DEFAULT_SIMULATION_CONFIG = {
    timeMultiplier: 20,
    earthYear: 365,       // One Earth year in simulation seconds
    transferCooldown: 2000,
    launchWindowTolerance: 0.05,
    phaseAngle: (45 * Math.PI) / 180
};

export const DEFAULT_SCENE_CONFIG = {
    backgroundColor: 0x000000,  // True black for space
    ambientLightIntensity: 0.3,
    sunLightIntensity: 1.2,     // So we can still see planets
};

export const CELESTIAL_BODIES = [
    {
        name: 'mercury',
        radius: 2440 * SCALE_FACTORS.SIZE,  // ~0.24 units
        orbitRadius: 57900000 * SCALE_FACTORS.DISTANCE, // ~19.3 units
        color: 0x8c8c8c,  // Grey-silver color
        period: 0.24,
        rotationSpeed: 0.0001,
        type: 'planet' as const,
        eccentricity: 0.206,
        inclination: 7.0 * Math.PI / 180,  // 7.0 degrees
        atmosphere: {
            color: 0x808080,
            opacity: 0.1,
            scale: 1.02
        }
    },
    {
        name: 'venus',
        radius: 6052 * SCALE_FACTORS.SIZE,  // ~0.61 units
        orbitRadius: 108200000 * SCALE_FACTORS.DISTANCE, // ~36.1 units
        color: 0xffd1b3,  // Pale orange
        period: 0.62,
        rotationSpeed: -0.0001,  // Negative for retrograde rotation
        type: 'planet' as const,
        eccentricity: 0.007,
        inclination: 3.4 * Math.PI / 180,
        atmosphere: {
            color: 0xffa07a,
            opacity: 0.4,
            scale: 1.15
        }
    },
    {
        name: 'earth',
        radius: 6371 * SCALE_FACTORS.SIZE,  // ~0.64 units
        orbitRadius: 149600000 * SCALE_FACTORS.DISTANCE, // ~49.9 units
        color: 0x2f6a69,  // Blue-green
        period: 1.0,
        rotationSpeed: 0.002,
        type: 'planet' as const,
        eccentricity: 0.017,
        inclination: 0.0,  // Reference plane
        atmosphere: {
            color: 0x6b93d6,
            opacity: 0.2,
            scale: 1.1
        }
    },
    {
        name: 'moon',
        radius: 1737 * SCALE_FACTORS.SIZE,
        orbitRadius: 384400 * SCALE_FACTORS.DISTANCE * 40,
        color: 0xCCCCCC,
        period: 0.0748, // 27.3 days in Earth years
        rotationSpeed: 0.0005,
        type: 'moon' as const,
        parentBody: 'earth',
        eccentricity: 0.0549,
        inclination: 5.145 * Math.PI / 180
    },
    {
        name: 'mars',
        radius: 3390 * SCALE_FACTORS.SIZE,  // ~0.34 units
        orbitRadius: 227900000 * SCALE_FACTORS.DISTANCE, // ~76.0 units
        color: 0xc1440e,  // Red-orange
        period: 1.88,
        rotationSpeed: 0.002,
        type: 'planet' as const,
        eccentricity: 0.093,
        inclination: 1.9 * Math.PI / 180,
        atmosphere: {
            color: 0xc1440e,
            opacity: 0.1,
            scale: 1.05,  // Thin atmosphere
        }
    }
];
// Make the asteroids visible
export const ASTEROID_SIZE_MULTIPLIER = 5
export const ASTEROID_BODIES: CelestialBodyConfig[] = [
    {
        name: 'ceres',
        radius: 470 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,  // ~0.047 units (actual radius: 470 km)
        orbitRadius: 413700000 * SCALE_FACTORS.DISTANCE, // ~137.9 units
        color: 0x8B7355,  // Brown-grey color
        period: 4.6,  // Orbital period in Earth years
        rotationSpeed: 0.004,
        type: 'dwarf-planet' as const,
        eccentricity: 0.076,
        inclination: 10.6 * Math.PI / 180,
    },
    {
        name: 'vesta',
        radius: 263 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,  // ~0.026 units
        orbitRadius: 353400000 * SCALE_FACTORS.DISTANCE, // ~117.8 units
        color: 0x8B8B83,  // Grey color
        period: 3.63,
        rotationSpeed: 0.003,
        type: 'asteroid' as const,
        eccentricity: 0.089,
        inclination: 7.1 * Math.PI / 180,
    },
    {
        name: 'pallas',
        radius: 256 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,  // ~0.026 units
        orbitRadius: 414700000 * SCALE_FACTORS.DISTANCE, // ~138.2 units
        color: 0x7A7A7A,  // Dark grey
        period: 4.62,
        rotationSpeed: 0.002,
        type: 'asteroid' as const,
        eccentricity: 0.231,
        inclination: 34.8 * Math.PI / 180,
    },
    {
        name: 'hygiea',
        radius: 217 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,  // ~0.022 units
        orbitRadius: 470100000 * SCALE_FACTORS.DISTANCE, // ~156.7 units
        color: 0x6B6B6B,  // Medium grey
        period: 5.57,
        rotationSpeed: 0.001,
        type: 'asteroid' as const,
        eccentricity: 0.112,
        inclination: 3.8 * Math.PI / 180,
    },
    {
        name: 'interamnia',
        radius: 167 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,
        orbitRadius: 457800000 * SCALE_FACTORS.DISTANCE,
        color: 0x8B8378,  // Light gray-brown
        period: 5.34,
        rotationSpeed: 0.002,
        type: 'asteroid' as const,
        eccentricity: 0.155,
        inclination: 17.3 * Math.PI / 180,
    },
    {
        name: 'europa',
        radius: 156 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,
        orbitRadius: 463300000 * SCALE_FACTORS.DISTANCE,
        color: 0x9C9C9C,  // Medium gray
        period: 5.46,
        rotationSpeed: 0.001,
        type: 'asteroid' as const,
        eccentricity: 0.116,
        inclination: 7.5 * Math.PI / 180,
    },
    {
        name: 'davida',
        radius: 145 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,
        orbitRadius: 475400000 * SCALE_FACTORS.DISTANCE,
        color: 0x8B7355,  // Dark brown
        period: 5.65,
        rotationSpeed: 0.002,
        type: 'asteroid' as const,
        eccentricity: 0.186,
        inclination: 15.9 * Math.PI / 180,
    },
    {
        name: 'sylvia',
        radius: 136 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,
        orbitRadius: 521500000 * SCALE_FACTORS.DISTANCE,
        color: 0x8B6914,  // Dark bronze
        period: 6.52,
        rotationSpeed: 0.003,
        type: 'asteroid' as const,
        eccentricity: 0.380,
        inclination: 10.9 * Math.PI / 180,
    },
    {
        name: 'psyche',
        radius: 113 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,
        orbitRadius: 374700000 * SCALE_FACTORS.DISTANCE,
        color: 0xC0C0C0,  // Metallic silver
        period: 5.00,
        rotationSpeed: 0.004,
        type: 'asteroid' as const,
        eccentricity: 0.134,
        inclination: 3.1 * Math.PI / 180,
    },
    {
        name: 'euphrosyne',
        radius: 134 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,
        orbitRadius: 487100000 * SCALE_FACTORS.DISTANCE,
        color: 0x8B8682,  // Dark gray
        period: 5.86,
        rotationSpeed: 0.002,
        type: 'asteroid' as const,
        eccentricity: 0.223,
        inclination: 26.3 * Math.PI / 180,
    },
    {
        name: 'eunomia',
        radius: 132 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,
        orbitRadius: 395500000 * SCALE_FACTORS.DISTANCE,
        color: 0xCD853F,  // Light bronze
        period: 4.30,
        rotationSpeed: 0.003,
        type: 'asteroid' as const,
        eccentricity: 0.187,
        inclination: 11.7 * Math.PI / 180,
    },
    {
        name: 'juno',
        radius: 117 * SCALE_FACTORS.SIZE * ASTEROID_SIZE_MULTIPLIER,
        orbitRadius: 399400000 * SCALE_FACTORS.DISTANCE,
        color: 0xB8860B,  // Dark golden
        period: 4.36,
        rotationSpeed: 0.002,
        type: 'asteroid' as const,
        eccentricity: 0.256,
        inclination: 12.9 * Math.PI / 180,
    }
];

export const TRANSFER_COLORS = {
    BLUE: 0x0066ff,
    GREEN: 0x00ff00,
    YELLOW: 0xffff00,
    RED: 0xff0000
};

export const DEFAULT_TRANSFER_CONFIG = {
    color: TRANSFER_COLORS.BLUE,
    opacity: 0.5,
    lineWidth: 1
};

export const formatCountdown = (seconds: number, earthMonths: number): string => {
    if (!isFinite(seconds) || !isFinite(earthMonths)) {
        return "Calculating...";
    }

    const positiveSeconds = Math.max(0, seconds);
    const remainingSeconds = Math.floor(positiveSeconds % 60);

    return `${Math.max(0, Math.ceil(earthMonths))} months (${remainingSeconds}s)`;
}