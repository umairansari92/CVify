import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

/**
 * NOIR — Hero Section
 *
 * LAYOUT BUG FIXES:
 * 1. Absolutely positions the name container in the center (z-20) to prevent overflow/clipping.
 * 2. Inlines the motion.div photo containers directly to fix Framer Motion bindings.
 * 3. Restores a high-quality portrait fallback image so that background photos always render.
 * 4. Places the Recruiter HUD dock absolutely at the bottom to prevent layout pushing.
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

  // ── Converging photos — spread → center as user scrolls ──
  const img1X       = useTransform(scrollYProgress, [0, 1], [0,  220]);
  const img1Y       = useTransform(scrollYProgress, [0, 1], [0,  160]);
  const img1Rotate  = useTransform(scrollYProgress, [0, 1], [-12, 2]);
  const img1Scale   = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const img1Opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [0.85, 0.6, 0]);

  const img2X       = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const img2Y       = useTransform(scrollYProgress, [0, 1], [0,  180]);
  const img2Rotate  = useTransform(scrollYProgress, [0, 1], [14, -2]);
  const img2Scale   = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const img2Opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [0.85, 0.6, 0]);

  const img3X       = useTransform(scrollYProgress, [0, 1], [0,  180]);
  const img3Y       = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const img3Rotate  = useTransform(scrollYProgress, [0, 1], [-16, -4]);
  const img3Scale   = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const img3Opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [0.85, 0.6, 0]);

  const img4X       = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const img4Y       = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const img4Rotate  = useTransform(scrollYProgress, [0, 1], [10, 16]);
  const img4Scale   = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const img4Opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [0.85, 0.6, 0]);

  // Name grows slightly on scroll but stays fully opaque until near-end
  const nameScale   = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  // Left panel fades out as user scrolls
  const panelOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const panelY       = useTransform(scrollYProgress, [0, 0.4], [0, -30]);

  // Scroll indicator fades fast
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const hudOpacity       = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Data
  const profileImage = user?.profileImage;
  const firstName    = user?.firstName || "";
  const lastName     = user?.lastName  || "";
  const bio          = user?.bio || "Full stack developer, turning ideas into fast, considered products.";
  const valueProp    = user?.branding?.valueProposition || "CREATIVE CODE & PROFESSIONAL ENGINEERING";
  const location     = user?.location || "";
  const cityName     = location.split(",")[0].trim();
  const viewsCount   = analytics?.views || 0;
  const signalsCount = (analytics?.contactClicks || 0) + (analytics?.resumeDownloads || 0);
  const availability = user?.availability || "Available for Opportunities";

  // Build TypeAnimation sequence from headline
  const rawHeadline  = user?.headline || "Full Stack Developer, UI Engineer, Problem Solver";
  const typeSequence = [];
  rawHeadline.split(",").forEach((s) => {
    const t = s.trim();
    if (t) { typeSequence.push(t); typeSequence.push(2000); }
  });
  if (typeSequence.length === 0) {
    typeSequence.push("Full Stack Developer", 2000);
  }

  // Profile image — high-quality portrait fallback to ensure photos always render
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
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 h-screen flex flex-col overflow-hidden"
        style={{ paddingTop: "4.5rem" /* clears universal navbar ~72px */ }}
      >
        {/* Background: red aura */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(80% 60% at 85% 10%, rgba(255,46,12,0.16), transparent 55%), ${tokens.colors.bg}`,
          }}
          aria-hidden="true"
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025] z-[1]"
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

        {/* ── Large Typographic Name (z-20) ── */}
        {/* Absolutely centered in viewport so it never overflows or collides with left panel */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.h1
            className="select-none text-center leading-none pointer-events-auto"
            style={{
              scale: nameScale,
              opacity: nameOpacity,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(2.8rem, 8.5vw, 9rem)",
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
              <span className="font-extrabold">{firstName || "Umair"}</span>
            </InlineEdit>
            {firstName && lastName ? " " : ""}
            <InlineEdit
              isOwner={isOwner}
              id="noir-last-name"
              value={lastName}
              onSave={(v) => handleLiveUpdate?.({ lastName: v })}
            >
              <span
                className="font-light italic"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {lastName || "Ahmed"}
                <span style={{ color: tokens.colors.accent }}>.</span>
              </span>
            </InlineEdit>
          </motion.h1>
        </div>

        {/* ── Left Content Panel (z-30) ── */}
        <div className="relative z-30 flex-1 flex flex-col justify-center px-6 md:px-12 max-w-[1400px] w-full mx-auto pb-16">
          {/* Top meta info row */}
          {(cityName || time) && (
            <div className="flex items-center gap-2 mb-6 pt-1">
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: tokens.colors.accent }}
              />
              <span
                className="text-[9px] tracking-widest uppercase font-bold opacity-50"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                {cityName}{cityName && time ? " · " : ""}{time}
              </span>
            </div>
          )}

          <motion.div
            style={{ opacity: panelOpacity, y: panelY }}
            className="flex flex-col gap-6 max-w-lg mt-6"
          >
            {/* Label */}
            <span
              className="text-[9px] font-black uppercase tracking-[0.3em]"
              style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}
            >
              // SYSTEM PROFILE
            </span>

            {/* Value prop */}
            <div>
              <InlineEdit
                isOwner={isOwner}
                id="noir-value-prop"
                value={valueProp}
                onSave={(v) => handleLiveUpdate?.({ "branding.valueProposition": v })}
              >
                <h2
                  className="text-base md:text-lg font-bold uppercase tracking-widest leading-snug"
                  style={{ color: tokens.colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {valueProp}
                </h2>
              </InlineEdit>
            </div>

            {/* TypeAnimation — from user.headline */}
            <div
              className="text-2xl md:text-3xl font-medium"
              style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.heading, minHeight: "2.2em" }}
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

            {/* Bio */}
            <InlineEdit
              isOwner={isOwner}
              id="noir-hero-bio"
              value={bio}
              type="textarea"
              onSave={(v) => handleLiveUpdate?.({ bio: v })}
            >
              <p
                className="text-sm leading-relaxed opacity-65 max-w-sm"
                style={{ color: tokens.colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {bio}
              </p>
            </InlineEdit>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => scrollTo("work")}
                className="group relative px-7 py-3.5 rounded-full overflow-hidden border transition-all duration-300"
                style={{ borderColor: tokens.colors.accent, backgroundColor: tokens.colors.accent }}
                data-cursor="hover"
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  style={{ backgroundColor: "#000" }}
                />
                <span
                  className="relative z-10 text-[9px] font-black uppercase tracking-widest group-hover:text-white"
                  style={{ fontFamily: tokens.fonts.mono, color: "#fff" }}
                >
                  View Work
                </span>
              </button>

              <button
                onClick={() => setShowResumeModal?.(true)}
                className="group relative px-7 py-3.5 rounded-full overflow-hidden border transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.03)" }}
                data-cursor="hover"
              >
                <span
                  className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{ backgroundColor: tokens.colors.primary }}
                />
                <span
                  className="relative z-10 text-[9px] font-black uppercase tracking-widest transition-colors duration-500 group-hover:text-black"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
                >
                  Get Resume
                </span>
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="px-7 py-3.5 rounded-full border transition-all duration-300 hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
                data-cursor="hover"
              >
                <span
                  className="text-[9px] font-black uppercase tracking-widest"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
                >
                  Contact
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Recruiter HUD Dock (z-40) ── */}
        {/* Absolutely positioned at the bottom so it never overflows */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="absolute bottom-16 left-6 right-6 md:left-12 md:right-12 z-40 hidden sm:block"
        >
          <div
            className="backdrop-blur-md border rounded-[2rem] px-6 py-3.5 flex items-center justify-between gap-6 max-w-2xl mx-auto"
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
                  <p className="text-xs font-bold" style={{ color: tokens.colors.primary }}>{availability}</p>
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
