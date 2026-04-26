import React from "react";
import { Sparkles, Save, Trash2, Plus, Zap } from "lucide-react";
import toast from "react-hot-toast";
import PersonalInfoForm from "../../../components/forms/PersonalInfoForm";
import ExperienceForm from "../../../components/forms/ExperienceForm";
import EducationForm from "../../../components/forms/EducationForm";
import SkillsForm from "../../../components/forms/SkillsForm";
import ProjectsForm from "../../../components/forms/ProjectsForm";
import CustomSectionsForm from "../../../components/forms/CustomSectionsForm";
import ResumeMatcherView from "../components/ResumeMatcherView";
import ResumeDesignerView from "../components/ResumeDesignerView";
import { useDispatch, useSelector } from "react-redux";
import { setResumeData } from "../../../features/resume/resumeSlice";
import api from "../../../api/axios";
import ResumeAnalyzerView from "../components/ResumeAnalyzerView";


const MiddlePanelEditor = ({ activeSection, activeTab, onSave }) => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);
  
  const isAnalyzer = activeTab === "Analyzer";
  const isContent = activeTab === "Content";
  const isMatcher = activeTab === "Matcher";
  const isDesigner = activeTab === "Designer";
  const [intent, setIntent] = React.useState("");
  const [isExecuting, setIsExecuting] = React.useState(false);

  const handleExecuteAI = async () => {
    if (!intent.trim()) return;
    setIsExecuting(true);
    
    const toastId = toast.loading(`AI is processing: "${intent}"...`);
    try {
      const response = await api.post("/resume-intelligence/optimize-intent", {
        currentResume,
        intent
      });

      if (response.data.success) {
        dispatch(setResumeData(response.data.data));
        toast.success("Resume optimized successfully!", { id: toastId });
        setIntent("");
      }
    } catch (error) {
      console.error("AI Intent Error:", error);
      toast.error(error.response?.data?.message || "AI failed to process intent", { id: toastId });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] relative overflow-hidden">
      {/* Intent Mode Bar (The AI Command Center) */}
      <div className="p-6 pb-0 shrink-0">
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-2 pl-6 flex items-center gap-4 shadow-sm group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Sparkles className="text-primary animate-pulse shrink-0" size={18} />
          <input 
            type="text" 
            placeholder="AI Intent Mode: e.g. 'Optimize my bullets for a Google Frontend role'"
            className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-slate-600 dark:text-slate-300 placeholder:text-slate-400"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleExecuteAI()}
          />
          <button 
            onClick={handleExecuteAI}
            disabled={isExecuting || !intent}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-700 transition-all disabled:opacity-50"
          >
            {isExecuting ? "Executing..." : "Execute AI"}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-6 no-scrollbar pb-24">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {isContent && (
            <>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter capitalize">{activeSection}</h2>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Manage your professional {activeSection}</p>
                </div>
                
                <div className="flex items-center gap-2">
                   <button className="p-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-red-500 transition-all">
                     <Trash2 size={16} />
                   </button>
                    <button 
                      onClick={onSave}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                    >
                      <Save size={14} /> Save Section
                    </button>
                </div>
              </div>

              <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                {activeSection === "personal" && <PersonalInfoForm />}
                {activeSection === "experience" && <ExperienceForm />}
                {activeSection === "education" && <EducationForm />}
                {activeSection === "skills" && <SkillsForm />}
                {activeSection === "projects" && <ProjectsForm />}
                {activeSection === "custom" && <CustomSectionsForm />}
              </div>
              
              {activeSection !== "personal" && (
                <button className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Plus size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add New {activeSection} Entry</span>
                </button>
              )}
            </>
          )}

          {isAnalyzer && (
            <ResumeAnalyzerView resume={currentResume} />
          )}

          {isMatcher && (
            <ResumeMatcherView />
          )}

          {isDesigner && (
            <ResumeDesignerView />
          )}
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
         <div className="bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">ATS Readiness</span>
              <div className="flex items-center gap-3">
                 <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                 </div>
                 <span className="text-xs font-black text-emerald-500 italic">85%</span>
              </div>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800" />
            
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-80 transition-opacity">
              <Sparkles size={14} /> Full AI Scan
            </button>
         </div>
      </div>
    </div>
  );
};

export default MiddlePanelEditor;
