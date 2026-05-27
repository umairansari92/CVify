import React from "react";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Showcase from "./Showcase";
import Skills from "./Skills";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";
import BackgroundFX from "./BackgroundFX";

/**
 * ORIENTAL LUXE — Complete Theme Shell
 * ═════════════════════════════════════
 * This is a FULL alternative page layout.
 * It replaces ALL default CVify sections with its own
 * components that have completely different:
 *   - Layout architecture (no split-grid hero, timeline experience)
 *   - Typography (Outfit font, different size scale)
 *   - Card designs (dark flat cards with glow borders)
 *   - Animations (stagger reveals, slide-in, progress bars)
 *   - Spacing system (wider sections, more breathing room)
 *   - Background effects (khatim pattern, radial glows)
 *   - Color system (copper/gold accent on #090909 dark)
 *   - Interaction patterns (hover lift, border glow, bar fill)
 */
const OrientalLuxeTheme = ({
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
}) => {
  return (
    <div
      className="relative min-h-screen select-none"
      style={{
        backgroundColor: "#090909",
        color: "#ffffff",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* ── Ambient Background Layer ── */}
      <BackgroundFX />

      {/* ── All content is relative z-10 above the background ── */}
      <div className="relative z-10">
        {/* Full-Viewport Centered Hero */}
        <Hero
          user={user}
          isOwner={isOwner}
          handleLiveUpdate={handleLiveUpdate}
          setShowResumeModal={setShowResumeModal}
        />

        {/* Split-Column About with Photo + Bio + Stats */}
        <About
          user={user}
          isOwner={isOwner}
          handleLiveUpdate={handleLiveUpdate}
        />

        {/* Left-Aligned Vertical Timeline Experience */}
        {(isOwner || (user?.experience?.length > 0)) && (
          <Experience
            user={user}
            isOwner={isOwner}
            handleArrayUpdate={handleArrayUpdate}
          />
        )}

        {/* 2-Column Project Cards with Hover Lift */}
        {(isOwner || projects?.length > 0) && (
          <Showcase
            user={user}
            isOwner={isOwner}
            projects={projects}
            handleArrayUpdate={handleArrayUpdate}
          />
        )}

        {/* Animated Progress Bar Skills */}
        <Skills
          user={user}
          isOwner={isOwner}
          handleLiveUpdate={handleLiveUpdate}
        />

        {/* Timeline Education */}
        {(isOwner || (user?.education?.length > 0)) && (
          <Education
            user={user}
            isOwner={isOwner}
            handleArrayUpdate={handleArrayUpdate}
          />
        )}

        {/* 2-Column Contact with Form */}
        <Contact
          user={user}
          contactForm={contactForm || { name: "", email: "", subject: "", message: "" }}
          setContactForm={setContactForm || (() => {})}
          handleContactSubmit={handleContactSubmit || ((e) => e.preventDefault())}
          isSending={isSending || false}
        />

        {/* Minimal Footer */}
        <Footer user={user} />
      </div>
    </div>
  );
};

export default OrientalLuxeTheme;
