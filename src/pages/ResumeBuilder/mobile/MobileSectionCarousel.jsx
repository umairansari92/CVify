import React from "react";
import { User, Briefcase, GraduationCap, Code, Layers, Globe } from "lucide-react";

const MobileSectionCarousel = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: "personal", label: "Identity", icon: User, badge: "✓" },
    { id: "experience", label: "Experience", icon: Briefcase, badge: "3" },
    { id: "education", label: "Education", icon: GraduationCap, badge: "1" },
    { id: "skills", label: "Expertise", icon: Code, badge: "85%" },
    { id: "projects", label: "Projects", icon: Layers, badge: "2" },
    { id: "custom", label: "Extras", icon: Globe, badge: "+" },
  ];

  return (
    <div className="sticky top-0 z-20 bg-bg-secondary/95 backdrop-blur-md border-b border-white/5 py-2 px-3 overflow-x-auto no-scrollbar shrink-0">
      <div className="flex items-center gap-1.5 min-w-max">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                  : "bg-slate-900/80 text-slate-400 border border-white/5 hover:text-slate-200"
              }`}
            >
              <Icon size={12} className={isActive ? "text-white" : "text-slate-500"} />
              <span>{section.label}</span>
              {section.badge && (
                <span
                  className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {section.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSectionCarousel;
