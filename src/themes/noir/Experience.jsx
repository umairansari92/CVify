import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Experience = ({ user, isOwner }) => {
  const { experience } = user;
  
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t" style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}>
      <div className="mx-auto max-w-[1400px]">
        
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>(02)</span>
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>Experience</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
              Professional Journey
            </h2>
          </div>
          <p className="text-sm md:text-right max-w-xs" style={{ color: tokens.colors.secondary }}>
            A timeline of roles where I've delivered impact and crafted solutions.
          </p>
        </div>

        <div className="grid gap-0">
          {experience.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-16 border-t transition-colors"
              style={{ borderColor: tokens.colors.border }}
            >
              {/* Timeline info */}
              <div className="md:col-span-3">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium" style={{ color: tokens.colors.primary }}>{exp.company}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
                    {new Date(exp.startDate).getFullYear()} — {exp.current ? 'Present' : new Date(exp.endDate).getFullYear()}
                  </span>
                  <span className="text-xs mt-2" style={{ color: tokens.colors.secondary }}>{exp.location}</span>
                </div>
              </div>

              {/* Role & Details */}
              <div className="md:col-span-9">
                <h3 className="text-xl md:text-2xl font-medium mb-6 group-hover:text-[var(--accent)] transition-colors duration-500" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading, '--accent': tokens.colors.accent }}>
                  {exp.title}
                </h3>
                
                <div className="flex flex-col gap-3">
                  {exp.description.map((desc, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full" style={{ backgroundColor: tokens.colors.borderHover }}></span>
                      <p className="text-sm leading-relaxed" style={{ color: tokens.colors.secondary }}>{desc}</p>
                    </div>
                  ))}
                </div>
                
                {/* AI Recruiter Insight - if available */}
                {i === 0 && user?.branding?.verificationStats?.recentImpact && (
                  <div className="mt-6 flex items-start gap-3 p-4 rounded bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] uppercase font-bold tracking-widest shrink-0 mt-1" style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}>Insight</span>
                    <p className="text-xs" style={{ color: tokens.colors.primary }}>{user.branding.verificationStats.recentImpact}</p>
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
