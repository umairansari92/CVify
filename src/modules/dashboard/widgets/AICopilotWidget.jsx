import React from "react";
import Card from "../../../components/ui/Card";
import { FiZap, FiChevronRight, FiClock, FiCheck } from "react-icons/fi";

export const AICopilotWidget = ({ data, navigate }) => {
  const recommendations = data?.recommendations || [];

  return (
    <Card variant="elevated" className="!p-5 border border-border-subtle space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <FiZap size={14} />
          </div>
          <h3 className="text-sm font-bold text-text-primary tracking-tight">Today's AI Recommendations</h3>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            onClick={() => navigate(rec.path)}
            className="p-3.5 rounded-2xl bg-midground border border-border-subtle flex items-start justify-between gap-3 hover:border-primary/40 transition-all cursor-pointer group"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">{rec.title}</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase">
                  {rec.impact}
                </span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2 mb-1">{rec.description}</p>
              <div className="flex items-center gap-2 text-[10px] text-text-muted">
                <FiClock size={10} />
                <span>Est. {rec.estTime}</span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-bold shrink-0 self-center transition-all flex items-center gap-1">
              <span>{rec.actionText}</span>
              <FiChevronRight size={11} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};
