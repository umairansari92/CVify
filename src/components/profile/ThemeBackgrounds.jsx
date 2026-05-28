import React from "react";

const ThemeBackgrounds = ({ theme }) => {
  if (!theme || !theme.name) return null;
  const themeName = theme.name;

  let patternColor = "transparent";
  let patternId = "pattern-default";

  // Assign appropriate contrast colors for each theme
  switch (themeName) {
    case "CVIFY CLASSIC":
      patternColor = "#cbd5e1"; // Slate 300 for Light BG
      break;
    case "MIDNIGHT DEV":
      patternColor = "#1e293b"; // Slate 800 for Dark BG
      break;
    case "CORPORATE GOLD":
      patternColor = "#e2e8f0"; // Slate 200 for White BG
      break;
    case "CREATIVE SUNSET":
      patternColor = "#ffedd5"; // Orange 100 for Peach BG
      break;
    case "SLATE MINIMALIST":
      patternColor = "#e2e8f0"; // Slate 200 for Slate 100 BG
      break;
    case "EMERALD LEADER":
      patternColor = "#dcfce7"; // Green 100 for Green 50 BG
      break;
    default:
      return null; // For Oriental Luxe and others that have their own BG
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" style={{ color: patternColor }}>
        <defs>
          {/* CVIFY CLASSIC: Tech Grid / Plus */}
          {themeName === "CVIFY CLASSIC" && (
            <pattern id="pattern-classic" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 15v10M15 20h10" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          )}

          {/* MIDNIGHT DEV: Circuit Matrix */}
          {themeName === "MIDNIGHT DEV" && (
            <pattern id="pattern-midnight" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 60L60 0M30 60L60 30M0 30L30 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
              <circle cx="30" cy="30" r="1.5" fill="currentColor" />
              <circle cx="15" cy="45" r="1" fill="currentColor" opacity="0.5" />
              <circle cx="45" cy="15" r="1" fill="currentColor" opacity="0.5" />
            </pattern>
          )}

          {/* CORPORATE GOLD: Diamond Lattice */}
          {themeName === "CORPORATE GOLD" && (
            <pattern id="pattern-corporate" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <path d="M15 15L45 45M15 45L45 15" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
            </pattern>
          )}

          {/* CREATIVE SUNSET: Flowing Waves (Seigaiha inspired) */}
          {themeName === "CREATIVE SUNSET" && (
            <pattern id="pattern-creative" width="60" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="45" cy="15" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="15" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="45" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="15" cy="15" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="45" cy="15" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          )}

          {/* SLATE MINIMALIST: Diagonal Minimal Stripes */}
          {themeName === "SLATE MINIMALIST" && (
            <pattern id="pattern-slate" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M-2 14L14 -2" stroke="currentColor" strokeWidth="1" fill="none" />
            </pattern>
          )}

          {/* EMERALD LEADER: Hexagon Grid */}
          {themeName === "EMERALD LEADER" && (
            <pattern id="pattern-emerald" width="28" height="48.497" patternUnits="userSpaceOnUse">
              <path d="M14 8.082l13 7.5v15l-13 7.5-13-7.5v-15l13-7.5zM14 0v8.082M0 48.497v-10.415M28 48.497v-10.415" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          )}
        </defs>

        {themeName === "CVIFY CLASSIC" && <rect width="100%" height="100%" fill="url(#pattern-classic)" opacity="0.8" />}
        {themeName === "MIDNIGHT DEV" && <rect width="100%" height="100%" fill="url(#pattern-midnight)" opacity="0.8" />}
        {themeName === "CORPORATE GOLD" && <rect width="100%" height="100%" fill="url(#pattern-corporate)" opacity="0.6" />}
        {themeName === "CREATIVE SUNSET" && <rect width="100%" height="100%" fill="url(#pattern-creative)" opacity="0.8" />}
        {themeName === "SLATE MINIMALIST" && <rect width="100%" height="100%" fill="url(#pattern-slate)" opacity="0.6" />}
        {themeName === "EMERALD LEADER" && <rect width="100%" height="100%" fill="url(#pattern-emerald)" opacity="0.7" />}
      </svg>
    </div>
  );
};

export default ThemeBackgrounds;
