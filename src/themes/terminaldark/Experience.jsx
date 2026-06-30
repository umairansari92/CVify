import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";

const Experience = ({ user, isOwner, handleArrayUpdate }) => {
  const experiences = user?.experience || [];
  if (experiences.length === 0) return null;

  return (
    <section id="experience-td" className="relative z-0 mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-[18px] uppercase tracking-[0.35em] text-[#aaa6c3]">What I have done so far</p>
        <h2 className="text-[30px] font-black text-white sm:text-[40px] md:text-[60px]">Work Experience.</h2>
      </motion.div>

      <div className="relative ml-4 mt-20 flex flex-col gap-8 border-l-4 border-[#915eff]/30 md:ml-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[26px] top-4 w-12 h-12 bg-[#151030] border-4 border-[#915eff] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(145,94,255,0.5)] z-10">
              <Briefcase size={20} className="text-[#915eff]" />
            </div>

            <div className="rounded-[1.5rem] border border-[#915eff]/20 bg-[#151030]/90 p-8 shadow-[0_0_25px_rgba(145,94,255,0.08)] transition-all duration-300 hover:border-[#915eff]/60">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-white text-[24px] font-bold">
                    <InlineEdit
                      isOwner={isOwner}
                      id={`td-exp-role-${index}`}
                      value={exp.jobTitle || exp.role || ""}
                      onSave={(v) => handleArrayUpdate?.("experience", index, { jobTitle: v, role: v })}
                    >
                      {exp.jobTitle || exp.role}
                    </InlineEdit>
                  </h3>
                  <p className="text-[#aaa6c3] text-[16px] font-semibold mt-1">
                    <InlineEdit
                      isOwner={isOwner}
                      id={`td-exp-company-${index}`}
                      value={exp.company || ""}
                      onSave={(v) => handleArrayUpdate?.("experience", index, { company: v })}
                    >
                      {exp.company}
                    </InlineEdit>
                  </p>
                </div>
                <p className="mt-2 w-max rounded-full bg-[#915eff]/10 px-3 py-1 text-[14px] font-medium uppercase tracking-[0.2em] text-[#915eff] md:mt-0">
                  {exp.startDate} — {exp.endDate || "Present"}
                </p>
              </div>

              <InlineEdit
                isOwner={isOwner}
                id={`td-exp-desc-${index}`}
                value={exp.description || exp.achievements || ""}
                type="textarea"
                onSave={(v) => handleArrayUpdate?.("experience", index, { description: v })}
              >
                <ul className="mt-5 list-none space-y-2">
                  {(exp.description || exp.achievements || "")
                    .split("\n")
                    .filter(Boolean)
                    .map((desc, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#aaa6c3] text-[14px] leading-relaxed">
                        <span className="text-[#915eff] mt-1 shrink-0">▸</span>
                        {desc.replace(/^[-*•\s]+/, "")}
                      </li>
                    ))}
                </ul>
              </InlineEdit>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
