import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const Experience = ({ user }) => {
  const experiences = user?.experience || [];
  if (experiences.length === 0) return null;

  return (
    <section id="experience-td" className="max-w-7xl mx-auto px-6 py-20 relative z-0">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-[#aaa6c3] text-[18px] uppercase tracking-wider">What I have done so far</p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col gap-8 relative border-l-4 border-[#915eff]/30 ml-4 md:ml-8">
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

            <div className="bg-[#151030] p-8 rounded-2xl border border-[#915eff]/20 hover:border-[#915eff]/60 transition-colors shadow-xl">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-white text-[24px] font-bold">{exp.jobTitle || exp.role}</h3>
                  <p className="text-[#aaa6c3] text-[16px] font-semibold mt-1">{exp.company}</p>
                </div>
                <p className="text-[#915eff] font-medium text-[14px] tracking-wider mt-2 md:mt-0 uppercase bg-[#915eff]/10 px-3 py-1 rounded-full w-max">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>
              </div>

              <ul className="mt-5 list-disc ml-5 space-y-2">
                {exp.description ? exp.description.split('\n').filter(Boolean).map((desc, i) => (
                  <li key={i} className="text-white-100 text-[14px] pl-1 tracking-wider text-[#aaa6c3]">
                    {desc.replace(/^[-\*\s]+/, '')}
                  </li>
                )) : (
                  <li className="text-white-100 text-[14px] pl-1 tracking-wider text-[#aaa6c3]">
                    Led key initiatives and drove impactful results for the team.
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
