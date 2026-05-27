import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Download } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Hero = ({ user, isOwner, displayValue, handleLiveUpdate, setShowResumeModal }) => {
  const personalInfo = {
    fullName: [user?.firstName, user?.lastName].filter(Boolean).join(" "),
    jobTitle: user?.headline,
    summary: user?.bio || user?.objective
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-36 pb-20 select-none overflow-hidden"
      style={{ fontFamily: tokens.fonts.primary }}
    >
      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.35em]"
          style={{ color: tokens.colors.textSecondary }}
        >
          EXECUTION OVER WORDS
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tight leading-none text-white uppercase"
          style={{ textShadow: "0 0 40px rgba(181, 137, 83, 0.25)" }}
        >
          <InlineEdit isOwner={isOwner} id="oriental-hero-title" value={personalInfo.fullName} onSave={(v) => { const [f, ...l] = v.split(" "); handleLiveUpdate({ firstName: f, lastName: l.join(" ") }); }}>
            {personalInfo.fullName}
          </InlineEdit>
        </motion.h1>

        {personalInfo.jobTitle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wider uppercase"
            style={{ color: tokens.colors.accent }}
          >
            <InlineEdit isOwner={isOwner} id="oriental-hero-role" value={personalInfo.jobTitle} onSave={(v) => handleLiveUpdate({ headline: v })}>
              <TypeAnimation
                sequence={[personalInfo.jobTitle, 2000, "AI SOLUTIONS EXPERT", 2000]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </InlineEdit>
          </motion.div>
        )}

        <motion.p 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-light"
          style={{ color: tokens.colors.textSecondary }}
        >
          Bridging authentic professional insight with state-of-the-art technological systems.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <button 
            onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 bg-[#b58953] text-black font-semibold rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#cda472] hover:scale-105 shadow-[0_0_30px_rgba(181,137,83,0.3)]"
          >
            View Projects
          </button>
          <button 
            onClick={() => setShowResumeModal(true)}
            className="px-8 py-3.5 bg-transparent border border-[#b58953]/60 text-[#b58953] font-semibold rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#b58953]/10 hover:border-[#b58953]"
          >
            Download CV
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
