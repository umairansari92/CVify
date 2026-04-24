import React from "react";
import { motion } from "framer-motion";
import { FaHistory, FaPlus } from "react-icons/fa";
import { Briefcase } from "lucide-react";
import InlineEdit from "../InlineEdit";
import { toast } from "react-hot-toast";

const Experience = React.memo(({ user, isOwner, displayValue, handleLiveUpdate, handleArrayUpdate }) => {
  return (
    <section id="journey" className="py-20 md:py-32 border-b border-[var(--card-border)] bg-[var(--card-bg)]">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tighter flex items-center justify-center gap-4">
             <FaHistory className="text-[var(--primary-color)]" />
             <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.experience} onSave={(v) => handleLiveUpdate({ "sectionNames.experience": v })}>
                {displayValue(user.sectionNames?.experience, "Professional Journey")}
             </InlineEdit>
          </h2>
          <div className="h-1.5 w-16 bg-[var(--primary-color)] mx-auto rounded-full" />
          <p className="text-sm font-black text-[var(--text-secondary)] opacity-40 uppercase tracking-[0.3em]">Professional Background</p>
        </motion.div>
        
        <div className="w-full max-w-2xl space-y-12 relative before:absolute before:inset-0 before:mx-auto before:h-full before:w-0.5 before:bg-[var(--primary-color)]/20">
          {(user.experience || []).map((exp, index) => (
            <motion.div 
              key={exp._id || index}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="relative flex flex-col items-center group w-full"
            >
              <motion.div 
                whileHover={{ scale: 1.25, rotate: -5 }}
                className="z-20 flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--primary-color)] text-white mb-6 shadow-xl shadow-[var(--primary-color)]/30 group-hover:shadow-[var(--primary-color)]/60 transition-all duration-300"
              >
                <Briefcase size={22} />
              </motion.div>

              <motion.div 
                whileHover={{ 
                  x: 12,
                  backgroundColor: "rgba(255, 255, 255, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full bg-[var(--card-bg)] border-l-0 border-t border-b border-r border-[var(--card-border)] hover:border-l-4 hover:border-[var(--primary-color)] rounded-2xl p-6 sm:p-8 md:p-10 text-center md:text-left shadow-xl backdrop-blur-sm transition-all duration-300 relative overflow-hidden group/card"
              >
                <div className="absolute top-0 left-0 w-0 h-1 bg-[var(--primary-color)] group-hover/card:w-full transition-all duration-700" />
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold text-[var(--primary-color)] tracking-wider mb-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[var(--primary-color)]/10 rounded-full border border-[var(--primary-color)]/20">
                     <span className="w-2 h-2 rounded-full bg-[var(--primary-color)] animate-pulse" />
                     <InlineEdit isOwner={isOwner} label="Period" value={`${exp.startDate} - ${exp.endDate || 'Present'}`} onSave={(v) => { 
                       const [s, e] = v.split(" - "); 
                       handleArrayUpdate("experience", index, { startDate: s, endDate: e === "Present" ? "" : e, isCurrent: e === "Present" });
                     }}>
                       {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                     </InlineEdit>
                  </div>
                  <InlineEdit isOwner={isOwner} label="Location" value={exp.location} onSave={(v) => handleArrayUpdate("experience", index, { location: v })}>
                     <span className="opacity-60">{exp.location || "Location"}</span>
                  </InlineEdit>
                  <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]/20" />
                  <InlineEdit isOwner={isOwner} label="Mode" value={exp.type} onSave={(v) => handleArrayUpdate("experience", index, { type: v })}>
                     <span className="opacity-60">{exp.type || "Full-time"}</span>
                  </InlineEdit>
                </div>

                <h3 className="text-xl md:text-3xl font-black text-[var(--text-primary)] mb-1 tracking-tight">
                  <InlineEdit isOwner={isOwner} label="Role" value={exp.role} onSave={(v) => handleArrayUpdate("experience", index, { role: v })}>{exp.role || "Role"}</InlineEdit>
                </h3>
                <h4 className="text-lg md:text-xl font-bold text-[var(--primary-color)] mb-4 md:mb-6 opacity-90">
                  <InlineEdit isOwner={isOwner} label="Company" value={exp.company} onSave={(v) => handleArrayUpdate("experience", index, { company: v })}>{exp.company || "Company"}</InlineEdit>
                </h4>

                <div className="text-base text-[var(--text-secondary)] leading-relaxed relative pl-4 border-l border-[var(--card-border)] group-hover:border-[var(--primary-color)]/30 transition-colors">
                  <InlineEdit isOwner={isOwner} label="Achievements" value={exp.achievements} onSave={(v) => handleArrayUpdate("experience", index, { achievements: v })} multiline>
                    <p className="whitespace-pre-wrap opacity-70 group-hover:opacity-100 transition-opacity">{exp.achievements || "Description..."}</p>
                  </InlineEdit>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Experience;
