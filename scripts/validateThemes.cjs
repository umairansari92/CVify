#!/usr/bin/env node
/**
 * validateThemes.cjs — CVify Theme Engine Validator (CommonJS)
 *
 * Run: npm run validate-themes
 */

const fs   = require("fs");
const path = require("path");

const THEMES_DIR = path.resolve(__dirname, "../src/profile/themes");
const REQUIRED_FILES = ["manifest.js", "theme.config.js", "index.jsx"];
const REQUIRED_MANIFEST_KEYS = ["id", "engine", "features", "navigation"];

const FORBIDDEN_PATTERNS = [
  { pattern: /\buseSelector\b/, reason: "Theme must not access Redux (useSelector)" },
  { pattern: /\buseDispatch\b/, reason: "Theme must not access Redux (useDispatch)" },
  { pattern: /\buseStore\b/,    reason: "Theme must not access Redux (useStore)" },
  { pattern: /\baxios\b/,       reason: "Theme must not make network requests (axios)" },
  { pattern: /\bfetch\s*\(/,    reason: "Theme must not make network requests (fetch)" },
  { pattern: /\blocalStorage\b/,reason: "Theme must not access browser storage (localStorage)" },
  { pattern: /\bsessionStorage\b/,reason:"Theme must not access browser storage (sessionStorage)" },
  { pattern: /\bWebSocket\b/,   reason: "Theme must not use WebSocket" },
  { pattern: /\bXMLHttpRequest\b/,reason:"Theme must not use XMLHttpRequest" },
  { pattern: /\bimport\.meta\.env\b/, reason: "Theme must not read environment variables directly" },
];

let passed = 0;
let failed = 0;
const errors = [];

function log(msg)  { console.log(`  ${msg}`); }
function ok(msg)   { console.log(`  \x1b[32m✓\x1b[0m ${msg}`); passed++; }
function fail(msg) { console.log(`  \x1b[31m✗\x1b[0m ${msg}`); failed++; errors.push(msg); }
function warn(msg) { console.log(`  \x1b[33m⚠\x1b[0m ${msg}`); }

// Get all theme directories (skip registry.js itself)
const themeDirs = fs.readdirSync(THEMES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

if (!themeDirs.length) {
  console.log("\n\x1b[33mNo theme directories found.\x1b[0m");
  process.exit(0);
}

console.log(`\n\x1b[1mCVify Theme Engine Validator\x1b[0m`);
console.log(`Scanning ${themeDirs.length} theme(s) in: ${THEMES_DIR}\n`);

for (const dirName of themeDirs) {
  const themeDir = path.join(THEMES_DIR, dirName);
  console.log(`\x1b[1m[${dirName.toUpperCase()}]\x1b[0m`);

  // 1. Required file check
  for (const file of REQUIRED_FILES) {
    const filePath = path.join(themeDir, file);
    if (fs.existsSync(filePath)) {
      ok(`${file} exists`);
    } else {
      fail(`Missing required file: ${file}`);
    }
  }

  // 2. Manifest schema check
  const manifestPath = path.join(themeDir, "manifest.js");
  if (fs.existsSync(manifestPath)) {
    const content = fs.readFileSync(manifestPath, "utf-8");
    for (const key of REQUIRED_MANIFEST_KEYS) {
      if (content.includes(key)) {
        ok(`manifest.js has "${key}"`);
      } else {
        fail(`manifest.js missing required key: "${key}"`);
      }
    }
    if (!content.includes("engine:")) {
      fail('manifest.js missing "engine" version — required for API compatibility checks');
    }
  }

  // 3. Forbidden API scan (all .jsx/.js files in the theme dir)
  const themeFiles = fs.readdirSync(themeDir)
    .filter(f => f.endsWith(".jsx") || f.endsWith(".js"));

  for (const file of themeFiles) {
    if (file === "manifest.js" || file === "theme.config.js") continue; // skip metadata files
    const filePath = path.join(themeDir, file);
    const content  = fs.readFileSync(filePath, "utf-8");

    for (const { pattern, reason } of FORBIDDEN_PATTERNS) {
      if (pattern.test(content)) {
        fail(`${file}: FORBIDDEN — ${reason}`);
      }
    }
  }

  // 4. tokens.js hint
  const tokensPath = path.join(themeDir, "tokens.js");
  if (!fs.existsSync(tokensPath)) {
    warn(`tokens.js not found — consider adding design tokens for this theme`);
  } else {
    ok("tokens.js exists");
  }

  console.log("");
}

// Summary
console.log("─".repeat(50));
console.log(`\x1b[1mResults:\x1b[0m ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  console.log("\x1b[31mValidation FAILED. Fix the errors above before registering this theme.\x1b[0m\n");
  process.exit(1);
} else {
  console.log("\x1b[32mAll themes passed validation ✓\x1b[0m\n");
  process.exit(0);
}
