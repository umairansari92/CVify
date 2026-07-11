import React from "react";

/**
 * APEX — Orbit Ring Track
 * Renders the elliptical orbit ring paths
 */
const OrbitRing = ({ radiusX, radiusY, mousePos = { x: 0, y: 0 } }) => {
  const px = (mousePos.x || 0) * 4;
  const py = (mousePos.y || 0) * 4;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: radiusX * 2,
        height: radiusY * 2,
        transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
        borderRadius: "50%",
        border: "1px solid rgba(45, 152, 129, 0.12)",
        pointerEvents: "none",
        zIndex: 5,
        boxShadow: "inset 0 0 15px rgba(45, 152, 129, 0.02)",
        transition: "transform 0.15s ease-out",
      }}
    />
  );
};

export default OrbitRing;
