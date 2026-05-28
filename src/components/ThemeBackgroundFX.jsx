import React from "react";

/**
 * ThemeBackgroundFX
 * Renders a unique, theme-specific SVG geometric background pattern
 * for each of the 6 standard themes.
 *
 * Design rules:
 *  - Dark backgrounds → light/translucent stroke patterns
 *  - Light backgrounds → dark/translucent stroke patterns
 *  - Each theme gets a culturally / aesthetically matched motif
 */
const ThemeBackgroundFX = ({ themeName }) => {
  if (!themeName) return null;

  /* ── 1. CVIFY CLASSIC ──────────────────────────────────────────
   * Light background (#f8fafc) → dark-blue pattern
   * Motif: Connected hexagon grid (tech / circuit board feel)
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
              {/* Hexagon shape */}
              <polygon
                points="30,2 58,17 58,47 30,62 2,47 2,17"
                fill="none"
                stroke="#2563eb"
                strokeWidth="0.6"
              />
              {/* Offset hexagon row */}
              <polygon
                points="30,62 58,77 58,107 30,122 2,107 2,77"
                fill="none"
                stroke="#2563eb"
                strokeWidth="0.6"
              />
              {/* Centre dot */}
              <circle cx="30" cy="32" r="2" fill="#2563eb" opacity="0.4" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#hex-classic)"
            opacity="0.07"
          />
        </svg>
        {/* Subtle blue glow top-left */}
        <div
          className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full blur-[180px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  /* ── 2. MIDNIGHT DEV ───────────────────────────────────────────
   * Dark background (#020617) → cyan/sky blue pattern
   * Motif: Binary / code grid — small dots in grid + scan lines
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
              {/* Grid lines */}
              <line
                x1="0"
                y1="0"
                x2="40"
                y2="0"
                stroke="#38bdf8"
                strokeWidth="0.3"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="40"
                stroke="#38bdf8"
                strokeWidth="0.3"
              />
              {/* Corner dots */}
              <circle cx="0" cy="0" r="1.2" fill="#38bdf8" opacity="0.6" />
              <circle cx="20" cy="20" r="0.7" fill="#38bdf8" opacity="0.3" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#code-grid)"
            opacity="0.18"
          />
        </svg>
        {/* Scan-line overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(56,189,248,0.012) 3px, rgba(56,189,248,0.012) 4px)",
          }}
        />
        {/* Ambient cyan glow */}
        <div
          className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[200px]"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  /* ── 3. CORPORATE GOLD ─────────────────────────────────────────
   * Light background (#ffffff) → dark-navy + gold pattern
   * Motif: Diagonal cross-hatch / woven fabric — classical / formal
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
              {/* Diagonal lines — NW to SE */}
              <line
                x1="0"
                y1="24"
                x2="24"
                y2="0"
                stroke="#1e3a8a"
                strokeWidth="0.5"
              />
              {/* Diagonal lines — NE to SW */}
              <line
                x1="0"
                y1="0"
                x2="24"
                y2="24"
                stroke="#d97706"
                strokeWidth="0.4"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#crosshatch-gold)"
            opacity="0.055"
          />
        </svg>
        {/* Gold shimmer top-right */}
        <div
          className="absolute -top-20 right-0 w-[500px] h-[400px] rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  /* ── 4. CREATIVE SUNSET ────────────────────────────────────────
   * Light-warm background (#fff7ed) → orange/pink pattern
   * Motif: Concentric circles / ripple waves — artistic, organic
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
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="#f97316"
                strokeWidth="0.5"
              />
              <circle
                cx="40"
                cy="40"
                r="24"
                fill="none"
                stroke="#db2777"
                strokeWidth="0.5"
              />
              <circle
                cx="40"
                cy="40"
                r="12"
                fill="none"
                stroke="#f97316"
                strokeWidth="0.4"
              />
              <circle cx="40" cy="40" r="3" fill="#db2777" opacity="0.3" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#ripple-sunset)"
            opacity="0.1"
          />
        </svg>
        {/* Warm amber glow — bottom left */}
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full blur-[180px]"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Pink glow — top right */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(219,39,119,0.06) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  /* ── 5. SLATE MINIMALIST ───────────────────────────────────────
   * Light background (#f1f5f9) → slate-grey pattern
   * Motif: Ultra-fine dot matrix — clean, Scandinavian minimalism
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
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="#334155" opacity="0.5" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#dot-slate)"
            opacity="0.35"
          />
        </svg>
        {/* Very subtle top gradient to fade the dots near header */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(241,245,249,0.7) 0%, transparent 25%, transparent 75%, rgba(241,245,249,0.7) 100%)",
          }}
        />
      </div>
    );
  }

  /* ── 6. EMERALD LEADER ─────────────────────────────────────────
   * Light-green background (#f0fdf4) → emerald pattern
   * Motif: Leaf / botanical — overlapping diamond grid, organic
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
              {/* Diamond / rotated square */}
              <rect
                x="15"
                y="15"
                width="30"
                height="30"
                transform="rotate(45 30 30)"
                fill="none"
                stroke="#059669"
                strokeWidth="0.7"
              />
              {/* Inner small diamond */}
              <rect
                x="22"
                y="22"
                width="16"
                height="16"
                transform="rotate(45 30 30)"
                fill="none"
                stroke="#10b981"
                strokeWidth="0.4"
              />
              {/* Centre dot */}
              <circle cx="30" cy="30" r="1.5" fill="#059669" opacity="0.35" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#diamond-emerald)"
            opacity="0.12"
          />
        </svg>
        {/* Emerald ambient glow */}
        <div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{
            background:
              "radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  return null;
};

export default ThemeBackgroundFX;
