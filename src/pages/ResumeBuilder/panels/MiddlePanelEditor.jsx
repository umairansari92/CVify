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
import { setResumeData, setParsingAnalysis } from "../../../features/resume/resumeSlice";
import { updateDiamonds } from "../../../features/auth/authSlice";
import api from "../../../api/axios";
import ResumeAnalyzerView from "../components/ResumeAnalyzerView";


const MiddlePanelEditor = ({ activeSection, activeTab, onSave }) => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);
  const { user } = useSelector((state) => state.auth);
  
  const isAnalyzer = activeTab === "Analyzer";
  const isContent = activeTab === "Content";
  const isMatcher = activeTab === "Matcher";
  const isDesigner = activeTab === "Designer";
  const [intent, setIntent] = React.useState("");
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [isScanning, setIsScanning] = React.useState(false);

  const handleExecuteAI = async () => {
    if (!intent.trim()) return;
    
    // Client-side cost protection check (30 diamonds fee)
    const COST = 30;
    if ((user?.diamonds || 0) < COST) {
      toast.error(`Insufficient Diamonds! You need ${COST} 💎 for AI optimization. Current balance: ${user?.diamonds || 0}`);
      return;
    }

    setIsExecuting(true);
    const toastId = toast.loading(`AI is processing: "${intent}"...`);
    try {
      const response = await api.post("/resume-intelligence/optimize-intent", {
        currentResume,
        intent
      });

      if (response.data.success) {
        dispatch(setResumeData(response.data.data));
        
        // Sync diamonds in HUD
        if (response.data.newDiamondBalance !== undefined) {
          dispatch(updateDiamonds(response.data.newDiamondBalance));
        }

        toast.success(response.data.message || "Resume optimized successfully!", { id: toastId });
        setIntent("");
      }
    } catch (error) {
      console.error("AI Intent Error:", error);
      toast.error(error.response?.data?.message || "AI failed to process intent", { id: toastId });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleFullAIScan = async () => {
    if (!currentResume?._id) {
      toast.error("Save your resume first to run a deep AI scan.");
      return;
    }
    // Client-side cost protection check
    const COST = 30;
    if ((user?.diamonds || 0) < COST) {
      toast.error(`Insufficient Diamonds! You need ${COST} 💎 for a Full AI Scan. Current balance: ${user?.diamonds || 0}`);
      return;
    }
    setIsScanning(true);
    const toastId = toast.loading("Running deep AI analysis...");
    try {
      const response = await api.post("/resume-intelligence/analyze-impact", {
        resumeId: currentResume._id,
      });
      if (response.data.success) {
        // Sync diamonds in HUD
        if (response.data.newDiamondBalance !== undefined) {
          dispatch(updateDiamonds(response.data.newDiamondBalance));
        }
        // Sync parsingAnalysis in Redux store
        dispatch(setParsingAnalysis({
          scores: {
            completeness: 90, // reasonable placeholder for parsing completion
            quantification: response.data.impactScore,
            impact: response.data.impactScore,
          }
        }));
        toast.success(`AI Scan complete! Impact Score: ${response.data.impactScore}%`, { id: toastId });
      } else {
        toast.error(response.data.message || "Scan failed", { id: toastId });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "AI scan failed", { id: toastId });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-primary relative overflow-hidden">
      {/* Intent Mode Bar (The AI Command Center) */}
      <div className="px-3 sm:px-8 pt-3 sm:pt-8 pb-2 shrink-0">
        <div className="bg-bg-secondary border border-white/5 rounded-[1.25rem] p-2 sm:p-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 shadow-sm group focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-500">
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 flex-1">
            <Sparkles className="text-primary animate-pulse shrink-0" size={16} />
            <input 
              type="text" 
              placeholder="What should AI do? e.g. 'Rewrite summary to sound executive'"
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-300 placeholder:text-slate-500 py-1"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleExecuteAI()}
            />
          </div>
          <button 
            onClick={handleExecuteAI}
            disabled={isExecuting || !intent}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-white rounded-[1rem] text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 shrink-0"
          >
            {isExecuting ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Zap size={12} className="text-white" />
                <span>Execute AI (30 💎)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 no-scrollbar pb-28 sm:pb-24">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          
          {isContent && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tighter capitalize text-white">{activeSection}</h2>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 sm:mt-1">Manage your professional {activeSection}</p>
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
                   <button className="p-2.5 sm:p-3 bg-bg-secondary border border-white/5 rounded-xl text-slate-400 hover:text-red-500 transition-all">
                     <Trash2 size={16} />
                   </button>
                    <button 
                      onClick={() => onSave()}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                    >
                      <Save size={14} /> Save Section
                    </button>
                </div>
              </div>

              <div className="bg-bg-secondary border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
                {activeSection === "personal" && <PersonalInfoForm />}
                {activeSection === "experience" && <ExperienceForm />}
                {activeSection === "education" && <EducationForm />}
                {activeSection === "skills" && <SkillsForm />}
                {activeSection === "projects" && <ProjectsForm />}
                {activeSection === "custom" && <CustomSectionsForm />}
              </div>
              
              {activeSection !== "personal" && (
                <button className="w-full py-8 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
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
         <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">ATS Readiness</span>
              <div className="flex items-center gap-3">
                 <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                 </div>
                 <span className="text-xs font-black text-emerald-500 italic">85%</span>
              </div>
            </div>
            
            <div className="h-8 w-[1px] border-r border-white/5" />
            
            <button
              onClick={handleFullAIScan}
              disabled={isScanning}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              {isScanning ? (
                <><div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> Scanning...</>
              ) : (
                <><Sparkles size={14} /> Full AI Scan (30 💎)</>
              )}
            </button>
         </div>
      </div>
    </div>
  );
};

export default MiddlePanelEditor;
