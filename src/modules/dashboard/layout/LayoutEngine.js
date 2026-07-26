/**
 * LayoutEngine.js
 * 
 * Computes responsive CSS grid span classes (12-column system) for widgets based on
 * their contract span definitions.
 */

export const getWidgetSpanClass = (span = {}) => {
  const colSpans = [];

  // Default / Mobile (1-12)
  const defaultSpan = span.default || 12;
  colSpans.push(`col-span-${defaultSpan}`);

  // Medium / Tablet (1-12)
  if (span.md) {
    colSpans.push(`md:col-span-${span.md}`);
  }

  // Large / Desktop (1-12)
  if (span.lg) {
    colSpans.push(`lg:col-span-${span.lg}`);
  }

  // Extra Large (1-12)
  if (span.xl) {
    colSpans.push(`xl:col-span-${span.xl}`);
  }

  return colSpans.join(" ");
};
