import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown } from "lucide-react";
import InlineEdit from "../../../components/profile/InlineEdit";
import { tokens } from "./tokens";

/**
 * APEX — Hero Section
 * ───────────────────────────────────────────────────────────────
 * Layout: Left content (name, TypeAnimation headline, bio, CTAs)
 *         Right: profile image with glow ring
 *
 * Headline TypeAnimation ALWAYS plays — InlineEdit wraps it so
 * owner can click to edit the raw comma-separated string,
 * but the animated display never breaks.
 */
const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const firstName = user?.firstName || "";
  const lastName  = user?.lastName  || "";
  const fullName  = [firstName, lastName].filter(Boolean).join(" ") || "Developer";

  // ── Build TypeAnimation sequence from headline (comma-separated) ──
  const headline = user?.headline || "Full Stack Developer, UI/UX Designer, Tech Enthusiast";
  const typeSeq  = [];
  headline.split(",").forEach((seg) => {
    const t = seg.trim();
    if (t) typeSeq.push(t, 2200);
  });
  if (typeSeq.length === 0) typeSeq.push("Developer", 2200);

  const profileImg = user?.profileImage
    || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`;
  const resumeUrl  = user?.branding?.resumeUrl || user?.resumeUrl || null;
  const bio        = user?.bio || "";

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden"
      style={{ backgroundColor: tokens.colors.bg }}
    >
      {/* ── Radial background glow ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 70% 50%, ${tokens.colors.accent}0a, transparent 65%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">

        {/* ── Left: Text content ── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7 space-y-6 text-left order-2 md:order-1"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-black uppercase tracking-[0.3em]"
            style={{ color: tokens.colors.accent }}
          >
            Welcome to my portfolio
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight"
            style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
          >
            Hi, I'm{" "}
            <InlineEdit
              isOwner={isOwner}
              id="hero-name"
              value={fullName}
              onSave={(v) => {
                const parts = v.trim().split(" ");
                handleLiveUpdate?.({ firstName: parts[0] || "", lastName: parts.slice(1).join(" ") || "" });
              }}
              className="inline"
            >
              <span style={{ color: tokens.colors.accent }}>{fullName}</span>
            </InlineEdit>
          </motion.h1>

          {/* Headline: TypeAnimation ALWAYS plays — InlineEdit wraps it for owner editing */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold min-h-[36px]"
            style={{ color: tokens.colors.primary }}
          >
            <span style={{ color: tokens.colors.secondary }}>I am a</span>

            {/* InlineEdit wraps the animation — click to edit the raw string, animation still plays */}
            <InlineEdit
              isOwner={isOwner}
              id="hero-headline"
              value={headline}
              onSave={(v) => handleLiveUpdate?.({ headline: v })}
              className="inline-flex items-center"
            >
              <TypeAnimation
                key={headline}           /* re-mount if headline changes */
                sequence={typeSeq}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={false}
                style={{ color: tokens.colors.accent }}
              />
              {/* Blinking cursor */}
              <span
                className="ml-0.5 inline-block w-[2px] h-6 animate-pulse"
                style={{ backgroundColor: tokens.colors.accent }}
              />
            </InlineEdit>
          </motion.div>

          {/* Bio */}
          {(bio || isOwner) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <InlineEdit
                isOwner={isOwner}
                id="hero-bio"
                value={bio}
                type="textarea"
                multiline={true}
                onSave={(v) => handleLiveUpdate?.({ bio: v })}
              >
                <p
                  className="text-base sm:text-lg leading-relaxed max-w-xl"
                  style={{ color: tokens.colors.secondary }}
                >
                  {bio || "I am a passionate developer focused on building responsive, user-friendly, and modern web applications."}
                </p>
              </InlineEdit>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
              className="px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-black"
              style={{
                backgroundColor: tokens.colors.accent,
                boxShadow: `0 8px 24px ${tokens.colors.accent}40`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 32px ${tokens.colors.accent}60`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 8px 24px ${tokens.colors.accent}40`; }}
            >
              Explore
            </a>

            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 border hover:bg-white/5 transform hover:-translate-y-1"
                style={{
                  borderColor: `${tokens.colors.accent}60`,
                  color: tokens.colors.accent,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = tokens.colors.accent; e.currentTarget.style.backgroundColor = `${tokens.colors.accent}10`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${tokens.colors.accent}60`; e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                Download CV
              </a>
            ) : (
              <button
                onClick={() => setShowResumeModal?.(true)}
                className="px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 border hover:bg-white/5 transform hover:-translate-y-1"
                style={{
                  borderColor: `${tokens.colors.accent}60`,
                  color: tokens.colors.accent,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = tokens.colors.accent; e.currentTarget.style.backgroundColor = `${tokens.colors.accent}10`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${tokens.colors.accent}60`; e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                Download CV
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* ── Right: Profile Image ── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 flex justify-center order-1 md:order-2"
        >
          <div className="relative group">
            {/* Outer glow ring */}
            <div
              className="absolute -inset-2 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition duration-700"
              style={{ background: `radial-gradient(circle, ${tokens.colors.accent} 0%, transparent 70%)` }}
            />
            {/* Rotating dashed ring */}
            <div
              className="absolute -inset-4 rounded-full border-2 border-dashed opacity-20 animate-spin"
              style={{
                borderColor: tokens.colors.accent,
                animationDuration: "18s",
              }}
            />
            <img
              src={profileImg}
              alt={fullName}
              className="relative w-56 h-56 sm:w-72 sm:h-72 object-cover rounded-full border-4 shadow-2xl transition-transform duration-500 group-hover:scale-105 z-10"
              style={{
                borderColor: tokens.colors.accent,
                filter: `drop-shadow(0 12px 28px ${tokens.colors.accent}50)`,
              }}
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`;
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll down arrow ── */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10"
        style={{ color: `${tokens.colors.accent}80` }}
        aria-label="Scroll to about section"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
};

export default Hero;
