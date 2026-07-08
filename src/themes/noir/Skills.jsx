import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Skills = ({ user, isOwner }) => {
  const { skills } = user;
  
  if (!skills || skills.length === 0) return null;

  // Group skills if possible, else render as list
  return (
    <section id="skills" className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t" style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}>
      <div className="mx-auto max-w-[1400px]">
        
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>(04)</span>
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
              The Toolkit
            </h2>
          </div>
          <p className="text-sm md:text-right max-w-xs" style={{ color: tokens.colors.secondary }}>
            A comprehensive toolset chosen for shipping fast, considered products.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skillGroup, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
              className="h-full rounded-2xl p-7 md:p-9 border"
              style={{ backgroundColor: tokens.colors.cardBg, borderColor: tokens.colors.border }}
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>0{idx + 1}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}>{skillGroup.category || `Category ${idx+1}`}</span>
                <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tokens.colors.accent }}></span>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {skillGroup.items?.map((skill, i) => (
                  <div 
                    key={i} 
                    className="group flex items-center gap-2.5 rounded-full border px-3.5 py-2 transition-colors duration-300"
                    style={{ borderColor: tokens.colors.border, backgroundColor: 'rgba(255,255,255,0.02)' }}
                  >
                    <span className="text-sm transition-colors duration-300 group-hover:text-[var(--primary)]" style={{ color: tokens.colors.secondary, '--primary': tokens.colors.primary }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
