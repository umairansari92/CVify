import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Logo = ({ className = "w-40" }) => {
  const { theme } = useTheme();

  // Using exact filenames from public folder
  const logoSrc = theme === "dark" 
    ? "/CVify Logo Dark.jpg" 
    : "/CVify Logo Light.jpg";

  return (
    <div className={`relative flex items-center justify-center transition-all duration-500 ease-in-out ${className}`}>
      <img
        src={logoSrc}
        alt="CVify Pro"
        className="w-full h-auto object-contain transition-all duration-500 ease-in-out"
        // Key is used to trigger a fresh animation on theme change if needed
        key={theme} 
      />
    </div>
  );
};

export default Logo;
