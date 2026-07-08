import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Education = ({ user, isOwner }) => {
  const { education } = user;
  
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t" style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}>
      <div className="mx-auto max-w-[1400px]">
        
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>(03)</span>
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>Education</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
              Academic Background
            </h2>
          </div>
        </div>

        <div className="grid gap-0">
          {education.map((edu, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-16 border-t transition-colors"
              style={{ borderColor: tokens.colors.border }}
            >
              <div className="md:col-span-3">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
                    {new Date(edu.startDate).getFullYear()} — {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                  </span>
                </div>
              </div>

              <div className="md:col-span-9">
                <h3 className="text-xl md:text-2xl font-medium mb-2 group-hover:text-[var(--accent)] transition-colors duration-500" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading, '--accent': tokens.colors.accent }}>
                  {edu.degree}
                </h3>
                <p className="text-sm" style={{ color: tokens.colors.secondary }}>{edu.school}</p>
                {edu.description && (
                  <p className="text-sm leading-relaxed mt-4" style={{ color: tokens.colors.secondary }}>
                    {edu.description}
                  </p>
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
