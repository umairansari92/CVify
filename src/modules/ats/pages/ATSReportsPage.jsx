import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Sparkles,
  FileText,
  RefreshCw,
  Target,
  Zap,
  Eye,
  TrendingUp,
  BarChart3,
  BookOpen,
  Cpu,
  Layers,
  Award,
  ShieldCheck,
  Activity,
  History,
} from "lucide-react";

// Modular Report Components
import ATSScoreBreakdownCard from "../components/reports/ATSScoreBreakdownCard";
import KeywordMatrix from "../components/reports/KeywordMatrix";
import JDIntelligenceCard from "../components/reports/JDIntelligenceCard";
import SkillCoverageGraph from "../components/reports/SkillCoverageGraph";
import SectionHeatmapCard from "../components/reports/SectionHeatmapCard";
import AIRewriteDiffPreview from "../components/reports/AIRewriteDiffPreview";
import ConfidenceCard from "../components/reports/ConfidenceCard";
import PipelineDiagnosticsCard from "../components/reports/PipelineDiagnosticsCard";
import RecruiterSimulationCard from "../components/reports/RecruiterSimulationCard";
import ImprovementImpactCard from "../components/reports/ImprovementImpactCard";
import ScanEvolutionCard from "../components/reports/ScanEvolutionCard";
import DeepRecommendationCard from "../components/reports/DeepRecommendationCard";

