import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

/**
 * NOIR — Skills & Professional Services Section
 *
 * Features:
 * - Handles BOTH skills schemas: Array [{name}] or Object {technical, soft, strategic}
 * - Premium dark progress bars with glow on whileInView
 * - Professional Services glass cards grid (user.services)
 * - Fully GPU-composited animations (no layout shift)
 */

const SkillBar = ({ name, level, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: tokens.motion.duration.fast, delay }}
    className="mb-6"
  >
    <div className="flex justify-between items-end mb-2">
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: tokens.colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {name}
      </span>
      {level != null && (
        <span
          className="text-[10px] font-bold"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.accent }}
        >
          {level}%
        </span>
      )}
    </div>
    <div className="h-px w-full relative" style={{ backgroundColor: tokens.colors.border }}>
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{
          background: `linear-gradient(to right, ${tokens.colors.accent}, ${tokens.colors.primary})`,
          boxShadow: `0 0 6px ${tokens.colors.accent}55`,
        }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level ?? 85}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: delay + 0.1, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
    className="group relative p-8 md:p-10 rounded-3xl border transition-all duration-500 overflow-hidden"
    style={{
      backgroundColor: tokens.colors.cardBg,
      borderColor: tokens.colors.border,
    }}
    whileHover={{ borderColor: `${tokens.colors.accent}44` }}
  >
    {/* Subtle corner glow on hover */}
    <div
      className="absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      style={{ background: `radial-gradient(circle, ${tokens.colors.accent}22, transparent)` }}
      aria-hidden="true"
    />

    <div className="relative z-10 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black uppercase tracking-widest"
          style={{ backgroundColor: `${tokens.colors.accent}15`, color: tokens.colors.accent }}
        >
          {(service.title || "S").charAt(0)}
        </div>
        <span
          className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border"
          style={{
            color: "#10b981",
            borderColor: "#10b98133",
            backgroundColor: "#10b9810a",
            fontFamily: tokens.fonts.mono,
          }}
        >
          Available for Engagement
        </span>
      </div>

      <div className="space-y-3">
        <h3
          className="text-lg md:text-xl font-semibold"
          style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
        >
          {service.title || "Service"}
        </h3>
        <p
          className="text-sm leading-relaxed italic line-clamp-3"
          style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif", opacity: 0.7 }}
        >
          "{service.description || "Professional-grade service offering."}"
        </p>
      </div>

      {Array.isArray(service.deliverables) && service.deliverables.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {service.deliverables.slice(0, 3).map((d, di) => (
            <span
              key={di}
              className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
              style={{ color: tokens.colors.secondary, borderColor: tokens.colors.border, fontFamily: tokens.fonts.mono }}
            >
              {d}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const Skills = ({ user, isOwner }) => {
  // ── Skill normalization — handles BOTH schemas ──
  let techSkills = [];
  let softSkills = [];
  let allFlat = [];

  if (Array.isArray(user?.skills)) {
    const withCategory = user.skills.filter((s) => s.category);
    if (withCategory.length > 0) {
      techSkills = user.skills.filter(
        (s) => !s.category || ["technical", "tech"].includes(s.category?.toLowerCase())
      );
      softSkills = user.skills.filter((s) =>
        ["soft", "strategic"].includes(s.category?.toLowerCase())
      );
    } else {
      allFlat = user.skills;
    }
  } else if (user?.skills && typeof user.skills === "object") {
    techSkills = (user.skills.technical || []).map((s) =>
      typeof s === "string" ? { name: s } : s
    );
    softSkills = [
      ...(user.skills.soft || []),
      ...(user.skills.strategic || []),
    ].map((s) => (typeof s === "string" ? { name: s } : s));
  }

  const renderSkill = (skill, idx) => {
    const name = typeof skill === "string" ? skill : skill?.name || skill?.skill || "";
    const level = typeof skill === "object" ? skill?.level : null;
    if (!name) return null;
    return <SkillBar key={idx} name={name} level={level} delay={idx * 0.04} />;
  };

  const hasSkills =
    allFlat.length > 0 || techSkills.length > 0 || softSkills.length > 0;

  // ── Professional Services ──
  const services = user?.services || [];
  const hasServices = services.length > 0;

  if (!hasSkills && !hasServices && !isOwner) return null;

  return (
    <section
      id="skills"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px] space-y-28">

        {/* ── Skills Block ── */}
        {hasSkills && (
          <div>
            <div className="mb-16">
              <div className="mb-6 flex items-center gap-4">
                <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
                  (04)
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
                  Capabilities
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
                The Toolkit
              </h2>
            </div>

            {allFlat.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-0">
                {allFlat.map(renderSkill)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                {techSkills.length > 0 && (
                  <div>
                    <h3
                      className="text-[10px] uppercase tracking-[0.2em] mb-10 pb-4 border-b"
                      style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.border, color: tokens.colors.secondary }}
                    >
                      Technical Capabilities
                    </h3>
                    {techSkills.map(renderSkill)}
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    <h3
                      className="text-[10px] uppercase tracking-[0.2em] mb-10 pb-4 border-b"
                      style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.border, color: tokens.colors.secondary }}
                    >
                      Strategic & Soft Skills
                    </h3>
                    {softSkills.map(renderSkill)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Professional Services Block ── */}
        {(hasServices || isOwner) && (
          <div>
            {/* Section Header */}
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
                style={{
                  borderColor: `${tokens.colors.accent}33`,
                  backgroundColor: `${tokens.colors.accent}0a`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: tokens.colors.accent }}
                />
                <span
                  className="text-[9px] font-black uppercase tracking-widest"
                  style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}
                >
                  Available for hire
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-medium"
                style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
              >
                Professional{" "}
                <span className="italic" style={{ color: tokens.colors.accent }}>
                  Services
                </span>
              </motion.h2>
            </div>

            {hasServices ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                {services.map((service, idx) => (
                  <ServiceCard key={idx} service={service} index={idx} />
                ))}
              </div>
            ) : (
              isOwner && (
                <div
                  className="py-16 text-center opacity-20 italic text-sm rounded-2xl border border-dashed"
                  style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
                >
                  No services added yet — add them in your profile dashboard.
                </div>
              )
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;
