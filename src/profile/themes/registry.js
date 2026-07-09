/**
 * Theme Registry — Auto-Discovery Engine
 *
 * Uses Vite's import.meta.glob to:
 * 1. Eagerly load all theme manifests (metadata only, tiny)
 * 2. Create lazy loaders for theme index.jsx files (never imported until needed)
 * 3. Merge them into a unified registry keyed by manifest.id
 *
 * Adding a new theme: drop a folder with manifest.js + index.jsx.
 * No other file needs to change.
 */

// Eagerly loaded — manifests are tiny metadata objects
const manifests = import.meta.glob("./*/manifest.js", { eager: true });

// Lazy loaded — theme chunks are only downloaded when the user has that theme active
const components = import.meta.glob("./*/index.jsx");

const registry = {};

Object.entries(manifests).forEach(([manifestPath, mod]) => {
  const manifest = mod.default;
  if (!manifest?.id) {
    console.warn(`[CVify Registry] Skipping theme at ${manifestPath} — missing manifest.id`);
    return;
  }

  // Derive the index.jsx path from the manifest path
  // e.g. "./noir/manifest.js" → "./noir/index.jsx"
  const indexPath = manifestPath.replace("/manifest.js", "/index.jsx");
  const loader = components[indexPath];

  if (!loader) {
    console.warn(`[CVify Registry] Theme "${manifest.id}" has a manifest but no index.jsx at ${indexPath}`);
    return;
  }

  registry[manifest.id] = {
    manifest,
    load: loader, // () => Promise<module> — Vite dynamic import
  };
});

export default registry;
