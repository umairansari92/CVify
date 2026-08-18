import React from "react";
import { Eye, Clock, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";

const RecruiterSimulationCard = ({ headlineAdvantage, secondaryFlag, primaryRisk, score = 0, overallVerdict = "" }) => {
  const eyeTrackingBreakdown = [
    { section: "Header, Title & Headline", time: "2.0s", focus: "High", desc: "Instant seniority & role alignment scan." },
    { section: "Most Recent Job & Achievements", time: "3.0s", focus: "High", desc: "Scanning for metrics, scale, and action verbs." },
    { section: "Core Technical Skills Matrix", time: "1.5s", focus: "High", desc: "Checking for must-have target stack keywords." },
    { section: "Projects & Production URLs", time: "0.5s", focus: "Moderate", desc: "Verifying live proof and GitHub repository activity." },
  ];

  const ignoredSections = [
    { name: "Generic Objective Statements", reason: "Recruiters skip straight to work history." },
    { name: "Unrelated Awards / Hobbies", reason: "Zero correlation with initial technical gatekeeping." },
    { name: "Outdated Early Education Details", reason: "Recent experience carries 90% of evaluation weight." },
  ];

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-[var(--text-primary)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Eye className="w-4 h-4" />
            HUMAN RECRUITER 7-SECOND EYE-TRACKING SIMULATION
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            How a Real Hiring Manager Reads Your Resume
          </h2>
          <p className="text-[var(--text-secondary)] text-xs mt-1">
            Simulated visual hierarchy and dwell-time heat patterns based on standard technical recruiter workflows.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[var(--surface-muted)] px-4 py-2 rounded-xl border border-[var(--border)] text-xs text-[var(--text-primary)]">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Average Initial Dwell Time: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">7.0s</strong></span>
        </div>
      </div>

      {/* Recruiter Verdict Header */}
      {overallVerdict && (
        <div className="p-4 bg-[var(--surface-muted)] rounded-2xl border border-[var(--border)] space-y-1 text-xs">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px] block">Executive Recruiter Verdict:</span>
          <p className="text-[var(--text-primary)] leading-relaxed font-medium">"{overallVerdict}"</p>
        </div>
      )}

      {/* 3 Core First Impression Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-[var(--surface-muted)] p-4 rounded-2xl border border-emerald-500/20 space-y-2">
          <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            🟢 Headline Advantage
          </span>
          <p className="text-[var(--text-secondary)] leading-relaxed text-[11px]">{headlineAdvantage}</p>
        </div>

        <div className="bg-[var(--surface-muted)] p-4 rounded-2xl border border-amber-500/20 space-y-2">
          <span className="font-bold text-amber-500 flex items-center gap-1.5">
            🟡 Secondary Flag
          </span>
          <p className="text-[var(--text-secondary)] leading-relaxed text-[11px]">{secondaryFlag}</p>
        </div>

        <div className="bg-[var(--surface-muted)] p-4 rounded-2xl border border-red-500/20 space-y-2">
          <span className="font-bold text-red-500 dark:text-red-400 flex items-center gap-1.5">
            🔴 Primary Rejection Risk
          </span>
          <p className="text-[var(--text-secondary)] leading-relaxed text-[11px]">{primaryRisk}</p>
        </div>
      </div>

      {/* Eye-Tracking Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* High Focus Zones */}
        <div className="bg-[var(--surface-muted)] p-5 rounded-2xl border border-[var(--border)] space-y-3 text-xs">
          <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider block text-[11px]">
            👀 Visual Dwell Time Allocation (7.0s Total)
          </span>
          <div className="space-y-2.5">
            {eyeTrackingBreakdown.map((zone, idx) => (
              <div key={idx} className="p-3 bg-[var(--surface)] rounded-xl border border-[var(--border)] flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-bold text-[var(--text-primary)] block">{zone.section}</span>
                  <p className="text-[10px] text-[var(--text-secondary)]">{zone.desc}</p>
                </div>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shrink-0 ml-2">
                  {zone.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ignored / Deprioritized Zones */}
        <div className="bg-[var(--surface-muted)] p-5 rounded-2xl border border-[var(--border)] space-y-3 text-xs">
          <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider block text-[11px]">
            🚫 Deprioritized / Skipped During Initial 7-Second Screen
          </span>
          <div className="space-y-2.5">
            {ignoredSections.map((ign, idx) => (
              <div key={idx} className="p-3 bg-[var(--surface)] rounded-xl border border-[var(--border)] space-y-0.5">
                <span className="font-bold text-amber-500 block">{ign.name}</span>
                <p className="text-[10px] text-[var(--text-secondary)]">{ign.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RecruiterSimulationCard);
