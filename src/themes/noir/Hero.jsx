import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const containerRef = useRef(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    // Dynamic city time based on user location (defaulting to user location or Karachi/Tangier style)
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Karachi", // Fallback or detect
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      try {
        const formatter = new Intl.DateTimeFormat("en-US", options);
        setTime(formatter.format(new Date()));
      } catch (e) {
        const now = new Date();
        setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax / Scroll to focus values for the scattered images
  const img1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const img1Rotate = useTransform(scrollYProgress, [0, 1], [-8, 2]);
  const img1Scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  const img2Y = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const img2Rotate = useTransform(scrollYProgress, [0, 1], [10, -5]);
  const img2Scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const img3Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const img3Rotate = useTransform(scrollYProgress, [0, 1], [-15, -25]);

  const img4Y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const img4Rotate = useTransform(scrollYProgress, [0, 1], [6, 15]);
  const img4Scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const profileImage = user?.profileImage;
  const locationName = user?.location || "Karachi, Pakistan";
  const firstName = user?.firstName || "Mostafa";
  const lastName = user?.lastName || "Oulahyan";
  const bio = user?.bio || "Full stack developer, turning ideas into fast, considered products.";

  // Navigation handlers
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between"
      style={{ backgroundColor: tokens.colors.bg }}
    >
      {/* Google Font link injected directly */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Vibrant Red/Orange Aura (Glow from right-top corner) */}
      <div
        className="absolute right-0 top-0 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full pointer-events-none filter blur-[120px] opacity-45"
        style={{
          background: `radial-gradient(circle, ${tokens.colors.accent} 0%, rgba(255, 46, 12, 0.2) 50%, transparent 100%)`,
          transform: "translate(20%, -20%)",
        }}
      />
      {/* Film Grain Texture */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Minimal Top Header */}
      <header className="relative z-50 w-full px-6 md:px-12 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3" data-cursor="hover">
          <span
            className="text-lg font-bold tracking-tighter"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: tokens.colors.primary }}
          >
            {firstName.charAt(0)}{lastName.charAt(0)}
          </span>
          <span
            className="text-[10px] tracking-widest opacity-60 uppercase font-medium hidden sm:inline"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          >
            {firstName} {lastName}
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {["about", "skills", "work", "contact"].map((sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              className="text-[10px] tracking-[0.2em] uppercase font-bold hover:opacity-100 opacity-60 transition-opacity"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              data-cursor="hover"
            >
              {sec}
            </button>
          ))}
        </nav>

        {/* Top Right Live Time */}
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: tokens.colors.accent }}
          />
          <span
            className="text-[10px] tracking-widest uppercase font-bold"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
          >
            {locationName.split(",")[0]} {time}
          </span>
        </div>
      </header>

      {/* Hero Visuals and Title */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center py-20">
        
        {/* Scattered Photo Canvas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Scattered Image 1 (Top Left) */}
          <motion.div
            style={{ y: img1Y, rotate: img1Rotate, scale: img1Scale }}
            className="absolute left-[8%] top-[10%] w-[160px] md:w-[240px] aspect-[4/5] rounded overflow-hidden shadow-2xl border"
            style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg }}
          >
            <img
              src={profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"}
              alt=""
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>

          {/* Scattered Image 2 (Top Right) */}
          <motion.div
            style={{ y: img2Y, rotate: img2Rotate, scale: img2Scale }}
            className="absolute right-[15%] top-[5%] w-[180px] md:w-[260px] aspect-[4/3] rounded overflow-hidden shadow-2xl border"
            style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg }}
          >
            <img
              src={profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"}
              alt=""
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>

          {/* Scattered Image 3 (Bottom Left) */}
          <motion.div
            style={{ y: img3Y, rotate: img3Rotate }}
            className="absolute left-[12%] bottom-[12%] w-[140px] md:w-[200px] aspect-square rounded overflow-hidden shadow-2xl border"
            style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg }}
          >
            <img
              src={profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"}
              alt=""
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>

          {/* Scattered Image 4 (Bottom Right / Under Title) */}
          <motion.div
            style={{ y: img4Y, rotate: img4Rotate, scale: img4Scale }}
            className="absolute right-[22%] bottom-[8%] w-[160px] md:w-[240px] aspect-[4/5] rounded overflow-hidden shadow-2xl border"
            style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg }}
          >
            <img
              src={profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"}
              alt=""
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </div>

        {/* Content Box (Tilted description card at top left) */}
        <div className="relative z-20 w-full max-w-sm mb-12 self-start md:ml-[15%]">
          <InlineEdit
            isOwner={isOwner}
            id="noir-hero-bio"
            value={bio}
            type="textarea"
            onSave={(v) => handleLiveUpdate?.({ bio: v })}
          >
            <p
              className="text-sm md:text-base leading-relaxed tracking-wide opacity-80"
              style={{ color: tokens.colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {bio}
            </p>
          </InlineEdit>
        </div>

        {/* Main Central Typography Name */}
        <motion.div
          style={{ scale: nameScale, y: nameY }}
          className="relative z-30 flex flex-col items-center justify-center text-center select-none"
        >
          <h1
            className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-bold leading-none tracking-tighter"
            style={{ color: tokens.colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="inline-block mr-4 font-extrabold">
              <InlineEdit
                isOwner={isOwner}
                id="noir-first-name"
                value={firstName}
                onSave={(v) => handleLiveUpdate?.({ firstName: v })}
              >
                {firstName}
              </InlineEdit>
            </span>
            <span
              className="italic font-light transition-all duration-700 hover:tracking-wide"
              style={{ fontFamily: "'Instrument Serif', serif", color: tokens.colors.primary }}
            >
              <InlineEdit
                isOwner={isOwner}
                id="noir-last-name"
                value={lastName}
                onSave={(v) => handleLiveUpdate?.({ lastName: v })}
              >
                {lastName}
              </InlineEdit>
              <span style={{ color: tokens.colors.accent }}>.</span>
            </span>
          </h1>
        </motion.div>

        {/* Scroll To Focus Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span
            className="text-[9px] tracking-[0.25em] uppercase font-bold opacity-60"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          >
            Scroll to focus
          </span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2"
              style={{ backgroundColor: tokens.colors.accent }}
            />
          </div>
        </div>
      </div>

      {/* Minimal Footer Info */}
      <footer className="relative z-20 w-full px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t" style={{ borderColor: tokens.colors.border }}>
        <div className="flex items-center gap-6">
          {user?.socialLinks?.github && (
            <a
              href={user.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-widest uppercase font-bold opacity-60 hover:opacity-100 transition-opacity"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              data-cursor="hover"
            >
              GitHub
            </a>
          )}
          {user?.socialLinks?.linkedin && (
            <a
              href={user.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-widest uppercase font-bold opacity-60 hover:opacity-100 transition-opacity"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              data-cursor="hover"
            >
              LinkedIn
            </a>
          )}
          {user?.socialLinks?.twitter && (
            <a
              href={user.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-widest uppercase font-bold opacity-60 hover:opacity-100 transition-opacity"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              data-cursor="hover"
            >
              Twitter
            </a>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-8">
          {["work", "about", "contact"].map((sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              className="text-[9px] tracking-widest uppercase font-bold opacity-60 hover:opacity-100 transition-opacity"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              data-cursor="hover"
            >
              {sec}
            </button>
          ))}
        </div>
      </footer>
    </section>
  );
};

export default Hero;
