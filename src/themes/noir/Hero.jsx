import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

/**
 * NOIR — Hero Section
 * Full-viewport hero with letter-by-letter name reveal,
 * TypeAnimation headline, availability badge, and social links.
 */
const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "";
  const headline = user?.headline || "";
  const bio = user?.bio || "";
  const location = user?.location || "";
  const isOpenToWork = user?.openToWork ?? true;
  const profileImage = user?.profileImage;

  // Build type sequence from headline (comma-separated roles)
  const typeSequence = [];
  if (headline) {
    headline.split(",").forEach((s) => {
      const trimmed = s.trim();
      if (trimmed) typeSequence.push(trimmed, 2000);
    });
  }
  if (typeSequence.length === 0) typeSequence.push("Professional Portfolio", 3000);

  // Letter reveal animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: tokens.motion.easing.base, duration: tokens.motion.duration.fast },
    },
  };

  const AnimatedText = ({ text }) => (
    <motion.span
      className="inline-block"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: tokens.colors.bg }}
    >
      {/* 10% Aurora Effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${tokens.colors.aiGlow}, transparent 50%),
                       radial-gradient(circle at 20% 80%, rgba(255,255,255,0.02), transparent 50%)`,
        }}
      />
      {/* Film Grain */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-36 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT — Text Content */}
        <div className="flex flex-col items-start">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
            className="flex items-center gap-3 mb-10 px-4 py-2 rounded-full border"
            style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg }}
          >
            <div className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: isOpenToWork ? tokens.colors.accent : tokens.colors.secondary }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: isOpenToWork ? tokens.colors.accent : tokens.colors.secondary }}
              />
            </div>
            <span
              className="uppercase text-[10px] font-bold tracking-widest"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
            >
              {isOpenToWork ? "Available for opportunities" : "Not available"}
              {location && ` — ${location}`}
            </span>
          </motion.div>

          {/* Hero Name */}
          <h1
            className="text-6xl md:text-8xl lg:text-[9rem] font-medium leading-[0.9] tracking-tighter mb-8 cursor-default group"
            style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
          >
            <InlineEdit
              isOwner={isOwner}
              id="noir-hero-name"
              value={fullName}
              onSave={(v) => {
                const parts = v.trim().split(" ");
                handleLiveUpdate?.({ firstName: parts[0] || "", lastName: parts.slice(1).join(" ") || "" });
              }}
            >
              <AnimatedText text={user?.firstName || "Your"} />
              <br />
              <span className="transition-all duration-700 group-hover:italic" style={{ color: tokens.colors.primary }}>
                <AnimatedText text={user?.lastName || "Name"} />
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="ml-2 inline-block"
                style={{ color: tokens.colors.accent }}
              >
                .
              </motion.span>
            </InlineEdit>
          </h1>

          {/* TypeAnimation Headline */}
          {typeSequence.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: tokens.motion.duration.normal }}
              className="mb-6 flex items-center gap-2"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
            >
              <span className="text-[10px] uppercase tracking-widest opacity-50">→</span>
              <InlineEdit
                isOwner={isOwner}
                id="noir-hero-headline"
                value={headline}
                onSave={(v) => handleLiveUpdate?.({ headline: v })}
              >
                <span className="text-sm md:text-base font-medium" style={{ color: tokens.colors.primary }}>
                  <TypeAnimation
                    sequence={typeSequence}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    cursor={false}
                  />
                  <span
                    className="ml-0.5 inline-block h-4 w-px animate-pulse align-middle"
                    style={{ backgroundColor: tokens.colors.accent }}
                  />
                </span>
              </InlineEdit>
            </motion.div>
          )}

          {/* Bio */}
          {(bio || isOwner) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: tokens.motion.duration.normal }}
              className="max-w-md mb-10"
            >
              <InlineEdit
                isOwner={isOwner}
                id="noir-hero-bio"
                value={bio}
                type="textarea"
                onSave={(v) => handleLiveUpdate?.({ bio: v })}
              >
                <p className="text-sm md:text-base leading-relaxed" style={{ color: tokens.colors.secondary }}>
                  {bio || <span className="opacity-40 italic">Add your bio…</span>}
                </p>
              </InlineEdit>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: tokens.motion.duration.normal }}
            className="flex flex-wrap gap-4"
          >
            {setShowResumeModal && (
              <button
                onClick={() => setShowResumeModal(true)}
                className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-80"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: tokens.colors.bg,
                  fontFamily: tokens.fonts.mono,
                }}
                data-cursor="hover"
              >
                View Resume
              </button>
            )}
            <button
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              style={{
                borderColor: tokens.colors.border,
                color: tokens.colors.secondary,
                fontFamily: tokens.fonts.mono,
                "--primary": tokens.colors.primary,
              }}
              data-cursor="hover"
            >
              View Work
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: tokens.motion.duration.slow }}
            className="mt-16 flex items-center gap-6 pt-8 border-t w-full"
            style={{ borderColor: tokens.colors.border }}
          >
            {user?.socialLinks?.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase text-[10px] font-bold tracking-widest transition-colors hover:text-[var(--primary)]"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary, "--primary": tokens.colors.primary }}
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
                className="uppercase text-[10px] font-bold tracking-widest transition-colors hover:text-[var(--primary)]"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary, "--primary": tokens.colors.primary }}
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
                className="uppercase text-[10px] font-bold tracking-widest transition-colors hover:text-[var(--primary)]"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary, "--primary": tokens.colors.primary }}
                data-cursor="hover"
              >
                Twitter
              </a>
            )}
          </motion.div>
        </div>

        {/* RIGHT — Profile Image */}
        <div className="hidden lg:flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: tokens.motion.duration.slow, delay: 0.2, ease: tokens.motion.easing.base }}
            className="relative w-full max-w-md"
          >
            <div
              className="overflow-hidden rounded aspect-[3/4] w-full"
              style={{ backgroundColor: tokens.colors.cardBg }}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={fullName}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  style={{
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                  }}
                  loading="eager"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-7xl font-medium"
                  style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.heading }}
                >
                  {(fullName?.[0] || "?").toUpperCase()}
                </div>
              )}
            </div>

            {/* Corner accents */}
            <span className="pointer-events-none absolute -left-3 -top-3 h-5 w-5 border-l border-t" style={{ borderColor: tokens.colors.borderHover }} />
            <span className="pointer-events-none absolute -right-3 -top-3 h-5 w-5 border-r border-t" style={{ borderColor: tokens.colors.borderHover }} />
            <span className="pointer-events-none absolute -bottom-3 -left-3 h-5 w-5 border-b border-l" style={{ borderColor: tokens.colors.borderHover }} />
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-5 w-5 border-b border-r" style={{ borderColor: tokens.colors.borderHover }} />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
        style={{ color: tokens.colors.secondary }}
        aria-label="Scroll down"
        data-cursor="hover"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
};

export default Hero;
