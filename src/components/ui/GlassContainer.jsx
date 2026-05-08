import React from "react";
import { m } from "framer-motion";

const GlassContainer = ({ 
  children, 
  className = "", 
  intensity = "medium", 
  animateEntrance = true,
  neon = false,
  delay = 0,
  ...props 
}) => {
  const intensities = {
    soft: "glass-soft",
    medium: "glass-medium",
    strong: "glass-strong"
  };

  return (
    <m.div
      initial={animateEntrance ? { opacity: 0, y: 20 } : false}
      whileInView={animateEntrance ? { opacity: 1, y: 0 } : false}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: delay 
      }}
      whileHover={{ 
        y: -5, 
        scale: 1.01,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={`${intensities[intensity]} rounded-3xl p-6 lg:p-8 hover:shadow-hover transition-shadow ${neon ? "card-neon-border" : ""} ${className}`}
      {...props}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </m.div>
  );
};

export default GlassContainer;
