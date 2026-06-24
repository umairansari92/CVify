import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "./tokens";
import { Calendar, MapPin, Building2, GraduationCap } from "lucide-react";

const Resume = ({ user, isOwner, handleArrayUpdate }) => {
  const [activeTab, setActiveTab] = useState("Experience");

  const tabs = ["Experience", "Education", "Skills"];

  const renderExperience = () => {
    const expList = user?.experience || [];
    if (expList.length === 0 && !isOwner) return <p className="text-[#a1a1aa] italic">No experience added yet.</p>;

    return (
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: tokens.fonts.heading }}>My Experience</h3>
        {expList.map((exp, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={exp._id || idx} 
            className="bg-[#111] border border-[#222] p-6 rounded hover:border-[var(--primary-color)]/30 transition-all relative overflow-hidden group"
          >
            {/* Neon accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary-color)]/20 group-hover:bg-[var(--primary-color)] transition-colors"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div>
                <h4 className="text-xl font-bold text-white">{exp.jobTitle}</h4>
                <div className="flex items-center gap-2 text-[var(--primary-color)] font-mono text-sm mt-1">
                  <Building2 size={14} /> {exp.companyName}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#a1a1aa] text-sm bg-[#1a1a1a] px-3 py-1 rounded w-fit">
                <Calendar size={14} />
                {exp.startDate ? new Date(exp.startDate).getFullYear() : "Past"} - {exp.current ? "Present" : (exp.endDate ? new Date(exp.endDate).getFullYear() : "Present")}
              </div>
            </div>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderEducation = () => {
    const eduList = user?.education || [];
    if (eduList.length === 0 && !isOwner) return <p className="text-[#a1a1aa] italic">No education added yet.</p>;

    return (
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: tokens.fonts.heading }}>My Education</h3>
        {eduList.map((edu, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={edu._id || idx} 
            className="bg-[#111] border border-[#222] p-6 rounded hover:border-[var(--primary-color)]/30 transition-all relative overflow-hidden group"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary-color)]/20 group-hover:bg-[var(--primary-color)] transition-colors"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div>
                <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                <div className="flex items-center gap-2 text-[var(--primary-color)] font-mono text-sm mt-1">
                  <GraduationCap size={14} /> {edu.schoolName}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#a1a1aa] text-sm bg-[#1a1a1a] px-3 py-1 rounded w-fit">
                <Calendar size={14} />
                {edu.startDate ? new Date(edu.startDate).getFullYear() : "Past"} - {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
              </div>
            </div>
            {edu.grade && <p className="text-white font-mono text-sm">Grade: <span className="text-[var(--primary-color)]">{edu.grade}</span></p>}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    const skills = user?.skills?.technical || user?.skills || [];
    if (skills.length === 0 && !isOwner) return <p className="text-[#a1a1aa] italic">No skills added yet.</p>;

    return (
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: tokens.fonts.heading }}>My Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, idx) => {
            const skillName = typeof skill === "string" ? skill : skill.name;
            const skillLevel = typeof skill === "string" ? 80 : (skill.level || 80);
            
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={idx} 
                className="bg-[#111] border border-[#222] p-4 rounded hover:border-[var(--primary-color)]/50 transition-colors group flex flex-col items-center justify-center gap-4 text-center h-32"
              >
                {/* Glowing ring representation of level */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#222" strokeWidth="4" />
                      <circle 
                        cx="32" cy="32" r="28" fill="none" 
                        stroke="var(--primary-color)" 
                        strokeWidth="4" 
                        strokeDasharray="175" 
                        strokeDashoffset={175 - (175 * skillLevel) / 100}
                        className="transition-all duration-1000 ease-out"
                      />
                   </svg>
                   <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white group-hover:text-[var(--primary-color)] transition-colors">
                     {skillLevel}%
                   </span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-wider uppercase">{skillName}</h4>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="resume" className="py-20 px-6 relative z-10 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: tokens.fonts.heading }}>
            <span className="text-[var(--primary-color)]">02. </span> Resume
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Vertical Tabs */}
          <div className="md:w-1/4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 rounded text-left whitespace-nowrap transition-all font-mono uppercase tracking-wider text-sm font-bold border-l-2 md:border-l-4 md:border-t-0 border-t-2 ${
                  activeTab === tab 
                    ? "bg-[var(--primary-color)]/10 text-[var(--primary-color)] border-[var(--primary-color)] shadow-[inset_0_0_15px_rgba(0,255,204,0.1)]" 
                    : "bg-[#111] text-[#a1a1aa] border-transparent hover:bg-[#1a1a1a] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="md:w-3/4 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "Experience" && renderExperience()}
                {activeTab === "Education" && renderEducation()}
                {activeTab === "Skills" && renderSkills()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
