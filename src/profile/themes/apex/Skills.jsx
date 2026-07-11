import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "./tokens";
import CenterCore from "./galaxy/CenterCore";
import OrbitRing from "./galaxy/OrbitRing";
import SkillNode from "./galaxy/SkillNode";
import DetailPanel from "./galaxy/DetailPanel";
import ParticleBackground from "./galaxy/ParticleBackground";

const Skills = ({ user, isOwner }) => {
  // 1. Group skills into Technical and Strategic (and other categories)
  const groupedSkills = useMemo(() => {
    const categories = {
      Technical: [],
      Strategic: [],
    };

    if (user?.skills && !Array.isArray(user.skills)) {
      const tech = user.skills.technical || [];
      const strat = user.skills.strategic || [];
      const soft = user.skills.soft || [];
      tech.forEach((s) => categories.Technical.push({ name: s, category: "Technical" }));
      strat.forEach((s) => categories.Strategic.push({ name: s, category: "Strategic" }));
      soft.forEach((s) => categories.Strategic.push({ name: s, category: "Strategic" })); // group soft/support under strategic/leadership
    } else if (Array.isArray(user?.skills)) {
      user.skills.forEach((s) => {
        const name = typeof s === "string" ? s : s?.name || "";
        const cat = (typeof s === "object" && s?.category) || "Technical";
        const normalizedCat =
          cat.toLowerCase() === "strategic" || cat.toLowerCase() === "soft" || cat.toLowerCase() === "soft skills"
            ? "Strategic"
            : "Technical";

        if (name) {
          categories[normalizedCat].push({ name, category: normalizedCat });
        }
      });
    }

    return categories;
  }, [user?.skills]);

  // Orbit assignment helper: assigns nodes to tracks (max 6 per track)
  const getTracks = (skills, baseSpeed) => {
    const tracks = [];
    const maxPerRing = 6;
    for (let i = 0; i < skills.length; i += maxPerRing) {
      const slice = skills.slice(i, i + maxPerRing);
      const ringIdx = tracks.length + 1;
      tracks.push({
        ringIndex: ringIdx,
        nodes: slice,
        speed: baseSpeed / Math.sqrt(ringIdx),
        direction: ringIdx % 2 === 0 ? -1 : 1,
      });
    }
    return tracks;
  };

  const techTracks = useMemo(() => getTracks(groupedSkills.Technical, 0.08), [groupedSkills.Technical]);
  const stratTracks = useMemo(() => getTracks(groupedSkills.Strategic, 0.06), [groupedSkills.Strategic]);

  // Selected skill state
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Mouse Parallax position state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 60FPS animation frames state
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animFrame;
    const tick = () => {
      setTime((prev) => prev + 0.05); // elegant, steady motion speed multiplier
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

  // Track renderer helper to draw orbits and nodes cleanly
  const renderGalaxy = (tracks, categoryLabel, coreLabel, accentColor) => {
    // Generate radii dynamically per track (inner starting at 120px)
    const tracksWithRadii = tracks.map((track, idx) => {
      const baseRx = 120 + idx * 70;
      const baseRy = 80 + idx * 45;
      return {
        ...track,
        rx: baseRx * sizeMultiplier,
        ry: baseRy * sizeMultiplier,
      };
    });

    const hasTracks = tracks.length > 0;

    return (
      <div className="flex flex-col items-center w-full max-w-[950px]">
        {/* Galaxy Title */}
        <div className="mb-4 text-center">
          <h3
            className="text-lg font-black uppercase tracking-widest border-b pb-2 mb-2"
            style={{ color: accentColor, borderColor: "rgba(255,255,255,0.05)" }}
          >
            {categoryLabel}
          </h3>
          <span className="text-xs text-slate-400">
            {tracks.reduce((acc, t) => acc + t.nodes.length, 0)} Active Nodes
          </span>
        </div>

        {/* Orbit screen container */}
        <div
          className="relative w-full aspect-[4/3] md:aspect-[16/10] flex items-center justify-center border rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
          style={{
            borderColor: tokens.colors.border,
            backgroundColor: "rgba(10, 12, 16, 0.65)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Instructions helper overlay inside the screen */}
          <div
            className="absolute bottom-6 left-6 z-30 flex items-center gap-3 px-4 py-2.5 rounded-xl border pointer-events-none"
            style={{ borderColor: tokens.colors.border, backgroundColor: `${tokens.colors.bg}ee` }}
          >
            <span className="text-lg">🖱️</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Interactive Space View
            </span>
          </div>

          {/* Render All Orbit Tracks */}
          {hasTracks ? (
            tracksWithRadii.map((track, idx) => (
              <OrbitRing
                key={idx}
                radiusX={track.rx}
                radiusY={track.ry}
                mousePos={mousePos}
              />
            ))
          ) : (
            <div className="text-slate-500 text-xs">No entries assigned</div>
          )}

          {/* Center Skills Core */}
          <CenterCore mousePos={mousePos} scale={sizeMultiplier} label={coreLabel} />

          {/* Orbiting Planet Nodes */}
          {hasTracks &&
            tracksWithRadii.map((track, trackIdx) => {
              return track.nodes.map((node, nodeIdx) => {
                const spacing = (Math.PI * 2) / track.nodes.length;
                // Kepler's planetary motion speed: steady base rotation angle calculated cleanly
                const baseAngle = nodeIdx * spacing + time * track.speed * track.direction;

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
                    onHoverChange={() => {}}
                    onClick={() => setSelectedSkill(node)}
                  />
                );
              });
            })}
        </div>
      </div>
    );
  };

  const hasTech = groupedSkills.Technical.length > 0;
  const hasStrat = groupedSkills.Strategic.length > 0;

  if (!hasTech && !hasStrat && !isOwner) return null;

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden border-t min-h-[900px] flex items-center justify-center select-none"
      style={{
        backgroundColor: tokens.colors.bg,
        borderColor: tokens.colors.border,
      }}
    >
      {/* Soft background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle 800px at 50% 50%, ${tokens.colors.accent}12, transparent 80%)`,
        }}
      />

      <ParticleBackground count={isMobile ? 30 : 60} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center justify-center">

        {/* Title Header */}
        <div className="w-full flex flex-col items-center text-center gap-2 mb-16">
          <span
            className="text-xs font-black uppercase tracking-[0.25em]"
            style={{ color: tokens.colors.accent }}
          >
            Capabilities Universe
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
          >
            Capabilities &amp; Experience Orbits
          </h2>
          <div className="h-1 w-20 rounded-full mt-2" style={{ backgroundColor: tokens.colors.accent }} />
        </div>

        {/* Dual Stacked Galaxies (Technical and Strategic divided completely) */}
        <div className="w-full space-y-24 flex flex-col items-center">
          {/* Galaxy 1: Technical Capabilities */}
          {(hasTech || isOwner) &&
            renderGalaxy(
              techTracks,
              "Core Capabilities / Toolkit",
              "Core",
              tokens.colors.accent
            )}

          {/* Galaxy 2: Strategic Focus & Leadership */}
          {(hasStrat || isOwner) &&
            renderGalaxy(
              stratTracks,
              "Strategy / Leadership / Support",
              "Strategy",
              "#7C3AED"
            )}
        </div>

        {/* Slide-in Drawer Detail Panel */}
        <AnimatePresence>
          {selectedSkill && (
            <DetailPanel
              skill={selectedSkill}
              onClose={() => setSelectedSkill(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Skills;
