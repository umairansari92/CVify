import React from "react";

/**
 * StatGrid — Shared composite. 3-up or N-up stat display (views, projects, skills etc.)
 *
 * Props:
 *   stats: Array<{ label: string, value: string|number, icon?: ReactNode }>
 */
const StatGrid = ({ stats = [], className = "" }) => {
  if (!stats.length) return null;
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-${Math.min(stats.length, 4)} gap-4 ${className}`}>
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col items-center justify-center p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl text-center">
          {stat.icon && <div className="text-[var(--primary-color)] mb-1 text-xl">{stat.icon}</div>}
          <p className="text-2xl font-black text-[var(--text-primary)]">{stat.value}</p>
          <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest text-[var(--text-secondary)] mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatGrid;
