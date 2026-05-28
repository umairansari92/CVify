import React from "react";

/**
 * ThemeBackgroundFX
 * Renders a unique, theme-specific SVG geometric background pattern
 * for each of the 6 standard themes.
 *
 * Design rules:
 *  - Dark backgrounds  → bright/white-tinted strokes, higher opacity
 *  - Light backgrounds → deep dark strokes, higher opacity so they're visible
 */
const ThemeBackgroundFX = ({ themeName }) => {
  if (!themeName) return null;

  /* ── 1. CVIFY CLASSIC ──────────────────────────────────────────
   * Light background (#f8fafc) → dark-blue hexagon grid
   * Increased strokeWidth + opacity so it's clearly visible
   */
  if (themeName === "CVIFY CLASSIC") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern
              id="hex-classic"
              width="60"
              height="104"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="30,2 58,17 58,47 30,62 2,47 2,17"
                fill="none"
                stroke="#1d4ed8"
                strokeWidth="1.2"
              />
              <polygon
                points="30,62 58,77 58,107 30,122 2,107 2,77"
                fill="none"
                stroke="#1d4ed8"
                strokeWidth="1.2"
              />
              <circle cx="30" cy="32" r="2.5" fill="#1d4ed8" opacity="0.7" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#hex-classic)"
            opacity="0.18"
          />
        </svg>
        {/* Blue glow — top left */}
        <div
          className="absolute top-0 left-0 w-[700px] h-[500px] rounded-full blur-[180px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Blue glow — bottom right */}
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full blur-[160px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  /* ── 2. MIDNIGHT DEV ───────────────────────────────────────────
   * Dark background (#020617) → bright cyan grid
   * Brighter color, thicker lines, higher opacity
   */
  if (themeName === "MIDNIGHT DEV") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern
              id="code-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              {/* Horizontal grid line */}
              <line
                x1="0" y1="0" x2="40" y2="0"
                stroke="#7dd3fc"
                strokeWidth="0.6"
              />
              {/* Vertical grid line */}
              <line
                x1="0" y1="0" x2="0" y2="40"
                stroke="#7dd3fc"
                strokeWidth="0.6"
              />
              {/* Corner intersection dot */}
              <circle cx="0" cy="0" r="1.8" fill="#38bdf8" opacity="1" />
              {/* Mid-cell dot */}
              <circle cx="20" cy="20" r="1" fill="#7dd3fc" opacity="0.6" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#code-grid)"
            opacity="0.35"
          />
        </svg>
        {/* Horizontal scan-line effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(125,211,252,0.03) 3px, rgba(125,211,252,0.03) 4px)",
          }}
        />
        {/* Ambient cyan glow — centre */}
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[200px]"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Secondary teal glow — bottom */}
        <div
          className="absolute bottom-0 left-[20%] w-[500px] h-[400px] rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  /* ── 3. CORPORATE GOLD ─────────────────────────────────────────
   * Light background (#ffffff) → navy + gold cross-hatch
   * Bolder lines, higher opacity
   */
  if (themeName === "CORPORATE GOLD") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern
              id="crosshatch-gold"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              {/* Navy diagonal — NW to SE */}
              <line
                x1="0" y1="24" x2="24" y2="0"
                stroke="#1e3a8a"
                strokeWidth="0.9"
              />
              {/* Gold diagonal — NE to SW */}
              <line
                x1="0" y1="0" x2="24" y2="24"
                stroke="#b45309"
                strokeWidth="0.7"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#crosshatch-gold)"
            opacity="0.12"
          />
        </svg>
        {/* Gold shimmer — top right */}
        <div
          className="absolute -top-20 right-0 w-[600px] h-[500px] rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Navy glow — bottom left */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(30,58,138,0.08) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  /* ── 4. CREATIVE SUNSET ────────────────────────────────────────
   * Light-warm background (#fff7ed) → orange/pink ripple waves
   * Bolder strokes + higher opacity
   */
  if (themeName === "CREATIVE SUNSET") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern
              id="ripple-sunset"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="40" cy="40" r="37"
                fill="none"
                stroke="#ea580c"
                strokeWidth="1.2"
              />
              <circle
                cx="40" cy="40" r="26"
                fill="none"
                stroke="#be185d"
                strokeWidth="1.0"
              />
              <circle
                cx="40" cy="40" r="14"
                fill="none"
                stroke="#ea580c"
                strokeWidth="0.8"
              />
              <circle cx="40" cy="40" r="3.5" fill="#be185d" opacity="0.5" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#ripple-sunset)"
            opacity="0.2"
          />
        </svg>
        {/* Warm amber glow — bottom left */}
        <div
          className="absolute bottom-0 left-0 w-[700px] h-[500px] rounded-full blur-[180px]"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.14) 0%, transparent 70%)",
          }}
        />
        {/* Pink glow — top right */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(219,39,119,0.12) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  /* ── 5. SLATE MINIMALIST ───────────────────────────────────────
   * Light background (#f1f5f9) → slate-grey dots + cross lines
   * Larger dots + added thin line grid for visibility
   */
  if (themeName === "SLATE MINIMALIST") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern
              id="dot-slate"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              {/* Primary dot */}
              <circle cx="14" cy="14" r="1.8" fill="#334155" opacity="0.55" />
              {/* Corner tiny dot */}
              <circle cx="0" cy="0" r="0.9" fill="#475569" opacity="0.35" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#dot-slate)"
            opacity="0.6"
          />
        </svg>
        {/* Very subtle edge fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(241,245,249,0.5) 0%, transparent 20%, transparent 80%, rgba(241,245,249,0.5) 100%)",
          }}
        />
      </div>
    );
  }

  /* ── 6. EMERALD LEADER ─────────────────────────────────────────
   * Light-green background (#f0fdf4) → emerald diamond grid
   * Thicker strokes + higher opacity
   */
  if (themeName === "EMERALD LEADER") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern
              id="diamond-emerald"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              {/* Outer diamond */}
              <rect
                x="15" y="15" width="30" height="30"
                transform="rotate(45 30 30)"
                fill="none"
                stroke="#047857"
                strokeWidth="1.2"
              />
              {/* Inner diamond */}
              <rect
                x="22" y="22" width="16" height="16"
                transform="rotate(45 30 30)"
                fill="none"
                stroke="#059669"
                strokeWidth="0.7"
              />
              {/* Centre dot */}
              <circle cx="30" cy="30" r="2" fill="#047857" opacity="0.5" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#diamond-emerald)"
            opacity="0.22"
          />
        </svg>
        {/* Emerald ambient glow — top right */}
        <div
          className="absolute top-[10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{
            background:
              "radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)",
          }}
        />
        {/* Secondary glow — bottom left */}
        <div
          className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  return null;
};

export default ThemeBackgroundFX;
