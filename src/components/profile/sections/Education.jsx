import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import InlineEdit from "../InlineEdit";
import { toast } from "react-hot-toast";

const Education = React.memo(({ user, isOwner, displayValue, handleLiveUpdate, handleArrayUpdate }) => {
  return (
    <section id="education" className="py-20 md:py-32 border-b border-white/5">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
             <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.education} onSave={(v) => handleLiveUpdate({ "sectionNames.education": v })}>
                {displayValue(user.sectionNames?.education, "Academic Foundation")}
             </InlineEdit>
          </h2>
          <div className="h-1.5 w-16 bg-[var(--primary-color)] mx-auto rounded-full opacity-60" />
          <p className="text-sm font-black text-[var(--text-secondary)] opacity-40 uppercase tracking-[0.3em]">Building the Logical Core</p>
        </motion.div>
        
        <div className="w-full max-w-2xl space-y-12 relative before:absolute before:inset-0 before:mx-auto before:h-full before:w-0.5 before:bg-[var(--primary-color)]/20">
          {(user.education || []).map((edu, index) => (
            <motion.div 
              key={edu._id || index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center group mb-12 md:mb-20 last:mb-0 w-full"
            >
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.3 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="z-20 flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary-color)] text-white mb-6 shadow-2xl shadow-[var(--primary-color)]/50 transition-all duration-500 group-hover:shadow-[var(--primary-color)]/80 cursor-default"
              >
                <GraduationCap size={28} />
              </motion.div>

              <motion.div 
                whileHover={{ 
                  y: -25, 
                  scale: 1.05,
                  rotateX: 3,
                  rotateY: -2,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-14 text-center shadow-2xl backdrop-blur-xl hover:border-[var(--primary-color)]/60 hover:bg-[var(--primary-color)]/[0.05] hover:shadow-[0_40px_80px_rgba(255,255,255,0.3)] transition-all duration-500 perspective-2000"
              >
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-black text-[var(--primary-color)] tracking-[0.2em] uppercase mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                  <InlineEdit isOwner={isOwner} label="Period" value={`${edu.startDate} - ${edu.endDate || 'Present'}`} onSave={(v) => {
                    const [s, e] = v.split(" - ");
                    handleArrayUpdate("education", index, { startDate: s, endDate: e === "Present" ? "" : e });
                  }}>
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </InlineEdit>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]" />
                  <InlineEdit isOwner={isOwner} label="Field of Study" value={edu.fieldOfStudy} onSave={(v) => handleArrayUpdate("education", index, { fieldOfStudy: v })}>
                     {edu.fieldOfStudy || "Field of Study"}
                  </InlineEdit>
                </div>

                <h3 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] leading-tight mb-3 tracking-tighter">
                  <InlineEdit isOwner={isOwner} label="Degree" value={edu.degree} onSave={(v) => handleArrayUpdate("education", index, { degree: v })}>{edu.degree || "Degree"}</InlineEdit>
                </h3>
                
                <h4 className="text-lg md:text-2xl font-bold text-[var(--text-secondary)] mb-6 md:mb-8 opacity-80 decoration-[var(--primary-color)]/30 underline-offset-8">
                  <InlineEdit isOwner={isOwner} label="Institution" value={edu.institution} onSave={(v) => handleArrayUpdate("education", index, { institution: v })}>{edu.institution || "Institution"}</InlineEdit>
                </h4>

                {edu.description && (
                   <div className="relative pt-6 border-t border-white/5">
                     <p className="text-base text-[var(--text-secondary)] leading-relaxed italic opacity-40 group-hover:opacity-90 transition-all duration-500">
                        <InlineEdit isOwner={isOwner} label="Story" value={edu.description} onSave={(v) => handleArrayUpdate("education", index, { description: v })} multiline>{edu.description}</InlineEdit>
                     </p>
                   </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
        {isOwner && (
          <button onClick={() => toast.error("Please add via Dashboard.")} className="mt-12 px-6 py-2 bg-[var(--card-bg)] hover:bg-[var(--primary-color)]/20 border border-[var(--primary-color)]/30 rounded-full text-[var(--primary-color)] text-sm font-medium transition-all flex items-center gap-2 z-10">
            <FaPlus size={16} /> Add Education
          </button>
        )}
      </div>
    </section>
  );
});

export default Education;
