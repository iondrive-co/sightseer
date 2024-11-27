import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitalSystem } from "~/components/solar/OrbitalMechanics";
import {
  CELESTIAL_BODIES,
  DEFAULT_SCENE_CONFIG,
  DEFAULT_SIMULATION_CONFIG,
  DEFAULT_TRANSFER_CONFIG,
  SUN_CONFIG,
  calculatePhaseAngle,
  formatCountdown,
  type CelestialBodyConfig, CAMERA_CONFIG
} from '~/components/solar/Configuration';

interface CelestialBody extends CelestialBodyConfig {
  mesh: THREE.Mesh;
  position?: THREE.Vector3;
}

const SolarSystem = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // WebGL support check
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        throw new Error('WebGL is not supported in your browser');
      }

      // Scene setup
      const mountDiv = mountRef.current;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(DEFAULT_SCENE_CONFIG.backgroundColor);

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
          CAMERA_CONFIG.fov,
          CAMERA_CONFIG.aspectRatio,
          CAMERA_CONFIG.near,
          CAMERA_CONFIG.far
      );
      camera.position.set(
          CAMERA_CONFIG.position.x,
          CAMERA_CONFIG.position.y,
          CAMERA_CONFIG.position.z
      );
      camera.lookAt(
          CAMERA_CONFIG.lookAt.x,
          CAMERA_CONFIG.lookAt.y,
          CAMERA_CONFIG.lookAt.z
      );

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountDiv.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(
          0xffffff,
          DEFAULT_SCENE_CONFIG.ambientLightIntensity
      );
      scene.add(ambientLight);

      const sunLight = new THREE.PointLight(
          0xffffff,
          DEFAULT_SCENE_CONFIG.sunLightIntensity
      );
      sunLight.position.set(0, 0, 0);
      scene.add(sunLight);

      // Create sun
      const sun = new THREE.Mesh(
          new THREE.SphereGeometry(SUN_CONFIG.radius, 32, 32),
          new THREE.MeshBasicMaterial({ color: SUN_CONFIG.color })
      );
      scene.add(sun);

      // Initialize orbital system
      const orbitalSystem = new OrbitalSystem(scene);

      // Create celestial bodies
      const bodies: CelestialBody[] = CELESTIAL_BODIES.map(config => {
        // Create mesh for the celestial body
        const body = new THREE.Mesh(
            new THREE.SphereGeometry(config.radius, 32, 32),
            new THREE.MeshPhongMaterial({ color: config.color })
        );
        scene.add(body);

        // Add orbit
        orbitalSystem.addOrbit(config.name, {
          radius: config.orbitRadius,
          color: config.color,
          opacity: 1.0,
          lineWidth: 2
        });

        // Add atmosphere if configured
        if (config.atmosphere) {
          const atmosphere = new THREE.Mesh(
              new THREE.SphereGeometry(config.radius * config.atmosphere.scale, 32, 32),
              new THREE.MeshPhongMaterial({
                color: config.atmosphere.color,
                transparent: true,
                opacity: config.atmosphere.opacity
              })
          );
          body.add(atmosphere);
        }

        // Add rings if configured
        if (config.rings) {
          const ringGeometry = new THREE.RingGeometry(
              config.rings.innerRadius,
              config.rings.outerRadius,
              32
          );
          const ringMaterial = new THREE.MeshPhongMaterial({
            color: config.rings.color,
            transparent: true,
            opacity: config.rings.opacity,
            side: THREE.DoubleSide
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = Math.PI / 2;
          body.add(ring);
        }

        return { ...config, mesh: body };
      });

      // Transfer orbit state
      let transferProgress = 0;
      let activeTransfer: string | null = null;
      let lastTransferTime = 0;

      const animate = () => {
        requestAnimationFrame(animate);
        const currentTime = Date.now();

        // Rotate sun
        sun.rotation.y += SUN_CONFIG.rotationSpeed;

        // Update celestial body positions
        bodies.forEach((body) => {
          const time = currentTime * 0.001 * DEFAULT_SIMULATION_CONFIG.timeMultiplier;
          const orbit = orbitalSystem.getOrbit(body.name);

          if (orbit) {
            const angularVelocity = (2 * Math.PI) / (body.period * DEFAULT_SIMULATION_CONFIG.earthYear);
            const angle = time * angularVelocity;
            const position = orbit.getPosition(angle);
            body.mesh.position.copy(position);
            body.position = position.clone();
            if (body.rotationSpeed) {
              body.mesh.rotation.y += body.rotationSpeed;
            }

            // Update moons if present
            if (body.type === 'planet') {
              const moons = bodies.filter(moon =>
                  moon.type === 'moon' && moon.parentBody === body.name
              );
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              moons.forEach(_ => {
                // Moon orbit calculations go here
              });
            }
          }
        });

        // Handle transfers
        if (activeTransfer) {
          const currentTransfer = orbitalSystem.getTransfer(activeTransfer);
          if (currentTransfer) {
            transferProgress += 0.005;
            currentTransfer.updateProgress(transferProgress);

            if (transferProgress >= 1) {
              currentTransfer.setVisible(false);
              transferProgress = 0;
              activeTransfer = null;
              lastTransferTime = currentTime;
            }
          }
        } else if (currentTime - lastTransferTime > DEFAULT_SIMULATION_CONFIG.transferCooldown) {
          const earth = bodies.find(b => b.name === 'earth');
          const mars = bodies.find(b => b.name === 'mars');

          if (earth?.position && mars?.position) {
            const phaseAngle = calculatePhaseAngle(earth.position, mars.position);
            const difference = Math.abs(phaseAngle - DEFAULT_SIMULATION_CONFIG.phaseAngle);

            if (difference < DEFAULT_SIMULATION_CONFIG.launchWindowTolerance) {
              setCountdown("Earth-to-Mars Hohmann transfer in progress");

              const transferName = `earth-mars-${currentTime}`;
              orbitalSystem.addTransferFromPosition(
                  transferName,
                  {
                    startRadius: earth.orbitRadius,
                    endRadius: mars.orbitRadius,
                    ...DEFAULT_TRANSFER_CONFIG
                  },
                  earth.position
              );

              activeTransfer = transferName;
              const newTransfer = orbitalSystem.getTransfer(activeTransfer);
              if (newTransfer) {
                newTransfer.setVisible(true);
              }
            } else {
              // Calculate time to next window
              const currentPhase = calculatePhaseAngle(earth.position, mars.position);
              const timeToWindow = calculateTimeToNextWindow(
                  currentPhase,
                  DEFAULT_SIMULATION_CONFIG.phaseAngle,
                  earth.period,
                  mars.period,
                  DEFAULT_SIMULATION_CONFIG.earthYear,
                  DEFAULT_SIMULATION_CONFIG.timeMultiplier
              );

              setCountdown(`Next Mars injection window in: ${formatCountdown(timeToWindow)}`);
            }
          }
        }

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        orbitalSystem.disposeAll();
        scene.clear();
        renderer.dispose();
      };
    } catch (err) {
      console.error('Error in solar system:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  }, []);

  if (error) {
    return (
        <div className="flex items-center justify-center h-full bg-gray-900 text-white p-4">
          <div className="max-w-md text-center">
            <h2 className="text-xl font-semibold mb-2">WebGL Not Available</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <div className="text-sm text-gray-400">
              <p className="mb-2">To enable WebGL in Firefox:</p>
              <ol className="list-decimal list-inside text-left">
                <li>Type <code className="bg-gray-800 px-1 rounded">about:config</code> in your address bar</li>
                <li>Accept the risk warning</li>
                <li>Search for <code className="bg-gray-800 px-1 rounded">webgl.disabled</code></li>
                <li>Set it to <code className="bg-gray-800 px-1 rounded">false</code></li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </div>
        </div>
    );
  }

  return (
      <>
        <div
            ref={mountRef}
            className="fixed top-0 right-0 bottom-0"
            style={{
              backgroundColor: '#111111',
              left: window.innerWidth <= 640 ? '64px' : '96px'
            }}
        />
        {countdown && (
            <div
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-10">
              {countdown}
            </div>
        )}
      </>
  );
};

// Helper function for calculating time to next launch window
const calculateTimeToNextWindow = (
    currentPhase: number,
    targetPhase: number,
    period1: number,
    period2: number,
    earthYear: number,
    timeMultiplier: number
): number => {
  let timeToWindow = (targetPhase - currentPhase) /
      ((2 * Math.PI) * (1/earthYear - 1/(period2 * earthYear)));

  if (timeToWindow < 0) {
    timeToWindow += 2 * Math.PI / ((2 * Math.PI) * (1/earthYear - 1/(period2 * earthYear)));
  }

  const scaledTime = timeToWindow / timeMultiplier;
  return Math.max(0, earthYear - scaledTime + 1);
};

export default SolarSystem;