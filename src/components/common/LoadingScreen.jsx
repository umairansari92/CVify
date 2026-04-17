import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Main Loader Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Modern Pulse Ring */}
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
          />
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-xl">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               className="w-6 h-6 border-b-2 border-primary rounded-full"
             />
          </div>
        </div>

        {/* Textual feedback */}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-sm font-black text-text-primary uppercase tracking-[0.3em] ml-1">
            CVify <span className="text-primary italic">Pro</span>
          </h2>
          <div className="flex items-center gap-2 mt-2">
             <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
             <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
             <div className="h-1 w-1 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Forensic Metadata (Bottom Left) */}
      <div className="absolute bottom-10 left-10 opacity-20 hidden md:block">
        <p className="text-[8px] font-black text-text-muted uppercase tracking-widest leading-loose">
          Secure Sandbox v1.2<br />
          Hydrating Experience...<br />
          Optimizing Core Vitals
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
