import React from "react";
import { useTheme } from "../../engine/ThemeContext.jsx";

/**
 * Badge — Shared primitive. Skill tags, category labels, status indicators.
 *
 * Props:
 *   variant: "accent" | "muted" | "outline"
 */
const Badge = ({ children, variant = "muted", className = "" }) => {
  const { tokens } = useTheme();
  const accent = tokens?.colors?.accent || "#2563eb";

  const variants = {
    accent:  `bg-[${accent}]/10 text-[${accent}] border border-[${accent}]/20`,
    muted:   `bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--card-border)]`,
    outline: `bg-transparent text-[var(--text-primary)] border border-[var(--card-border)]`,
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${variants[variant] || variants.muted} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
