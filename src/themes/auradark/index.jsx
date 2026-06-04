import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { tokens } from "./tokens";

// ────────────────────────────────────────────────────────────────
//  LOADER  (0 → 100 counter + slim progress bar)
// ────────────────────────────────────────────────────────────────
const Loader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2200;
    const step = 16;
    const increment = 100 / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        setCount(100);
        clearInterval(timer);
        setTimeout(onComplete, 300);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#000000" }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="relative flex flex-col items-center gap-6 w-[340px]">
        {/* Counter */}
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
          <span
            className="font-light text-4xl"
            style={{ color: tokens.colors.primary }}
          >
            %
          </span>
        </div>

        {/* Progress line */}
        <div
          className="w-full h-[1px] relative overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{ backgroundColor: tokens.colors.primary }}
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ duration: 0 }}
          />
        </div>

        {/* Tagline */}
        <p
          className="text-[10px] tracking-[0.3em] uppercase text-center"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
        >
          Engineering Digital Experiences
        </p>
        <p
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
        >
          {/* Will be user's name, but loader doesn't receive it */}
          © 2025
        </p>
      </div>
    </motion.div>
  );
};

// ────────────────────────────────────────────────────────────────
//  HERO  (full-screen portrait, 4-corner layout, CREATIVE bg)
// ────────────────────────────────────────────────────────────────
const Hero = ({ user }) => {
  const nameParts = (user?.name || "John Doe").split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const rawHeadline = user?.headline || "Software Engineer";
  const shortHeadline = rawHeadline.includes(",")
    ? rawHeadline.split(",")[0].trim()
    : rawHeadline;

  // pull up to 3 tags from skills
  const tags = [];
  if (user?.skills?.technical?.length) {
    for (let i = 0; i < Math.min(3, user.skills.technical.length); i++) {
      const s = user.skills.technical[i];
      tags.push(typeof s === "string" ? s : s?.name || "");
    }
  }
  if (!tags.length) tags.push("FRONTEND ENGINEER", "UI/UX ENTHUSIAST", "PROBLEM SOLVER");

  const getSocialLabel = (url = "") => {
    if (url.includes("github")) return "GITHUB";
    if (url.includes("linkedin")) return "LINKEDIN";
    if (url.includes("twitter") || url.includes("x.com")) return "TWITTER";
    return "WEBSITE";
  };

  const socialEntries = user?.socialLinks
    ? Object.entries(user.socialLinks).filter(([, v]) => v)
    : [];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: 700, backgroundColor: tokens.colors.background }}
    >
      {/* TOP NAV MARQUEE - tags centered */}
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
                className="w-1 h-1 rounded-full inline-block"
                style={{ backgroundColor: tokens.colors.primary }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* "CREATIVE" watermark behind photo */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none overflow-hidden">
        <h2
          className="font-black uppercase whitespace-nowrap leading-none"
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: "clamp(8rem, 22vw, 22rem)",
            color: "rgba(255,255,255,0.04)",
            letterSpacing: "-0.04em",
          }}
        >
          CREATIVE
        </h2>
      </div>

      {/* Portrait — fills center, fades at bottom */}
      <div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none overflow-hidden">
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.name}
            className="h-full object-contain object-bottom"
            style={{
              maxWidth: "60%",
              maskImage: "linear-gradient(to top, transparent 0%, black 12%)",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 12%)",
              filter: "contrast(1.05) brightness(1.05)",
            }}
          />
        ) : (
          /* Fallback gradient silhouette */
          <div
            className="w-80 h-[85%] rounded-t-full"
            style={{
              background: `radial-gradient(ellipse at 50% 60%, ${tokens.colors.primary}22 0%, transparent 70%)`,
            }}
          />
        )}
      </div>

      {/* 4-CORNER CONTENT (z-30 so it's above photo) */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between p-8 md:p-14 pt-24 md:pt-28">
        {/* TOP ROW */}
        <div className="flex justify-between items-start pointer-events-auto">
          {/* TOP LEFT: Name + title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              className="leading-none tracking-tight uppercase font-black drop-shadow-2xl"
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                color: tokens.colors.foreground,
              }}
            >
              <span style={{ color: tokens.colors.primary }}>{firstName}</span>{" "}
              {lastName}
            </h1>
            <p
              className="mt-1 text-xs uppercase tracking-widest drop-shadow-md"
              style={{ color: tokens.colors.textDim, fontFamily: tokens.fonts.mono }}
            >
              {shortHeadline}
            </p>
          </motion.div>

          {/* TOP RIGHT: italic quote */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block text-right"
          >
            <p
              className="text-base md:text-xl italic font-medium leading-tight drop-shadow-md"
              style={{ fontFamily: tokens.fonts.display, color: tokens.colors.textDim }}
            >
              Design that speaks.
              <br />
              <span className="font-light not-italic">Interfaces that convert.</span>
            </p>
          </motion.div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-end pointer-events-auto">
          {/* BOTTOM LEFT: socials + bio */}
          <motion.div
            className="flex flex-col gap-5 max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* social links */}
            {socialEntries.length > 0 && (
              <div className="flex items-center gap-6 flex-wrap">
                {socialEntries.slice(0, 4).map(([, url], i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 group hover:-translate-y-0.5 transition-transform"
                  >
                    <span
                      className="text-[10px] font-bold tracking-[0.2em] uppercase"
                      style={{
                        fontFamily: tokens.fonts.mono,
                        color: tokens.colors.textDim,
                      }}
                    >
                      {getSocialLabel(url)}
                    </span>
                  </a>
                ))}
              </div>
            )}

            {/* Bio */}
            <p
              className="text-[10px] uppercase tracking-wider leading-relaxed line-clamp-3 drop-shadow-md"
              style={{ color: tokens.colors.textDim }}
            >
              {user?.summary ||
                "Passionate about turning creative ideas into modern web experiences. I specialize in building pixel-perfect, responsive applications."}
            </p>
          </motion.div>

          {/* BOTTOM RIGHT: Giant role */}
          <motion.div
            className="text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2
              className="font-black uppercase leading-[0.85] tracking-tighter drop-shadow-2xl"
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: "clamp(2.8rem, 8vw, 7rem)",
                color: tokens.colors.primary,
              }}
            >
              {shortHeadline.split(" ")[0]}
              <br />
              <span style={{ color: tokens.colors.foreground }}>
                {shortHeadline.split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────
//  ABOUT  (left: giant name + bio + buttons + location | right: education timeline)
// ────────────────────────────────────────────────────────────────
const About = ({ user, setShowResumeModal }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
            >
              THE PROFILE / 01
            </p>
            <h2
              className="font-black uppercase leading-none tracking-tighter"
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                color: tokens.colors.foreground,
              }}
            >
              {user?.name?.split(" ")[0]}
              <br />
              <span style={{ color: tokens.colors.primary }}>
                {user?.name?.split(" ").slice(1).join(" ")}.
              </span>
            </h2>
          </div>

          <p
            className="text-base leading-relaxed"
            style={{ color: tokens.colors.textDim, maxWidth: "520px" }}
          >
            {user?.summary ||
              "Passionate about turning creative ideas into modern web experiences."}
          </p>

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
              href="#contact"
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

          {user?.location && (
            <p
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
            >
              📍 {user.location} — OPEN TO REMOTE
            </p>
          )}
        </motion.div>

        {/* RIGHT: Education timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {user?.education?.length > 0 && (
            <div>
              <p
                className="text-xs tracking-[0.25em] uppercase mb-8 flex items-center gap-2"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                EDUCATION
              </p>
              <div className="flex flex-col gap-10">
                {user.education.map((edu, idx) => (
                  <div key={edu._id || idx} className="flex gap-4">
                    <div className="flex flex-col items-center pt-1">
                      <div
                        className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: tokens.colors.textDim }}
                      />
                      {idx < user.education.length - 1 && (
                        <div
                          className="w-px flex-1 mt-2"
                          style={{ backgroundColor: tokens.colors.borderFaint }}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <p
                        className="text-[10px] uppercase tracking-widest mb-2"
                        style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
                      >
                        {edu.startYear || ""}
                        {edu.endYear ? ` — ${edu.endYear}` : " — PRESENT"}
                      </p>
                      <h3
                        className="text-xl font-bold uppercase tracking-tight mb-1"
                        style={{ color: tokens.colors.foreground }}
                      >
                        {edu.school} — {edu.degree}
                      </h3>
                      {edu.description && (
                        <p className="text-sm" style={{ color: tokens.colors.textDim }}>
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────
//  EXPERIENCE  (same two-column style but for work)
// ────────────────────────────────────────────────────────────────
const Experience = ({ user }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (!user?.experience?.length) return null;

  return (
    <section
      ref={ref}
      className="w-full py-24 px-8 md:px-16 lg:px-24 border-t"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.borderFaint,
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          className="text-xs tracking-[0.25em] uppercase mb-12 flex items-center gap-2"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          EXPERIENCE
        </motion.p>
        <div className="flex flex-col gap-10">
          {user.experience.map((exp, idx) => (
            <motion.div
              key={exp._id || idx}
              className="flex gap-4 pb-10 border-b"
              style={{ borderColor: tokens.colors.borderFaint }}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="flex flex-col items-center pt-1">
                <div
                  className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: tokens.colors.textDim }}
                />
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
                  {exp.company} — {exp.position}
                </h3>
                {exp.description && (
                  <p className="text-sm max-w-2xl" style={{ color: tokens.colors.textDim }}>
                    {exp.description}
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

// ────────────────────────────────────────────────────────────────
//  SKILLS  (accordion list — numbered rows with expand arrows)
// ────────────────────────────────────────────────────────────────
const Skills = ({ user }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const services = [];
  if (user?.skills?.technical?.length) {
    user.skills.technical.forEach((s, i) => {
      services.push({
        num: String(i + 1).padStart(2, "0"),
        name: typeof s === "string" ? s.toUpperCase() : (s?.name || "").toUpperCase(),
      });
    });
  }
  if (!services.length) {
    ["FRONTEND DEVELOPMENT", "FIGMA TO CODE", "INTERACTIVE UI", "FULL-STACK MERN"].forEach(
      (name, i) => services.push({ num: String(i + 1).padStart(2, "0"), name })
    );
  }

  // Marquee tags from all skills
  const allSkills = [
    ...(user?.skills?.technical || []),
    ...(user?.skills?.soft || []),
  ].map((s) => (typeof s === "string" ? s : s?.name)).filter(Boolean);

  return (
    <section
      ref={ref}
      className="w-full border-t"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.borderFaint,
      }}
    >
      {/* Skill rows */}
      <div>
        {services.map((svc, idx) => (
          <motion.div
            key={idx}
            className="flex items-center justify-between px-8 md:px-16 lg:px-24 py-8 border-b group cursor-default"
            style={{ borderColor: tokens.colors.borderFaint }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.07 }}
            whileHover={{ backgroundColor: "rgba(182,119,239,0.04)" }}
          >
            <div className="flex items-center gap-8">
              <span
                className="text-xs tabular-nums"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                {svc.num}
              </span>
              <h3
                className="font-black uppercase leading-none tracking-tighter"
                style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: "clamp(1.8rem, 5vw, 4rem)",
                  color: tokens.colors.foreground,
                }}
              >
                {svc.name}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 rounded-full border flex items-center justify-center text-lg transition-all group-hover:border-purple-500"
                style={{ borderColor: tokens.colors.borderStrong, color: tokens.colors.textDim }}
              >
                ↗
              </button>
              <button
                className="w-10 h-10 rounded-full border flex items-center justify-center text-xl transition-all group-hover:border-purple-500"
                style={{ borderColor: tokens.colors.borderStrong, color: tokens.colors.textDim }}
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Infinite marquee of skill tags */}
      {allSkills.length > 0 && (
        <div
          className="overflow-hidden py-5 border-t"
          style={{ borderColor: tokens.colors.borderFaint }}
        >
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
            {[...allSkills, ...allSkills, ...allSkills].map((s, i) => (
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

// ────────────────────────────────────────────────────────────────
//  SHOWCASE  (full-screen slider: left text, right device mockup)
// ────────────────────────────────────────────────────────────────
const Showcase = ({ projects }) => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (!projects?.length) return null;

  const proj = projects[active];

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
      {/* Counter top right */}
      <div className="flex justify-end px-8 md:px-16 lg:px-24 pt-8">
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

      {/* Main content */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 items-center px-8 md:px-16 lg:px-24 py-16 gap-16"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* LEFT: project info */}
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

            <div
              className="w-12 h-px"
              style={{ backgroundColor: tokens.colors.primary }}
            />

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
                {proj.technologies?.join(" / ") || "REACT / NODE.JS"}
              </p>
            </div>

            {proj.liveUrl && (
              <a
                href={proj.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold w-fit hover:gap-4 transition-all"
                style={{ color: tokens.colors.foreground }}
              >
                EXPLORE LIVE PROJECT ↗
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        {/* RIGHT: image */}
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
            {proj.image ? (
              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span
                  className="text-6xl font-black uppercase opacity-10"
                  style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground }}
                >
                  {proj.title?.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 pb-16">
        <button
          onClick={() => setActive((p) => Math.max(0, p - 1))}
          disabled={active === 0}
          className="px-8 py-3 text-xs uppercase tracking-widest font-bold border rounded-full transition-all disabled:opacity-30 hover:scale-105"
          style={{
            fontFamily: tokens.fonts.mono,
            borderColor: tokens.colors.borderStrong,
            color: tokens.colors.foreground,
          }}
        >
          ← PREV
        </button>
        <button
          onClick={() => setActive((p) => Math.min(projects.length - 1, p + 1))}
          disabled={active === projects.length - 1}
          className="px-8 py-3 text-xs uppercase tracking-widest font-bold border rounded-full transition-all disabled:opacity-30 hover:scale-105"
          style={{
            fontFamily: tokens.fonts.mono,
            borderColor: tokens.colors.borderStrong,
            color: tokens.colors.foreground,
          }}
        >
          NEXT →
        </button>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────
//  CONTACT  (LET'S BUILD SOMETHING + copy email + socials)
// ────────────────────────────────────────────────────────────────
const Contact = ({ user }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getSocialLabel = (url = "") => {
    if (url.includes("github")) return "GITHUB";
    if (url.includes("linkedin")) return "LINKEDIN";
    if (url.includes("twitter") || url.includes("x.com")) return "TWITTER";
    if (url.includes("facebook")) return "FACEBOOK";
    return "WEBSITE";
  };

  const socialEntries = user?.socialLinks
    ? Object.entries(user.socialLinks).filter(([, v]) => v)
    : [];

  return (
    <section
      ref={ref}
      id="contact"
      className="w-full py-32 px-8 md:px-16 lg:px-24 border-t"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.borderFaint,
      }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
        {/* LEFT */}
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
              fontSize: "clamp(3rem, 9vw, 8rem)",
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

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-3 w-fit px-7 py-3 rounded-full text-sm font-bold uppercase tracking-widest border transition-all hover:scale-105"
            style={{
              fontFamily: tokens.fonts.mono,
              borderColor: tokens.colors.foreground,
              color: tokens.colors.foreground,
            }}
          >
            {copied ? "✓ COPIED!" : "COPY EMAIL"}
          </button>
        </motion.div>

        {/* RIGHT: Socials vertical list */}
        {socialEntries.length > 0 && (
          <motion.div
            className="flex flex-col gap-0"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {socialEntries.map(([, url], i) => (
              <a
                key={i}
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
                  {getSocialLabel(url)}
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

// ────────────────────────────────────────────────────────────────
//  FOOTER
// ────────────────────────────────────────────────────────────────
const Footer = ({ user }) => (
  <footer
    className="w-full px-8 md:px-16 lg:px-24 py-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
    style={{
      backgroundColor: tokens.colors.background,
      borderColor: tokens.colors.borderFaint,
    }}
  >
    <p
      className="text-xs uppercase tracking-widest"
      style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
    >
      © {new Date().getFullYear()} {user?.name}. All Rights Reserved.
    </p>
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="text-xs uppercase tracking-widest hover:-translate-y-1 transition-transform"
      style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
    >
      BACK TO TOP ↑
    </button>
    <p
      className="text-xs uppercase tracking-widest"
      style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
    >
      ENGINEERED IN PAKISTAN
    </p>
  </footer>
);

// ────────────────────────────────────────────────────────────────
//  ROOT: AuraDarkTheme
// ────────────────────────────────────────────────────────────────
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

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: tokens.colors.background,
        color: tokens.colors.foreground,
        fontFamily: tokens.fonts.body,
      }}
    >
      {/* Marquee CSS */}
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
      `}</style>

      <AnimatePresence>
        {loading && (
          <Loader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div
        className="transition-opacity duration-1000"
        style={{ opacity: loading ? 0 : 1 }}
      >
        <Hero user={user} />
        <About user={user} setShowResumeModal={setShowResumeModal} />
        <Experience user={user} />
        <Skills user={user} />
        <Showcase projects={projects} />
        <Contact user={user} />
        <Footer user={user} />
      </div>
    </div>
  );
};

export default AuraDarkTheme;
