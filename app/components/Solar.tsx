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
  labelSprite?: THREE.Sprite;
  labelAngle?: number; // fixed angle offset for moon labels
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

      // Texture loader
      const textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = 'anonymous';

      // Milky Way skybox
      const skyboxGeometry = new THREE.SphereGeometry(4000, 64, 64);
      const skyboxMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.15,
      });
      const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
      // Rotate for ecliptic/galactic alignment
      skybox.rotation.x = 60 * Math.PI / 180;  // Ecliptic tilt
      skybox.rotation.y = 267 * Math.PI / 180;  // Galactic center
      scene.add(skybox);

      textureLoader.load(
        '/textures/2k_stars_milky_way.webp',
        (texture) => {
          skyboxMaterial.map = texture;
          skyboxMaterial.needsUpdate = true;
        }
      );

      // Create sun
      const sunGeometry = new THREE.SphereGeometry(SUN_CONFIG.radius, 32, 32);
      const sunMaterial = new THREE.MeshBasicMaterial({ color: SUN_CONFIG.color });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      scene.add(sun);

      // Load sun texture
      if (SUN_CONFIG.texture) {
        textureLoader.load(SUN_CONFIG.texture, (texture) => {
          sunMaterial.map = texture;
          sunMaterial.needsUpdate = true;
        });
      }

      const orbitalSystem = new OrbitalSystem(scene);

      // Compact text label creator
      const createTextTexture = (text: string, bodyColor: number) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = 128;
        canvas.height = 32;

        // Semi-transparent black background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.roundRect(0, 0, 128, 32, 4);
        ctx.fill();

        // Colored border
        const color = new THREE.Color(bodyColor);
        ctx.strokeStyle = `rgb(${Math.floor(color.r * 255)}, ${Math.floor(color.g * 255)}, ${Math.floor(color.b * 255)})`;
        ctx.lineWidth = 1;
        ctx.roundRect(0, 0, 128, 32, 4);
        ctx.stroke();

        // Text
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text.toUpperCase(), 64, 16);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
      };

      // Create celestial bodies
      const allBodiesTemp = [...CELESTIAL_BODIES, ...ASTEROID_BODIES].map(config => {
        const geometry = new THREE.SphereGeometry(config.radius, 32, 32);

        // Use textured material when available
        let material: THREE.Material;
        if (config.texture) {
          const mat = new THREE.MeshPhongMaterial({
            color: config.color,
            emissive: config.color,
            emissiveIntensity: 0.3,
          });
          textureLoader.load(config.texture, (texture) => {
            mat.map = texture;
            mat.color.set(0xffffff);
            mat.emissive.set(0x444444);
            mat.emissiveMap = texture;
            mat.needsUpdate = true;
          });
          material = mat;
        } else {
          material = new THREE.MeshPhongMaterial({
            color: config.color,
            emissive: config.color,
            emissiveIntensity: 0.5,
          });
        }

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

        // Add rings if configured
        if (config.rings) {
          const ringGeometry = new THREE.RingGeometry(
            config.rings.innerRadius,
            config.rings.outerRadius,
            64
          );
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: config.rings.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: config.rings.opacity,
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = -Math.PI / 2;
          mesh.add(ring);
        }

        // Add compact labels — moons get scene-level labels (updated in animation loop)
        const displayName = config.name === 'europa-moon' ? 'europa' : config.name;
        const textSprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: createTextTexture(displayName, config.color),
              depthTest: false,
            })
        );
        textSprite.scale.set(12, 3, 1);

        if (config.type === 'moon') {
          // Moon labels are added to scene separately so they don't rotate with parent
          textSprite.visible = false; // controlled by proximity check
        } else {
          textSprite.position.y = config.radius * 3 + 1;
          mesh.add(textSprite);
        }

        return { ...config, mesh, labelSprite: config.type === 'moon' ? textSprite : undefined };
      });

      // Assign fixed label angles for moons — spread evenly, offset from top (where planet label is)
      const moonCountByParent = new Map<string, number>();
      allBodiesTemp.forEach(body => {
        if (body.type === 'moon' && body.parentBody) {
          moonCountByParent.set(body.parentBody, (moonCountByParent.get(body.parentBody) || 0) + 1);
        }
      });
      const moonIndexByParent = new Map<string, number>();

      // Set up parenting and add to scene
      const bodies: CelestialBody[] = allBodiesTemp.map(body => {
        let labelAngle: number | undefined;
        if (body.type === 'moon' && body.parentBody) {
          const parent = allBodiesTemp.find(b => b.name === body.parentBody);
          if (parent) {
            parent.mesh.add(body.mesh);
            body.mesh.position.set(body.orbitRadius, 0, 0);
            // Assign a fixed angle for the label — start at 90° (right side), spread evenly
            const idx = moonIndexByParent.get(body.parentBody) || 0;
            const total = moonCountByParent.get(body.parentBody) || 1;
            // Spread from 90° to 270° (bottom half) to avoid planet label at top
            labelAngle = (Math.PI / 2) + (idx / total) * Math.PI;
            moonIndexByParent.set(body.parentBody, idx + 1);
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
        return { ...body, labelAngle };
      });

      // Add moon label sprites to scene (not parented to any mesh)
      bodies.forEach(body => {
        if (body.labelSprite) {
          scene.add(body.labelSprite);
        }
      });

      // Transfer orbit state
      let transferProgress = 0;
      let transferIncrement = 0.002;
      let activeTransfer: string | null = null;
      let lastTransferTime = 0;

      const animate = () => {
        requestAnimationFrame(animate);
        const currentTime = Date.now();

        // Keep skybox centered on camera
        skybox.position.copy(camera.position);

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

        // Show/hide moons based on camera distance to parent planet
        // Position moon labels at fixed angles relative to parent (not orbiting)
        const moonVisibilityThreshold = 150;
        const parentWorldPos = new THREE.Vector3();
        bodies.forEach((body) => {
          if (body.type === 'moon' && body.parentBody) {
            const parent = bodies.find(b => b.name === body.parentBody);
            if (parent) {
              parent.mesh.getWorldPosition(parentWorldPos);
              const distToParent = camera.position.distanceTo(parentWorldPos);
              const visible = distToParent < moonVisibilityThreshold;
              body.mesh.visible = visible;
              if (body.labelSprite) {
                body.labelSprite.visible = visible;
                if (visible && body.labelAngle !== undefined) {
                  // Place label at fixed angle on moon's orbit radius, relative to parent world pos
                  body.labelSprite.position.set(
                    parentWorldPos.x + body.orbitRadius * Math.cos(body.labelAngle),
                    parentWorldPos.y + 1,
                    parentWorldPos.z + body.orbitRadius * Math.sin(body.labelAngle)
                  );
                }
              }
            }
          }
        });

        // Handle transfers
        if (activeTransfer) {
          const currentTransfer = orbitalSystem.getTransfer(activeTransfer);
          if (currentTransfer) {
            transferProgress += transferIncrement;
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
            // Circular distance — handle wrapping around 2π
            let phaseDifference = Math.abs(currentPhase - targetPhase);
            if (phaseDifference > Math.PI) phaseDifference = 2 * Math.PI - phaseDifference;

            if (phaseDifference < DEFAULT_SIMULATION_CONFIG.launchWindowTolerance) {
              setCountdown("Starting Earth-to-Mars Hohmann transfer");

              const transferName = `earth-mars-${currentTime}`;
              const transfer = orbitalSystem.addTransferFromPosition(
                  transferName,
                  {
                    startRadius: earth.orbitRadius,
                    endRadius: mars.orbitRadius,
                    startPosition: earth.position,
                    endPosition: mars.position,
                    endPeriod: 1.88,
                    ...DEFAULT_TRANSFER_CONFIG
                  },
                  earth.position
              );

              // Calibrate animation speed to match transfer duration
              // transferDuration is in Earth years, convert to real seconds
              const transferRealSeconds = (transfer.transferDuration * DEFAULT_SIMULATION_CONFIG.earthYear) / DEFAULT_SIMULATION_CONFIG.timeMultiplier;
              // We want progress 0→1 over transferRealSeconds, at ~60fps
              const framesPerTransfer = transferRealSeconds * 60;
              transferIncrement = 1 / Math.max(1, framesPerTransfer);

              activeTransfer = transferName;
              transfer.setVisible(true);
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
        bodies.forEach(b => {
          if (b.labelSprite) {
            b.labelSprite.material.map?.dispose();
            b.labelSprite.material.dispose();
          }
        });
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
              <p className="mb-2">In Chrome chrome://settings/system needs to have graphics acceleration on</p>
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
            left: typeof window !== 'undefined' && window.innerWidth <= 640 ? '64px' : '96px'
          }}
      />
      <div className="fixed top-4 left-0 right-0 flex justify-center items-center gap-2 z-10 px-2">
        {countdown && (
            <div className="bg-gray-900 text-white px-3 py-1 rounded-lg shadow-lg text-xs sm:text-sm">
              {countdown}
            </div>
        )}
        <div className="bg-gray-900 text-white px-3 py-1 rounded-lg shadow-lg text-xs sm:text-sm">
          <span className="font-bold mr-2">Controls:</span>
          <span className="mr-2">Arrows - Rotate</span>
          <span className="mr-2">WASD - Pan</span>
          <span>Wheel/Pinch - Zoom</span>
        </div>
        <div className="hidden sm:block bg-gray-900 text-white px-3 py-1 rounded-lg shadow-lg text-xs sm:text-sm">
          <span className="mr-2">Camera Position:</span>
          <span className="mr-2">X: {cameraPosition.x.toFixed(2)}</span>
          <span className="mr-2">Y: {cameraPosition.y.toFixed(2)}</span>
          <span>Z: {cameraPosition.z.toFixed(2)}</span>
        </div>
      </div>
</>
)
  ;
};

export default SolarSystem;
