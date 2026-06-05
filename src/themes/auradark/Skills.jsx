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

  // Extract skills based on schema version
  let techSkills = [];
  let stratSkills = [];

  if (Array.isArray(user.skills)) {
    techSkills = user.skills.filter(s => s.category?.toLowerCase() === 'technical');
    stratSkills = user.skills.filter(s => s.category?.toLowerCase() === 'strategic');
    
    // Fallback if no categories are assigned
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
      id="skills-ad" 
      className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t overflow-hidden"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      {/* Marquee keyframes locally scoped */}
      <style>{`
        @keyframes strat-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .strat-marquee-row {
          animation: strat-marquee 25s linear infinite;
        }
        .strat-marquee-container:hover .strat-marquee-row {
          animation-play-state: paused;
        }
      `}</style>

      {/* Subtle Star Pattern Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l2 28 28 2-28 2-2 28-2-28-28-2 28-2z' fill='%23FFFFFF' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <motion.p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              MY DIGITAL TOOLKIT / 03
            </motion.p>
            <motion.h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]"
              style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              THE <span style={{ color: tokens.colors.primary }}>ENGINE.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-5">
            <motion.p 
              className="text-base md:text-lg leading-relaxed text-right lg:text-left"
              style={{ color: tokens.colors.textDim }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I focus on the most reliable technologies to ship products that actually work and look amazing.
            </motion.p>
          </div>
        </div>

        {/* TECHNICAL SKILLS PANEL */}
        {techSkills.length > 0 && (
          <motion.div 
            className="p-8 md:p-14 rounded-[2rem] border backdrop-blur-sm mb-16"
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
              className="text-xs font-black uppercase tracking-[0.3em] mb-12"
              style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}
            >
              TECHNICAL CAPABILITIES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {techSkills.map((skill, idx) => (
                <SkillBar 
                  key={idx} 
                  name={skill.name || skill} 
                  level={skill.level || 80} 
                  delay={idx * 0.05} 
                />
              ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* STRATEGIC SKILLS INFINITE MARQUEE */}
      {stratSkills.length > 0 && (
        <motion.div 
          className="w-full overflow-hidden border-t border-b py-8 mt-12"
          style={{ borderColor: tokens.colors.borderFaint, backgroundColor: "rgba(255,255,255,0.005)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full overflow-hidden flex strat-marquee-container cursor-pointer">
            {/* The animating row - doubled contents for seamless scroll */}
            <div 
              className="flex whitespace-nowrap gap-16 text-2xl md:text-4xl font-black uppercase tracking-widest strat-marquee-row"
              style={{
                fontFamily: tokens.fonts.display,
                color: tokens.colors.foreground,
              }}
            >
              {[...stratSkills, ...stratSkills].map((skill, idx) => {
                const name = typeof skill === "string" ? skill : skill.name || "";
                return (
                  <span key={idx} className="flex items-center gap-16">
                    <span 
                      style={{ 
                        background: idx % 2 === 0 ? "none" : `linear-gradient(135deg, ${tokens.colors.primary}, #E0B0FF)`,
                        WebkitBackgroundClip: idx % 2 === 0 ? "none" : "text",
                        WebkitTextFillColor: idx % 2 === 0 ? "inherit" : "transparent"
                      }}
                    >
                      {name}
                    </span>
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: tokens.colors.primary }} 
                    />
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Skills;
