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
      id="dossier-ad" 
      className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t overflow-hidden"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      {/* Background abstract element */}
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{ backgroundColor: tokens.colors.primary }}
      />

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
            VALIDATED EXCELLENCE / 05
          </motion.p>
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]"
            style={{ color: tokens.colors.foreground }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Dossier
          </motion.h2>
        </div>

        {achievements.length === 0 && languages.length === 0 && isOwner ? (
          <div 
            className="text-center py-16 border border-dashed rounded-3xl transition-all"
            style={{ borderColor: tokens.colors.borderStrong }}
          >
            <p className="text-sm uppercase tracking-widest mb-6 opacity-60" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}>No Dossier Data Found</p>
            <button 
              onClick={() => toast.success("Add awards and languages in Dashboard > Dossier.")}
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
              + Add Achievements
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Honors & Awards */}
            {achievements.length > 0 && (
              <div className={languages.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}>
                <h4 
                  className="text-xs uppercase tracking-[0.3em] mb-12 pb-4 border-b"
                  style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.borderFaint, color: tokens.colors.primary }}
                >
                  Honors & Awards
                </h4>
                <div className="space-y-12">
                  {achievements.map((award, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="group relative pl-6 border-l-2"
                      style={{ borderColor: tokens.colors.borderFaint }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.borderFaint;
                      }}
                    >
                      <div className="absolute top-0 left-[-6px] w-2.5 h-2.5 rounded-full transition-colors duration-300" style={{ backgroundColor: tokens.colors.background, border: `2px solid ${tokens.colors.borderStrong}` }} />
                      
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                        <h5 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: tokens.colors.foreground, fontFamily: tokens.fonts.display }}>
                          <InlineEdit 
                            isOwner={isOwner} 
                            value={award.title} 
                            onSave={(v) => handleArrayUpdate("achievements", idx, { ...award, title: v })}
                          >
                            {award.title}
                          </InlineEdit>
                        </h5>
                        <span 
                          className="text-[10px] uppercase tracking-[0.3em]"
                          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
                        >
                          {award.date}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: tokens.colors.textDim, fontFamily: tokens.fonts.body }}>
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
                  className="text-xs uppercase tracking-[0.3em] mb-12 pb-4 border-b"
                  style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.borderFaint, color: tokens.colors.primary }}
                >
                  Linguistics
                </h4>
                <div className="space-y-6">
                  {languages.map((lang, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="p-6 rounded-2xl border flex items-center justify-between transition-colors"
                      style={{ backgroundColor: tokens.colors.backgroundFaint, borderColor: tokens.colors.borderFaint }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(182,119,239,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.borderFaint;
                      }}
                    >
                      <span className="text-sm uppercase tracking-widest font-bold" style={{ color: tokens.colors.foreground, fontFamily: tokens.fonts.mono }}>
                        <InlineEdit 
                          isOwner={isOwner} 
                          value={lang.name} 
                          onSave={(v) => handleArrayUpdate("languages", idx, { ...lang, name: v })}
                        >
                          {lang.name}
                        </InlineEdit>
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(182,119,239,0.1)', color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}>
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
