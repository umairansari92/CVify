import React from "react";

/**
 * Timeline — Shared composite. Vertical timeline for Experience and Education sections.
 *
 * Props:
 *   items: Array<{
 *     _id, title, subtitle, location, startDate, endDate, current,
 *     description: string[], achievements: string[]
 *   }>
 *   accentColor: string — passed directly since this is theme-agnostic
 */
const Timeline = ({ items = [], accentColor }) => {
  if (!items.length) return null;

  const accent = accentColor || "var(--primary-color)";

  const formatDate = (d) => {
    if (!d) return null;
    try {
      return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch { return d; }
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px opacity-20" style={{ background: accent }} />

      <div className="space-y-10 pl-12">
        {items.map((item, i) => (
          <div key={item._id || i} className="relative">
            {/* Dot */}
            <div
              className="absolute -left-8 top-1.5 w-3 h-3 rounded-full ring-2 ring-[var(--bg-primary)]"
              style={{ background: accent }}
            />

            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 text-[var(--text-secondary)]">
                {formatDate(item.startDate)}
                {" — "}
                {item.current ? "Present" : (formatDate(item.endDate) || "—")}
                {item.location && ` · ${item.location}`}
              </p>

              <h3 className="text-lg font-black text-[var(--text-primary)] leading-tight">
                {item.title}
              </h3>

              {item.subtitle && (
                <p className="text-sm font-bold opacity-60 text-[var(--text-secondary)]">
                  {item.subtitle}
                </p>
              )}

              {Array.isArray(item.description) && item.description.length > 0 && (
                <div className="mt-2 space-y-1">
                  {item.description.map((d, di) => (
                    <p key={di} className="text-sm text-[var(--text-secondary)] leading-relaxed">{d}</p>
                  ))}
                </div>
              )}

              {Array.isArray(item.achievements) && item.achievements.length > 0 && (
                <ul className="mt-2 space-y-1 pl-4">
                  {item.achievements.map((a, ai) => (
                    <li key={ai} className="text-sm text-[var(--text-secondary)] list-disc leading-relaxed">{a}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
