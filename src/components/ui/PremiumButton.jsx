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
    primary: "bg-primary text-white shadow-premium hover:bg-accent",
    secondary: "bg-white text-text-main border border-card-border hover:bg-[#F8FBFA] hover:border-primary",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white"
  };

  return (
    <m.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={!disabled && !isLoading ? { y: -1 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      className={`
        px-6 rounded-[14px] font-semibold text-[14px] transition-all 
        flex items-center justify-center gap-2 relative overflow-hidden h-[48px]
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
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] pointer-events-none" />
    </m.button>
  );
};

export default PremiumButton;
