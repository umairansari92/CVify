import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaStar } from "react-icons/fa";
import { tokens } from "../tokens";

/**
 * APEX — Galaxy Detail Panel (Right Sidebar)
 * Displays project stats, proficiency, description, and related skills.
 */
const DetailPanel = ({ skill, onClose }) => {
  if (!skill) return null;

  // Generate mockup values based on the skill name for premium feel
  const yearsExp = 2 + ((skill.name.length * 3) % 6);
  const projectsCount = 3 + ((skill.name.length * 7) % 12);
  const rating = 4.0 + (Math.round((skill.name.length % 10) * 0.1 * 10) / 10);
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  const desc = skill.description || `Highly proficient with ${skill.name}. Integrated into robust production setups, focusing on performance, clean codebase architecture, and scalable integrations.`;

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 250 }}
      className="absolute top-0 right-0 h-full w-full md:w-[380px] z-40 border-l flex flex-col justify-between"
      style={{
        backgroundColor: `${tokens.colors.surface}f5`,
        borderColor: tokens.colors.border,
        backdropFilter: "blur(20px)",
        boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: tokens.colors.border }}>
          <div className="flex items-center gap-3">
            <span className="text-xl">
              {skill.category === "Technical" ? "⚡" : skill.category === "Strategic" ? "🧠" : "🤝"}
            </span>
            <div>
              <h3 className="text-lg font-black tracking-tight" style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}>
                {skill.name}
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded" style={{
                backgroundColor: skill.category === "Technical" ? `${tokens.colors.accent}20` : skill.category === "Strategic" ? "#7c3aed20" : "#ea580c20",
                color: skill.category === "Technical" ? tokens.colors.accent : skill.category === "Strategic" ? "#a78bfa" : "#fb923c",
              }}>
                {skill.category || "Skill"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border transition-all hover:bg-white/5"
            style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.colors.secondary }}>
            About
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: tokens.colors.secondary }}>
            {desc}
          </p>
        </div>

        {/* Proficiency */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider" style={{ color: tokens.colors.secondary }}>
            <span>Proficiency</span>
            <span style={{ color: tokens.colors.accent }}>{rating.toFixed(1)} / 5.0</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={14}
                color={i < fullStars ? tokens.colors.accent : (i === fullStars && halfStar ? tokens.colors.accent : "rgba(255,255,255,0.1)")}
              />
            ))}
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden mt-2" style={{ backgroundColor: tokens.colors.border }}>
            <div className="h-full rounded-full" style={{ width: `${(rating / 5) * 100}%`, backgroundColor: tokens.colors.accent }} />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-4 py-2">
          <div className="p-3 rounded-xl border text-center" style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.bg }}>
            <span className="block text-lg font-black" style={{ color: tokens.colors.accent }}>{yearsExp}+</span>
            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: tokens.colors.secondary }}>Years</span>
          </div>
          <div className="p-3 rounded-xl border text-center" style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.bg }}>
            <span className="block text-lg font-black text-white">{projectsCount}+</span>
            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: tokens.colors.secondary }}>Projects</span>
          </div>
          <div className="p-3 rounded-xl border text-center" style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.bg }}>
            <span className="block text-lg font-black text-white">2+</span>
            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: tokens.colors.secondary }}>Certs</span>
          </div>
        </div>

        {/* Related Skills */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.colors.secondary }}>
            Related Focus Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {["System Optimization", "Clean Code", "Design Patterns", "Performance Debugging"].map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-lg border text-white" style={{ borderColor: tokens.colors.border, backgroundColor: "rgba(255,255,255,0.02)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t" style={{ borderColor: tokens.colors.border }}>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-black transition-all hover:scale-[1.02]"
          style={{ backgroundColor: tokens.colors.accent }}
        >
          View All Details
        </button>
      </div>
    </motion.div>
  );
};

export default DetailPanel;
