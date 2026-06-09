import React from "react";

const Card = ({ children, className = "", variant = "default" }) => {
  const baseStyles = {
    default: "bg-midground border border-border-subtle shadow-premium",
    glass: "glass-medium",
    elevated: "bg-midground border border-border-subtle shadow-ultimate hover:-translate-y-1 hover:shadow-glow-primary",
    flat: "bg-bg-secondary border border-transparent"
  };

  const selectedStyle = baseStyles[variant] || baseStyles.default;

  return (
    <div className={`h-full flex flex-col justify-between rounded-[24px] p-5 md:p-8 transition-all duration-300 ${selectedStyle} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
