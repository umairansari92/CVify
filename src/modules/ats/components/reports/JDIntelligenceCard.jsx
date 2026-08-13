import React from "react";
import { Briefcase, Layers, Cpu, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

const JDIntelligenceCard = ({ targetRole = "Full Stack Engineer", experienceLevel = "Mid-Level", marketMode = "Standard", foundKeywords = [], missingKeywords = [] }) => {
  // Infer domain and complexity based on targetRole and experience level
  const totalKeywords = foundKeywords.length + missingKeywords.length;
  const complexityLevel =
    experienceLevel === "Executive" ? "Executive / Director (Architectural)" :
    experienceLevel === "Senior" ? "Senior / Staff (High Precision)" :
    experienceLevel === "Junior" || experienceLevel === "Entry-Level" ? "Entry-Level / Foundation" :
    "Mid-Level Engineer (Full Stack)";

  const atsDifficulty =
    marketMode === "US Remote" ? "Extreme (High Competition & Strict Quantification)" :
    marketMode === "European Union" ? "Strict (GDPR Clean Structure & No Tables)" :
    marketMode === "MENA / Gulf" ? "High (Direct Keyword Density & Domain Verification)" :
    "Standard (Workday / Greenhouse Benchmark)";

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Briefcase className="w-4 h-4" />
            TARGET JOB DESCRIPTION INTELLIGENCE
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Role Complexity & Hiring Benchmark
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Reverse-engineered job requirements, difficulty score, and hiring manager expectation parameters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] block">Seniority & Complexity</span>
          <div className="text-sm font-black text-emerald-400">{complexityLevel}</div>
          <p className="text-[11px] text-slate-400">Calibrated for {experienceLevel} expectations.</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] block">ATS Screening Difficulty</span>
          <div className="text-sm font-black text-amber-400">{atsDifficulty}</div>
          <p className="text-[11px] text-slate-400">Market Mode: {marketMode}.</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] block">Total Key Competencies</span>
          <div className="text-sm font-black text-teal-400">{totalKeywords || 14} Skills Mapped</div>
          <p className="text-[11px] text-slate-400">{foundKeywords.length} present in resume.</p>
        </div>
      </div>

      {/* Required vs Optional Skill Classification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="font-bold text-slate-200 block text-xs uppercase tracking-wider">
            ⚡ Core Must-Have Skills
          </span>
          <p className="text-slate-400 text-[11px]">
            Primary technical prerequisites that directly drive initial recruiter shortlisting:
          </p>
          <div className="flex flex-wrap gap-2">
            {[...foundKeywords.slice(0, 5), ...missingKeywords.slice(0, 3)].map((skill, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold">
                {typeof skill === "string" ? skill : skill?.keyword || skill?.name || "Skill"}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="font-bold text-slate-200 block text-xs uppercase tracking-wider">
            🎯 Strategic Differentiators (X-Factor)
          </span>
          <p className="text-slate-400 text-[11px]">
            Skills that elevate your profile from 'Eligible' to 'Top 5% Candidate':
          </p>
          <div className="space-y-1.5 text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Measurable KPIs & System Scale metrics (e.g. latency, user volume)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct GitHub repo proof links & live production deployments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Modern Cloud / DevOps CI/CD integration mentions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(JDIntelligenceCard);
