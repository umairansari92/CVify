import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { Sparkles } from "lucide-react";

const Showcase = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  // We need to track scroll to change the active sticky image
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const projectElements = document.querySelectorAll('.project-item');
      if (!projectElements.length) return;

      let current = 0;
      projectElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        // If the top of the element is near the middle of the screen
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = idx;
        }
      });
      setActiveIndex(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects]);

  return (
    <section 
      id="projects" 
      className="border-t relative"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-16 md:pt-20 pb-10 md:pb-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8">
          <div>
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-5"
              style={{ borderColor: `${tokens.colors.primary}4D`, backgroundColor: `${tokens.colors.primary}0D` }}
            >
              <Sparkles size={12} style={{ color: tokens.colors.primary }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: tokens.colors.primary }}>
                Featured Projects
              </span>
              <Sparkles size={12} style={{ color: tokens.colors.primary }} />
            </div>
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5vw] font-black leading-[0.92] tracking-tighter uppercase"
              style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground }}
            >
              Creative <br />
              <span style={{ color: tokens.colors.primary }}>Works</span>
            </h2>
          </div>
          <p className="font-light text-sm leading-relaxed sm:max-w-[200px] md:max-w-[240px] sm:text-right" style={{ color: tokens.colors.textDim }}>
            A curated collection of projects showcasing innovative solutions.
          </p>
        </div>
      </div>

      <div className="hidden lg:block max-w-[1200px] mx-auto relative">
        <div className="grid grid-cols-[1fr_1fr]">
          
          {/* Left Side: Scrolling Content */}
          <div>
            {projects.map((project, idx) => (
              <motion.div 
                key={project._id || idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-200px" }}
                transition={{ duration: 0.8 }}
                className="project-item min-h-screen flex flex-col justify-center px-10 xl:px-14 py-20 transition-colors duration-500"
              >
                <div className="flex items-center justify-between mb-8">
                  <span 
                    className="font-mono font-bold text-xs tracking-widest transition-colors duration-500"
                    style={{ color: activeIndex === idx ? tokens.colors.primary : tokens.colors.borderStrong }}
                  >
                    0{idx + 1}
                  </span>
                  <span 
                    className="px-3 py-1 rounded-full border font-mono text-[9px] uppercase tracking-[0.18 rem]"
                    style={{ borderColor: tokens.colors.borderFaint, color: tokens.colors.textFaint }}
                  >
                    {project.category || "Full-Stack"}
                  </span>
                </div>
                
                <h3 
                  className="font-black tracking-tighter uppercase leading-[0.88] mb-8"
                  style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground, fontSize: "clamp(2.4rem, 4.2vw, 4.5rem)" }}
                >
                  <span className="block">{project.title.split(' ').slice(0, 2).join(' ')}</span>
                  {project.title.split(' ').length > 2 && (
                    <span className="block">{project.title.split(' ').slice(2).join(' ')}</span>
                  )}
                </h3>

                <div className="flex flex-col gap-6">
                  <div 
                    className="w-12 h-[2px] rounded-full transition-all duration-500"
                    style={{ backgroundColor: activeIndex === idx ? tokens.colors.primary : tokens.colors.borderDim }}
                  />
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: tokens.colors.textFaint }}>
                      Stack & Architecture
                    </span>
                    <span 
                      className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold transition-colors duration-500"
                      style={{ color: activeIndex === idx ? tokens.colors.primary : tokens.colors.textFaint }}
                    >
                      {project.technologies?.join(' / ') || "React / Node / MongoDB"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Sticky Image */}
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-8 xl:px-12 gap-6">
            
            {/* Pagination indicator top right */}
            <div className="absolute top-10 right-10 flex items-center gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: tokens.colors.textFaint }}>
                0{activeIndex + 1} <span className="mx-1" style={{ color: tokens.colors.borderStrong }}>/</span> 0{projects.length}
              </span>
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <div 
                    key={i}
                    className="h-[3px] rounded-full transition-all duration-700"
                    style={{ 
                      width: activeIndex === i ? "24px" : "6px",
                      backgroundColor: activeIndex === i ? tokens.colors.primary : tokens.colors.borderDim
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Image Container */}
            <div 
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: "16/10", maxHeight: "52vh", backgroundColor: tokens.colors.backgroundFaint }}
            >
              {projects.map((project, idx) => (
                <img 
                  key={idx}
                  alt={project.title}
                  src={project.image || "/project-placeholder.jpg"}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                  style={{ opacity: activeIndex === idx ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Explore Link */}
            <div className="w-full flex justify-end">
              <a 
                href={projects[activeIndex]?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 pb-2 border-b transition-all duration-500"
                style={{ borderColor: tokens.colors.borderDim }}
              >
                <span 
                  className="font-bold text-lg md:text-xl uppercase tracking-tighter transition-colors duration-500"
                  style={{ fontFamily: tokens.fonts.display, color: tokens.colors.textDim }}
                >
                  Explore Live Project
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile View (Stacked) */}
      <div className="lg:hidden flex flex-col gap-16 px-6 pb-20">
        {projects.map((project, idx) => (
          <div key={idx} className="flex flex-col gap-6">
            <span className="font-mono font-bold text-xs tracking-widest" style={{ color: tokens.colors.primary }}>
              0{idx + 1}
            </span>
            <h3 
              className="text-3xl font-black uppercase tracking-tighter leading-none"
              style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground }}
            >
              {project.title}
            </h3>
            <div 
              className="w-full rounded-xl overflow-hidden relative"
              style={{ aspectRatio: "16/10", backgroundColor: tokens.colors.backgroundFaint }}
            >
              <img 
                src={project.image || "/project-placeholder.jpg"} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: tokens.colors.primary }}>
              {project.technologies?.join(' / ') || "React / Tailwind / Node"}
            </span>
            <p className="text-sm" style={{ color: tokens.colors.textDim }}>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Showcase;
