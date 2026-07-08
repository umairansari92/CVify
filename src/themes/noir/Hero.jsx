import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

/**
 * NOIR — Hero Section (Flagship Redesign)
 * 
 * Features:
 * - Viewport-aligned sticky pinning (h-[340vh] scroll canvas).
 * - Asymmetric premium text layout (value prop, bio, CTAs).
 * - Floating Recruiter Insights HUD Glass Dock at the bottom.
 * - Scattered portfolio photos converging and fading on scroll.
 * - Satoshi & Instrument Serif dynamic typography.
 */
const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal, analytics }) => {
  const containerRef = useRef(null);
  const [time, setTime] = useState("");

  // Recruiter analytics metrics
  const viewsCount = analytics?.views || 0;
  const signalsCount = (analytics?.contactClicks || 0) + (analytics?.resumeDownloads || 0);
  const availabilityText = user?.availability || "Available for Opportunities";

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setTime(formatter.format(new Date()));
      } catch {
        const now = new Date();
        setTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Scattered images scroll convergence calculations (Phase 1) ──
  const img1X = useTransform(scrollYProgress, [0, 0.75], [0, 340]);
  const img1Y = useTransform(scrollYProgress, [0, 0.75], [0, 240]);
  const img1Rotate = useTransform(scrollYProgress, [0, 0.75], [-12, 4]);
  const img1Scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.5]);
  const img1Opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.8, 0]);

  const img2X = useTransform(scrollYProgress, [0, 0.75], [0, -320]);
  const img2Y = useTransform(scrollYProgress, [0, 0.75], [0, 280]);
  const img2Rotate = useTransform(scrollYProgress, [0, 0.75], [14, -2]);
  const img2Scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.45]);
  const img2Opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.8, 0]);

  const img3X = useTransform(scrollYProgress, [0, 0.75], [0, 280]);
  const img3Y = useTransform(scrollYProgress, [0, 0.75], [0, -200]);
  const img3Rotate = useTransform(scrollYProgress, [0, 0.75], [-16, -6]);
  const img3Scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.5]);
  const img3Opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.8, 0]);

  const img4X = useTransform(scrollYProgress, [0, 0.75], [0, -260]);
  const img4Y = useTransform(scrollYProgress, [0, 0.75], [0, -220]);
  const img4Rotate = useTransform(scrollYProgress, [0, 0.75], [10, 18]);
  const img4Scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.45]);
  const img4Opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.8, 0]);

  // ── Text & HUD components transitions on scroll ──
  const nameScale = useTransform(scrollYProgress, [0, 0.75], [1, 1.15]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 1], [0.9, 1, 1, 0]);

  const leftPanelOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const leftPanelY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const hudOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const profileImage = user?.profileImage;
  const locationName = user?.location || "Karachi, Pakistan";
  const cityName = locationName.split(",")[0].trim();
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const bio = user?.bio || "Full stack developer, turning ideas into fast, considered products.";
  const valueProp = user?.branding?.valueProposition || "CREATIVE CODE & PROFESSIONAL ENGINEERING";

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const fallbackImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";
  const imgSrc = profileImage || fallbackImg;

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative"
      style={{ height: "340vh", backgroundColor: tokens.colors.bg }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Sticky viewport content container */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        
        {/* Red aura spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(80% 60% at 85% 15%, rgba(255,46,12,0.18), transparent 55%), ${tokens.colors.bg}`,
          }}
          aria-hidden="true"
        />

        {/* Film grain noise overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025] z-[2]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
          aria-hidden="true"
        />

        {/* ── Background Converging Photos ── */}
        <div className="absolute inset-0 z-10 pointer-events-none select-none">
          {/* Photo 1 — Top Left */}
          <motion.div
            style={{
              x: img1X, y: img1Y, rotate: img1Rotate, scale: img1Scale, opacity: img1Opacity,
              position: "absolute", left: "6%", top: "12%",
              width: "clamp(120px, 14vw, 210px)",
              aspectRatio: "4/5",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: tokens.colors.cardBg,
              borderColor: tokens.colors.border,
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
            }}
          >
            <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
          </motion.div>

          {/* Photo 2 — Top Right */}
          <motion.div
            style={{
              x: img2X, y: img2Y, rotate: img2Rotate, scale: img2Scale, opacity: img2Opacity,
              position: "absolute", right: "8%", top: "8%",
              width: "clamp(140px, 16vw, 240px)",
              aspectRatio: "4/3",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: tokens.colors.cardBg,
              borderColor: tokens.colors.border,
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
            }}
          >
            <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
          </motion.div>

          {/* Photo 3 — Bottom Left */}
          <motion.div
            style={{
              x: img3X, y: img3Y, rotate: img3Rotate, scale: img3Scale, opacity: img3Opacity,
              position: "absolute", left: "8%", bottom: "16%",
              width: "clamp(110px, 12vw, 180px)",
              aspectRatio: "1/1",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: tokens.colors.cardBg,
              borderColor: tokens.colors.border,
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
            }}
          >
            <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
          </motion.div>

          {/* Photo 4 — Bottom Right */}
          <motion.div
            style={{
              x: img4X, y: img4Y, rotate: img4Rotate, scale: img4Scale, opacity: img4Opacity,
              position: "absolute", right: "12%", bottom: "18%",
              width: "clamp(120px, 13vw, 200px)",
              aspectRatio: "4/5",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: tokens.colors.cardBg,
              borderColor: tokens.colors.border,
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
            }}
          >
            <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
          </motion.div>
        </div>

        {/* ── Top Header Navigation ── */}
        <header className="relative z-50 w-full px-6 md:px-12 py-7 flex items-center justify-between mix-blend-difference">
          <div className="flex items-center gap-3">
            <span
              className="text-lg font-black tracking-tighter"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#fff" }}
            >
              {firstName?.charAt?.(0) || ""}{lastName?.charAt?.(0) || ""}
            </span>
            <span
              className="text-[10px] tracking-widest opacity-50 uppercase font-bold hidden sm:inline"
              style={{ fontFamily: tokens.fonts.mono, color: "#fff" }}
            >
              {firstName} {lastName}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {["about", "skills", "work", "contact"].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="text-[10px] tracking-[0.2em] uppercase font-bold opacity-60 hover:opacity-100 transition-opacity"
                style={{ fontFamily: tokens.fonts.mono, color: "#fff" }}
              >
                {sec}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: tokens.colors.accent }}
            />
            <span
              className="text-[10px] tracking-widest uppercase font-bold"
              style={{ fontFamily: tokens.fonts.mono, color: "#fff" }}
            >
              {cityName} {time}
            </span>
          </div>
        </header>

        {/* ── Main Viewport Content ── */}
        <div className="relative z-20 flex-1 flex flex-col justify-center px-6 md:px-12 max-w-[1400px] w-full mx-auto pb-12">
          
          {/* Asymmetric Left Panel: Value Prop, Bio & CTA Group */}
          <motion.div
            style={{ opacity: leftPanelOpacity, y: leftPanelY }}
            className="flex flex-col items-start gap-8 w-full max-w-xl md:ml-[10%]"
          >
            {/* Value Proposition Statement */}
            <div className="space-y-1">
              <span
                className="text-[10px] font-black uppercase tracking-[0.3em]"
                style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}
              >
                // SYSTEM PROFILE
              </span>
              <h3
                className="text-lg md:text-xl font-bold tracking-widest uppercase leading-snug"
                style={{ color: tokens.colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <InlineEdit
                  isOwner={isOwner}
                  id="noir-value-prop"
                  value={valueProp}
                  onSave={(v) => handleLiveUpdate?.({ "branding.valueProposition": v })}
                >
                  {valueProp}
                </InlineEdit>
              </h3>
            </div>

            {/* Objective Summary */}
            <InlineEdit
              isOwner={isOwner}
              id="noir-hero-bio"
              value={bio}
              type="textarea"
              onSave={(v) => handleLiveUpdate?.({ bio: v })}
            >
              <p
                className="text-sm md:text-base leading-relaxed opacity-75 font-medium"
                style={{ color: tokens.colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {bio}
              </p>
            </InlineEdit>

            {/* Premium CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection("showcase")}
                className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 border"
                style={{ borderColor: tokens.colors.accent, backgroundColor: tokens.colors.accent }}
              >
                <span
                  className="absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ backgroundColor: tokens.colors.bg }}
                />
                <span
                  className="relative z-10 text-[9px] font-bold uppercase tracking-widest group-hover:text-white"
                  style={{ fontFamily: tokens.fonts.mono, color: "#fff" }}
                >
                  View Work
                </span>
              </button>

              <button
                onClick={() => setShowResumeModal?.(true)}
                className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 border"
                style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <span
                  className="absolute inset-0 w-full h-full -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ backgroundColor: tokens.colors.primary }}
                />
                <span
                  className="relative z-10 text-[9px] font-bold uppercase tracking-widest transition-colors duration-500 group-hover:text-black"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
                >
                  Get Resume
                </span>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="group px-8 py-4 rounded-full border transition-all duration-300 hover:scale-105 hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "transparent" }}
              >
                <span
                  className="text-[9px] font-bold uppercase tracking-widest"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
                >
                  Contact Info
                </span>
              </button>
            </div>
          </motion.div>

          {/* Central Large Typographic Name */}
          <div className="relative z-20 flex flex-1 items-end justify-center pb-8">
            <motion.h1
              style={{ scale: nameScale, opacity: nameOpacity }}
              className="select-none flex flex-wrap items-baseline justify-center gap-[0.2em] whitespace-nowrap"
              style={{
                scale: nameScale,
                opacity: nameOpacity,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(3rem, 9.5vw, 10rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: tokens.colors.primary,
              }}
            >
              <InlineEdit
                isOwner={isOwner}
                id="noir-first-name"
                value={firstName}
                onSave={(v) => handleLiveUpdate?.({ firstName: v })}
              >
                <span className="font-extrabold inline-block will-change-transform">
                  {firstName || "Mostafa"}
                </span>
              </InlineEdit>
              <InlineEdit
                isOwner={isOwner}
                id="noir-last-name"
                value={lastName}
                onSave={(v) => handleLiveUpdate?.({ lastName: v })}
              >
                <span
                  className="font-light italic inline-block will-change-transform"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {lastName || "Oulahyan"}
                  <span style={{ color: tokens.colors.accent }}>.</span>
                </span>
              </InlineEdit>
            </motion.h1>
          </div>

          {/* ── Recruiter Insights HUD Glass Dock ── */}
          <motion.div
            style={{ opacity: hudOpacity }}
            className="w-full max-w-3xl mx-auto z-30 mt-4 px-4 hidden sm:block"
          >
            <div
              className="backdrop-blur-md border rounded-[2rem] p-4 flex items-center justify-between gap-8 transition-shadow hover:shadow-[0_0_30px_rgba(255,46,12,0.1)]"
              style={{
                backgroundColor: tokens.colors.cardBg,
                borderColor: tokens.colors.border,
                color: tokens.colors.primary,
              }}
            >
              <div className="flex items-center gap-2.5 px-4 border-r" style={{ borderColor: tokens.colors.border }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span
                  className="text-[8px] font-black uppercase tracking-widest opacity-60"
                  style={{ fontFamily: tokens.fonts.mono }}
                >
                  Recruiter Insight HUD
                </span>
              </div>
              <div className="flex-1 flex justify-around px-4">
                <div className="text-center">
                  <p className="text-sm font-bold" style={{ color: tokens.colors.primary }}>
                    {viewsCount}
                  </p>
                  <p
                    className="text-[7px] font-bold uppercase tracking-widest opacity-40 mt-0.5"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
                  >
                    Engagement Views
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold" style={{ color: tokens.colors.primary }}>
                    {signalsCount}
                  </p>
                  <p
                    className="text-[7px] font-bold uppercase tracking-widest opacity-40 mt-0.5"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
                  >
                    Outreach Signals
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold" style={{ color: tokens.colors.primary }}>
                    <InlineEdit
                      isOwner={isOwner}
                      id="noir-availability"
                      value={availabilityText}
                      onSave={(v) => handleLiveUpdate?.({ availability: v })}
                    >
                      <span>{availabilityText}</span>
                    </InlineEdit>
                  </div>
                  <p
                    className="text-[7px] font-bold uppercase tracking-widest opacity-40 mt-0.5"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
                  >
                    Hiring Availability Status
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Floating Scroll Indicator ── */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        >
          <span
            className="text-[8px] uppercase tracking-[0.25em] font-bold opacity-50"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
          >
            Scroll to focus
          </span>
          <div
            className="h-10 w-px relative overflow-hidden"
            style={{ background: "linear-gradient(to bottom, rgba(240,240,240,0.3), transparent)" }}
          >
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="absolute left-0 top-0 w-full h-1/2"
              style={{ backgroundColor: tokens.colors.accent }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
