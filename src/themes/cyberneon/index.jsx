import React from "react";
import { tokens } from "./tokens";
import FloatingDevChars from "./FloatingDevChars";
import Nav from "./Nav";
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
      {/* Global heading font override for this theme */}
      <style>{`
        .cyberneon-theme h1, 
        .cyberneon-theme h2, 
        .cyberneon-theme h3,
        .cyberneon-theme h4 {
          font-family: 'Orbitron', monospace;
        }
        .cyberneon-theme p,
        .cyberneon-theme span,
        .cyberneon-theme li,
        .cyberneon-theme label,
        .cyberneon-theme input,
        .cyberneon-theme textarea {
          font-family: 'Inter', sans-serif;
        }
        .cyberneon-theme .font-mono,
        .cyberneon-theme code,
        .cyberneon-theme pre {
          font-family: 'Space Mono', monospace;
        }
      `}</style>
      <FloatingDevChars />
      
      <div className="relative z-10">
        <Nav user={user} setShowResumeModal={setShowResumeModal} />

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
