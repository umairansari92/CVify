import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { tokens } from "./tokens";
import GithubStats from "../../components/profile/sections/GithubStats";
import Loader from "./Loader";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Showcase from "./Showcase";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Dossier from "./Dossier";
import Testimonials from "./Testimonials";
import Interests from "./Interests";
import Contact from "./Contact";
import Footer from "./Footer";

let loaderCompletedGlobally = false;

/**
 * AURA DARK — Complete Theme Shell
 * ═════════════════════════════════
 * Modularized & highly optimized page layout.
 * Replaces all section components with high-fidelity versions.
 */
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
  const [loading, setLoading] = useState(!loaderCompletedGlobally);
  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    loaderCompletedGlobally = true;
  }, []);

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
        {loading && <Loader onComplete={handleLoaderComplete} userName={fullName} />}
      </AnimatePresence>

      {/* Page content — hidden until loader done */}
      <div
        className="transition-opacity duration-1000"
        style={{ opacity: loading ? 0 : 1 }}
      >
        {/* Minimal hamburger nav removed — using universal premium navbar instead */}

        <Hero
          user={user}
          isOwner={isOwner}
          handleLiveUpdate={handleLiveUpdate}
          setShowResumeModal={setShowResumeModal}
        />

        {/* GitHub Insights */}
        <GithubStats
          githubUrl={user?.socialLinks?.github}
          userSkills={user?.skills?.technical || user?.skills || []}
          data={githubData}
          loading={githubLoading}
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

        <Certifications user={user} isOwner={isOwner} handleArrayUpdate={handleArrayUpdate} />

        <Dossier user={user} isOwner={isOwner} handleArrayUpdate={handleArrayUpdate} />

        <Testimonials user={user} isOwner={isOwner} handleArrayUpdate={handleArrayUpdate} />

        <Interests user={user} isOwner={isOwner} handleArrayUpdate={handleArrayUpdate} />

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
