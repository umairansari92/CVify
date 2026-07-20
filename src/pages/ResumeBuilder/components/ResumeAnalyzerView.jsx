import React, { useMemo } from "react";
import { CheckCircle2, AlertCircle, Info, Zap, TrendingUp, Shield, FileText } from "lucide-react";
import { useSelector } from "react-redux";

// -------------------------------------------------------------------
// Client-side live scoring engine — runs directly on currentResume
// No API call needed, zero latency
// -------------------------------------------------------------------
const STRONG_VERBS = [
  "architected", "engineered", "spearheaded", "optimized", "developed",
  "designed", "implemented", "built", "led", "managed", "increased",
  "reduced", "automated", "launched", "delivered", "established",
  "streamlined", "transformed", "accelerated", "scaled", "deployed",
  "integrated", "migrated", "refactored", "negotiated", "mentored",
];

function computeScores(resume) {
  if (!resume) return { completeness: 0, quantification: 0, impact: 0, overall: 0, stats: {} };

  // ── 1. Completeness ─────────────────────────────────────────────
  const checks = {
    hasName:    !!(resume?.personalInfo?.fullName?.trim()),
    hasEmail:   !!(resume?.personalInfo?.email?.trim()),
    hasSummary: !!(resume?.personalInfo?.profileSummary?.trim()),
    hasPhone:   !!(resume?.personalInfo?.phone?.trim()),
    hasExp:     Array.isArray(resume?.experience) && resume.experience.length > 0,
    hasEdu:     Array.isArray(resume?.education)  && resume.education.length  > 0,
    hasSkills:  !!(
      (resume?.technicalSkills && Object.values(resume.technicalSkills).some(a => Array.isArray(a) && a.length > 0)) ||
      (Array.isArray(resume?.skills) && resume.skills.length > 0)
    ),
    hasProjects: Array.isArray(resume?.projects) && resume.projects.length > 0,
  };
  const completenessScore = Math.round((Object.values(checks).filter(Boolean).length / Object.keys(checks).length) * 100);

  // ── 2. Quantification ───────────────────────────────────────────
  const allBullets = [];
  (resume?.experience || []).forEach(exp => {
    (exp.responsibilities || []).forEach(r => { if (r?.trim()) allBullets.push(r); });
  });
  const quantifiedBullets = allBullets.filter(b => /\d+/.test(b)).length;
  const quantificationScore = allBullets.length > 0
    ? Math.round((quantifiedBullets / allBullets.length) * 100)
    : 0;

  // ── 3. Impact (action verbs) ────────────────────────────────────
  const impactBullets = allBullets.filter(b =>
    STRONG_VERBS.some(v => b.toLowerCase().trimStart().startsWith(v))
  ).length;
  const rawImpact = allBullets.length > 0
    ? Math.round((impactBullets / allBullets.length) * 100)
    : 0;
  // Give a base 20 points for having any bullets at all
  const impactScore = allBullets.length > 0 ? Math.min(100, rawImpact + 20) : 0;

  // ── 4. Overall weighted score ───────────────────────────────────
  const overall = Math.round(
    completenessScore * 0.4 + quantificationScore * 0.35 + impactScore * 0.25
  );

  return {
    completeness: completenessScore,
    quantification: quantificationScore,
    impact: impactScore,
    overall,
    stats: {
      totalBullets: allBullets.length,
      quantifiedBullets,
      impactBullets,
      sectionsComplete: Object.values(checks).filter(Boolean).length,
      totalSections: Object.keys(checks).length,
    },
  };
}

// -------------------------------------------------------------------
// Rule-based feedback from scores
// -------------------------------------------------------------------
function getIssues(scores, stats) {
  const issues = [];

  if (scores.completeness < 75) {
    issues.push({
      id: 1,
      type: "error",
      title: "Incomplete Profile",
      description: `${stats.sectionsComplete} of ${stats.totalSections} key sections filled. Add a summary, phone number, and ensure all sections have content.`,
      impact: "High",
    });
  }

  if (scores.quantification < 40) {
    issues.push({
      id: 2,
      type: "error",
      title: "Missing Quantifiable Results",
      description: `Only ${stats.quantifiedBullets} of your ${stats.totalBullets} bullets contain numbers. Recruiters respond 40% better to metrics like "Reduced load time by 35%".`,
      impact: "High",
    });
  }

  if (scores.impact < 50) {
    issues.push({
      id: 3,
      type: "warning",
      title: "Weak Action Verbs",
      description: `${stats.impactBullets} of ${stats.totalBullets} bullets start with power verbs. Replace phrases like "Responsible for" with "Architected" or "Spearheaded".`,
      impact: "Medium",
    });
  }

  if (scores.completeness >= 75 && scores.quantification >= 40 && scores.impact >= 50) {
    issues.push({
      id: 4,
      type: "success",
      title: "Strong Foundation",
      description: "Your resume has solid structure, measurable results, and impactful language. Use AI intent commands above to fine-tune sections further.",
      impact: "Info",
    });
  }

  return issues;
}

