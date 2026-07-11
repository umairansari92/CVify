import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "./tokens";
import CenterCore from "./galaxy/CenterCore";
import OrbitRing from "./galaxy/OrbitRing";
import SkillNode from "./galaxy/SkillNode";
import DetailPanel from "./galaxy/DetailPanel";
import ParticleBackground from "./galaxy/ParticleBackground";

// Color mapping for all user professions
const CATEGORY_MAP = {
  Technical: { label: "Technical / Core Skills", color: "#2D9881" },
  Strategic: { label: "Strategic / Management", color: "#7C3AED" },
  "Soft Skills": { label: "Support / Soft Skills", color: "#EA580C" },
};

const Skills = ({ user, isOwner }) => {
  // 1. Group & parse skills safely supporting multiple formats (Object or Array)
  const groupedSkills = useMemo(() => {
    const categories = {
      Technical: [],
      Strategic: [],
      "Soft Skills": [],
    };

    if (user?.skills && !Array.isArray(user.skills)) {
      // Object format: { technical: [...], strategic: [...], soft: [...] }
      const tech = user.skills.technical || [];
      const strat = user.skills.strategic || [];
      const soft = user.skills.soft || [];
      tech.forEach((s) => categories.Technical.push({ name: s, category: "Technical" }));
      strat.forEach((s) => categories.Strategic.push({ name: s, category: "Strategic" }));
      soft.forEach((s) => categories["Soft Skills"].push({ name: s, category: "Soft Skills" }));
    } else if (Array.isArray(user?.skills)) {
      // Array format: [{ name: "...", category: "..." }]
      user.skills.forEach((s) => {
        const name = typeof s === "string" ? s : s?.name || "";
        const cat = (typeof s === "object" && s?.category) || "Technical";
        const normalizedCat =
          cat.toLowerCase() === "strategic"
            ? "Strategic"
            : cat.toLowerCase() === "soft" || cat.toLowerCase() === "soft skills"
            ? "Soft Skills"
            : "Technical";

        if (name) {
          categories[normalizedCat].push({ name, category: normalizedCat });
        }
      });
    }

    return categories;
  }, [user?.skills]);

  // 2. Dynamic Ring Allocation System (Auto-scales up to 50+ skills dynamically without overlaps)
  // Max 6 nodes per orbit for clean professional layout spacing
  const MAX_NODES_PER_RING = 6;

  const dynamicGalaxyConfig = useMemo(() => {
    const orbitTracks = []; // Array of { radiusX, radiusY, direction, speed, nodes }
    let ringCount = 0;

    // Distribute Technical (Inner Orbits)
    const techSkills = groupedSkills.Technical;
    if (techSkills.length > 0) {
      for (let i = 0; i < techSkills.length; i += MAX_NODES_PER_RING) {
        const slice = techSkills.slice(i, i + MAX_NODES_PER_RING);
        ringCount++;
        orbitTracks.push({
          ringIndex: ringCount,
          category: "Technical",
          nodes: slice,
          // Kepler's Law: Inner planets orbit faster, outer planets orbit slower
          speed: 0.16 / Math.sqrt(ringCount),
          direction: ringCount % 2 === 0 ? -1 : 1,
        });
      }
    }

    // Distribute Strategic (Middle Orbits)
    const stratSkills = groupedSkills.Strategic;
    if (stratSkills.length > 0) {
      for (let i = 0; i < stratSkills.length; i += MAX_NODES_PER_RING) {
        const slice = stratSkills.slice(i, i + MAX_NODES_PER_RING);
        ringCount++;
        orbitTracks.push({
          ringIndex: ringCount,
          category: "Strategic",
          nodes: slice,
          speed: 0.16 / Math.sqrt(ringCount),
          direction: ringCount % 2 === 0 ? -1 : 1,
        });
      }
    }

    // Distribute Soft Skills (Outer Orbits)
    const softSkills = groupedSkills["Soft Skills"];
    if (softSkills.length > 0) {
      for (let i = 0; i < softSkills.length; i += MAX_NODES_PER_RING) {
        const slice = softSkills.slice(i, i + MAX_NODES_PER_RING);
        ringCount++;
        orbitTracks.push({
          ringIndex: ringCount,
          category: "Soft Skills",
          nodes: slice,
          speed: 0.16 / Math.sqrt(ringCount),
          direction: ringCount % 2 === 0 ? -1 : 1,
        });
      }
    }

    return orbitTracks;
  }, [groupedSkills]);

  // Selected node for detailed slide-in panel
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Mouse Parallax position state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 60FPS animation frames state
  const [time, setTime] = useState(0);
  const hoveredNodeRef = useRef(null); // stores { ringIdx, nodeIdx } to pause hover item

  useEffect(() => {
    let animFrame;
    const tick = () => {
      setTime((prev) => prev + 0.04); // Elegant, very smooth delta
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Parallax Event listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Responsive dimensions configuration
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const sizeMultiplier = isMobile ? 0.6 : 1;

  // Dynamically compute radiusX and radiusY for each track so they scale nicely based on total tracks
  const tracksWithRadii = useMemo(() => {
    return dynamicGalaxyConfig.map((track, idx) => {
      // Dynamic spacing: inner rings start at 120px, increasing by 75px per ring
      const baseRx = 125 + idx * 72;
      const baseRy = 85 + idx * 46;
      return {
        ...track,
        rx: baseRx * sizeMultiplier,
        ry: baseRy * sizeMultiplier,
      };
    });
  }, [dynamicGalaxyConfig, sizeMultiplier]);

  const hasSkills = dynamicGalaxyConfig.length > 0;
  if (!hasSkills && !isOwner) return null;

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden border-t min-h-[720px] md:min-h-[920px] flex items-center justify-center select-none"
      style={{
        backgroundColor: tokens.colors.bg,
        borderColor: tokens.colors.border,
      }}
    >
      {/* Soft background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle 600px at 50% 50%, ${tokens.colors.accent}12, transparent 80%)`,
        }}
      />

      <ParticleBackground count={isMobile ? 25 : 50} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center justify-center">

        {/* Header */}
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
              Technical and Strategic skills are grouped into separate orbits. Hover a skill to pause and highlight, or click to explore focus engagements.
            </p>
          </div>

          {/* Interactive Guide Legend */}
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
          className="relative w-full max-w-[950px] aspect-[4/3] md:aspect-[16/10] flex items-center justify-center border rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
          style={{
            borderColor: tokens.colors.border,
            backgroundColor: "rgba(10, 12, 16, 0.65)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Mouse movement guide widget */}
          <div
            className="absolute bottom-6 left-6 z-30 flex items-center gap-3 px-4 py-2.5 rounded-xl border pointer-events-none"
            style={{ borderColor: tokens.colors.border, backgroundColor: `${tokens.colors.bg}ee` }}
          >
            <span className="text-lg">🖱️</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Interactive Tilt View Active
            </span>
          </div>

          {/* Render All Orbit Tracks */}
          {tracksWithRadii.map((track, idx) => (
            <OrbitRing
              key={idx}
              radiusX={track.rx}
              radiusY={track.ry}
              mousePos={mousePos}
            />
          ))}

          {/* Center Skills Core */}
          <CenterCore mousePos={mousePos} scale={sizeMultiplier} />

          {/* Orbiting Planet Nodes */}
          {tracksWithRadii.map((track, trackIdx) => {
            return track.nodes.map((node, nodeIdx) => {
              const spacing = (Math.PI * 2) / track.nodes.length;
              const isHovered =
                hoveredNodeRef.current?.trackIndex === trackIdx &&
                hoveredNodeRef.current?.nodeIndex === nodeIdx;

              // Kepler's speed coefficient adjustment: Orbit speed is scaled elegantly based on time
              const baseAngle = nodeIdx * spacing + time * track.speed * track.direction * (isHovered ? 0.05 : 1);

              return (
                <SkillNode
                  key={`${trackIdx}-${nodeIdx}`}
                  name={node.name}
                  category={node.category}
                  angle={baseAngle}
                  radiusX={track.rx}
                  radiusY={track.ry}
                  mousePos={mousePos}
                  active={selectedSkill?.name === node.name}
                  onHoverChange={(hovering) => {
                    if (hovering) {
                      hoveredNodeRef.current = { trackIndex: trackIdx, nodeIndex: nodeIdx };
                    } else {
                      hoveredNodeRef.current = null;
                    }
                  }}
                  onClick={() => setSelectedSkill(node)}
                />
              );
            });
          })}

          {/* Detail Side Panel Overlay */}
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
