import React from "react";

export const Badge = ({ children, variant = "tag", className = "" }) => {
  const variants = {
    status: "bg-success/10 text-success border border-success/20",
    score: "bg-primary/10 text-primary border border-primary/20",
    tag: "bg-midground text-text-secondary border border-border-subtle",
    warning: "bg-warning/10 text-warning border border-warning/20",
    danger: "bg-danger/10 text-danger border border-danger/20"
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
