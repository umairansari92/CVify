import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleBackground() {
  const points = useRef();
  const particlesCount = 500;

  // Create a more structured particle system
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      // Create a more organized distribution
      const radius = Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cls = new Float32Array(particlesCount * 3);
    const themeColors = [
      new THREE.Color("#6366F1"), // Indigo Primary
      new THREE.Color("#818CF8"), // Soft Indigo
      new THREE.Color("#10B981"), // Emerald Success
      new THREE.Color("#C084FC"), // Violet Accent
      new THREE.Color("#4F46E5"), // Royal Blue
    ];
    for (let i = 0; i < particlesCount; i++) {
      const color = themeColors[Math.floor(Math.random() * themeColors.length)];
      cls[i * 3] = color.r;
      cls[i * 3 + 1] = color.g;
      cls[i * 3 + 2] = color.b;
    }
    return cls;
  }, []);

  useFrame((state) => {
    if (points.current) {
      // Smooth, slow rotation
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      points.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
