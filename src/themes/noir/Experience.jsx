import React from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

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
        <div className="mb-14">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
              (02)
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
              Experience
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
            Work History
          </h2>
        </div>

        <div className="grid gap-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-16 border-t"
              style={{ borderColor: tokens.colors.border }}
            >
              {/* Left — Company + Dates */}
              <div className="md:col-span-3">
                <InlineEdit
                  isOwner={isOwner}
                  id={`noir-exp-company-${i}`}
                  value={exp.company}
                  onSave={(v) => handleArrayUpdate?.("experience", i, { company: v })}
                >
                  <span className="text-sm font-medium" style={{ color: tokens.colors.primary }}>
                    {exp.company}
                  </span>
                </InlineEdit>
                <span
                  className="block text-[10px] uppercase font-bold tracking-widest mt-2"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
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
                {exp.location && (
                  <span className="text-xs mt-2 block" style={{ color: tokens.colors.secondary }}>
                    {exp.location}
                  </span>
                )}
              </div>

              {/* Right — Role + Description */}
              <div className="md:col-span-9">
                <h3
                  className="text-xl md:text-2xl font-medium mb-6 group-hover:text-[var(--accent)] transition-colors duration-500"
                  style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading, "--accent": tokens.colors.accent }}
                >
                  <InlineEdit
                    isOwner={isOwner}
                    id={`noir-exp-role-${i}`}
                    value={exp.title || exp.role}
                    onSave={(v) => handleArrayUpdate?.("experience", i, { title: v })}
                  >
                    {exp.title || exp.role}
                  </InlineEdit>
                </h3>

                {/* Description — handle both string and array */}
                <div className="flex flex-col gap-3">
                  {Array.isArray(exp.description) ? (
                    exp.description.map((desc, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full" style={{ backgroundColor: tokens.colors.borderHover }} />
                        <p className="text-sm leading-relaxed flex-1" style={{ color: tokens.colors.secondary }}>
                          {desc}
                        </p>
                      </div>
                    ))
                  ) : exp.description ? (
                    <p className="text-sm leading-relaxed" style={{ color: tokens.colors.secondary }}>
                      {exp.description}
                    </p>
                  ) : exp.achievements ? (
                    exp.achievements.split("\n").filter(Boolean).map((line, li) => (
                      <div key={li} className="flex items-start gap-4">
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full" style={{ backgroundColor: tokens.colors.accent }} />
                        <p className="text-sm leading-relaxed flex-1" style={{ color: tokens.colors.secondary }}>
                          {line.replace(/^[-•]\s*/, "")}
                        </p>
                      </div>
                    ))
                  ) : null}
                </div>

                {/* CVify AI Recruiter Insight */}
                {exp.aiInsight && (
                  <div
                    className="mt-6 flex items-start gap-3 p-4 border-l-2"
                    style={{ borderColor: tokens.colors.accent, backgroundColor: tokens.colors.cardBg }}
                  >
                    <span
                      className="text-[9px] uppercase font-bold tracking-widest shrink-0 mt-1"
                      style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}
                    >
                      AI
                    </span>
                    <p className="text-xs leading-relaxed italic" style={{ color: tokens.colors.secondary }}>
                      {exp.aiInsight}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
