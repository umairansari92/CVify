import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "./tokens";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      
      // Easing function for smoother progress
      const easeOutQuart = 1 - Math.pow(1 - (nextProgress / 100), 4);
      setProgress(Math.round(easeOutQuart * 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          document.body.style.overflow = "auto";
          onComplete();
        }, 600); // Wait a bit after reaching 100%
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center p-6 overflow-hidden select-none touch-none origin-bottom"
      style={{ backgroundColor: tokens.colors.background }}
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-sm">
        
        {/* Number & Percentage */}
        <motion.div 
          className="text-[120px] md:text-[160px] leading-none font-black tabular-nums tracking-tighter mb-4 relative"
          style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {progress}
          <span 
            className="text-3xl md:text-5xl font-light absolute bottom-4 -right-12"
            style={{ color: tokens.colors.primary }}
          >
            %
          </span>
        </motion.div>

        {/* Progress Bar Container */}
        <motion.div 
          className="w-full h-[2px] rounded-full overflow-hidden relative mb-8"
          style={{ backgroundColor: tokens.colors.borderFaint }}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Active Progress Bar */}
          <motion.div 
            className="absolute inset-y-0 left-0 h-full origin-left rounded-full"
            style={{ backgroundColor: tokens.colors.primary, width: `${progress}%` }}
          />
        </motion.div>

        {/* Text Details */}
        <motion.div 
          className="flex flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span 
            className="text-[10px] uppercase tracking-[0.4em] font-bold"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
          >
            Engineering Digital Experiences
          </span>
          <span 
            className="text-[9px] uppercase tracking-widest mt-1 opacity-60"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          >
            Loading Environment © {new Date().getFullYear()}
          </span>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Loader;
