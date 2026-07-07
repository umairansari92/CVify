import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";

const Showcase = ({ user, isOwner, projects, handleArrayUpdate }) => {
  const allProjects = projects || user?.projects || [];

  if (!isOwner && allProjects.length === 0) return null;

  return (
    <section
      id="projects"
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: tokens.colors.paper, color: tokens.colors.primaryText }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
            >
              Work
            </h2>
            <h3
              className="text-3xl font-bold leading-tight"
              style={{ fontFamily: tokens.fonts.heading }}
            >
              Selected Projects
            </h3>
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {allProjects.map((project, index) => {
            const liveUrl = project.liveUrl || project.liveLink || project.link;
            const githubUrl = project.githubUrl || project.githubLink;
            const techTags = project.techStack || project.technologies || [];
            const thumbnail = project.image || project.thumbnail;

            return (
              <motion.article
                key={project._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                className="group flex flex-col border border-[#D6D3D1] p-8 lg:p-10 transition-colors duration-300 hover:border-[#292524]"
              >
                {/* Project thumbnail — grayscale by default, color on hover */}
                {thumbnail && (
                  <div className="aspect-video w-full overflow-hidden border border-[#D6D3D1] mb-8 bg-[#F5F5F5]">
                    <img
                      src={thumbnail}
                      alt={project.title || "Project"}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  {/* Title row */}
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h4
                      className="text-xl font-bold leading-snug"
                      style={{ fontFamily: tokens.fonts.heading }}
                    >
                      <InlineEdit
                        isOwner={isOwner}
                        id={`mg-proj-title-${index}`}
                        value={project.title || ""}
                        onSave={(v) => handleArrayUpdate?.("projects", index, { title: v })}
                      >
                        {project.title}
                      </InlineEdit>
                    </h4>
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-[#78716C] hover:text-[#292524] transition-colors mt-1"
                        aria-label="View live project"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>

                  {/* Tech Tags */}
                  {techTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {techTags.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[9px] uppercase tracking-widest px-2.5 py-1 border border-[#D6D3D1]"
                          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div
                    className="text-sm leading-relaxed flex-1 mb-8"
                    style={{ color: tokens.colors.muted, fontFamily: tokens.fonts.body }}
                  >
                    <InlineEdit
                      isOwner={isOwner}
                      id={`mg-proj-desc-${index}`}
                      value={project.description || ""}
                      type="textarea"
                      onSave={(v) => handleArrayUpdate?.("projects", index, { description: v })}
                    >
                      <p className="whitespace-pre-wrap">
                        {project.description}
                      </p>
                    </InlineEdit>
                  </div>

                  {/* Links */}
                  {(liveUrl || githubUrl) && (
                    <div
                      className="flex items-center gap-5 pt-5 border-t mt-auto"
                      style={{ borderColor: tokens.colors.borders }}
                    >
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs uppercase tracking-widest transition-colors"
                          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = tokens.colors.primaryText)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = tokens.colors.muted)}
                        >
                          <Github size={14} /> GitHub
                        </a>
                      )}
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs uppercase tracking-widest transition-colors font-bold"
                          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primaryText }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                          <ArrowUpRight size={14} /> Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}

          {/* Empty state for owner */}
          {isOwner && allProjects.length === 0 && (
            <div
              className="col-span-2 py-20 text-center border border-dashed border-[#D6D3D1]"
            >
              <p
                className="text-sm italic"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
              >
                No projects yet. Add them from your dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
