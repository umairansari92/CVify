import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Showcase = ({ user, isOwner }) => {
  const { projects } = user;
  
  if (!projects || projects.length === 0) return null;

  return (
    <section id="work" className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t" style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}>
      <div className="mx-auto max-w-[1400px]">
        
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>(05)</span>
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>Work</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
              Selected Projects
            </h2>
          </div>
          <p className="text-sm md:text-right max-w-xs" style={{ color: tokens.colors.secondary }}>
            A curated selection of things I've built, optimized, or scaled.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
              className="group flex flex-col gap-6"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-video w-full rounded-xl border transition-all duration-700" style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg }}>
                {project.image ? (
                  <img src={project.image} alt={project.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl" style={{ color: tokens.colors.secondary }}>{project.name.charAt(0)}</span>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-sm">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors hover:bg-white hover:text-black" style={{ borderColor: tokens.colors.primary, color: tokens.colors.primary, fontFamily: tokens.fonts.mono }} data-cursor="hover">Live Site</a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors hover:bg-white hover:text-black" style={{ borderColor: tokens.colors.borderHover, color: tokens.colors.primary, fontFamily: tokens.fonts.mono, backgroundColor: 'rgba(255,255,255,0.05)' }} data-cursor="hover">Source</a>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
                    {project.name}
                  </h3>
                  {project.featured && (
                    <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded-full border" style={{ color: tokens.colors.accent, borderColor: 'rgba(255,46,12,0.3)', backgroundColor: 'rgba(255,46,12,0.05)', fontFamily: tokens.fonts.mono }}>Featured</span>
                  )}
                </div>
                
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: tokens.colors.secondary }}>
                  {project.description}
                </p>

                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="text-[10px] uppercase font-bold tracking-widest" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>
                        #{tech}
                      </span>
                    ))}
                  </div>
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
