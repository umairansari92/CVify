import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { tokens } from "./tokens";

const WordReveal = ({ text, className, style }) => {
  const words = text.split(" ");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { ease: tokens.motion.easing.base, duration: tokens.motion.duration.normal }
    }
  };

  return (
    <motion.span 
      variants={containerVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      className={`inline-block ${className}`}
      style={style}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const About = ({ user, isOwner }) => {
  const { branding, education } = user;
  
  // Custom scroll scale hook for the image
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Scale from 1 to 1.08 max as requested
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.08]);

  // Fallback calculations for stats
  const projectsCount = user?.projects?.length || 0;
  const experienceYears = user?.experience?.length ? 
    new Date().getFullYear() - new Date(user.experience[user.experience.length - 1].startDate).getFullYear() : 0;

  return (
    <section ref={containerRef} id="about" className="relative z-10 px-6 md:px-12 py-24 md:py-32" style={{ backgroundColor: tokens.colors.bg }}>
      <div className="mx-auto max-w-[1400px]">
        
        {/* Header */}
        <div className="mb-14 flex items-center gap-4">
          <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>(01)</span>
          <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>About</span>
        </div>

        <div className="grid gap-14 md:grid-cols-12 md:gap-12">
          
          {/* Left Text Content */}
          <div className="md:col-span-7">
            <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-10" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
              <WordReveal text="Engineering with a designer's " />
              <span className="italic" style={{ color: tokens.colors.accent }}>eye.</span>
            </h2>

            <div className="flex flex-col gap-6 max-w-xl">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
                className="text-lg md:text-xl leading-relaxed" 
                style={{ color: tokens.colors.secondary }}
              >
                {branding?.summary || "I am a versatile professional shaping digital experiences. Equal parts creative and analytical."}
              </motion.p>
              
              {/* CVify Pro AI Summary Badge Integration */}
              {(user?.branding?.verificationStats?.atsScore) && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   className="mt-4 p-4 border rounded"
                   style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg }}
                 >
                   <div className="flex items-center gap-2 mb-2">
                     <span className="text-xs uppercase font-bold tracking-widest" style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}>// AI SUMMARY</span>
                   </div>
                   <p className="text-sm" style={{ color: tokens.colors.primary }}>
                     Analyzed profile indicates a {branding.verificationStats.atsScore}% ATS compatibility score with strong technical foundation.
                   </p>
                 </motion.div>
              )}
            </div>

            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t"
              style={{ borderColor: tokens.colors.border }}
            >
              <div>
                <div className="text-3xl md:text-4xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>{projectsCount}+</div>
                <div className="text-xs mt-2 uppercase font-bold tracking-widest" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>Projects Shipped</div>
              </div>
              {experienceYears > 0 && (
                <div>
                  <div className="text-3xl md:text-4xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>{experienceYears}+</div>
                  <div className="text-xs mt-2 uppercase font-bold tracking-widest" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>Years Exp</div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Image Content */}
          <div className="md:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: tokens.motion.duration.slow, ease: tokens.motion.easing.base }}
              className="group relative"
            >
              {/* Image Container with Scroll Transform */}
              <div className="relative overflow-hidden aspect-[3/4] w-full rounded" style={{ backgroundColor: tokens.colors.cardBg }}>
                <motion.img 
                  style={{ scale: imageScale }}
                  src={user?.profilePicture || "/default-avatar.png"} 
                  alt={user?.firstName} 
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
                />
              </div>
              
              {/* Minimal Border Accents */}
              <span className="pointer-events-none absolute -left-3 -top-3 h-5 w-5 border-l border-t" style={{ borderColor: tokens.colors.borderHover }}></span>
              <span className="pointer-events-none absolute -right-3 -top-3 h-5 w-5 border-r border-t" style={{ borderColor: tokens.colors.borderHover }}></span>
              <span className="pointer-events-none absolute -bottom-3 -left-3 h-5 w-5 border-b border-l" style={{ borderColor: tokens.colors.borderHover }}></span>
              <span className="pointer-events-none absolute -bottom-3 -right-3 h-5 w-5 border-b border-r" style={{ borderColor: tokens.colors.borderHover }}></span>
              
              {/* Initial Label */}
              <span className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-bold tracking-widest backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}>
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            </motion.div>

            {/* Mini Education Timeline underneath */}
            {education && education.length > 0 && (
              <div className="mt-12 flex flex-col gap-6">
                {education.slice(0, 2).map((edu, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
                    className="flex gap-5 border-t pt-5"
                    style={{ borderColor: tokens.colors.border }}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-widest shrink-0 pt-1" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
                      {new Date(edu.startDate).getFullYear()} — {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                    </span>
                    <div>
                      <div className="text-sm font-medium" style={{ color: tokens.colors.primary }}>{edu.degree}</div>
                      <div className="mt-1 text-xs" style={{ color: tokens.colors.secondary }}>{edu.school}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
