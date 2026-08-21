import React from "react";

/**
 * InteractiveHotspot.jsx
 * A pulsating pin on the live canvas. Clicking it syncs the guide panel.
 * Props:
 *   x, y        — percentage-based coordinates on the canvas
 *   label       — short number/letter label inside the pin
 *   isActive    — whether this hotspot is currently focused
 *   onClick     — fn() called when pin is clicked
 *   tooltip     — short field name for the hover tooltip
 */
const InteractiveHotspot = ({ x, y, label, isActive, onClick, tooltip }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Highlight field: ${tooltip}`}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
      className="hotspot-root"
    >
      {/* Pulse rings — only shown when inactive (always-on ambient effect) */}
      {!isActive && (
        <>
          <span className="hotspot-ring hotspot-ring-1" />
          <span className="hotspot-ring hotspot-ring-2" />
        </>
      )}

      {/* Pin core */}
      <button
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          border: "2px solid",
          cursor: "pointer",
          transition: "all 0.25s ease",
          outline: "none",
          position: "relative",
          boxShadow: isActive
            ? "0 0 0 3px var(--primary, #66907D), 0 4px 12px rgba(102,144,125,0.5)"
            : "0 2px 8px rgba(0,0,0,0.3)",
          background: isActive
            ? "var(--primary, #66907D)"
            : "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          borderColor: isActive
            ? "var(--primary, #66907D)"
            : "rgba(255,255,255,0.6)",
          color: isActive ? "#fff" : "rgba(255,255,255,0.9)",
          transform: isActive ? "scale(1.2)" : "scale(1)",
        }}
      >
        {label}
      </button>

      {/* Hover tooltip */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(15,15,20,0.92)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 8,
          padding: "5px 10px",
          whiteSpace: "nowrap",
          fontSize: 11,
          fontWeight: 600,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: "#fff",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.2s ease",
        }}
        className="hotspot-tooltip"
      >
        {tooltip}
        {/* Arrow */}
        <span
          style={{
            position: "absolute",
            bottom: -4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "4px solid transparent",
            borderRight: "4px solid transparent",
            borderTop: "4px solid rgba(15,15,20,0.92)",
          }}
        />
      </div>

      <style>{`
        .hotspot-root { position: absolute; }
        .hotspot-root:hover .hotspot-tooltip { opacity: 1 !important; }
        .hotspot-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid var(--primary, #66907D);
          pointer-events: none;
        }
        .hotspot-ring-1 {
          width: 38px; height: 38px;
          opacity: 0.5;
          animation: hotspot-pulse 2s ease-out infinite;
        }
        .hotspot-ring-2 {
          width: 52px; height: 52px;
          opacity: 0.25;
          animation: hotspot-pulse 2s ease-out infinite 0.7s;
        }
        @keyframes hotspot-pulse {
          0%   { transform: translate(-50%,-50%) scale(0.8); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default InteractiveHotspot;
