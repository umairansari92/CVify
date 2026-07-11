import React, { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * APEX — Particle Galaxy Background
 * Renders small glowing stars/particles that drift around subtly.
 */
const ParticleBackground = ({ count = 35 }) => {
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1.2,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 6,
        color: Math.random() > 0.4 ? "rgba(45, 152, 129, 0.45)" : "rgba(255, 255, 255, 0.3)",
      });
    }
    return list;
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.15, 0.8, 0.15],
            y: [0, -12, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
