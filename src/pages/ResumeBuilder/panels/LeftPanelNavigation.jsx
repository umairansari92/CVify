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

const LeftPanelNavigation = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: "personal", label: "Identity", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Expertise", icon: Code },
    { id: "projects", label: "Projects", icon: Layers },
    { id: "custom", label: "Extras", icon: Globe },
  ];

  return (
    <aside className="w-[240px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] flex flex-col shrink-0 overflow-y-auto no-scrollbar">
      <div className="p-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Resume Sections</h3>
        
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <Icon size={18} className={isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600 transition-colors"} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${isActive ? "opacity-100" : "opacity-60"}`}>
                  {section.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-800">
           <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Target size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Job Matcher</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                  Paste a job link to optimize your resume with AI.
                </p>
                <button className="mt-4 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                  Analyze JD
                </button>
              </div>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftPanelNavigation;
