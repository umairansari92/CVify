import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";
import { staggerContainer, staggerChild } from "./animations";

/**
 * ORIENTAL LUXE — Education Section
 * ──────────────────────────────────
 * Same vertical timeline style as Experience for visual consistency,
 * but with GraduationCap icon and degree/institution layout.
 */
const Education = ({ user, isOwner, handleArrayUpdate }) => {
  const education = user?.education || [];
  if (education.length === 0) return null;

  return (
    <section
      id="education-ol"
      className="relative py-20 sm:py-28"
      style={{ fontFamily: tokens.fonts.primary }}
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: tokens.colors.accent }}
          >
            ACADEMIC BACKGROUND
          </p>
          <h2
            className="flex items-center gap-4 text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: tokens.colors.textPrimary }}
          >
            <span className="h-8 w-1 rounded-full" style={{ backgroundColor: tokens.colors.accent }} />
            Education
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute left-3 top-2 h-full w-px"
            style={{
              background: `linear-gradient(to bottom, ${tokens.colors.accent}, ${tokens.colors.accent}40, transparent)`,
            }}
          />

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
          >
            {education.map((edu, index) => (
              <motion.li
                key={edu._id || index}
                variants={staggerChild}
                className="relative pl-12"
              >
                {/* Timeline Dot */}
                <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center">
                  <span
                    className="absolute h-6 w-6 rounded-full"
                    style={{ backgroundColor: `${tokens.colors.accent}20` }}
                  />
                  <GraduationCap
                    size={12}
                    className="relative z-10"
                    style={{ color: tokens.colors.accent }}
                  />
                </span>

                {/* Card */}
                <div
                  className="rounded-xl border p-5 sm:p-6 transition-all duration-300"
                  style={{
                    backgroundColor: `${tokens.colors.bgSoft}60`,
                    borderColor: tokens.colors.border,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${tokens.colors.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = tokens.colors.border;
                  }}
                >
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: tokens.colors.textPrimary }}
                    >
                      <InlineEdit
                        isOwner={isOwner}
                        value={edu.degree}
                        onSave={(v) => handleArrayUpdate("education", index, { degree: v })}
                      >
                        {edu.degree}
                      </InlineEdit>
                    </h3>
                    <span
                      className="text-sm font-medium whitespace-nowrap"
                      style={{ color: tokens.colors.accent }}
                    >
                      {edu.startYear || edu.startDate} – {edu.endYear || edu.endDate || "Present"}
                    </span>
                  </div>

                  <p className="mt-0.5 text-sm" style={{ color: tokens.colors.textMuted }}>
                    <InlineEdit
                      isOwner={isOwner}
                      value={edu.institution}
                      onSave={(v) => handleArrayUpdate("education", index, { institution: v })}
                    >
                      {edu.institution}
                    </InlineEdit>
                  </p>

                  {edu.description && (
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: tokens.colors.textSecondary }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
};

export default Education;
