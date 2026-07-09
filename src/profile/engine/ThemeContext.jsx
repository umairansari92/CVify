import { createContext, useContext } from "react";

/**
 * ThemeContext — Shared theme state for all primitives and composites.
 * Primitives read tokens/config from here — no prop drilling needed.
 *
 * Provided by: ProfileEngine
 * Consumed by: shared/primitives/*, shared/composites/*
 */
export const ThemeContext = createContext(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Soft fail — primitives still render, just without theme tokens
    console.warn("[CVify] useTheme() called outside of ThemeContext.Provider");
    return { tokens: {}, config: {}, manifest: null };
  }
  return ctx;
}
