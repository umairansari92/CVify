import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { tokens } from "./tokens";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { ExternalLink, MapPin, Mail, Phone, Send } from "lucide-react";
import InlineEdit from "../../components/profile/InlineEdit";

// ════════════════════════════════════════════════════════════════
//  NAVBAR  — Kaneez-style: hamburger (left) + CONTACT (right)
//            Opens a fullscreen overlay menu
// ════════════════════════════════════════════════════════════════
const AuraDarkNav = ({ setShowResumeModal }) => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "ABOUT",    id: "about-ad",   num: "01" },
    { label: "JOURNEY",  id: "experience-ad", num: "02" },
    { label: "SKILLS",   id: "skills-ad",  num: "03" },
    { label: "PROJECTS", id: "showcase-ad",num: "04" },
    { label: "CONTACT",  id: "contact-ad", num: "05" },
  ];

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* Fixed minimal bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 py-5"
        style={{ pointerEvents: "none" }}
      >
        {/* Hamburger */}
        <button
          className="p-2 flex flex-col gap-[5px] group cursor-pointer"
          style={{ pointerEvents: "auto" }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span
            className="block w-6 h-[1.5px] transition-all duration-300"
            style={{ backgroundColor: tokens.colors.textDim }}
          />
          <span
            className="block w-4 h-[1.5px] transition-all duration-300 group-hover:w-6"
            style={{ backgroundColor: tokens.colors.textDim }}
          />
          <span
            className="block w-6 h-[1.5px] transition-all duration-300"
            style={{ backgroundColor: tokens.colors.textDim }}
          />
        </button>

        {/* CONTACT pill button */}
        <button
          onClick={() => {
            setOpen(false);
            document.getElementById("contact-ad")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-105"
          style={{
            pointerEvents: "auto",
            backgroundColor: tokens.colors.primary,
            color: "#000",
            fontFamily: tokens.fonts.mono,
          }}
        >
          CONTACT
          <span className="text-xs">⚙</span>
        </button>
      </div>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[500] flex flex-col"
            style={{ backgroundColor: "rgba(0,0,0,0.96)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button top-right */}
            <div className="flex items-center justify-between px-6 md:px-10 py-5">
              <p
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
              >
                EXPLORE ARCHIVE
              </p>
              <button
                onClick={() => setOpen(false)}
                className="text-xl hover:rotate-90 transition-transform duration-300"
                style={{ color: tokens.colors.textDim }}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 flex flex-col justify-center px-10 md:px-16 gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center gap-6 group text-left py-3 border-b"
                  style={{ borderColor: tokens.colors.borderFaint }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ x: 16 }}
                >
                  <span
                    className="text-xs tabular-nums"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="font-black uppercase leading-none tracking-tighter group-hover:text-purple-400 transition-colors"
                    style={{
                      fontFamily: tokens.fonts.display,
                      fontSize: "clamp(2.5rem, 6vw, 5rem)",
                      color: tokens.colors.textDim,
                    }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom: blurred portrait hint */}
            <div className="h-32 flex items-end justify-end px-10 pb-8 opacity-20 pointer-events-none select-none">
              <p
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
              >
                © {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


// ════════════════════════════════════════════════════════════════
//  LOADER  — 0→100 counter + slim purple progress bar
// ════════════════════════════════════════════════════════════════
const Loader = ({ onComplete, userName }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let val = 0;
    const duration = 2200;
    const step = 16;
    const increment = 100 / (duration / step);
    const timer = setInterval(() => {
      val += increment;
      if (val >= 100) {
        setCount(100);
        clearInterval(timer);
        setTimeout(onComplete, 300);
      } else {
        setCount(Math.floor(val));
      }
    }, step);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: tokens.colors.background }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="flex flex-col items-center gap-6 w-[340px]">
        {/* Giant counter */}
        <div className="flex items-baseline gap-1">
          <span
            className="font-black leading-none tabular-nums"
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: "clamp(5rem, 15vw, 9rem)",
              color: tokens.colors.foreground,
            }}
          >
            {count}
          </span>
          <span className="text-4xl font-light" style={{ color: tokens.colors.primary }}>
            %
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-px relative overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{ backgroundColor: tokens.colors.primary, width: `${count}%` }}
          />
        </div>

        <p
          className="text-[10px] tracking-[0.3em] uppercase text-center"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
        >
          Engineering Digital Experiences
        </p>
        {userName && (
          <p
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          >
            {userName} © {new Date().getFullYear()}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ════════════════════════════════════════════════════════════════
//  HERO  — full-screen portrait, 4-corner layout
// ════════════════════════════════════════════════════════════════
const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  // Name — same fields as OrientalLuxe
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Headline — split by comma, use first part for giant text
  const rawHeadline = user?.headline || "";
  const shortHeadline = rawHeadline.includes(",")
    ? rawHeadline.split(",")[0].trim()
    : rawHeadline;

  // Build typing sequence for animation
  const slogans = user?.heroSlogans || [];
  const typeSequence = [];
  if (slogans.length > 0) {
    slogans.forEach((s) => {
      const text = typeof s === "string" ? s : s?.text;
      if (text) typeSequence.push(text, 2000);
    });
  } else if (rawHeadline) {
    rawHeadline.split(",").forEach((s) => {
      const trimmed = s.trim();
      if (trimmed) typeSequence.push(trimmed, 2000);
    });
  }
  if (typeSequence.length === 0) typeSequence.push(shortHeadline || "Professional Portfolio", 3000);

  // Giant role: max 2 words per line for clean layout
  const roleWords = shortHeadline.trim().split(" ").filter(Boolean);
  // Line 1 (purple): first word only — like Kaneez "FRONTEND"
  // Line 2 (white):  second word — like Kaneez "ENGINEER"
  // If 3+ words: line1 = first 2 words, line2 = rest (capped at 2)
  const roleLine1 = roleWords.length <= 2
    ? roleWords[0] || "DEVELOPER"
    : roleWords.slice(0, 2).join(" ");
  const roleLine2 = roleWords.length <= 2
    ? roleWords[1] || ""
    : roleWords.slice(2, 4).join(" ");

  // Tags — use skills.technical or skills array (same as OrientalLuxe)
  const skillsArr = Array.isArray(user?.skills)
    ? user.skills
    : user?.skills?.technical || [];
  const tags = skillsArr
    .slice(0, 3)
    .map((s) => (typeof s === "string" ? s : s?.name || ""))
    .filter(Boolean);

  // Social links (same structure as OrientalLuxe Contact)
  const socialLinks = user?.socialLinks || {};

  const getSocialLabel = (key) => key.toUpperCase();

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: 700, backgroundColor: tokens.colors.background }}
    >
      {/* TOP: Tags marquee */}
      {tags.length > 0 && (
        <div
          className="absolute top-0 left-0 right-0 z-40 flex items-center justify-center gap-8 px-20 py-6 pointer-events-none"
          style={{ borderBottom: `1px solid ${tokens.colors.borderFaint}` }}
        >
          {tags.map((tag, i) => (
            <React.Fragment key={i}>
              <span
                className="text-[9px] tracking-[0.3em] uppercase"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
              >
                {tag}
              </span>
              {i < tags.length - 1 && (
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: tokens.colors.primary, display: "inline-block" }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* "CREATIVE" watermark */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none overflow-hidden">
        <span
          className="font-black uppercase whitespace-nowrap leading-none w-full text-center"
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: "clamp(4rem, 15vw, 14rem)",
            color: "rgba(255,255,255,0.06)",
            letterSpacing: "-0.02em",
          }}
        >
          CREATIVE
        </span>
      </div>

      {/* Portrait — profileImage */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none overflow-hidden pb-10 md:pb-24">
        {(user?.profileImage || user?.profilePicture) ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative shadow-2xl"
            style={{
              width: "clamp(340px, 45vw, 750px)",
              height: "clamp(480px, 65vh, 850px)",
              padding: "2px", // 2px border
              background: `linear-gradient(135deg, ${tokens.colors.primary}, rgba(255,255,255,0.05), ${tokens.colors.primary}80)`,
              borderRadius: "999px", // Oval/pill shape
            }}
          >
            <div 
              className="w-full h-full overflow-hidden"
              style={{
                borderRadius: "999px",
                backgroundColor: tokens.colors.background,
              }}
            >
              <img
                src={user.profileImage || user.profilePicture}
                alt={fullName}
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.05) brightness(1.05)" }}
              />
            </div>
            {/* Soft gradient fade at bottom to blend with background */}
            <div 
              className="absolute inset-x-0 bottom-0 h-1/4 z-10 pointer-events-none"
              style={{
                borderRadius: "0 0 999px 999px",
                background: `linear-gradient(to top, ${tokens.colors.background}, transparent)`
              }}
            />
          </motion.div>
        ) : (
          <div
            className="w-72 h-[80%] rounded-t-full flex items-end justify-center pb-8"
            style={{
              background: `radial-gradient(ellipse at 50% 70%, ${tokens.colors.primary}18 0%, transparent 70%)`,
            }}
          >
            <span
              className="text-9xl font-black opacity-20"
              style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground }}
            >
              {firstName?.[0]}
            </span>
          </div>
        )}
      </div>

      {/* 4-CORNER LAYOUT */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between p-8 md:p-14 pt-24 md:pt-28">
        {/* TOP ROW */}
        <div className="flex justify-between items-start">
          {/* TOP LEFT: Name + headline */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <InlineEdit
              isOwner={isOwner}
              id="ad-hero-name"
              value={fullName}
              onSave={(v) => {
                const parts = v.split(" ");
                handleLiveUpdate?.({ firstName: parts[0], lastName: parts.slice(1).join(" ") });
              }}
            >
              <h1
                className="leading-none tracking-tight uppercase font-black"
                style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  color: tokens.colors.foreground,
                  textShadow: "0 10px 30px rgba(0,0,0,0.8)",
                }}
              >
                <span 
                  style={{ 
                    background: `linear-gradient(135deg, ${tokens.colors.primary}, #E0B0FF)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 15px ${tokens.colors.primary}60)`,
                  }}
                >
                  {firstName}
                </span>{" "}
                {lastName}
              </h1>
            </InlineEdit>
            <InlineEdit
              isOwner={isOwner}
              id="ad-hero-headline"
              value={rawHeadline}
              onSave={(v) => handleLiveUpdate?.({ headline: v })}
            >
              <div
                className="mt-2 text-base md:text-lg uppercase tracking-[0.2em] font-semibold min-h-[28px]"
                style={{ color: tokens.colors.textDim, fontFamily: tokens.fonts.mono }}
              >
                <TypeAnimation
                  sequence={typeSequence}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  cursor={true}
                  style={{ 
                    color: tokens.colors.primary,
                    textShadow: `0 0 12px ${tokens.colors.primary}80`,
                    letterSpacing: "0.25em"
                  }}
                />
              </div>
            </InlineEdit>
          </motion.div>

          {/* TOP RIGHT: Quote (static design element like Kaneez) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block text-right"
          >
            <p
              className="text-base md:text-xl italic font-medium leading-tight"
              style={{ fontFamily: tokens.fonts.display, color: tokens.colors.textDim }}
            >
              Design that speaks.
              <br />
              <span className="font-light not-italic">Interfaces that convert.</span>
            </p>
          </motion.div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-end">
          {/* BOTTOM LEFT: Socials + Bio */}
          <motion.div
            className="flex flex-col gap-5 max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Social links */}
            {Object.entries(socialLinks).filter(([, v]) => v).length > 0 && (
              <div className="flex items-center gap-5 flex-wrap">
                {Object.entries(socialLinks)
                  .filter(([, url]) => url)
                  .slice(0, 4)
                  .map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
                    >
                      <span
                        className="text-[10px] font-bold tracking-[0.2em] uppercase"
                        style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
                      >
                        {getSocialLabel(key)}
                      </span>
                    </a>
                  ))}
              </div>
            )}

            {/* Bio — user?.bio */}
            <InlineEdit
              isOwner={isOwner}
              id="ad-hero-bio"
              value={user?.bio || ""}
              type="textarea"
              onSave={(v) => handleLiveUpdate?.({ bio: v })}
            >
              <p
                className="text-[10px] uppercase tracking-wider leading-relaxed line-clamp-3"
                style={{ color: tokens.colors.textDim }}
              >
                {user?.bio || "Your professional bio will appear here..."}
              </p>
            </InlineEdit>
          </motion.div>

          {/* BOTTOM RIGHT: Giant role — font shrinks for longer words */}
          <motion.div
            className="text-right"
            style={{ maxWidth: "50%" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2
              className="uppercase leading-[0.88] tracking-tighter drop-shadow-2xl font-black"
              style={{
                fontFamily: tokens.fonts.display,
                // Shrink font proportionally: short words (~8 chars) get 3.5rem,
                // longer words (12+ chars like "WEB DEVELOPER") get ~2.2rem
                fontSize: (() => {
                  const longest = Math.max(
                    (roleLine1 || "").length,
                    (roleLine2 || "").length
                  );
                  if (longest <= 8)  return "clamp(2.5rem, 4.5vw, 4rem)";
                  if (longest <= 11) return "clamp(2rem, 3.5vw, 3.2rem)";
                  return "clamp(1.6rem, 2.8vw, 2.6rem)";
                })(),
                color: tokens.colors.primary,
              }}
            >
              {roleLine1}
              {roleLine2 && (
                <>
                  <br />
                  <span style={{ color: tokens.colors.foreground }}>
                    {roleLine2}
                  </span>
                </>
              )}
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
//  ABOUT  — Giant name + bio + buttons | Education timeline (right)
// ════════════════════════════════════════════════════════════════
const About = ({ user, isOwner, handleLiveUpdate, handleArrayUpdate, setShowResumeModal }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Same fields as OrientalLuxe About.jsx
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const bio = user?.bio || "";
  const education = user?.education || [];

  return (
    <section
      ref={ref}
      className="w-full py-24 md:py-32 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: tokens.colors.background }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* LEFT */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section label */}
          <p
            className="text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          >
            THE PROFILE / 01
          </p>

          {/* Giant name */}
          <InlineEdit
            isOwner={isOwner}
            id="ad-about-name"
            value={fullName}
            onSave={(v) => {
              const parts = v.split(" ");
              handleLiveUpdate?.({ firstName: parts[0], lastName: parts.slice(1).join(" ") });
            }}
          >
            <h2
              className="font-black uppercase leading-none tracking-tighter"
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: "clamp(3rem, 6vw, 6rem)",
                color: tokens.colors.foreground,
              }}
            >
              {firstName}
              <br />
              <span style={{ color: tokens.colors.primary }}>
                {lastName}.
              </span>
            </h2>
          </InlineEdit>

          {/* Bio */}
          <InlineEdit
            isOwner={isOwner}
            id="ad-about-bio"
            value={bio}
            type="textarea"
            onSave={(v) => handleLiveUpdate?.({ bio: v })}
          >
            <p className="text-base leading-relaxed" style={{ color: tokens.colors.textDim, maxWidth: "520px" }}>
              {bio || "Share your professional background here..."}
            </p>
          </InlineEdit>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            {setShowResumeModal && (
              <button
                onClick={() => setShowResumeModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:scale-105"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: "#000",
                  fontFamily: tokens.fonts.mono,
                }}
              >
                ↓ DOWNLOAD RESUME
              </button>
            )}
            <a
              href="#contact-ad"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest border transition-all hover:scale-105"
              style={{
                borderColor: tokens.colors.borderStrong,
                color: tokens.colors.foreground,
                fontFamily: tokens.fonts.mono,
              }}
            >
              GET IN TOUCH
            </a>
          </div>

          {/* Location */}
          {user?.location && (
            <p
              className="text-xs uppercase tracking-widest flex items-center gap-2"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
            >
              <MapPin size={12} /> {user.location} — OPEN TO REMOTE
            </p>
          )}
        </motion.div>

        {/* RIGHT: Education timeline */}
        {education.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p
              className="text-xs tracking-[0.25em] uppercase mb-8"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
            >
              EDUCATION
            </p>
            <div className="flex flex-col gap-10">
              {education.map((edu, idx) => (
                <div key={edu._id || idx} className="flex gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div
                      className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: tokens.colors.textDim }}
                    />
                    {idx < education.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ backgroundColor: tokens.colors.borderFaint }} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className="text-[10px] uppercase tracking-widest mb-2"
                      style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
                    >
                      {edu.startYear || ""}{edu.endYear ? ` — ${edu.endYear}` : " — PRESENT"}
                    </p>
                    <h3
                      className="text-xl font-bold uppercase tracking-tight mb-1"
                      style={{ color: tokens.colors.foreground }}
                    >
                      {edu.school} — {edu.degree}
                    </h3>
                    {(edu.description || edu.fieldOfStudy) && (
                      <p className="text-sm" style={{ color: tokens.colors.textDim }}>
                        {edu.description || edu.fieldOfStudy}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
//  EXPERIENCE  — vertical timeline
// ════════════════════════════════════════════════════════════════
const Experience = ({ user, isOwner, handleArrayUpdate }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const experience = user?.experience || [];

  if (!experience.length) return null;

  return (
    <section
      ref={ref}
      className="w-full py-24 px-8 md:px-16 lg:px-24 border-t"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          className="text-xs tracking-[0.25em] uppercase mb-12"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          EXPERIENCE
        </motion.p>
        <div className="flex flex-col gap-10">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp._id || idx}
              className="flex gap-4 pb-10 border-b"
              style={{ borderColor: tokens.colors.borderFaint }}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="flex flex-col items-center pt-1">
                <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: tokens.colors.textDim }} />
              </div>
              <div>
                <p
                  className="text-[10px] uppercase tracking-widest mb-2"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
                >
                  {exp.startDate ? new Date(exp.startDate).getFullYear() : ""}
                  {" — "}
                  {exp.endDate ? new Date(exp.endDate).getFullYear() : "PRESENT"}
                </p>
                <h3
                  className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2"
                  style={{ color: tokens.colors.foreground }}
                >
                  {exp.company} — {exp.role || exp.position}
                </h3>
                {(exp.achievements || exp.description) && (
                  <p 
                    className="text-sm max-w-2xl whitespace-pre-wrap leading-relaxed" 
                    style={{ color: tokens.colors.textDim }}
                  >
                    {exp.achievements || exp.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
//  SKILLS  — numbered accordion rows + marquee
// ════════════════════════════════════════════════════════════════
const Skills = ({ user, isOwner }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Same normalization as OrientalLuxe Skills.jsx
  const skillsArr = Array.isArray(user?.skills)
    ? user.skills
    : user?.skills?.technical || [];

  const skillNames = skillsArr
    .map((s) => (typeof s === "string" ? s : s?.name || ""))
    .filter(Boolean);

  if (!skillNames.length) return null;

  // All skills for the marquee (technical + strategic/soft)
  const allSkillNames = [
    ...(Array.isArray(user?.skills) ? user.skills : user?.skills?.technical || []),
    ...(user?.skills?.strategic || []),
  ]
    .map((s) => (typeof s === "string" ? s : s?.name || ""))
    .filter(Boolean);

  return (
    <section
      ref={ref}
      className="w-full border-t"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      {/* Numbered rows */}
      <div>
        {skillNames.map((skill, idx) => (
          <motion.div
            key={idx}
            className="flex items-center justify-between px-8 md:px-16 lg:px-24 py-8 border-b group cursor-default"
            style={{ borderColor: tokens.colors.borderFaint }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.07 }}
            whileHover={{ backgroundColor: `${tokens.colors.primary}08` }}
          >
            <div className="flex items-center gap-8">
              <span
                className="text-xs tabular-nums"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-black uppercase leading-none tracking-tighter"
                style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: "clamp(1.8rem, 5vw, 4rem)",
                  color: tokens.colors.foreground,
                }}
              >
                {skill.toUpperCase()}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-full border flex items-center justify-center text-lg transition-all group-hover:border-purple-500"
                style={{ borderColor: tokens.colors.borderStrong, color: tokens.colors.textDim }}
              >
                ↗
              </span>
              <span
                className="w-10 h-10 rounded-full border flex items-center justify-center text-xl transition-all group-hover:border-purple-500"
                style={{ borderColor: tokens.colors.borderStrong, color: tokens.colors.textDim }}
              >
                +
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marquee */}
      {allSkillNames.length > 0 && (
        <div
          className="overflow-hidden py-5 border-t"
          style={{ borderColor: tokens.colors.borderFaint }}
        >
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "ad-marquee 25s linear infinite" }}
          >
            {[...allSkillNames, ...allSkillNames, ...allSkillNames].map((s, i) => (
              <span key={i} className="flex items-center gap-4 mr-4">
                <span
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
                >
                  {s}
                </span>
                <span
                  className="w-1 h-1 rounded-full inline-block"
                  style={{ backgroundColor: tokens.colors.primary }}
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
//  SHOWCASE  — fullscreen slider (project data same as OrientalLuxe)
// ════════════════════════════════════════════════════════════════
const Showcase = ({ projects, isOwner }) => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (!projects?.length) return null;

  const proj = projects[active];

  // Support both techStack and technologies field names
  const techList = proj?.techStack || proj?.technologies || [];
  const liveUrl = proj?.liveUrl || proj?.liveLink;
  const githubUrl = proj?.githubUrl || proj?.githubLink;
  const image = proj?.image || proj?.thumbnail;

  return (
    <section
      ref={ref}
      className="w-full border-t"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.borderFaint,
        minHeight: "100vh",
      }}
    >
      {/* Section label + Counter */}
      <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 pt-12 pb-4">
        <p
          className="text-xs tracking-[0.25em] uppercase"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
        >
          CREATIVE WORKS
        </p>
        <div className="flex items-center gap-3">
          <span
            className="text-xs tabular-nums"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
          >
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-px transition-all"
                style={{
                  width: i === active ? "32px" : "12px",
                  backgroundColor: i === active ? tokens.colors.primary : tokens.colors.borderStrong,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 items-center px-8 md:px-16 lg:px-24 py-12 gap-16"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* LEFT: Project info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <span
                className="text-xs"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>
              <span
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
              >
                {proj.category || "PROJECT"}
              </span>
            </div>

            <h2
              className="font-black uppercase leading-none tracking-tighter"
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                color: tokens.colors.foreground,
              }}
            >
              {proj.title}
            </h2>

            <div className="w-12 h-px" style={{ backgroundColor: tokens.colors.primary }} />

            {techList.length > 0 && (
              <div>
                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
                >
                  STACK & ARCHITECTURE
                </p>
                <p
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: tokens.colors.primary }}
                >
                  {techList.join(" / ")}
                </p>
              </div>
            )}

            {proj.description && (
              <p className="text-sm leading-relaxed" style={{ color: tokens.colors.textDim }}>
                {proj.description}
              </p>
            )}

            <div className="flex items-center gap-6 flex-wrap">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:opacity-80 transition-all"
                  style={{ color: tokens.colors.foreground }}
                >
                  EXPLORE LIVE PROJECT <ExternalLink size={14} />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:opacity-80 transition-all"
                  style={{ color: tokens.colors.textDim }}
                >
                  <FaGithub size={14} /> GITHUB
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT: Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "_img"}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-xl overflow-hidden"
            style={{ backgroundColor: tokens.colors.backgroundFaint }}
          >
            {image ? (
              <img src={image} alt={proj.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span
                  className="font-black uppercase opacity-10"
                  style={{
                    fontFamily: tokens.fonts.display,
                    fontSize: "clamp(3rem, 10vw, 8rem)",
                    color: tokens.colors.foreground,
                  }}
                >
                  {proj.title?.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Prev/Next */}
      <div className="flex justify-center gap-4 pb-16">
        <button
          onClick={() => setActive((p) => Math.max(0, p - 1))}
          disabled={active === 0}
          className="px-8 py-3 text-xs uppercase tracking-widest font-bold border rounded-full transition-all disabled:opacity-30 hover:scale-105"
          style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.borderStrong, color: tokens.colors.foreground }}
        >
          ← PREV
        </button>
        <button
          onClick={() => setActive((p) => Math.min(projects.length - 1, p + 1))}
          disabled={active === projects.length - 1}
          className="px-8 py-3 text-xs uppercase tracking-widest font-bold border rounded-full transition-all disabled:opacity-30 hover:scale-105"
          style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.borderStrong, color: tokens.colors.foreground }}
        >
          NEXT →
        </button>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
//  CONTACT  — "LET'S BUILD SOMETHING" + copy email + socials list
// ════════════════════════════════════════════════════════════════
const Contact = ({ user, contactForm, setContactForm, handleContactSubmit, isSending }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  // Same social links structure as OrientalLuxe Contact.jsx
  const socialLinks = user?.socialLinks || {};
  const socials = [
    { key: "linkedin", icon: FaLinkedin, label: "LINKEDIN", url: socialLinks.linkedin },
    { key: "github",   icon: FaGithub,   label: "GITHUB",   url: socialLinks.github },
    { key: "twitter",  icon: FaTwitter,  label: "TWITTER",  url: socialLinks.twitter },
  ].filter((s) => s.url);

  // Add any other social links not in the main list
  const otherSocials = Object.entries(socialLinks)
    .filter(([key, url]) => url && !["linkedin", "github", "twitter"].includes(key))
    .map(([key, url]) => ({ key, label: key.toUpperCase(), url }));

  const allSocials = [...socials, ...otherSocials];

  const handleCopy = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputStyle = {
    backgroundColor: tokens.colors.backgroundFaint,
    borderColor: tokens.colors.borderDim,
    color: tokens.colors.foreground,
    fontFamily: tokens.fonts.body,
  };

  return (
    <section
      id="contact-ad"
      ref={ref}
      className="w-full py-32 px-8 md:px-16 lg:px-24 border-t"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT: "LET'S BUILD SOMETHING" */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-black uppercase leading-none tracking-tighter"
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: tokens.colors.foreground,
            }}
          >
            LET'S{" "}
            <span style={{ color: "rgba(255,255,255,0.15)" }}>BUILD</span>
            <br />
            <span style={{ color: tokens.colors.primary }}>SOMETHING.</span>
          </h2>

          <p className="text-base" style={{ color: tokens.colors.textDim }}>
            I am currently open to freelance projects and new opportunities.
          </p>

          {user?.email && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-3 w-fit px-7 py-3 rounded-full text-sm font-bold uppercase tracking-widest border transition-all hover:scale-105"
              style={{
                fontFamily: tokens.fonts.mono,
                borderColor: tokens.colors.foreground,
                color: tokens.colors.foreground,
              }}
            >
              <Mail size={14} />
              {copied ? "✓ COPIED!" : "COPY EMAIL"}
            </button>
          )}

          {/* Contact details */}
          <div className="flex flex-col gap-3">
            {user?.email && (
              <a
                href={`mailto:${user.email}`}
                className="text-sm"
                style={{ color: tokens.colors.textDim }}
              >
                {user.email}
              </a>
            )}
            {user?.phoneNumber && (
              <span className="text-sm" style={{ color: tokens.colors.textDim }}>
                {user.phoneNumber}
              </span>
            )}
            {user?.location && (
              <span className="text-sm flex items-center gap-2" style={{ color: tokens.colors.textDim }}>
                <MapPin size={12} /> {user.location}
              </span>
            )}
          </div>

          {/* Contact Form */}
          {handleContactSubmit && (
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 mt-4 max-w-md">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={contactForm?.name || ""}
                  onChange={(e) => setContactForm?.({ ...contactForm, name: e.target.value })}
                  required
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contactForm?.email || ""}
                  onChange={(e) => setContactForm?.({ ...contactForm, email: e.target.value })}
                  required
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={contactForm?.subject || ""}
                onChange={(e) => setContactForm?.({ ...contactForm, subject: e.target.value })}
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                style={inputStyle}
              />
              <textarea
                placeholder="Your message..."
                value={contactForm?.message || ""}
                onChange={(e) => setContactForm?.({ ...contactForm, message: e.target.value })}
                required
                rows={4}
                className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none"
                style={inputStyle}
              />
              <button
                type="submit"
                disabled={isSending}
                className="self-start flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 disabled:opacity-50"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: "#000",
                  fontFamily: tokens.fonts.mono,
                }}
              >
                <Send size={14} />
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>

        {/* RIGHT: Social links vertical list */}
        {allSocials.length > 0 && (
          <motion.div
            className="flex flex-col gap-0"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {allSocials.map(({ key, label, url }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-6 border-b group hover:pl-4 transition-all"
                style={{ borderColor: tokens.colors.borderFaint, color: tokens.colors.foreground }}
              >
                <span
                  className="text-xl font-bold uppercase tracking-widest group-hover:text-purple-400 transition-colors"
                  style={{ fontFamily: tokens.fonts.display }}
                >
                  {label}
                </span>
                <span className="text-xl">↗</span>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
//  FOOTER
// ════════════════════════════════════════════════════════════════
const Footer = ({ user }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  return (
    <footer
      className="w-full px-8 md:px-16 lg:px-24 py-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <p className="text-xs uppercase tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}>
        © {new Date().getFullYear()} {fullName}. All Rights Reserved.
      </p>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-xs uppercase tracking-widest hover:-translate-y-1 transition-transform"
        style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
      >
        BACK TO TOP ↑
      </button>
      <p className="text-xs uppercase tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}>
        ENGINEERED IN PAKISTAN
      </p>
    </footer>
  );
};

// ════════════════════════════════════════════════════════════════
//  ROOT THEME SHELL  — matches OrientalLuxe prop signature exactly
// ════════════════════════════════════════════════════════════════
const AuraDarkTheme = ({
  user,
  projects,
  isOwner,
  handleLiveUpdate,
  handleArrayUpdate,
  setShowResumeModal,
  contactForm,
  setContactForm,
  handleContactSubmit,
  isSending,
  githubData,
  githubLoading,
}) => {
  const [loading, setLoading] = useState(true);

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: tokens.colors.background,
        color: tokens.colors.foreground,
        fontFamily: tokens.fonts.body,
      }}
    >
      {/* Marquee keyframe */}
      <style>{`
        @keyframes ad-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>

      {/* Loader */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} userName={fullName} />}
      </AnimatePresence>

      {/* Page content — hidden until loader done */}
      <div
        className="transition-opacity duration-1000"
        style={{ opacity: loading ? 0 : 1 }}
      >
        {/* Kaneez-style minimal hamburger nav (fixed, always visible) */}
        <AuraDarkNav setShowResumeModal={setShowResumeModal} />

        <Hero
          user={user}
          isOwner={isOwner}
          handleLiveUpdate={handleLiveUpdate}
          setShowResumeModal={setShowResumeModal}
        />

        <div id="about-ad">
          <About
            user={user}
            isOwner={isOwner}
            handleLiveUpdate={handleLiveUpdate}
            handleArrayUpdate={handleArrayUpdate}
            setShowResumeModal={setShowResumeModal}
          />
        </div>

        {(isOwner || user?.experience?.length > 0) && (
          <div id="experience-ad">
            <Experience
              user={user}
              isOwner={isOwner}
              handleArrayUpdate={handleArrayUpdate}
            />
          </div>
        )}

        <div id="skills-ad">
          <Skills user={user} isOwner={isOwner} />
        </div>

        {(isOwner || projects?.length > 0) && (
          <div id="showcase-ad">
            <Showcase projects={projects} isOwner={isOwner} />
          </div>
        )}

        <Contact
          user={user}
          contactForm={contactForm || { name: "", email: "", subject: "", message: "" }}
          setContactForm={setContactForm || (() => {})}
          handleContactSubmit={handleContactSubmit || ((e) => e.preventDefault())}
          isSending={isSending || false}
        />

        <Footer user={user} />
      </div>

    </div>
  );
};

export default AuraDarkTheme;
