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
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4 text-[var(--text-primary)]">
        <div className="w-16 h-16 bg-[var(--surface-muted)] border border-[var(--border)] rounded-2xl flex items-center justify-center text-[var(--text-muted)]">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">No Intelligence Scan Report Available</h2>
        <p className="text-xs text-[var(--text-secondary)] max-w-md">
          You haven't run an ATS scan yet. Launch the workspace scanner to generate your complete Mission Debrief report.
        </p>
        <Link
          to="/ats/scan"
          className="px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
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

  const bulletFixes =
    Array.isArray(result.bulletPointImprovements) && result.bulletPointImprovements.length > 0
      ? result.bulletPointImprovements
      : Array.isArray(result.bulletImprovements) && result.bulletImprovements.length > 0
      ? result.bulletImprovements
      : Array.isArray(result.actionVerbs?.weakVerbsFound)
      ? result.actionVerbs.weakVerbsFound.map((v) => ({
          original: `Used weak verb: "${v}"`,
          improved: `Replace with quantified impact: "Architected / Engineered / Scaled..."`,
          rationale: "Enterprise ATS filters prioritize strong leadership action verbs.",
          section: "Experience",
        }))
      : [];

  const foundKeywords =
    Array.isArray(result.keywords?.present) && result.keywords.present.length > 0
      ? result.keywords.present
      : Array.isArray(result.keywordsFound) && result.keywordsFound.length > 0
      ? result.keywordsFound
      : Array.isArray(result.skills?.found)
      ? result.skills.found
      : [];

  const rawMissing =
    Array.isArray(result.keywords?.missing) && result.keywords.missing.length > 0
      ? result.keywords.missing
      : Array.isArray(result.keywordsMissing) && result.keywordsMissing.length > 0
      ? result.keywordsMissing
      : Array.isArray(result.skills?.missing)
      ? result.skills.missing
      : [];

  const missingKeywords = useMemo(() => {
    return rawMissing.map((k) => (typeof k === "string" ? k : k?.keyword || k?.skill || k?.name || "")).filter(Boolean);
  }, [rawMissing]);

  const potentialScore =
    result.potentialScore ||
    result.estimatedPotentialScore ||
    (score < 85 ? Math.min(95, score + missingKeywords.length * 4 + 10) : null);

  const rawMissingObjects = useMemo(() => {
    return rawMissing.map((k) => {
      if (typeof k === "object" && k !== null) return k;
      return {
        keyword: k,
        category: "Required Skill",
        importance: "HIGH",
        recommendedSection: "Skills / Experience",
        suggestedContext: `Demonstrate hands-on application of ${k} with quantified metrics.`,
      };
    });
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

  let statusBadge = { label: "ACTION REQUIRED", color: "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20" };
  if (score >= 85) statusBadge = { label: "RECRUITER READY",  color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" };
  else if (score >= 70) statusBadge = { label: "COMPETITIVE", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" };

  const tabs = [
    { id: "overview",    label: "Mission Overview",  icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "breakdown",   label: "Score Report Card", icon: <Award className="w-3.5 h-3.5" /> },
    { id: "keywords",    label: "Keyword Matrix",    icon: <Target className="w-3.5 h-3.5" /> },
    { id: "recruiter",   label: "Recruiter Sim",     icon: <Eye className="w-3.5 h-3.5" /> },
    { id: "diagnostics", label: "Diagnostics",       icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: "evolution",   label: "Score Evolution",   icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6 py-2 max-w-5xl mx-auto text-[var(--text-primary)]">

      {/* ── 1. MISSION HEADER (Always Present) ──────────────────────────────── */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              MISSION DEBRIEF REPORT · v5.1 ENTERPRISE
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              ATS Intelligence Evaluation
            </h1>
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-1">
              Target Role: <span className="text-[var(--text-primary)] font-semibold">{result.targetRole || result.jobTitle || "Full Stack Engineer"}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-extrabold border ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
            <Link
              to="/ats/scan"
              className="px-4 py-2 rounded-xl bg-[var(--surface-muted)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] font-semibold text-xs border border-[var(--border)] transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Rescan
            </Link>
          </div>
        </div>

        {/* Top Metric Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[var(--surface-muted)] p-5 rounded-2xl border border-[var(--border)] flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-xs text-[var(--text-secondary)] font-semibold">Overall ATS Score</span>
            <span className={`text-4xl font-black tracking-tight ${score >= 85 ? "text-emerald-600 dark:text-emerald-400" : score >= 70 ? "text-amber-500" : "text-red-500"}`}>
              {score}%
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">Benchmark: 85%+</span>
            {potentialScore && (
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">Potential: {potentialScore}%</span>
            )}
          </div>

          <div className="bg-[var(--surface-muted)] p-5 rounded-2xl border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--text-secondary)] font-medium">Keyword Match</span>
              <span className="font-bold text-[var(--text-primary)]">{keywordScore}%</span>
            </div>
            <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden border border-[var(--border)]">
              <div className="bg-[var(--primary)] h-full rounded-full transition-all duration-500" style={{ width: `${keywordScore}%` }} />
            </div>
            <span className="text-[10px] text-[var(--text-muted)] block">Target Skill Distance</span>
          </div>

          <div className="bg-[var(--surface-muted)] p-5 rounded-2xl border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--text-secondary)] font-medium">Impact & Quantification</span>
              <span className="font-bold text-[var(--text-primary)]">{impactScore}%</span>
            </div>
            <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden border border-[var(--border)]">
              <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${impactScore}%` }} />
            </div>
            <span className="text-[10px] text-[var(--text-muted)] block">Metric density rate</span>
          </div>

          <div className="bg-[var(--surface-muted)] p-5 rounded-2xl border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--text-secondary)] font-medium">Formatting Safety</span>
              <span className="font-bold text-[var(--text-primary)]">{formattingScore}%</span>
            </div>
            <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden border border-[var(--border)]">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${formattingScore}%` }} />
            </div>
            <span className="text-[10px] text-[var(--text-muted)] block">DOM & font readability</span>
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
                ? "bg-[var(--primary)] text-white shadow-md shadow-emerald-500/20"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
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
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400">
                  <BarChart3 className="w-4 h-4" />
                  Alignment Meter — Actual vs Potential Score
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[var(--surface-muted)] p-4 rounded-xl border border-[var(--border)] space-y-1 text-center">
                    <span className="text-[var(--text-secondary)] block">Current Score</span>
                    <span className="text-3xl font-black text-red-500">{score}%</span>
                  </div>
                  <div className="bg-[var(--surface-muted)] p-4 rounded-xl border border-emerald-500/30 space-y-1 text-center">
                    <span className="text-[var(--text-secondary)] block">Potential After Fixes</span>
                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{potentialScore}%</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400">+{potentialScore - score}% gain possible</span>
                  </div>
                  <div className="bg-[var(--surface-muted)] p-4 rounded-xl border border-[var(--border)] space-y-2">
                    <span className="text-[var(--text-secondary)] block font-semibold">Alignment Level</span>
                    <span className={`text-sm font-bold block ${alignment.level === "HIGH" ? "text-emerald-600 dark:text-emerald-400" : alignment.level === "MEDIUM" ? "text-amber-500" : "text-red-500"}`}>
                      {alignment.level || "HIGH"}
                    </span>
                    {alignment.applyAdvice && (
                      <p className="text-[var(--text-secondary)] leading-relaxed text-[11px]">{alignment.applyAdvice}</p>
                    )}
                  </div>
                </div>
                {alignment.summary && (
                  <div className="bg-[var(--surface-muted)] p-4 rounded-xl border border-[var(--border)] text-xs text-[var(--text-primary)] leading-relaxed">
                    <span className="text-teal-600 dark:text-teal-400 font-bold block mb-1">Strategic Summary</span>
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
      <div className="text-center bg-[var(--surface)] border border-emerald-500/20 rounded-3xl p-8 space-y-4 shadow-sm">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">Apply Improvements & Re-Scan</h3>
        <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
          Updated your resume with missing keywords? Re-scanning within 24 hours costs 50% less (25 Diamonds).
        </p>
        <Link
          to="/ats/scan"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          Apply Fixes & Rescan Now
        </Link>
      </div>

    </div>
  );
};

export default React.memo(ATSReportsPage);
