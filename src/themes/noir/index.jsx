import React from "react";
import CursorFX from "./CursorFX";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Showcase from "./Showcase";
import Certifications from "./Certifications";
import Testimonials from "./Testimonials";
import Dossier from "./Dossier";
import Interests from "./Interests";
import Contact from "./Contact";
import Footer from "./Footer";
import GithubStats from "../../components/profile/sections/GithubStats";
import { tokens } from "./tokens";

/**
 * NOIR — Flagship Dark Minimal Theme
 * Props mirror those passed from PublicProfile.jsx
 */
const NoirTheme = ({
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
  if (!user) return null;

  return (
    <div
      className="min-h-screen relative font-sans antialiased"
      style={{
        backgroundColor: tokens.colors.bg,
        color: tokens.colors.primary,
        fontFamily: tokens.fonts.body,
        cursor: "none",
      }}
    >
      {/* Custom Pointer (Desktop only) */}
      <CursorFX />

      <main className="relative z-10 flex flex-col">
        <Hero
          user={user}
          isOwner={isOwner}
          handleLiveUpdate={handleLiveUpdate}
          setShowResumeModal={setShowResumeModal}
        />

        {/* GitHub Stats */}
        <GithubStats
          githubUrl={user?.socialLinks?.github}
          userSkills={Array.isArray(user?.skills) ? user.skills : user?.skills?.technical || []}
          data={githubData}
          loading={githubLoading}
        />

        <About
          user={user}
          isOwner={isOwner}
          handleLiveUpdate={handleLiveUpdate}
        />

        {(isOwner || user?.experience?.length > 0) && (
          <Experience
            user={user}
            isOwner={isOwner}
            handleArrayUpdate={handleArrayUpdate}
          />
        )}

        {(isOwner || user?.education?.length > 0) && (
          <Education
            user={user}
            isOwner={isOwner}
            handleArrayUpdate={handleArrayUpdate}
          />
        )}

        <Skills user={user} isOwner={isOwner} />

        {(isOwner || projects?.length > 0) && (
          <Showcase
            user={user}
            isOwner={isOwner}
            projects={projects}
            handleArrayUpdate={handleArrayUpdate}
          />
        )}

        <Certifications
          user={user}
          isOwner={isOwner}
          handleArrayUpdate={handleArrayUpdate}
        />

        <Testimonials
          user={user}
          isOwner={isOwner}
          handleArrayUpdate={handleArrayUpdate}
        />

        <Dossier
          user={user}
          isOwner={isOwner}
          setShowResumeModal={setShowResumeModal}
        />

        <Interests
          user={user}
          isOwner={isOwner}
          handleArrayUpdate={handleArrayUpdate}
        />

        <Contact
          user={user}
          contactForm={contactForm || { name: "", email: "", subject: "", message: "" }}
          setContactForm={setContactForm || (() => {})}
          handleContactSubmit={handleContactSubmit || ((e) => e.preventDefault())}
          isSending={isSending || false}
        />
      </main>

      <Footer user={user} />
    </div>
  );
};

export default NoirTheme;
