import React from "react";
import { useTheme } from "../../engine/ThemeContext.jsx";

/**
 * Card — Shared primitive.
 * Automatically uses glass or minimal style based on ThemeContext config.
 *
 * Props:
 *   glass:   boolean — force glass style regardless of theme
 *   hover:   boolean — enable hover lift effect
 *   padding: string  — tailwind padding class, default "p-6"
 */
const Card = ({ children, glass, hover = true, padding = "p-6", className = "", style = {}, ...props }) => {
  const { config } = useTheme();
  const isGlass = glass !== undefined ? glass : config?.glass !== undefined;

  return (
    <div
      className={`
        ${padding} rounded-[var(--card-radius,1rem)]
        border border-[var(--card-border)] bg-[var(--card-bg)]
        ${isGlass ? "backdrop-blur-md" : ""}
        ${hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" : ""}
        ${className}
      `}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
