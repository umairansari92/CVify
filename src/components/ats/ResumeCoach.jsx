import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  AlertOctagon,
  Clock,
  ChevronDown,
  ChevronUp,
  Target,
  Crosshair,
  Lightbulb,
  Copy,
  Check,
  Zap,
  Brain,
  ArrowRight,
  Gauge,
  Rocket,
  Ban,
  Info,
  FileWarning,
  Sparkles,
} from 'lucide-react';

// ─── Alignment Meter ────────────────────────────────────────
const AlignmentMeter = ({ alignment }) => {
  if (!alignment) return null;

  const levelConfig = {
    High: {
      color: 'emerald',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      icon: ShieldCheck,
      glow: 'shadow-emerald-500/20',
      barWidth: '85%',
      barColor: 'from-emerald-500 to-green-400',
    },
    Medium: {
      color: 'amber',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-400',
      icon: Shield,
      glow: 'shadow-amber-500/20',
      barWidth: '55%',
      barColor: 'from-amber-500 to-yellow-400',
    },
    Low: {
      color: 'rose',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      text: 'text-rose-400',
      icon: ShieldAlert,
      glow: 'shadow-rose-500/20',
      barWidth: '25%',
      barColor: 'from-rose-500 to-red-400',
    },
  };

  const config = levelConfig[alignment.level] || levelConfig.Medium;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass p-6 rounded-[2rem] border ${config.border} ${config.bg} shadow-xl ${config.glow}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 ${config.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
          <Icon className={config.text} size={28} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted">
              Job Alignment
            </p>
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${config.border} ${config.text} ${config.bg}`}>
              {alignment.level} Match
            </span>
          </div>
          <p className="text-base font-bold text-text-primary leading-relaxed mb-3">
            {alignment.summary}
          </p>

          {/* Alignment Bar */}
          <div className="h-2.5 bg-white/5 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: config.barWidth }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={`h-full rounded-full bg-gradient-to-r ${config.barColor} shadow-glow`}
            />
          </div>

          {/* Apply Advice */}
          {alignment.applyAdvice && (
            <div className={`flex items-start gap-3 p-4 rounded-2xl ${config.bg} border ${config.border}`}>
              <Rocket size={14} className={`${config.text} flex-shrink-0 mt-0.5`} />
              <p className={`text-[11px] font-bold ${config.text} leading-relaxed`}>
                {alignment.applyAdvice}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Dealbreaker Alerts ─────────────────────────────────────
const DealbreakerAlerts = ({ dealbreakers }) => {
  if (!dealbreakers || dealbreakers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500">
          <AlertOctagon size={20} />
        </div>
        <div>
          <h3 className="text-xl font-black text-text-primary tracking-tight">Dealbreakers Detected</h3>
          <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Requirements that resume optimization cannot fix</p>
        </div>
      </div>

      {dealbreakers.map((db, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.1 }}
          className="glass p-6 rounded-[2rem] border-2 border-rose-500/30 bg-rose-500/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full blur-2xl" />
          <div className="flex items-start gap-4">
            <Ban size={18} className="text-rose-500 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h4 className="text-sm font-black text-rose-400">
                {db.requirement}
              </h4>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="font-bold text-text-muted">Your Resume:</span>
                <span className="font-bold text-rose-400/80">{db.resumeStatus}</span>
              </div>
              <p className="text-[11px] font-medium text-text-secondary leading-relaxed mt-2 p-3 bg-rose-500/5 rounded-xl border border-rose-500/10">
                💡 {db.advice}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ─── Experience Gap Detector ────────────────────────────────
const ExperienceGapDetector = ({ gap }) => {
  if (!gap || gap.gapSeverity === 'None') return null;

  const severityConfig = {
    Minor: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', label: 'Minor Gap' },
    Moderate: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Moderate Gap' },
    Critical: { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', label: 'Critical Gap' },
  };

  const config = severityConfig[gap.gapSeverity] || severityConfig.Moderate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <TrendingUp size={20} />
        </div>
        <div>
          <h3 className="text-xl font-black text-text-primary tracking-tight">Experience Gap Analysis</h3>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">JD requirements vs your resume</p>
        </div>
      </div>

      <div className="glass p-6 rounded-[2rem] border border-white/5 space-y-5">
        {/* Visual Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2">JD Requires</p>
            <p className="text-sm font-black text-text-primary">{gap.jdRequires}</p>
          </div>
          <div className={`p-4 rounded-2xl ${config.bg} border ${config.border}`}>
            <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${config.color} mb-2`}>Your Resume Shows</p>
            <p className="text-sm font-black text-text-primary">{gap.resumeShows}</p>
          </div>
        </div>

        {/* Severity Badge */}
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider border ${config.border} ${config.color} ${config.bg}`}>
            {config.label}
          </span>
        </div>

        {/* Strategies */}
        {gap.strategies && gap.strategies.length > 0 && (
          <div className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Bridging Strategies</p>
            {gap.strategies.map((strategy, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                <Lightbulb size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold text-text-secondary leading-relaxed">{strategy}</p>
              </div>
            ))}
          </div>
        )}

        {/* Recruiter Perception */}
        {gap.recruiterPerception && (
          <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Info size={12} className="text-purple-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-400">Recruiter Would Think</span>
            </div>
            <p className="text-[11px] font-bold text-text-primary leading-relaxed italic">
              "{gap.recruiterPerception}"
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Copy Button Helper ─────────────────────────────────────
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-primary/10 text-text-muted hover:text-primary transition-all text-[9px] font-bold uppercase tracking-wider"
    >
      {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

// ─── Section Loopholes ──────────────────────────────────────
const SectionLoopholes = ({ loopholes }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!loopholes || loopholes.length === 0) return null;

  const sectionIcons = {
    Summary: Brain,
    Experience: Crosshair,
    Skills: Zap,
    Education: Sparkles,
    Projects: Rocket,
  };

  const severityConfig = {
    High: { badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20', dot: 'bg-rose-500' },
    Medium: { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', dot: 'bg-amber-500' },
    Low: { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: 'bg-blue-500' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
          <FileWarning size={20} />
        </div>
        <div>
          <h3 className="text-xl font-black text-text-primary tracking-tight">Section Loopholes</h3>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
            Issues found in your resume sections — with copy-paste fixes
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {loopholes.map((loophole, i) => {
          const SectionIcon = sectionIcons[loophole.section] || Target;
          const severity = severityConfig[loophole.severity] || severityConfig.Medium;
          const isExpanded = expandedIndex === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
              className="glass rounded-[2rem] border border-white/5 overflow-hidden hover:border-white/10 transition-all"
            >
              {/* Header (always visible) */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className="w-full p-5 flex items-center gap-4 text-left"
              >
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <SectionIcon size={18} className="text-text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-black text-text-primary">{loophole.section}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-wider border ${severity.badge}`}>
                      {loophole.severity}
                    </span>
                    {loophole.expectedImpact && (
                      <span className="px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {loophole.expectedImpact}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-medium text-text-muted truncate">{loophole.issue}</p>
                </div>
                <div className="flex-shrink-0 text-text-muted">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-4">
                      {/* Before */}
                      {loophole.currentText && (
                        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 text-[8px] font-black uppercase rounded-full">
                              Current
                            </span>
                          </div>
                          <p className="text-[11px] font-medium text-text-secondary leading-relaxed line-through opacity-70">
                            {loophole.currentText}
                          </p>
                        </div>
                      )}

                      {/* After */}
                      {loophole.suggestedFix && (
                        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase rounded-full">
                              Suggested Fix
                            </span>
                            <CopyButton text={loophole.suggestedFix} />
                          </div>
                          <p className="text-[11px] font-bold text-text-primary leading-relaxed">
                            {loophole.suggestedFix}
                          </p>
                        </div>
                      )}

                      {/* Reality Check */}
                      {loophole.realityCheck && (
                        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield size={12} className="text-amber-400" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-400">
                              Reality Check
                            </span>
                          </div>
                          <p className="text-[11px] font-medium text-amber-400/80 leading-relaxed">
                            {loophole.realityCheck}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// ─── Quick Wins ─────────────────────────────────────────────
const QuickWins = ({ wins }) => {
  if (!wins || wins.length === 0) return null;

  const impactColors = {
    High: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  // Extract base impact level from strings like "High (+5-8 points)"
  const getImpactLevel = (impact) => {
    if (!impact) return 'Medium';
    const str = typeof impact === 'string' ? impact : '';
    if (str.toLowerCase().startsWith('high')) return 'High';
    if (str.toLowerCase().startsWith('low')) return 'Low';
    return 'Medium';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
          <Zap size={20} />
        </div>
        <div>
          <h3 className="text-xl font-black text-text-primary tracking-tight">Quick Wins</h3>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
            Fastest fixes ranked by impact — do these first
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {[...wins]
          .sort((a, b) => (a.rank || 0) - (b.rank || 0))
          .map((win, i) => {
            const impactLevel = getImpactLevel(win.impact);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="glass p-5 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  {/* Rank Number */}
                  <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-black text-primary">{win.rank || i + 1}</span>
                  </div>

                  <div className="flex-1 space-y-3">
                    {/* Action */}
                    <p className="text-sm font-black text-text-primary leading-relaxed">{win.action}</p>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-wider border ${impactColors[impactLevel]}`}>
                        {win.impact}
                      </span>
                      {win.effort && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-wider bg-white/5 text-text-muted border border-white/5">
                          <Clock size={9} /> {win.effort}
                        </span>
                      )}
                      {win.where && (
                        <span className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-wider bg-primary/5 text-primary/70 border border-primary/10">
                          📍 {win.where}
                        </span>
                      )}
                    </div>

                    {/* How To */}
                    {win.howTo && (
                      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <ArrowRight size={10} className="text-primary" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">How to do it</span>
                          </div>
                          <CopyButton text={win.howTo} />
                        </div>
                        <p className="text-[11px] font-bold text-text-primary leading-relaxed">
                          {win.howTo}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/5 opacity-40 group-hover:animate-shine" />
              </motion.div>
            );
          })}
      </div>
    </motion.div>
  );
};

// ─── Overall Strategy Banner ────────────────────────────────
const OverallStrategy = ({ strategy }) => {
  if (!strategy) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass p-6 rounded-[2rem] border border-primary/20 bg-primary/5"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Gauge size={22} className="text-primary" />
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-1">
            Your Game Plan
          </p>
          <p className="text-base font-bold text-text-primary leading-relaxed">
            {strategy}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const ResumeCoach = ({ coachingHints }) => {
  if (!coachingHints) return null;

  const {
    alignmentMeter,
    dealbreakers,
    experienceGap,
    sectionLoopholes,
    quickWins,
    overallStrategy,
  } = coachingHints;

  // Check if there's any coaching content to show
  const hasContent =
    alignmentMeter ||
    (dealbreakers && dealbreakers.length > 0) ||
    (experienceGap && experienceGap.gapSeverity !== 'None') ||
    (sectionLoopholes && sectionLoopholes.length > 0) ||
    (quickWins && quickWins.length > 0) ||
    overallStrategy;

  if (!hasContent) return null;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
          <Brain size={20} />
        </div>
        <div>
          <h3 className="text-xl font-black text-text-primary tracking-tight">AI Resume Coach</h3>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
            Personalized action plan to optimize your resume
          </p>
        </div>
      </div>

      {/* 1. Alignment Meter — always first */}
      <AlignmentMeter alignment={alignmentMeter} />

      {/* 2. Dealbreakers — critical, show early */}
      <DealbreakerAlerts dealbreakers={dealbreakers} />

      {/* 3. Experience Gap */}
      <ExperienceGapDetector gap={experienceGap} />

      {/* 4. Section Loopholes */}
      <SectionLoopholes loopholes={sectionLoopholes} />

      {/* 5. Quick Wins */}
      <QuickWins wins={quickWins} />

      {/* 6. Overall Strategy — always last */}
      <OverallStrategy strategy={overallStrategy} />
    </div>
  );
};

export default ResumeCoach;
