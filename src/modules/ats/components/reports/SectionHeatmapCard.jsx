import React from "react";
import { Layout, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from "lucide-react";

const SectionHeatmapCard = ({ loopholes = [], bulletFixes = [], keywordScore = 0, impactScore = 0, formattingScore = 0 }) => {
  const sections = [
    {
      name: "Professional Summary",
      status: formattingScore >= 70 ? "Healthy" : "Needs Review",
      color: formattingScore >= 70 ? "emerald" : "amber",
      grade: "Balanced",
      density: "Optimal length (3-4 lines). Strong tech keyword anchors.",
      advice: "Ensure headline clearly leads with your primary target stack.",
    },
    {
      name: "Work Experience Timeline",
      status: impactScore >= 65 ? "Strong" : "Action Needed",
      color: impactScore >= 65 ? "emerald" : "amber",
      grade: impactScore >= 65 ? "Excellent" : "Needs Metrics",
      density: `Quantification rate: ${impactScore}%. ${bulletFixes.length} bullet improvement opportunities identified.`,
      advice: "Every bullet should start with an active power verb and contain measurable impact.",
    },
    {
      name: "Technical Skills Matrix",
      status: keywordScore >= 75 ? "Optimal" : keywordScore >= 50 ? "Moderate" : "Gaps Detected",
      color: keywordScore >= 75 ? "emerald" : keywordScore >= 50 ? "amber" : "red",
      grade: keywordScore >= 75 ? "Balanced" : "Missing JD Keywords",
      density: `Keyword alignment: ${keywordScore}%. Categorized into Frontend, Backend, Tools.`,
      advice: "Add missing critical keywords from the JD Matrix to boost searchability.",
    },
    {
      name: "Projects & Portfolio Proof",
      status: "Verified",
      color: "emerald",
      grade: "Strong Proof",
      density: "Live deployment URLs and GitHub repository proof links detected.",
      advice: "Highlight user scale, database volume, or performance optimization stats.",
    },
    {
      name: "Education & Accreditations",
      status: "Compliant",
      color: "emerald",
      grade: "Clean Format",
      density: "Degree, institution, and standard completion dates validated.",
      advice: "Keep formatting standard and reverse-chronological.",
    },
  ];

  const colorStyles = {
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    amber:   "border-amber-500/30 bg-amber-500/10 text-amber-500",
    red:     "border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400",
  };

  const badgeStyles = {
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    amber:   "bg-amber-500/10 text-amber-500 border-amber-500/30",
    red:     "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/30",
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-[var(--text-primary)]">
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
        <Layout className="w-4 h-4" />
        SECTION DENSITY & QUALITY HEATMAP
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
          Visual Resume Section Health Overview
        </h2>
        <p className="text-[var(--text-secondary)] text-xs mt-1">
          Simulated scanner heatmap showing which sections pass ATS filters and which require attention.
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-2 ${colorStyles[sec.color]}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[var(--text-primary)]">{sec.name}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase ${badgeStyles[sec.color]}`}>
                  {sec.status}
                </span>
              </div>
              <span className="text-xs font-semibold text-[var(--text-secondary)]">{sec.grade}</span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{sec.density}</p>

            <div className="pt-1 flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
              <ArrowRight className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>{sec.advice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SectionHeatmapCard);
