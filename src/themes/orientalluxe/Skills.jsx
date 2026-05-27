import React, { useMemo } from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Skills = ({ user, isOwner, handleLiveUpdate }) => {
  const normalizedData = useMemo(() => {
    let tech = [];
    let strat = [];

    if (user.skills && !Array.isArray(user.skills)) {
      tech = user.skills.technical || [];
      strat = user.skills.strategic || [];
    } else if (Array.isArray(user.skills)) {
      user.skills.forEach((skill) => {
        const name = typeof skill === "string" ? skill : skill.name || "";
        const category = skill.category?.toLowerCase() || "";
        if (category === "strategic" || category === "soft skills" || category === "administrative") {
          strat.push(name);
        } else {
          tech.push(name);
        }
      });
    }

    return { tech, strat };
  }, [user.skills]);

  return (
    <section 
      id="skills" 
      className="py-24 border-b border-[#1a1a1a]"
      style={{ fontFamily: tokens.fonts.primary }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-left mb-16 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b58953]">TOOLKIT & ECOSYSTEM</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-4">
            <span className="h-8 w-1 rounded-full bg-[#b58953]" /> SKILLS & SERVICES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Tech */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#b58953] opacity-60">TECHNICAL SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              {normalizedData.tech.map((skill, i) => (
                <span key={i} className="text-xs font-semibold px-4 py-2 bg-[#121212] border border-[#1a1a1a] rounded-lg text-white">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Strategic */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#b58953] opacity-60">STRATEGIC MINDSET</h3>
            <div className="flex flex-wrap gap-2">
              {normalizedData.strat.map((skill, i) => (
                <span key={i} className="text-xs font-semibold px-4 py-2 bg-[#121212] border border-[#1a1a1a] rounded-lg text-[#b58953]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#b58953] opacity-60">SERVICES OFFERING</h3>
            {(user.services || []).slice(0, 2).map((srv, i) => (
              <div key={i} className="p-6 bg-[#121212] border border-[#1a1a1a] rounded-xl space-y-2">
                <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">{srv.title}</h4>
                <p className="text-xs text-[#a3a3a3] leading-relaxed font-light">{srv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
