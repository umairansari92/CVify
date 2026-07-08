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
      className="py-20 md:py-32 border-t"
      style={{
        backgroundColor: tokens.colors.pureBlack,
        color: tokens.colors.paper,
        borderColor: tokens.colors.borders,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            className="text-xs uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
          >
            Validated Excellence
          </h2>
          <h3
            className="text-3xl font-bold leading-tight"
            style={{ fontFamily: tokens.fonts.heading }}
          >
            The Credential Dossier
          </h3>
        </motion.div>

        {achievements.length === 0 && languages.length === 0 && isOwner ? (
          <div className="text-center py-12 border border-dashed" style={{ borderColor: tokens.colors.borders }}>
            <p className="text-sm uppercase tracking-widest mb-6 opacity-60" style={{ fontFamily: tokens.fonts.mono }}>No Dossier Data Found</p>
            <button 
              onClick={() => toast.success("Add awards and languages in Dashboard > Dossier.")}
              className="px-8 py-4 border text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
              style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.paper }}
            >
              + Add Achievements
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Honors & Awards */}
            {achievements.length > 0 && (
              <div className={languages.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}>
                <h4 
                  className="text-lg uppercase tracking-widest mb-10 pb-4 border-b"
                  style={{ fontFamily: tokens.fonts.mono, borderColor: '#333' }}
                >
                  Honors & Awards
                </h4>
                <div className="space-y-12">
                  {achievements.map((award, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                        <h5 className="text-xl font-bold" style={{ fontFamily: tokens.fonts.heading }}>
                          <InlineEdit 
                            isOwner={isOwner} 
                            value={award.title} 
                            onSave={(v) => handleArrayUpdate("achievements", idx, { ...award, title: v })}
                          >
                            {award.title}
                          </InlineEdit>
                        </h5>
                        <span 
                          className="text-[10px] uppercase tracking-[0.2em]"
                          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                        >
                          {award.date}
                        </span>
                      </div>
                      <p className="text-sm opacity-80 leading-relaxed" style={{ color: '#D6D3D1' }}>
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
                <h4 
                  className="text-lg uppercase tracking-widest mb-10 pb-4 border-b"
                  style={{ fontFamily: tokens.fonts.mono, borderColor: '#333' }}
                >
                  Languages
                </h4>
                <div className="space-y-6">
                  {languages.map((lang, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm uppercase tracking-wider" style={{ fontFamily: tokens.fonts.mono }}>
                        <InlineEdit 
                          isOwner={isOwner} 
                          value={lang.name} 
                          onSave={(v) => handleArrayUpdate("languages", idx, { ...lang, name: v })}
                        >
                          {lang.name}
                        </InlineEdit>
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: tokens.colors.muted }}>
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
