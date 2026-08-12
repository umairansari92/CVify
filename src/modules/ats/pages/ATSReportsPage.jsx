import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  RefreshCw, 
  Target, 
  Zap, 
  FileText, 
  Award, 
  Eye, 
  HelpCircle,
  Copy,
  ChevronRight
} from "lucide-react";
import { toast } from "react-hot-toast";

const ATSReportsPage = () => {
  const navigate = useNavigate();
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

  // Calculate mission status badge
  const score = result.overallScore || result.atsScore || result.score || 72;
  let statusBadge = { label: "ACTION REQUIRED", color: "bg-red-500/10 text-red-400 border-red-500/20" };
  if (score >= 85) {
    statusBadge = { label: "RECRUITER READY", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
  } else if (score >= 70) {
    statusBadge = { label: "COMPETITIVE", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
  }

  const handleCopyKeywords = (keywords) => {
    if (!keywords || keywords.length === 0) return;
    navigator.clipboard.writeText(keywords.join(", "));
    toast.success("Missing keywords copied to clipboard!");
  };

  return (
    <div className="space-y-8 py-2 max-w-5xl mx-auto">
      
      {/* ── 1. MISSION HEADER & SCORE GAUGE ── */}
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
            <p className="text-slate-400 text-xs sm:text-sm">
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
              <RefreshCw className="w-3.5 h-3.5" />
              Rescan
            </Link>
          </div>
        </div>

        {/* Score Meters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Main Score */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-xs text-slate-400 font-semibold">Overall ATS Score</span>
            <span className="text-4xl font-black text-emerald-400 tracking-tight">{score}%</span>
            <span className="text-[11px] text-slate-500">Benchmark: 85%+</span>
          </div>

          {/* Sub Score 1: Keyword Match */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Keyword Match</span>
              <span className="font-bold text-slate-200">{result.categoryScores?.keywords || result.keywordScore || 78}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${result.categoryScores?.keywords || result.keywordScore || 78}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 block">Target Skill Distance</span>
          </div>

          {/* Sub Score 2: Impact & Metrics */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Impact & Quantification</span>
              <span className="font-bold text-slate-200">{result.categoryScores?.impact || result.impactScore || 65}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${result.categoryScores?.impact || result.impactScore || 65}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 block">Metric density rate</span>
          </div>

          {/* Sub Score 3: Format Safety */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Formatting Safety</span>
              <span className="font-bold text-slate-200">{result.categoryScores?.formatting || result.formattingScore || 92}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${result.categoryScores?.formatting || result.formattingScore || 92}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 block">DOM & font readability</span>
          </div>
        </div>
      </div>

      {/* ── 2. RECRUITER 3-SECOND FIRST IMPRESSION ── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
          <Eye className="w-4 h-4 text-emerald-400" />
          Recruiter 3-Second First Impression Summary
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400 block">🟢 Headline Advantage</span>
            <p className="text-slate-300 leading-relaxed">
              {result.recruiterImpression?.advantage || "Strong technical foundation in modern React and Node.js backend integration."}
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
              {result.recruiterImpression?.risk || "Missing essential cloud & DevOps keywords (Docker, AWS, CI/CD)."}
            </p>
          </div>
        </div>
      </div>

      {/* ── 3. KEYWORD & SKILL GAP MATRIX ── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <Target className="w-4 h-4 text-emerald-400" />
            Keyword & Skill Match Matrix
          </div>
          
          <button
            onClick={() => handleCopyKeywords(result.missingKeywords || result.keywordGaps || ["Docker", "AWS", "CI/CD", "TypeScript"])}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20"
          >
            <Copy className="w-3.5 h-3.5" />
            Copy Missing Keywords
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Found Keywords */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">
              ✓ Found Keywords ({result.foundKeywords?.length || 8})
            </span>
            <div className="flex flex-wrap gap-2">
              {(result.foundKeywords || ["React", "JavaScript", "Node.js", "Express", "MongoDB", "REST APIs", "Git", "TailwindCSS"]).map((kw, i) => (
                <span key={i} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg text-xs font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-red-400 block uppercase tracking-wider">
              ⚠ Missing Critical Keywords ({result.missingKeywords?.length || 4})
            </span>
            <div className="flex flex-wrap gap-2">
              {(result.missingKeywords || ["TypeScript", "Docker", "AWS", "CI/CD Pipelines"]).map((kw, i) => (
                <span key={i} className="px-2.5 py-1 bg-red-500/10 text-red-300 border border-red-500/20 rounded-lg text-xs font-medium">
                  + {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. ACTIONABLE SECTION LOOPHOLES & AI FIXES ── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
          <Zap className="w-4 h-4 text-emerald-400" />
          Actionable Loopholes & AI Bullet Improvements
        </div>

        <div className="space-y-4">
          {(result.bulletFixes || [
            {
              original: "Worked on web applications using React and Node for client projects.",
              critique: "Passive action verb ('Worked on') and 0% metric quantification.",
              improved: "Engineered 4 scalable MERN stack web applications for enterprise clients, handling 20,000 active users with 99.9% uptime."
            },
            {
              original: "Responsible for fixing bugs and improving database queries.",
              critique: "Vague responsibility statement without technical specificity.",
              improved: "Optimized MongoDB indexing and Express middleware, reducing database API response latency by 42% across core endpoints."
            }
          ]).map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400 font-semibold">
                <span>Issue #{idx + 1}: {item.critique}</span>
                <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">Weak Bullet</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl text-slate-400 font-mono">
                <span className="text-slate-500 block text-[10px] uppercase font-sans mb-1">Original Text:</span>
                "{item.original}"
              </div>

              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-emerald-200 font-mono">
                <span className="text-emerald-400 block text-[10px] uppercase font-sans mb-1 font-bold">Recommended AI Fix:</span>
                "{item.improved}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. ITERATIVE RESCAN CTA ── */}
      <div className="text-center bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/20 rounded-3xl p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-100">
          Apply Improvements & Re-Scan
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Updated your resume with missing keywords? Re-scanning within 24 hours costs 50% less.
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
