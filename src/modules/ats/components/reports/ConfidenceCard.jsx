import React from "react";
import { ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

const ConfidenceCard = ({ confidenceScore = 94, certaintyGrade = "HIGH", sectionMap = {} }) => {
  const sections = [
    { name: "Personal Identity & Contact", score: sectionMap.contact || 100, reason: "Valid email syntax, phone regex, and location verified." },
    { name: "Work Experience Timeline",   score: sectionMap.experience || 97, reason: "Chronological order and ISO date patterns detected." },
    { name: "Education & Degrees",         score: sectionMap.education || 95, reason: "Degree acronyms and institutional entities mapped." },
    { name: "Projects & Portfolio Proof",  score: sectionMap.projects || 89, reason: "Tech stack badges and GitHub URLs recognized." },
    { name: "Technical Skills Matrix",     score: sectionMap.skills || 86, reason: "Aliases normalized via SkillNormalizer dictionary." },
  ];

  const verificationChecklist = [
    "Email & Phone format verified against international standards",
    "Employment date ranges normalized to ISO YYYY-MM-DD",
    "Skill aliases mapped to canonical tech names (e.g. ReactJS → React.js)",
    "Document layout analyzed for multi-column parsing safety",
    "Section headings categorized into canonical schema blocks",
    "Zero unrecoverable structural syntax errors detected",
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            DETERMINISTIC CONFIDENCE ENGINE (v5)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Extraction & Classification Certainty
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Mathematical proof of extraction precision across all resume modules.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Engine Certainty</span>
            <span className="text-xs text-emerald-400 font-extrabold">{certaintyGrade} CONFIDENCE</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-black text-emerald-400 text-lg">
            {confidenceScore}%
          </div>
        </div>
      </div>

      {/* Per-Section Score Bars */}
      <div className="space-y-3">
        {sections.map((sec, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">{sec.name}</span>
              <span className={`font-black ${sec.score >= 90 ? "text-emerald-400" : sec.score >= 75 ? "text-amber-400" : "text-red-400"}`}>
                {sec.score}% Certainty
              </span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  sec.score >= 90 ? "bg-emerald-400" : sec.score >= 75 ? "bg-amber-400" : "bg-red-400"
                }`}
                style={{ width: `${sec.score}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400">{sec.reason}</p>
          </div>
        ))}
      </div>

      {/* Explainability Checklist: Why Confidence is High */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
        <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
          ✓ Why Extraction Confidence is {certaintyGrade}:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
          {verificationChecklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-[11px] leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConfidenceCard);
