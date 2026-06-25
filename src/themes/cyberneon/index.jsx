import React from "react";
import { tokens } from "./tokens";
import FloatingDevChars from "./FloatingDevChars";
// Nav removed — using universal premium navbar
import Hero from "./Hero";
import About from "./About";
import Resume from "./Resume";
import Showcase from "./Showcase";
import Contact from "./Contact";
import Footer from "./Footer";
import GithubStats from "../../components/profile/sections/GithubStats";

const CyberNeonTheme = ({
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
  githubLoading
}) => {
  return (
    <div
      className="cyberneon-theme relative z-0 min-h-screen selection:bg-[#00ffcc] selection:text-black"
      style={{
        backgroundColor: tokens.colors.background,
        fontFamily: "'Inter', sans-serif",
        color: tokens.colors.textMain,
        // CSS custom property so child components can reference it
        "--font-heading": "'Orbitron', monospace",
        "--font-body": "'Inter', sans-serif",
        "--font-mono": "'Space Mono', monospace",
      }}
    >
      {/* Global typography override — matches Unsha's portfolio exactly */}
      <style>{`
        /* ── h1: Hero name (72px, 900wt) ── */
        .cyberneon-theme h1 {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          letter-spacing: -1px;
          line-height: 1.1;
        }

        /* ── h2: Section titles — exactly as inspected ── */
        .cyberneon-theme h2 {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 44.8px;
          line-height: 1.6;
          color: #CDD6F4;
          margin-bottom: 20px;
          text-align: center;
          letter-spacing: normal;
        }

        /* ── h3: Sub-section/card titles ── */
        .cyberneon-theme h3 {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.4;
          color: #CDD6F4;
        }

        /* ── h4: Small headings ── */
        .cyberneon-theme h4 {
          font-family: 'Orbitron', monospace;
          font-weight: 600;
          color: #CDD6F4;
        }

        /* ── Body text — Inter ── */
        .cyberneon-theme p,
        .cyberneon-theme li,
        .cyberneon-theme label {
          font-family: 'Inter', sans-serif;
        }

        /* ── Inputs/forms ── */
        .cyberneon-theme input,
        .cyberneon-theme textarea,
        .cyberneon-theme select {
          font-family: 'Inter', sans-serif;
        }

        /* ── Monospace elements ── */
        .cyberneon-theme code,
        .cyberneon-theme pre,
        .cyberneon-theme .font-mono {
          font-family: 'Space Mono', monospace;
        }

        /* ── Neon accent spans inside headings ── */
        .cyberneon-theme h2 span.neon,
        .cyberneon-theme h3 span.neon {
          color: #00ffcc;
        }
      `}</style>
      <FloatingDevChars />
      
      <div className="relative z-10">
        {/* Nav removed — using universal premium navbar */}

        <Hero
          user={user}
          isOwner={isOwner}
          handleLiveUpdate={handleLiveUpdate}
          setShowResumeModal={setShowResumeModal}
        />

        {/* GitHub Stats */}
        <GithubStats
          githubUrl={user?.socialLinks?.github}
          userSkills={user?.skills?.technical || user?.skills || []}
          data={githubData}
          loading={githubLoading}
        />

        <About user={user} isOwner={isOwner} handleLiveUpdate={handleLiveUpdate} />

        {/* Unified Resume Section (Tabs for Experience, Education, Skills) */}
        <Resume 
          user={user} 
          isOwner={isOwner} 
          handleArrayUpdate={handleArrayUpdate} 
          handleLiveUpdate={handleLiveUpdate}
        />

        {(isOwner || projects?.length > 0) && (
          <Showcase
            projects={projects}
            isOwner={isOwner}
            handleArrayUpdate={handleArrayUpdate}
          />
        )}

        <Contact
          user={user}
          contactForm={contactForm || { name: "", email: "", message: "" }}
          setContactForm={setContactForm || (() => {})}
          handleContactSubmit={handleContactSubmit || ((e) => e.preventDefault())}
          isSending={isSending}
        />

        <Footer user={user} />
      </div>
    </div>
  );
};

export default CyberNeonTheme;
