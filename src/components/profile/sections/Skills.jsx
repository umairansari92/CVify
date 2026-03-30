import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaNpm, FaGitAlt, FaGithub, FaFire, FaServer, FaCode, FaLaptopCode
} from "react-icons/fa";
import { 
  SiNextdotjs, SiRedux, SiExpress, SiMongodb, SiPostman, SiGithub, SiTailwindcss, SiBootstrap, SiMui, SiFirebase, SiSupabase, SiReacthookform, SiNodemon, SiVisualstudio, SiVercel, SiTypescript, SiPython
} from "react-icons/si";
import InlineEdit from "../InlineEdit";

const Skills = React.memo(({ user, isOwner, displayValue, handleLiveUpdate, handleArrayUpdate }) => {
  const rawSkills = user.skills || [];

  const getSkillIcon = (name) => {
    const iconName = name.toLowerCase();
    
    if (iconName.includes("html")) return <FaHtml5 className="text-[#E34F26]" />;
    if (iconName.includes("css")) return <FaCss3Alt className="text-[#1572B6]" />;
    if (iconName.includes("javascript") || iconName === "js") return <FaJs className="text-[#F7DF1E]" />;
    if (iconName.includes("typescript") || iconName === "ts") return <SiTypescript className="text-[#3178C6]" />;
    if (iconName.includes("react")) return <FaReact className="text-[#61DAFB]" />;
    if (iconName.includes("next")) return <SiNextdotjs className="text-white" />;
    if (iconName.includes("redux")) return <SiRedux className="text-[#764ABC]" />;
    if (iconName.includes("node")) return <FaNodeJs className="text-[#339933]" />;
    if (iconName.includes("express")) return <SiExpress className="text-[#000000] dark:text-white" />;
    if (iconName.includes("mongo")) return <SiMongodb className="text-[#47A248]" />;
    if (iconName.includes("firebase")) return <SiFirebase className="text-[#FFCA28]" />;
    if (iconName.includes("supabase")) return <SiSupabase className="text-[#3ECF8E]" />;
    if (iconName.includes("postman")) return <SiPostman className="text-[#FF6C37]" />;
    if (iconName.includes("git")) return <FaGitAlt className="text-[#F05032]" />;
    if (iconName.includes("github")) return <FaGithub className="text-white" />;
    if (iconName.includes("tailwind")) return <SiTailwindcss className="text-[#06B6D4]" />;
    if (iconName.includes("bootstrap")) return <SiBootstrap className="text-[#7952B3]" />;
    if (iconName.includes("mui") || iconName.includes("material")) return <SiMui className="text-[#007FFF]" />;
    if (iconName.includes("hook form")) return <SiReacthookform className="text-[#EC5990]" />;
    if (iconName.includes("nodemon")) return <SiNodemon className="text-[#76D04B]" />;
    if (iconName.includes("python")) return <SiPython className="text-[#3776AB]" />;
    if (iconName.includes("vscode")) return <SiVisualstudiocode className="text-[#007ACC]" />;
    if (iconName.includes("vercel")) return <SiVercel className="text-white" />;
    
    return <FaCode className="text-gray-400" />; // Generic code icon
  };

  return (
    <section id="expertise" className="py-24 md:py-36 border-b border-white/5 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--primary-color)]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        {/* Modern Centered Header */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 mb-4"
          >
            <FaLaptopCode className="text-[var(--primary-color)] text-xs" />
            <span className="text-[10px] font-black text-[var(--primary-color)] uppercase tracking-widest">
              Stack Intelligence
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-[var(--text-primary)] uppercase tracking-tighter"
          >
            <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.skills} onSave={(v) => handleLiveUpdate({ "sectionNames.skills": v })}>
                {displayValue(user.sectionNames?.skills, "My ")}
                <span className="text-[var(--primary-color)]">Skills</span>
            </InlineEdit>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold text-[var(--text-secondary)] italic max-w-2xl mx-auto"
          >
            “Tools and technologies that power my professional solutions.”
          </motion.p>
        </div>

        {/* Premium Wrapping Flexbox Skills Container */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
          {rawSkills.length > 0 ? (
            rawSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, type: "spring", stiffness: 100 }}
                whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
                    borderColor: "var(--primary-color)"
                }}
                className="group relative flex items-center gap-3 px-6 py-4 bg-white/[0.05] dark:bg-white/[0.02] border border-white/10 dark:border-white/5 rounded-2xl cursor-default transition-all duration-500 hover:bg-white dark:hover:bg-white hover:text-slate-900 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              >
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                
                <div className="relative z-10 text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {getSkillIcon(typeof skill === 'string' ? skill : skill.name)}
                </div>
                
                <div className="flex flex-col relative z-10">
                  <span className="text-[11px] md:text-sm font-black text-[var(--text-primary)] group-hover:text-slate-900 uppercase tracking-tighter leading-none transition-colors">
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                  <span className="text-[7px] font-bold text-[var(--primary-color)] uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Verified
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center opacity-20 italic">No skills added yet.</div>
          )}
        </div>

        {/* Quick Tech Fact / Footer */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-10 flex flex-col items-center gap-4"
        >
            <div className="h-px w-20 bg-white/10" />
            <p className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] opacity-30">
                Verified Tech Stack Compliance
            </p>
        </motion.div>
      </div>
    </section>
  );
});

export default Skills;
