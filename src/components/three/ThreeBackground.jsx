import React from "react";
import { Canvas } from "@react-three/fiber";
import ParticleBackground from "./ParticleBackground";

export default function ThreeBackground() {
  const [retryKey, setRetryKey] = React.useState(0);

  return (
    <div className="three-canvas-container">
      <Canvas
        key={retryKey}
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
          preserveDrawingBuffer: false, // Optimization
        }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            console.warn("CVify: WebGL Context Lost. Attempting recovery...");
            setTimeout(() => {
              setRetryKey((prev) => (prev < 3 ? prev + 1 : prev));
            }, 1000);
          });
          gl.domElement.addEventListener("webglcontextrestored", () => {
            console.info("CVify: WebGL Context Restored.");
          });
        }}
      >
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <ParticleBackground />
      </Canvas>
    </div>
  );
}
