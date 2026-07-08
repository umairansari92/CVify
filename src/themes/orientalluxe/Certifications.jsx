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
      id="certifications-ol"
      className="py-24 md:py-32 px-6 md:px-16"
      style={{ backgroundColor: tokens.colors.bgSoft }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.accent }}>
            — Verification
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: tokens.colors.textPrimary, fontFamily: tokens.fonts.primary }}>
            Certifications
          </h2>
        </motion.div>

        {certifications.length === 0 && isOwner ? (
          <div 
            className="text-center py-16 rounded-2xl border border-dashed"
            style={{ borderColor: tokens.colors.border }}
          >
            <p className="text-sm uppercase tracking-widest mb-6" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>No Certifications Found</p>
            <button 
              onClick={() => toast.success("Add certifications in Dashboard > Credentials.")}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              style={{ 
                fontFamily: tokens.fonts.mono, 
                backgroundColor: tokens.colors.accentGlow,
                color: tokens.colors.accent,
                border: `1px solid ${tokens.colors.borderHover}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.accent;
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.boxShadow = tokens.shadows.glowStrong;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.accentGlow;
                e.currentTarget.style.color = tokens.colors.accent;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              + Add Certification
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl border flex flex-col transition-all duration-300"
                style={{
                  borderColor: tokens.colors.border,
                  backgroundColor: tokens.colors.bgCard,
                  boxShadow: tokens.shadows.card,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.borderHover;
                  e.currentTarget.style.boxShadow = tokens.shadows.cardHover;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.border;
                  e.currentTarget.style.boxShadow = tokens.shadows.card;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: tokens.colors.accentGlow, color: tokens.colors.accent }}
                >
                  <Award size={22} />
                </div>

                <h3 className="text-xl font-bold tracking-tight mb-2" style={{ color: tokens.colors.textPrimary, fontFamily: tokens.fonts.primary }}>
                  <InlineEdit
                    isOwner={isOwner}
                    value={cert.title || cert.name}
                    onSave={(v) => handleArrayUpdate("certifications", index, { ...cert, title: v })}
                  >
                    {cert.title || cert.name}
                  </InlineEdit>
                </h3>

                <p className="text-sm mb-6" style={{ color: tokens.colors.textSecondary, fontFamily: tokens.fonts.primary }}>
                  <InlineEdit
                    isOwner={isOwner}
                    value={cert.issuer || cert.organization}
                    onSave={(v) => handleArrayUpdate("certifications", index, { ...cert, issuer: v })}
                  >
                    {cert.issuer || cert.organization}
                  </InlineEdit>
                </p>

                <div className="mt-auto pt-6 border-t flex items-center justify-between" style={{ borderColor: tokens.colors.border }}>
                  <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>
                    {cert.date || cert.year}
                  </span>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                      style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.accent }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify <ExternalLink size={11} />
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
