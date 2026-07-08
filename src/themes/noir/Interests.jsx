import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Interests = ({ user, isOwner }) => {
  const { interests } = user;
  
  if (!interests || interests.length === 0) return null;

  return (
    <section id="interests" className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t" style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}>
      <div className="mx-auto max-w-[1400px]">
        
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>(08)</span>
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>Interests</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
              Beyond the Screen
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {interests.map((interest, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: tokens.motion.duration.fast, ease: tokens.motion.easing.base }}
              className="px-6 py-3 rounded-full border transition-colors hover:border-[var(--primary)] hover:bg-white/[0.02]"
              style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.bg, '--primary': tokens.colors.primary }}
              data-cursor="hover"
            >
              <span className="text-sm font-medium" style={{ color: tokens.colors.primary }}>
                {interest}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
