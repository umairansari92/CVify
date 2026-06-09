import React from "react";
import Card from "./Card";

export const MetricCard = ({ title, value, subtext, trend, icon: Icon, className = "" }) => {
  return (
    <Card variant="glass" className={`!p-6 flex flex-col justify-between gap-4 ${className}`}>
      <div className="flex justify-between items-start">
        <div className="text-text-muted font-medium text-sm">{title}</div>
        {Icon && <Icon className="text-primary/60" size={20} />}
      </div>
      <div>
        <div className="text-3xl font-bold text-text-primary tracking-tight">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span className={`text-xs font-semibold ${trend > 0 ? "text-success" : "text-danger"}`}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
          )}
          {subtext && <span className="text-xs text-text-muted">{subtext}</span>}
        </div>
      </div>
    </Card>
  );
};
