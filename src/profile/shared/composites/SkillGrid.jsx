import React from "react";
import Badge from "../primitives/Badge.jsx";

/**
 * SkillGrid — Shared composite. Renders skill categories with badge lists.
 *
 * Props:
 *   skills: { [category: string]: string[] } — from SkillsVM
 */
const SkillGrid = ({ skills = {} }) => {
  const entries = Object.entries(skills).filter(([, items]) => items?.length);
  if (!entries.length) return null;

  return (
    <div className="space-y-6">
      {entries.map(([category, items]) => (
        <div key={category}>
          {entries.length > 1 && (
            <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 text-[var(--text-secondary)] mb-3">
              {category}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {items.map((skill, i) => (
              <Badge key={i} variant="muted">{skill}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillGrid;
