import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";
import { toast } from "react-hot-toast";

const Dossier = ({ user, isOwner, handleArrayUpdate }) => {
  const achievements = user?.achievements || [];
  const languages = user?.languages || [];

  if (!isOwner && achievements.length === 0 && languages.length === 0) return null;

  return (
    <section
      id="dossier-ol"
      className="py-24 md:py-32 px-6 md:px-16"
      style={{ backgroundColor: tokens.colors.bg }}
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
            — Validated Excellence
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: tokens.colors.textPrimary, fontFamily: tokens.fonts.primary }}>
            The Dossier
          </h2>
        </motion.div>

        {achievements.length === 0 && languages.length === 0 && isOwner ? (
          <div 
            className="text-center py-16 rounded-2xl border border-dashed"
            style={{ borderColor: tokens.colors.border }}
          >
            <p className="text-sm uppercase tracking-widest mb-6" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>No Dossier Data Found</p>
            <button 
              onClick={() => toast.success("Add awards and languages in Dashboard > Dossier.")}
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
              + Add Achievements
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Honors & Awards */}
            {achievements.length > 0 && (
              <div className={languages.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}>
                <h4 className="text-xs uppercase tracking-[0.4em] mb-10 pb-4 border-b" style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.border, color: tokens.colors.accent }}>
                  Honors & Awards
                </h4>
                <div className="space-y-10">
                  {achievements.map((award, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="group relative pl-6 border-l transition-colors duration-300"
                      style={{ borderColor: tokens.colors.border }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = tokens.colors.accent; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = tokens.colors.border; }}
                    >
                      {/* Gold dot */}
                      <div className="absolute top-1 -left-[5px] w-2.5 h-2.5 rounded-full border-2" style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.accent }} />

                      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                        <h5 className="text-xl md:text-2xl font-bold" style={{ color: tokens.colors.textPrimary, fontFamily: tokens.fonts.primary }}>
                          <InlineEdit
                            isOwner={isOwner}
                            value={award.title}
                            onSave={(v) => handleArrayUpdate("achievements", idx, { ...award, title: v })}
                          >
                            {award.title}
                          </InlineEdit>
                        </h5>
                        <span className="text-[10px] uppercase tracking-[0.3em] px-3 py-1 rounded-full" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.accent, backgroundColor: tokens.colors.accentGlow }}>
                          {award.date}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: tokens.colors.textSecondary, fontFamily: tokens.fonts.primary }}>
                        <InlineEdit
                          isOwner={isOwner}
                          value={award.description}
                          onSave={(v) => handleArrayUpdate("achievements", idx, { ...award, description: v })}
                        >
                          {award.description}
                        </InlineEdit>
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className={achievements.length > 0 ? "lg:col-span-4" : "lg:col-span-12"}>
                <h4 className="text-xs uppercase tracking-[0.4em] mb-10 pb-4 border-b" style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.border, color: tokens.colors.accent }}>
                  Linguistics
                </h4>
                <div className="space-y-4">
                  {languages.map((lang, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="p-5 rounded-xl border flex items-center justify-between transition-all"
                      style={{ backgroundColor: tokens.colors.bgCard, borderColor: tokens.colors.border, boxShadow: tokens.shadows.card }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = tokens.colors.borderHover; e.currentTarget.style.boxShadow = tokens.shadows.glow; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = tokens.colors.border; e.currentTarget.style.boxShadow = tokens.shadows.card; }}
                    >
                      <span className="text-sm uppercase tracking-wider font-bold" style={{ color: tokens.colors.textPrimary, fontFamily: tokens.fonts.mono }}>
                        <InlineEdit
                          isOwner={isOwner}
                          value={lang.name}
                          onSave={(v) => handleArrayUpdate("languages", idx, { ...lang, name: v })}
                        >
                          {lang.name}
                        </InlineEdit>
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full" style={{ backgroundColor: tokens.colors.accentGlow, color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}>
                        {lang.proficiency}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  );
};

export default Dossier;
