import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

/**
 * NOIR — Centered Hero Section (Matching Image 2 Layout)
 *
 * Changes applied:
 * 1. Centered all elements (tagline, huge username, TypeAnimation, bio, buttons) in a single flex column.
 * 2. Placed everything inside one z-30 container to prevent any clipping, layout shift, or overlay bugs.
 * 3. Tagline: "EXECUTION OVER WORDS" centered at the top.
 * 4. Massive bold name: "UMAIR AHMED" centered.
 * 5. TypeAnimation centered in accent color.
 * 6. Responsive buttons centered at the bottom.
 * 7. Background: Pure black (#000000) with a subtle radial grid pattern and the red glow spotlight.
 */

const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal, analytics }) => {
  const containerRef = useRef(null);
  const [time, setTime] = useState("");

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Converging photos (z-10 background layer) ──
  const img1X       = useTransform(scrollYProgress, [0, 1], [0,  240]);
  const img1Y       = useTransform(scrollYProgress, [0, 1], [0,  180]);
  const img1Rotate  = useTransform(scrollYProgress, [0, 1], [-12, 2]);
  const img1Scale   = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const img1Opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [0.85, 0.5, 0]);

  const img2X       = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const img2Y       = useTransform(scrollYProgress, [0, 1], [0,  200]);
  const img2Rotate  = useTransform(scrollYProgress, [0, 1], [14, -2]);
  const img2Scale   = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const img2Opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [0.85, 0.5, 0]);

  const img3X       = useTransform(scrollYProgress, [0, 1], [0,  200]);
  const img3Y       = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const img3Rotate  = useTransform(scrollYProgress, [0, 1], [-16, -4]);
  const img3Scale   = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const img3Opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [0.85, 0.5, 0]);

  const img4X       = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const img4Y       = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const img4Rotate  = useTransform(scrollYProgress, [0, 1], [10, 16]);
  const img4Scale   = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const img4Opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [0.85, 0.5, 0]);

  // Center column scale and fade on scroll
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.6], [0, -30]);

  // Scroll indicator & HUD dock fade
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const hudOpacity       = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Data
  const profileImage = user?.profileImage;
  const firstName    = user?.firstName || "Umair";
  const lastName     = user?.lastName  || "Ahmed";
  const bio          = user?.bio || "Architecting the next generation of digital products as a developer.";
  const location     = user?.location || "";
  const cityName     = location.split(",")[0].trim();
  const viewsCount   = analytics?.views || 0;
  const signalsCount = (analytics?.contactClicks || 0) + (analytics?.resumeDownloads || 0);
  const availability = user?.availability || "Available for Opportunities";

  // TypeAnimation sequences
  const rawHeadline  = user?.headline || "Full Stack Developer, UI Engineer, SaaS Builder";
  const typeSequence = [];
  rawHeadline.split(",").forEach((s) => {
    const t = s.trim();
    if (t) { typeSequence.push(t); typeSequence.push(2000); }
  });
  if (typeSequence.length === 0) {
    typeSequence.push("Full Stack Developer", 2000);
  }

  const fallbackImg = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
  const imgSrc = profileImage || fallbackImg;

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative"
      style={{ height: "200vh", backgroundColor: tokens.colors.bg }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Sticky container */}
      <div
        className="sticky top-0 h-screen flex flex-col overflow-hidden"
        style={{ paddingTop: "4.5rem" }}
      >
        {/* Background 1: radial dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        {/* Background 2: red glow spotlight */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(60% 50% at 50% 45%, rgba(255,46,12,0.14), transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Film grain noise */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02] z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
          aria-hidden="true"
        />

        {/* ── Background Converging Photos (z-10) ── */}
        {imgSrc && (
          <div className="absolute inset-0 z-10 pointer-events-none select-none">
            {/* Photo 1 — Top Left */}
            <motion.div
              style={{
                x: img1X, y: img1Y, rotate: img1Rotate, scale: img1Scale, opacity: img1Opacity,
                position: "absolute", left: "6%", top: "12%",
                width: "clamp(120px, 13vw, 200px)",
                aspectRatio: "4/5",
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: tokens.colors.cardBg,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
              }}
            >
              <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
            </motion.div>

            {/* Photo 2 — Top Right */}
            <motion.div
              style={{
                x: img2X, y: img2Y, rotate: img2Rotate, scale: img2Scale, opacity: img2Opacity,
                position: "absolute", right: "8%", top: "8%",
                width: "clamp(140px, 15vw, 230px)",
                aspectRatio: "4/3",
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: tokens.colors.cardBg,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
              }}
            >
              <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
            </motion.div>

            {/* Photo 3 — Bottom Left */}
            <motion.div
              style={{
                x: img3X, y: img3Y, rotate: img3Rotate, scale: img3Scale, opacity: img3Opacity,
                position: "absolute", left: "8%", bottom: "16%",
                width: "clamp(110px, 11vw, 175px)",
                aspectRatio: "1/1",
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: tokens.colors.cardBg,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
              }}
            >
              <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
            </motion.div>

            {/* Photo 4 — Bottom Right */}
            <motion.div
              style={{
                x: img4X, y: img4Y, rotate: img4Rotate, scale: img4Scale, opacity: img4Opacity,
                position: "absolute", right: "12%", bottom: "18%",
                width: "clamp(120px, 12vw, 190px)",
                aspectRatio: "4/5",
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: tokens.colors.cardBg,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
              }}
            >
              <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
            </motion.div>
          </div>
        )}

        {/* ── Center Content Panel (z-30) ── */}
        <div className="relative z-30 flex-1 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pb-16">
          
          {/* Top meta clock */}
          {(cityName || time) && (
            <div className="flex items-center gap-2 mb-6 pointer-events-none">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: tokens.colors.accent }} />
              <span
                className="text-[9px] tracking-widest uppercase font-bold opacity-45"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                {cityName}{cityName && time ? " · " : ""}{time}
              </span>
            </div>
          )}

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="flex flex-col items-center text-center gap-5 w-full"
          >
            {/* Centered Spaced Tagline */}
            <span
              className="text-[10px] font-black uppercase tracking-[0.45em] opacity-40 mb-1"
              style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}
            >
              EXECUTION OVER WORDS
            </span>

            {/* Huge Centered Username */}
            <h1
              className="select-none font-black uppercase leading-none tracking-tight text-white text-5xl md:text-8xl flex flex-wrap justify-center gap-x-4 gap-y-2"
              style={{ fontFamily: tokens.fonts.heading }}
            >
              <InlineEdit
                isOwner={isOwner}
                id="noir-first-name"
                value={firstName}
                onSave={(v) => handleLiveUpdate?.({ firstName: v })}
              >
                <span>{firstName}</span>
              </InlineEdit>
              <InlineEdit
                isOwner={isOwner}
                id="noir-last-name"
                value={lastName}
                onSave={(v) => handleLiveUpdate?.({ lastName: v })}
              >
                <span className="font-light italic" style={{ fontFamily: "'Instrument Serif', serif", color: tokens.colors.primary }}>
                  {lastName}
                  <span style={{ color: tokens.colors.accent }}>.</span>
                </span>
              </InlineEdit>
            </h1>

            {/* Centered TypeAnimation Subtitle */}
            <div
              className="text-lg md:text-xl font-medium tracking-wide min-h-[1.8em]"
              style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.heading }}
            >
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                speed={55}
                repeat={Infinity}
                style={{ display: "inline-block" }}
              />
              <span style={{ color: tokens.colors.accent }}>_</span>
            </div>

            {/* Centered Bio */}
            <InlineEdit
              isOwner={isOwner}
              id="noir-hero-bio"
              value={bio}
              type="textarea"
              onSave={(v) => handleLiveUpdate?.({ bio: v })}
            >
              <p
                className="text-sm md:text-base leading-relaxed opacity-70 max-w-2xl mx-auto"
                style={{ color: tokens.colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {bio}
              </p>
            </InlineEdit>

            {/* Centered Premium CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => scrollTo("work")}
                className="group relative px-8 py-4 rounded-full overflow-hidden border transition-all duration-300 hover:scale-105"
                style={{ borderColor: tokens.colors.accent, backgroundColor: tokens.colors.accent }}
                data-cursor="hover"
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  style={{ backgroundColor: "#000" }}
                />
                <span
                  className="relative z-10 text-[9px] font-bold uppercase tracking-widest group-hover:text-white"
                  style={{ fontFamily: tokens.fonts.mono, color: "#fff" }}
                >
                  View Projects
                </span>
              </button>

              <button
                onClick={() => setShowResumeModal?.(true)}
                className="group relative px-8 py-4 rounded-full overflow-hidden border transition-all duration-300 hover:scale-105"
                style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "transparent" }}
                data-cursor="hover"
              >
                <span
                  className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{ backgroundColor: tokens.colors.primary }}
                />
                <span
                  className="relative z-10 text-[9px] font-bold uppercase tracking-widest transition-colors duration-500 group-hover:text-black"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
                >
                  Download CV
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Recruiter HUD Dock (z-40) ── */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="absolute bottom-16 left-6 right-6 md:left-12 md:right-12 z-40 hidden sm:block pointer-events-none"
        >
          <div
            className="backdrop-blur-md border rounded-[2rem] px-6 py-3.5 flex items-center justify-between gap-6 max-w-2xl mx-auto pointer-events-auto"
            style={{ backgroundColor: tokens.colors.cardBg, borderColor: tokens.colors.border }}
          >
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span
                className="text-[7px] font-black uppercase tracking-widest opacity-50"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                Recruiter HUD
              </span>
            </div>
            <div className="flex gap-8 flex-1 justify-around">
              {[
                { label: "Profile Views", val: viewsCount },
                { label: "Outreach Signals", val: signalsCount },
              ].map(({ label, val }) => (
                <div key={label} className="text-center">
                  <p className="text-sm font-bold" style={{ color: tokens.colors.primary }}>{val}</p>
                  <p
                    className="text-[7px] font-bold uppercase tracking-widest opacity-40 mt-0.5"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
                  >
                    {label}
                  </p>
                </div>
              ))}
              <div className="text-center">
                <InlineEdit
                  isOwner={isOwner}
                  id="noir-availability"
                  value={availability}
                  onSave={(v) => handleLiveUpdate?.({ availability: v })}
                >
                  <p className="text-xs font-bold animate-pulse" style={{ color: tokens.colors.primary }}>{availability}</p>
                </InlineEdit>
                <p
                  className="text-[7px] font-bold uppercase tracking-widest opacity-40 mt-0.5"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
                >
                  Status
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-40 pointer-events-none"
        >
          <span
            className="text-[7px] uppercase tracking-[0.25em] font-bold opacity-40"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
          >
            Scroll
          </span>
          <div
            className="h-8 w-px relative overflow-hidden"
            style={{ background: "linear-gradient(to bottom, rgba(240,240,240,0.2), transparent)" }}
          >
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
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
