import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

/**
 * NOIR — Projects Showcase
 * Receives `projects` prop directly from PublicProfile (not from user.projects)
 */
const Showcase = ({ user, isOwner, projects, handleArrayUpdate }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="work"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
                (05)
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
                Work
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
              Selected Projects
            </h2>
          </div>
          <p className="text-sm md:text-right max-w-xs" style={{ color: tokens.colors.secondary }}>
            A curated selection of things I've built, optimized, or scaled.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
              className="group flex flex-col gap-0 rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{ backgroundColor: tokens.colors.cardBg, borderColor: tokens.colors.border }}
            >
              {/* Project Image */}
              {(project.image || project.thumbnail) && (
                <div className="relative overflow-hidden aspect-video w-full">
                  <img
                    src={project.image || project.thumbnail}
                    alt={project.title || project.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Hover overlay with links */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-sm">
                    {(project.liveUrl || project.liveLink) && (
                      <a
                        href={project.liveUrl || project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors hover:bg-white hover:text-black"
                        style={{ borderColor: tokens.colors.primary, color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}
                        data-cursor="hover"
                      >
                        Live Demo
                      </a>
                    )}
                    {(project.githubUrl || project.githubLink) && (
                      <a
                        href={project.githubUrl || project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors hover:bg-white hover:text-black"
                        style={{ borderColor: tokens.colors.borderHover, color: tokens.colors.primary, fontFamily: tokens.fonts.mono, backgroundColor: "rgba(255,255,255,0.05)" }}
                        data-cursor="hover"
                      >
                        Source
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="flex flex-col gap-3 p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
                    <InlineEdit
                      isOwner={isOwner}
                      id={`noir-proj-title-${i}`}
                      value={project.title || project.name}
                      onSave={(v) => handleArrayUpdate?.("projects", i, { title: v })}
                    >
                      {project.title || project.name}
                    </InlineEdit>
                  </h3>
                  {project.featured && (
                    <span
                      className="shrink-0 text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded-full border"
                      style={{ color: tokens.colors.accent, borderColor: "rgba(255,46,12,0.3)", backgroundColor: "rgba(255,46,12,0.05)", fontFamily: tokens.fonts.mono }}
                    >
                      Featured
                    </span>
                  )}
                </div>

                <InlineEdit
                  isOwner={isOwner}
                  id={`noir-proj-desc-${i}`}
                  value={project.description}
                  type="textarea"
                  onSave={(v) => handleArrayUpdate?.("projects", i, { description: v })}
                >
                  <p className="text-sm leading-relaxed line-clamp-3" style={{ color: tokens.colors.secondary }}>
                    {project.description}
                  </p>
                </InlineEdit>

                {/* Tech Stack */}
                {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.techStack.slice(0, 5).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border"
                        style={{ color: tokens.colors.secondary, borderColor: tokens.colors.border, fontFamily: tokens.fonts.mono }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links (for when no image is present) */}
                {!(project.image || project.thumbnail) &&
                  ((project.liveUrl || project.liveLink) || (project.githubUrl || project.githubLink)) && (
                    <div className="flex items-center gap-4 pt-4 border-t mt-2" style={{ borderColor: tokens.colors.border }}>
                      {(project.githubUrl || project.githubLink) && (
                        <a
                          href={project.githubUrl || project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--primary)]"
                          style={{ color: tokens.colors.secondary, "--primary": tokens.colors.primary }}
                          data-cursor="hover"
                        >
                          <FaGithub size={14} /> GitHub
                        </a>
                      )}
                      {(project.liveUrl || project.liveLink) && (
                        <a
                          href={project.liveUrl || project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                          style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}
                          data-cursor="hover"
                        >
                          <ExternalLink size={12} /> Live
                        </a>
                      )}
                    </div>
                  )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
