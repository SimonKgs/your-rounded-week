import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { threeStyles } from '../styles';

export const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create the scene
    const scene = new THREE.Scene();

    // Create the camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = window.innerWidth < 768 ? 10 : 4;

    // Create the renderer and set its size
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const updateSize = () => {
      const width = window.innerWidth / 3;
      const height = window.innerHeight / 3;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    updateSize();
    mountRef.current.appendChild(renderer.domElement);

    // Create a basic donut
    const geometry = new THREE.TorusGeometry(1, 0.6, 16, 100);
    const material = new THREE.MeshToonMaterial({ color: 0x8B4513 });
    const donut = new THREE.Mesh(geometry, material);
    scene.add(donut);

    // Create lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Handle mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let rotationY = 0;
    const threshold = 1;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const rotationSpeed = distanceFromCenter * 0.02;
      rotationY = distanceFromCenter < threshold ? (mouseX > 0 ? rotationSpeed : -rotationSpeed) : 0;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      donut.rotation.y += rotationY;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      updateSize(); 
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      console.log('Cleaning...')
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      // very importatnt to not accumulate weight in memory
      renderer.forceContextLoss();
      // From here also important dispose all to clean memory usage
      renderer.dispose(); 

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={threeStyles['three-container']}>
      <div ref={mountRef} className={threeStyles['three-scene-container']} />
    </div>
  );
};
