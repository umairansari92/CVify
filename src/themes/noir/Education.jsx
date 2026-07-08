import React from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Education = ({ user, isOwner, handleArrayUpdate }) => {
  const education = user?.education || [];
  if (education.length === 0) return null;

  return (
    <section
      id="education"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
              (03)
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
              Education
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
            Academic Background
          </h2>
        </div>

        <div className="grid gap-0">
          {education.map((edu, i) => (
            <motion.div
              key={edu._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-16 border-t"
              style={{ borderColor: tokens.colors.border }}
            >
              <div className="md:col-span-3">
                <span
                  className="text-[10px] uppercase font-bold tracking-widest"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
                >
                  {edu.startDate ? new Date(edu.startDate).getFullYear() : ""}{" "}
                  —{" "}
                  {edu.current ? "Present" : edu.endDate ? new Date(edu.endDate).getFullYear() : ""}
                </span>
              </div>

              <div className="md:col-span-9">
                <h3
                  className="text-xl md:text-2xl font-medium mb-2 group-hover:text-[var(--accent)] transition-colors duration-500"
                  style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading, "--accent": tokens.colors.accent }}
                >
                  <InlineEdit
                    isOwner={isOwner}
                    id={`noir-edu-degree-${i}`}
                    value={edu.degree}
                    onSave={(v) => handleArrayUpdate?.("education", i, { degree: v })}
                  >
                    {edu.degree}
                  </InlineEdit>
                </h3>
                <p className="text-sm" style={{ color: tokens.colors.secondary }}>
                  <InlineEdit
                    isOwner={isOwner}
                    id={`noir-edu-school-${i}`}
                    value={edu.school}
                    onSave={(v) => handleArrayUpdate?.("education", i, { school: v })}
                  >
                    {edu.school}
                  </InlineEdit>
                </p>
                {edu.description && (
                  <p className="text-sm leading-relaxed mt-4" style={{ color: tokens.colors.secondary }}>
                    {edu.description}
                  </p>
                )}
                {edu.grade && (
                  <span
                    className="inline-block mt-3 text-[10px] uppercase font-bold tracking-widest px-3 py-1 border rounded-full"
                    style={{ color: tokens.colors.secondary, borderColor: tokens.colors.border, fontFamily: tokens.fonts.mono }}
                  >
                    GPA: {edu.grade}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
