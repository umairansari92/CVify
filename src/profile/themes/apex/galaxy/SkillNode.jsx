import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { tokens } from "../tokens";

// Color mapping for skill categories to neon nodes
const CATEGORY_COLORS = {
  Technical: {
    color: "#2D9881", // teal
    glow: "rgba(45, 152, 129, 0.4)",
    bg: "rgba(45, 152, 129, 0.08)",
    border: "rgba(45, 152, 129, 0.2)",
    label: "Development",
  },
  Strategic: {
    color: "#7C3AED", // violet
    glow: "rgba(124, 58, 237, 0.4)",
    bg: "rgba(124, 58, 237, 0.08)",
    border: "rgba(124, 58, 237, 0.2)",
    label: "Strategic",
  },
  "Soft Skills": {
    color: "#EA580C", // orange
    glow: "rgba(234, 88, 12, 0.4)",
    bg: "rgba(234, 88, 12, 0.08)",
    border: "rgba(234, 88, 12, 0.2)",
    label: "Leadership",
  },
  Default: {
    color: "#2D9881",
    glow: "rgba(45, 152, 129, 0.4)",
    bg: "rgba(45, 152, 129, 0.08)",
    border: "rgba(45, 152, 129, 0.2)",
    label: "Skills",
  },
};

const SkillNode = ({
  name,
  category,
  angle,
  radiusX,
  radiusY,
  mousePos = { x: 0, y: 0 },
  onHoverChange,
  onClick,
  active,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Compute standard category config
  const cfg = useMemo(() => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS.Default;
  }, [category]);

  // Compute position based on ellipse angles
  const x = useMemo(() => Math.cos(angle) * radiusX, [angle, radiusX]);
  const y = useMemo(() => Math.sin(angle) * radiusY, [angle, radiusY]);

  // Add mouse parallax shifts
  const px = (mousePos.x || 0) * 8;
  const py = (mousePos.y || 0) * 8;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(calc(-50% + ${x + px}px), calc(-50% + ${y + py}px))`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.15s ease-out",
        zIndex: isHovered || active ? 50 : 20,
      }}
    >
      <motion.button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{
          scale: isHovered ? 1.15 : active ? 1.08 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          cursor: "pointer",
          background: "none",
          border: "none",
          outline: "none",
          padding: "6px",
        }}
      >
        {/* Node Circle */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: isHovered ? `${cfg.color}18` : cfg.bg,
            border: `1.5px solid ${isHovered ? cfg.color : cfg.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
            boxShadow: isHovered
              ? `0 0 20px ${cfg.glow}, inset 0 0 10px ${cfg.color}30`
              : active
              ? `0 0 12px ${cfg.glow}`
              : "none",
            transition: "all 0.3s ease",
            position: "relative",
          }}
        >
          {/* Dynamic Category Mini-Emoji/Icon */}
          <span className="text-base select-none">
            {category === "Technical" ? "⚡" : category === "Strategic" ? "🧠" : "🤝"}
          </span>

          {/* Tiny glowing dot badge */}
          {active && (
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: cfg.color,
                boxShadow: `0 0 8px ${cfg.color}`,
              }}
            />
          )}
        </div>

        {/* Skill label */}
        <div
          style={{
            fontFamily: tokens.fonts.heading,
            fontSize: "11px",
            fontWeight: "700",
            color: isHovered ? "#ffffff" : tokens.colors.primary,
            textShadow: isHovered ? `0 0 8px ${cfg.color}bb` : "none",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
            backgroundColor: "rgba(13, 15, 18, 0.75)",
            padding: "2px 8px",
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {name}
        </div>
      </motion.button>
    </div>
  );
};

export default SkillNode;
