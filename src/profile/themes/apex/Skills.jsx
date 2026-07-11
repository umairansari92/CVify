import React from "react";
import { tokens } from "./tokens";

const Skills = ({ user, isOwner }) => {
  // Handle both skill schemas — Object {technical, soft, strategic} OR Array [{name}]
  let skillGroups = {};
  if (Array.isArray(user?.skills)) {
    const all = user.skills.map((s) => s?.name || s).filter(Boolean);
    if (all.length > 0) skillGroups = { Skills: all };
  } else if (user?.skills && typeof user.skills === "object") {
    const technical = user.skills.technical || [];
    const soft = user.skills.soft || [];
    const strategic = user.skills.strategic || [];
    if (technical.length > 0) skillGroups["Technical"] = technical;
    if (soft.length > 0) skillGroups["Soft Skills"] = soft;
    if (strategic.length > 0) skillGroups["Strategic"] = strategic;
  }

  const hasSkills = Object.keys(skillGroups).length > 0;
  if (!hasSkills && !isOwner) return null;

  // Color accent for progress bar based on group
  const groupAccent = {
    Technical: tokens.colors.accent,
    "Soft Skills": "#7C3AED",
    Strategic: "#EA580C",
    Skills: tokens.colors.accent,
  };

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
          >
            Professional Skills
          </h2>
          <p className="text-sm font-medium uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
            My Competencies
          </p>
          <div className="h-1 w-20 rounded-full mx-auto" style={{ backgroundColor: tokens.colors.accent }}></div>
        </div>

        {hasSkills ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillGroups).map(([group, items]) => {
              const accentForGroup = groupAccent[group] || tokens.colors.accent;
              return (
                <div
                  key={group}
                  className="p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:border-teal-500/20"
                  style={{
                    backgroundColor: tokens.colors.surface,
                    borderColor: tokens.colors.border,
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: accentForGroup }}
                    ></div>
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: accentForGroup }}>
                      {group}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {Array.isArray(items) && items.map((skill, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium" style={{ color: tokens.colors.primary }}>
                            {skill}
                          </span>
                          <span className="text-xs" style={{ color: tokens.colors.secondary }}>
                            {Math.min(95, 60 + (skill.length % 4) * 10)}%
                          </span>
                        </div>
                        <div
                          className="w-full h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: tokens.colors.border }}
                        >
                          <div
                            className="h-2 rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${Math.min(95, 60 + (skill.length % 4) * 10)}%`,
                              backgroundColor: accentForGroup,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          isOwner && (
            <div
              className="text-center py-10 rounded-2xl border"
              style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
            >
              <p>Add skills from your profile editor to see them here.</p>
            </div>
          )
        )}

      </div>
    </section>
  );
};

export default Skills;
