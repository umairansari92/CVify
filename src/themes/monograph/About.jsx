import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";

const About = ({ user, isOwner, handleLiveUpdate }) => {
  const bio = user?.bio || "";
  const profileImage = user?.profileImage;
  const firstName = user?.firstName || user?.name?.split(" ")?.[0] || "";
  const experience = user?.experience || [];
  const projects = user?.projects || user?.portfolio || [];
  const skills = Array.isArray(user?.skills)
    ? user.skills
    : [...(user?.skills?.technical || []), ...(user?.skills?.soft || []), ...(user?.skills?.tools || [])];

  // Derived stats — computed dynamically from real data (no hardcoding)
  const yearsOfExp = experience.length > 0
    ? Math.max(
        ...experience.map((e) => {
          const startYear = e.startDate
            ? new Date(e.startDate).getFullYear()
            : e.from
            ? parseInt(e.from)
            : new Date().getFullYear();
          return new Date().getFullYear() - startYear;
        })
      )
    : 0;

  const stats = [
    { value: yearsOfExp > 0 ? `${yearsOfExp}+` : "—", label: "Years Experience" },
    { value: projects.length > 0 ? `${projects.length}` : "—", label: "Projects Built" },
    { value: skills.length > 0 ? `${skills.length}+` : "—", label: "Technologies" },
  ];

  return (
    <section
      id="about"
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: tokens.colors.paper, color: tokens.colors.primaryText }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-20">

        {/* Left Column — Section Label */}
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
            >
              Background
            </h2>
            <h3
              className="text-3xl font-bold leading-tight mb-8"
              style={{ fontFamily: tokens.fonts.heading }}
            >
              About Me
            </h3>

            {/* Profile Image with Faded Edges */}
            <div className="relative w-full max-w-md lg:max-w-xl flex items-center justify-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={firstName || "Profile"}
                  className="relative w-full h-auto max-h-[500px] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                  style={{
                    WebkitMaskImage: "radial-gradient(closest-side, black 45%, transparent 95%)",
                    maskImage: "radial-gradient(closest-side, black 45%, transparent 95%)"
                  }}
                  loading="lazy"
                />
              ) : (
                <div
                  className="relative flex h-64 w-64 rounded-full items-center justify-center text-6xl font-bold"
                  style={{ backgroundColor: "#EFEFED", color: tokens.colors.muted }}
                >
                  {(firstName?.[0] || "?").toUpperCase()}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column — Bio + Stats */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg leading-relaxed mb-16"
            style={{ color: tokens.colors.primaryText, fontFamily: tokens.fonts.body }}
          >
            <InlineEdit
              isOwner={isOwner}
              id="mg-about-bio"
              value={bio}
              type="textarea"
              onSave={(v) => handleLiveUpdate({ bio: v })}
            >
              <p className="whitespace-pre-wrap">
                {bio || (isOwner
                  ? <span className="italic opacity-40">Click here to add your bio…</span>
                  : "A developer passionate about clean interfaces and scalable systems."
                )}
              </p>
            </InlineEdit>
          </motion.div>

          {/* Dynamic Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-8 pt-8 border-t"
            style={{ borderColor: tokens.colors.borders }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primaryText }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
