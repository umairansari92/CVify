import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";

const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const rawHeadline = user?.headline || "";
  const shortHeadline = rawHeadline.includes(",")
    ? rawHeadline.split(",")[0].trim()
    : rawHeadline;

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

  const roleWords = shortHeadline.trim().split(" ").filter(Boolean);
  const roleLine1 = roleWords.length <= 2
    ? roleWords[0] || "DEVELOPER"
    : roleWords.slice(0, 2).join(" ");
  const roleLine2 = roleWords.length <= 2
    ? roleWords[1] || ""
    : roleWords.slice(2, 4).join(" ");

  const skillsArr = Array.isArray(user?.skills)
    ? user.skills
    : user?.skills?.technical || [];
  const tags = skillsArr
    .slice(0, 3)
    .map((s) => (typeof s === "string" ? s : s?.name || ""))
    .filter(Boolean);

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
            className="relative shadow-2xl flex items-center justify-center overflow-hidden"
            style={{
              width: "clamp(280px, 85vw, 500px)",
              aspectRatio: "3/4",
              padding: "2px",
              background: `linear-gradient(135deg, ${tokens.colors.primary}, rgba(255,255,255,0.05), ${tokens.colors.primary}80)`,
              borderRadius: "999px", // Oval/pill shape
            }}
          >
            <div 
              className="w-full h-full overflow-hidden"
              style={{
                borderRadius: "999px",
              }}
            >
              <img
                src={user.profileImage || user.profilePicture}
                alt={fullName}
                className="w-full h-full object-cover object-top"
                fetchPriority="high"
                loading="eager"
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
      <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-14 pt-20 md:pt-28">
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
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
        <div className="flex flex-col-reverse md:flex-row justify-between items-end gap-4 md:gap-0">
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
            className="w-full md:w-1/2 text-left md:text-right mt-6 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2
              className="uppercase leading-[0.88] tracking-tighter drop-shadow-2xl font-black"
              style={{
                fontFamily: tokens.fonts.display,
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

export default Hero;
