import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Target, Sparkles, CheckCircle2, AlertCircle, Briefcase, ChevronRight } from "lucide-react";
import Card from "../components/ui/Card";
import { updateDiamonds } from "../features/auth/authSlice";
import api from "../api/axios";

const JobMatcher = () => {
  const dispatch = useDispatch();
  const [jdText, setJdText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  // Try to find a resume in redux or prompt user
  const { currentResume, resumes } = useSelector((state) => state.resume);
  const activeResume = currentResume || (resumes && resumes[0]);

  const handleAnalyze = async () => {
    if (!jdText.trim()) return toast.error("Please paste a Job Description first!");
    if (!activeResume?._id) return toast.error("Please create and save a resume first in the Resume Builder!");

    setIsAnalyzing(true);
    const toastId = toast.loading("AI is analyzing your match...");

    try {
      const response = await api.post("/resume-intelligence/job-match", {
        resumeId: activeResume._id,
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
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">CVify</span>
            <ChevronRight size={10} className="text-slate-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Match Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white">Job Matcher</h1>
          <p className="text-sm font-semibold text-slate-400 mt-1">
            Optimize your CV matching compatibility for target descriptions
          </p>
        </div>

        {activeResume && (
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-3">
            <Briefcase size={14} className="text-primary" />
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Comparing With</span>
              <span className="text-xs font-bold text-white mt-1">{activeResume.title || "Untitled Resume"}</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form */}
        <div className="lg:col-span-7 space-y-6">
          <Card variant="glass" className="p-8 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Target size={120} className="text-white" />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Target size={18} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Paste Job Description</h3>
            </div>

            <textarea
              className="w-full h-80 bg-slate-900/60 border border-white/5 rounded-2xl p-6 text-sm text-slate-300 placeholder:text-slate-500 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none font-medium"
              placeholder="Paste the job title and requirements from LinkedIn, Indeed, etc..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />

            {!activeResume && (
              <div className="mt-4 p-4 rounded-xl bg-danger/10 text-danger border border-danger/20 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={16} />
                No active resume found. Please create or open a resume in the builder first.
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jdText || !activeResume?._id}
              className="mt-6 w-full py-4.5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-glow-primary hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:scale-100"
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
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          {matchResult ? (
            <div className="space-y-6 animate-slideUp">
              {/* Match Score Card */}
              <Card variant="glass" className="p-8 border border-white/10 text-center flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                <div className="relative mb-6">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * matchResult.score) / 100} className="text-primary transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white">{matchResult.score}%</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Match</span>
                  </div>
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white">Initial Match Score</h4>
              </Card>

              {/* Missing Keywords */}
              <Card variant="glass" className="p-8 border border-white/10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                  <AlertCircle size={14} className="text-amber-500" /> Missing Keywords
                </h4>
                {matchResult.missingKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-500/10">
                        + {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 size={14} /> Outstanding! All critical keywords detected.
                  </p>
                )}
              </Card>

              {/* Recommendations */}
              <Card variant="glass" className="p-8 border border-white/10 bg-slate-900/40">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                  <Sparkles size={14} /> Optimization Strategy
                </h4>
                <div className="space-y-4">
                  {matchResult.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all">
                      <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={12} />
                      </div>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card variant="glass" className="p-12 border border-white/10 text-center flex flex-col items-center justify-center text-slate-500 min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-slate-900/50 border border-white/5 flex items-center justify-center text-slate-400 mb-6">
                <Target size={24} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2">No Match Data</h4>
              <p className="text-xs text-slate-400 max-w-[280px] leading-relaxed mx-auto">
                Paste a Job Description and run the analysis to calculate your resume alignment.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobMatcher;
