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
        <h3 className="text-3xl font-bold mb-8" style={{ fontFamily: "Orbitron, monospace" }}>
          <span className="text-white">My </span><span className="text-[var(--primary-color)]">Experience</span>
        </h3>
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
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
              <div>
                <h4 className="text-xl font-bold text-white">{exp.role || exp.jobTitle}</h4>
                <div className="flex items-center gap-2 text-[var(--primary-color)] font-mono text-sm mt-1">
                  <Building2 size={14} /> {exp.company || exp.companyName}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#a1a1aa] text-sm bg-[#1a1a1a] px-3 py-1 rounded w-fit whitespace-nowrap">
                <Calendar size={14} />
                {exp.startDate} – {exp.isCurrent || exp.current ? "Present" : exp.endDate}
              </div>
            </div>

            {exp.achievements ? (
              <div className="mt-2 space-y-1">
                {exp.achievements.split("\n").filter(Boolean).map((line, li) => (
                  <div key={li} className="flex gap-2 text-sm leading-relaxed text-[#a1a1aa]">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--primary-color)]" />
                    {line.replace(/^[-•]\s*/, "")}
                  </div>
                ))}
              </div>
            ) : exp.description ? (
              <p className="text-[#a1a1aa] text-sm leading-relaxed mt-2">{exp.description}</p>
            ) : null}
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
        <h3 className="text-3xl font-bold mb-8" style={{ fontFamily: "Orbitron, monospace" }}>
          <span className="text-white">My </span><span className="text-[var(--primary-color)]">Education</span>
        </h3>
        {eduList.map((edu, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={edu._id || idx} 
            className="bg-[#111] border border-[#222] p-6 rounded hover:border-[var(--primary-color)]/30 transition-all relative overflow-hidden group"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary-color)]/20 group-hover:bg-[var(--primary-color)] transition-colors"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
              <div>
                <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                <div className="flex items-center gap-2 text-[var(--primary-color)] font-mono text-sm mt-1">
                  <GraduationCap size={14} /> {edu.institution || edu.schoolName}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#a1a1aa] text-sm bg-[#1a1a1a] px-3 py-1 rounded w-fit whitespace-nowrap">
                <Calendar size={14} />
                {edu.startYear || edu.startDate} – {edu.endYear || edu.endDate || "Present"}
              </div>
            </div>
            {edu.description && (
              <p className="text-[#a1a1aa] text-sm leading-relaxed mt-2">{edu.description}</p>
            )}
            {edu.grade && <p className="text-white font-mono text-sm mt-2">Grade: <span className="text-[var(--primary-color)]">{edu.grade}</span></p>}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    const skillsData = user?.skills;

    // Normalize into { Technical: [...], Strategic: [...] } or other categories
    const categories = {};
    if (skillsData && !Array.isArray(skillsData)) {
      // Object format: { technical: [...], strategic: [...] }
      if (skillsData.technical?.length) categories["Technical"] = skillsData.technical;
      if (skillsData.strategic?.length) categories["Strategic"] = skillsData.strategic;
    } else if (Array.isArray(skillsData)) {
      skillsData.forEach((skill) => {
        const name = typeof skill === "string" ? skill : skill?.name || "";
        const level = typeof skill === "object" ? (skill?.level || skill?.skillLevel) : null;
        const cat = (typeof skill === "object" && skill?.category) || "Technical";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push({ name, level });
      });
    }

    const categoryEntries = Object.entries(categories).filter(([, arr]) => arr?.length > 0);

    if (categoryEntries.length === 0 && !isOwner) return (
      <p className="text-[#a1a1aa] italic">No skills added yet.</p>
    );

    // Deterministic pseudo-random % — unique per skill name, stays consistent
    const getPct = (name, level, idx, catIdx) => {
      if (level && level > 0 && level <= 100) return level;
      const str = typeof name === "string" ? name : "";
      return 70 + ((str.length * 7 + idx * 13 + catIdx * 11) % 25);
    };

    return (
      <div className="space-y-8">
        <h3 className="text-3xl font-bold" style={{ fontFamily: "Orbitron, monospace" }}>
          <span className="text-white">My </span><span className="text-[var(--primary-color)]">Skills</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          {categoryEntries.map(([category, skills], catIdx) => (
            <div
              key={category}
              className="bg-[#111] border border-[#222] p-6 rounded-xl hover:border-[var(--primary-color)]/20 transition-colors"
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary-color)]/70 mb-6">
                {category}
              </h4>
              <div className="space-y-5">
                {skills.map((skill, i) => {
                  const skillName = typeof skill === "string" ? skill : skill?.name || "";
                  const skillLevel = getPct(skillName, skill?.level, i, catIdx);

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-white">{skillName}</span>
                        <span className="text-xs font-mono text-[var(--primary-color)]">{skillLevel}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[#222] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skillLevel}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{
                            background: "linear-gradient(90deg, var(--primary-color), #00ffaa)",
                            boxShadow: "0 0 8px rgba(0,255,204,0.4)"
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="resume" className="py-20 px-6 relative z-10 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, monospace" }}>
            <span className="text-white">My </span><span className="text-[var(--primary-color)]">Resume</span>
          </h2>
          <div className="w-16 h-1 mx-auto mb-4 rounded-full" style={{ background: "linear-gradient(90deg, var(--primary-color), transparent)" }}></div>
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
