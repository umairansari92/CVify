import React from "react";
import { CheckCircle2, AlertCircle, Info, Target, Zap } from "lucide-react";

const ResumeAnalyzerView = ({ resume }) => {
  // Mock data for now, will integrate with real analysis state later
  const analysis = {
    overallScore: 76,
    issues: [
      { id: 1, type: "error", title: "Missing Quantifiable Results", description: "Your experience bullets lack numbers and percentages.", impact: "High" },
      { id: 2, type: "warning", title: "Soft Skill Overload", description: "Too many soft skills in the Expertise section.", impact: "Medium" },
      { id: 3, type: "info", title: "Strong Action Verbs", description: "Good use of 'Spearheaded' and 'Architected'.", impact: "Low" }
    ],
    metrics: [
      { label: "Resume Structure", score: 85, color: "emerald" },
      { label: "Measurable Results", score: 40, color: "red" },
      { label: "Keyword Usage", score: 65, color: "amber" }
    ]
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Score Header */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-10 flex items-center justify-between shadow-sm overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-4xl font-black tracking-tighter mb-2">Resume Intelligence Audit</h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Real-time AI analysis of your professional narrative</p>
        </div>
        
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
            <circle 
              cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
              strokeDasharray={364} strokeDashoffset={364 - (364 * analysis.overallScore) / 100}
              className="text-primary transition-all duration-1000 ease-out" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black">{analysis.overallScore}%</span>
            <span className="text-[8px] font-bold uppercase opacity-50 tracking-tighter">Match</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analysis.metrics.map((metric) => (
          <div key={metric.label} className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{metric.label}</span>
              <span className={`text-xs font-black text-${metric.color}-500`}>{metric.score}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
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
            className="group bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-primary/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                issue.type === "error" ? "bg-red-50 text-red-500" : 
                issue.type === "warning" ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"
              }`}>
                {issue.type === "error" ? <AlertCircle size={20} /> : 
                 issue.type === "warning" ? <Info size={20} /> : <CheckCircle2 size={20} />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-black text-sm">{issue.title}</h4>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md border ${
                    issue.impact === "High" ? "border-red-200 text-red-600 bg-red-50" : "border-slate-200 text-slate-500 bg-slate-50"
                  }`}>
                    {issue.impact} Impact
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{issue.description}</p>
                
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
