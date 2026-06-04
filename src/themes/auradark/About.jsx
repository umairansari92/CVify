import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { Download, FileText, MapPin } from "lucide-react";

const About = ({ user, setShowResumeModal }) => {
  if (!user) return null;

  const nameParts = user.name ? user.name.split(" ") : ["John", "Doe"];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section 
      id="journey" 
      className="pt-32 lg:pt-48 border-t"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="max-w-[1700px] mx-auto px-4 md:px-12">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          
          {/* Left Column: Huge Name & Bio */}
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-6">
              <span 
                className="font-bold text-[10px] tracking-[0.4em] uppercase"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                THE PROFILE / 01
              </span>
              <h2 
                className="text-5xl md:text-7xl font-black leading-[0.8] tracking-tighter uppercase"
                style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground }}
              >
                {firstName} <br />
                <span style={{ color: tokens.colors.primary }}>{lastName}.</span>
              </h2>
            </div>
            
            <p 
              className="text-lg font-light leading-relaxed max-w-xl"
              style={{ color: tokens.colors.textDim }}
            >
              {user.summary || "Passionate developer crafting exceptional digital experiences."}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              {user.resume && (
                <a 
                  href={user.resume} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 text-white text-[11px] font-bold tracking-[0.2em] rounded-full overflow-hidden shadow-xl transition-all duration-500"
                  style={{ backgroundColor: tokens.colors.primary, boxShadow: `0 20px 25px -5px ${tokens.colors.primary}40` }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Download size={16} className="group-hover:animate-bounce" />
                    DOWNLOAD RESUME
                  </span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500" />
                </a>
              )}
              
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative px-8 py-4 border text-[11px] font-bold tracking-[0.2em] rounded-full transition-all duration-500 overflow-hidden"
                style={{ borderColor: tokens.colors.borderStrong, color: tokens.colors.foreground }}
              >
                <span className="relative z-10 flex items-center gap-3 group-hover:text-primary transition-colors">
                  <FileText size={16} />
                  GET IN TOUCH
                </span>
                <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ backgroundColor: `${tokens.colors.primary}1A` }} />
              </button>
            </div>

            {/* Location */}
            {user.location && (
              <div 
                className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest border-t pt-12 mt-12"
                style={{ borderColor: tokens.colors.borderFaint, color: tokens.colors.textFaint }}
              >
                <MapPin size={14} style={{ color: tokens.colors.primary }} />
                {user.location} — OPEN TO OPPORTUNITIES
              </div>
            )}
          </div>

          {/* Right Column (Placeholder for Timeline to be rendered externally or rendered here if passed via props, but in OrientalLuxe we kept them as separate components).
              Actually, in the screenshot, Education and Certs are right next to the Bio. Let's make the container in index.jsx render them side by side, or we render them right here.
              We'll leave the right column empty here, and in index.jsx we can structure the grid. Or better yet, we just render About normally and render Education/Experience below it.
              Let's make About span the full width or just keep the left side if we don't pass the children. */}
              
        </motion.div>
      </div>
    </section>
  );
};

export default About;
