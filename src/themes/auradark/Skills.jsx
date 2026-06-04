import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { Plus, ArrowUpRight } from "lucide-react";

const Skills = ({ user }) => {
  if (!user || !user.skills) return null;

  // Extract skills (handling different data structures)
  const techSkills = Array.isArray(user.skills) 
    ? user.skills 
    : (user.skills?.technical || []);
  
  const softSkills = user.skills?.soft || [];

  const allSkills = [...techSkills, ...softSkills].map(s => typeof s === 'string' ? s : s.name).filter(Boolean);
  
  // Just take the first few for the "Services" list
  const topSkills = allSkills.slice(0, 4);
  if (topSkills.length === 0) topSkills.push("FRONTEND DEVELOPMENT", "BACKEND ARCHITECTURE", "INTERACTIVE UI", "DATABASE DESIGN");

  // For the marquee, we want a long list to scroll
  const marqueeItems = [...allSkills, "REACT", "NODE.JS", "MONGODB", "EXPRESS"].slice(0, 8);

  return (
    <section 
      id="services" 
      className="pt-32 pb-16 cursor-default border-t"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderDim }}
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        
        {/* Accordion List */}
        <div className="flex flex-col border-t" style={{ borderColor: tokens.colors.borderDim }}>
          {topSkills.map((skill, idx) => (
            <div 
              key={idx} 
              className="group border-b overflow-hidden cursor-pointer"
              style={{ borderColor: tokens.colors.borderDim }}
            >
              <div className="py-10 md:py-14 flex items-center justify-between transition-all duration-700">
                <div className="flex items-center gap-12">
                  <span 
                    className="font-mono text-xs tracking-widest"
                    style={{ color: tokens.colors.primary }}
                  >
                    0{idx + 1}
                  </span>
                  <h3 
                    className="text-3xl md:text-5xl lg:text-[3.5vw] font-black uppercase tracking-tighter transition-colors duration-500"
                    style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground }}
                  >
                    {skill}
                  </h3>
                </div>
                <div className="flex items-center gap-6">
                  <div 
                    className="hidden md:flex w-16 h-16 rounded-full border items-center justify-center transition-all duration-700"
                    style={{ borderColor: tokens.colors.borderDim, color: tokens.colors.textFaint }}
                  >
                    <ArrowUpRight className="w-8 h-8" />
                  </div>
                  <div className="flex items-center gap-2" style={{ color: tokens.colors.textFaint }}>
                    <Plus />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Marquee */}
        <div className="mt-12 overflow-hidden py-12 border-b whitespace-nowrap relative" style={{ borderColor: tokens.colors.borderDim }}>
          
          {/* Custom inline style for the marquee animation since we can't guarantee tailwind config has it */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 20s linear infinite;
              display: inline-flex;
              white-space: nowrap;
            }
          `}} />

          <div className="animate-marquee flex gap-16">
            {/* Double the array for seamless infinite loop */}
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.colors.primary }} />
                <span 
                  className="font-mono text-[15px] tracking-[0.4em] uppercase"
                  style={{ color: tokens.colors.textDim }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
