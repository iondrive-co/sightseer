import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitalSystem } from "~/components/OrbitalMechanics";

interface PlanetConfig {
  name: string;
  radius: number;
  orbitRadius: number;
  color: number;
}

interface Planet extends PlanetConfig {
  mesh: THREE.Mesh;
}

const SolarSystem = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        throw new Error(
            'WebGL is not supported in your browser. Try enabling it in your browser settings or using a different browser.'
        );
      }

      const mountDiv = mountRef.current;
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111111);
      // Grid helper for reference
      const gridHelper = new THREE.GridHelper(200, 20, 0x444444, 0x222222);
      scene.add(gridHelper);
      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 75, 150);
      camera.lookAt(0, 0, 0);
      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountDiv.appendChild(renderer.domElement);
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      scene.add(ambientLight);
      const sunLight = new THREE.PointLight(0xffffff, 2.0);
      sunLight.position.set(0, 0, 0);
      scene.add(sunLight);
      // Create sun
      const sun = new THREE.Mesh(
          new THREE.SphereGeometry(8, 32, 32),
          new THREE.MeshBasicMaterial({ color: 0xff9933 })
      );
      scene.add(sun);
      // Planet configurations
      const planetConfigs: PlanetConfig[] = [
        { name: 'mercury', radius: 3, orbitRadius: 25, color: 0x999999 },
        { name: 'venus',   radius: 4, orbitRadius: 40, color: 0xffcc99 },
        { name: 'earth',   radius: 5, orbitRadius: 60, color: 0x3333ff },
        { name: 'mars',    radius: 4, orbitRadius: 80, color: 0xff4444 }
      ];
      // Create orbital system
      const orbitalSystem = new OrbitalSystem(scene);
      // Create planets and their orbits
      const planets: Planet[] = planetConfigs.map(config => {
        // Create planet
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(config.radius, 32, 32),
            new THREE.MeshPhongMaterial({ color: config.color })
        );
        scene.add(planet);
        // Create orbit
        orbitalSystem.addOrbit(config.name, {
          radius: config.orbitRadius,
          color: config.color,
          opacity: 1.0,
          lineWidth: 2
        });
        return { ...config, mesh: planet };
      });
      // Create transfer orbits
      const transfers = [
        { name: 'mercury-venus', start: 25, end: 40, color: 0x00ff00 },
        { name: 'venus-earth',   start: 40, end: 60, color: 0x0000ff },
        { name: 'earth-mars',    start: 60, end: 80, color: 0xff0000 }
      ];
      transfers.forEach(transfer => {
        orbitalSystem.addTransfer(transfer.name, {
          startRadius: transfer.start,
          endRadius: transfer.end,
          color: transfer.color,
          opacity: 1.0,
          lineWidth: 2
        });
      });

      let transferProgress = 0;
      let activeTransfer: string | null = null;
      const animate = () => {
        requestAnimationFrame(animate);
        // Rotate sun
        sun.rotation.y += 0.005;
        // Update planets
        planets.forEach((planet, index) => {
          const time = Date.now() * 0.001;
          const orbit = orbitalSystem.getOrbit(planet.name);
          if (orbit) {
            const position = orbit.getPosition(time * (0.5 / (index + 1)));
            planet.mesh.position.copy(position);
            planet.mesh.rotation.y += 0.02;
          }
        });
        // Update transfer orbits
        if (activeTransfer) {
          const currentTransfer = orbitalSystem.getTransfer(activeTransfer);
          if (currentTransfer) {
            try {
              transferProgress += 0.01;
              currentTransfer.updateProgress(transferProgress);
            } catch (err) {
              console.error('Error updating transfer:', err);
              transferProgress = 0;
              activeTransfer = null;
              return;
            }
            if (transferProgress >= 1) {
              setTimeout(() => {
                currentTransfer.setVisible(false);
                transferProgress = 0;
                activeTransfer = null;
              }, 500); // Small delay to show the fully rendered transfer
            }
          }
        } else {
          // Pick a random transfer to start
          const randomIndex = Math.floor(Math.random() * transfers.length);
          activeTransfer = transfers[randomIndex].name;
          const nextTransfer = orbitalSystem.getTransfer(activeTransfer);
          if (nextTransfer) {
            nextTransfer.setVisible(true);
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
      <div
          ref={mountRef}
          className="w-full h-screen"
          style={{ backgroundColor: '#111111' }}
      />
  );
};

export default SolarSystem;