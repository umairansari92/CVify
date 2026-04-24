import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaGithub, FaPlus } from "react-icons/fa";
import { ExternalLink, Trash, Image as ImageIcon, Star } from "lucide-react";
import InlineEdit from "../InlineEdit";

const Showcase = React.memo(({ user, isOwner, projects, displayValue, handleArrayUpdate, dispatch, deleteProjectThunk, openProjectModalThunk }) => {
  return (
    <section id="showcase" className="py-20 md:py-32 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center justify-center gap-4">
            <FaBriefcase className="text-[var(--primary-color)]" />
            <span className="text-[var(--text-primary)]">Featured </span>
            <span className="text-[var(--primary-color)]">Showcase</span>
          </h2>
          <div className="h-1.5 w-16 bg-[var(--primary-color)] mx-auto rounded-full opacity-60" />
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-2xl mx-auto opacity-70">
            {displayValue(null, "A curated collection of my most impactful digital products and technical experiments.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--card-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--primary-color)]/80 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:-translate-y-1"
            >
              <div className="relative aspect-video w-full bg-[var(--card-bg)] overflow-hidden border-b border-[var(--card-border)]">
                {project.thumbnail || project.image ? (
                  <img src={project.thumbnail || project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--text-primary)] opacity-20">
                    <ImageIcon size={48} strokeWidth={1} />
                  </div>
                )}
                {isOwner && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <span className="text-sm text-white font-medium px-4 py-2 bg-white/10 rounded-full border border-white/20">Change Image</span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight">
                    <InlineEdit isOwner={isOwner} id={`proj-title-${index}`} value={project.title} onSave={(v) => handleArrayUpdate("projects", index, { title: v })}>
                      {project.title || 'Project Title'}
                    </InlineEdit>
                  </h3>
                  <div className="flex flex-col items-end gap-2">
                    {(project.featured || project.isFeatured) && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-orange-500/20 text-orange-400 rounded">Featured</span>
                    )}
                    {project.githubStars > 0 && (
                      <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded text-[10px] font-bold">
                        <Star size={10} fill="currentColor" /> {project.githubStars} Stars
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-1 line-clamp-3 group-hover:line-clamp-none transition-all">
                  <InlineEdit isOwner={isOwner} id={`proj-desc-${index}`} value={project.description} type="textarea" onSave={(v) => handleArrayUpdate("projects", index, { description: v })}>
                    <p>{project.description || 'Describe the problem you solved and the technologies you used...'}</p>
                  </InlineEdit>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-[var(--card-border)] mt-auto">
                  {(project.liveUrl || project.liveLink) && (
                    <a href={project.liveUrl || project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--primary-color)] hover:opacity-80 transition-all">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {(project.githubUrl || project.githubLink) && (
                    <a href={project.githubUrl || project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                      <FaGithub size={16} /> Source Code
                    </a>
                  )}
                  
                  <div className="flex-1"></div>

                  {isOwner && (
                    <button onClick={() => dispatch(deleteProjectThunk(project._id || index))} className="text-[var(--text-secondary)] opacity-50 hover:opacity-100 hover:text-red-400 transition-all">
                      <Trash size={16} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Showcase;
