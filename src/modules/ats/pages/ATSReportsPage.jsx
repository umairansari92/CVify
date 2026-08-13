import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Sparkles,
  FileText,
  RefreshCw,
  Target,
  Zap,
  Eye,
  Copy,
  TrendingUp,
  ShieldAlert,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  BarChart3,
  BookOpen,
} from "lucide-react";
import { toast } from "react-hot-toast";

// ─── Utility: Coaching Section Accordion ─────────────────────────────────────
const CoachingAccordion = ({ title, icon: Icon, accentColor = "text-emerald-400", children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/40 transition-colors"
      >
        <div className={`flex items-center gap-2 text-sm font-bold ${accentColor}`}>
          <Icon className="w-4 h-4" />
          {title}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-slate-800">{children}</div>}
    </div>
  );
};

// ─── Severity Badge ───────────────────────────────────────────────────────────
const SeverityBadge = ({ severity }) => {
  const map = {
    HIGH:     "bg-red-500/10 text-red-400 border-red-500/20",
    CRITICAL: "bg-red-600/10 text-red-300 border-red-600/20",
    MEDIUM:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
    LOW:      "bg-slate-700/60 text-slate-400 border-slate-600/30",
  };
  const cls = map[(severity || "").toUpperCase()] || map.LOW;
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${cls} uppercase tracking-wider`}>
      {severity || "Info"}
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ATSReportsPage = () => {
  const { latestResult: result } = useSelector((state) => state.ats);

  if (!result) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-100">No Intelligence Scan Report Available</h2>
        <p className="text-xs text-slate-400 max-w-md">
          You haven't run an ATS scan yet. Launch the workspace scanner to generate your complete Mission Debrief report.
        </p>
        <Link
          to="/ats/scan"
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
        >
          Launch Intelligence Scanner
        </Link>
      </div>
    );
  }

  // ── Data extraction ──────────────────────────────────────────────────────
  const score         = result.overallScore || result.atsScore || result.score || 0;
  const coaching      = result.coachingHints || result.coaching || {};
  const alignment     = coaching.alignmentMeter || {};
  const dealbreakers  = Array.isArray(coaching.dealbreakers)    ? coaching.dealbreakers    : [];
  const loopholes     = Array.isArray(coaching.sectionLoopholes)? coaching.sectionLoopholes: [];
  const quickWins     = Array.isArray(coaching.quickWins)       ? coaching.quickWins        : [];
  const expGap        = coaching.experienceGap || {};
  const potentialScore= coaching.potentialTotalScore || null;
  const bulletFixes   = Array.isArray(result.bulletFixes)       ? result.bulletFixes        :
                        Array.isArray(result.weakBullets)        ? result.weakBullets        : [];
  const foundKeywords   = result.foundKeywords   || [];
  const missingKeywords = result.missingKeywords || result.keywordGaps || [];

  let statusBadge = { label: "ACTION REQUIRED", color: "bg-red-500/10 text-red-400 border-red-500/20" };
  if (score >= 85) statusBadge = { label: "RECRUITER READY",  color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
  else if (score >= 70) statusBadge = { label: "COMPETITIVE", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" };

  const handleCopyKeywords = () => {
    if (!missingKeywords.length) return;
    navigator.clipboard.writeText(missingKeywords.join(", "));
    toast.success("Missing keywords copied to clipboard!");
  };

  return (
    <div className="space-y-6 py-2 max-w-5xl mx-auto">

      {/* ── 1. MISSION HEADER ──────────────────────────────────────────────── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              MISSION DEBRIEF REPORT
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              ATS Intelligence Evaluation
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Target Role: <span className="text-slate-200 font-semibold">{result.targetRole || result.jobTitle || "Full Stack Engineer"}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-extrabold border ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
            <Link
              to="/ats/scan"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Rescan
            </Link>
          </div>
        </div>

        {/* Score Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-xs text-slate-400 font-semibold">Overall ATS Score</span>
            <span className={`text-4xl font-black tracking-tight ${score >= 85 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-red-400"}`}>
              {score}%
            </span>
            <span className="text-[11px] text-slate-500">Benchmark: 85%+</span>
            {potentialScore && (
              <span className="text-[10px] text-teal-400 font-semibold">Potential: {potentialScore}%</span>
            )}
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Keyword Match</span>
              <span className="font-bold text-slate-200">{result.categoryScores?.keywords || result.keywordScore || 0}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${result.categoryScores?.keywords || result.keywordScore || 0}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 block">Target Skill Distance</span>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Impact & Quantification</span>
              <span className="font-bold text-slate-200">{result.categoryScores?.impact || result.impactScore || 0}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${result.categoryScores?.impact || result.impactScore || 0}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 block">Metric density rate</span>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Formatting Safety</span>
              <span className="font-bold text-slate-200">{result.categoryScores?.formatting || result.formattingScore || 0}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${result.categoryScores?.formatting || result.formattingScore || 0}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 block">DOM & font readability</span>
          </div>
        </div>
      </div>

      {/* ── 2. ALIGNMENT METER (Potential Score) ───────────────────────────── */}
      {(alignment.level || alignment.summary || potentialScore) && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-teal-400">
            <BarChart3 className="w-4 h-4" />
            Alignment Meter — Actual vs Potential Score
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
              <span className="text-slate-400 block">Current Score</span>
              <span className="text-3xl font-black text-red-400">{score}%</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-1 text-center">
              <span className="text-slate-400 block">Potential After Fixes</span>
              <span className="text-3xl font-black text-emerald-400">{potentialScore || "—"}%</span>
              {potentialScore && <span className="text-[10px] text-emerald-500">+{potentialScore - score}% gain possible</span>}
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 block font-semibold">Alignment Level</span>
              <span className={`text-sm font-bold block ${alignment.level === "HIGH" ? "text-emerald-400" : alignment.level === "MEDIUM" ? "text-amber-400" : "text-red-400"}`}>
                {alignment.level || "—"}
              </span>
              {alignment.applyAdvice && (
                <p className="text-slate-400 leading-relaxed text-[11px]">{alignment.applyAdvice}</p>
              )}
            </div>
          </div>
          {alignment.summary && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="text-teal-400 font-bold block mb-1">Strategic Summary</span>
              {alignment.summary}
            </div>
          )}
        </div>
      )}

      {/* ── 3. RECRUITER 3-SECOND IMPRESSION ──────────────────────────────── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
          <Eye className="w-4 h-4 text-emerald-400" />
          Recruiter 3-Second First Impression
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400 block">🟢 Headline Advantage</span>
            <p className="text-slate-300 leading-relaxed">
              {result.recruiterImpression?.advantage || result.detailedMetrics?.recruiterFirstImpression || "Strong technical foundation in modern stack."}
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-amber-400 block">🟡 Secondary Flag</span>
            <p className="text-slate-300 leading-relaxed">
              {result.recruiterImpression?.flag || "Work experience bullets lack concrete metrics (DAU scale, latency numbers)."}
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-red-400 block">🔴 Primary Rejection Risk</span>
            <p className="text-slate-300 leading-relaxed">
              {result.recruiterImpression?.risk || "Missing essential cloud & DevOps keywords."}
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. KEYWORD & SKILL GAP MATRIX ─────────────────────────────────── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <Target className="w-4 h-4 text-emerald-400" />
            Keyword & Skill Match Matrix
          </div>
          {missingKeywords.length > 0 && (
            <button
              onClick={handleCopyKeywords}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Missing Keywords
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">
              ✓ Found Keywords ({foundKeywords.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {foundKeywords.length > 0
                ? foundKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg text-xs font-medium">{kw}</span>
                  ))
                : <span className="text-slate-500 text-xs">No matched keywords found.</span>
              }
            </div>
          </div>
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-red-400 block uppercase tracking-wider">
              ⚠ Missing Critical Keywords ({missingKeywords.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.length > 0
                ? missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 bg-red-500/10 text-red-300 border border-red-500/20 rounded-lg text-xs font-medium">+ {kw}</span>
                  ))
                : <span className="text-emerald-400 text-xs font-semibold">✓ All critical keywords found!</span>
              }
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. DEALBREAKER REALITY CHECK ──────────────────────────────────── */}
      {dealbreakers.length > 0 && (
        <CoachingAccordion title="Dealbreaker Reality Check" icon={ShieldAlert} accentColor="text-red-400" defaultOpen={true}>
          <p className="text-xs text-slate-400 pt-3">
            Hard requirements from the job description that your resume must address. A single hard "No" can eliminate your application before scoring.
          </p>
          <div className="space-y-3">
            {dealbreakers.map((db, i) => (
              <div key={i} className={`p-4 rounded-xl border text-xs space-y-2 ${db.canBeFixed ? "border-amber-500/20 bg-amber-950/20" : "border-red-500/20 bg-red-950/20"}`}>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-slate-100">{db.requirement}</span>
                  {db.canBeFixed
                    ? <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold shrink-0">CAN FIX</span>
                    : <span className="text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-[10px] font-bold shrink-0">HARD NO</span>
                  }
                </div>
                <p className="text-slate-400">
                  <span className="text-slate-500">Your resume shows:</span> {db.resumeStatus}
                </p>
                {db.advice && (
                  <div className="p-3 bg-slate-900/80 border border-slate-700 rounded-lg text-slate-300 leading-relaxed">
                    <span className="text-teal-400 font-bold block text-[10px] uppercase mb-1">Advice:</span>
                    {db.advice}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CoachingAccordion>
      )}

      {/* ── 6. EXPERIENCE GAP ANALYSIS ────────────────────────────────────── */}
      {(expGap.jdRequires || expGap.resumeShows) && (
        <CoachingAccordion title="Experience Gap Analysis" icon={TrendingUp} accentColor="text-amber-400" defaultOpen={true}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold block">JD Requires</span>
              <p className="text-slate-200 leading-relaxed">{expGap.jdRequires || "—"}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold block">Your Resume Shows</span>
              <p className="text-slate-200 leading-relaxed">{expGap.resumeShows || "—"}</p>
            </div>
          </div>
          {expGap.gapSeverity && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Gap Severity:</span>
              <SeverityBadge severity={expGap.gapSeverity} />
            </div>
          )}
          {Array.isArray(expGap.strategies) && expGap.strategies.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-teal-400 block">Bridging Strategies:</span>
              <ul className="space-y-2">
                {expGap.strategies.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <ArrowRight className="w-3 h-3 text-teal-400 mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CoachingAccordion>
      )}

      {/* ── 7. SECTION-BY-SECTION COACHING LOOPHOLES ──────────────────────── */}
      {loopholes.length > 0 && (
        <CoachingAccordion title={`Section-by-Section Coaching Guide (${loopholes.length} Issues)`} icon={BookOpen} accentColor="text-violet-400" defaultOpen={true}>
          <p className="text-xs text-slate-400 pt-3">
            Every section of your resume has been analyzed. Here is what to fix, why it matters, and exactly how to do it.
          </p>
          <div className="space-y-4">
            {loopholes.map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-200 font-bold uppercase tracking-wider">
                    📄 {item.section}
                  </span>
                  <SeverityBadge severity={item.severity} />
                </div>

                <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl">
                  <span className="text-red-400 block text-[10px] uppercase font-bold mb-1">Issue Identified:</span>
                  <p className="text-slate-300 leading-relaxed">{item.issue}</p>
                </div>

                {item.suggestedFix && (
                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
                    <span className="text-emerald-400 block text-[10px] uppercase font-bold mb-1">✦ Suggested Fix:</span>
                    <p className="text-slate-200 leading-relaxed">{item.suggestedFix}</p>
                  </div>
                )}

                {item.realityCheck && (
                  <div className="p-3 bg-teal-950/20 border border-teal-500/20 rounded-xl">
                    <span className="text-teal-400 block text-[10px] uppercase font-bold mb-1">Reality Check:</span>
                    <p className="text-slate-300 leading-relaxed italic">{item.realityCheck}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CoachingAccordion>
      )}

      {/* ── 8. QUICK WINS CHECKLIST ────────────────────────────────────────── */}
      {quickWins.length > 0 && (
        <CoachingAccordion title={`Quick Wins Checklist (${quickWins.length} Actions)`} icon={Lightbulb} accentColor="text-amber-400" defaultOpen={true}>
          <p className="text-xs text-slate-400 pt-3">
            Ranked actions by impact. Complete these first to maximize your score gain.
          </p>
          <div className="space-y-3">
            {quickWins.map((win, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-black shrink-0 text-[11px]">
                  {win.rank || idx + 1}
                </div>
                <div className="flex-1 space-y-1.5">
                  <p className="text-slate-100 font-semibold leading-relaxed">{win.action}</p>
                  {win.effort && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      win.effort === "LOW"    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
                      win.effort === "MEDIUM" ? "text-amber-400 bg-amber-500/10 border-amber-500/20"   :
                                               "text-red-400 bg-red-500/10 border-red-500/20"
                    }`}>
                      {win.effort} EFFORT
                    </span>
                  )}
                  {win.howTo && (
                    <p className="text-slate-400 leading-relaxed">{win.howTo}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {coaching.overallStrategy && (
            <div className="p-4 bg-violet-950/20 border border-violet-500/20 rounded-xl text-xs text-slate-300 leading-relaxed space-y-1">
              <span className="text-violet-400 font-bold block">🎯 Overall Strategy:</span>
              {coaching.overallStrategy}
            </div>
          )}
        </CoachingAccordion>
      )}

      {/* ── 9. AI BULLET IMPROVEMENTS ──────────────────────────────────────── */}
      {bulletFixes.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <Zap className="w-4 h-4 text-emerald-400" />
            Actionable Loopholes & AI Bullet Improvements
          </div>
          <div className="space-y-4">
            {bulletFixes.map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-400 font-semibold">
                  <span>Issue #{idx + 1}: {item.critique || item.tip || item.suggestion || "Weak bullet detected"}</span>
                  <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">Weak Bullet</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl text-slate-400 font-mono">
                  <span className="text-slate-500 block text-[10px] uppercase font-sans mb-1">Original Text:</span>
                  "{item.original || item.content || ""}"
                </div>
                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-emerald-200 font-mono">
                  <span className="text-emerald-400 block text-[10px] uppercase font-sans mb-1 font-bold">Recommended AI Fix:</span>
                  "{item.improved || item.rewritten || item.revision || ""}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 10. RESCAN CTA ─────────────────────────────────────────────────── */}
      <div className="text-center bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/20 rounded-3xl p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-100">Apply Improvements & Re-Scan</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Updated your resume with missing keywords? Re-scanning within 24 hours costs 50% less (25 Diamonds).
        </p>
        <Link
          to="/ats/scan"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          Apply Fixes & Rescan Now
        </Link>
      </div>

    </div>
  );
};

export default ATSReportsPage;