const ATSReportsPage = () => {
  const { latestResult: result, history } = useSelector((state) => state.ats);
  const [activeTab, setActiveTab] = useState("overview");

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

  // ── Robust Data Extraction (100% Backward Compatible) ────────────────────
  const score =
    result.overallScore ||
    result.atsScore ||
    result.score?.overall ||
    (typeof result.score === "number" ? result.score : 0);

  const keywordScore =
    result.scores?.keywords ??
    result.scores?.keywordMatch ??
    result.score?.keywordMatch ??
    result.categoryScores?.keywords ??
    result.keywordScore ??
    result.keywordMatch ??
    0;

  const impactScore =
    result.scores?.impact ??
    result.scores?.quantification ??
    result.score?.impact ??
    result.score?.quantification ??
    result.score?.relevance ??
    result.categoryScores?.impact ??
    result.quantificationRate ??
    result.impactScore ??
    0;

  const formattingScore =
    result.scores?.formatting ??
    result.score?.formatting ??
    result.score?.structure ??
    result.categoryScores?.formatting ??
    result.formattingScore ??
    0;

  const coaching      = result.coachingHints || result.coaching || {};
  const alignment     = coaching.alignmentMeter || {};
  const dealbreakers  = Array.isArray(coaching.dealbreakers)    ? coaching.dealbreakers    : [];
  const loopholes     = Array.isArray(coaching.sectionLoopholes)? coaching.sectionLoopholes: [];
  const quickWins     = Array.isArray(coaching.quickWins)       ? coaching.quickWins        : [];
  const expGap        = coaching.experienceGap || {};
  const potentialScore= coaching.potentialTotalScore || Math.min(100, score + 16);
  const bulletFixes   = Array.isArray(result.bulletFixes)       ? result.bulletFixes        :
                        Array.isArray(result.weakBullets)        ? result.weakBullets        : [];

  const rawFound =
    result.foundKeywords ||
    result.feedback?.positives ||
    result.feedback?.foundKeywords ||
    result.keywordAnalysis?.found ||
    result.localMetrics?.found ||
    result.found ||
    [];

  const foundKeywords = useMemo(() => {
    return Array.isArray(rawFound)
      ? rawFound
          .map((k) => (typeof k === "string" ? k : k?.keyword || k?.name || k?.text || ""))
          .filter((k) => k && typeof k === "string" && !k.startsWith("http") && k.length < 50)
      : [];
  }, [rawFound]);

  const rawMissing =
    result.missingKeywords ||
    result.feedback?.missingKeywords ||
    result.keywordAnalysis?.missing ||
    result.localMetrics?.missing ||
    result.keywordGaps ||
    [];

  const missingKeywords = useMemo(() => {
    return Array.isArray(rawMissing)
      ? rawMissing
          .map((k) => (typeof k === "string" ? k : k?.keyword || k?.name || k?.text || ""))
          .filter((k) => k && typeof k === "string" && k.length < 50)
      : [];
  }, [rawMissing]);

  const rawMissingObjects = useMemo(() => {
    return Array.isArray(rawMissing) ? rawMissing.filter((k) => typeof k === "object" && k !== null) : [];
  }, [rawMissing]);

  const headlineAdvantage =
    result.recruiterImpression?.advantage ||
    result.feedback?.positives?.[0] ||
    result.overallVerdict ||
    result.detailedMetrics?.recruiterFirstImpression ||
    "Strong technical foundation in modern stack.";

  const secondaryFlag =
    result.recruiterImpression?.flag ||
    loopholes[0]?.issue ||
    result.scoreJustifications?.quantification ||
    result.feedback?.improvements?.[0] ||
    "Work experience bullets lack concrete metrics (DAU scale, latency numbers).";

  const primaryRisk =
    result.recruiterImpression?.risk ||
    dealbreakers[0]?.requirement ||
    (missingKeywords.length > 0 ? `Missing critical keywords: ${missingKeywords.slice(0, 3).join(", ")}` : null) ||
    result.scoreJustifications?.keywordMatch ||
    "Missing essential role keywords or cloud credentials.";

  let statusBadge = { label: "ACTION REQUIRED", color: "bg-red-500/10 text-red-400 border-red-500/20" };
  if (score >= 85) statusBadge = { label: "RECRUITER READY",  color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
  else if (score >= 70) statusBadge = { label: "COMPETITIVE", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" };

  const tabs = [
    { id: "overview",    label: "Mission Overview",  icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "breakdown",   label: "Score Report Card", icon: <Award className="w-3.5 h-3.5" /> },
    { id: "keywords",    label: "Keyword Matrix",    icon: <Target className="w-3.5 h-3.5" /> },
    { id: "recruiter",   label: "Recruiter Sim",     icon: <Eye className="w-3.5 h-3.5" /> },
    { id: "diagnostics", label: "Diagnostics",       icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: "evolution",   label: "Score Evolution",   icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6 py-2 max-w-5xl mx-auto">

      {/* ── 1. MISSION HEADER (Always Present) ──────────────────────────────── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              MISSION DEBRIEF REPORT · v5.1 ENTERPRISE
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

        {/* Top Metric Meters */}
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
              <span className="font-bold text-slate-200">{keywordScore}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${keywordScore}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 block">Target Skill Distance</span>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Impact & Quantification</span>
              <span className="font-bold text-slate-200">{impactScore}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${impactScore}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 block">Metric density rate</span>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Formatting Safety</span>
              <span className="font-bold text-slate-200">{formattingScore}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${formattingScore}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 block">DOM & font readability</span>
          </div>
        </div>
      </div>

      {/* ── 2. ENTERPRISE TABBED NAVIGATION ─────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 3. TAB CONTENT PANELS ───────────────────────────────────────────── */}
      <div className="space-y-6">

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Alignment Meter */}
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
                    <span className="text-3xl font-black text-emerald-400">{potentialScore}%</span>
                    <span className="text-[10px] text-emerald-500">+{potentialScore - score}% gain possible</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-slate-400 block font-semibold">Alignment Level</span>
                    <span className={`text-sm font-bold block ${alignment.level === "HIGH" ? "text-emerald-400" : alignment.level === "MEDIUM" ? "text-amber-400" : "text-red-400"}`}>
                      {alignment.level || "HIGH"}
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

            {/* Section Heatmap */}
            <SectionHeatmapCard
              loopholes={loopholes}
              bulletFixes={bulletFixes}
              keywordScore={keywordScore}
              impactScore={impactScore}
              formattingScore={formattingScore}
            />

            {/* Deep Recommendations */}
            <DeepRecommendationCard
              quickWins={quickWins}
              loopholes={loopholes}
              dealbreakers={dealbreakers}
            />

            {/* AI Rewrite Diff Preview */}
            <AIRewriteDiffPreview bulletFixes={bulletFixes} />
          </div>
        )}

        {/* TAB 2: SCORE BREAKDOWN */}
        {activeTab === "breakdown" && (
          <ATSScoreBreakdownCard
            result={result}
            score={score}
            keywordScore={keywordScore}
            impactScore={impactScore}
            formattingScore={formattingScore}
          />
        )}

        {/* TAB 3: KEYWORDS & SKILLS */}
        {activeTab === "keywords" && (
          <div className="space-y-6">
            <KeywordMatrix
              foundKeywords={foundKeywords}
              missingKeywords={missingKeywords}
              rawMissingObjects={rawMissingObjects}
            />
            <SkillCoverageGraph
              foundKeywords={foundKeywords}
              missingKeywords={missingKeywords}
            />
          </div>
        )}

        {/* TAB 4: RECRUITER VIEW & JD */}
        {activeTab === "recruiter" && (
          <div className="space-y-6">
            <JDIntelligenceCard
              targetRole={result.targetRole || result.jobTitle || "Full Stack Engineer"}
              experienceLevel={result.experienceLevel || "Mid-Level"}
              marketMode={result.marketMode || "Standard"}
              foundKeywords={foundKeywords}
              missingKeywords={missingKeywords}
            />
            <RecruiterSimulationCard
              headlineAdvantage={headlineAdvantage}
              secondaryFlag={secondaryFlag}
              primaryRisk={primaryRisk}
              score={score}
              overallVerdict={result.overallVerdict}
            />
          </div>
        )}

        {/* TAB 5: DIAGNOSTICS & PIPELINE */}
        {activeTab === "diagnostics" && (
          <div className="space-y-6">
            <PipelineDiagnosticsCard pipelineMeta={result.pipelineDiagnostics || result.metadata || {}} />
            <ConfidenceCard
              confidenceScore={result.confidenceScore || 94}
              certaintyGrade={result.certaintyGrade || "HIGH"}
              sectionMap={result.confidenceSectionMap || {}}
            />
          </div>
        )}

        {/* TAB 6: SCORE EVOLUTION */}
        {activeTab === "evolution" && (
          <div className="space-y-6">
            <ScanEvolutionCard historyList={history || []} currentScore={score} />
            <ImprovementImpactCard
              score={score}
              potentialScore={potentialScore}
              missingKeywords={missingKeywords}
              bulletFixes={bulletFixes}
              loopholes={loopholes}
            />
          </div>
        )}

      </div>

      {/* ── 4. RESCAN CTA ───────────────────────────────────────────────────── */}
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

export default React.memo(ATSReportsPage);
