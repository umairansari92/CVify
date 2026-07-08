import React from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";
import { staggerContainer, staggerChild, slideFromLeft, slideFromRight } from "./animations";

/**
 * ORIENTAL LUXE — About Section
 * ──────────────────────────────
 * COMPLETELY different from default:
 * - Left-aligned "WHO I AM" subtitle + "About" heading with accent bar
 * - 2-column: photo (left, 4:5 ratio with glow border) + bio (right)
 * - 3 stat highlight cards below (icon + stat + description)
 */
const About = ({ user, isOwner, handleLiveUpdate }) => {
  const bio = user?.bio || "";
  const imageUrl = user?.profileImage;
  const experience = user?.experience || [];
  const skills = Array.isArray(user?.skills) ? user.skills : user?.skills?.technical || [];

  // Compute stat highlights
  const yearsOfExperience = experience.length > 0
    ? Math.max(...experience.map((e) => {
        const start = e.startDate ? new Date(e.startDate).getFullYear() : new Date().getFullYear();
        return new Date().getFullYear() - start;
      }))
    : 0;
  const projectCount = (user?.projects?.length || 0) + (user?.portfolio?.length || 0);
  const skillCount = skills.length;

  const stats = [
    { value: `${yearsOfExperience}+`, label: "Years Experience", desc: "Professional industry experience across multiple roles." },
    { value: `${projectCount}`, label: "Projects Built", desc: "End-to-end applications shipped and deployed." },
    { value: `${skillCount}+`, label: "Technologies", desc: "Tools, frameworks, and platforms in the toolkit." },
  ];

  return (
    <section
      id="about-ol"
      className="relative py-20 sm:py-28"
      style={{ fontFamily: tokens.fonts.primary }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header — Left Aligned with Accent Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: tokens.colors.accent }}
          >
            WHO I AM
          </p>
          <h2
            className="flex items-center gap-4 text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: tokens.colors.textPrimary }}
          >
            <span
              className="h-8 w-1 rounded-full"
              style={{ backgroundColor: tokens.colors.accent }}
            />
            About
          </h2>
        </motion.div>

        {/* 2-Column: Photo + Bio */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT — Portrait Photo */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative mx-auto w-full max-w-sm"
          >
            <div
              className="absolute -inset-1 rounded-2xl opacity-50 blur-md transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `linear-gradient(135deg, ${tokens.colors.accent}40, transparent)` }}
            />
            <div
              className="relative overflow-hidden rounded-2xl border flex items-center justify-center bg-[#121212]"
              style={{ borderColor: tokens.colors.border, aspectRatio: "4/5" }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Portrait"
                  className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-6xl"
                  style={{ backgroundColor: tokens.colors.bgCard, color: tokens.colors.accent }}
                >
                  {(user?.firstName?.[0] || "?").toUpperCase()}
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT — Bio Text */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 text-left"
          >
            <div
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: tokens.colors.textSecondary }}
            >
              <InlineEdit
                isOwner={isOwner}
                id="ol-about-bio"
                value={bio}
                type="textarea"
                onSave={(v) => handleLiveUpdate({ bio: v })}
              >
                <p className="whitespace-pre-wrap">
                  {bio || "Share your professional background, key expertise areas, and the values that drive your career..."}
                </p>
              </InlineEdit>
            </div>
          </motion.div>
        </div>

        {/* Stat Highlight Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={staggerChild}>
              <div
                className="group h-full rounded-xl border p-6 transition-all duration-300"
                style={{
                  backgroundColor: `${tokens.colors.bgSoft}99`,
                  borderColor: tokens.colors.border,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.borderHover;
                  e.currentTarget.style.boxShadow = tokens.shadows.glow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <p
                  className="text-2xl font-bold"
                  style={{ color: tokens.colors.accent }}
                >
                  {stat.value}
                </p>
                <h3
                  className="mt-1 text-lg font-semibold"
                  style={{ color: tokens.colors.textPrimary }}
                >
                  {stat.label}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: tokens.colors.textSecondary }}
                >
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Verification Proof ── */}
      {(user?.branding?.verificationStats?.atsScore || user?.branding?.verificationStats?.dataPoints) && (
        <div className="mx-auto max-w-7xl px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 md:p-12 rounded-2xl border"
            style={{ backgroundColor: `${tokens.colors.bgSoft}66`, borderColor: tokens.colors.border }}
          >
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[0.4em]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.accent }}>
                — Verification Proof
              </p>
              <p className="text-2xl font-bold uppercase tracking-widest" style={{ color: tokens.colors.textPrimary, fontFamily: tokens.fonts.primary }}>
                Verified by CVify
              </p>
            </div>

            <div className="flex items-center gap-12 md:gap-20">
              {user?.branding?.verificationStats?.atsScore && (
                <div className="text-center">
                  <p className="text-4xl font-bold" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textPrimary }}>
                    {user.branding.verificationStats.atsScore}%
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] mt-2" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>Avg. ATS Score</p>
                </div>
              )}
              {user?.branding?.verificationStats?.dataPoints && (
                <div className="text-center">
                  <p className="text-4xl font-bold" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textPrimary }}>
                    {user.branding.verificationStats.dataPoints}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] mt-2" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>Data Points</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowResumeModal && setShowResumeModal(true)}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all border"
              style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.accent, color: tokens.colors.accent, backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tokens.colors.accent; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tokens.colors.accent; }}
            >
              Access Full Professional Dossier
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default About;
