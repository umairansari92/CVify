import React from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../../components/profile/InlineEdit";
import { tokens } from "./tokens";

/**
 * APEX — Experience Section
 * ─────────────────────────
 * Vertical timeline with glowing teal dot indicators.
 * Reads: exp.title | exp.company | exp.location | exp.startDate | exp.endDate | exp.current
 * Description: handles String OR Array (defensive).
 */

const getDescLines = (desc) => {
  if (Array.isArray(desc)) return desc.filter(Boolean);
  if (typeof desc === "string" && desc.trim()) return desc.split("\n").filter(Boolean);
  return [];
};

const Experience = ({ user, isOwner, handleArrayUpdate }) => {
  const list = Array.isArray(user?.experience) ? user.experience : [];

  if (list.length === 0 && !isOwner) return null;

  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      {/* Subtle top radial accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 50% 30% at 0% 50%, ${tokens.colors.accent}06, transparent 70%)`,
        }}
      />

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-2"
        >
          <p
            className="text-xs font-black uppercase tracking-[0.25em]"
            style={{ color: tokens.colors.accent }}
          >
            Career Path
          </p>
          <h2
            className="flex items-center gap-4 text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
          >
            <span
              className="h-9 w-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: tokens.colors.accent }}
            />
            Professional Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        {list.length > 0 ? (
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-3 top-2 bottom-0 w-px"
              style={{
                background: `linear-gradient(to bottom, ${tokens.colors.accent}, ${tokens.colors.accent}40, transparent)`,
              }}
            />

            <ol className="space-y-10">
              {list.map((exp, index) => {
                const title      = exp?.title || exp?.role || "";
                const company    = exp?.company || "";
                const location   = exp?.location || "";
                const startDate  = exp?.startDate || "";
                const endDate    = exp?.current ? "Present" : (exp?.endDate || "");
                const dateStr    = [startDate, endDate].filter(Boolean).join(" – ");
                const descLines  = getDescLines(exp?.description);
                const achievements = Array.isArray(exp?.achievements)
                  ? exp.achievements.filter(Boolean)
                  : [];

                return (
                  <motion.li
                    key={exp?._id || index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-12 group"
                  >
                    {/* Glowing timeline dot */}
                    <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center">
                      <span
                        className="absolute h-6 w-6 rounded-full"
                        style={{ backgroundColor: `${tokens.colors.accent}18` }}
                      />
                      <span
                        className="relative h-3 w-3 rounded-full transition-transform duration-300 group-hover:scale-125"
                        style={{
                          backgroundColor: tokens.colors.accent,
                          boxShadow: `0 0 10px ${tokens.colors.accent}90`,
                        }}
                      />
                    </span>

                    {/* Card */}
                    <div
                      className="rounded-2xl border p-6 transition-all duration-300"
                      style={{
                        backgroundColor: `${tokens.colors.surface}cc`,
                        borderColor: tokens.colors.border,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${tokens.colors.accent}45`;
                        e.currentTarget.style.boxShadow  = `0 4px 24px ${tokens.colors.accent}18`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.border;
                        e.currentTarget.style.boxShadow  = "none";
                      }}
                    >
                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="flex-1">
                          {/* Job Title */}
                          <InlineEdit
                            isOwner={isOwner}
                            id={`exp-title-${index}`}
                            value={title}
                            onSave={(v) => handleArrayUpdate?.("experience", index, { title: v })}
                          >
                            <h3
                              className="text-lg font-bold leading-snug"
                              style={{ color: tokens.colors.primary }}
                            >
                              {title || "Position Title"}
                            </h3>
                          </InlineEdit>

                          {/* Company + Location */}
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                            <InlineEdit
                              isOwner={isOwner}
                              id={`exp-company-${index}`}
                              value={company}
                              onSave={(v) => handleArrayUpdate?.("experience", index, { company: v })}
                            >
                              <span
                                className="font-semibold"
                                style={{ color: tokens.colors.accent }}
                              >
                                {company || "Company"}
                              </span>
                            </InlineEdit>

                            {location && (
                              <>
                                <span style={{ color: tokens.colors.secondary }}>·</span>
                                <InlineEdit
                                  isOwner={isOwner}
                                  id={`exp-location-${index}`}
                                  value={location}
                                  onSave={(v) => handleArrayUpdate?.("experience", index, { location: v })}
                                >
                                  <span style={{ color: tokens.colors.secondary }}>
                                    {location}
                                  </span>
                                </InlineEdit>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Date badge */}
                        {dateStr && (
                          <InlineEdit
                            isOwner={isOwner}
                            id={`exp-dates-${index}`}
                            value={dateStr}
                            onSave={(v) => {
                              const parts = v.split("–").map((p) => p.trim());
                              const start = parts[0] || "";
                              const end   = parts[1] || "";
                              handleArrayUpdate?.("experience", index, {
                                startDate: start,
                                endDate:   end === "Present" ? null : end,
                                current:   end === "Present",
                              });
                            }}
                          >
                            <span
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0"
                              style={{
                                color:           tokens.colors.accent,
                                backgroundColor: `${tokens.colors.accent}14`,
                                border:          `1px solid ${tokens.colors.accent}35`,
                              }}
                            >
                              {dateStr}
                            </span>
                          </InlineEdit>
                        )}
                      </div>

                      {/* Description bullet lines */}
                      {descLines.length > 0 && (
                        <InlineEdit
                          isOwner={isOwner}
                          id={`exp-desc-${index}`}
                          value={Array.isArray(exp?.description) ? exp.description.join("\n") : (exp?.description || "")}
                          type="textarea"
                          multiline={true}
                          onSave={(v) =>
                            handleArrayUpdate?.("experience", index, {
                              description: v.split("\n").filter(Boolean),
                            })
                          }
                        >
                          <ul className="mt-3 space-y-1.5">
                            {descLines.map((line, li) => (
                              <li
                                key={li}
                                className="flex gap-2 text-sm leading-relaxed"
                                style={{ color: tokens.colors.secondary }}
                              >
                                <span
                                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                  style={{ backgroundColor: tokens.colors.accent }}
                                />
                                {line.replace(/^[-•]\s*/, "")}
                              </li>
                            ))}
                          </ul>
                        </InlineEdit>
                      )}

                      {/* Achievements (if present and different from description) */}
                      {achievements.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          {achievements.map((ach, ai) => (
                            <div
                              key={ai}
                              className="flex gap-2 text-sm leading-relaxed"
                              style={{ color: tokens.colors.secondary }}
                            >
                              <span
                                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                style={{ backgroundColor: `${tokens.colors.accent}80` }}
                              />
                              {ach}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        ) : (
          isOwner && (
            <div
              className="text-center py-12 rounded-2xl border"
              style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
            >
              <p className="text-sm">Add experience entries in your profile editor.</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Experience;
