import React, { useState } from "react";
import { Target, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateDiamonds } from "../../../features/auth/authSlice";
import api from "../../../api/axios";

const ResumeMatcherView = () => {
  const dispatch = useDispatch();
  const [jdText, setJdText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  
  const { currentResume } = useSelector((state) => state.resume);

  const handleAnalyze = async () => {
    if (!jdText.trim()) return toast.error("Please paste a Job Description first!");
    if (!currentResume?._id) return toast.error("Please save your resume first!");
    
    setIsAnalyzing(true);
    const toastId = toast.loading("AI is analyzing your match...");
    
    try {
      const response = await api.post("/resume-intelligence/job-match", {
        resumeId: currentResume._id,
        jobDescription: jdText,
        marketMode: "Standard",
        experienceLevel: "Mid-Level"
      });

      if (response.data.success) {
        const { scan, newDiamondBalance } = response.data;
        
        setMatchResult({
          score: scan.overallScore,
          missingKeywords: scan.feedback.missingKeywords,
          recommendations: scan.feedback.hints
        });

        // Sync diamonds in HUD
        if (newDiamondBalance !== undefined) {
          dispatch(updateDiamonds(newDiamondBalance));
        }

        toast.success(scan.isFreeRescan ? "Match Analysis Refreshed (Free)!" : "Analysis Complete (-50 💎)!", { id: toastId });
      }
    } catch (error) {
      console.error("Match Analysis Error:", error);
      toast.error(error.response?.data?.message || "Failed to analyze match", { id: toastId });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tighter capitalize text-slate-900 dark:text-white">Job Matcher</h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Optimize your resume for a specific role</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Target size={18} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Paste Job Description</h3>
        </div>

        <textarea 
          className="w-full h-64 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none font-medium"
          placeholder="Paste the job title and requirements from LinkedIn, Indeed, etc..."
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
        />

        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !jdText}
          className="mt-6 w-full py-5 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:bg-black dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Analyzing Match...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Analyze Job Match (50 💎)
            </>
          )}
        </button>
      </div>

      {matchResult && (
        <div className="space-y-6 animate-slideUp">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                 <div className="relative mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * matchResult.score) / 100} className="text-primary" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-3xl font-black text-slate-900 dark:text-white">{matchResult.score}%</span>
                       <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Match</span>
                    </div>
                 </div>
                 <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Initial Match Score</h4>
              </div>

              <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                    <AlertCircle size={14} className="text-amber-500" /> Missing Keywords
                 </h4>
                 <div className="flex flex-wrap gap-2">
                    {matchResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-4 py-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-amber-500/10">
                        + {kw}
                      </span>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 dark:bg-[#020617] rounded-3xl p-8 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Target size={120} className="text-white" />
              </div>
              <div className="relative z-10">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                    <Sparkles size={14} /> Optimization Strategy
                 </h4>
                 <div className="space-y-4">
                    {matchResult.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all">
                         <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                            <CheckCircle2 size={12} />
                         </div>
                         <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{rec}</p>
                      </div>
                    ))}
                 </div>
            </div>
         </div>
       )}
    </div>
  );
};

export default ResumeMatcherView;
