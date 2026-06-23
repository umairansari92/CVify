import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const Education = ({ user }) => {
  const education = user?.education || [];
  if (education.length === 0) return null;

  return (
    <section id="education-td" className="max-w-7xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-[#aaa6c3] text-[18px] uppercase tracking-wider">My Learning Path</p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Academic Qualification.
        </h2>
      </motion.div>

      <div className="mt-16 relative">
        {/* Center vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#915eff] via-[#915eff]/40 to-transparent hidden md:block" />

        <div className="flex flex-col gap-16">
          {education.map((edu, index) => {
            const isLeft = index % 2 === 0;
            const institution = edu.institution || edu.school || edu.college || "Institution";
            const degree = edu.degree || edu.qualification || edu.fieldOfStudy || "Degree";
            const location = edu.location || edu.city || "";
            const startDate = edu.startDate || edu.from || "";
            const endDate = edu.endDate || edu.to || "Present";
            const description = edu.description || "";
            const logo = edu.logo || edu.institutionLogo || null;

            const period = [startDate, endDate].filter(Boolean).join(" - ");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Card */}
                <div className={`flex-1 ${isLeft ? "md:pr-16 md:text-left" : "md:pl-16 md:text-left"}`}>
                  <div className="bg-[#151030] border border-[#915eff]/20 hover:border-[#915eff]/60 transition-colors rounded-2xl p-6 shadow-[0_0_20px_rgba(145,94,255,0.05)] hover:shadow-[0_0_30px_rgba(145,94,255,0.15)]">
                    <h3 className="text-white font-black text-[20px] mb-1">{institution}</h3>
                    {location && <p className="text-[#aaa6c3] text-sm mb-3">{location}</p>}
                    <p className="text-[#915eff] font-bold text-sm mb-4 bg-[#915eff]/10 inline-block px-3 py-1 rounded-full">{degree}</p>
                    {description && (
                      <ul className="mt-2 space-y-2">
                        {description.split("\n").filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-2 text-[#aaa6c3] text-[13px] leading-relaxed">
                            <span className="text-[#915eff] mt-1 shrink-0">▸</span>
                            {line.replace(/^[-*\s]+/, "")}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Center node */}
                <div className="relative z-10 flex-shrink-0 hidden md:flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#151030] border-4 border-[#915eff] flex items-center justify-center shadow-[0_0_20px_rgba(145,94,255,0.5)]">
                    {logo ? (
                      <img src={logo} alt={institution} className="w-10 h-10 object-contain rounded-full" />
                    ) : (
                      <GraduationCap size={24} className="text-[#915eff]" />
                    )}
                  </div>
                  {period && (
                    <span className={`absolute top-1/2 -translate-y-1/2 text-[#915eff] text-xs font-bold whitespace-nowrap bg-[#050816] px-2 py-1 rounded-lg border border-[#915eff]/30 ${isLeft ? "left-[calc(100%+12px)]" : "right-[calc(100%+12px)]"}`}>
                      {period}
                    </span>
                  )}
                </div>

                {/* Period for mobile */}
                <div className="md:hidden text-center">
                  <span className="text-[#915eff] text-xs font-bold bg-[#915eff]/10 px-3 py-1 rounded-full border border-[#915eff]/30">
                    {period}
                  </span>
                </div>

                {/* Empty side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
