import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  calculateOptimalPhaseAngle,
  calculateTimeToWindow,
  getCurrentPhaseAngle,
  OrbitalSystem
} from "./solar/OrbitalMechanics";
import {
  CELESTIAL_BODIES,
  DEFAULT_SCENE_CONFIG,
  DEFAULT_SIMULATION_CONFIG,
  DEFAULT_TRANSFER_CONFIG,
  CAMERA_CONFIG,
  ASTEROID_BODIES,
  SUN_CONFIG,
  formatCountdown,
  type CelestialBodyConfig
} from './solar/Configuration';
import { CameraController } from './solar/CameraController';

interface CelestialBody extends CelestialBodyConfig {
  mesh: THREE.Mesh;
  position?: THREE.Vector3;
}

const SolarSystem = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // WebGL support check
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      if (!gl) throw new Error('WebGL is not supported in your browser');

      // Scene setup
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
      camera.lookAt(CAMERA_CONFIG.lookAt.x, CAMERA_CONFIG.lookAt.y, CAMERA_CONFIG.lookAt.z);

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
      const cameraController = new CameraController(camera, renderer.domElement);
      cameraController.setPositionUpdateCallback(setCameraPosition);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, DEFAULT_SCENE_CONFIG.ambientLightIntensity);
      const sunLight = new THREE.PointLight(0xffffff, DEFAULT_SCENE_CONFIG.sunLightIntensity);
      scene.add(ambientLight, sunLight);

      // Create sun
      const sunGeometry = new THREE.SphereGeometry(SUN_CONFIG.radius, 32, 32);
      const sunMaterial = new THREE.MeshBasicMaterial({ color: SUN_CONFIG.color });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      scene.add(sun);
      const orbitalSystem = new OrbitalSystem(scene);
      // Helper function to create text textures for labels
      const createTextTexture = (text: string) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = 256;
        canvas.height = 128;

        ctx.fillStyle = 'white';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text, 128, 64);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
      };

      // Create celestial bodies
      const allBodiesTemp = [...CELESTIAL_BODIES, ...ASTEROID_BODIES].map(config => {
        const geometry = new THREE.SphereGeometry(config.radius, 32, 32);
        const material = new THREE.MeshPhongMaterial({
          color: config.color,
          emissive: config.color,
          emissiveIntensity: 0.5,
        });
        const mesh = new THREE.Mesh(geometry, material);

        // Add atmosphere if configured
        if (config.atmosphere) {
          const atmosphereGeometry = new THREE.SphereGeometry(
              config.radius * config.atmosphere.scale,
              32,
              32
          );
          const atmosphereMaterial = new THREE.MeshPhongMaterial({
            color: config.atmosphere.color,
            transparent: true,
            opacity: config.atmosphere.opacity
          });
          const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
          mesh.add(atmosphere);
        }

        // Add labels for asteroids
        if (config.type === 'asteroid' || config.type === 'dwarf-planet') {
          const textSprite = new THREE.Sprite(
              new THREE.SpriteMaterial({
                map: createTextTexture(config.name)
              })
          );
          textSprite.position.y = config.radius * 2;
          textSprite.scale.set(40, 20, 1);
          mesh.add(textSprite);
        }

        return { ...config, mesh };
      });

      // Set up parenting and add to scene
      const bodies: CelestialBody[] = allBodiesTemp.map(body => {
        if (body.type === 'moon' && body.parentBody) {
          const parent = allBodiesTemp.find(b => b.name === body.parentBody);
          if (parent) {
            parent.mesh.add(body.mesh);
            // Set initial position relative to parent
            body.mesh.position.set(body.orbitRadius, 0, 0);
          }
        } else {
          scene.add(body.mesh);
          orbitalSystem.addOrbit(body.name, {
            radius: body.orbitRadius,
            color: body.color,
            opacity: 0.2,
            lineWidth: body.type === 'planet' ? 2 : 1,
            eccentricity: body.eccentricity,
            inclination: body.inclination
          });
        }
        return body;
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

          if (body.type === 'moon') {
            const moonAngularVelocity = (2 * Math.PI) / (body.period * DEFAULT_SIMULATION_CONFIG.earthYear);
            const moonAngle = time * moonAngularVelocity;

            body.mesh.position.x = body.orbitRadius * Math.cos(moonAngle);
            body.mesh.position.z = body.orbitRadius * Math.sin(moonAngle);

            if (body.rotationSpeed) {
              body.mesh.rotation.y += body.rotationSpeed;
            }
          } else {
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
            }
          }
        });

        // Handle transfers
        if (activeTransfer) {
          const currentTransfer = orbitalSystem.getTransfer(activeTransfer);
          if (currentTransfer) {
            transferProgress += 0.002;
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
            const targetPhase = calculateOptimalPhaseAngle(earth.orbitRadius, mars.orbitRadius);
            const currentPhase = getCurrentPhaseAngle(earth.position, mars.position);
            const phaseDifference = Math.abs(currentPhase - targetPhase);

            if (phaseDifference < DEFAULT_SIMULATION_CONFIG.launchWindowTolerance) {
              setCountdown("Starting Earth-to-Mars Hohmann transfer");

              const transferName = `earth-mars-${currentTime}`;
              orbitalSystem.addTransferFromPosition(
                  transferName,
                  {
                    startRadius: earth.orbitRadius,
                    endRadius: mars.orbitRadius,
                    startPosition: earth.position,
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
              const { realSeconds, earthMonths } = calculateTimeToWindow(
                  currentPhase,
                  targetPhase,
                  DEFAULT_SIMULATION_CONFIG.timeMultiplier
              );

              setCountdown(
                  `Next Mars transfer window in: ${formatCountdown(realSeconds, earthMonths)}`
              );
            }
          }
        }

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup
      return () => {
        cameraController.dispose();
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
        <div className="fixed top-4 left-0 right-0 flex justify-center items-center gap-4 z-10">
          {countdown && (
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
                {countdown}
              </div>
          )}
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
            <span className="font-bold mr-2">Controls:</span>
            <span className="mr-4">Mouse drag up/down - Change view angle</span>
            <span>Mouse wheel - Zoom in/out</span>
          </div>
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
            <span className="mr-2">Camera Position:</span>
            <span className="mr-4">X: {cameraPosition.x.toFixed(2)}</span>
            <span className="mr-4">Y: {cameraPosition.y.toFixed(2)}</span>
            <span>Z: {cameraPosition.z.toFixed(2)}</span>
          </div>
        </div>
      </>
  );
};

export default SolarSystem;