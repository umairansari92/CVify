import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const SkillBar = ({ name, level, delay }) => (
  <motion.div 
    className="mb-8"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm md:text-base font-bold tracking-wide" style={{ color: tokens.colors.foreground }}>
        {name}
      </span>
      <span className="text-xs md:text-sm font-mono font-bold" style={{ color: tokens.colors.textDim }}>
        {level}%
      </span>
    </div>
    <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: tokens.colors.primary }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

const Skills = ({ user }) => {
  if (!user || !user.skills) return null;

  // Extract skills
  const techSkills = Array.isArray(user.skills) ? user.skills : (user.skills?.technical || []);
  const stratSkills = user.skills?.strategic || user.skills?.soft || [];

  if (techSkills.length === 0 && stratSkills.length === 0) return null;

  return (
    <section 
      id="skills-ad" 
      className="relative py-32 px-8 md:px-16 lg:px-24 border-t overflow-hidden"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      {/* Subtle Star Pattern Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l2 28 28 2-28 2-2 28-2-28-28-2 28-2z' fill='%23FFFFFF' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.p
          className="text-xs tracking-[0.25em] uppercase mb-4"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          TOOLKIT
        </motion.p>
        
        <motion.h2
          className="text-4xl md:text-5xl font-black tracking-tight mb-20 flex items-center gap-5"
          style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="w-1.5 h-10 rounded-full" style={{ backgroundColor: tokens.colors.primary }}></span>
          Skills & Technologies
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* TECHNICAL SKILLS PANEL */}
          {techSkills.length > 0 && (
            <motion.div 
              className="p-8 md:p-14 rounded-[2rem] border backdrop-blur-sm"
              style={{ 
                backgroundColor: "rgba(255,255,255,0.01)", 
                borderColor: tokens.colors.borderFaint,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-sm font-black uppercase tracking-[0.2em] mb-12"
                style={{ color: tokens.colors.primary }}
              >
                TECHNICAL
              </h3>
              <div>
                {techSkills.map((skill, idx) => (
                  <SkillBar 
                    key={idx} 
                    name={skill.name || skill} 
                    level={skill.level || 80} 
                    delay={idx * 0.1} 
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* STRATEGIC SKILLS PANEL */}
          {stratSkills.length > 0 && (
            <motion.div 
              className="p-8 md:p-14 rounded-[2rem] border backdrop-blur-sm"
              style={{ 
                backgroundColor: "rgba(255,255,255,0.01)", 
                borderColor: tokens.colors.borderFaint,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 
                className="text-sm font-black uppercase tracking-[0.2em] mb-12"
                style={{ color: tokens.colors.primary }}
              >
                STRATEGIC
              </h3>
              <div>
                {stratSkills.map((skill, idx) => (
                  <SkillBar 
                    key={idx} 
                    name={skill.name || skill} 
                    level={skill.level || 75} 
                    delay={(idx * 0.1) + 0.2} 
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
