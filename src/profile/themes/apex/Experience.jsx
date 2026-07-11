import React from "react";
import InlineEdit from "../../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Experience = ({ user, isOwner, handleArrayUpdate }) => {
  if (!user || (!isOwner && (!Array.isArray(user?.experience) || user.experience.length === 0))) {
    return null;
  }

  const list = Array.isArray(user?.experience) ? user.experience : [];

  const getDescriptionLines = (desc) => {
    if (Array.isArray(desc)) return desc;
    if (typeof desc === "string") return [desc];
    return [];
  };

  return (
    <section
      id="experience"
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
            Professional Experience
          </h2>
          <p className="text-sm font-medium uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
            My Professional Timeline
          </p>
          <div className="h-1 w-20 rounded-full mx-auto" style={{ backgroundColor: tokens.colors.accent }}></div>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 max-w-3xl mx-auto" style={{ borderColor: tokens.colors.border }}>
          {list.map((exp, index) => {
            const lines = getDescriptionLines(exp?.description);
            const dateStr = [exp?.startDate, exp?.endDate || (exp?.current ? "Present" : "")].filter(Boolean).join(" - ");

            return (
              <div key={exp?._id || index} className="mb-12 ml-6 relative group">
                {/* Bullet node */}
                <div
                  className="absolute w-4 h-4 rounded-full -left-[33px] top-1.5 border-2 transition-all duration-300 group-hover:scale-125"
                  style={{
                    backgroundColor: tokens.colors.bg,
                    borderColor: tokens.colors.accent,
                    boxShadow: `0 0 8px ${tokens.colors.accent}`,
                  }}
                ></div>

                {/* Content Box */}
                <div
                  className="p-6 rounded-2xl border text-left transition-all duration-300 hover:shadow-xl hover:border-teal-500/30"
                  style={{
                    backgroundColor: tokens.colors.surface,
                    borderColor: tokens.colors.border,
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <InlineEdit
                        isOwner={isOwner}
                        id={`exp-title-${index}`}
                        value={exp?.title || ""}
                        onSave={(v) => handleArrayUpdate?.("experience", index, { title: v })}
                      >
                        <h3 className="text-xl font-bold" style={{ color: tokens.colors.primary }}>
                          {exp?.title || "Position Title"}
                        </h3>
                      </InlineEdit>

                      <div className="flex items-center space-x-2 text-sm mt-1">
                        <InlineEdit
                          isOwner={isOwner}
                          id={`exp-company-${index}`}
                          value={exp?.company || ""}
                          onSave={(v) => handleArrayUpdate?.("experience", index, { company: v })}
                          className="inline-block"
                        >
                          <span className="font-semibold" style={{ color: tokens.colors.accent }}>
                            {exp?.company || "Company"}
                          </span>
                        </InlineEdit>
                        {exp?.location && (
                          <>
                            <span style={{ color: tokens.colors.secondary }}>|</span>
                            <InlineEdit
                              isOwner={isOwner}
                              id={`exp-location-${index}`}
                              value={exp?.location || ""}
                              onSave={(v) => handleArrayUpdate?.("experience", index, { location: v })}
                              className="inline-block"
                            >
                              <span style={{ color: tokens.colors.secondary }}>{exp.location}</span>
                            </InlineEdit>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 sm:mt-0 text-sm font-semibold whitespace-nowrap" style={{ color: tokens.colors.secondary }}>
                      <InlineEdit
                        isOwner={isOwner}
                        id={`exp-dates-${index}`}
                        value={dateStr}
                        onSave={(v) => {
                          const parts = v.split("-");
                          const start = parts[0]?.trim() || "";
                          const end = parts[1]?.trim() || "";
                          handleArrayUpdate?.("experience", index, {
                            startDate: start,
                            endDate: end === "Present" ? null : end,
                            current: end === "Present",
                          });
                        }}
                      >
                        <span>{dateStr || "Dates"}</span>
                      </InlineEdit>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm leading-relaxed" style={{ color: tokens.colors.secondary }}>
                    {isOwner ? (
                      <InlineEdit
                        isOwner={isOwner}
                        id={`exp-desc-${index}`}
                        value={lines.join("\n")}
                        type="textarea"
                        multiline={true}
                        onSave={(v) => handleArrayUpdate?.("experience", index, { description: v })}
                      >
                        <ul className="list-disc list-inside space-y-1">
                          {lines.map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      </InlineEdit>
                    ) : (
                      <ul className="list-disc list-inside space-y-1">
                        {lines.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;
