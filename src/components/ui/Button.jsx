import React from "react";
import { motion } from "framer-motion";

export const Button = ({ 
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
    primary: "bg-primary text-white shadow-premium hover:bg-[var(--primary-hover)]",
    ghost: "bg-transparent text-text-main hover:bg-[var(--surface-hover)]",
    glow: "bg-primary text-white shadow-glow-primary hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] hover:bg-[var(--primary-hover)]",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={!disabled && !isLoading ? { y: -1 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      className={`
        px-6 rounded-[14px] font-semibold text-[14px] transition-all 
        flex items-center justify-center gap-2 relative overflow-hidden h-[48px]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
    >
      {isLoading ? (
        <span className="animate-spin text-lg">⏳</span>
      ) : (
        <>
          {Icon && <Icon size={16} />}
          {children}
        </>
      )}
    </motion.button>
  );
};
