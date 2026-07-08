import React from "react";
import { ArrowRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { tokens } from "./tokens";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";

const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  const headline = user?.headline || "";
  const bio = user?.bio || "";
  const location = user?.location || "";
  const isOpenToWork = user?.openToWork ?? true;
  const profileImage = user?.profileImage;

  // Build TypeAnimation sequence from headline (comma-separated roles)
  const typeSequence = [];
  if (headline) {
    headline.split(",").forEach((s) => {
      const trimmed = s.trim();
      if (trimmed) typeSequence.push(trimmed, 2000);
    });
  }
  if (typeSequence.length === 0) typeSequence.push("Developer", 3000);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: tokens.colors.pureBlack, color: tokens.colors.paper }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-28 pb-20 md:pt-40 md:pb-28">

        {/* Top meta bar — Location + Availability */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.borders }}
        >
          {location && (
            <span className="text-[10px] uppercase tracking-[0.2em]">
              {location}
            </span>
          )}
          {location && isOpenToWork && (
            <span className="text-[10px] tracking-[0.2em] opacity-40">—</span>
          )}
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${isOpenToWork ? "bg-green-500 animate-pulse" : "bg-[#78716C]"}`}
            />
            {isOpenToWork ? "Available for Work" : "Not Available"}
          </span>
        </motion.div>

        {/* Main hero grid: Left content + Right image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Left — Name, bio, CTA */}
          <div className="md:col-span-7 flex flex-col space-y-8">
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              style={{ fontFamily: tokens.fonts.heading }}
            >
              <InlineEdit
                isOwner={isOwner}
                id="mg-hero-name"
                value={fullName}
                onSave={(v) => {
                  const parts = v.trim().split(" ");
                  handleLiveUpdate({
                    firstName: parts[0] || "",
                    lastName: parts.slice(1).join(" ") || "",
                  });
                }}
              >
                {fullName || "Your Name"}
              </InlineEdit>
            </motion.h1>

            {/* Bio / subheading */}
            {(bio || isOwner) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-base leading-relaxed max-w-xl"
                style={{ color: "#D6D3D1", fontFamily: tokens.fonts.body }}
              >
                <InlineEdit
                  isOwner={isOwner}
                  id="mg-hero-bio"
                  value={bio}
                  type="textarea"
                  onSave={(v) => handleLiveUpdate({ bio: v })}
                >
                  <p className="whitespace-pre-line">
                    {bio || <span className="italic opacity-40">Add your bio…</span>}
                  </p>
                </InlineEdit>
              </motion.div>
            )}

            {/* Current Role — TypeAnimation */}
            {typeSequence.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-1"
              >
                <p
                  className="text-[9px] uppercase tracking-[0.2em]"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                >
                  Current Role
                </p>
                <div
                  className="text-sm flex items-center gap-1"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.borders }}
                >
                  <InlineEdit
                    isOwner={isOwner}
                    id="mg-hero-headline"
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
                    <span
                      className="ml-0.5 inline-block h-4 w-px animate-pulse"
                      style={{ backgroundColor: tokens.colors.borders }}
                    />
                  </InlineEdit>
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => setShowResumeModal(true)}
                className="group flex items-center gap-3 border px-7 py-3.5 text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ fontFamily: tokens.fonts.mono, borderColor: "#D6D3D1" }}
              >
                <span>View Resume</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-2" />
              </button>
              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-3 px-7 py-3.5 text-xs tracking-wider uppercase transition-all duration-300"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted, border: "1px solid #333" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#D6D3D1";
                  e.currentTarget.style.color = tokens.colors.paper;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#333";
                  e.currentTarget.style.color = tokens.colors.muted;
                }}
              >
                View Work
              </button>
            </motion.div>
          </div>

          {/* Right — Profile Image (like Bilal's hero) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-sm md:max-w-lg lg:max-w-xl flex flex-col items-center"
            >
              {/* Image container with mask to fade edges */}
              <div className="relative w-full flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={fullName || "Profile"}
                    className="w-full h-auto max-h-[500px] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                    style={{
                      WebkitMaskImage: "radial-gradient(closest-side, black 45%, transparent 95%)",
                      maskImage: "radial-gradient(closest-side, black 45%, transparent 95%)"
                    }}
                    loading="eager"
                  />
                ) : (
                  <div
                    className="flex h-64 w-64 items-center justify-center text-6xl font-bold rounded-full"
                    style={{
                      backgroundColor: "#111",
                      color: tokens.colors.muted,
                      fontFamily: tokens.fonts.heading,
                    }}
                  >
                    {(fullName?.[0] || "?").toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name + EST label below image (like Bilal's "BILAL RAZA — EST. 2017") */}
              <div className="mt-5 text-center">
                <p
                  className="text-[9px] uppercase tracking-[0.25em]"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                >
                  {fullName}
                  {user?.careerStartYear ? ` — EST. ${user.careerStartYear}` : ""}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
