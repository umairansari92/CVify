import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { ArrowRight } from "lucide-react";

const Hero = ({ user, isOwner, setShowResumeModal }) => {
  const firstName = user?.firstName || user?.name?.split(" ")[0] || "Developer";

  return (
    <section className="relative w-full h-screen mx-auto flex items-center justify-center overflow-hidden">
      {/* Background SVG Wave Pattern (approximating Azaan's portfolio) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke={tokens.colors.accent} strokeWidth="0.5" />
          <path d="M0,60 Q25,35 50,60 T100,60" fill="none" stroke={tokens.colors.accent} strokeWidth="0.3" />
          <path d="M0,40 Q25,15 50,40 T100,40" fill="none" stroke={tokens.colors.accent} strokeWidth="0.4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 z-10 w-full mt-20">
        
        {/* Left Column: Intro */}
        <div className="flex flex-row items-start gap-5 flex-1">
          {/* Vertical Purple Line */}
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915eff]" />
            <div className="w-1 sm:h-80 h-40" style={{ background: "linear-gradient(180deg, #915eff 0%, rgba(145, 94, 255, 0) 100%)" }} />
          </div>

          <div>
            <h1 className="font-black text-white lg:text-[70px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[85px] mt-2">
              Hello World, <br /> I'm <span className="text-[#915eff]">{firstName}</span>
            </h1>
            <p className="text-[#aaa6c3] font-medium lg:text-[25px] sm:text-[22px] xs:text-[18px] text-[16px] lg:leading-[35px] mt-4 max-w-lg">
              {user?.headline || "Building things, breaking bugs, shipping ideas."}
            </p>

            <div className="flex gap-4 mt-10">
              <a href="#contact-td">
                <button className="bg-[#915eff] hover:bg-[#7a4ce6] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(145,94,255,0.4)] hover:shadow-[0_0_25px_rgba(145,94,255,0.6)]">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Hire Me
                </button>
              </a>
              <button 
                onClick={() => setShowResumeModal(true)}
                className="bg-transparent border border-[#915eff] hover:bg-[#915eff]/10 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
              >
                Download CV
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Glowing Profile Image */}
        <div className="flex-1 flex justify-center lg:justify-end items-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-72 h-72 lg:w-96 lg:h-96"
          >
            {/* Glow effects */}
            <div className="absolute inset-0 rounded-full bg-[#915eff] blur-[80px] opacity-20 animate-pulse" />
            <div className="absolute inset-0 rounded-2xl border-2 border-[#915eff]/30 rotate-6" />
            <div className="absolute inset-0 rounded-2xl border-2 border-[#915eff]/30 -rotate-3" />
            
            {/* Image Container */}
            <div className="absolute inset-0 bg-[#151030] rounded-2xl overflow-hidden border border-[#915eff]/50 shadow-[0_0_30px_rgba(145,94,255,0.3)] z-10 flex items-center justify-center">
              {user?.profilePicture || user?.avatar ? (
                <img 
                  src={user.profilePicture || user.avatar} 
                  alt={firstName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl text-[#915eff] font-black">{firstName.charAt(0)}</div>
              )}
            </div>

            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-[#151030] border border-[#915eff]/50 px-4 py-2 rounded-lg z-20 shadow-xl"
            >
              <p className="text-white text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for Work
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
