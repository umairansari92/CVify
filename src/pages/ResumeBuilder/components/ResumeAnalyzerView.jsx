import React from "react";
import { CheckCircle2, AlertCircle, Info, Target, Zap } from "lucide-react";
import { useSelector } from "react-redux";

const ResumeAnalyzerView = ({ resume }) => {
  const { parsingAnalysis } = useSelector((state) => state.resume);
  
  // Rule-based feedback mapping
  const getIssues = () => {
    if (!parsingAnalysis) return [];
    
    const issues = [];
    if (parsingAnalysis.scores.quantification < 40) {
      issues.push({ id: 1, type: "error", title: "Missing Quantifiable Results", description: "Only " + (parsingAnalysis.stats?.quantifiedBullets || 0) + " of your bullets have numbers. Recruiters love percentages!", impact: "High" });
    }
    if (parsingAnalysis.scores.impact < 50) {
      issues.push({ id: 2, type: "warning", title: "Weak Action Verbs", description: "Your experience bullets could use more powerful verbs like 'Architected' or 'Optimized'.", impact: "Medium" });
    }
    if (parsingAnalysis.scores.completeness < 80) {
      issues.push({ id: 3, type: "info", title: "Incomplete Profile", description: "Some sections of your profile are still thin. Add more details to reach 100%.", impact: "Low" });
    }
    return issues;
  };

  const analysis = {
    overallScore: parsingAnalysis?.scores?.completeness || 0,
    issues: getIssues(),
    metrics: [
      { label: "Resume Structure", score: parsingAnalysis?.scores?.completeness || 0, color: "emerald" },
      { label: "Measurable Results", score: parsingAnalysis?.scores?.quantification || 0, color: "red" },
      { label: "Keyword Usage", score: parsingAnalysis?.scores?.impact || 0, color: "amber" }
    ]
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Score Header */}
      <div className="bg-bg-secondary border border-white/5 rounded-3xl p-10 flex items-center justify-between shadow-sm overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-4xl font-black tracking-tighter mb-2 text-white">Resume Intelligence Audit</h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Real-time AI analysis of your professional narrative</p>
        </div>
        
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
            <circle 
              cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
              strokeDasharray={364} strokeDashoffset={364 - (364 * analysis.overallScore) / 100}
              className="text-primary transition-all duration-1000 ease-out" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-white">{analysis.overallScore}%</span>
            <span className="text-[8px] font-bold uppercase text-slate-400 tracking-tighter">Match</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analysis.metrics.map((metric) => (
          <div key={metric.label} className="bg-bg-secondary border border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{metric.label}</span>
              <span className={`text-xs font-black text-${metric.color}-500`}>{metric.score}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${metric.color}-500 transition-all duration-1000`} 
                style={{ width: `${metric.score}%` }} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Critical Improvements</h3>
        
        {analysis.issues.map((issue) => (
          <div 
            key={issue.id} 
            className="group bg-bg-secondary border border-white/5 rounded-2xl p-6 shadow-sm hover:border-primary/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                issue.type === "error" ? "bg-red-500/10 text-red-400" : 
                issue.type === "warning" ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"
              }`}>
                {issue.type === "error" ? <AlertCircle size={20} /> : 
                 issue.type === "warning" ? <Info size={20} /> : <CheckCircle2 size={20} />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-black text-sm text-white">{issue.title}</h4>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md border ${
                    issue.impact === "High" ? "border-red-500/20 text-red-400 bg-red-500/10" : "border-slate-800 text-slate-400 bg-slate-900"
                  }`}>
                    {issue.impact} Impact
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{issue.description}</p>
                
                <button className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                   <Zap size={12} /> Optimize This Section
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeAnalyzerView;
