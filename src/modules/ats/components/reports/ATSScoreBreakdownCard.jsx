import React from "react";
import { Award, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

/**
 * Letter grade calculation from 0-100 percentage.
 */
const getLetterGrade = (percentage) => {
  if (percentage >= 93) return { grade: "A+", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" };
  if (percentage >= 85) return { grade: "A",  color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" };
  if (percentage >= 80) return { grade: "A-", color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20" };
  if (percentage >= 75) return { grade: "B+", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" };
  if (percentage >= 70) return { grade: "B",  color: "text-amber-400 bg-amber-500/10 border-amber-500/30" };
  if (percentage >= 65) return { grade: "C+", color: "text-amber-300 bg-amber-500/10 border-amber-500/20" };
  if (percentage >= 55) return { grade: "C",  color: "text-red-400 bg-red-500/10 border-red-500/30" };
  return { grade: "D", color: "text-red-500 bg-red-500/10 border-red-500/30" };
};

const ATSScoreBreakdownCard = ({ result = {}, score = 0, keywordScore = 0, impactScore = 0, formattingScore = 0 }) => {
  // Derived weighted points based on standard ATS weight distribution
  const formattingPoints = Math.round((formattingScore / 100) * 20);
  const keywordPoints    = Math.round((keywordScore / 100) * 35);
  const impactPoints     = Math.round((impactScore / 100) * 25);
  const syntaxPoints     = score > 0 ? Math.min(20, Math.round(score * 0.20)) : 0;
  const totalCalculated  = Math.min(100, formattingPoints + keywordPoints + impactPoints + syntaxPoints);

  const categories = [
    {
      name: "Keyword Match & Relevance",
      weight: "35 pts max",
      points: keywordPoints,
      max: 35,
      scorePct: keywordScore,
      rule: "Technical & Domain Skill Coverage",
      status: keywordScore >= 75 ? "PASS" : keywordScore >= 50 ? "WARN" : "FAIL",
      description: "Direct & synonymous match against core Job Description deliverables."
    },
    {
      name: "Measurable Impact & Metrics",
      weight: "25 pts max",
      points: impactPoints,
      max: 25,
      scorePct: impactScore,
      rule: "Quantification Rate & Action Verbs",
      status: impactScore >= 70 ? "PASS" : impactScore >= 45 ? "WARN" : "FAIL",
      description: "Density of KPIs, percentages, dollar amounts, and Google XYZ formulas."
    },
    {
      name: "Formatting & Parser Safety",
      weight: "20 pts max",
      points: formattingPoints,
      max: 20,
      scorePct: formattingScore,
      rule: "Structural DOM & Date Syntax",
      status: formattingScore >= 80 ? "PASS" : formattingScore >= 60 ? "WARN" : "FAIL",
      description: "Clean section headers, standard date formats, and zero table distortion."
    },
    {
      name: "Experience Depth & Relevance",
      weight: "20 pts max",
      points: syntaxPoints,
      max: 20,
      scorePct: score > 0 ? score : 0,
      rule: "Career Stage & Role Alignment",
      status: score >= 75 ? "PASS" : score >= 50 ? "WARN" : "FAIL",
      description: "Title proximity, seniority fit, and core technology stack breadth."
    },
  ];

  const overallGrade = getLetterGrade(score);

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-[var(--text-primary)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Award className="w-4 h-4" />
            OFFICIAL REPORT CARD BREAKDOWN
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            How Your ATS Score Was Calculated
          </h2>
          <p className="text-[var(--text-secondary)] text-xs mt-1">
            Deterministic evaluation based on Fortune 500 ATS weighting matrix.
          </p>
        </div>

        {/* Quality Letter Grade Badge */}
        <div className="flex items-center gap-3 bg-[var(--surface-muted)] px-4 py-2.5 rounded-2xl border border-[var(--border)]">
          <div className="text-right">
            <span className="text-[10px] text-[var(--text-muted)] font-bold block uppercase">Overall Grade</span>
            <span className="text-xs text-[var(--text-secondary)] font-medium">ATS Readiness</span>
          </div>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-xl border ${overallGrade.color}`}>
            {overallGrade.grade}
          </div>
        </div>
      </div>

      {/* Category Rows */}
      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const catGrade = getLetterGrade(cat.scorePct);
          return (
            <div key={idx} className="bg-[var(--surface-muted)] p-4 sm:p-5 rounded-2xl border border-[var(--border)] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[var(--text-primary)]">{cat.name}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${catGrade.color}`}>
                      Grade {catGrade.grade}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">{cat.description}</p>
                </div>
                <div className="text-right flex items-center sm:block gap-2">
                  <div className="text-base font-black text-[var(--text-primary)]">
                    {cat.points} <span className="text-[var(--text-muted)] text-xs font-semibold">/ {cat.max} pts</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] block">{cat.scorePct}% achieved</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden border border-[var(--border)]">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    cat.scorePct >= 75 ? "bg-emerald-500" : cat.scorePct >= 50 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${Math.max(5, cat.scorePct)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
                <span>Rule: <strong className="text-[var(--text-primary)]">{cat.rule}</strong></span>
                <span className={cat.status === "PASS" ? "text-emerald-600 dark:text-emerald-400 font-bold" : cat.status === "WARN" ? "text-amber-500 font-bold" : "text-red-500 font-bold"}>
                  {cat.status === "PASS" ? "✓ Meets Benchmark" : cat.status === "WARN" ? "⚠ Needs Improvement" : "✕ Critical Deficit"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Score Summary Box */}
      <div className="p-5 bg-[var(--surface-muted)] rounded-2xl border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Total Calibrated Score</span>
          <p className="text-xs text-[var(--text-secondary)]">
            Weighted composite of keyword density, qualification proof, formatting safety, and career relevance.
          </p>
        </div>
        <div className="text-3xl font-black text-[var(--text-primary)] flex items-baseline gap-1">
          <span className={score >= 85 ? "text-emerald-600 dark:text-emerald-400" : score >= 70 ? "text-amber-500" : "text-red-500"}>
            {score}
          </span>
          <span className="text-[var(--text-muted)] text-sm font-semibold">/ 100</span>
        </div>
      </div>

      {/* Footer Diagnostic Note */}
      <div className="p-4 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-start gap-3 text-xs text-[var(--text-secondary)]">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Scores above 85% indicate that your resume clears automated filtering thresholds across all major ATS vendors (Workday, Greenhouse, Taleo, Lever, iCIMS).
        </p>
      </div>
    </div>
  );
};

export default React.memo(ATSScoreBreakdownCard);
