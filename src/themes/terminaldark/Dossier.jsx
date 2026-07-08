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
    <section className="py-20 md:py-28 px-6 md:px-16 border-t" style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.background }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}>// dossier</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}>The Dossier</h2>
        </motion.div>

        {achievements.length === 0 && languages.length === 0 && isOwner ? (
          <div className="text-center py-14 rounded-2xl border border-dashed" style={{ borderColor: tokens.colors.border }}>
            <p className="text-sm mb-6 opacity-60" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>// no dossier data found</p>
            <button onClick={() => toast.success("Add awards & languages in Dashboard > Dossier.")} className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border" style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.accent, color: tokens.colors.accent, backgroundColor: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tokens.colors.accent; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tokens.colors.accent; }}>
              + Add Achievements
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {achievements.length > 0 && (
              <div className={languages.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}>
                <h4 className="text-xs uppercase tracking-[0.3em] mb-8 pb-3 border-b" style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.border, color: tokens.colors.accent }}>// honors & awards</h4>
                <div className="space-y-10">
                  {achievements.map((award, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative pl-6 border-l-2 transition-colors duration-300" style={{ borderColor: tokens.colors.border }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = tokens.colors.accent}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = tokens.colors.border}
                    >
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                        <h5 className="text-xl font-bold" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
                          <InlineEdit isOwner={isOwner} value={award.title} onSave={(v) => handleArrayUpdate("achievements", idx, { ...award, title: v })}>{award.title}</InlineEdit>
                        </h5>
                        <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.accent, backgroundColor: `${tokens.colors.accent}22` }}>{award.date}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.body }}>
                        <InlineEdit isOwner={isOwner} value={award.description} onSave={(v) => handleArrayUpdate("achievements", idx, { ...award, description: v })}>{award.description}</InlineEdit>
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div className={achievements.length > 0 ? "lg:col-span-4" : "lg:col-span-12"}>
                <h4 className="text-xs uppercase tracking-[0.3em] mb-8 pb-3 border-b" style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.border, color: tokens.colors.accent }}>// linguistics</h4>
                <div className="space-y-4">
                  {languages.map((lang, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="p-5 rounded-2xl border flex items-center justify-between transition-all" style={{ backgroundColor: tokens.colors.cardBg, borderColor: tokens.colors.border }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${tokens.colors.accent}66`; e.currentTarget.style.backgroundColor = tokens.colors.cardBgHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = tokens.colors.border; e.currentTarget.style.backgroundColor = tokens.colors.cardBg; }}
                    >
                      <span className="text-sm uppercase tracking-widest font-bold" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}>
                        <InlineEdit isOwner={isOwner} value={lang.name} onSave={(v) => handleArrayUpdate("languages", idx, { ...lang, name: v })}>{lang.name}</InlineEdit>
                      </span>
                      <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: `${tokens.colors.accent}22`, color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}>{lang.proficiency}</span>
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
