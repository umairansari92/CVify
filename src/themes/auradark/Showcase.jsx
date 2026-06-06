import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { tokens } from "./tokens";

const Showcase = ({ projects, isOwner }) => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (!projects?.length) return null;

  const proj = projects[active];

  const techList = proj?.techStack || proj?.technologies || [];
  const liveUrl = proj?.liveUrl || proj?.liveLink;
  const githubUrl = proj?.githubUrl || proj?.githubLink;
  const image = proj?.image || proj?.thumbnail;

  return (
    <section
      ref={ref}
      className="w-full border-t"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.borderFaint,
        minHeight: "100vh",
      }}
    >
      {/* Section label + Counter */}
      <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 pt-12 pb-4">
        <p
          className="text-xs tracking-[0.25em] uppercase"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
        >
          CREATIVE WORKS
        </p>
        <div className="flex items-center gap-3">
          <span
            className="text-xs tabular-nums"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
          >
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1">
            {projects.map((proj_item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to project ${i + 1}${proj_item?.title ? ': ' + proj_item.title : ''}`}
                className="flex items-center justify-center transition-all"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "block",
                    height: "2px",
                    width: i === active ? "32px" : "12px",
                    backgroundColor: i === active ? tokens.colors.primary : tokens.colors.borderStrong,
                    transition: "width 0.3s ease, background-color 0.3s ease",
                    borderRadius: "2px",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 items-center px-8 md:px-16 lg:px-24 py-12 gap-16"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* LEFT: Project info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <span
                className="text-xs"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>
              <span
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
              >
                {proj.category || "PROJECT"}
              </span>
            </div>

            <h2
              className="font-black uppercase leading-none tracking-tighter"
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: "clamp(1.4rem, 3.5vw, 3.5rem)",
                color: tokens.colors.foreground,
              }}
            >
              {proj.title}
            </h2>

            <div className="w-12 h-px" style={{ backgroundColor: tokens.colors.primary }} />

            {techList.length > 0 && (
              <div>
                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
                >
                  STACK & ARCHITECTURE
                </p>
                <p
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: tokens.colors.primary }}
                >
                  {techList.join(" / ")}
                </p>
              </div>
            )}

            {proj.description && (
              <p className="text-sm leading-relaxed" style={{ color: tokens.colors.textDim }}>
                {proj.description}
              </p>
            )}

            <div className="flex items-center gap-6 flex-wrap">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:opacity-80 transition-all"
                  style={{ color: tokens.colors.foreground }}
                >
                  EXPLORE LIVE PROJECT <ExternalLink size={14} />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:opacity-80 transition-all"
                  style={{ color: tokens.colors.textDim }}
                >
                  <FaGithub size={14} /> GITHUB
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT: Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "_img"}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-xl overflow-hidden"
            style={{ backgroundColor: tokens.colors.backgroundFaint }}
          >
            {image ? (
              <img src={image} alt={proj.title} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span
                  className="font-black uppercase opacity-10"
                  style={{
                    fontFamily: tokens.fonts.display,
                    fontSize: "clamp(3rem, 10vw, 8rem)",
                    color: tokens.colors.foreground,
                  }}
                >
                  {proj.title?.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Prev/Next */}
      <div className="flex justify-center gap-4 pb-16">
        <button
          onClick={() => setActive((p) => Math.max(0, p - 1))}
          disabled={active === 0}
          className="px-8 py-3 text-xs uppercase tracking-widest font-bold border rounded-full transition-all disabled:opacity-30 hover:scale-105"
          style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.borderStrong, color: tokens.colors.foreground }}
        >
          ← PREV
        </button>
        <button
          onClick={() => setActive((p) => Math.min(projects.length - 1, p + 1))}
          disabled={active === projects.length - 1}
          className="px-8 py-3 text-xs uppercase tracking-widest font-bold border rounded-full transition-all disabled:opacity-30 hover:scale-105"
          style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.borderStrong, color: tokens.colors.foreground }}
        >
          NEXT →
        </button>
      </div>
    </section>
  );
};

export default Showcase;
