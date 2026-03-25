import React from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Globe, ExternalLink, Trophy } from "lucide-react";
import InlineEdit from "../InlineEdit";

const Dossier = React.memo(({ user, isOwner, displayValue, handleLiveUpdate, handleArrayUpdate }) => {
  const achievements = user?.achievements || [];
  const certifications = user?.certifications || [];
  const languages = user?.languages || [];

  if (!isOwner && achievements.length === 0 && certifications.length === 0 && languages.length === 0) return null;

  return (
    <section id="journey" className="py-32 border-b border-white/5 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 space-y-24">
        
        {/* Certifications & Achievements Title */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
            The Credential Dossier
          </h2>
          <div className="h-1.5 w-24 bg-[var(--primary-color)] mx-auto rounded-full opacity-60" />
          <p className="text-xs font-black text-[var(--primary-color)] opacity-40 uppercase tracking-[0.5em]">Validated Excellence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Certifications Column */}
          <div className="space-y-10">
            <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-4">
              <GraduationCap className="text-[var(--primary-color)]" size={24} /> 
              {displayValue(user.sectionNames?.certifications, "Certifications")}
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:border-[var(--primary-color)]/20 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-[var(--text-primary)] leading-tight uppercase">
                        <InlineEdit isOwner={isOwner} label="Name" value={cert.name} onSave={(v) => handleArrayUpdate("certifications", idx, { ...cert, name: v })}>
                          {cert.name}
                        </InlineEdit>
                      </h4>
                      <p className="text-xs font-black text-[var(--primary-color)] opacity-60 uppercase tracking-widest">{cert.issuer} • {cert.date}</p>
                    </div>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-2xl hover:bg-[var(--primary-color)]/20 text-[var(--text-primary)] transition-all">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
              {certifications.length === 0 && isOwner && <p className="opacity-20 italic text-sm">No certifications added yet.</p>}
            </div>
          </div>

          {/* Honors & Awards Column */}
          <div className="space-y-10">
            <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-4">
              <Trophy className="text-[var(--primary-color)]" size={24} /> 
              {displayValue(user.sectionNames?.achievements, "Honors & Awards")}
            </h3>
            <div className="space-y-6">
              {achievements.map((award, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:border-[var(--primary-color)]/20 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-[var(--text-primary)] leading-tight uppercase">
                        <InlineEdit isOwner={isOwner} label="Title" value={award.title} onSave={(v) => handleArrayUpdate("achievements", idx, { ...award, title: v })}>
                          {award.title}
                        </InlineEdit>
                      </h4>
                      <p className="text-xs font-black text-[var(--primary-color)] opacity-60 uppercase tracking-widest">{award.date}</p>
                    </div>
                    <Award size={18} className="text-[var(--primary-color)] opacity-40 shrink-0" />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] opacity-80 leading-relaxed italic line-clamp-2">
                    {award.description}
                  </p>
                </motion.div>
              ))}
              {achievements.length === 0 && isOwner && <p className="opacity-20 italic text-sm">No awards recorded yet.</p>}
            </div>
          </div>

        </div>

        {/* Global Reach (Languages) */}
        {languages.length > 0 && (
          <div className="pt-16 border-t border-white/5">
            <div className="flex flex-wrap items-center justify-center gap-10">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)] animate-pulse" />
                  <div className="text-left">
                    <p className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">{lang.name}</p>
                    <p className="text-[10px] font-black text-[var(--primary-color)] opacity-40 uppercase tracking-[0.2em]">{lang.proficiency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

export default Dossier;
