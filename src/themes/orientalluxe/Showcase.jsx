import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Showcase = ({ user, isOwner, projects, handleArrayUpdate }) => {
  if (projects.length === 0) return null;

  return (
    <section 
      id="showcase" 
      className="py-24 border-b border-[#1a1a1a]"
      style={{ fontFamily: tokens.fonts.primary }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-left mb-16 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b58953]">SELECTED WORK</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-4">
            <span className="h-8 w-1 rounded-full bg-[#b58953]" /> PROJECTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#b58953]/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-white group-hover:text-[#b58953] transition-colors">
                  <InlineEdit isOwner={isOwner} id={`oriental-proj-title-${index}`} value={project.title} onSave={(v) => handleArrayUpdate("projects", index, { title: v })}>
                    {project.title}
                  </InlineEdit>
                </h3>

                {project.techStack && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-[#b58953]/5 border border-[#b58953]/15 text-[#b58953]">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-sm text-[#a3a3a3] leading-relaxed font-light">
                  <InlineEdit isOwner={isOwner} id={`oriental-proj-desc-${index}`} value={project.description} type="textarea" onSave={(v) => handleArrayUpdate("projects", index, { description: v })}>
                    {project.description}
                  </InlineEdit>
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-[#1a1a1a] mt-6">
                {(project.liveUrl || project.liveLink) && (
                  <a href={project.liveUrl || project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#b58953] hover:opacity-80 transition-opacity">
                    <ExternalLink size={14} /> LIVE DEMO
                  </a>
                )}
                {(project.githubUrl || project.githubLink) && (
                  <a href={project.githubUrl || project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#a3a3a3] hover:text-white transition-colors">
                    <FaGithub size={14} /> SOURCE CODE
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
