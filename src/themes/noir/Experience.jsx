import React from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

/**
 * NOIR — Experience Section (Luxury Timeline Redesign)
 * 
 * Implements a high-end dark vertical timeline with fine border tracks,
 * custom neon timeline connector nodes, and fully staggered reveal animations.
 */
const Experience = ({ user, isOwner, handleArrayUpdate }) => {
  const experiences = user?.experience || [];
  if (experiences.length === 0) return null;

  return (
    <section
      id="experience"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section Title */}
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
              (02)
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
              Experience
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
            Professional Journey
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative pl-6 md:pl-12 border-l" style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}>
          
          {experiences.map((exp, i) => (
            <motion.div
              key={exp._id || i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.08, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
              className="relative group mb-16 md:mb-24 last:mb-0"
            >
              {/* Custom Timeline Glowing Node Indicator */}
              <div
                className="absolute -left-[31px] md:-left-[55px] top-1.5 w-2 h-2 rounded-full border transition-all duration-300 group-hover:scale-125"
                style={{
                  backgroundColor: tokens.colors.bg,
                  borderColor: tokens.colors.accent,
                  boxShadow: "0 0 8px var(--accent-glow)",
                  "--accent-glow": tokens.colors.accent,
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
                {/* Dates & Company Column */}
                <div className="md:col-span-3 flex flex-col items-start">
                  <span
                    className="text-[10px] uppercase font-bold tracking-[0.2em]"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.accent }}
                  >
                    {exp.startDate
                      ? new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : ""}{" "}
                    —{" "}
                    {exp.current || exp.isCurrent
                      ? "Present"
                      : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : ""}
                  </span>

                  <InlineEdit
                    isOwner={isOwner}
                    id={`noir-exp-company-${i}`}
                    value={exp.company}
                    onSave={(v) => handleArrayUpdate?.("experience", i, { company: v })}
                  >
                    <span className="text-base font-extrabold uppercase mt-2 hover:opacity-100 transition-opacity opacity-90" style={{ color: tokens.colors.primary }}>
                      {exp.company}
                    </span>
                  </InlineEdit>

                  {exp.location && (
                    <span className="text-[10px] uppercase tracking-widest mt-1 opacity-50 font-bold" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
                      {exp.location}
                    </span>
                  )}
                </div>

                {/* Role Details Column */}
                <div className="md:col-span-9">
                  <h3
                    className="text-xl md:text-2xl font-light italic mb-6 hover:text-[var(--accent)] transition-colors duration-300"
                    style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading, "--accent": tokens.colors.accent }}
                  >
                    <InlineEdit
                      isOwner={isOwner}
                      id={`noir-exp-role-${i}`}
                      value={exp.title || exp.role}
                      onSave={(v) => handleArrayUpdate?.("experience", i, { title: v })}
                    >
                      <span>{exp.title || exp.role}</span>
                    </InlineEdit>
                  </h3>

                  {/* Descriptions / achievements list */}
                  <div className="flex flex-col gap-3 max-w-2xl">
                    {Array.isArray(exp.description) ? (
                      exp.description.map((desc, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <span className="mt-2 w-1 h-1 shrink-0 rounded-full" style={{ backgroundColor: tokens.colors.accent }} />
                          <p className="text-sm leading-relaxed opacity-75 font-medium" style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {desc}
                          </p>
                        </div>
                      ))
                    ) : exp.description ? (
                      <p className="text-sm leading-relaxed opacity-75 font-medium" style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {exp.description}
                      </p>
                    ) : exp.achievements ? (
                      exp.achievements.split("\n").filter(Boolean).map((line, li) => (
                        <div key={li} className="flex items-start gap-4">
                          <span className="mt-2 w-1 h-1 shrink-0 rounded-full" style={{ backgroundColor: tokens.colors.accent }} />
                          <p className="text-sm leading-relaxed opacity-75 font-medium" style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {line.replace(/^[-•]\s*/, "")}
                          </p>
                        </div>
                      ))
                    ) : null}
                  </div>

                  {/* AI Recruiter Insight Box */}
                  {exp.aiInsight && (
                    <div
                      className="mt-6 flex items-start gap-3 p-5 border rounded-2xl relative overflow-hidden backdrop-blur-sm max-w-2xl"
                      style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg }}
                    >
                      <span
                        className="text-[9px] uppercase font-bold tracking-[0.2em] shrink-0 mt-0.5"
                        style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}
                      >
                        AI Insight:
                      </span>
                      <p className="text-xs leading-relaxed italic opacity-80" style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {exp.aiInsight}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
