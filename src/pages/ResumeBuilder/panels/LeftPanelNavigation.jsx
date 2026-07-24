import React from "react";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Layers, 
  Globe, 
  Target 
} from "lucide-react";

const LeftPanelNavigation = ({ activeSection, setActiveSection, setActiveTab }) => {
  const sections = [
    { id: "personal", label: "Identity", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Expertise", icon: Code },
    { id: "projects", label: "Projects", icon: Layers },
    { id: "custom", label: "Extras", icon: Globe },
  ];

  return (
    <aside className="w-full md:w-[240px] border-b md:border-b-0 md:border-r border-white/5 bg-bg-secondary flex flex-row md:flex-col shrink-0 overflow-x-auto md:overflow-y-auto no-scrollbar p-2 md:p-6 gap-2 md:gap-0">
      <h3 className="hidden md:block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Resume Sections</h3>
      
      <div className="flex flex-row md:flex-col gap-1.5 md:space-y-1 w-full md:w-auto shrink-0">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap shrink-0 group ${
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                  : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <Icon size={16} className={isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300 transition-colors"} />
              <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-widest ${isActive ? "opacity-100" : "opacity-60"}`}>
                {section.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      <div className="hidden md:block mt-12 pt-12 border-t border-white/5">
         <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Target size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Job Matcher</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Paste a job link to optimize your resume with AI.
              </p>
              <button 
                onClick={() => setActiveTab("Matcher")}
                className="mt-4 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
              >
                Analyze JD
              </button>
            </div>
         </div>
      </div>
    </aside>
  );
};

export default LeftPanelNavigation;
