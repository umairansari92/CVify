import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Hero = ({ user, isOwner }) => {
  const { branding, contact } = user;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Letter by letter timing
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: tokens.motion.easing.base, duration: tokens.motion.duration.fast }
    }
  };

  // Split text into letters for the Hero specific reveal
  const AnimatedText = ({ text, className, style }) => {
    return (
      <motion.span 
        className={`inline-block ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={style}
      >
        {text.split("").map((char, index) => (
          <motion.span 
            key={index} 
            variants={letterVariants}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  const isAvailableForHire = true; // CVify Pro identity element

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden" style={{ backgroundColor: tokens.colors.bg }}>
      {/* 10% Aurora & Grain Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10" 
           style={{
             background: `radial-gradient(circle at 80% 20%, ${tokens.colors.aiGlow}, transparent 50%),
                          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.02), transparent 50%)`
           }} 
      />
      
      {/* Film Grain overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             mixBlendMode: 'overlay'
           }}
      />

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-start pt-32 pb-20">
        
        {/* CVify Availability Badge */}
        {isAvailableForHire && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
            className="flex items-center gap-3 mb-10 px-4 py-2 rounded-full border"
            style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg }}
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: tokens.colors.accent }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: tokens.colors.accent }}></span>
            </div>
            <span className="uppercase text-[10px] font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
              Available for new opportunities
            </span>
          </motion.div>
        )}

        <div className="max-w-2xl mb-8">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
            className="text-lg md:text-xl font-medium mb-4 leading-relaxed"
            style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.body }}
          >
            {branding?.headline || "Software Engineer & Designer"}
          </motion.p>
        </div>

        {/* Hero Title with signature hover effect and letter reveal */}
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium leading-[0.9] tracking-tighter flex flex-col group cursor-default" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
          <AnimatedText text={user?.firstName || "Jane"} />
          <div className="flex items-baseline gap-4">
            <span className="transition-all duration-700 group-hover:italic group-hover:text-accent group-hover:pr-4">
              <AnimatedText text={user?.lastName || "Doe"} />
            </span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-accent text-4xl md:text-6xl"
            >
              .
            </motion.span>
          </div>
        </h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: tokens.motion.duration.slow, ease: tokens.motion.easing.base }}
          className="mt-20 w-full flex flex-wrap items-center justify-between gap-6 pt-8 border-t"
          style={{ borderColor: tokens.colors.border }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl" style={{ color: tokens.colors.accent }}>&rarr;</span>
            <span className="uppercase text-xs font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>V1.0</span>
          </div>
          
          <div className="flex items-center gap-6">
            {contact?.socialLinks?.github && (
              <a href={contact.socialLinks.github} target="_blank" rel="noopener noreferrer" className="uppercase text-xs font-bold tracking-widest transition-colors hover:text-accent" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }} data-cursor="hover">GitHub</a>
            )}
            {contact?.socialLinks?.linkedin && (
              <a href={contact.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="uppercase text-xs font-bold tracking-widest transition-colors hover:text-accent" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }} data-cursor="hover">LinkedIn</a>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
