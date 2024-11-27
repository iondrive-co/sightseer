import {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {OrbitalSystem} from "~/components/OrbitalMechanics";

interface PlanetConfig {
  name: string;
  radius: number;
  orbitRadius: number;
  color: number;
  period: number;
}

interface Planet extends PlanetConfig {
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
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        throw new Error('WebGL is not supported in your browser');
      }

      const mountDiv = mountRef.current;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111111);
      const gridHelper = new THREE.GridHelper(200, 20, 0x444444, 0x222222);
      scene.add(gridHelper);
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 75, 150);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountDiv.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      scene.add(ambientLight);
      const sunLight = new THREE.PointLight(0xffffff, 2.0);
      sunLight.position.set(0, 0, 0);
      scene.add(sunLight);

      const sun = new THREE.Mesh(
          new THREE.SphereGeometry(8, 32, 32),
          new THREE.MeshBasicMaterial({ color: 0xff9933 })
      );
      scene.add(sun);

      const planetConfigs: PlanetConfig[] = [
        { name: 'mercury', radius: 3, orbitRadius: 25, color: 0x999999, period: 0.24 },
        { name: 'venus',   radius: 4, orbitRadius: 40, color: 0xffcc99, period: 0.62 },
        { name: 'earth',   radius: 5, orbitRadius: 60, color: 0x3333ff, period: 1.0 },
        { name: 'mars',    radius: 4, orbitRadius: 80, color: 0xff4444, period: 1.88 }
      ];

      const orbitalSystem = new OrbitalSystem(scene);
      const planets: Planet[] = planetConfigs.map(config => {
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(config.radius, 32, 32),
            new THREE.MeshPhongMaterial({ color: config.color })
        );
        scene.add(planet);
        orbitalSystem.addOrbit(config.name, {
          radius: config.orbitRadius,
          color: config.color,
          opacity: 1.0,
          lineWidth: 2
        });
        return { ...config, mesh: planet };
      });

      let transferProgress = 0;
      let activeTransfer: string | null = null;
      const transferCooldown = 2000;
      let lastTransferTime = 0;
      const TIME_MULTIPLIER = 2;
      const EARTH_YEAR = 12; // Seconds in Earth year

      const checkLaunchWindow = (earthPos: THREE.Vector3, marsPos: THREE.Vector3): number => {
        const earthAngle = Math.atan2(earthPos.z, earthPos.x);
        let marsAngle = Math.atan2(marsPos.z, marsPos.x);

        if (marsAngle < earthAngle) marsAngle += 2 * Math.PI;
        const phaseAngle = marsAngle - earthAngle;
        // 45 was empirically determined - I am not sure how to calculate this
        const PHASE_ANGLE = (45 * Math.PI) / 180;  // Convert to radians
        return Math.abs(phaseAngle - PHASE_ANGLE);
      };

      const animate = () => {
        requestAnimationFrame(animate);
        const currentTime = Date.now();

        sun.rotation.y += 0.005;

        // Update planet positions
        planets.forEach((planet) => {
          const time = currentTime * 0.001 * TIME_MULTIPLIER;
          const orbit = orbitalSystem.getOrbit(planet.name);
          if (orbit) {
            const angularVelocity = (2 * Math.PI) / (planet.period * EARTH_YEAR);
            const angle = time * angularVelocity;
            const position = orbit.getPosition(angle);
            planet.mesh.position.copy(position);
            planet.position = position.clone();
            planet.mesh.rotation.y += 0.02;
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
        } else if (currentTime - lastTransferTime > transferCooldown) {
          const earth = planets.find(p => p.name === 'earth');
          const mars = planets.find(p => p.name === 'mars');

          if (earth?.position && mars?.position) {
            const difference = checkLaunchWindow(earth.position, mars.position);
            const tolerance = 0.05;  // About 3 degrees tolerance in radians

            // Update countdown
            if (difference < tolerance) {
              setCountdown("LAUNCH WINDOW OPEN!");

              const transferName = 'earth-mars-' + currentTime;
              orbitalSystem.addTransferFromPosition(
                  transferName,
                  {
                    startRadius: 60,
                    endRadius: 80,
                    color: 0xff0000,
                    opacity: 0.7,
                    lineWidth: 2
                  },
                  earth.position
              );

              activeTransfer = transferName;
              const newTransfer = orbitalSystem.getTransfer(activeTransfer);
              if (newTransfer) {
                newTransfer.setVisible(true);
              }
            } else {
              // Calculate rough time until next window
              const currentPhase = Math.atan2(mars.position.z, mars.position.x) -
                  Math.atan2(earth.position.z, earth.position.x);
              const TARGET_PHASE = (45 * Math.PI) / 180;
              let timeToWindow = (TARGET_PHASE - currentPhase) /
                  ((2 * Math.PI) * (1/EARTH_YEAR - 1/(1.88 * EARTH_YEAR)));
              if (timeToWindow < 0) {
                timeToWindow += 2 * Math.PI / ((2 * Math.PI) * (1/EARTH_YEAR - 1/(1.88 * EARTH_YEAR)));
              }

              const scaledTime = timeToWindow / TIME_MULTIPLIER;
              const remainingTime = Math.max(0, EARTH_YEAR - scaledTime);
              const seconds = Math.floor(remainingTime % 60);
              const minutes = Math.floor(remainingTime / 60);
              setCountdown(`Next Mars launch window in: ${minutes}m ${seconds}s`);
            }
          }
        }

        renderer.render(scene, camera);
      };
      animate();

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

export default SolarSystem;