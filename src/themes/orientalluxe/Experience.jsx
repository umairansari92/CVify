import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Experience = ({ user, isOwner, handleArrayUpdate }) => {
  const experiences = user?.experience || [];

  if (experiences.length === 0) return null;

  return (
    <section 
      id="journey" 
      className="py-24 border-b border-[#1a1a1a] relative"
      style={{ fontFamily: tokens.fonts.primary }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-left mb-16 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b58953]">CAREER PATH</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-4">
            <span className="h-8 w-1 rounded-full bg-[#b58953]" /> EXPERIENCE
          </h2>
        </div>

        <div className="relative border-l border-[#b58953]/20 pl-8 space-y-12 ml-4">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp._id || index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Dot Icon indicator */}
              <div className="absolute -left-[45px] top-1.5 w-8 h-8 rounded-full bg-[#121212] border border-[#b58953]/30 flex items-center justify-center text-[#b58953]">
                <Briefcase size={14} />
              </div>

              {/* Card wrapper */}
              <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 sm:p-8 space-y-4 hover:border-[#b58953]/40 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#b58953] font-medium text-xs sm:text-sm">
                  <h3 className="font-extrabold text-lg text-white">
                    <InlineEdit isOwner={isOwner} value={exp.role} onSave={(v) => handleArrayUpdate("experience", index, { role: v })}>{exp.role}</InlineEdit>
                  </h3>
                  <span>
                    {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                  </span>
                </div>

                <div className="text-sm font-semibold opacity-80 text-[#b58953]">
                  <InlineEdit isOwner={isOwner} value={exp.company} onSave={(v) => handleArrayUpdate("experience", index, { company: v })}>{exp.company}</InlineEdit>
                </div>

                <p className="text-sm text-[#a3a3a3] leading-relaxed font-light whitespace-pre-wrap">
                  <InlineEdit isOwner={isOwner} value={exp.achievements} type="textarea" onSave={(v) => handleArrayUpdate("experience", index, { achievements: v })} multiline>
                    {exp.achievements}
                  </InlineEdit>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
