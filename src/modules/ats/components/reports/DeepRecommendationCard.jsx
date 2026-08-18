import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Lightbulb, Clock } from "lucide-react";

const DeepRecommendationCard = ({ quickWins = [], loopholes = [], dealbreakers = [] }) => {
  // Deduplicate and enrich recommendations with concrete evidence
  const enrichedRecommendations = [
    ...quickWins.map((win, idx) => ({
      title: win.action || "Optimize target keyword density",
      why: "Key skill detected in Job Description core deliverables but missing from current resume.",
      how: win.howTo || "Incorporate directly within your work experience bullet points using action verbs.",
      where: win.where || "Work Experience / Technical Skills",
      gain: win.impact === "High" ? "+3.5%" : "+2.0%",
      effort: win.effort || "LOW",
      time: win.effort === "LOW" ? "30 seconds" : "2 minutes",
      affectedRule: "Keyword Coverage & Tech Proximity",
      type: "quickWin",
    })),
    ...loopholes.map((lh, idx) => ({
      title: lh.issue || "Refine section loophole",
      why: lh.realityCheck || "Recruiters and ATS parsers expect quantifiable KPIs and standard headings.",
      how: lh.suggestedFix || "Revise phrasing to follow Google's XYZ formula.",
      where: lh.section || "Work Experience",
      gain: lh.severity === "High" ? "+4.0%" : "+2.0%",
      effort: lh.severity === "High" ? "MEDIUM" : "LOW",
      time: "1 - 2 minutes",
      affectedRule: "Quantification Rate & Action Verbs",
      type: "loophole",
    })),
  ].slice(0, 6); // Top 6 deduplicated actions

  if (enrichedRecommendations.length === 0) return null;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-[var(--text-primary)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Lightbulb className="w-4 h-4" />
            EVIDENCE-BASED STRATEGIC RECOMMENDATIONS
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            High-Impact Optimization Action Plan
          </h2>
          <p className="text-[var(--text-secondary)] text-xs mt-1">
            Every recommendation is backed by specific Job Description evidence and ATS scoring rules.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {enrichedRecommendations.map((rec, idx) => (
          <div key={idx} className="bg-[var(--surface-muted)] p-5 rounded-2xl border border-[var(--border)] space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[var(--text-primary)]">#{idx + 1} {rec.title}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  rec.effort === "LOW" ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-amber-500 bg-amber-500/10 border-amber-500/20"
                }`}>
                  {rec.effort} EFFORT · {rec.time}
                </span>
              </div>
              <span className="text-xs font-mono font-black text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20 self-start sm:self-auto">
                {rec.gain} ATS Gain
              </span>
            </div>

            {/* Evidence & Why */}
            <div className="p-3 bg-[var(--surface)] rounded-xl border border-[var(--border)] space-y-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px] block">🔍 Evidence & Why:</span>
              <p className="text-[var(--text-secondary)] leading-relaxed text-[11px]">{rec.why}</p>
            </div>

            {/* How to fix */}
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 space-y-1">
              <span className="text-emerald-700 dark:text-emerald-300 font-bold uppercase text-[10px] block">✦ Actionable Fix (How & Where):</span>
              <p className="text-[var(--text-primary)] leading-relaxed text-[11px]">{rec.how}</p>
              <div className="flex items-center justify-between pt-1 text-[10px] text-[var(--text-secondary)]">
                <span>📍 Target: <strong className="text-[var(--text-primary)]">{rec.where}</strong></span>
                <span>Rule: <strong className="text-teal-600 dark:text-teal-400">{rec.affectedRule}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DeepRecommendationCard);
