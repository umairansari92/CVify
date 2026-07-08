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
    <section className="relative py-20 md:py-28 px-6 md:px-16 border-t" style={{ borderColor: tokens.colors.cardBorder, backgroundColor: tokens.colors.background }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.4em] mb-3 font-mono" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}>
            &gt; VERIFIED_CREDENTIALS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight" style={{ fontFamily: tokens.fonts.heading, color: '#CDD6F4' }}>
            Certifications
          </h2>
        </motion.div>

        {certifications.length === 0 && isOwner ? (
          <div className="text-center py-14 border border-dashed rounded-2xl" style={{ borderColor: tokens.colors.cardBorder }}>
            <p className="text-sm font-mono mb-6 opacity-60" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>
              &gt; NO_CERTIFICATIONS_FOUND
            </p>
            <button
              onClick={() => toast.success("Add certifications in Dashboard > Credentials.")}
              className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border"
              style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.primary, color: tokens.colors.primary, backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tokens.colors.primary; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = `0 0 20px ${tokens.colors.primary}66`; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tokens.colors.primary; e.currentTarget.style.boxShadow = 'none'; }}
            >
              + ADD_CERTIFICATION
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
                className="group p-7 rounded-2xl border flex flex-col transition-all duration-300"
                style={{ borderColor: tokens.colors.cardBorder, backgroundColor: tokens.colors.cardBg }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = tokens.colors.primary; e.currentTarget.style.boxShadow = `0 0 25px ${tokens.colors.primary}33`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = tokens.colors.cardBorder; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center border transition-colors group-hover:border-current"
                  style={{ borderColor: tokens.colors.cardBorder, color: tokens.colors.primary, backgroundColor: `${tokens.colors.primary}11` }}>
                  <Award size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2 transition-colors group-hover:text-current" style={{ color: '#CDD6F4', fontFamily: tokens.fonts.heading }}>
                  <InlineEdit isOwner={isOwner} value={cert.title || cert.name} onSave={(v) => handleArrayUpdate("certifications", index, { ...cert, title: v })}>
                    {cert.title || cert.name}
                  </InlineEdit>
                </h3>
                <p className="text-sm mb-6" style={{ color: tokens.colors.textMuted, fontFamily: tokens.fonts.body }}>
                  <InlineEdit isOwner={isOwner} value={cert.issuer || cert.organization} onSave={(v) => handleArrayUpdate("certifications", index, { ...cert, issuer: v })}>
                    {cert.issuer || cert.organization}
                  </InlineEdit>
                </p>
                <div className="mt-auto pt-4 border-t flex items-center justify-between" style={{ borderColor: tokens.colors.cardBorder }}>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>{cert.date || cert.year}</span>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest flex items-center gap-1 transition-colors hover:opacity-80" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }} onClick={(e) => e.stopPropagation()}>
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
