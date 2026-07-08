import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

/**
 * NOIR — Skills & Professional Services Section
 *
 * Changes applied:
 * 1. Toolkit: increased text size from text-[10px] to text-xs, increased padding, and made borders more visible (rgba(255,255,255,0.15)).
 * 2. Services: increased card height (min-h-[300px]) and increased text sizes (title: text-lg/text-xl, description: text-xs/text-sm).
 * 3. Services Hover: Added a smooth red fill background slide-up effect, with text colors transitioning to black for premium high contrast.
 */

/* ── Skill chip/tag card ── */
const SkillChip = ({ name, delay }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.25, delay }}
    className="inline-flex items-center px-4.5 py-2.5 border rounded-xl text-xs font-bold uppercase tracking-wider cursor-default transition-all duration-300"
    style={{
      color: tokens.colors.primary,
      borderColor: "rgba(255, 255, 255, 0.15)", // More visible default border
      backgroundColor: "transparent",
      fontFamily: tokens.fonts.mono,
    }}
    whileHover={{
      borderColor: tokens.colors.accent,
      color: tokens.colors.accent,
      scale: 1.05,
    }}
  >
    {name}
  </motion.span>
);

/* ── Professional Service card — compact single-row ── */
const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
    className="group relative flex flex-col p-8 md:p-10 rounded-3xl border transition-all duration-500 overflow-hidden min-h-[320px] justify-between cursor-default"
    style={{
      backgroundColor: tokens.colors.cardBg,
      borderColor: tokens.colors.border,
    }}
  >
    {/* Dynamic Red Fill slide-up on hover */}
    <div
      className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
      style={{ backgroundColor: tokens.colors.accent }}
      aria-hidden="true"
    />

    {/* Glow spotlight behind fill */}
    <div
      className="absolute top-0 right-0 w-24 h-24 blur-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-600 z-[1]"
      style={{ background: `radial-gradient(circle, rgba(255,255,255,0.2) 20%, transparent)` }}
      aria-hidden="true"
    />

    {/* Card Content Layout */}
    <div className="relative z-10 flex flex-col justify-between h-full w-full flex-1 gap-6">
      
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between gap-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black bg-[#FF2E0C]/10 text-[#FF2E0C] group-hover:bg-black group-hover:text-white transition-all duration-500"
          style={{ fontFamily: tokens.fonts.mono }}
        >
          {(service.title || "S").charAt(0).toUpperCase()}
        </div>
        <span
          className="text-[8px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border shrink-0 text-emerald-400 border-emerald-500/20 bg-emerald-500/5 group-hover:text-black group-hover:border-black/20 group-hover:bg-transparent transition-all duration-500"
          style={{ fontFamily: tokens.fonts.mono }}
        >
          Available
        </span>
      </div>

      {/* Title & Description Container */}
      <div className="space-y-3">
        <h3
          className="text-lg md:text-xl font-bold leading-snug text-white group-hover:text-black transition-colors duration-500"
          style={{ fontFamily: tokens.fonts.body }}
        >
          {service.title || "Service"}
        </h3>

        <p
          className="text-xs md:text-sm leading-relaxed opacity-70 group-hover:opacity-90 text-[#F0F0F0] group-hover:text-black transition-all duration-500 font-medium"
          style={{ fontFamily: tokens.fonts.body }}
        >
          "{service.description || "Professional service offering."}"
        </p>
      </div>

      {/* Bottom Deliverables row */}
      {Array.isArray(service.deliverables) && service.deliverables.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {service.deliverables.slice(0, 2).map((d, di) => (
            <span
              key={di}
              className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border text-[#F0F0F0]/50 border-white/10 group-hover:text-black group-hover:border-black/20 transition-all duration-500"
              style={{ fontFamily: tokens.fonts.mono }}
            >
              {d}
            </span>
          ))}
        </div>
      )}

    </div>
  </motion.div>
);

/* ── Main component ── */
const Skills = ({ user, isOwner }) => {

  // Normalize skills (both schemas)
  let techSkills = [];
  let softSkills = [];
  let allFlat = [];

  if (Array.isArray(user?.skills)) {
    const hasCategory = user.skills.some((s) => s?.category);
    if (hasCategory) {
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
    techSkills = (user.skills.technical || []).map((s) => (typeof s === "string" ? { name: s } : s));
    softSkills = [
      ...(user.skills.soft || []),
      ...(user.skills.strategic || []),
    ].map((s) => (typeof s === "string" ? { name: s } : s));
  }

  const getName = (skill) => (typeof skill === "string" ? skill : skill?.name || skill?.skill || "");
  const hasSkills = allFlat.length > 0 || techSkills.length > 0 || softSkills.length > 0;

  // Services
  const services = user?.services || [];
  const hasServices = services.length > 0;

  if (!hasSkills && !hasServices && !isOwner) return null;

  return (
    <section
      id="skills"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px] space-y-24">

        {/* ── Skills block ── */}
        {hasSkills && (
          <div>
            {/* Header */}
            <div className="mb-14">
              <div className="mb-5 flex items-center gap-4">
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

            {/* All flat skills (no category) */}
            {allFlat.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-3">
                  {allFlat.map((skill, idx) => {
                    const name = getName(skill);
                    return name ? <SkillChip key={idx} name={name} delay={idx * 0.02} /> : null;
                  })}
                </div>
              </div>
            )}

            {/* Categorized skills — two columns */}
            {(techSkills.length > 0 || softSkills.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {techSkills.length > 0 && (
                  <div>
                    <h3
                      className="text-[10px] uppercase tracking-[0.2em] mb-8 pb-3 border-b"
                      style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.border, color: tokens.colors.secondary }}
                    >
                      Technical Capabilities
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {techSkills.map((skill, idx) => {
                        const name = getName(skill);
                        return name ? <SkillChip key={idx} name={name} delay={idx * 0.02} /> : null;
                      })}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    <h3
                      className="text-[10px] uppercase tracking-[0.2em] mb-8 pb-3 border-b"
                      style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.border, color: tokens.colors.secondary }}
                    >
                      Strategic & Soft Skills
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {softSkills.map((skill, idx) => {
                        const name = getName(skill);
                        return name ? <SkillChip key={idx} name={name} delay={idx * 0.02} /> : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Professional Services ── */}
        {(hasServices || isOwner) && (
          <div>
            {/* Header */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
                style={{ borderColor: `${tokens.colors.accent}33`, backgroundColor: `${tokens.colors.accent}08` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.accent }} />
                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}>
                  Available for hire
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-medium"
                style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
              >
                Professional{" "}
                <span className="italic" style={{ fontFamily: "'Instrument Serif', serif", color: tokens.colors.accent }}>
                  Services
                </span>
              </motion.h2>
            </div>

            {/* Services — single horizontal row on desktop, wrapping on smaller screens */}
            {hasServices ? (
              <div
                className={`grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(services.length, 4)}`}
              >
                {services.map((service, idx) => (
                  <ServiceCard key={idx} service={service} index={idx} />
                ))}
              </div>
            ) : (
              isOwner && (
                <div
                  className="py-12 text-center opacity-20 italic text-sm rounded-2xl border border-dashed"
                  style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
                >
                  No services added yet.
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
