import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

const Hero = ({ user }) => {
  if (!user) return null;

  const nameParts = user.name ? user.name.split(" ") : ["John", "Doe"];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  // Handle long headlines
  const rawHeadline = user.headline || "Software Engineer";
  // If it's a huge list of skills, just take the first part
  const shortHeadline = rawHeadline.includes(',') ? rawHeadline.split(',')[0].trim() : rawHeadline;

  const tags = user.skills?.technical?.slice(0, 3) || ["FRONTEND ENGINEER", "UI/UX ENTHUSIAST", "PROBLEM SOLVER"];

  const renderSocialIcon = (url) => {
    if (!url) return null;
    if (url.includes("github.com")) return <Github size={14} />;
    if (url.includes("linkedin.com")) return <Linkedin size={14} />;
    if (url.includes("twitter.com") || url.includes("x.com")) return <Twitter size={14} />;
    return <ExternalLink size={14} />;
  };

  const getSocialName = (url) => {
    if (url.includes("github.com")) return "GITHUB";
    if (url.includes("linkedin.com")) return "LINKEDIN";
    if (url.includes("twitter.com") || url.includes("x.com")) return "TWITTER";
    return "WEBSITE";
  };

  return (
    <section 
      className="relative w-full h-screen min-h-[800px] overflow-hidden"
      style={{ backgroundColor: tokens.colors.background }}
    >
      {/* ── 1. Top Marquee (Tags) ── */}
      <div className="absolute top-6 left-0 w-full z-50 flex justify-center pointer-events-none hidden md:flex">
        <motion.div 
          className="flex items-center gap-8 px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {tags.map((tag, index) => (
            <React.Fragment key={index}>
              <span 
                className="text-[9px] font-bold tracking-[0.3em] uppercase"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
              >
                {typeof tag === 'string' ? tag : tag.name}
              </span>
              {index < tags.length - 1 && (
                <div className="w-1 h-1 rounded-full bg-primary/40" style={{ backgroundColor: tokens.colors.primary }} />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* ── 2. Background "CREATIVE" Watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none overflow-hidden">
        <motion.h2 
          className="text-[22vw] font-black leading-none tracking-tighter uppercase whitespace-nowrap"
          style={{ fontFamily: tokens.fonts.display, color: "rgba(255,255,255,0.03)" }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          CREATIVE
        </motion.h2>
      </div>

      {/* ── 3. Main Center Portrait ── */}
      {/* We make it absolute, anchored to the bottom center, so the face is in the middle */}
      <div className="absolute inset-x-0 bottom-0 top-[10%] flex items-end justify-center z-20 pointer-events-none">
        <motion.div 
          className="w-full h-full max-w-[800px] relative flex items-end justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img 
            alt={user.name} 
            src={user.profilePicture || "/default-avatar.png"} 
            className="w-full h-full object-contain object-bottom filter contrast-[1.05] brightness-[1.1]"
            style={{ 
              maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)'
            }}
          />
        </motion.div>
      </div>

      {/* ── 4. The 4 Corners (Content) ── */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 md:p-12 lg:px-20 pt-32 md:pt-40 pb-12 md:pb-24">
        
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">
          
          {/* Top Left: Name */}
          <motion.div 
            className="pointer-events-auto"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tighter uppercase drop-shadow-2xl"
              style={{ fontFamily: tokens.fonts.display }}
            >
              <span style={{ color: tokens.colors.primary }}>{firstName}</span>{" "}
              <span style={{ color: tokens.colors.foreground }}>{lastName}</span>
            </h1>
            <p 
              className="text-xs md:text-sm font-light tracking-widest mt-2 uppercase drop-shadow-md"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
            >
              {shortHeadline}
            </p>
          </motion.div>

          {/* Top Right: Quote */}
          <motion.div 
            className="hidden md:block pointer-events-auto text-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p 
              className="text-lg lg:text-xl font-medium leading-tight italic drop-shadow-md"
              style={{ fontFamily: tokens.fonts.display, color: tokens.colors.textDim }}
            >
              Design that speaks. <br />
              <span className="font-light not-italic">Interfaces that convert.</span>
            </p>
          </motion.div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-end w-full gap-8 mt-auto">
          
          {/* Bottom Left: Socials & Bio */}
          <motion.div 
            className="pointer-events-auto max-w-lg flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Social Icons */}
            <div className="flex items-center gap-6 flex-wrap">
              {user.socialLinks && Object.values(user.socialLinks).map((link, idx) => (
                link && (
                  <a 
                    key={idx}
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 group hover:-translate-y-1 transition-transform"
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors border"
                      style={{ backgroundColor: tokens.colors.backgroundFaint, borderColor: tokens.colors.borderFaint, color: tokens.colors.foreground }}
                    >
                      {renderSocialIcon(link)}
                    </div>
                    <span 
                      className="text-[10px] font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors"
                      style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
                    >
                      {getSocialName(link)}
                    </span>
                  </a>
                )
              ))}
            </div>

            {/* Bio text */}
            <p 
              className="text-[10px] md:text-xs font-light leading-relaxed tracking-wider uppercase drop-shadow-md line-clamp-4"
              style={{ color: tokens.colors.textDim }}
            >
              {user.summary || "Passionate about turning creative ideas into modern web experiences. I specialize in building pixel-perfect, responsive applications using modern web technologies. I believe great products are built at the intersection of clean code, thoughtful design, and seamless user experience."}
            </p>
          </motion.div>

          {/* Bottom Right: Giant Role */}
          <motion.div 
            className="pointer-events-auto text-right z-40"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* We split the short headline into two lines to match the giant "FRONTEND ENGINEER" look */}
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[6vw] font-black leading-[0.85] tracking-tighter uppercase drop-shadow-2xl"
              style={{ fontFamily: tokens.fonts.display, color: tokens.colors.primary }}
            >
              {shortHeadline.split(' ')[0]} <br />
              <span style={{ color: tokens.colors.foreground }}>
                {shortHeadline.split(' ').slice(1).join(' ')}
              </span>
            </h2>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