// -------------------------------------------------------------------
// Component
// -------------------------------------------------------------------
const ResumeAnalyzerView = () => {
  const { currentResume, parsingAnalysis } = useSelector((state) => state.resume);

  // Priority: parsingAnalysis (from Magic Import) > live computed scores (manual build)
  const liveScores = useMemo(() => computeScores(currentResume), [currentResume]);

  const scores = useMemo(() => {
    if (parsingAnalysis?.scores) {
      return {
        completeness:   parsingAnalysis.scores.completeness   ?? 0,
        quantification: parsingAnalysis.scores.quantification ?? 0,
        impact:         parsingAnalysis.scores.impact          ?? 0,
        overall: Math.round(
          (parsingAnalysis.scores.completeness   ?? 0) * 0.4 +
          (parsingAnalysis.scores.quantification ?? 0) * 0.35 +
          (parsingAnalysis.scores.impact         ?? 0) * 0.25
        ),
        stats: {
          totalBullets:       parsingAnalysis.stats?.totalBullets       ?? 0,
          quantifiedBullets:  parsingAnalysis.stats?.quantifiedBullets  ?? 0,
          impactBullets:      parsingAnalysis.stats?.impactBullets      ?? 0,
          sectionsComplete:   parsingAnalysis.stats?.sectionsComplete   ?? 0,
          totalSections:      parsingAnalysis.stats?.totalSections      ?? 8,
        },
      };
    }
    return liveScores;
  }, [parsingAnalysis, liveScores]);

  const isFromParse = !!parsingAnalysis?.scores;

  const issues = useMemo(() => getIssues(scores, scores.stats), [scores]);

  const metrics = [
    { label: "Profile Completeness", score: scores.completeness, color: "emerald", icon: FileText },
    { label: "Measurable Results",   score: scores.quantification, color: "red",     icon: TrendingUp },
    { label: "Impact Language",      score: scores.impact,         color: "amber",   icon: Shield },
  ];

  const scoreColor =
    scores.overall >= 70 ? "text-emerald-400" :
    scores.overall >= 40 ? "text-amber-400"   :
    "text-red-400";

  const scoreLabel =
    scores.overall >= 70 ? "Good" :
    scores.overall >= 40 ? "Fair" :
    "Needs Work";

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* ── Score Header ── */}
      <div className="bg-bg-secondary border border-white/5 rounded-3xl p-10 flex items-center justify-between shadow-sm overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-4xl font-black tracking-tighter mb-2 text-white">
            Resume Intelligence Audit
          </h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Real-time analysis of your professional narrative
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${
              isFromParse
                ? "border-primary/30 text-primary bg-primary/10"
                : "border-slate-700 text-slate-400 bg-slate-900"
            }`}>
              {isFromParse ? "📄 From Magic Import" : "⚡ Live — updates as you edit"}
            </span>
          </div>
        </div>

        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
            <circle
              cx="64" cy="64" r="58"
              stroke="currentColor" strokeWidth="8" fill="transparent"
              strokeDasharray={364}
              strokeDashoffset={364 - (364 * scores.overall) / 100}
              className={`${scoreColor} transition-all duration-1000 ease-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-black ${scoreColor}`}>{scores.overall}%</span>
            <span className="text-[8px] font-bold uppercase text-slate-400 tracking-tighter">{scoreLabel}</span>
          </div>
        </div>
      </div>

      {/* ── Metrics Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map(({ label, score, color, icon: Icon }) => (
          <div key={label} className="bg-bg-secondary border border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Icon size={14} className={`text-${color}-500`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
              </div>
              <span className={`text-xs font-black text-${color}-500`}>{score}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className={`h-full bg-${color}-500 transition-all duration-700`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Stats Row ── */}
      {scores.stats.totalBullets > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Bullets",       value: scores.stats.totalBullets },
            { label: "With Numbers",        value: scores.stats.quantifiedBullets },
            { label: "Strong Action Verbs", value: scores.stats.impactBullets },
          ].map(({ label, value }) => (
            <div key={label} className="bg-bg-secondary border border-white/5 rounded-2xl p-5 text-center">
              <p className="text-2xl font-black text-white mb-1">{value}</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Issues List ── */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
          Feedback &amp; Improvements
        </h3>

        {issues.map((issue) => (
          <div
            key={issue.id}
            className="group bg-bg-secondary border border-white/5 rounded-2xl p-6 shadow-sm hover:border-primary/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                issue.type === "error"   ? "bg-red-500/10 text-red-400"     :
                issue.type === "warning" ? "bg-amber-500/10 text-amber-400" :
                issue.type === "success" ? "bg-emerald-500/10 text-emerald-400" :
                "bg-blue-500/10 text-blue-400"
              }`}>
                {issue.type === "error"   ? <AlertCircle size={20} /> :
                 issue.type === "warning" ? <Info size={20} />        :
                 <CheckCircle2 size={20} />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-black text-sm text-white">{issue.title}</h4>
                  {issue.impact !== "Info" && (
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md border ${
                      issue.impact === "High"   ? "border-red-500/20 text-red-400 bg-red-500/10"     :
                      issue.impact === "Medium" ? "border-amber-500/20 text-amber-400 bg-amber-500/10" :
                      "border-slate-800 text-slate-400 bg-slate-900"
                    }`}>
                      {issue.impact} Impact
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{issue.description}</p>

                {issue.type !== "success" && (
                  <button className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap size={12} /> Fix with AI Intent
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeAnalyzerView;
