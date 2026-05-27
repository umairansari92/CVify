import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";
import { sectionReveal, staggerContainer, staggerChild } from "./animations";

/**
 * ORIENTAL LUXE — Hero Section
 * ──────────────────────────────
 * COMPLETELY different from default CVify hero:
 * - Full viewport centered title (no split grid)
 * - NO profile image in hero (image moves to About)
 * - Uppercase mega-title with text glow
 * - Typed subtitle with caret blink
 * - Two pill-shaped CTA buttons
 * - Scroll-down arrow at bottom
 */
const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const headline = user?.headline || "";
  const tagline = user?.bio?.substring(0, 120) || "Bridging professional excellence with cutting-edge technology";

  // Build typing sequence from headline + slogans
  const slogans = user?.heroSlogans || [];
  const typeSequence = [];
  if (headline) { typeSequence.push(headline, 2500); }
  slogans.forEach((s) => {
    const text = typeof s === "string" ? s : s?.text;
    if (text) typeSequence.push(text, 2000);
  });
  if (typeSequence.length === 0) typeSequence.push("Professional Portfolio", 3000);

  return (
    <section
      id="hero-ol"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-32"
      style={{ fontFamily: tokens.fonts.primary }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-5xl text-center"
      >
        {/* Eyebrow / Tagline */}
        <motion.p
          variants={staggerChild}
          className="mb-5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em]"
          style={{ color: tokens.colors.textMuted }}
        >
          EXECUTION OVER WORDS
        </motion.p>

        {/* Giant Name */}
        <motion.h1
          variants={staggerChild}
          className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] font-extrabold leading-[0.95] tracking-tight uppercase"
          style={{
            color: tokens.colors.textPrimary,
            textShadow: tokens.shadows.hero,
          }}
        >
          <InlineEdit
            isOwner={isOwner}
            id="ol-hero-name"
            value={fullName}
            onSave={(v) => {
              const parts = v.split(" ");
              handleLiveUpdate({ firstName: parts[0], lastName: parts.slice(1).join(" ") });
            }}
          >
            {fullName || "YOUR NAME"}
          </InlineEdit>
        </motion.h1>

        {/* Typed Subtitle */}
        <motion.div
          variants={staggerChild}
          className="mt-6 flex h-10 items-center justify-center text-xl sm:text-2xl font-medium"
          style={{ color: tokens.colors.accent }}
        >
          <InlineEdit
            isOwner={isOwner}
            id="ol-hero-headline"
            value={headline}
            onSave={(v) => handleLiveUpdate({ headline: v })}
          >
            <TypeAnimation
              sequence={typeSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={false}
            />
          </InlineEdit>
          <span
            className="ml-1 inline-block h-6 w-[2px] sm:h-7 animate-pulse"
            style={{ backgroundColor: tokens.colors.accent }}
          />
        </motion.div>

        {/* Short Description */}
        <motion.p
          variants={staggerChild}
          className="mx-auto mt-6 max-w-2xl text-sm sm:text-base leading-relaxed"
          style={{ color: tokens.colors.textSecondary }}
        >
          {tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={staggerChild}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => document.getElementById("showcase-ol")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: tokens.colors.accent,
              boxShadow: `0 0 30px ${tokens.colors.accentGlow}`,
            }}
          >
            View Projects
          </button>
          <button
            onClick={() => setShowResumeModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105"
            style={{
              borderColor: `${tokens.colors.accent}99`,
              color: tokens.colors.accent,
              background: "transparent",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${tokens.colors.accent}15`; e.currentTarget.style.borderColor = tokens.colors.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = `${tokens.colors.accent}99`; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
            Download CV
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Down Arrow */}
      <motion.a
        href="#about-ol"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={(e) => { e.preventDefault(); document.getElementById("about-ol")?.scrollIntoView({ behavior: "smooth" }); }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce"
        style={{ color: tokens.colors.textMuted }}
        aria-label="Scroll to about"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
};

export default Hero;
