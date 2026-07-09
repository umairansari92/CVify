import React from "react";

/**
 * Section — Shared primitive. Semantic section wrapper with consistent spacing.
 *
 * Props:
 *   id:        string  — HTML id for scroll navigation
 *   className: string  — additional classes
 *   tight:     boolean — use tighter vertical padding
 */
const Section = ({ id, children, className = "", tight = false, ...props }) => (
  <section
    id={id}
    className={`relative w-full ${tight ? "py-12 md:py-16" : "py-20 md:py-28"} ${className}`}
    {...props}
  >
    {children}
  </section>
);

export default Section;
