import React from "react";
import { m } from "framer-motion";
import { FiLoader } from "react-icons/fi";

const PremiumButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  isLoading = false, 
  disabled = false, 
  className = "",
  icon: Icon,
  type = "button"
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-white shadow-xl shadow-primary/20",
    secondary: "glass-medium text-text-main border-card-border hover:bg-white/[0.08]",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white"
  };

  return (
    <m.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={!disabled && !isLoading ? { y: -2, scale: 1.02 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      className={`
        px-8 py-4 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase transition-all 
        flex items-center justify-center gap-3 relative overflow-hidden 
        disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
    >
      {isLoading ? (
        <FiLoader className="animate-spin text-lg" />
      ) : (
        <>
          {Icon && <Icon size={16} />}
          {children}
        </>
      )}
      
      {/* HUD Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </m.button>
  );
};

export default PremiumButton;
