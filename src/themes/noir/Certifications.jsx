import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Certifications = ({ user, isOwner }) => {
  const { certifications } = user;
  
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t" style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}>
      <div className="mx-auto max-w-[1400px]">
        
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>(06)</span>
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>Certifications</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
              Verified Knowledge
            </h2>
          </div>
        </div>

        <div className="grid gap-0">
          {certifications.map((cert, i) => (
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
                    {new Date(cert.date).getFullYear()}
                  </span>
                </div>
              </div>

              <div className="md:col-span-9 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium mb-2 group-hover:text-[var(--accent)] transition-colors duration-500" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading, '--accent': tokens.colors.accent }}>
                    {cert.name}
                  </h3>
                  <p className="text-sm" style={{ color: tokens.colors.secondary }}>{cert.issuer}</p>
                </div>
                
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-colors group-hover:border-[var(--primary)] group-hover:bg-white/[0.02]" style={{ borderColor: tokens.colors.border, color: tokens.colors.primary, '--primary': tokens.colors.primary }} data-cursor="hover">
                    <span className="text-sm font-medium">&nearr;</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
