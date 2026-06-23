import React from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";

const Skills = ({ user, isOwner, handleLiveUpdate }) => {
  const allSkills = Array.isArray(user?.skills) ? user.skills : [];
  
  // Backward compatibility + new schema
  const technicalSkills = allSkills.length > 0 && allSkills[0]?.name
    ? allSkills.filter(s => s.category?.toLowerCase() === "technical" || !s.category)
    : (user?.skills?.technical || allSkills || []);

  const strategicSkills = allSkills.length > 0 && allSkills[0]?.name
    ? allSkills.filter(s => s.category?.toLowerCase() === "strategic")
    : (user?.skills?.strategic || []);

  if (technicalSkills.length === 0 && strategicSkills.length === 0) return null;

  const renderSkillBlock = (skillsList, subtitle, title, idPrefix) => {
    if (!skillsList || skillsList.length === 0) return null;
    return (
      <div className="mb-20 last:mb-0">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-[#aaa6c3] text-[18px] uppercase tracking-wider">{subtitle}</p>
          <h2 className="text-white font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[28px]">{title}.</h2>
        </motion.div>

        <div className="mt-14 flex flex-row flex-wrap justify-center gap-6">
          {skillsList.map((skill, index) => {
            const name = typeof skill === "string" ? skill : skill.name;
            const icon = typeof skill === "string" ? null : skill.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-28 h-28 flex flex-col items-center justify-center bg-[#151030] rounded-full shadow-[0_0_15px_rgba(145,94,255,0.1)] border-2 border-[#151030] hover:border-[#915eff] transition-all"
              >
                <div className="text-[#915eff] font-black text-xs text-center px-2 break-words">
                  {icon ? (
                    <img src={icon} alt={name} className="w-10 h-10 object-contain mx-auto mb-2" />
                  ) : (
                    <span className="text-2xl mb-1 block">⚡</span>
                  )}
                  <InlineEdit
                    isOwner={isOwner}
                    id={`td-${idPrefix}-${index}`}
                    value={name || ""}
                    onSave={(v) => {
                      // We map over allSkills to update the specific one. 
                      // For simplicity with legacy structures, this just updates the current array mapping back to the main skills array.
                      const updated = allSkills.map((s) =>
                        (s.name === name || s === name)
                          ? (typeof s === "string" ? v : { ...s, name: v })
                          : s
                      );
                      handleLiveUpdate?.({ skills: updated });
                    }}
                  >
                    {name}
                  </InlineEdit>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="skills-td" className="max-w-7xl mx-auto px-6 py-20">
      {renderSkillBlock(technicalSkills, "My technical stack", "Technical Skills", "tech")}
      {renderSkillBlock(strategicSkills, "My core competencies", "Strategic Skills", "strat")}
    </section>
  );
};

export default Skills;
