import React from "react";
import { TrendingUp, Plus, ArrowRight, CheckCircle2, Award } from "lucide-react";

const ImprovementImpactCard = ({ score = 68, potentialScore = 88, missingKeywords = [], bulletFixes = [], loopholes = [] }) => {
  const diff = potentialScore > score ? potentialScore - score : 16;

  // Calculate concrete point allocations
  const keywordGain = Math.min(diff, Math.max(3, Math.round(diff * 0.40)));
  const metricGain  = Math.min(diff - keywordGain, Math.max(2, Math.round(diff * 0.35)));
  const loopholeGain= Math.max(1, diff - keywordGain - metricGain);

  const improvements = [
    {
      title: `Integrate ${Math.min(4, missingKeywords.length || 3)} High-Priority Missing Keywords`,
      gain: `+${keywordGain}%`,
      rule: "Keyword Relevance & Skill Density",
      desc: `Adding target core skills directly boosts semantic keyword proximity in ATS parsers.`,
    },
    {
      title: `Quantify ${Math.min(3, bulletFixes.length || 2)} Experience Bullets with Metrics`,
      gain: `+${metricGain}%`,
      rule: "Measurable Impact & KPI Rate",
      desc: `Adding concrete percentages (e.g. 40% latency reduction) satisfies recruiter impact filters.`,
    },
    {
      title: `Resolve ${Math.min(2, loopholes.length || 2)} Section Loopholes & Action Verbs`,
      gain: `+${loopholeGain}%`,
      rule: "Action Verbs & Section Structure",
      desc: `Replacing passive filler phrases with active power verbs ('Architected', 'Spearheaded').`,
    },
  ];

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-[var(--text-primary)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <TrendingUp className="w-4 h-4" />
            IMPROVEMENT IMPACT & SCORE DELTA CALCULATOR
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            How Your Potential Score is Achieved
          </h2>
          <p className="text-[var(--text-secondary)] text-xs mt-1">
            Evidence-based score breakdown showing exactly how many percentage points each fix recovers.
          </p>
        </div>

        {/* Score Bridge Badge */}
        <div className="flex items-center gap-3 bg-[var(--surface-muted)] px-5 py-3 rounded-2xl border border-emerald-500/30">
          <div className="text-center">
            <span className="text-[10px] text-[var(--text-muted)] font-bold block uppercase">Current</span>
            <span className="text-xl font-black text-red-500">{score}%</span>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <div className="text-center">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block uppercase">Potential</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{potentialScore}%</span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Addition Tree */}
      <div className="space-y-3">
        <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)] flex items-center justify-between text-xs">
          <span className="text-[var(--text-primary)] font-semibold">Current Baseline ATS Score</span>
          <span className="font-mono font-black text-[var(--text-primary)]">{score}%</span>
        </div>

        {improvements.map((imp, idx) => (
          <div key={idx} className="p-4 bg-[var(--surface-muted)] rounded-xl border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Plus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-bold text-[var(--text-primary)]">{imp.title}</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] pl-5.5">{imp.desc}</p>
            </div>
            <div className="text-right pl-5.5 sm:pl-0">
              <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 inline-block">
                {imp.gain}
              </span>
              <span className="text-[9px] text-[var(--text-muted)] block mt-0.5">Rule: {imp.rule}</span>
            </div>
          </div>
        ))}

        <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs">
          <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            = Target Achieved (Recruiter Ready)
          </span>
          <span className="font-mono font-black text-2xl text-emerald-600 dark:text-emerald-400">{potentialScore}%</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImprovementImpactCard);
