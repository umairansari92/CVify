import React from "react";
import Card from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { FiClock, FiFileText, FiSearch, FiCheckCircle } from "react-icons/fi";

export const ActivityTimelineWidget = ({ data }) => {
  const timeline = data?.timeline || [];

  return (
    <Card variant="elevated" className="!p-5 border border-border-subtle space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-primary tracking-tight">Recent Activity Timeline</h3>
        <Badge variant="default">Live Feed</Badge>
      </div>

      {timeline.length === 0 ? (
        <p className="text-xs text-text-muted text-center py-6">No recent activity recorded.</p>
      ) : (
        <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-border-subtle">
          {timeline.map((event) => (
            <div key={event.id} className="flex items-start gap-3 relative z-10 pl-1">
              <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                <FiCheckCircle size={10} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-text-primary truncate">{event.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-text-muted flex items-center gap-1">
                    <FiClock size={9} />
                    {event.timeLabel}
                  </span>
                  {event.badge && (
                    <span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary text-[9px] font-bold">
                      {event.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
