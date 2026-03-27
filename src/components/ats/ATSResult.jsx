import React from 'react';
import ScoreCard from './ScoreCard';
import ScoreBreakdown from './ScoreBreakdown';
import KeywordGapAnalyzer from './KeywordGapAnalyzer';
import SuggestionsList from './SuggestionsList';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Quote,
  Lightbulb,
  Eye 
} from 'lucide-react';

const ATSResult = ({ data }) => {
  if (!data) return null;

  // Normalize data for both Real-time Response and History Model (ATSScan)
  const scoreSource = data.scores || data.score || {};
  const overall = data.overallScore || scoreSource.overall || 0;
  
  const normalizedScores = {
    formatting: scoreSource.formatting || 0,
    keywords: scoreSource.keywords || scoreSource.keywordMatch || 0,
    quantification: data.quantificationRate || scoreSource.quantification || 0,
    impact: scoreSource.impact || 0,
  };

  const feedback = data.feedback || {};
  const verdict = data.overallVerdict || "";
  const strongBullets = data.strongBullets || feedback.strongBullets || [];
  const weakBullets = data.weakBullets || feedback.weakBullets || [];
  const scoreJustifications = data.scoreJustifications || {};
  const detailedMetrics = data.detailedMetrics || {};

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-1000 pb-20">

      {/* === VERDICT BANNER === */}
      {verdict && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-[2rem] border border-primary/20 bg-primary/5 flex items-start gap-4"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="text-primary" size={22} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-1">
              AI Verdict
            </p>
            <p className="text-base font-bold text-text-primary leading-relaxed">
              {verdict}
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- SECTION 1: THE HUD (Scores) --- */}
        <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ScoreCard score={overall} />
          </div>
          <div className="lg:col-span-2">
            <ScoreBreakdown scores={normalizedScores} justifications={scoreJustifications} />
          </div>
        </div>

        {/* --- SECTION 2: STRONG BULLETS ✅ --- */}
        {strongBullets.length > 0 && (
          <div className="lg:col-span-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-text-primary tracking-tight">What You Did Right</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Your strongest resume lines</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strongBullets.map((bullet, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-5 rounded-[2rem] border border-emerald-500/10 hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex gap-3 mb-3">
                      <Quote size={14} className="text-emerald-500 flex-shrink-0 mt-1" />
                      <p className="text-sm font-bold text-text-primary leading-relaxed italic">
                        "{typeof bullet === 'string' ? bullet : bullet.quote}"
                      </p>
                    </div>
                    {bullet.why && (
                      <p className="text-[11px] font-medium text-emerald-400/80 pl-6 leading-relaxed">
                        ✓ {bullet.why}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- SECTION 3: WEAK BULLETS (Before → After) --- */}
        {weakBullets.length > 0 && (
          <div className="lg:col-span-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-text-primary tracking-tight">Bullets to Improve</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">AI-rewritten versions ready to copy</p>
                </div>
              </div>
              <div className="space-y-4">
                {weakBullets.map((bullet, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-6 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all"
                  >
                    {/* Before */}
                    <div className="flex gap-3 mb-4">
                      <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-[8px] font-black uppercase rounded-full flex-shrink-0 h-fit mt-1">Before</span>
                      <p className="text-sm font-medium text-text-secondary line-through opacity-70 leading-relaxed">
                        {typeof bullet === 'string' ? bullet : bullet.original}
                      </p>
                    </div>
                    {/* After */}
                    {bullet.rewritten && (
                      <div className="flex gap-3 mb-3">
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase rounded-full flex-shrink-0 h-fit mt-1">After</span>
                        <p className="text-sm font-bold text-text-primary leading-relaxed">
                          {bullet.rewritten}
                        </p>
                      </div>
                    )}
                    {/* Tip */}
                    {bullet.tip && (
                      <div className="mt-3 pl-14 flex items-start gap-2">
                        <Lightbulb size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] font-medium text-amber-400/80 leading-relaxed">{bullet.tip}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- SECTION 4: THE GAP ANALYZER --- */}
        <div className="lg:col-span-12">
          <KeywordGapAnalyzer missingKeywords={data.missingKeywords || feedback.missingKeywords} />
        </div>

        {/* --- SECTION 5: SUGGESTIONS --- */}
        <div className="lg:col-span-12">
          <SuggestionsList suggestions={data.suggestions} />
        </div>

        {/* --- SECTION 6: RECRUITER FIRST IMPRESSION --- */}
        {detailedMetrics.recruiterFirstImpression && (
          <div className="lg:col-span-12">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-[2rem] border border-purple-500/20 bg-purple-500/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye size={20} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-400 mb-1">
                    Recruiter's 6-Second First Impression
                  </p>
                  <p className="text-sm font-bold text-text-primary leading-relaxed">
                    {detailedMetrics.recruiterFirstImpression}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSResult;
