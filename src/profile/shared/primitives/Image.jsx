import React, { useState } from "react";

/**
 * Image — Shared primitive. Lazy-loaded image with fallback and onError handling.
 *
 * Props:
 *   src:       string
 *   alt:       string  (required for accessibility)
 *   fallback:  string  — URL to show on error
 *   className: string
 *   cover:     boolean — use object-cover instead of object-contain
 */
const Image = ({ src, alt = "", fallback, className = "", cover = true, ...props }) => {
  const [errored, setErrored] = useState(false);
  const resolved = errored ? (fallback || `https://placehold.co/600x400?text=${encodeURIComponent(alt || "Image")}`) : src;

  return (
    <img
      src={resolved}
      alt={alt}
      loading="lazy"
      onError={() => !errored && setErrored(true)}
      className={`${cover ? "object-cover" : "object-contain"} ${className}`}
      {...props}
    />
  );
};

export default Image;
