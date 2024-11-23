import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PlanetConfig {
  mesh: THREE.Mesh;
  distance: number;
}

const SolarSystem = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountDiv = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 30, 100);
    camera.lookAt(0, 0, 0);
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountDiv.appendChild(renderer.domElement);
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    const sunLight = new THREE.PointLight(0xffffff, 1, 0, 1);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Create sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xff9933 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    // Create planets
    const createPlanet = (
        radius: number,
        distance: number,
        color: number
    ): PlanetConfig => {
      const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const planetMaterial = new THREE.MeshPhongMaterial({ color });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      // Create orbit
      const orbitGeometry = new THREE.BufferGeometry();
      const orbitPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 360; i++) {
        const theta = (i / 360) * Math.PI * 2;
        orbitPoints.push(
            new THREE.Vector3(Math.cos(theta) * distance, 0, Math.sin(theta) * distance)
        );
      }
      orbitGeometry.setFromPoints(orbitPoints);
      const orbit = new THREE.Line(
          orbitGeometry,
          new THREE.LineBasicMaterial({ color: 0x444444 })
      );
      scene.add(orbit);

      return { mesh: planet, distance };
    };

    const planets: PlanetConfig[] = [
      createPlanet(1, 10, 0x999999),  // Mercury
      createPlanet(1.5, 15, 0xffcc99), // Venus
      createPlanet(2, 20, 0x3333ff),   // Earth
      createPlanet(1.2, 25, 0xff6666)  // Mars
    ];
    planets.forEach(planet => scene.add(planet.mesh));

    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate sun
      sun.rotation.y += 0.001;
      // Rotate and orbit planets
      planets.forEach((planet, index) => {
        const speed = 0.001 / (index + 1);
        const time = Date.now() * speed;

        planet.mesh.position.x = Math.cos(time) * planet.distance;
        planet.mesh.position.z = Math.sin(time) * planet.distance;

        planet.mesh.rotation.y += 0.02;
      });
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
      mountDiv.removeChild(renderer.domElement);
      // Clean up Three.js resources
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default SolarSystem;