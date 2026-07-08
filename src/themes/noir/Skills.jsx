import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const SkillBar = ({ name, level, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: tokens.motion.duration.fast, delay }}
    className="mb-6"
  >
    <div className="flex justify-between items-end mb-2">
      <span className="text-sm font-medium" style={{ color: tokens.colors.primary }}>{name}</span>
      {level && (
        <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
          {level}%
        </span>
      )}
    </div>
    <div className="h-px w-full relative" style={{ backgroundColor: tokens.colors.border }}>
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{ backgroundColor: tokens.colors.primary }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level || 85}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.1, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

const Skills = ({ user, isOwner }) => {
  if (!user || !user.skills) return null;

  let allSkills = [];
  let techSkills = [];
  let softSkills = [];

  if (Array.isArray(user.skills)) {
    // Array of skill objects with category
    techSkills = user.skills.filter(
      (s) => !s.category || s.category?.toLowerCase() === "technical" || s.category?.toLowerCase() === "tech"
    );
    softSkills = user.skills.filter(
      (s) => s.category?.toLowerCase() === "soft" || s.category?.toLowerCase() === "strategic"
    );
    // If no categorization, show all as one list
    if (techSkills.length === 0 && softSkills.length === 0) {
      allSkills = user.skills;
    }
  } else {
    // Object with technical/soft keys
    techSkills = user.skills.technical || [];
    softSkills = user.skills.soft || user.skills.strategic || [];
  }

  const hasSkills = allSkills.length > 0 || techSkills.length > 0 || softSkills.length > 0;
  if (!hasSkills) return null;

  const renderSkill = (skill, idx) => {
    const name = typeof skill === "string" ? skill : skill?.name || skill?.skill || "";
    const level = typeof skill === "object" ? skill?.level : null;
    if (!name) return null;
    return <SkillBar key={idx} name={name} level={level} delay={idx * 0.04} />;
  };

  return (
    <section
      id="skills"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14">
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

        {allSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            <div className="col-span-full">
              {allSkills.map(renderSkill)}
            </div>
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
    </section>
  );
};

export default Skills;
