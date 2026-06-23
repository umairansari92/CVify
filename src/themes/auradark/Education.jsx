import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { GraduationCap, Award } from "lucide-react";

const Education = ({ user }) => {
  if (!user || (!user.education?.length && !user.certifications?.length)) return null;

  return (
    <section className="bg-background pt-16 pb-32" style={{ backgroundColor: tokens.colors.background }}>
      <div className="max-w-[1700px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
          
          {/* Empty Left Column to align with About */}
          <div className="hidden lg:block lg:col-span-6" />

          {/* Right Column: Timelines */}
          <div className="lg:col-span-6 space-y-24">
            
            {/* Education Timeline */}
            {user.education && user.education.length > 0 && (
              <div className="space-y-12">
                <div 
                  className="flex items-center gap-4 font-bold text-[10px] tracking-[0.4em] uppercase"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
                >
                  <GraduationCap size={16} /> EDUCATION
                </div>
                
                <div className="space-y-12">
                  {user.education.map((edu, idx) => (
                    <motion.div 
                      key={edu._id || idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="group space-y-3 relative pl-8 border-l transition-colors"
                      style={{ borderColor: tokens.colors.borderFaint }}
                    >
                      {/* Glowing Dot */}
                      <div 
                        className="w-2 h-2 rounded-full absolute -left-[4.5px] top-1 transition-colors"
                        style={{ backgroundColor: tokens.colors.borderStrong }}
                      />
                      
                      <span 
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: tokens.colors.textFaint }}
                      >
                        {edu.startYear} — {edu.endYear || "PRESENT"}
                      </span>
                      
                      <h3 
                        className="text-2xl font-bold transition-colors"
                        style={{ color: tokens.colors.foreground }}
                      >
                        {edu.institution || edu.school} - {edu.degree}
                      </h3>
                      
                      <p 
                        className="text-sm max-w-md"
                        style={{ color: tokens.colors.textDim }}
                      >
                        {edu.description || `${edu.fieldOfStudy}`}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience/Certifications (Mapping experience here if desired, or mapping certs if they exist) */}
            {user.experience && user.experience.length > 0 && (
              <div className="space-y-12">
                <div 
                  className="flex items-center gap-4 font-bold text-[10px] tracking-[0.4em] uppercase"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
                >
                  <Award size={16} /> EXPERIENCE
                </div>
                
                <div className="space-y-12">
                  {user.experience.map((exp, idx) => (
                    <div 
                      key={exp._id || idx}
                      className="group space-y-3 relative pl-8 border-l transition-colors"
                      style={{ borderColor: tokens.colors.borderFaint }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full absolute -left-[4.5px] top-1 transition-colors"
                        style={{ backgroundColor: tokens.colors.borderStrong }}
                      />
                      
                      <span 
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: tokens.colors.textFaint }}
                      >
                        {exp.startDate ? new Date(exp.startDate).getFullYear() : "START"} — {exp.endDate ? new Date(exp.endDate).getFullYear() : "PRESENT"}
                      </span>
                      
                      <h3 
                        className="text-2xl font-bold transition-colors"
                        style={{ color: tokens.colors.foreground }}
                      >
                        {exp.company} - {exp.position}
                      </h3>
                      
                      <p 
                        className="text-sm max-w-md"
                        style={{ color: tokens.colors.textDim }}
                      >
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
