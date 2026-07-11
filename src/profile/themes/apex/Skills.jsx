import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "./tokens";
import CenterCore from "./galaxy/CenterCore";
import OrbitRing from "./galaxy/OrbitRing";
import SkillNode from "./galaxy/SkillNode";
import DetailPanel from "./galaxy/DetailPanel";
import ParticleBackground from "./galaxy/ParticleBackground";

// Category config for styling
const CATEGORY_MAP = {
  Technical: { label: "Technical / Dev", color: "#2D9881" },
  Strategic: { label: "Strategic Focus", color: "#7C3AED" },
  "Soft Skills": { label: "Soft / Leadership", color: "#EA580C" },
};

const Skills = ({ user, isOwner }) => {
  // Normalize skills database model
  const skillList = useMemo(() => {
    const list = [];
    if (user?.skills && !Array.isArray(user.skills)) {
      // Object format
      const technical = user.skills.technical || [];
      const soft = user.skills.soft || [];
      const strategic = user.skills.strategic || [];
      technical.forEach((s) => list.push({ name: s, category: "Technical" }));
      strategic.forEach((s) => list.push({ name: s, category: "Strategic" }));
      soft.forEach((s) => list.push({ name: s, category: "Soft Skills" }));
    } else if (Array.isArray(user?.skills)) {
      // Array format
      user.skills.forEach((s) => {
        const name = typeof s === "string" ? s : s?.name || "";
        const cat = (typeof s === "object" && s?.category) || "Technical";
        if (name) {
          list.push({
            name,
            category: cat === "strategic" ? "Strategic" : cat === "soft" ? "Soft Skills" : "Technical",
          });
        }
      });
    }
    return list;
  }, [user?.skills]);

  // Orbit assignment setup
  const rings = useMemo(() => {
    const r1 = [];
    const r2 = [];
    const r3 = [];
    skillList.forEach((skill, index) => {
      const targetRing = index % 3;
      if (targetRing === 0) r1.push(skill);
      else if (targetRing === 1) r2.push(skill);
      else r3.push(skill);
    });
    return [r1, r2, r3];
  }, [skillList]);

  // Selected skill for the detail panel
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Parallax mouse positioning state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 60FPS animation frames state
  const [time, setTime] = useState(0);
  const hoveredNodeRef = useRef(null); // stores { ringIndex, nodeIndex } of hovered element to pause it

  useEffect(() => {
    let animFrame;
    const tick = () => {
      setTime((prev) => prev + 0.002);
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Parallax handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Orbit sizing config based on screen sizes
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const sizeMultiplier = isMobile ? 0.65 : 1;

  const orbitRadii = [
    { rx: 140 * sizeMultiplier, ry: 90 * sizeMultiplier },
    { rx: 240 * sizeMultiplier, ry: 150 * sizeMultiplier },
    { rx: 340 * sizeMultiplier, ry: 210 * sizeMultiplier },
  ];

  const hasSkills = skillList.length > 0;
  if (!hasSkills && !isOwner) return null;

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden border-t min-h-[680px] md:min-h-[850px] flex items-center justify-center select-none"
      style={{
        backgroundColor: tokens.colors.bg,
        borderColor: tokens.colors.border,
      }}
    >
      {/* ── Nebula background glow ── */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 500px at 50% 50%, ${tokens.colors.accent}12, transparent 80%)`,
        }}
      />

      <ParticleBackground count={isMobile ? 20 : 45} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center justify-center">
        
        {/* Title / Info Header */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16 text-left">
          <div className="space-y-2">
            <span
              className="text-xs font-black uppercase tracking-[0.25em]"
              style={{ color: tokens.colors.accent }}
            >
              Skills Galaxy
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
            >
              Orbiting My Expertise
            </h2>
            <p className="text-sm max-w-md" style={{ color: tokens.colors.secondary }}>
              Explore the interactive universe of my tools and capabilities. Move mouse to tilt the orbits, hover a planet to zoom, or click for breakdown detail panel.
            </p>
          </div>

          {/* Interactive Guide Widget (Inspired by reference image) */}
          <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl border" style={{ borderColor: tokens.colors.border, backgroundColor: "rgba(25, 29, 36, 0.4)" }}>
            {Object.entries(CATEGORY_MAP).map(([key, item]) => (
              <div key={key} className="flex items-center gap-2 text-xs font-bold">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span style={{ color: tokens.colors.primary }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Interactive Galaxy Container ── */}
        <div
          className="relative w-full max-w-[900px] aspect-[4/3] md:aspect-[16/9] flex items-center justify-center border rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
          style={{
            borderColor: tokens.colors.border,
            backgroundColor: "rgba(10, 12, 16, 0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Instructions helper overlay inside the screen */}
          <div
            className="absolute bottom-6 left-6 z-30 flex items-center gap-3 px-4 py-2.5 rounded-xl border pointer-events-none"
            style={{ borderColor: tokens.colors.border, backgroundColor: `${tokens.colors.bg}ee` }}
          >
            <span className="text-lg">🖱️</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Hover stars to slow rotation
            </span>
          </div>

          {/* 1. Orbit Tracks */}
          {orbitRadii.map((radius, rIdx) => (
            <OrbitRing
              key={rIdx}
              radiusX={radius.rx}
              radiusY={radius.ry}
              mousePos={mousePos}
            />
          ))}

          {/* 2. Central Core */}
          <CenterCore mousePos={mousePos} scale={sizeMultiplier} />

          {/* 3. Orbiting Planet Nodes */}
          {rings.map((ringNodes, rIdx) => {
            const radius = orbitRadii[rIdx];
            const direction = rIdx === 1 ? -1 : 1; // Counter-clockwise for middle ring
            const baseSpeed = (0.35 / (rIdx + 1.2)) * direction;

            return ringNodes.map((node, nIdx) => {
              const spacing = (Math.PI * 2) / ringNodes.length;
              const isHovered =
                hoveredNodeRef.current?.ringIndex === rIdx &&
                hoveredNodeRef.current?.nodeIndex === nIdx;

              // Compute dynamic angle offsets
              const nodeAngle = nIdx * spacing + time * baseSpeed * (isHovered ? 0.05 : 1);

              return (
                <SkillNode
                  key={`${rIdx}-${nIdx}`}
                  name={node.name}
                  category={node.category}
                  angle={nodeAngle}
                  radiusX={radius.rx}
                  radiusY={radius.ry}
                  mousePos={mousePos}
                  active={selectedSkill?.name === node.name}
                  onHoverChange={(hovering) => {
                    if (hovering) {
                      hoveredNodeRef.current = { ringIndex: rIdx, nodeIndex: nIdx };
                    } else {
                      hoveredNodeRef.current = null;
                    }
                  }}
                  onClick={() => setSelectedSkill(node)}
                />
              );
            });
          })}

          {/* 4. Sliding Details Panel */}
          <AnimatePresence>
            {selectedSkill && (
              <DetailPanel
                skill={selectedSkill}
                onClose={() => setSelectedSkill(null)}
              />
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;
