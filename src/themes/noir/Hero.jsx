import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

/**
 * NOIR — Hero Section
 * Uses sticky scroll pinning (h-[340vh] outer, sticky inner) to create
 * the exact "Scroll to Focus" convergence animation from the reference design.
 * As user scrolls, scattered images converge toward center while the name scales up.
 */
const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const containerRef = useRef(null);
  const [time, setTime] = useState("");

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

  // Use the outer tall container as scroll target.
  // offset "start start" to "end end" means progress goes 0→1 as we scroll
  // through the entire 340vh section.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Scattered images: start spread, converge to center on scroll ──
  // Image 1 (top-left): moves right + down toward center
  const img1X = useTransform(scrollYProgress, [0, 0.7], [0, 320]);
  const img1Y = useTransform(scrollYProgress, [0, 0.7], [0, 220]);
  const img1Rotate = useTransform(scrollYProgress, [0, 0.7], [-10, 0]);
  const img1Scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.6]);
  const img1Opacity = useTransform(scrollYProgress, [0, 0.5, 0.75], [1, 0.8, 0]);

  // Image 2 (top-right): moves left + down toward center
  const img2X = useTransform(scrollYProgress, [0, 0.7], [0, -280]);
  const img2Y = useTransform(scrollYProgress, [0, 0.7], [0, 260]);
  const img2Rotate = useTransform(scrollYProgress, [0, 0.7], [12, 0]);
  const img2Scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.55]);
  const img2Opacity = useTransform(scrollYProgress, [0, 0.5, 0.75], [1, 0.8, 0]);

  // Image 3 (bottom-left): moves right + up toward center
  const img3X = useTransform(scrollYProgress, [0, 0.7], [0, 260]);
  const img3Y = useTransform(scrollYProgress, [0, 0.7], [0, -180]);
  const img3Rotate = useTransform(scrollYProgress, [0, 0.7], [-14, 0]);
  const img3Scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.6]);
  const img3Opacity = useTransform(scrollYProgress, [0, 0.5, 0.75], [1, 0.8, 0]);

  // Image 4 (bottom-right): moves left + up toward center
  const img4X = useTransform(scrollYProgress, [0, 0.7], [0, -220]);
  const img4Y = useTransform(scrollYProgress, [0, 0.7], [0, -200]);
  const img4Rotate = useTransform(scrollYProgress, [0, 0.7], [8, 0]);
  const img4Scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.55]);
  const img4Opacity = useTransform(scrollYProgress, [0, 0.5, 0.75], [1, 0.8, 0]);

  // ── Title: scales UP as images converge ──
  const nameScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.15]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.1, 0.75, 1], [0.9, 1, 1, 0]);

  // ── Bio text fades out on scroll ──
  const bioOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const bioY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);

  // ── Scroll indicator fades ──
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const profileImage = user?.profileImage;
  const locationName = user?.location || "Karachi, Pakistan";
  const cityName = locationName.split(",")[0].trim();
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const bio = user?.bio || "Full stack developer, turning ideas into fast, considered products.";

  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const fallbackImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";
  const imgSrc = profileImage || fallbackImg;

  return (
    // Outer container: tall (340vh) so scroll space exists
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

      {/* ── Sticky inner: stays pinned to viewport while outer scrolls ── */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

        {/* Red aurora glow (right corner, like reference) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(80% 60% at 80% 10%, rgba(255,46,12,0.22), transparent 60%), ${tokens.colors.bg}`,
          }}
          aria-hidden="true"
        />

        {/* Film Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
          aria-hidden="true"
        />

        {/* ── Scattered photos (absolutely positioned, parallax via motion) ── */}
        <div className="absolute inset-0 z-10 pointer-events-none select-none">
          {/* Image 1 — Top Left */}
          <motion.div
            style={{
              x: img1X, y: img1Y, rotate: img1Rotate, scale: img1Scale, opacity: img1Opacity,
              position: "absolute", left: "8%", top: "10%",
              width: "clamp(130px, 16vw, 230px)",
              aspectRatio: "4/5",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: tokens.colors.cardBg,
              borderColor: "rgba(255,255,255,0.08)",
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
          </motion.div>

          {/* Image 2 — Top Right */}
          <motion.div
            style={{
              x: img2X, y: img2Y, rotate: img2Rotate, scale: img2Scale, opacity: img2Opacity,
              position: "absolute", right: "10%", top: "6%",
              width: "clamp(150px, 18vw, 260px)",
              aspectRatio: "4/3",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: tokens.colors.cardBg,
              borderColor: "rgba(255,255,255,0.08)",
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
          </motion.div>

          {/* Image 3 — Bottom Left */}
          <motion.div
            style={{
              x: img3X, y: img3Y, rotate: img3Rotate, scale: img3Scale, opacity: img3Opacity,
              position: "absolute", left: "10%", bottom: "14%",
              width: "clamp(120px, 14vw, 200px)",
              aspectRatio: "1/1",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: tokens.colors.cardBg,
              borderColor: "rgba(255,255,255,0.08)",
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
          </motion.div>

          {/* Image 4 — Bottom Right */}
          <motion.div
            style={{
              x: img4X, y: img4Y, rotate: img4Rotate, scale: img4Scale, opacity: img4Opacity,
              position: "absolute", right: "14%", bottom: "16%",
              width: "clamp(130px, 15vw, 220px)",
              aspectRatio: "4/5",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: tokens.colors.cardBg,
              borderColor: "rgba(255,255,255,0.08)",
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <img src={imgSrc} alt="" className="w-full h-full object-cover grayscale" />
          </motion.div>
        </div>

        {/* ── Top Header ── */}
        <header
          className="relative z-50 w-full px-6 md:px-12 py-7 flex items-center justify-between"
          style={{ mixBlendMode: "difference" }}
        >
          <div className="flex items-center gap-2" data-cursor="hover">
            <span
              className="text-lg font-bold tracking-tighter"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#fff" }}
            >
              {firstName?.charAt?.(0) || ""}{lastName?.charAt?.(0) || ""}
            </span>
            <span
              className="text-[10px] tracking-widest opacity-60 uppercase font-medium hidden sm:inline"
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
                data-cursor="hover"
              >
                {sec}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
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

        {/* ── Bio text (top area, fades out on scroll) ── */}
        <motion.div
          style={{ opacity: bioOpacity, y: bioY }}
          className="relative z-20 w-full px-6 md:px-12 mt-4 md:mt-2"
        >
          <div className="max-w-[1500px] mx-auto">
            <InlineEdit
              isOwner={isOwner}
              id="noir-hero-bio"
              value={bio}
              type="textarea"
              onSave={(v) => handleLiveUpdate?.({ bio: v })}
            >
              <p
                className="max-w-md text-base md:text-lg leading-snug"
                style={{ color: "rgba(240,240,240,0.85)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {bio}
              </p>
            </InlineEdit>
          </div>
        </motion.div>

        {/* ── Central Name (scales up on scroll as images converge) ── */}
        <div className="relative z-20 flex flex-1 items-center justify-center">
          <motion.h1
            style={{ scale: nameScale, opacity: nameOpacity }}
            className="select-none flex flex-wrap items-baseline justify-center gap-[0.2em] whitespace-nowrap"
            style={{
              scale: nameScale,
              opacity: nameOpacity,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(3rem, 9vw, 10rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
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
                {firstName || "Your"}
              </span>
            </InlineEdit>
            <InlineEdit
              isOwner={isOwner}
              id="noir-last-name"
              value={lastName}
              onSave={(v) => handleLiveUpdate?.({ lastName: v })}
            >
              <span
                className="font-normal italic inline-block will-change-transform"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {lastName || "Name"}
                <span style={{ color: tokens.colors.accent }}>.</span>
              </span>
            </InlineEdit>
          </motion.h1>
        </div>

        {/* ── Bottom footer row ── */}
        <div className="relative z-20 w-full px-6 md:px-12 mb-8">
          <div className="max-w-[1500px] mx-auto">
            <div className="mb-4 h-px w-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span style={{ color: tokens.colors.accent }}>→</span>
                <span
                  className="text-[10px] uppercase font-bold tracking-widest"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
                >
                  V1.0
                </span>
              </div>

              <div className="flex items-center gap-5 md:gap-8">
                {user?.socialLinks?.github && (
                  <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] uppercase font-bold tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }} data-cursor="hover">
                    GitHub
                  </a>
                )}
                {user?.socialLinks?.linkedin && (
                  <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] uppercase font-bold tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }} data-cursor="hover">
                    LinkedIn
                  </a>
                )}
                {user?.socialLinks?.twitter && (
                  <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] uppercase font-bold tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }} data-cursor="hover">
                    Twitter
                  </a>
                )}
              </div>

              <nav className="hidden md:flex items-center gap-5 md:gap-8">
                {["work", "about", "contact"].map((sec) => (
                  <button key={sec} onClick={() => scrollToSection(sec)}
                    className="text-[10px] uppercase font-bold tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }} data-cursor="hover">
                    {sec}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* ── Scroll to focus indicator ── */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-28 inset-x-0 z-20 flex justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-[9px] uppercase tracking-[0.25em] font-bold"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
            >
              Scroll to focus
            </span>
            <div className="h-10 w-px overflow-hidden" style={{ background: "linear-gradient(to bottom, rgba(240,240,240,0.3), transparent)" }}>
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-full h-1/2"
                style={{ backgroundColor: tokens.colors.accent }}
              />
            </div>
          </div>
        </motion.div>

      </div>{/* end sticky */}
    </section>
  );
};

export default Hero;
