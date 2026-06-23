import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';

function SciFiGlobe() {
  const groupRef = useRef();
  const coreRef = useRef();
  const gridRef = useRef();
  const outerRibbonRef1 = useRef();
  const outerRibbonRef2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Float the entire group
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.15;
    }
    
    // Core and grid rotation (Earth spin)
    if (coreRef.current) coreRef.current.rotation.y = t * 0.15;
    if (gridRef.current) gridRef.current.rotation.y = t * 0.15;
    
    // Abstract ribbons spinning in different directions
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
      {/* 1. Solid Glowing Core */}
      <Sphere ref={coreRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial 
          color="#0b081c" 
          emissive="#2b145a"
          emissiveIntensity={0.8}
          roughness={0.4}
        />
      </Sphere>

      {/* 2. Globe Latitude/Longitude Grid */}
      <Sphere ref={gridRef} args={[1.52, 24, 24]}>
        <meshBasicMaterial 
          color="#915eff" 
          wireframe={true} 
          transparent={true} 
          opacity={0.3} 
        />
      </Sphere>

      {/* 3. Dynamic Outer Shield / Ribbon 1 */}
      <Sphere ref={outerRibbonRef1} args={[1.75, 10, 10]}>
        <MeshDistortMaterial 
          color="#915eff" 
          wireframe={true} 
          transparent={true} 
          opacity={0.5} 
          distort={0.3} 
          speed={2} 
        />
      </Sphere>

      {/* 4. Outer Tech Ring / Ribbon 2 */}
      <Sphere ref={outerRibbonRef2} args={[2.0, 6, 6]}>
        <meshBasicMaterial 
          color="#c4b5fd" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
        />
      </Sphere>
    </group>
  );
}

export default function AnimatedGlobe() {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        {/* Lights */}
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#915eff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#c4b5fd" />
        
        {/* Deep Space Background Stars */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={2} />
        
        <SciFiGlobe />
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false} 
        />
      </Canvas>
    </div>
  );
}
