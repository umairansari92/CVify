import React from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import InlineEdit from "../InlineEdit";
import { toast } from "react-hot-toast";

const Skills = React.memo(({ user, isOwner, displayValue, handleLiveUpdate, handleArrayUpdate }) => {
  return (
    <section id="expertise" className="py-32 border-b border-white/5 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-6 space-y-20">
        <div className="text-center space-y-4">
          <p className="text-xs font-black text-[var(--primary-color)] uppercase tracking-[0.5em] opacity-40">Expertise & Skills</p>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
            <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.skills} onSave={(v) => handleLiveUpdate({ "sectionNames.skills": v })}>
                {displayValue(user.sectionNames?.skills, "Technical & Professional Skills")}
            </InlineEdit>
          </h2>
          <div className="h-1.5 w-16 bg-[var(--primary-color)] mx-auto rounded-full" />
          {user.skills?.length > 0 && (
            <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em]">
              <span className="text-[var(--primary-color)]">{user.skills.length} skills</span> — YOUR SKILLS
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
          {(user.skills || []).map((skill, index) => {
            const skillName = typeof skill === 'string' ? skill : skill.name;
            const skillLevel = typeof skill === 'string' ? 80 : (skill.percentage || 80);

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderColor: "rgba(255, 255, 255, 0.4)" 
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-3 cursor-default group transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--primary-color)] opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                <span className="text-sm md:text-base font-bold text-[var(--text-primary)] tracking-wide">
                  <InlineEdit isOwner={isOwner} label="Skill" value={skillName} onSave={(v) => handleArrayUpdate("skills", index, { name: v })}>
                    {skillName}
                  </InlineEdit>
                </span>
                {isOwner && (
                  <span className="text-[10px] font-black opacity-20 group-hover:opacity-60 transition-all font-mono">
                    {skillLevel}%
                  </span>
                )}
              </motion.div>
            );
          })}
          
          {isOwner && (
            <button 
              onClick={() => toast.error("Manage categories in Dashboard.")}
              className="px-6 py-3 border border-dashed border-white/20 hover:border-[var(--primary-color)]/40 rounded-2xl text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-all flex items-center gap-2"
            >
              <FaPlus size={14} /> Add Skill
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

export default Skills;
