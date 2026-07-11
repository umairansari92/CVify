import React from "react";
import InlineEdit from "../../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Education = ({ user, isOwner, handleArrayUpdate }) => {
  if (!user || (!isOwner && (!Array.isArray(user?.education) || user.education.length === 0))) {
    return null;
  }

  const list = Array.isArray(user?.education) ? user.education : [];

  return (
    <section
      id="education"
      className="py-24 relative overflow-hidden border-t"
      style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
          >
            My Education
          </h2>
          <p className="text-sm font-medium uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
            Academic Background
          </p>
          <div className="h-1 w-20 rounded-full mx-auto" style={{ backgroundColor: tokens.colors.accent }}></div>
        </div>

        {/* Education Cards */}
        <div className="max-w-3xl mx-auto space-y-6">
          {list.map((edu, index) => {
            const dateStr = [edu?.startDate, edu?.endDate].filter(Boolean).join(" - ");
            return (
              <div
                key={edu?._id || index}
                className="flex items-start gap-6 p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:border-teal-500/30"
                style={{
                  backgroundColor: tokens.colors.bg,
                  borderColor: tokens.colors.border,
                }}
              >
                {/* Left Icon */}
                <div
                  className="w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center text-2xl border"
                  style={{
                    backgroundColor: `${tokens.colors.accent}20`,
                    borderColor: tokens.colors.accent,
                  }}
                >
                  🎓
                </div>

                {/* Right Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <InlineEdit
                      isOwner={isOwner}
                      id={`edu-degree-${index}`}
                      value={edu?.degree || ""}
                      onSave={(v) => handleArrayUpdate?.("education", index, { degree: v })}
                    >
                      <h3 className="text-lg font-bold" style={{ color: tokens.colors.primary }}>
                        {edu?.degree || "Degree Title"}
                      </h3>
                    </InlineEdit>
                    {dateStr && (
                      <span className="text-xs font-semibold mt-1 sm:mt-0" style={{ color: tokens.colors.secondary }}>
                        {dateStr}
                      </span>
                    )}
                  </div>

                  <InlineEdit
                    isOwner={isOwner}
                    id={`edu-institution-${index}`}
                    value={edu?.institution || ""}
                    onSave={(v) => handleArrayUpdate?.("education", index, { institution: v })}
                  >
                    <p className="font-semibold text-sm mb-2" style={{ color: tokens.colors.accent }}>
                      {edu?.institution || "Institution Name"}
                    </p>
                  </InlineEdit>

                  {edu?.description && (
                    <InlineEdit
                      isOwner={isOwner}
                      id={`edu-desc-${index}`}
                      value={edu?.description || ""}
                      type="textarea"
                      multiline={true}
                      onSave={(v) => handleArrayUpdate?.("education", index, { description: v })}
                    >
                      <p className="text-sm leading-relaxed" style={{ color: tokens.colors.secondary }}>
                        {edu.description}
                      </p>
                    </InlineEdit>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Education;
