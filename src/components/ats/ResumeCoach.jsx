import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyResumes } from '../../features/resume/resumeThunk';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
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
  Download,
  ExternalLink,
} from 'lucide-react';

// ─── Score Meter Component ──────────────────────────────────
const PotentialScoreMeter = ({ currentScore, potentialScore, progressPercentage }) => {
  return (
    <div className="glass p-6 rounded-[2.5rem] border border-primary/20 bg-primary/5 shadow-xl shadow-primary/5 space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-1">
            Optimization Progress
          </p>
          <h3 className="text-xl font-black text-text-primary">Road to {potentialScore}%</h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-primary">{Math.round(currentScore + (potentialScore - currentScore) * (progressPercentage / 100))}%</span>
          <span className="text-[10px] font-bold text-text-muted ml-2 uppercase">Estimated</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
        {/* Potential Target (Ghost Bar) */}
        <div 
          className="absolute inset-0 bg-primary/10 transition-all duration-1000"
          style={{ width: `${potentialScore}%` }}
        />
        {/* Actual Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${currentScore + (potentialScore - currentScore) * (progressPercentage / 100)}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          className="absolute inset-x-0 h-full bg-linear-to-r from-primary to-blue-500 shadow-glow rounded-full"
        />
        {/* Marker for Current Start */}
        <div 
          className="absolute h-full w-0.5 bg-white/30 z-10"
          style={{ left: `${currentScore}%` }}
        />
      </div>

      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-text-muted px-1">
        <span>Current: {currentScore}%</span>
        <span>Goal: {potentialScore}%</span>
      </div>
    </div>
  );
};

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
          <div className="flex items-start gap-4 text-left">
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
      <div className="flex items-center gap-3 text-left">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <TrendingUp size={20} />
        </div>
        <div>
          <h3 className="text-xl font-black text-text-primary tracking-tight">Experience Gap Analysis</h3>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">JD requirements vs your resume</p>
        </div>
      </div>

      <div className="glass p-6 rounded-[2rem] border border-white/5 space-y-5 text-left">
        {/* Visual Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2">JD Requires</p>
            <p className="text-sm font-black text-text-primary">{gap.jdRequires || gap.jdRequirement}</p>
          </div>
          <div className={`p-4 rounded-2xl ${config.bg} border ${config.border}`}>
            <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${config.color} mb-2`}>Your Resume Shows</p>
            <p className="text-sm font-black text-text-primary">{gap.resumeShows || gap.resumeValue}</p>
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

// ─── Helper Components ──────────────────────────────────────
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };
  return (
    <button onClick={handleCopy} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-primary/10 text-text-muted hover:text-primary transition-all text-[9px] font-bold uppercase tracking-wider">
      {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const FixInBuilderButton = ({ config, onClick }) => {
  if (!config) return null;
  
  const handleAction = (e) => {
    e.stopPropagation();
    onClick(config.step || 'summary');
  };

  return (
    <button 
      onClick={handleAction} 
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all text-[9px] font-black uppercase tracking-widest border border-primary/20 cursor-pointer"
    >
      <ExternalLink size={10} /> Fix in Builder
    </button>
  );
};

// ─── Selection Modal ────────────────────────────────────────
const ResumeSelectorModal = ({ isOpen, onClose, resumes, onSelect, onStartNew }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md glass border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden bg-slate-900/40"
      >
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary mb-4">
              <FileWarning size={32} />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">Select Resume to Edit</h3>
            <p className="text-sm font-medium text-slate-400">Choose which resume you want to optimize in a new tab.</p>
          </div>

          <div className="max-h-64 overflow-y-auto pr-2 space-y-3 no-scrollbar">
            {resumes.map((resume) => (
              <button
                key={resume._id}
                onClick={() => onSelect(resume._id)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group text-left"
              >
                <div>
                  <p className="font-black text-white text-sm group-hover:text-primary transition-colors">{resume.title || 'Untitled Resume'}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Template: {resume.templateId || 'Classic'}</p>
                </div>
                <ArrowRight size={16} className="text-slate-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
               onClick={onStartNew}
               className="w-full py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
            >
              Start New Resume & Fix
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-slate-500 font-black uppercase tracking-[0.2em] text-[9px] hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Checkbox = ({ id, checked, onChange }) => {
  return (
    <div 
      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
        checked ? 'bg-primary border-primary shadow-glow' : 'border-white/10 bg-white/5 hover:border-primary/30'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
    >
      {checked && <Check size={14} className="text-white" />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const ResumeCoach = ({ coachingHints, currentScore = 0, scanId = 'default' }) => {
  const dispatch = useDispatch();
  const { resumes, loading: resumesLoading } = useSelector((state) => state.resume);
  
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem(`cvify_coach_v4_${scanId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showSelector, setShowSelector] = useState(false);
  const [pendingStep, setPendingStep] = useState(null);

  useEffect(() => {
    dispatch(getMyResumes());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(`cvify_coach_v4_${scanId}`, JSON.stringify(checkedItems));
  }, [checkedItems, scanId]);

  const handleFixAction = (step) => {
    if (resumesLoading) return;

    if (!resumes || resumes.length === 0) {
      // No resumes - show choice
      Swal.fire({
        title: 'No Resumes Found',
        text: 'Build your resume on CVify to use interactive hints, or download the strategic report for offline editing.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Build on CVify',
        cancelButtonText: 'Download Report',
        background: '#0f172a',
        color: '#f1f5f9',
        customClass: {
          popup: 'rounded-[2rem] border border-white/10 glass',
          confirmButton: 'bg-primary px-6 py-3 rounded-xl font-bold',
          cancelButton: 'bg-white/5 px-6 py-3 rounded-xl font-bold border border-white/10'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(`/create?step=${step}`, '_blank');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          handleDownloadPDF();
        }
      });
      return;
    }

    if (resumes.length === 1) {
      // Direct access for single resume
      window.open(`/edit/${resumes[0]._id}?step=${step}`, '_blank');
    } else {
      // Multiple resumes - show selector
      setPendingStep(step);
      setShowSelector(true);
    }
  };

  const handleSelectResume = (id) => {
    window.open(`/edit/${id}?step=${pendingStep}`, '_blank');
    setShowSelector(false);
  };

  if (!coachingHints) return null;

  const {
      alignmentMeter,
      dealbreakers,
      experienceGap,
      sectionLoopholes,
      quickWins,
      overallStrategy,
      potentialTotalScore,
      recruiterImpression,
  } = coachingHints;

  const toggleItem = (id) => {
    setCheckedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const allItemsCount = (sectionLoopholes?.length || 0) + (quickWins?.length || 0);
  const progressPercentage = allItemsCount > 0 ? (checkedItems.length / allItemsCount) * 100 : 0;

  const handleDownloadPDF = () => {
    if (typeof jsPDF === 'undefined') {
       console.error("jsPDF is not loaded properly.");
       Swal.fire('Error', 'PDF Generator failed to initialize. Please refresh.', 'error');
       return;
    }
    const doc = new (jsPDF.jsPDF || jsPDF)();
    const primaryColor = '#3b82f6';
    const secondaryColor = '#1f2937';
    const roseColor = '#ef4444';
    const margin = 20;
    const pageWidth = 210;
    const contentWidth = pageWidth - (margin * 2);
    
    // Helper for wrapped text and yPos update
    const addWrappedText = (text, x, y, size, font = 'normal', color = secondaryColor, lineSpacing = 6) => {
      doc.setFont('helvetica', font);
      doc.setFontSize(size);
      doc.setTextColor(color);
      const lines = doc.splitTextToSize(text, contentWidth - (x - margin));
      doc.text(lines, x, y);
      return y + (lines.length * lineSpacing);
    };

    // Header
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor('#ffffff');
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('CVify Pro — AI Resume Strategy', margin, 25);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on ${new Date().toLocaleDateString()} | Scan ID: ${scanId}`, margin, 32);

    let yPos = 55;

    // 1. Strategic Overview
    doc.setTextColor(secondaryColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Strategic Overview', margin, yPos);
    yPos += 12;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Start Score: ${currentScore}%`, margin + 5, yPos);
    doc.text(`Potential Score: ${potentialTotalScore}%`, margin + 80, yPos);
    yPos += 8;
    doc.text(`Job Alignment: ${alignmentMeter?.level || 'N/A'}`, margin + 5, yPos);
    yPos += 15;

    // 2. Dealbreakers
    if (dealbreakers?.length > 0) {
      doc.setTextColor(roseColor);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('! Critical Dealbreakers', margin, yPos);
      yPos += 10;
      
      dealbreakers.forEach(db => {
        if (yPos > 270) { doc.addPage(); yPos = 20; }
        yPos = addWrappedText(`• ${db.requirement}: ${db.advice}`, margin + 5, yPos, 10, 'normal', '#4b5563', 5);
        yPos += 4;
      });
      yPos += 8;
    }

    // 3. Section Loopholes
    doc.setTextColor(secondaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Section Optimization Checklist', margin, yPos);
    yPos += 12;

    sectionLoopholes?.forEach((item, index) => {
      if (yPos > 250) { doc.addPage(); yPos = 20; }
      
      // Section Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(secondaryColor);
      doc.text(`${index + 1}. ${item.section} (${item.severity})`, margin + 5, yPos);
      yPos += 7;

      // Issue Text
      yPos = addWrappedText(`Issue: ${item.issue}`, margin + 10, yPos, 10, 'normal', '#4b5563', 5);
      yPos += 2;

      // Suggested Fix
      yPos = addWrappedText(`Suggested Change: ${item.suggestedFix}`, margin + 10, yPos, 10, 'bold', primaryColor, 5);
      yPos += 12;
    });

    // 4. Final Action Strategy
    if (yPos > 240) { doc.addPage(); yPos = 20; }
    doc.setFillColor('#f8fafc');
    doc.setDrawColor('#e2e8f0');
    doc.roundedRect(margin - 5, yPos, contentWidth + 10, 35, 5, 5, 'FD');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor);
    doc.text('Final Action Strategy:', margin, yPos + 12);
    
    yPos = addWrappedText(overallStrategy || 'Follow the checklist above to maximize your reach.', margin, yPos + 22, 10, 'normal', '#334155', 5);

    doc.save(`CVify_Strategy_${scanId.slice(0, 8)}.pdf`);
  };

  return (
    <div className="space-y-8 pb-20 overflow-visible text-left">
      {/* 1. Header & Section Intro */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
            <Brain size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-text-primary tracking-tight">AI Resume Coach <span className="text-primary tracking-normal ml-2">PRO</span></h3>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">Scientific Alignment & Optimization Engine</p>
          </div>
        </div>
        <button 
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-5 py-3 glass rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-[10px] font-black uppercase tracking-widest text-text-primary group"
        >
          <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Download PDF Report
        </button>
      </div>

      {/* 2. Scientific Metrics (Alignment + Potential Score) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <AlignmentMeter alignment={alignmentMeter} />
        <PotentialScoreMeter 
          currentScore={currentScore} 
          potentialScore={potentialTotalScore || currentScore + 15} 
          progressPercentage={progressPercentage}
        />
      </div>

      {/* 3. Recruiter Impression - The "Human" Insight */}
      {recruiterImpression && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-6 rounded-[2rem] border-2 border-dashed border-purple-500/20 bg-purple-500/5 relative overflow-hidden group">
            <div className="flex items-start gap-4">
               <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles size={18} className="text-purple-400" />
               </div>
               <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-400 mb-1">Recruiter First Impression (Fixed Version)</p>
                  <p className="text-sm font-bold text-text-primary leading-relaxed">{recruiterImpression}</p>
               </div>
            </div>
            {/* Shine effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/5 opacity-40 group-hover:animate-shine" />
        </motion.div>
      )}

      {/* 4. Dealbreakers & Gap Detection */}
      {(dealbreakers?.length > 0 || (experienceGap && experienceGap.gapSeverity !== 'None')) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <DealbreakerAlerts dealbreakers={dealbreakers} />
            <ExperienceGapDetector gap={experienceGap} />
        </div>
      )}

      {/* 5. Section Loopholes (Checklist) */}
      {sectionLoopholes?.length > 0 && (
         <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                  <FileWarning size={20} />
               </div>
               <div>
                  <h3 className="text-xl font-black text-text-primary tracking-tight">Loophole Checklist</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Mark as fixed to see your score grow</p>
               </div>
            </div>
            <div className="space-y-3">
               {sectionLoopholes.map((item, i) => {
                  const id = `loophole_${i}`;
                  const checked = checkedItems.includes(id);
                  const isExpanded = expandedIndex === id;
                  return (
                    <motion.div key={id} className={`glass rounded-[2rem] border transition-all ${checked ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5 bg-white/5 hover:border-white/10'}`}>
                        <div className="p-5 flex items-center gap-4 cursor-pointer" onClick={() => setExpandedIndex(isExpanded ? null : id)}>
                           <Checkbox id={id} checked={checked} onChange={() => toggleItem(id)} />
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                 <h4 className={`text-sm font-black transition-all ${checked ? 'text-emerald-400 line-through opacity-50' : 'text-text-primary'}`}>{item.section}</h4>
                                 <span className="px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-wider bg-white/5 text-text-muted border border-white/5">{item.severity}</span>
                                 {item.expectedImpact && <span className="text-[8px] font-black text-emerald-400">{item.expectedImpact}</span>}
                              </div>
                              <p className={`text-[11px] font-medium truncate ${checked ? 'text-emerald-400/50' : 'text-text-muted'}`}>{item.issue}</p>
                           </div>
                           <div className="text-text-muted">{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
                        </div>
                        <AnimatePresence>
                           {isExpanded && (
                             <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 pb-5 space-y-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                                   <div className="flex gap-2"><span className="text-rose-400 text-[8px] font-black tracking-widest uppercase">Issue</span><p className="text-[11px] font-medium text-text-secondary">{item.currentText}</p></div>
                                   <div className="flex justify-between items-start gap-3">
                                      <div className="flex flex-col gap-2">
                                         <span className="text-emerald-400 text-[8px] font-black tracking-widest uppercase">AI Rewrite</span>
                                         <p className="text-[11px] font-bold text-text-primary leading-relaxed">{item.suggestedFix}</p>
                                      </div>
                                      <div className="flex flex-col gap-2 items-end">
                                         <CopyButton text={item.suggestedFix} />
                                         <FixInBuilderButton config={item.fixInBuilder} onClick={handleFixAction} />
                                      </div>
                                   </div>
                                </div>
                                {item.realityCheck && (
                                   <div className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-3 text-left">
                                      <Shield size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                      <p className="text-[10px] font-medium text-amber-400/80 italic">{item.realityCheck}</p>
                                   </div>
                                )}
                             </motion.div>
                           )}
                        </AnimatePresence>
                    </motion.div>
                  );
               })}
            </div>
         </div>
      )}

      {/* 6. Quick Wins Checklist */}
      {quickWins?.length > 0 && (
         <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Zap size={20} />
               </div>
               <div>
                  <h3 className="text-xl font-black text-text-primary tracking-tight">Quick Wins</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Low effort, high impact fixes</p>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {quickWins.map((win, i) => {
                  const id = `win_${i}`;
                  const checked = checkedItems.includes(id);
                  return (
                    <div key={id} className={`glass p-5 rounded-[3rem] border transition-all relative overflow-hidden group ${checked ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5 bg-white/5 hover:border-primary/20'}`}>
                        <div className="flex items-start gap-4">
                           <Checkbox id={id} checked={checked} onChange={() => toggleItem(id)} />
                           <div className="space-y-3 flex-1 min-w-0">
                               <p className={`text-sm font-black leading-tight ${checked ? 'text-emerald-400/50 line-through' : 'text-text-primary'}`}>{win.action}</p>
                               <div className="flex flex-wrap gap-2">
                                  <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400">{win.impact}</span>
                                  <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-white/5 text-text-muted flex items-center gap-1"><Clock size={9}/> {win.effort}</span>
                               </div>
                               {!checked && win.howTo && (
                                 <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold text-text-secondary leading-relaxed group-hover:bg-white/10 transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                       <span className="text-primary text-[7px] uppercase tracking-widest">Instruction</span>
                                       <div className="flex gap-2">
                                          <CopyButton text={win.howTo} />
                                          <FixInBuilderButton config={win.fixInBuilder} onClick={handleFixAction} />
                                       </div>
                                    </div>
                                    {win.howTo}
                                 </div>
                               )}
                           </div>
                        </div>
                    </div>
                  );
               })}
            </div>
         </div>
      )}

      {/* 7. Overall Strategy Final Verdict */}
      <OverallStrategy strategy={overallStrategy} />

      {/* 8. Selection Modal */}
      <AnimatePresence>
        <ResumeSelectorModal 
          isOpen={showSelector}
          onClose={() => setShowSelector(false)}
          resumes={resumes}
          onSelect={handleSelectResume}
          onStartNew={() => {
            window.open(`/create?step=${pendingStep}`, '_blank');
            setShowSelector(false);
          }}
        />
      </AnimatePresence>
    </div>
  );
};

const OverallStrategy = ({ strategy }) => {
  if (!strategy) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-[3rem] border border-primary/20 bg-primary/5 shadow-2xl shadow-primary/10 relative overflow-hidden group">
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 bg-primary/10 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 animate-pulse">
          <Target size={26} className="text-primary" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Final Strategic Verdict</p>
          <p className="text-lg font-black text-text-primary leading-relaxed">{strategy}</p>
        </div>
      </div>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/5 opacity-40 group-hover:animate-shine" />
    </motion.div>
  );
};

export default ResumeCoach;
