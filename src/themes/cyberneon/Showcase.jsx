import React, { useState } from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const Showcase = ({ projects, isOwner }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects || projects.length === 0) {
    if (!isOwner) return null;
    return (
      <section id="projects" className="py-20 px-6 text-center">
        <p className="text-[#a1a1aa] italic">No projects added yet.</p>
      </section>
    );
  }

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" className="py-20 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, monospace" }}>
            <span className="text-white">My </span><span className="text-[var(--primary-color)]">Projects</span>
          </h2>
          <div className="w-16 h-1 mx-auto mb-4 rounded-full" style={{ background: "linear-gradient(90deg, var(--primary-color), transparent)" }}></div>
          <p className="text-[#a1a1aa] text-sm max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>Selected works & technical case studies.</p>
        </div>

        <div className="relative">
          {/* Project Display */}
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-8 items-center bg-[#111] border border-[#222] rounded-xl overflow-hidden p-6 shadow-2xl"
          >
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative group rounded-lg overflow-hidden border border-[#222] aspect-video bg-[#080808]">
              {currentProject.thumbnail || currentProject.imageUrl || currentProject.image ? (
                <img 
                  src={currentProject.thumbnail || currentProject.imageUrl || currentProject.image} 
                  alt={currentProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#333]">
                   <span className="text-6xl font-black mb-4">{"</>"}</span>
                   <p className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">No Image Available</p>
                </div>
              )}
              {/* Neon overlay grid effect */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNOCAzMGg0ME0xMCAwdjQwTTIwIDB2NDBNMzAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDAsMjU1LDIwNCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] pointer-events-none opacity-50"></div>
            </div>

            {/* Info Side */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-6xl font-black text-[#222] leading-none" style={{ fontFamily: tokens.fonts.heading }}>
                  {(currentIndex + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{currentProject.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.techStack?.map((tech, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest font-mono text-[var(--primary-color)] bg-[var(--primary-color)]/10 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-4 rounded border-l-2 border-[var(--primary-color)]">
                <p className="text-[#a1a1aa] text-sm leading-relaxed">{currentProject.description}</p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[#222]">
                {currentProject.liveLink && (
                  <a href={currentProject.liveLink} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,255,204,0.4)]" title="Live Demo">
                    <ExternalLink size={18} />
                  </a>
                )}
                {currentProject.githubLink && (
                  <a href={currentProject.githubLink} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#333] text-white flex items-center justify-center hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all" title="Source Code">
                    <Github size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          {projects.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={prevProject}
                className="w-12 h-12 rounded-full border border-[#333] text-white flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-black hover:border-transparent transition-all shadow-[0_0_0_rgba(0,255,204,0)] hover:shadow-[0_0_15px_rgba(0,255,204,0.4)]"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="text-[#a1a1aa] font-mono text-sm">
                <span className="text-white">{currentIndex + 1}</span> / {projects.length}
              </div>
              <button 
                onClick={nextProject}
                className="w-12 h-12 rounded-full border border-[#333] text-white flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-black hover:border-transparent transition-all shadow-[0_0_0_rgba(0,255,204,0)] hover:shadow-[0_0_15px_rgba(0,255,204,0.4)]"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
