import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Contact = ({ user, isOwner }) => {
  const { contact } = user;
  
  if (!contact?.email) return null;

  return (
    <section id="contact" className="relative z-10 px-6 md:px-12 py-32 md:py-48 border-t" style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}>
      <div className="mx-auto max-w-[1400px] flex flex-col items-center text-center">
        
        <div className="mb-10 flex items-center justify-center gap-4">
          <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>(09)</span>
          <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>Contact</span>
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
          className="text-4xl md:text-7xl font-medium mb-12" 
          style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
        >
          Let's talk <span className="italic" style={{ color: tokens.colors.accent }}>future.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
        >
          <a 
            href={`mailto:${contact.email}`} 
            className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full border transition-all duration-500 overflow-hidden"
            style={{ borderColor: tokens.colors.borderHover, backgroundColor: tokens.colors.bg }}
            data-cursor="hover"
          >
            {/* Hover fill effect */}
            <span className="absolute inset-0 w-full h-full -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" style={{ backgroundColor: tokens.colors.primary }}></span>
            
            <span className="relative z-10 text-sm md:text-base font-bold uppercase tracking-widest transition-colors duration-500 group-hover:text-[var(--bg)]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary, '--bg': tokens.colors.bg }}>
              {contact.email}
            </span>
          </a>
        </motion.div>

        {contact.socialLinks && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: tokens.motion.duration.slow }}
            className="mt-20 flex items-center justify-center gap-8"
          >
            {contact.socialLinks.github && (
              <a href={contact.socialLinks.github} target="_blank" rel="noopener noreferrer" className="uppercase text-xs font-bold tracking-widest transition-colors hover:text-[var(--primary)]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary, '--primary': tokens.colors.primary }} data-cursor="hover">GitHub</a>
            )}
            {contact.socialLinks.linkedin && (
              <a href={contact.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="uppercase text-xs font-bold tracking-widest transition-colors hover:text-[var(--primary)]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary, '--primary': tokens.colors.primary }} data-cursor="hover">LinkedIn</a>
            )}
            {contact.socialLinks.twitter && (
              <a href={contact.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="uppercase text-xs font-bold tracking-widest transition-colors hover:text-[var(--primary)]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary, '--primary': tokens.colors.primary }} data-cursor="hover">Twitter</a>
            )}
            {contact.socialLinks.website && (
              <a href={contact.socialLinks.website} target="_blank" rel="noopener noreferrer" className="uppercase text-xs font-bold tracking-widest transition-colors hover:text-[var(--primary)]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary, '--primary': tokens.colors.primary }} data-cursor="hover">Website</a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;
