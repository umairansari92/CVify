import React from "react";
import { m } from "framer-motion";

const GlassContainer = ({ children, className = "", intensity = "medium", ...props }) => {
  const intensities = {
    soft: "glass-soft",
    medium: "glass-medium",
    strong: "glass-strong"
  };

  return (
    <m.div
      className={`${intensities[intensity]} rounded-3xl p-6 lg:p-8 ${className}`}
      {...props}
    >
      {children}
    </m.div>
  );
};

export default GlassContainer;
