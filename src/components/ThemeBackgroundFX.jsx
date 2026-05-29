import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

/**
 * ThemeBackgroundFX — "Felt, Not Seen" principle
 *
 * Each theme gets a unique SVG geometric background pattern.
 * CORPORATE GOLD gets a full Mughal/Baroque floral damask pattern.
 */

/** Helper: 5-petal flower centered at (cx, cy) */
const Flower5 = ({ cx, cy, pr = 3, pl = 7, sw = 0.7, id }) =>
  [0, 72, 144, 216, 288].map((a) => (
    <ellipse
      key={`${id}-${a}`}
      cx={cx}
      cy={cy - pl}
      rx={pr}
      ry={pl}
      transform={`rotate(${a} ${cx} ${cy})`}
      strokeWidth={sw}
    />
  ));

const MidnightDevParticles = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles-midnight"
      init={particlesInit}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            repulse: {
              distance: 140,
              links: {
                opacity: 0.8,
                color: "#7dd3fc",
              },
            },
          },
        },
        particles: {
          color: { value: ["#7dd3fc", "#38bdf8"] },
          links: {
            color: "#38bdf8",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 60,
          },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 w-full h-full"
    />
  );
};

const ThemeBackgroundFX = ({ themeName }) => {
  if (!themeName) return null;

  /* ── 1. CVIFY CLASSIC ──────────────────────────────────────────
   * Light bg (#f8fafc) → navy-blue hexagon grid
   */
  if (themeName === "CVIFY CLASSIC") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 30%, black 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 30%, black 80%)",
          }}
        >
          <defs>
            <pattern id="hex-classic" width="90" height="156" patternUnits="userSpaceOnUse">
              <polygon points="45,3 87,26 87,71 45,93 3,71 3,26" fill="none" stroke="#1e40af" strokeWidth="0.9" />
              <polygon points="45,93 87,116 87,161 45,183 3,161 3,116" fill="none" stroke="#1e40af" strokeWidth="0.9" />
              <circle cx="45" cy="48" r="2" fill="#1e40af" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-classic)" opacity="0.22" />
        </svg>
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)" }} />
      </div>
    );
  }

  /* ── 2. MIDNIGHT DEV ───────────────────────────────────────────
   * Dark bg (#020617) → Abstract Tech Network / Constellation using tsParticles
   */
  if (themeName === "MIDNIGHT DEV") {
    return (
      <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden" aria-hidden="true">
        <div style={{
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 20%, black 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 20%, black 80%)",
          position: "absolute",
          inset: 0,
        }}>
          <MidnightDevParticles />
        </div>
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[220px]"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-20 left-[15%] w-[600px] h-[400px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 65%)" }} />
      </div>
    );
  }

  /* ── 3. CORPORATE GOLD ─────────────────────────────────────────
   * White bg (#ffffff) → Full Mughal/Baroque Floral Damask in gold
   * 200×200 tile: central 8-petal mandala + 4 diagonal vine branches
   * with leaves, curls, and 5-petal terminal flowers — pure SVG code
   */
  if (themeName === "CORPORATE GOLD") {
    const gc = "#c4962a"; // gold stroke
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 90% 90% at 50% 45%, transparent 10%, black 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 90% at 50% 45%, transparent 10%, black 65%)",
          }}
        >
          <defs>
            <pattern id="floral-damask-gold" width="200" height="200" patternUnits="userSpaceOnUse">
              <g fill="none" stroke={gc} strokeLinecap="round" strokeLinejoin="round">

                {/* ══ CENTRAL MANDALA FLOWER at (100,100) ══ */}
                {/* 8 outer petals */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <ellipse key={`op-${a}`} cx="100" cy="74" rx="6" ry="22"
                    transform={`rotate(${a} 100 100)`} strokeWidth="0.85" />
                ))}
                {/* 8 inner petals (offset 22.5°) */}
                {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((a) => (
                  <ellipse key={`ip-${a}`} cx="100" cy="83" rx="3.5" ry="13"
                    transform={`rotate(${a} 100 100)`} strokeWidth="0.7" />
                ))}
                {/* Stamen rings + centre dot */}
                <circle cx="100" cy="100" r="9"  strokeWidth="0.85" />
                <circle cx="100" cy="100" r="5"  strokeWidth="0.7"  />
                <circle cx="100" cy="100" r="2"  fill={gc} stroke="none" />

                {/* ══ TOP-LEFT VINES ══ */}
                <path d="M 92,80 C 76,62 56,66 40,48 C 26,32 12,16 0,0"   strokeWidth="0.8" />
                <path d="M 82,88 C 66,76 46,80 30,66 C 17,54 8,36 4,24"   strokeWidth="0.75" />
                {/* TL Leaves */}
                <path d="M 64,60 C 54,48 58,38 66,44 C 68,37 70,47 64,60 Z"   strokeWidth="0.65" />
                <path d="M 72,72 C 60,62 62,50 70,55 C 71,48 74,57 72,72 Z"   strokeWidth="0.65" />
                <path d="M 45,44 C 36,35 38,24 46,29 C 47,22 50,31 45,44 Z"   strokeWidth="0.65" />
                <path d="M 54,74 C 44,65 46,54 54,59 C 55,52 58,61 54,74 Z"   strokeWidth="0.65" />
                <path d="M 22,24 C 14,17 17,8 24,12 C 25,6 28,14 22,24 Z"    strokeWidth="0.65" />
                <path d="M 18,48 C 10,42 12,32 19,36 C 20,29 23,37 18,48 Z"   strokeWidth="0.65" />
                {/* TL terminal flowers */}
                <Flower5 cx={2}  cy={2}  pr={2.8} pl={6.5} sw={0.7}  id="fl-tl1" />
                <circle cx="2"  cy="2"  r="2"   strokeWidth="0.65" />
                <Flower5 cx={4}  cy={24} pr={2.5} pl={5.5} sw={0.65} id="fl-tl2" />
                <circle cx="4"  cy="24" r="1.8" strokeWidth="0.6"  />

                {/* ══ TOP-RIGHT VINES (mirror of TL) ══ */}
                <path d="M 108,80 C 124,62 144,66 160,48 C 174,32 188,16 200,0"   strokeWidth="0.8" />
                <path d="M 118,88 C 134,76 154,80 170,66 C 183,54 192,36 196,24"  strokeWidth="0.75" />
                {/* TR Leaves */}
                <path d="M 136,60 C 146,48 142,38 134,44 C 132,37 130,47 136,60 Z" strokeWidth="0.65" />
                <path d="M 128,72 C 140,62 138,50 130,55 C 129,48 126,57 128,72 Z" strokeWidth="0.65" />
                <path d="M 155,44 C 164,35 162,24 154,29 C 153,22 150,31 155,44 Z" strokeWidth="0.65" />
                <path d="M 146,74 C 156,65 154,54 146,59 C 145,52 142,61 146,74 Z" strokeWidth="0.65" />
                <path d="M 178,24 C 186,17 183,8 176,12 C 175,6 172,14 178,24 Z"  strokeWidth="0.65" />
                <path d="M 182,48 C 190,42 188,32 181,36 C 180,29 177,37 182,48 Z" strokeWidth="0.65" />
                {/* TR terminal flowers */}
                <Flower5 cx={198} cy={2}  pr={2.8} pl={6.5} sw={0.7}  id="fl-tr1" />
                <circle cx="198" cy="2"  r="2"   strokeWidth="0.65" />
                <Flower5 cx={196} cy={24} pr={2.5} pl={5.5} sw={0.65} id="fl-tr2" />
                <circle cx="196" cy="24" r="1.8" strokeWidth="0.6"  />

                {/* ══ BOTTOM-LEFT VINES (vertical mirror of TL) ══ */}
                <path d="M 92,120 C 76,138 56,134 40,152 C 26,168 12,184 0,200"   strokeWidth="0.8" />
                <path d="M 82,112 C 66,124 46,120 30,134 C 17,146 8,164 4,176"    strokeWidth="0.75" />
                {/* BL Leaves */}
                <path d="M 64,140 C 54,152 58,162 66,156 C 68,163 70,153 64,140 Z" strokeWidth="0.65" />
                <path d="M 72,128 C 60,138 62,150 70,145 C 71,152 74,143 72,128 Z" strokeWidth="0.65" />
                <path d="M 45,156 C 36,165 38,176 46,171 C 47,178 50,169 45,156 Z" strokeWidth="0.65" />
                <path d="M 54,126 C 44,135 46,146 54,141 C 55,148 58,139 54,126 Z" strokeWidth="0.65" />
                <path d="M 22,176 C 14,183 17,192 24,188 C 25,194 28,186 22,176 Z" strokeWidth="0.65" />
                <path d="M 18,152 C 10,158 12,168 19,164 C 20,171 23,163 18,152 Z" strokeWidth="0.65" />
                {/* BL terminal flowers */}
                <Flower5 cx={2}  cy={198} pr={2.8} pl={6.5} sw={0.7}  id="fl-bl1" />
                <circle cx="2"  cy="198" r="2"   strokeWidth="0.65" />
                <Flower5 cx={4}  cy={176} pr={2.5} pl={5.5} sw={0.65} id="fl-bl2" />
                <circle cx="4"  cy="176" r="1.8" strokeWidth="0.6"  />

                {/* ══ BOTTOM-RIGHT VINES ══ */}
                <path d="M 108,120 C 124,138 144,134 160,152 C 174,168 188,184 200,200" strokeWidth="0.8" />
                <path d="M 118,112 C 134,124 154,120 170,134 C 183,146 192,164 196,176"  strokeWidth="0.75" />
                {/* BR Leaves */}
                <path d="M 136,140 C 146,152 142,162 134,156 C 132,163 130,153 136,140 Z" strokeWidth="0.65" />
                <path d="M 128,128 C 140,138 138,150 130,145 C 129,152 126,143 128,128 Z" strokeWidth="0.65" />
                <path d="M 155,156 C 164,165 162,176 154,171 C 153,178 150,169 155,156 Z" strokeWidth="0.65" />
                <path d="M 146,126 C 156,135 154,146 146,141 C 145,148 142,139 146,126 Z" strokeWidth="0.65" />
                <path d="M 178,176 C 186,183 183,192 176,188 C 175,194 172,186 178,176 Z" strokeWidth="0.65" />
                <path d="M 182,152 C 190,158 188,168 181,164 C 180,171 177,163 182,152 Z" strokeWidth="0.65" />
                {/* BR terminal flowers */}
                <Flower5 cx={198} cy={198} pr={2.8} pl={6.5} sw={0.7}  id="fl-br1" />
                <circle cx="198" cy="198" r="2"   strokeWidth="0.65" />
                <Flower5 cx={196} cy={176} pr={2.5} pl={5.5} sw={0.65} id="fl-br2" />
                <circle cx="196" cy="176" r="1.8" strokeWidth="0.6"  />

                {/* ══ MID-EDGE FLOWERS (seamless tile join points) ══ */}
                {/* Left edge (0,100) */}
                <Flower5 cx={0}   cy={100} pr={2.5} pl={5.5} sw={0.65} id="fl-le" />
                <circle cx="0"   cy="100" r="1.8" strokeWidth="0.6" />
                {/* Right edge (200,100) */}
                <Flower5 cx={200} cy={100} pr={2.5} pl={5.5} sw={0.65} id="fl-re" />
                <circle cx="200" cy="100" r="1.8" strokeWidth="0.6" />
                {/* Top edge (100,0) */}
                <Flower5 cx={100} cy={0}   pr={2.5} pl={5.5} sw={0.65} id="fl-te" />
                <circle cx="100" cy="0"   r="1.8" strokeWidth="0.6" />
                {/* Bottom edge (100,200) */}
                <Flower5 cx={100} cy={200} pr={2.5} pl={5.5} sw={0.65} id="fl-be" />
                <circle cx="100" cy="200" r="1.8" strokeWidth="0.6" />

                {/* ══ DECORATIVE CURLS near the central flower ══ */}
                <path d="M 84,74  C 78,64 80,57 86,60 C 84,53 90,57 86,65"   strokeWidth="0.6" />
                <path d="M 116,74 C 122,64 120,57 114,60 C 116,53 110,57 114,65"  strokeWidth="0.6" />
                <path d="M 84,126 C 78,136 80,143 86,140 C 84,147 90,143 86,135" strokeWidth="0.6" />
                <path d="M 116,126 C 122,136 120,143 114,140 C 116,147 110,143 114,135" strokeWidth="0.6" />

              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#floral-damask-gold)" opacity="0.22" />
        </svg>

        {/* Gold atmospheric glow — top right */}
        <div className="absolute -top-20 right-0 w-[600px] h-[500px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(196,150,42,0.1) 0%, transparent 65%)" }} />
        {/* Navy depth — bottom left */}
        <div className="absolute bottom-0 -left-20 w-[500px] h-[400px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(30,58,138,0.08) 0%, transparent 65%)" }} />
      </div>
    );
  }

  /* ── 4. CREATIVE SUNSET ────────────────────────────────────────
   * Light-warm bg (#fff7ed) → concentric ripple circles
   */
  if (themeName === "CREATIVE SUNSET") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 25%, black 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 25%, black 75%)",
          }}
        >
          <defs>
            <pattern id="ripple-sunset" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#c2410c" strokeWidth="0.9" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#9d174d" strokeWidth="0.7" />
              <circle cx="50" cy="50" r="17" fill="none" stroke="#c2410c" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="4"  fill="#9d174d" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ripple-sunset)" opacity="0.18" />
        </svg>
        <div className="absolute -bottom-20 left-0 w-[700px] h-[500px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 65%)" }} />
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(219,39,119,0.09) 0%, transparent 65%)" }} />
      </div>
    );
  }

  /* ── 5. SLATE MINIMALIST ───────────────────────────────────────
   * Light bg (#f1f5f9) → fine dot matrix with mask
   */
  if (themeName === "SLATE MINIMALIST") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: "radial-gradient(ellipse 75% 75% at 50% 40%, transparent 20%, black 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 40%, transparent 20%, black 80%)",
          }}
        >
          <defs>
            <pattern id="dot-slate" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="1.4" fill="#475569" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-slate)" opacity="0.7" />
        </svg>
      </div>
    );
  }

  /* ── 6. EMERALD LEADER ─────────────────────────────────────────
   * Light-green bg (#f0fdf4) → diamond botanical grid
   */
  if (themeName === "EMERALD LEADER") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, transparent 30%, black 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, transparent 30%, black 80%)",
          }}
        >
          <defs>
            <pattern id="diamond-emerald" width="64" height="64" patternUnits="userSpaceOnUse">
              <rect x="16" y="16" width="32" height="32" transform="rotate(45 32 32)"
                fill="none" stroke="#065f46" strokeWidth="0.9" />
              <rect x="24" y="24" width="16" height="16" transform="rotate(45 32 32)"
                fill="none" stroke="#059669" strokeWidth="0.5" />
              <circle cx="32" cy="32" r="1.8" fill="#065f46" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamond-emerald)" opacity="0.2" />
        </svg>
        <div className="absolute -top-20 right-[5%] w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, rgba(5,150,105,0.09) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-20 left-[5%] w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)" }} />
      </div>
    );
  }

  return null;
};

export default ThemeBackgroundFX;
