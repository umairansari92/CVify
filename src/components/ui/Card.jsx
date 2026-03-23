import React from "react";

/**
 * Shared Card component for CVify
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className] - Additional classes
 * @param {"default" | "glass" | "standard"} [props.variant] - Card style variant
 */
const Card = ({ children, className = "", variant = "themed" }) => {
  const baseStyles = {
    // themed: uses custom CSS variables (for Public Portfolio)
    themed: "bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[var(--card-shadow)] rounded-[2.5rem] p-6 transition-all duration-300",
    // glass: frosted look (for high-end sections)
    glass: "backdrop-blur-xl bg-white/10 border border-white/20 rounded-[3rem] shadow-2xl transition-all duration-500",
    // standard: legacy look / profile editor UI
    standard: "bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-white/5 shadow-sm transition-all duration-300"
  };

  const selectedStyle = baseStyles[variant] || baseStyles.themed;

  return (
    <div className={`${selectedStyle} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
