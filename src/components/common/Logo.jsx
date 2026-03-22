import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Logo = ({ className = "w-40" }) => {
  const { theme } = useTheme();

  const logoSrc = theme === "dark" 
    ? "/CVify Logo Dark.jpg" 
    : "/CVify Logo Light.jpg";

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ 
            duration: 0.4, 
            ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for premium feel
          }}
          className="w-full h-auto flex items-center justify-center"
        >
          <img
            src={logoSrc}
            alt="CVify Pro"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Logo;
