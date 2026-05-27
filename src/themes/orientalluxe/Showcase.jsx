import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";
import { staggerContainer, staggerChild } from "./animations";

/**
 * ORIENTAL LUXE — Projects Showcase
 * ──────────────────────────────────
 * COMPLETELY different from default:
 * - 2-column grid (no thumbnails, text-only cards)
 * - Cards have hover lift (-translate-y) + border glow
 * - Tech stack as copper-bordered pill tags
 * - GitHub/Live links at card bottom with separator
 * - Title turns copper on hover
 */
const Showcase = ({ user, isOwner, projects, handleArrayUpdate }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="showcase-ol"
      className="relative py-20 sm:py-28"
      style={{ fontFamily: tokens.fonts.primary }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: tokens.colors.accent }}
          >
            SELECTED WORK
          </p>
          <h2
            className="flex items-center gap-4 text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: tokens.colors.textPrimary }}
          >
            <span className="h-8 w-1 rounded-full" style={{ backgroundColor: tokens.colors.accent }} />
            Projects
          </h2>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project._id || index}
              variants={staggerChild}
              className="group flex h-full flex-col rounded-2xl border p-6 sm:p-7 transition-all duration-300"
              style={{
                backgroundColor: `${tokens.colors.bgSoft}60`,
                borderColor: tokens.colors.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = tokens.colors.borderHover;
                e.currentTarget.style.boxShadow = tokens.shadows.glowStrong;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = tokens.colors.border;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Title */}
              <h3
                className="text-xl font-semibold transition-colors duration-300"
                style={{ color: tokens.colors.textPrimary }}
                onMouseEnter={(e) => { e.currentTarget.style.color = tokens.colors.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = tokens.colors.textPrimary; }}
              >
                <InlineEdit
                  isOwner={isOwner}
                  id={`ol-proj-title-${index}`}
                  value={project.title}
                  onSave={(v) => handleArrayUpdate("projects", index, { title: v })}
                >
                  {project.title}
                </InlineEdit>
              </h3>

              {/* Tech Stack Tags */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border px-3 py-1 text-[10px] font-medium"
                      style={{
                        borderColor: `${tokens.colors.accent}30`,
                        backgroundColor: `${tokens.colors.accent}08`,
                        color: tokens.colors.accent,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <p
                className="mt-4 flex-1 text-sm leading-relaxed"
                style={{ color: tokens.colors.textSecondary }}
              >
                <InlineEdit
                  isOwner={isOwner}
                  id={`ol-proj-desc-${index}`}
                  value={project.description}
                  type="textarea"
                  onSave={(v) => handleArrayUpdate("projects", index, { description: v })}
                >
                  {project.description}
                </InlineEdit>
              </p>

              {/* Links */}
              {((project.liveUrl || project.liveLink) || (project.githubUrl || project.githubLink)) && (
                <div
                  className="mt-5 flex items-center gap-4 border-t pt-5"
                  style={{ borderColor: tokens.colors.border }}
                >
                  {(project.githubUrl || project.githubLink) && (
                    <a
                      href={project.githubUrl || project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-200"
                      style={{
                        borderColor: tokens.colors.border,
                        color: tokens.colors.textPrimary,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.accent;
                        e.currentTarget.style.color = tokens.colors.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.border;
                        e.currentTarget.style.color = tokens.colors.textPrimary;
                      }}
                    >
                      <FaGithub size={16} /> GitHub
                    </a>
                  )}
                  {(project.liveUrl || project.liveLink) && (
                    <a
                      href={project.liveUrl || project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity duration-200 hover:opacity-80"
                      style={{ color: tokens.colors.accent }}
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
