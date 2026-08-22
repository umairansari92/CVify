import React from "react";
import { Link } from "react-router-dom";
import Card from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { FiClock, FiFileText, FiCheckCircle, FiChevronRight, FiActivity } from "react-icons/fi";

export const ActivityTimelineWidget = ({ data }) => {
  const timeline = data?.timeline || [];

  return (
    <Card variant="elevated" className="!p-5 border border-border-subtle flex flex-col justify-between h-full min-h-[360px] relative overflow-hidden group">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <FiActivity size={14} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary tracking-tight">Recent Activity Timeline</h3>
              <p className="text-[10px] text-text-muted">Real-time candidate telemetry</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Feed</span>
          </div>
        </div>

        {/* Timeline Events List */}
        {timeline.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <p className="text-xs text-text-muted">No recent activity recorded.</p>
            <p className="text-[11px] text-text-muted opacity-60">
              Create a resume or scan ATS to start tracking your activity.
            </p>
          </div>
        ) : (
          <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-border-subtle max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
            {timeline.map((event) => {
              const ItemWrapper = event.link ? Link : "div";
              const wrapperProps = event.link ? { to: event.link } : {};

              return (
                <ItemWrapper
                  key={event.id}
                  {...wrapperProps}
                  className="flex items-start gap-3 relative z-10 pl-1 p-2 rounded-xl hover:bg-white/5 transition-all group/item cursor-pointer block"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center text-[10px] shrink-0 mt-0.5 group-hover/item:scale-110 group-hover/item:bg-primary group-hover/item:text-white transition-all">
                    <FiCheckCircle size={10} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-text-primary truncate group-hover/item:text-primary transition-colors">
                        {event.title}
                      </p>
                      {event.link && (
                        <FiChevronRight size={12} className="text-text-muted opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-text-muted flex items-center gap-1 font-mono">
                        <FiClock size={9} />
                        {event.timeLabel}
                      </span>

                      {event.badge && (
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider ${
                            event.badgeType === "success"
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                              : event.badgeType === "warning"
                              ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                              : event.badgeType === "ai"
                              ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                              : "bg-primary/10 text-primary border border-primary/20"
                          }`}
                        >
                          {event.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </ItemWrapper>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer link to resumes */}
      <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[10px] text-text-muted">
        <span>Auto-sync active</span>
        <Link to="/resume/library" className="text-primary hover:underline flex items-center gap-1 font-bold">
          <span>Manage Resumes</span>
          <FiChevronRight size={10} />
        </Link>
      </div>
    </Card>
  );
};
