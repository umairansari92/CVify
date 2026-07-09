#!/usr/bin/env node
/**
 * createTheme.cjs — CVify Theme SDK Scaffolder (CommonJS)
 *
 * Usage: npm run create-theme -- --name=aurora
 */

const fs   = require("fs");
const path = require("path");

// Parse name argument
const args  = process.argv.slice(2);
let rawName = "";

const nameArg = args.find(a => a.startsWith("--name="));
if (nameArg) {
  rawName = nameArg.split("=")[1].trim();
} else {
  // Fall back to first positional argument that doesn't start with a dash
  const positionalArg = args.find(a => !a.startsWith("-"));
  if (positionalArg) {
    rawName = positionalArg.trim();
  }
}

if (!rawName) {
  console.error("\n\x1b[31mError: provide a theme name. Example: npm run create-theme -- --name=aurora or npm run create-theme aurora\x1b[0m\n");
  process.exit(1);
}
const dirName   = rawName.toLowerCase().replace(/\s+/g, "");
const themeId   = rawName.toUpperCase().replace(/\s+/g, "_");
const themeName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();

const THEMES_DIR  = path.resolve(__dirname, "../src/profile/themes");
const TARGET_DIR  = path.join(THEMES_DIR, dirName);

if (fs.existsSync(TARGET_DIR)) {
  console.error(`\n\x1b[31mError: Theme directory already exists: ${TARGET_DIR}\x1b[0m\n`);
  process.exit(1);
}

fs.mkdirSync(TARGET_DIR, { recursive: true });

const files = {
  "manifest.js": `export default {
  id: "${themeId}",
  name: "${themeName}",
  version: "1.0.0",
  engine: "4.0",
  author: "CVify",
  description: "Add a description for your theme here.",
  thumbnail: "./preview.webp",
  supportedModes: ["dark"],
  defaultPreset: "${themeId}",
  features: {
    github: true,
    analytics: true,
    resume: true,
    contact: true,
    particles: false,
    glass: false,
  },
  navigation: {
    home: "hero",
    about: "about",
    journey: "experience",
    showcase: "showcase",
    contact: "contact",
  },
};
`,

  "theme.config.js": `export default {
  animations: { entrance: "fade-up", hover: "lift", page: "none" },
  scroll: { behavior: "smooth", threshold: 80 },
  spacing: { section: "py-24 md:py-32", container: "max-w-6xl mx-auto px-6" },
  radius: { card: "1rem", button: "0.75rem" },
  transitions: { default: "all 0.3s ease", hover: "all 0.2s ease" },
  shadows: { card: "0 8px 32px rgba(0,0,0,0.15)" },
  blur: { glass: "backdrop-blur-md" },
  glass: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)" },
};
`,

  "tokens.js": `export const tokens = {
  colors: {
    bg:            "#000000",
    surface:       "#111111",
    primary:       "#ffffff",
    secondary:     "rgba(255,255,255,0.6)",
    accent:        "#FF0000",
    border:        "rgba(255,255,255,0.08)",
  },
  fonts: {
    body:    "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
    mono:    "'JetBrains Mono', monospace",
  },
  spacing: {
    section: "6rem",
    container: "80rem",
  },
};
`,

  "sections.js": `/**
 * Sections list — determines render order for this theme.
 */
export default [];
`,

  "index.jsx": `import React from "react";
import { tokens } from "./tokens.js";

const ${themeName}Theme = ({
  manifest,
  model,
  config,
  tokens: themeTokens,
  components,
  runtime,

  user,
  projects,
  isOwner,
  handleLiveUpdate,
  handleArrayUpdate,
  setShowResumeModal,
  contactForm,
  setContactForm,
  handleContactSubmit,
  isSending,
  githubData,
  githubLoading,
  analytics,
}) => {
  if (!user && !model) return null;

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: tokens.colors.bg,
        color: tokens.colors.primary,
        fontFamily: tokens.fonts.body,
      }}
    >
      <div id="hero" className="min-h-screen flex items-center justify-center">
        <h1 style={{ color: tokens.colors.accent }}>
          {model?.hero?.fullName || user?.firstName || "${themeName} Theme"}
        </h1>
      </div>
    </div>
  );
};

export default ${themeName}Theme;
`,

  "README.md": `# ${themeName} Theme

## Overview
Design description.
`,
};

// Write all files
for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(TARGET_DIR, filename), content, "utf-8");
}

console.log(`\n\x1b[32m✓ Theme "${themeName}" scaffolded at:\x1b[0m`);
console.log(`  ${TARGET_DIR}\n`);
console.log("Files created:");
Object.keys(files).forEach(f => console.log(`  - ${f}`));
