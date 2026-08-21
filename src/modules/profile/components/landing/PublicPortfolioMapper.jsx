import React, { useEffect, useRef } from "react";
import { PORTFOLIO_MAPPINGS } from "../../data/profilePortfolioMap";
import { PROFILE_FIELDS } from "../../data/profileFields";

/**
 * PublicPortfolioMapper.jsx
 * Modal overlay that shows exactly where a field appears on the public portfolio,
 * using a rendered theme preview with a highlighted target region.
 *
 * Props:
 *   fieldId     — ID of the field to inspect
 *   onClose     — fn() to close the modal
 */
const PublicPortfolioMapper = ({ fieldId, onClose }) => {
  const overlayRef = useRef(null);
  const field = PROFILE_FIELDS[fieldId];
  const mapping = field?.whereItAppears?.mapKey
    ? PORTFOLIO_MAPPINGS[field.whereItAppears.mapKey]
    : null;

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Close on overlay backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!field || !mapping) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "pm-fade-in 0.2s ease",
      }}
    >
      <style>{`
        @keyframes pm-fade-in {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes pm-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pm-highlight-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(102,144,125,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(102,144,125,0.0); }
        }
      `}</style>

      <div
        style={{
          background: "rgba(12,12,18,0.98)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          width: "100%",
          maxWidth: 720,
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "pm-slide-up 0.25s ease",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            position: "sticky",
            top: 0,
            background: "rgba(12,12,18,0.98)",
            zIndex: 2,
            borderRadius: "20px 20px 0 0",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--primary, #66907D)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              🌐 Public Portfolio Output Mapping
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 18,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {field.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close portfolio mapper"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.6)",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          >
            ✕
          </button>
        </div>

        {/* Modal body */}
        <div style={{ padding: "24px" }}>
          {/* Mapping flow visualization */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            <FlowPill icon="✏️" label="Studio Field" value={field.name} color="#66907D" />
            <FlowArrow />
            <FlowPill icon="📍" label="Portfolio Section" value={mapping.targetSection} color="#6888C4" />
            <FlowArrow />
            <FlowPill icon="🎨" label="Themes" value={mapping.previewTheme} color="#9066C4" />
          </div>

          {/* Description block */}
          <div
            style={{
              padding: "14px 16px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {mapping.description}
            </p>
          </div>

          {/* Theme code location */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 8,
              }}
            >
              🔧 Theme Component Reference
            </div>
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "12px 16px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "rgba(102,144,125,0.9)",
                lineHeight: 1.6,
              }}
            >
              {mapping.themeLocationSnippet}
            </div>
          </div>

          {/* Live portfolio path */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              borderRadius: 12,
              background: "rgba(102,144,125,0.08)",
              border: "1px solid rgba(102,144,125,0.2)",
            }}
          >
            <span style={{ fontSize: 20 }}>🔗</span>
            <div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--primary, #66907D)",
                  marginBottom: 2,
                }}
              >
                Your live portfolio URL
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                cvifypro.app/p/<span style={{ color: "var(--primary, #66907D)", fontWeight: 700 }}>yourname</span>
              </div>
            </div>
            <a
              href="/profile/studio"
              style={{
                marginLeft: "auto",
                padding: "8px 16px",
                borderRadius: 8,
                background: "var(--primary, #66907D)",
                color: "#fff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
                transition: "opacity 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Fill this field →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Utility sub-components ─── */
const FlowPill = ({ icon, label, value, color }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      padding: "10px 14px",
      borderRadius: 12,
      background: `${color}18`,
      border: `1px solid ${color}40`,
      minWidth: 120,
      flex: 1,
    }}
  >
    <span style={{ fontSize: 18 }}>{icon}</span>
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 9,
        fontWeight: 700,
        color: color,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        color: "rgba(255,255,255,0.75)",
        textAlign: "center",
        lineHeight: 1.3,
      }}
    >
      {value}
    </div>
  </div>
);

const FlowArrow = () => (
  <span
    style={{
      color: "rgba(255,255,255,0.2)",
      fontSize: 18,
      fontWeight: 300,
      flexShrink: 0,
    }}
  >
    →
  </span>
);

export default PublicPortfolioMapper;
