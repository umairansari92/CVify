import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function VibrantEarth() {
  const groupRef = useRef();
  const earthRef = useRef();

  const earthTexture = useLoader(
    THREE.TextureLoader,
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
  );
  earthTexture.wrapS = THREE.RepeatWrapping;
  earthTexture.wrapT = THREE.ClampToEdgeWrapping;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
    }
    if (earthRef.current) earthRef.current.rotation.y = t * 0.12;
  });

  return (
    <group ref={groupRef}>
      <Sphere ref={earthRef} args={[1.0, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          color="#ffffff"
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>
    </group>
  );
}

export default function AnimatedGlobe() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]" style={{ minHeight: '300px' }}>
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={1.3} />
        <directionalLight position={[5, 3, 5]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#c4b5fd" />

        <Suspense fallback={null}>
          <VibrantEarth />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
