import React from "react";
import { motion } from "framer-motion";

const Skills = ({ user }) => {
  const skills = user?.skills?.technical || user?.skills || [];
  if (skills.length === 0) return null;

  return (
    <section id="skills-td" className="max-w-7xl mx-auto px-6 py-20">
       <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-[#aaa6c3] text-[18px] uppercase tracking-wider">My technical stack</p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Skills.</h2>
      </motion.div>

      <div className="mt-14 flex flex-row flex-wrap justify-center gap-6">
        {skills.map((skill, index) => {
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
                {name}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
