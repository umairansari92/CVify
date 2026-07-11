import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

/* ─── Category config ───────────────────────────────────────── */
const CATEGORY_CONFIG = {
  Technical: {
    label: "Development",
    emoji: "⚡",
    color: tokens.colors.accent,        // teal
    glow: "#2D988140",
    track: "#2D988120",
  },
  Strategic: {
    label: "Strategic",
    emoji: "🧠",
    color: "#7C3AED",                   // violet
    glow: "#7C3AED40",
    track: "#7C3AED20",
  },
  "Soft Skills": {
    label: "Leadership",
    emoji: "🤝",
    color: "#EA580C",                   // orange
    glow: "#EA580C40",
    track: "#EA580C20",
  },
  Default: {
    label: "Core Skills",
    emoji: "🔥",
    color: tokens.colors.accent,
    glow: "#2D988140",
    track: "#2D988120",
  },
};

/* ─── Pseudo-random bar width (deterministic) ──────────────── */
const getPct = (skill, i, catIdx) =>
  70 + ((skill.length * 7 + i * 13 + catIdx * 11) % 26);

/* ─── Animated skill row ───────────────────────────────────── */
const SkillBar = ({ skill, index, catIndex, color, glow, track }) => {
  const pct = getPct(skill, index, catIndex);
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-sm font-medium"
          style={{ color: tokens.colors.primary }}
        >
          {skill}
        </span>
        <span
          className="text-xs font-semibold tabular-nums"
          style={{ color }}
        >
          {pct}%
        </span>
      </div>
      {/* Track */}
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: track }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.1,
            delay: index * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 8px ${glow}`,
          }}
        />
      </div>
    </motion.div>
  );
};

/* ─── Category column card ─────────────────────────────────── */
const CategoryCard = ({ category, items, catIndex }) => {
  const cfg = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Default;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: catIndex * 0.12 }}
      className="relative rounded-2xl border p-7 overflow-hidden"
      style={{
        backgroundColor: `${tokens.colors.surface}cc`,
        borderColor: tokens.colors.border,
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${cfg.color}50`;
        e.currentTarget.style.boxShadow = `0 0 28px ${cfg.glow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = tokens.colors.border;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Corner glow accent */}
      <div
        className="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl"
        style={{ backgroundColor: cfg.glow }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="flex items-center justify-center w-9 h-9 rounded-xl text-lg font-bold"
          style={{
            backgroundColor: `${cfg.color}18`,
            border: `1px solid ${cfg.color}40`,
          }}
        >
          {cfg.emoji}
        </span>
        <div>
          <h3
            className="text-xs font-black uppercase tracking-[0.2em]"
            style={{ color: cfg.color }}
          >
            {cfg.label}
          </h3>
          <p
            className="text-[10px] font-medium mt-0.5"
            style={{ color: tokens.colors.secondary }}
          >
            {items.length} {items.length === 1 ? "skill" : "skills"}
          </p>
        </div>

        {/* Skill count badge */}
        <div className="ml-auto">
          <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke={cfg.track} strokeWidth="3" />
            <motion.circle
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke={cfg.color}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 100 }}
              whileInView={{ strokeDashoffset: 100 - Math.min(items.length * 8, 90) }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                strokeDasharray: "100",
                filter: `drop-shadow(0 0 4px ${cfg.color})`,
              }}
            />
          </svg>
        </div>
      </div>

      {/* Skill bars */}
      <div className="space-y-4">
        {Array.isArray(items) &&
          items.map((skill, i) => (
            <SkillBar
              key={i}
              skill={skill}
              index={i}
              catIndex={catIndex}
              color={cfg.color}
              glow={cfg.glow}
              track={cfg.track}
            />
          ))}
      </div>
    </motion.div>
  );
};

/* ─── Main Skills Section ──────────────────────────────────── */
const Skills = ({ user, isOwner }) => {
  const skillGroups = useMemo(() => {
    const groups = {};

    if (user?.skills && !Array.isArray(user.skills)) {
      // Object schema: { technical, soft, strategic }
      const tech = user.skills.technical || [];
      const soft = user.skills.soft || [];
      const strat = user.skills.strategic || [];
      if (tech.length > 0) groups["Technical"] = tech;
      if (soft.length > 0) groups["Soft Skills"] = soft;
      if (strat.length > 0) groups["Strategic"] = strat;
    } else if (Array.isArray(user?.skills)) {
      // Array schema: [{name, category?}] or ["string"]
      user.skills.forEach((s) => {
        const name = typeof s === "string" ? s : s?.name || "";
        const cat = (typeof s === "object" && s?.category) || "Technical";
        if (!groups[cat]) groups[cat] = [];
        if (name) groups[cat].push(name);
      });
      // Fallback flat list
      if (Object.keys(groups).length === 0) {
        groups["Technical"] = user.skills
          .map((s) => (typeof s === "string" ? s : s?.name || ""))
          .filter(Boolean);
      }
    }

    return groups;
  }, [user?.skills]);

  const entries = Object.entries(skillGroups).filter(([, arr]) => arr.length > 0);
  const hasSkills = entries.length > 0;

  if (!hasSkills && !isOwner) return null;

  // Grid columns based on how many categories
  const gridCols =
    entries.length === 1
      ? "grid-cols-1 max-w-xl mx-auto"
      : entries.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden border-t"
      style={{
        backgroundColor: tokens.colors.bg,
        borderColor: tokens.colors.border,
      }}
    >
      {/* Background subtle radial */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${tokens.colors.accent}08, transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-3"
        >
          <p
            className="text-xs font-black uppercase tracking-[0.25em]"
            style={{ color: tokens.colors.accent }}
          >
            Competencies
          </p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
          >
            Skills &amp; Expertise
          </h2>
          {/* Decorative separator */}
          <div className="flex items-center justify-center gap-3">
            <div
              className="h-px w-16"
              style={{ background: `linear-gradient(to right, transparent, ${tokens.colors.accent})` }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: tokens.colors.accent }}
            />
            <div
              className="h-px w-16"
              style={{ background: `linear-gradient(to left, transparent, ${tokens.colors.accent})` }}
            />
          </div>
        </motion.div>

        {hasSkills ? (
          <div className={`grid gap-6 ${gridCols}`}>
            {entries.map(([cat, items], catIdx) => (
              <CategoryCard
                key={cat}
                category={cat}
                items={items}
                catIndex={catIdx}
              />
            ))}
          </div>
        ) : (
          isOwner && (
            <div
              className="text-center py-12 rounded-2xl border"
              style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
            >
              <p className="text-sm">Add skills from your profile editor to display them here.</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Skills;
