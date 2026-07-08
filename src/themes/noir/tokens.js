export const tokens = {
  colors: {
    bg: "#060606", // Deep black background
    cardBg: "rgba(255,255,255,0.02)",
    border: "rgba(255, 255, 255, 0.05)",
    borderHover: "rgba(255, 255, 255, 0.15)",
    
    primary: "#F0F0F0",    // Off-white for primary text
    secondary: "rgba(240, 240, 240, 0.7)", // Muted text
    accent: "#FF2E0C",     // Vivid orange/red for accents
    
    // CVify AI elements colors adapted for Noir
    aiGlow: "rgba(255, 46, 12, 0.15)",
  },
  
  fonts: {
    heading: "'Satoshi', system-ui, sans-serif",
    body: "'Satoshi', system-ui, sans-serif",
    mono: "'GeistMono', 'SF Mono', monospace", // Numbers, labels, code
  },

  spacing: {
    desktop: "96px",
    tablet: "80px",
    mobile: "64px",
  },

  layout: {
    maxWidth: "1400px",
    gridDesktop: "grid-cols-12",
    gridTablet: "md:grid-cols-8",
    gridMobile: "grid-cols-1",
  },

  motion: {
    duration: {
      fast: 0.3,   // 300ms
      normal: 0.45, // 450ms
      slow: 0.7,   // 700ms
    },
    easing: {
      base: [0.16, 1, 0.3, 1], // Custom easeOut (ease-expo equivalent)
      smooth: [0.4, 0, 0.2, 1], // easeInOut
    }
  }
};
