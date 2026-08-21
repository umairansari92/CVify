import React from "react";
import InteractiveHotspot from "./InteractiveHotspot";
import { PROFILE_FIELDS } from "../../data/profileFields";
import { PROFILE_SECTIONS } from "../../data/profileSections";

/**
 * StudioPreviewCanvas.jsx
 * Live interactive component preview canvas for a given section.
 * Renders section-specific UI mockup with pulsating hotspot pins.
 * Props:
 *   sectionId         — active section ID
 *   activeFieldId     — currently focused field
 *   onHotspotClick    — fn(fieldId) called when a hotspot pin is clicked
 *   previewImages     — map of sectionId → imported image URL
 */
const StudioPreviewCanvas = ({ sectionId, activeFieldId, onHotspotClick, previewImages = {} }) => {
  // Gather all fields belonging to this section
  const sectionFields = Object.values(PROFILE_FIELDS).filter(
    (f) => f.sectionId === sectionId && f.hotspot
  );

  const section = PROFILE_SECTIONS.find((s) => s.id === sectionId);
  const previewImage = previewImages[sectionId];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        background: "rgba(9,9,11,0.85)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        minHeight: 340,
      }}
    >
      {/* Section label badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(15,15,20,0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "5px 12px",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--primary, #66907D)",
            animation: "hotspot-pulse-dot 2s ease-in-out infinite",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {section?.number} — {section?.shortTitle}
        </span>
        <style>{`
          @keyframes hotspot-pulse-dot {
            0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
          }
        `}</style>
      </div>

      {/* Click-to-field hint */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 20,
          background: "rgba(102,144,125,0.15)",
          border: "1px solid rgba(102,144,125,0.3)",
          borderRadius: 20,
          padding: "4px 10px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          color: "var(--primary, #66907D)",
          letterSpacing: "0.05em",
        }}
      >
        ↗ Click pins to explore
      </div>

      {/* Preview image or fallback rendered UI */}
      <div style={{ position: "relative", width: "100%", minHeight: 340 }}>
        {previewImage ? (
          <img
            src={previewImage}
            alt={`${section?.title || sectionId} section preview`}
            style={{
              width: "100%",
              display: "block",
              borderRadius: 16,
              opacity: 0.7,
              objectFit: "cover",
              filter: "saturate(0.85) brightness(0.9)",
            }}
          />
        ) : (
          <CanvasFallback section={section} />
        )}

        {/* Active field highlight overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 16,
            background: activeFieldId
              ? "radial-gradient(ellipse at center, rgba(102,144,125,0.08) 0%, transparent 70%)"
              : "transparent",
            transition: "background 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Hotspot pins */}
        {sectionFields.map((field) => (
          <InteractiveHotspot
            key={field.id}
            x={field.hotspot.x}
            y={field.hotspot.y}
            label={field.hotspot.label}
            isActive={activeFieldId === field.id}
            tooltip={field.name}
            onClick={() => onHotspotClick(field.id)}
          />
        ))}
      </div>

      {/* Bottom info bar */}
      <div
        style={{
          padding: "10px 16px",
          background: "rgba(0,0,0,0.4)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {sectionFields.length} interactive field{sectionFields.length !== 1 ? "s" : ""} in this section
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "rgba(102,144,125,0.7)",
            letterSpacing: "0.08em",
          }}
        >
          cvifypro.app/p/yourname
        </span>
      </div>
    </div>
  );
};

/* Fallback rendered UI when no preview image is provided */
const CanvasFallback = ({ section }) => (
  <div
    style={{
      minHeight: 300,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      padding: 32,
    }}
  >
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "rgba(102,144,125,0.15)",
        border: "2px solid rgba(102,144,125,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
      }}
    >
      🎨
    </div>
    <p
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 14,
        color: "rgba(255,255,255,0.4)",
        textAlign: "center",
        margin: 0,
      }}
    >
      {section?.title || "Section"} Preview
      <br />
      <span style={{ fontSize: 12 }}>Click hotspot pins to explore fields</span>
    </p>
  </div>
);

export default StudioPreviewCanvas;
