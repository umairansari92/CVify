import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function VibrantEarth() {
  const groupRef = useRef();
  const earthRef = useRef();
  const outerRibbonRef1 = useRef();
  const outerRibbonRef2 = useRef();

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
    
    // Abstract ribbons spinning
    if (outerRibbonRef1.current) {
      outerRibbonRef1.current.rotation.y = -t * 0.2;
      outerRibbonRef1.current.rotation.x = t * 0.2;
      outerRibbonRef1.current.rotation.z = Math.sin(t * 0.5) * 0.3;
    }
    
    if (outerRibbonRef2.current) {
      outerRibbonRef2.current.rotation.y = t * 0.3;
      outerRibbonRef2.current.rotation.x = -t * 0.1;
      outerRibbonRef2.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Bright Earth Core */}
      <Sphere ref={earthRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial 
          map={earthTexture}
          color="#ffffff" // pure white base so texture colors are vibrant
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>

      {/* 2. Bright Tech Ribbon 1 */}
      <Sphere ref={outerRibbonRef1} args={[1.75, 12, 12]}>
        <meshBasicMaterial 
          color="#915eff" 
          wireframe={true} 
          transparent={true} 
          opacity={0.6} 
        />
      </Sphere>

      {/* 3. Bright Tech Ribbon 2 */}
      <Sphere ref={outerRibbonRef2} args={[2.0, 8, 8]}>
        <meshBasicMaterial 
          color="#00f6ff" 
          wireframe={true} 
          transparent={true} 
          opacity={0.4} 
        />
      </Sphere>
    </group>
  );
}

export default function AnimatedGlobe() {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        {/* Very Bright Lights so the Earth map is highly visible */}
        <ambientLight intensity={2} />
        <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
        
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
