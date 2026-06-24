import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Download, Mail } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const { firstName, lastName, headline, bio, socialLinks } = user || {};
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  // Build the sequence for typing animation - one role at a time
  const rawSlogans = user?.heroSlogans || [headline || "Full Stack Developer"];
  // If it's a single long comma-separated string, split it into individual roles
  const slogans = rawSlogans.length === 1 && rawSlogans[0]?.includes(",")
    ? rawSlogans[0].split(",").map(s => s.trim()).filter(Boolean)
    : rawSlogans;
  const typeSequence = slogans.flatMap(slogan => [slogan, 2000]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <div 
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[var(--primary-color)]/30 bg-[var(--primary-color)]/10"
          >
            <span 
              className="text-[var(--primary-color)] text-xs md:text-sm tracking-widest uppercase flex items-center gap-2"
              style={{ fontFamily: tokens.fonts.mono }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--primary-color)] animate-pulse"></span>
              Available for Opportunities
            </span>
          </div>

          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight tracking-tight"
            style={{ fontFamily: tokens.fonts.heading }}
          >
            <InlineEdit
              value={firstName}
              onSave={(val) => handleLiveUpdate({ firstName: val })}
              isOwner={isOwner}
              placeholder="First Name"
              className="block"
            />
            <InlineEdit
              value={lastName}
              onSave={(val) => handleLiveUpdate({ lastName: val })}
              isOwner={isOwner}
              placeholder="Last Name"
              className="block text-[var(--primary-color)] drop-shadow-[0_0_15px_rgba(0,255,204,0.3)]"
            />
          </h1>

          <div 
            className="text-xl md:text-2xl text-[#a1a1aa] mb-6 flex items-center justify-center md:justify-start gap-2" 
            style={{ fontFamily: tokens.fonts.mono }}
          >
            <span className="text-white font-bold">I'm a&nbsp;</span>
            {typeSequence.length > 0 && (
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ 
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                  filter: "drop-shadow(0 0 8px rgba(0,255,204,0.4))"
                }}
              />
            )}
          </div>

          <p className="text-[#a1a1aa] text-base md:text-lg max-w-xl leading-relaxed mb-10 mx-auto md:mx-0">
            <InlineEdit
              value={bio}
              onSave={(val) => handleLiveUpdate({ bio: val })}
              isOwner={isOwner}
              placeholder="Write a brief intro about yourself..."
            />
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a 
              href="#projects"
              className="w-full sm:w-auto px-8 py-3 bg-[var(--primary-color)] text-black font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,204,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]"
              style={{ fontFamily: tokens.fonts.mono }}
            >
              <span>{"</>"}</span> View Projects
            </a>
            
            <a 
              href="#contact"
              className="w-full sm:w-auto px-8 py-3 bg-transparent border border-[var(--primary-color)] text-[var(--primary-color)] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 hover:bg-[var(--primary-color)]/10 transition-all"
              style={{ fontFamily: tokens.fonts.mono }}
            >
              <Mail size={18} /> Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-4 mt-10">
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[#222] bg-[#111] flex items-center justify-center text-[#a1a1aa] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all hover:shadow-[0_0_15px_rgba(0,255,204,0.3)]">
                <Github size={20} />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[#222] bg-[#111] flex items-center justify-center text-[#a1a1aa] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all hover:shadow-[0_0_15px_rgba(0,255,204,0.3)]">
                <Linkedin size={20} />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[#222] bg-[#111] flex items-center justify-center text-[#a1a1aa] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all hover:shadow-[0_0_15px_rgba(0,255,204,0.3)]">
                <Twitter size={20} />
              </a>
            )}
          </div>
        </motion.div>

        {/* Right Content - Abstract Dev Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 relative hidden lg:flex justify-center items-center"
        >
          {/* Neon Circle */}
          <div className="w-[400px] h-[400px] rounded-full border border-[var(--primary-color)]/20 relative animate-[spin_20s_linear_infinite] flex items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-full border border-[var(--primary-color)]/40 border-dashed absolute animate-[spin_15s_linear_infinite_reverse]"></div>
            
            {/* Tech Stack Icons/Text scattered around */}
            <div className="absolute -top-4 bg-[#080808] px-2 text-[var(--primary-color)] font-mono text-sm border border-[var(--primary-color)]/50 rounded shadow-[0_0_10px_rgba(0,255,204,0.2)]">React</div>
            <div className="absolute -bottom-4 bg-[#080808] px-2 text-[var(--primary-color)] font-mono text-sm border border-[var(--primary-color)]/50 rounded shadow-[0_0_10px_rgba(0,255,204,0.2)]">Node.js</div>
            <div className="absolute -left-6 bg-[#080808] px-2 text-[var(--primary-color)] font-mono text-sm border border-[var(--primary-color)]/50 rounded shadow-[0_0_10px_rgba(0,255,204,0.2)]">MongoDB</div>
            <div className="absolute -right-6 bg-[#080808] px-2 text-[var(--primary-color)] font-mono text-sm border border-[var(--primary-color)]/50 rounded shadow-[0_0_10px_rgba(0,255,204,0.2)]">Express</div>
          </div>
          
          {/* Center Graphic */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[var(--primary-color)]/20 to-transparent flex items-center justify-center backdrop-blur-sm border border-[var(--primary-color)]/30 shadow-[0_0_50px_rgba(0,255,204,0.15)]">
                <span className="text-6xl font-black text-white/90" style={{ fontFamily: tokens.fonts.heading }}>{"</>"}</span>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
