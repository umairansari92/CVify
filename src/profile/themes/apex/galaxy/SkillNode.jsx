import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaStar } from "react-icons/fa";
import { tokens } from "../tokens";

// Color mapping for skill categories
const CATEGORY_COLORS = {
  Technical: {
    color: "#2D9881", // teal
    glow: "rgba(45, 152, 129, 0.4)",
    bg: "rgba(45, 152, 129, 0.08)",
    border: "rgba(45, 152, 129, 0.2)",
    label: "Core Skill",
  },
  Strategic: {
    color: "#7C3AED", // violet
    glow: "rgba(124, 58, 237, 0.4)",
    bg: "rgba(124, 58, 237, 0.08)",
    border: "rgba(124, 58, 237, 0.2)",
    label: "Strategic Focus",
  },
  "Soft Skills": {
    color: "#EA580C", // orange
    glow: "rgba(234, 88, 12, 0.4)",
    bg: "rgba(234, 88, 12, 0.08)",
    border: "rgba(234, 88, 12, 0.2)",
    label: "Support Focus",
  },
  Default: {
    color: "#2D9881",
    glow: "rgba(45, 152, 129, 0.4)",
    bg: "rgba(45, 152, 129, 0.08)",
    border: "rgba(45, 152, 129, 0.2)",
    label: "Skill Focus",
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
  onClose,
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

  // Mockup popover values based on length of name
  const yearsExp = 2 + (name.length % 5);
  const rating = 4.2 + (Math.round((name.length % 9) * 0.1 * 10) / 10);
  const fullStars = Math.floor(rating);

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
      {/* ── Dynamic Floating Detail Popover Card ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing popover when clicking inside it
            className="absolute bottom-[76px] left-1/2 -translate-x-1/2 w-60 rounded-2xl border text-left p-4 space-y-3 z-50 shadow-2xl"
            style={{
              backgroundColor: "rgba(22, 25, 32, 0.95)",
              borderColor: cfg.color,
              backdropFilter: "blur(16px)",
              boxShadow: `0 8px 32px rgba(0, 0, 0, 0.6), 0 0 15px ${cfg.glow}`,
            }}
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {category === "Technical" ? "⚡" : category === "Strategic" ? "🧠" : "🤝"}
                </span>
                <div>
                  <h4 className="text-xs font-black text-white leading-tight">
                    {name}
                  </h4>
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    {cfg.label}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-1 rounded-md border border-slate-700/40 text-slate-400 hover:text-white transition-colors"
              >
                <FaTimes size={8} />
              </button>
            </div>

            {/* Content Stats */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>Rating</span>
                <span style={{ color: cfg.color }}>{rating.toFixed(1)} / 5.0</span>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={10}
                    color={i < fullStars ? cfg.color : "rgba(255,255,255,0.08)"}
                  />
                ))}
              </div>
            </div>

            {/* Experience / Status */}
            <div className="flex justify-between items-center bg-slate-900/40 border border-slate-800/40 rounded-xl p-2 text-[10px]">
              <div>
                <span className="block font-black text-white">{yearsExp}+ Years</span>
                <span className="text-[8px] text-slate-500 uppercase font-bold">Experience</span>
              </div>
              <div className="text-right">
                <span className="block font-black text-emerald-400">Active</span>
                <span className="text-[8px] text-slate-500 uppercase font-bold">Status</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
