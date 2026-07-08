import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";
import { toast } from "react-hot-toast";
import { Award, ExternalLink } from "lucide-react";

const Certifications = ({ user, isOwner, handleArrayUpdate }) => {
  const certifications = user?.certifications || [];

  if (!isOwner && certifications.length === 0) return null;

  return (
    <section 
      id="certifications-ad" 
      className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t overflow-hidden"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            VERIFIED EXPERTISE / 04
          </motion.p>
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]"
            style={{ color: tokens.colors.foreground }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Certifications
          </motion.h2>
        </div>

        {certifications.length === 0 && isOwner ? (
          <div 
            className="text-center py-16 border border-dashed rounded-3xl transition-all"
            style={{ borderColor: tokens.colors.borderStrong }}
          >
            <p className="text-sm uppercase tracking-widest mb-6 opacity-60" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}>No Certifications Found</p>
            <button 
              onClick={() => toast.success("Add certifications in Dashboard > Credentials.")}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              style={{ 
                fontFamily: tokens.fonts.mono, 
                backgroundColor: 'rgba(182,119,239,0.1)',
                color: tokens.colors.primary,
                border: `1px solid rgba(182,119,239,0.3)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.primary;
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(182,119,239,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(182,119,239,0.1)';
                e.currentTarget.style.color = tokens.colors.primary;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              + Add Certification
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden flex flex-col items-start"
                style={{
                  borderColor: tokens.colors.borderFaint,
                  backgroundColor: tokens.colors.backgroundFaint,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(182,119,239,0.5)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(182,119,239,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.borderFaint;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Accent glow orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--primary-color)]/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ '--primary-color': tokens.colors.primary }} />

                <div className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: 'rgba(182,119,239,0.1)', color: tokens.colors.primary }}>
                  <Award size={24} />
                </div>
                
                <h3 className="text-2xl font-bold tracking-tight mb-2" style={{ color: tokens.colors.foreground, fontFamily: tokens.fonts.display }}>
                  <InlineEdit 
                    isOwner={isOwner} 
                    value={cert.title || cert.name} 
                    onSave={(v) => handleArrayUpdate("certifications", index, { ...cert, title: v })}
                  >
                    {cert.title || cert.name}
                  </InlineEdit>
                </h3>
                
                <p className="text-sm font-medium tracking-wide mb-6" style={{ color: tokens.colors.textDim, fontFamily: tokens.fonts.body }}>
                  <InlineEdit 
                    isOwner={isOwner} 
                    value={cert.issuer || cert.organization} 
                    onSave={(v) => handleArrayUpdate("certifications", index, { ...cert, issuer: v })}
                  >
                    {cert.issuer || cert.organization}
                  </InlineEdit>
                </p>

                <div className="mt-auto pt-6 w-full flex items-center justify-between border-t" style={{ borderColor: tokens.colors.borderFaint }}>
                  <span
                    className="text-[10px] uppercase tracking-[0.2em]"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
                  >
                    {cert.date || cert.year}
                  </span>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-colors"
                      style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
