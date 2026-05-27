import React from "react";

/**
 * ORIENTAL LUXE — Ambient Background Layer
 * Creates the full-page atmospheric effect:
 * 1. Islamic geometric khatim SVG pattern (ultra-subtle)
 * 2. Radial copper glow orbs (ambient light)
 * 3. Top-to-bottom vignette gradient
 */
const BackgroundFX = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* ── Layer 1: Islamic Khatim Geometric Pattern ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, #000 30%, transparent 75%)",
        }}
      >
        <defs>
          <pattern id="khatim-luxe" width="110" height="110" patternUnits="userSpaceOnUse">
            <polygon
              points="55,17 60.93,40.68 81.87,28.13 69.32,49.07 93,55 69.32,60.93 81.87,81.87 60.93,69.32 55,93 49.07,69.32 28.13,81.87 40.68,60.93 17,55 40.68,49.07 28.13,28.13 49.07,40.68"
              fill="none"
              stroke="#b58953"
              strokeWidth="0.8"
            />
            <circle cx="55" cy="55" r="5" fill="none" stroke="#b58953" strokeWidth="0.5" />
            <g stroke="#b58953" strokeWidth="0.6">
              <line x1="55" y1="17" x2="55" y2="0" />
              <line x1="55" y1="93" x2="55" y2="110" />
              <line x1="17" y1="55" x2="0" y2="55" />
              <line x1="93" y1="55" x2="110" y2="55" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#khatim-luxe)" opacity="0.07" />
      </svg>

      {/* ── Layer 2: Ambient Copper Glow Orbs ── */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(181,137,83,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[30%] left-[30%] w-[400px] h-[400px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(181,137,83,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-[60%] right-[20%] w-[350px] h-[350px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(181,137,83,0.06) 0%, transparent 70%)" }}
      />

      {/* ── Layer 3: Top Vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(9,9,9,0.6) 0%, transparent 30%, transparent 70%, rgba(9,9,9,0.8) 100%)",
        }}
      />
    </div>
  );
};

export default BackgroundFX;
