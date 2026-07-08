import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

/**
 * NOIR — Projects Showcase (Phase 3 Premium Overhaul)
 *
 * Features:
 * - Full 2-column masonry-style grid of glass project cards
 * - Image hover overlay with blurred backdrops and action CTAs
 * - Tech stack pill tags with NOIR design system tokens
 * - Featured project badge
 * - Full InlineEdit integration for owner editing
 * - Fallback placeholder image
 */
const Showcase = ({ user, isOwner, projects, handleArrayUpdate }) => {
  if (!Array.isArray(projects) || projects.length === 0) return null;

  const getProjectImage = (p) =>
    p?.image || p?.thumbnail || p?.imageUrl || p?.coverImage || null;

  return (
    <section
      id="work"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span
                className="text-[10px] uppercase font-bold tracking-widest"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
              >
                (05)
              </span>
              <span
                className="text-[10px] uppercase font-bold tracking-widest"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                Selected Work
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-medium"
              style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
            >
              Projects &{" "}
              <span className="italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Builds
              </span>
            </h2>
          </div>
          <p
            className="text-sm opacity-60 max-w-xs"
            style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            A curated selection of things I've built, optimized, or shipped to production.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2">
          {projects.map((project, i) => {
            const img = getProjectImage(project);
            const liveLink = project.liveUrl || project.liveLink;
            const githubLink = project.githubUrl || project.githubLink;

            return (
              <motion.article
                key={project._id || i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.08,
                  duration: tokens.motion.duration.normal,
                  ease: tokens.motion.easing.base,
                }}
                className="group flex flex-col rounded-3xl border overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: tokens.colors.cardBg,
                  borderColor: tokens.colors.border,
                }}
              >
                {/* Image area */}
                <div className="relative overflow-hidden aspect-video w-full bg-black/20">
                  {img ? (
                    <img
                      src={img}
                      alt={project.title || project.name || "Project"}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/800x450/0d0d0d/333333?text=${encodeURIComponent(project.title || "Project")}`;
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: tokens.colors.cardBg }}
                    >
                      <span
                        className="text-5xl font-extrabold opacity-10"
                        style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
                      >
                        {(project.title || "P").charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    {liveLink && (
                      <a
                        href={liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all hover:bg-white hover:text-black hover:border-white"
                        style={{
                          borderColor: tokens.colors.primary,
                          color: tokens.colors.primary,
                          fontFamily: tokens.fonts.mono,
                        }}
                        data-cursor="hover"
                      >
                        <ExternalLink size={12} />
                        Live Demo
                      </a>
                    )}
                    {githubLink && (
                      <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all hover:bg-white hover:text-black hover:border-white"
                        style={{
                          borderColor: "rgba(255,255,255,0.2)",
                          color: tokens.colors.secondary,
                          fontFamily: tokens.fonts.mono,
                          backgroundColor: "rgba(255,255,255,0.04)",
                        }}
                        data-cursor="hover"
                      >
                        <FaGithub size={12} />
                        Source
                      </a>
                    )}
                  </div>

                  {/* Featured badge */}
                  {(project.featured || project.isFeatured) && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-sm"
                        style={{
                          color: tokens.colors.accent,
                          borderColor: `${tokens.colors.accent}44`,
                          backgroundColor: `${tokens.colors.accent}0f`,
                          fontFamily: tokens.fonts.mono,
                        }}
                      >
                        ★ Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4 p-6 md:p-8 flex-1">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className="text-xl font-semibold leading-tight"
                      style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
                    >
                      <InlineEdit
                        isOwner={isOwner}
                        id={`noir-proj-title-${i}`}
                        value={project.title || project.name}
                        onSave={(v) => handleArrayUpdate?.("projects", i, { title: v })}
                      >
                        <span>{project.title || project.name}</span>
                      </InlineEdit>
                    </h3>
                    {/* External links for no-image cards */}
                    <div className="flex items-center gap-3 shrink-0">
                      {liveLink && !img && (
                        <a
                          href={liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-50 hover:opacity-100 transition-opacity"
                          style={{ color: tokens.colors.accent }}
                          data-cursor="hover"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {githubLink && !img && (
                        <a
                          href={githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-50 hover:opacity-100 transition-opacity"
                          style={{ color: tokens.colors.secondary }}
                          data-cursor="hover"
                        >
                          <FaGithub size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <InlineEdit
                    isOwner={isOwner}
                    id={`noir-proj-desc-${i}`}
                    value={project.description}
                    type="textarea"
                    onSave={(v) => handleArrayUpdate?.("projects", i, { description: v })}
                  >
                    <p
                      className="text-sm leading-relaxed line-clamp-3 opacity-70"
                      style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {project.description}
                    </p>
                  </InlineEdit>

                  {/* Tech Stack */}
                  {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.slice(0, 6).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border"
                          style={{
                            color: tokens.colors.secondary,
                            borderColor: tokens.colors.border,
                            fontFamily: tokens.fonts.mono,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 6 && (
                        <span
                          className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border opacity-50"
                          style={{ color: tokens.colors.secondary, borderColor: tokens.colors.border, fontFamily: tokens.fonts.mono }}
                        >
                          +{project.techStack.length - 6}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
