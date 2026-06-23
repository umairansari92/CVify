import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function CustomGlobe() {
  const globeGroupRef = useRef();
  const innerRef = useRef();
  const outerRef = useRef();
  const outerRingRef = useRef();

  // Load public Earth dark texture for sci-fi look
  // You can replace this URL with your local image e.g., '/earth-map.png' if you place it in public/
  const earthTexture = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-dark.jpg');
  earthTexture.wrapS = THREE.RepeatWrapping;
  earthTexture.wrapT = THREE.ClampToEdgeWrapping;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Floating wave effect
    if (globeGroupRef.current) {
      globeGroupRef.current.position.y = Math.sin(t * 1) * 0.1;
    }
    
    // Core smooth rotation
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.1;
    }
    
    // Outer abstract wireframe shields/ribbons
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.25;
      outerRef.current.rotation.x = t * 0.1;
      outerRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
    
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = t * 0.3;
      outerRingRef.current.rotation.z = -t * 0.1;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* 1. Inner Globe Layer using Texture */}
      <Sphere ref={innerRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial 
          map={earthTexture}
          roughness={0.2}             
          metalness={0.7}             
          color="#2a3b5c"
        />
      </Sphere>

      {/* 2. Primary Outer Shield / Ribbons (Wireframe Poly) */}
      <Sphere ref={outerRef} args={[1.7, 12, 12]}>
        <meshStandardMaterial 
          color="#4f46e5" 
          wireframe={true} 
          transparent={true} 
          opacity={0.4} 
          metalness={1}
          roughness={0.1}
        />
      </Sphere>

      {/* 3. Secondary Outer Ring layer (Sleek Metallic Accents) */}
      <Sphere ref={outerRingRef} args={[1.9, 8, 8]}>
        <meshStandardMaterial 
          color="#c4b5fd" 
          wireframe={true} 
          transparent={true} 
          opacity={0.2} 
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>
    </group>
  );
}

export default function AnimatedGlobe() {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '350px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#915eff" />
        <directionalLight position={[-5, 5, 5]} intensity={1} color="#c4b5fd" />
        
        {/* Background Star Field Effect */}
        <Stars radius={100} depth={50} count={3000} factor={3} saturation={0.5} fade speed={1} />
        
        <Suspense fallback={null}>
          <CustomGlobe />
        </Suspense>
        
        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
