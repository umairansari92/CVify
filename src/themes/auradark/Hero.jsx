import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { animations } from "./animations";
import { Github, Linkedin, Twitter, ExternalLink, Mail } from "lucide-react";

const Hero = ({ user }) => {
  if (!user) return null;

  // Split name for the two-color effect
  const nameParts = user.name ? user.name.split(" ") : ["John", "Doe"];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  // Title / Role
  const headline = user.headline || "Software Engineer";

  // Tags for the top pill marquee (derived from skills or hardcoded fallbacks if empty)
  const tags = user.skills?.technical?.slice(0, 3) || ["DEVELOPER", "ENGINEER", "CREATIVE"];

  // Social Links mapping
  const renderSocialIcon = (url) => {
    if (!url) return null;
    if (url.includes("github.com")) return <Github size={16} />;
    if (url.includes("linkedin.com")) return <Linkedin size={16} />;
    if (url.includes("twitter.com") || url.includes("x.com")) return <Twitter size={16} />;
    return <ExternalLink size={16} />;
  };

  const getSocialName = (url) => {
    if (url.includes("github.com")) return "GitHub";
    if (url.includes("linkedin.com")) return "LinkedIn";
    if (url.includes("twitter.com") || url.includes("x.com")) return "Twitter";
    return "Website";
  };

  return (
    <section 
      className="relative flex flex-col overflow-hidden min-h-screen"
      style={{ backgroundColor: tokens.colors.background }}
    >
      {/* Top Ticker Pill */}
      <div className="absolute top-8 left-0 w-full hidden lg:flex justify-center z-50 px-6">
        <motion.div 
          className="flex items-center gap-10 whitespace-nowrap overflow-hidden max-w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {tags.map((tag, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center gap-10">
                <span 
                  className="text-[10px] font-bold tracking-[0.3em] uppercase"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
                >
                  {typeof tag === 'string' ? tag : tag.name}
                </span>
                {index < tags.length - 1 && (
                  <div 
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: tokens.colors.primary, opacity: 0.4 }}
                  />
                )}
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-col min-h-screen pt-8">
        <div className="container mx-auto px-12 grow flex flex-col relative pt-32 pb-12">
          
          {/* Top Row: Name & Tagline */}
          <div className="flex justify-between items-start relative z-40">
            <motion.div className="space-y-1" variants={animations.fadeIn} initial="initial" animate="animate">
              <h1 
                className="text-3xl xl:text-4xl font-black leading-none tracking-tighter"
                style={{ fontFamily: tokens.fonts.display, color: tokens.colors.primary }}
              >
                {firstName.toUpperCase()} <span style={{ color: tokens.colors.foreground }}>{lastName.toUpperCase()}</span>
              </h1>
              <p 
                className="text-sm font-light tracking-tight"
                style={{ color: tokens.colors.textDim }}
              >
                {headline}
              </p>
            </motion.div>

            <motion.div 
              className="text-right space-y-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p 
                className="text-xl font-medium leading-tight italic"
                style={{ fontFamily: tokens.fonts.display, color: tokens.colors.textDim }}
              >
                Design that speaks. <br />
                <span className="font-light not-italic">Interfaces that convert.</span>
              </p>
            </motion.div>
          </div>

          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
            <motion.h2 
              className="text-[19vw] font-black leading-none tracking-tighter uppercase"
              style={{ fontFamily: tokens.fonts.display, color: "rgba(255,255,255,0.02)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              CREATIVE
            </motion.h2>
          </div>

          {/* Center Image */}
          <div className="absolute inset-0 flex items-center justify-center z-[30] pointer-events-none">
            <motion.div 
              className="w-full h-full max-w-5xl relative flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <img 
                alt={user.name} 
                className="w-full h-full object-contain object-center filter contrast-[1.05] brightness-[1.2]" 
                src={user.profilePicture || "/default-avatar.png"} 
              />
              <div 
                className="absolute inset-x-0 bottom-0 h-1/3 z-20"
                style={{ background: `linear-gradient(to top, ${tokens.colors.background}, ${tokens.colors.background}66, transparent)` }}
              />
            </motion.div>
          </div>

          {/* Large Role Text Bottom Right */}
          <div className="absolute right-12 bottom-40 z-[40] pointer-events-none">
            <motion.h3 
              className="text-5xl xl:text-6xl font-black leading-[0.85] tracking-tighter uppercase text-right drop-shadow-2xl"
              style={{ fontFamily: tokens.fonts.display, color: tokens.colors.primary }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {headline.split(' ')[0]} <br />
              <span style={{ color: tokens.colors.foreground }}>
                {headline.split(' ').slice(1).join(' ')}
              </span>
            </motion.h3>
          </div>

          {/* Bottom Row: Social Links & Summary */}
          <div className="mt-auto flex flex-col gap-10 relative z-[40]">
            <motion.div 
              className="flex items-center gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {user.socialLinks && Object.values(user.socialLinks).map((link, idx) => (
                link && (
                  <a 
                    key={idx}
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 group pointer-events-auto"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ backgroundColor: tokens.colors.backgroundFaint, color: tokens.colors.foreground }}
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
            </motion.div>

            <motion.div 
              className="pt-10 border-t"
              style={{ borderColor: tokens.colors.borderFaint }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p 
                className="text-xs xl:text-sm font-light leading-relaxed max-w-5xl tracking-wide uppercase"
                style={{ color: tokens.colors.textDim }}
              >
                {user.summary || "Passionate about turning creative ideas into modern web experiences. I specialize in building pixel-perfect, responsive applications using modern web technologies."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <div className="h-16 shrink-0" />
        <div className="px-5 pt-5 pb-2 z-10">
          <h1 
            className="text-[clamp(2rem,10vw,3rem)] font-black leading-[0.92] tracking-tighter uppercase"
            style={{ fontFamily: tokens.fonts.display }}
          >
            <span style={{ color: tokens.colors.primary }}>{firstName}</span>{" "}
            <span style={{ color: tokens.colors.foreground }}>{lastName}</span>
          </h1>
          <p 
            className="text-xs font-light tracking-widest mt-1.5 uppercase"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
          >
            {headline}
          </p>
        </div>

        <div className="relative w-full overflow-hidden shrink-0 my-4 aspect-[4/5] sm:aspect-[3/2] md:aspect-[16/9]">
          <img 
            alt={user.name} 
            className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.1]" 
            src={user.profilePicture || "/default-avatar.png"} 
          />
          <div 
            className="absolute inset-x-0 bottom-0 h-2/3"
            style={{ background: `linear-gradient(to top, ${tokens.colors.background}, ${tokens.colors.background}80, transparent)` }}
          />
        </div>

        <div className="px-5 pt-2 pb-5">
          <h2 
            className="text-[clamp(2.4rem,10vw,4rem)] font-black leading-[0.9] tracking-tighter uppercase"
            style={{ fontFamily: tokens.fonts.display, color: tokens.colors.primary }}
          >
            {headline.split(' ')[0]}<br />
            <span style={{ color: tokens.colors.foreground }}>{headline.split(' ').slice(1).join(' ')}</span>
          </h2>
        </div>

        <div className="mx-5 h-px" style={{ backgroundColor: tokens.colors.backgroundFaint }} />

        <div className="px-5 py-4 flex flex-wrap items-center gap-5">
          {user.socialLinks && Object.values(user.socialLinks).map((link, idx) => (
            link && (
              <a 
                key={idx}
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2.5 group"
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all"
                  style={{ backgroundColor: tokens.colors.backgroundFaint, borderColor: tokens.colors.borderFaint, color: tokens.colors.textDim }}
                >
                  {renderSocialIcon(link)}
                </div>
                <span 
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
                >
                  {getSocialName(link)}
                </span>
              </a>
            )
          ))}
        </div>

        <div className="px-5 pb-8 mt-auto border-t pt-4" style={{ borderColor: tokens.colors.borderFaint }}>
          <p className="text-[10px] font-light leading-[1.9] tracking-wide uppercase" style={{ color: tokens.colors.textFaint }}>
            {user.summary}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
