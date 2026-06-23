import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function VibrantEarth() {
  const groupRef = useRef();
  const earthRef = useRef();
  const outerRibbonRef1 = useRef();
  const outerRibbonRef2 = useRef();
  const outerRibbonRef3 = useRef();

  // Load a highly visible, bright blue/green Earth texture
  const earthTexture = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
  earthTexture.wrapS = THREE.RepeatWrapping;
  earthTexture.wrapT = THREE.ClampToEdgeWrapping;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Smooth floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1) * 0.1;
    }
    
    // Standard Earth rotation
    if (earthRef.current) earthRef.current.rotation.y = t * 0.15;
    
    // Solid abstract ribbons spinning
    if (outerRibbonRef1.current) {
      outerRibbonRef1.current.rotation.y = -t * 0.2;
      outerRibbonRef1.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    
    if (outerRibbonRef2.current) {
      outerRibbonRef2.current.rotation.y = t * 0.3;
      outerRibbonRef2.current.rotation.x = t * 0.1;
      outerRibbonRef2.current.rotation.z = Math.sin(t * 0.3) * 0.2;
    }

    if (outerRibbonRef3.current) {
      outerRibbonRef3.current.rotation.x = t * 0.2;
      outerRibbonRef3.current.rotation.y = Math.cos(t * 0.4) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Bright Earth Core */}
      <Sphere ref={earthRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial 
          map={earthTexture}
          color="#ffffff" 
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>

      {/* 2. Thick Solid Distorted Ribbon 1 */}
      <Torus ref={outerRibbonRef1} args={[1.8, 0.08, 16, 100]} rotation={[0.4, 0, 0.2]}>
        <MeshDistortMaterial 
          color="#e2e8f0" 
          distort={0.4} 
          speed={2} 
          roughness={0.3} 
          metalness={0.5}
        />
      </Torus>

      {/* 3. Thick Solid Distorted Ribbon 2 */}
      <Torus ref={outerRibbonRef2} args={[1.75, 0.06, 16, 100]} rotation={[-0.5, 0.5, -0.2]}>
        <MeshDistortMaterial 
          color="#c4b5fd" 
          distort={0.5} 
          speed={1.5} 
          roughness={0.3} 
          metalness={0.6}
        />
      </Torus>

      {/* 4. Thick Solid Distorted Ribbon 3 */}
      <Torus ref={outerRibbonRef3} args={[1.9, 0.05, 16, 100]} rotation={[0, -0.6, 0.4]}>
        <MeshDistortMaterial 
          color="#915eff" 
          distort={0.3} 
          speed={3} 
          roughness={0.2} 
          metalness={0.8}
        />
      </Torus>
    </group>
  );
}

export default function AnimatedGlobe() {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        {/* Very Bright Lights so the Earth map and ribbons are highly visible */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffffff" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={2} />
        
        <Suspense fallback={null}>
          <VibrantEarth />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false} 
        />
      </Canvas>
    </div>
  );
}
