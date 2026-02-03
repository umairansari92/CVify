import { Canvas } from "@react-three/fiber";
import ParticleBackground from "./ParticleBackground";

export default function ThreeBackground() {
  return (
    <div className="three-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ 
          background: "transparent",
          width: "100%",
          height: "100%"
        }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <ParticleBackground />
      </Canvas>
    </div>
  );
}
