import React, { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Save, Trash2, Plus, Zap } from "lucide-react";
import PersonalInfoForm from "../../../components/forms/PersonalInfoForm";
import ExperienceForm from "../../../components/forms/ExperienceForm";
import EducationForm from "../../../components/forms/EducationForm";
import SkillsForm from "../../../components/forms/SkillsForm";
import ProjectsForm from "../../../components/forms/ProjectsForm";
import CustomSectionsForm from "../../../components/forms/CustomSectionsForm";
import ResumeMatcherView from "../components/ResumeMatcherView";
import ResumeDesignerView from "../components/ResumeDesignerView";
import ResumeAnalyzerView from "../components/ResumeAnalyzerView";

const MobileEditor = ({
  activeSection,
  activeTab,
  onSave,
  currentResume,
  onOpenAIPrompt,
}) => {
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const isContent = activeTab === "Content";
  const isAnalyzer = activeTab === "Analyzer";
  const isMatcher = activeTab === "Matcher";
  const isDesigner = activeTab === "Designer";

  return (
    <div className="flex-1 overflow-y-auto p-3 no-scrollbar pb-28">
      {isContent && (
        <div className="space-y-4">
          {/* Section Header */}
          <div className="flex items-center justify-between bg-bg-secondary p-3 rounded-xl border border-white/5">
            <div>
              <h2 className="text-base font-black text-white capitalize">{activeSection}</h2>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                Edit {activeSection} Details
              </p>
            </div>
            <button
              onClick={() => onSave()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm"
            >
              <Save size={12} /> Save
            </button>
          </div>

          {/* Form Container */}
          <div className="bg-bg-secondary border border-white/5 rounded-2xl p-4 shadow-sm space-y-4">
            {activeSection === "personal" && <PersonalInfoForm />}
            {activeSection === "experience" && <ExperienceForm />}
            {activeSection === "education" && <EducationForm />}
            {activeSection === "skills" && <SkillsForm />}
            {activeSection === "projects" && <ProjectsForm />}
            {activeSection === "custom" && <CustomSectionsForm />}

            {/* Contextual Inline AI Assist Bar */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 shrink-0">
                Context AI:
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onOpenAIPrompt("Improve grammar & conciseness for active section")}
                  className="px-2.5 py-1 bg-slate-900 border border-primary/20 text-primary rounded-lg text-[9px] font-black uppercase flex items-center gap-1 hover:bg-slate-800"
                >
                  <Sparkles size={10} /> AI Improve
                </button>
                <button
                  onClick={() => onOpenAIPrompt("Rewrite summary in executive tone")}
                  className="px-2.5 py-1 bg-slate-900 border border-white/10 text-slate-300 rounded-lg text-[9px] font-black uppercase hover:text-white"
                >
                  Executive Tone
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Progressive Disclosure: Advanced Metrics & ATS Impact Collapsible Accordion */}
          <div className="bg-slate-900/60 border border-white/5 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
              className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-black text-slate-300 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Zap size={14} className="text-primary" />
                <span>Advanced Metrics & ATS Readiness</span>
              </span>
              {showAdvancedMetrics ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showAdvancedMetrics && (
              <div className="p-4 border-t border-white/5 space-y-3 bg-bg-secondary/40 animate-fadeIn">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <span>ATS Score Readiness</span>
                  <span className="text-emerald-400 font-bold">85% Match</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-emerald-500" />
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  • 0 formatting errors detected <br />
                  • Action verbs coverage: 92% <br />
                  • Character density optimal for single-page layout
                </p>
              </div>
            )}
          </div>

          {activeSection !== "personal" && (
            <button className="w-full py-4 border border-dashed border-white/10 rounded-xl flex items-center justify-center gap-2 text-slate-400 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all">
              <Plus size={14} />
              <span className="text-[9px] font-black uppercase tracking-wider">
                Add Entry
              </span>
            </button>
          )}
        </div>
      )}

      {isAnalyzer && <ResumeAnalyzerView resume={currentResume} />}
      {isMatcher && <ResumeMatcherView />}
      {isDesigner && <ResumeDesignerView />}
    </div>
  );
};

export default MobileEditor;
