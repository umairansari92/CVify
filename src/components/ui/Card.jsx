import React from "react";

/**
 * Shared Card component for CVify
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className] - Additional classes
 * @param {"default" | "glass" | "standard"} [props.variant] - Card style variant
 */
/**
 * CVify V3.4 Shared Card System
 * Enforces strict design system, alignment, and theme inheritance.
 */
const Card = ({ children, className = "", variant = "default" }) => {
  const baseStyles = {
    // default: Standard SaaS dashboard look
    default: "bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[var(--card-shadow)]",
    // glass: Modern frosted depth for high-impact sections
    glass: "backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl transition-all duration-500",
  };

  const selectedStyle = baseStyles[variant] || baseStyles.default;

  return (
    <div className={`h-full flex flex-col justify-between rounded-3xl p-5 md:p-8 transition-all duration-300 ${selectedStyle} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
