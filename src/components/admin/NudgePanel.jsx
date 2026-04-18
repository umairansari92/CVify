import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaLightbulb, FaExclamationTriangle, FaChevronRight } from "react-icons/fa";

const NudgePanel = ({ insights, loading }) => {
  const severityConfig = {
    CRITICAL: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
    HIGH: { color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
    MEDIUM: { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    LOW: { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    INFO: { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  };

  return (
    <div className="premium-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <FaLightbulb />
          </div>
          <div>
            <h3 className="text-xl font-black text-text-primary tracking-tight uppercase">AI Insights</h3>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Real-time platform nudges</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-text-muted uppercase tracking-widest border border-white/5">
          {insights.length} Alerts
        </span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4">
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : insights.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-40 text-center px-4">
            <FaLightbulb className="text-4xl mb-4" />
            <p className="text-xs font-bold uppercase tracking-widest">System is healthy. No nudges detected at this time.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {insights.map((nudge, idx) => {
              const config = severityConfig[nudge.severity] || severityConfig.INFO;
              return (
                <m.div
                  key={nudge._id || idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-5 rounded-2xl border ${config.bg} ${config.border} group hover:scale-[1.02] transition-all cursor-pointer`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaExclamationTriangle className={`text-[10px] ${config.color}`} />
                    <span className={`text-[9px] font-black uppercase tracking-widest ${config.color}`}>
                      {nudge.category.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-text-primary leading-tight mb-2 group-hover:text-primary transition-colors">
                    {nudge.title}
                  </h4>
                  <p className="text-xs text-text-secondary font-medium line-clamp-2 mb-3">
                    {nudge.message}
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest opacity-60">
                    <span>{nudge.severity}</span>
                    <div className="flex items-center gap-1 group-hover:gap-2 transition-all">
                      <span>Take Action</span>
                      <FaChevronRight />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/5">
        <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted transition-all">
          View Forensic Logs
        </button>
      </div>
    </div>
  );
};

export default NudgePanel;
