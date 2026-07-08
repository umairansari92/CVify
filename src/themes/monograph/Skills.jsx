import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const SkillRow = ({ name, level, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="mb-8"
  >
    <div className="flex justify-between items-end mb-2">
      <span className="text-sm font-bold tracking-widest uppercase" style={{ fontFamily: tokens.fonts.heading }}>
        {name}
      </span>
      <span className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}>
        {level}%
      </span>
    </div>
    <div className="h-[1px] w-full bg-[#E5E5E4] relative">
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{ backgroundColor: tokens.colors.primaryText }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.1, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

const Skills = ({ user }) => {
  if (!user || !user.skills) return null;

  let techSkills = [];
  let stratSkills = [];

  if (Array.isArray(user.skills)) {
    techSkills = user.skills.filter(s => s.category?.toLowerCase() === 'technical');
    stratSkills = user.skills.filter(s => s.category?.toLowerCase() === 'strategic' || s.category?.toLowerCase() === 'soft');
    if (techSkills.length === 0 && stratSkills.length === 0) {
      techSkills = user.skills;
    }
  } else {
    techSkills = user.skills?.technical || [];
    stratSkills = user.skills?.strategic || user.skills?.soft || [];
  }

  if (techSkills.length === 0 && stratSkills.length === 0) return null;

  return (
    <section
      className="py-20 md:py-32 border-t"
      style={{
        backgroundColor: tokens.colors.paper,
        borderColor: tokens.colors.borders,
        color: tokens.colors.primaryText,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="text-xs uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
          >
            Digital Toolkit
          </h2>
          <h3
            className="text-3xl font-bold leading-tight"
            style={{ fontFamily: tokens.fonts.heading }}
          >
            Core Competencies
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          {techSkills.length > 0 && (
            <div>
              <h4 
                className="text-xs uppercase tracking-[0.2em] mb-10 pb-4 border-b"
                style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.borders, color: tokens.colors.muted }}
              >
                Technical Capabilities
              </h4>
              <div>
                {techSkills.map((skill, idx) => (
                  <SkillRow 
                    key={idx} 
                    name={skill.name || skill} 
                    level={skill.level || 85} 
                    delay={idx * 0.05} 
                  />
                ))}
              </div>
            </div>
          )}

          {stratSkills.length > 0 && (
            <div>
              <h4 
                className="text-xs uppercase tracking-[0.2em] mb-10 pb-4 border-b"
                style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.borders, color: tokens.colors.muted }}
              >
                Strategic & Soft Skills
              </h4>
              <div>
                {stratSkills.map((skill, idx) => (
                  <SkillRow 
                    key={idx} 
                    name={skill.name || skill} 
                    level={skill.level || 85} 
                    delay={idx * 0.05} 
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Skills;
