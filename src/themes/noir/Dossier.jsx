import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Dossier = ({ user, isOwner }) => {
  const { branding } = user;
  
  if (!branding?.resumeUrl) return null;

  return (
    <section id="dossier" className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t" style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}>
      <div className="mx-auto max-w-[1400px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: tokens.motion.duration.slow, ease: tokens.motion.easing.base }}
          className="relative overflow-hidden p-10 md:p-16 border rounded-2xl flex flex-col md:flex-row items-center justify-between gap-10"
          style={{ backgroundColor: tokens.colors.cardBg, borderColor: tokens.colors.borderHover }}
        >
          {/* Subtle Glow */}
          <div className="absolute inset-0 pointer-events-none opacity-5" 
               style={{ background: `radial-gradient(circle at right center, ${tokens.colors.accent}, transparent 60%)` }} />
               
          <div className="relative z-10 flex flex-col items-start gap-4">
            <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
              Full Dossier
            </h2>
            <p className="text-sm md:text-base max-w-md leading-relaxed" style={{ color: tokens.colors.secondary }}>
              Download my complete professional profile, including detailed project histories, methodologies, and extended qualifications.
            </p>
            
            {/* CVify Pro AI Score integration in Dossier */}
            {branding?.verificationStats?.atsScore && (
              <div className="mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.accent }}></span>
                <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>
                  ATS Match Score: {branding.verificationStats.atsScore}%
                </span>
              </div>
            )}
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <a 
              href={branding.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full md:w-auto px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-colors border"
              style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.bg, borderColor: tokens.colors.primary, fontFamily: tokens.fonts.mono }}
              data-cursor="hover"
            >
              <span className="text-xs uppercase font-bold tracking-widest">Download PDF</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dossier;
