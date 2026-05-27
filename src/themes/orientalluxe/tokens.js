// ═══════════════════════════════════════════════════════════════
// ORIENTAL LUXE — Complete Design System Tokens
// A full visual system, NOT just colors. Every section,
// card, animation, and layout is driven by this token set.
// ═══════════════════════════════════════════════════════════════

export const tokens = {
  // ── Color Palette ──
  colors: {
    bg:           "#090909",
    bgSoft:       "#0f0f0f",
    bgCard:       "#121212",
    bgCardHover:  "#161616",
    border:       "#1a1a1a",
    borderHover:  "rgba(181, 137, 83, 0.4)",
    accent:       "#b58953",
    accentDark:   "#9a7344",
    accentLight:  "#cda472",
    accentGlow:   "rgba(181, 137, 83, 0.15)",
    accentGlowStrong: "rgba(181, 137, 83, 0.3)",
    textPrimary:  "#ffffff",
    textSecondary:"#a3a3a3",
    textMuted:    "#737373",
  },

  // ── Typography System ──
  fonts: {
    primary: "'Outfit', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  // ── Spacing Scale (px) ──
  spacing: {
    sectionY: "6rem",   // py-24
    sectionX: "1.5rem", // px-6
    cardPad:  "1.75rem",
    gap:      "1.5rem",
    gapLg:    "3rem",
  },

  // ── Border Radii ──
  radius: {
    card: "16px",
    pill: "9999px",
    button: "9999px",
    image: "16px",
  },

  // ── Shadows ──
  shadows: {
    glow:       "0 0 30px rgba(181, 137, 83, 0.1)",
    glowStrong: "0 0 50px rgba(181, 137, 83, 0.2)",
    card:       "0 4px 24px rgba(0, 0, 0, 0.3)",
    cardHover:  "0 8px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(181, 137, 83, 0.1)",
    hero:       "0 0 40px rgba(181, 137, 83, 0.25)",
  },

  // ── Transition Presets ──
  transitions: {
    fast:   "150ms ease",
    normal: "300ms ease",
    slow:   "500ms ease",
    spring: "500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
};
