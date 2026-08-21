import React from "react";
import { PROFILE_SECTIONS, SECTION_CATEGORIES } from "../../data/profileSections";

/**
 * StudioSectionTabs.jsx
 * 3-group categorized tab switcher for the 11 Digital Identity Studio sections.
 * Props:
 *   activeSectionId   — currently active section
 *   onSelect          — fn(sectionId)
 */
const CATEGORY_COLORS = {
  identity_build: { accent: "#66907D", bg: "rgba(102,144,125,0.12)", border: "rgba(102,144,125,0.3)" },
  value_proof:    { accent: "#6888C4", bg: "rgba(104,136,196,0.12)", border: "rgba(104,136,196,0.3)" },
  intelligence_exp: { accent: "#9066C4", bg: "rgba(144,102,196,0.12)", border: "rgba(144,102,196,0.3)" },
};

const StudioSectionTabs = ({ activeSectionId, onSelect }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {SECTION_CATEGORIES.map((category) => {
        const colors = CATEGORY_COLORS[category.id] || CATEGORY_COLORS.identity_build;
        const categorySections = PROFILE_SECTIONS.filter((s) =>
          category.sections.includes(s.id)
        );
        const isCategoryActive = categorySections.some((s) => s.id === activeSectionId);

        return (
          <div key={category.id}>
            {/* Category header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
                padding: "0 4px",
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 16,
                  borderRadius: 2,
                  background: isCategoryActive ? colors.accent : "rgba(255,255,255,0.2)",
                  transition: "background 0.3s ease",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isCategoryActive ? colors.accent : "rgba(255,255,255,0.4)",
                  transition: "color 0.3s ease",
                }}
              >
                {category.title}
              </span>
            </div>

            {/* Section tabs for this category */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {categorySections.map((section) => {
                const isActive = section.id === activeSectionId;
                return (
                  <button
                    key={section.id}
                    id={`tab-${section.id}`}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onSelect(section.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: isActive ? `1px solid ${colors.border}` : "1px solid transparent",
                      background: isActive ? colors.bg : "transparent",
                      cursor: "pointer",
                      transition: "all 0.22s ease",
                      outline: "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                      }
                    }}
                  >
                    {/* Number badge */}
                    <span
                      style={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        fontWeight: 700,
                        background: isActive ? colors.accent : "rgba(255,255,255,0.06)",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                        transition: "all 0.22s ease",
                        flexShrink: 0,
                      }}
                    >
                      {section.number}
                    </span>

                    {/* Section text */}
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: 13,
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                          transition: "all 0.22s ease",
                          lineHeight: 1.3,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {section.shortTitle}
                      </div>
                      {isActive && (
                        <div
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 10,
                            color: colors.accent,
                            fontWeight: 600,
                            marginTop: 2,
                            letterSpacing: "0.04em",
                          }}
                        >
                          {section.badge}
                        </div>
                      )}
                    </div>

                    {/* Active indicator arrow */}
                    {isActive && (
                      <span
                        style={{
                          color: colors.accent,
                          fontSize: 14,
                          flexShrink: 0,
                          fontWeight: 700,
                        }}
                      >
                        →
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudioSectionTabs;
