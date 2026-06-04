import React from "react";
import { tokens } from "./tokens";
import { Award } from "lucide-react";

// In the Aura Dark theme, Experience is styled identically to Education (Timeline style)
// So we just re-use the exact same timeline logic for the Experience prop.
const Experience = ({ user }) => {
  if (!user || !user.experience || user.experience.length === 0) return null;

  return (
    <section className="bg-background pb-16" style={{ backgroundColor: tokens.colors.background }}>
      <div className="max-w-[1700px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
          
          {/* Empty Left Column to align with About */}
          <div className="hidden lg:block lg:col-span-6" />

          {/* Right Column: Experience Timeline */}
          <div className="lg:col-span-6">
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
                      className="text-sm max-w-md leading-relaxed"
                      style={{ color: tokens.colors.textDim }}
                    >
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
