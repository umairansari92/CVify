import React, { Suspense, memo } from "react";
import registry from "../themes/registry.js";
import ErrorBoundary from "./ErrorBoundary.jsx";

const ENGINE_VERSION = "4.0";

/**
 * ThemeResolver — Resolves a theme ID against the registry, version-checks,
 * lazy-loads the chunk, and renders it with the frozen ThemeProps contract.
 *
 * This is the ONLY file that interacts with the registry.
 * The engine never imports theme code directly.
 *
 * memo() prevents re-renders from sibling/parent state changes (e.g., showThemePanel,
 * showResumeModal) that don't affect themeId or themeProps.
 */
// Cache to store lazy-loaded theme components so they are only defined once.
// Defining React.lazy() inside the render function causes React to treat it as a new
// component type on every render, destroying the DOM state and forcing a complete remount.
const lazyThemeCache = {};

const getLazyTheme = (themeId, loadFn) => {
  if (!lazyThemeCache[themeId]) {
    lazyThemeCache[themeId] = React.lazy(loadFn);
  }
  return lazyThemeCache[themeId];
};

const ThemeResolverInner = ({ themeId, themeProps }) => {
  const entry = registry[themeId] || registry["STANDARD"];

  if (!entry) {
    console.error(`[CVify] Theme "${themeId}" not found in registry. Falling back to STANDARD.`);
    return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
      Theme not found.
    </div>;
  }

  const { manifest, load: lazyLoad } = entry;

  // Engine version compatibility check
  if (manifest.engine && manifest.engine !== ENGINE_VERSION) {
    console.warn(
      `[CVify] Theme "${manifest.id}" targets engine v${manifest.engine}, ` +
      `but current engine is v${ENGINE_VERSION}. Rendering may have issues.`
    );
  }

  const ThemeComponent = getLazyTheme(themeId, lazyLoad);

  const fallbackBg = manifest.defaultPreset === "NOIR" ? "#000" :
                     manifest.defaultPreset === "AURA DARK" ? "#000" : "#0f172a";

  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: fallbackBg }}>
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
               style={{ borderColor: `${manifest.features?.accentColor || "#2563eb"} transparent transparent transparent` }} />
        </div>
      }>
        <ThemeComponent {...themeProps} />
      </Suspense>
    </ErrorBoundary>
  );
};

const ThemeResolver = memo(ThemeResolverInner);

export default ThemeResolver;
