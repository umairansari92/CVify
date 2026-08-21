import React, { useCallback } from "react";
import { PROFILE_FIELDS } from "../../data/profileFields";
import { PORTFOLIO_MAPPINGS } from "../../data/profilePortfolioMap";

/**
 * FieldGuidePanel.jsx
 * Right-side guide displaying the strict 7-part field schema.
 * Each field card is clickable to trigger canvas hotspot sync.
 * Props:
 *   sectionId       — active section
 *   activeFieldId   — currently highlighted field
 *   onFieldSelect   — fn(fieldId) — triggers canvas 2-way sync
 *   onShowPortfolio — fn(fieldId) — opens the PublicPortfolioMapper modal
 */
const FieldGuidePanel = ({ sectionId, activeFieldId, onFieldSelect, onShowPortfolio }) => {
  const fields = Object.values(PROFILE_FIELDS).filter((f) => f.sectionId === sectionId);

  if (!fields.length) {
    return (
      <div style={{ padding: 32, textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}>
          No fields configured for this section.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          isActive={activeFieldId === field.id}
          onSelect={() => onFieldSelect(field.id)}
          onShowPortfolio={() => onShowPortfolio(field.id)}
        />
      ))}
    </div>
  );
};

/* ─── Individual Field Card ─── */
const FieldCard = ({ field, isActive, onSelect, onShowPortfolio }) => {
  const portfolioMapping = PORTFOLIO_MAPPINGS[field.whereItAppears?.mapKey];

  return (
    <div
      id={`field-card-${field.id}`}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onClick={onSelect}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect()}
      style={{
        borderRadius: 14,
        border: isActive
          ? "1px solid rgba(102,144,125,0.5)"
          : "1px solid rgba(255,255,255,0.07)",
        background: isActive
          ? "rgba(102,144,125,0.08)"
          : "rgba(255,255,255,0.02)",
        overflow: "hidden",
        transition: "all 0.25s ease",
        cursor: "pointer",
        outline: "none",
        scrollMarginTop: 80,
      }}
    >
      {/* Card header — always visible */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
        }}
      >
        {/* Hotspot label badge */}
        <span
          style={{
            minWidth: 28,
            height: 28,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            background: isActive ? "var(--primary, #66907D)" : "rgba(255,255,255,0.08)",
            color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
            flexShrink: 0,
            transition: "all 0.25s ease",
          }}
        >
          {field.hotspot?.label || "—"}
        </span>

        {/* Field name + required tag */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
              lineHeight: 1.3,
              transition: "color 0.25s ease",
            }}
          >
            {field.name}
          </div>
        </div>

        {/* Required / Optional + expand indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 20,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: field.required
                ? "rgba(239,68,68,0.15)"
                : "rgba(102,144,125,0.15)",
              color: field.required ? "#ef4444" : "var(--primary, #66907D)",
              border: `1px solid ${field.required ? "rgba(239,68,68,0.25)" : "rgba(102,144,125,0.25)"}`,
            }}
          >
            {field.required ? "Required" : "Optional"}
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 12,
              transition: "transform 0.25s ease",
              transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            ▶
          </span>
        </div>
      </div>

      {/* Expanded 7-part guide — only when active */}
      {isActive && (
        <div
          style={{
            padding: "0 16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            animation: "guide-slide-in 0.25s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <style>{`
            @keyframes guide-slide-in {
              from { opacity: 0; transform: translateY(-8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <Divider />

          {/* 1. What is it? */}
          <GuideBlock
            emoji="💡"
            label="What is it?"
            content={field.whatIsIt}
          />

          {/* 2. Why recruiters care */}
          <GuideBlock
            emoji="🎯"
            label="Why recruiters care"
            content={field.whyRecruitersCare}
            accent
          />

          {/* 3. What to write + verifiable note */}
          <div>
            <BlockLabel emoji="✍️" label="What to write" />
            <CopyBlock text={field.whatToWrite} />
            {field.verifiableNote && (
              <div
                style={{
                  marginTop: 8,
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: "rgba(251,191,36,0.08)",
                  border: "1px solid rgba(251,191,36,0.2)",
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: 12 }}>⚠️</span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 11,
                    color: "rgba(251,191,36,0.85)",
                    lineHeight: 1.5,
                  }}
                >
                  <strong>Use only if verifiable:</strong> {field.verifiableNote}
                </span>
              </div>
            )}
          </div>

          {/* 4. Where it appears */}
          <div>
            <BlockLabel emoji="📍" label="Where it appears on public portfolio" />
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                background: "rgba(102,144,125,0.08)",
                border: "1px solid rgba(102,144,125,0.2)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div style={metaRowStyle}>
                <span style={metaLabelStyle}>Section</span>
                <span style={metaValueStyle}>{field.whereItAppears?.section}</span>
              </div>
              <div style={metaRowStyle}>
                <span style={metaLabelStyle}>Element</span>
                <span style={metaValueStyle}>{field.whereItAppears?.element}</span>
              </div>
              <div style={metaRowStyle}>
                <span style={metaLabelStyle}>Themes</span>
                <span style={metaValueStyle}>{field.whereItAppears?.themeTarget}</span>
              </div>
            </div>
            {/* See on Public Portfolio CTA */}
            {portfolioMapping && (
              <button
                onClick={(e) => { e.stopPropagation(); onShowPortfolio(); }}
                style={{
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "9px 14px",
                  borderRadius: 10,
                  border: "1px dashed rgba(102,144,125,0.4)",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--primary, #66907D)",
                  transition: "all 0.2s ease",
                  outline: "none",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(102,144,125,0.1)";
                  e.currentTarget.style.borderStyle = "solid";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderStyle = "dashed";
                }}
              >
                <span style={{ fontSize: 14 }}>🌐</span>
                See on Public Portfolio ({portfolioMapping.targetSection})
                <span style={{ marginLeft: "auto", opacity: 0.7 }}>→</span>
              </button>
            )}
          </div>

          {/* 5. Pro tip */}
          <div
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              background: "rgba(104,136,196,0.08)",
              border: "1px solid rgba(104,136,196,0.2)",
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: 14 }}>💎</span>
            <div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#6888C4",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 4,
                }}
              >
                Pro Tip
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.5,
                }}
              >
                {field.proTip}
              </div>
            </div>
          </div>

          {/* 6. Avoid */}
          <div
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.15)",
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: 14 }}>🚫</span>
            <div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#ef4444",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 4,
                }}
              >
                Avoid
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.5,
                }}
              >
                {field.avoid}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Utility sub-components ─── */
const Divider = () => (
  <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "2px 0" }} />
);

const BlockLabel = ({ emoji, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 6,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 10,
      fontWeight: 700,
      color: "rgba(255,255,255,0.45)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    }}
  >
    <span style={{ fontSize: 12 }}>{emoji}</span>
    {label}
  </div>
);

const GuideBlock = ({ emoji, label, content, accent }) => (
  <div>
    <BlockLabel emoji={emoji} label={label} />
    <p
      style={{
        margin: 0,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 12,
        lineHeight: 1.6,
        color: accent ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.6)",
      }}
    >
      {content}
    </p>
  </div>
);

const CopyBlock = ({ text }) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText(text).catch(() => {});
  }, [text]);

  return (
    <div
      style={{
        position: "relative",
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: "10px 44px 10px 12px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: "rgba(255,255,255,0.75)",
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {text}
      <button
        onClick={(e) => { e.stopPropagation(); handleCopy(); }}
        title="Copy to clipboard"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "rgba(102,144,125,0.15)",
          border: "1px solid rgba(102,144,125,0.3)",
          borderRadius: 6,
          padding: "3px 7px",
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          color: "var(--primary, #66907D)",
          outline: "none",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(102,144,125,0.3)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(102,144,125,0.15)"; }}
      >
        Copy
      </button>
    </div>
  );
};

const metaRowStyle = {
  display: "flex",
  gap: 8,
  alignItems: "flex-start",
};
const metaLabelStyle = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 10,
  fontWeight: 700,
  color: "rgba(102,144,125,0.8)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  minWidth: 56,
  flexShrink: 0,
  paddingTop: 1,
};
const metaValueStyle = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 11,
  color: "rgba(255,255,255,0.65)",
  lineHeight: 1.5,
};

export default FieldGuidePanel;
