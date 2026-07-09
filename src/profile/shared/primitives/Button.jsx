import React from "react";
import { useTheme } from "../../engine/ThemeContext.jsx";

/**
 * Button — Shared primitive.
 * Reads accent color from ThemeContext. No prop drilling needed.
 *
 * Props:
 *   variant: "primary" | "secondary" | "ghost"
 *   size:    "sm" | "md" | "lg"
 *   as:      "button" | "a" (for link rendering)
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  as: Tag = "button",
  className = "",
  ...props
}) => {
  const { tokens } = useTheme();
  const accent = tokens?.colors?.accent || "#2563eb";

  const sizes = { sm: "px-4 py-2 text-xs", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };
  const base  = `inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest rounded-full transition-all duration-200 select-none ${sizes[size] || sizes.md}`;

  const variants = {
    primary:   `bg-[${accent}] text-white hover:opacity-90 hover:scale-105 shadow-lg`,
    secondary: `border border-[${accent}] text-[${accent}] bg-transparent hover:bg-[${accent}]/10`,
    ghost:     `text-[${accent}] bg-transparent hover:bg-[${accent}]/10`,
  };

  return (
    <Tag className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Button;
