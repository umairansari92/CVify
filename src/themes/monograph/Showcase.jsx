import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";
import AddProjectForm from "../../components/profile-forms/AddProjectForm";

const Showcase = ({ projects, isOwner, handleArrayUpdate }) => {
  return (
    <section 
      id="projects" 
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: tokens.colors.paper, color: tokens.colors.primaryText }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
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

          {isOwner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AddProjectForm />
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col h-full border border-[#D6D3D1] p-8 transition-colors hover:border-[#292524] bg-white relative"
            >
              {project.image && (
                <div className="aspect-video w-full overflow-hidden border border-[#D6D3D1] mb-8 bg-[#F5F5F5]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
              )}
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h4 
                    className="text-2xl font-bold"
                    style={{ fontFamily: tokens.fonts.heading }}
                  >
                    <InlineEdit
                      value={project.title}
                      onSave={(val) => handleArrayUpdate("projects", index, "title", val)}
                      isOwner={isOwner}
                    />
                  </h4>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#78716C] hover:text-[#292524] transition-colors"
                    >
                      <ArrowUpRight size={24} />
                    </a>
                  )}
                </div>

                <div 
                  className="text-base leading-relaxed mb-8 flex-1"
                  style={{ color: tokens.colors.primaryText, fontFamily: tokens.fonts.body }}
                >
                  <InlineEdit
                    value={project.description}
                    onSave={(val) => handleArrayUpdate("projects", index, "description", val)}
                    isOwner={isOwner}
                    multiline
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies?.map((tech, i) => (
                    <span 
                      key={i}
                      className="text-[10px] uppercase tracking-widest px-3 py-1 border border-[#D6D3D1]"
                      style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {isOwner && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur p-2 shadow-xl border">
                  {/* You could add a small edit button here that triggers a modal */}
                  <span className="text-xs font-mono text-black">Edit via live text</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
