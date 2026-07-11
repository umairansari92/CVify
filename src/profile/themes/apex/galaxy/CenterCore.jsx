import React from "react";
import { motion } from "framer-motion";
import { tokens } from "../tokens";

/**
 * APEX — Galaxy Center Core
 * Large glowing sphere with breathing animation, pulsing rings,
 * rotating inner energy rings, and "Skills" center label.
 */
const CenterCore = ({ mousePos = { x: 0, y: 0 }, scale = 1, label = "Skills", accentColor }) => {
  const size = Math.max(90, Math.round(118 * scale));
  const px   = (mousePos.x || 0) * 6;
  const py   = (mousePos.y || 0) * 6;
  const activeColor = accentColor || tokens.colors.accent;

  return (
    <div
      style={{
        position:   "absolute",
        top:        "50%",
        left:       "50%",
        transform:  `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
        transition: "transform 0.12s ease-out",
        zIndex:     15,
        pointerEvents: "none",
      }}
    >
      {/* ── Outer soft bloom ── */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position:     "absolute",
          inset:        -size * 0.55,
          borderRadius: "50%",
          background:   `radial-gradient(circle, ${activeColor}35, transparent 70%)`,
          filter:       "blur(22px)",
        }}
      />

      {/* ── Pulse ring 1 ── */}
      <motion.div
        animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0.08, 0.55] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
        style={{
          position:     "absolute",
          inset:        -size * 0.15,
          borderRadius: "50%",
          border:       `1px solid ${activeColor}70`,
        }}
      />

      {/* ── Pulse ring 2 (delayed) ── */}
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 1 }}
        style={{
          position:     "absolute",
          inset:        -size * 0.15,
          borderRadius: "50%",
          border:       `1px solid ${activeColor}40`,
        }}
      />

      {/* ── Core sphere ── */}
      <div
        style={{
          width:        size,
          height:       size,
          borderRadius: "50%",
          background:   `radial-gradient(circle at 35% 28%,
            ${activeColor}90 0%,
            ${activeColor}30 40%,
            #0a1220 80%
          )`,
          border:    `2px solid ${activeColor}70`,
          boxShadow: `
            0 0 50px ${activeColor}50,
            0 0 100px ${activeColor}18,
            inset 0 0 30px ${activeColor}20
          `,
          position:        "relative",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          flexDirection:   "column",
        }}
      >
        {/* ── Rotating energy ring A ── */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          style={{
            position:     "absolute",
            inset:        7,
            borderRadius: "50%",
            border:       `1.5px solid transparent`,
            borderTopColor:  activeColor,
            borderRightColor:`${activeColor}50`,
          }}
        />

        {/* ── Rotating energy ring B (counter) ── */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          style={{
            position:        "absolute",
            inset:           13,
            borderRadius:    "50%",
            border:          `1px solid transparent`,
            borderBottomColor: `${activeColor}80`,
            borderLeftColor:   `${activeColor}30`,
          }}
        />

        {/* ── Dynamic label ── */}
        <motion.span
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontFamily:    tokens.fonts.heading,
            fontWeight:    800,
            fontSize:      size * 0.165,
            color:         "#ffffff",
            letterSpacing: "-0.02em",
            position:      "relative",
            zIndex:        1,
            textShadow:    `0 0 18px ${activeColor}, 0 0 36px ${activeColor}60`,
          }}
        >
          {label}
        </motion.span>
      </div>
    </div>
  );
};

export default CenterCore;
