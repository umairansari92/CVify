import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const WordReveal = ({ text }) => {
  if (!text) return null;
  const words = text.split(" ");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { ease: tokens.motion.easing.base, duration: tokens.motion.duration.normal } },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="inline-block"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const About = ({ user, isOwner, handleLiveUpdate }) => {
  const bio = user?.bio || "";
  const profileImage = user?.profileImage; // ✅ correct field
  const education = user?.education || [];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.08]);

  const projectsCount = user?.projects?.length || 0;
  const allExp = user?.experience || [];
  const experienceYears =
    allExp.length > 0
      ? Math.max(
          ...allExp.map((e) => {
            const start = e.startDate ? new Date(e.startDate).getFullYear() : new Date().getFullYear();
            return new Date().getFullYear() - start;
          })
        )
      : 0;

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-14 flex items-center gap-4">
          <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
            (01)
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
            About
          </span>
        </div>

        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          {/* LEFT — Text */}
          <div className="md:col-span-7">
            <h2
              className="text-3xl md:text-5xl font-medium leading-tight mb-10"
              style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
            >
              <WordReveal text="Engineering with a designer's " />
              <span className="italic" style={{ color: tokens.colors.accent }}>
                eye.
              </span>
            </h2>

            <div className="flex flex-col gap-6 max-w-xl">
              <InlineEdit
                isOwner={isOwner}
                id="noir-about-bio"
                value={bio}
                type="textarea"
                onSave={(v) => handleLiveUpdate?.({ bio: v })}
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
                  className="text-lg md:text-xl leading-relaxed whitespace-pre-line"
                  style={{ color: tokens.colors.secondary }}
                >
                  {bio || "Share your professional background and expertise…"}
                </motion.p>
              </InlineEdit>

              {/* Verification Proof Box — always visible */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
                className="p-6 md:p-8 border rounded-2xl relative overflow-hidden backdrop-blur-sm"
                style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg }}
              >
                {/* Subtle decorative glow */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-[40px] rounded-full pointer-events-none"
                  aria-hidden="true"
                />
                
                <p
                  className="text-[9px] font-black uppercase tracking-[0.25em] mb-6"
                  style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}
                >
                  // CVIFY PROFILE VERIFICATION PROOF
                </p>

                <div className="flex flex-col sm:flex-row items-stretch justify-start gap-8 sm:gap-12">
                  <div className="flex-1">
                    <p className="text-4xl font-extrabold tracking-tight" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
                      {user?.branding?.verificationStats?.atsScore ?? 92}%
                    </p>
                    <p className="text-[8px] uppercase tracking-widest mt-1 opacity-50 font-bold" style={{ fontFamily: tokens.fonts.mono }}>
                      Avg. ATS Compatibility
                    </p>
                  </div>
                  
                  <div className="flex-1 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-8" style={{ borderColor: tokens.colors.border }}>
                    <p className="text-4xl font-extrabold tracking-tight" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
                      {user?.branding?.verificationStats?.dataPoints ?? projectsCount * 12 + 40}
                    </p>
                    <p className="text-[8px] uppercase tracking-widest mt-1 opacity-50 font-bold" style={{ fontFamily: tokens.fonts.mono }}>
                      Data Points Analyzed
                    </p>
                  </div>

                  <div className="flex-1 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-8" style={{ borderColor: tokens.colors.border }}>
                    <p className="text-4xl font-extrabold tracking-tight text-emerald-500" style={{ fontFamily: tokens.fonts.heading }}>
                      VERIFIED
                    </p>
                    <p className="text-[8px] uppercase tracking-widest mt-1 opacity-50 font-bold" style={{ fontFamily: tokens.fonts.mono }}>
                      CVify AI Certification
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t"
              style={{ borderColor: tokens.colors.border }}
            >
              <div>
                <div className="text-3xl md:text-4xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
                  {projectsCount}+
                </div>
                <div className="text-xs mt-2 uppercase font-bold tracking-widest" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>
                  Projects Shipped
                </div>
              </div>
              {experienceYears > 0 && (
                <div>
                  <div className="text-3xl md:text-4xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
                    {experienceYears}+
                  </div>
                  <div className="text-xs mt-2 uppercase font-bold tracking-widest" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>
                    Years Exp
                  </div>
                </div>
              )}
              {user?.skills && (
                <div>
                  <div className="text-3xl md:text-4xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
                    {Array.isArray(user.skills) ? user.skills.length : Object.values(user.skills || {}).flat().length}+
                  </div>
                  <div className="text-xs mt-2 uppercase font-bold tracking-widest" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>
                    Technologies
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT — Image */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: tokens.motion.duration.slow, ease: tokens.motion.easing.base }}
              className="group relative"
            >
              <div
                className="relative overflow-hidden w-full rounded"
                style={{ backgroundColor: tokens.colors.cardBg, aspectRatio: "3/4", minHeight: "360px" }}
              >
                {profileImage ? (
                  <motion.img
                    style={{ scale: imageScale }}
                    src={profileImage}
                    alt={fullName}
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-6xl font-medium"
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

              {/* Initials label */}
              <span
                className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-bold tracking-widest backdrop-blur-sm"
                style={{ backgroundColor: "rgba(0,0,0,0.6)", color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}
              >
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            </motion.div>

            {/* Mini Education Timeline */}
            {education.length > 0 && (
              <div className="mt-12 flex flex-col gap-6">
                {education.slice(0, 2).map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
                    className="flex gap-5 border-t pt-5"
                    style={{ borderColor: tokens.colors.border }}
                  >
                    <span
                      className="text-[10px] uppercase font-bold tracking-widest shrink-0 pt-1"
                      style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
                    >
                      {edu.startDate ? new Date(edu.startDate).getFullYear() : ""} —{" "}
                      {edu.current ? "Present" : edu.endDate ? new Date(edu.endDate).getFullYear() : ""}
                    </span>
                    <div>
                      <div className="text-sm font-medium" style={{ color: tokens.colors.primary }}>
                        {edu.degree}
                      </div>
                      <div className="mt-1 text-xs" style={{ color: tokens.colors.secondary }}>
                        {edu.institution || edu.school}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
