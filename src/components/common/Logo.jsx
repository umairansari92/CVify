import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { m, AnimatePresence } from "framer-motion";

const Logo = ({ className = "w-40" }) => {
  const { theme } = useTheme();

  const logoSrc = theme === "dark" 
    ? "/CVify Logo Dark.jpg" 
    : "/CVify Logo Light.jpg";

  return (
    <div className={`relative ${className}`}>
      {/* 
        Executive Choice: Hardware-level theme switching 
        Explicit width/height and loading=eager ensures 0 CLS and fast LCP.
      */}
      <img
        src="/CVify Logo Light.jpg"
        alt="CVify Pro"
        width="160"
        height="44"
        fetchpriority="high"
        loading="eager"
        className="dark:hidden block w-full h-auto object-contain rounded-lg"
      />
      <img
        src="/CVify Logo Dark.jpg"
        alt="CVify Pro"
        width="160"
        height="44"
        fetchpriority="high"
        loading="eager"
        className="hidden dark:block w-full h-auto object-contain rounded-lg"
      />
    </div>
  );
};

export default Logo;
