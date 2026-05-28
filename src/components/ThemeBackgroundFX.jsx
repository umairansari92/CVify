import React from "react";

/**
 * ThemeBackgroundFX — "Felt, Not Seen" principle
 *
 * A premium background pattern should add depth and texture
 * without competing with content. Rules:
 *  - Radial mask: pattern fades at center (where content lives),
 *    stays visible at edges for subtle framing
 *  - Opacity: 0.07–0.12 for light bg, 0.15–0.22 for dark bg
 *  - Larger tile size = less dense = more elegant
 */
const ThemeBackgroundFX = ({ themeName }) => {
  if (!themeName) return null;

  /* ── 1. CVIFY CLASSIC ──────────────────────────────────────────
   * Light bg (#f8fafc) → navy-blue hexagon grid
   * Radial mask fades the center → premium texture at edges
   */
  if (themeName === "CVIFY CLASSIC") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 30%, black 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 30%, black 80%)",
          }}
        >
          <defs>
            <pattern
              id="hex-classic"
              width="90"
              height="156"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="45,3 87,26 87,71 45,93 3,71 3,26"
                fill="none"
                stroke="#1e40af"
                strokeWidth="0.9"
              />
              <polygon
                points="45,93 87,116 87,161 45,183 3,161 3,116"
                fill="none"
                stroke="#1e40af"
                strokeWidth="0.9"
              />
              <circle cx="45" cy="48" r="2" fill="#1e40af" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-classic)" opacity="0.22" />
        </svg>

        {/* Soft blue atmosphere — top left corner */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 65%)" }}
        />
        {/* Purple atmosphere — bottom right */}
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)" }}
        />
      </div>
    );
  }

  /* ── 2. MIDNIGHT DEV ───────────────────────────────────────────
   * Dark bg (#020617) → cyan dot-grid
   * Radial mask keeps center clean, edges glow subtly
   */
  if (themeName === "MIDNIGHT DEV") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 25%, black 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 25%, black 75%)",
          }}
        >
          <defs>
            <pattern
              id="code-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="48" y2="0" stroke="#38bdf8" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="0" y2="48" stroke="#38bdf8" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="#7dd3fc" opacity="0.9" />
              <circle cx="24" cy="24" r="0.8" fill="#38bdf8" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#code-grid)" opacity="0.3" />
        </svg>

        {/* Cyan core glow */}
        <div
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[220px]"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 65%)" }}
        />
        {/* Teal edge glow — bottom */}
        <div
          className="absolute -bottom-20 left-[15%] w-[600px] h-[400px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 65%)" }}
        />
      </div>
    );
  }

  /* ── 3. CORPORATE GOLD ─────────────────────────────────────────
   * Light bg (#ffffff) → fine diagonal cross-hatch (navy + gold)
   * Radial mask: invisible center, subtle frame at edges
   */
  if (themeName === "CORPORATE GOLD") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 45%, transparent 30%, black 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 45%, transparent 30%, black 80%)",
          }}
        >
          <defs>
            <pattern
              id="crosshatch-gold"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="32" x2="32" y2="0" stroke="#1e3a8a" strokeWidth="0.7" />
              <line x1="0" y1="0" x2="32" y2="32" stroke="#92400e" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crosshatch-gold)" opacity="0.18" />
        </svg>

        {/* Gold shimmer — top right */}
        <div
          className="absolute -top-20 right-0 w-[600px] h-[500px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 65%)" }}
        />
        {/* Navy depth — bottom left */}
        <div
          className="absolute bottom-0 -left-20 w-[500px] h-[400px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(30,58,138,0.07) 0%, transparent 65%)" }}
        />
      </div>
    );
  }

  /* ── 4. CREATIVE SUNSET ────────────────────────────────────────
   * Light-warm bg (#fff7ed) → concentric ripple circles (organic)
   * Mask keeps center clean so profile text stays readable
   */
  if (themeName === "CREATIVE SUNSET") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 25%, black 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 25%, black 75%)",
          }}
        >
          <defs>
            <pattern
              id="ripple-sunset"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="#c2410c" strokeWidth="0.9" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#9d174d" strokeWidth="0.7" />
              <circle cx="50" cy="50" r="17" fill="none" stroke="#c2410c" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="4" fill="#9d174d" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ripple-sunset)" opacity="0.18" />
        </svg>

        {/* Warm amber atmosphere — bottom */}
        <div
          className="absolute -bottom-20 left-0 w-[700px] h-[500px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 65%)" }}
        />
        {/* Pink atmosphere — top right */}
        <div
          className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(219,39,119,0.09) 0%, transparent 65%)" }}
        />
      </div>
    );
  }

  /* ── 5. SLATE MINIMALIST ───────────────────────────────────────
   * Light bg (#f1f5f9) → fine dot matrix
   * Mask fades center (Notion / Linear inspired minimal aesthetic)
   */
  if (themeName === "SLATE MINIMALIST") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 75% 75% at 50% 40%, transparent 20%, black 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 75% at 50% 40%, transparent 20%, black 80%)",
          }}
        >
          <defs>
            <pattern
              id="dot-slate"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="12" cy="12" r="1.4" fill="#475569" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-slate)" opacity="0.7" />
        </svg>
      </div>
    );
  }

  /* ── 6. EMERALD LEADER ─────────────────────────────────────────
   * Light-green bg (#f0fdf4) → diamond grid (botanical)
   * Mask keeps profile center clean, botanical frame at edges
   */
  if (themeName === "EMERALD LEADER") {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 45%, transparent 30%, black 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 45%, transparent 30%, black 80%)",
          }}
        >
          <defs>
            <pattern
              id="diamond-emerald"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="16" y="16" width="32" height="32"
                transform="rotate(45 32 32)"
                fill="none"
                stroke="#065f46"
                strokeWidth="0.9"
              />
              <rect
                x="24" y="24" width="16" height="16"
                transform="rotate(45 32 32)"
                fill="none"
                stroke="#059669"
                strokeWidth="0.5"
              />
              <circle cx="32" cy="32" r="1.8" fill="#065f46" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamond-emerald)" opacity="0.2" />
        </svg>

        {/* Emerald glow — top right */}
        <div
          className="absolute -top-20 right-[5%] w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, rgba(5,150,105,0.09) 0%, transparent 65%)" }}
        />
        {/* Teal glow — bottom left */}
        <div
          className="absolute -bottom-20 left-[5%] w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)" }}
        />
      </div>
    );
  }

  return null;
};

export default ThemeBackgroundFX;
