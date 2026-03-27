import React from "react";
import { motion } from "framer-motion";
import { 
  AlertCircle, 
  CheckCircle2, 
  ArrowRightCircle, 
  Zap,
  Target,
  Lightbulb
} from "lucide-react";

const KeywordGapAnalyzer = ({ missingKeywords = [] }) => {
  if (!missingKeywords || missingKeywords.length === 0) {
    return (
      <div className="p-8 glass rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 text-center">
        <CheckCircle2 className="text-emerald-500 mx-auto mb-4" size={40} />
        <h4 className="text-xl font-black text-emerald-400">Total Keyword Sync!</h4>
        <p className="text-sm text-text-secondary mt-2">Your resume is perfectly aligned with the job description keywords.</p>
      </div>
    );
  }

  const importanceColors = {
    High: "bg-red-500/10 text-red-500 border-red-500/20",
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Growth Opportunity": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Target size={20} />
        </div>
        <div>
          <h3 className="text-xl font-black text-text-primary tracking-tight">Keyword Gap Analyzer</h3>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Bridging the gap between you and the ATS</p>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {missingKeywords.map((gap, index) => (
          <motion.div 
            key={index}
            variants={item}
            className="glass p-6 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden"
          >
            {/* Importance HUD */}
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter border ${importanceColors[gap.importance] || importanceColors.Low}`}>
                {gap.importance} Priority
              </span>
              <AlertCircle size={16} className="text-text-muted group-hover:text-primary transition-colors" />
            </div>

            <h4 className="text-lg font-black text-text-primary mb-2 flex items-center gap-2">
              <Zap size={16} className="text-primary" />
              {gap.keyword}
            </h4>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="mt-1 text-primary shadow-glow rounded-full">
                  <ArrowRightCircle size={12} />
                </div>
                <p className="text-[11px] font-medium text-text-secondary leading-relaxed italic">
                  "{gap.reason}"
                </p>
              </div>

              <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 group-hover:bg-primary/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb size={12} className="text-amber-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary">Strategery Hook</span>
                </div>
                <p className="text-[11px] font-bold text-text-primary leading-relaxed">
                  {gap.action}
                </p>
              </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/5 opacity-40 group-hover:animate-shine" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default KeywordGapAnalyzer;
