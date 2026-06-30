import React from "react";
import { tokens } from "./tokens";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Showcase from "./Showcase";
import Contact from "./Contact";
import Footer from "./Footer";
import GithubStats from "../../components/profile/sections/GithubStats";

const TerminalDarkTheme = ({
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
      className="relative z-0 min-h-screen selection:bg-[#915eff] selection:text-white"
      style={{
        backgroundColor: tokens.colors.background,
        fontFamily: tokens.fonts.body,
        color: tokens.colors.primary,
      }}
    >
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

      {(isOwner || user?.experience?.length > 0) && (
        <Experience user={user} isOwner={isOwner} handleArrayUpdate={handleArrayUpdate} />
      )}

      {(isOwner || user?.education?.length > 0) && (
        <Education user={user} isOwner={isOwner} handleArrayUpdate={handleArrayUpdate} />
      )}

      <Skills user={user} isOwner={isOwner} handleLiveUpdate={handleLiveUpdate} />

      {(isOwner || projects?.length > 0) && (
        <Showcase
          projects={projects}
          isOwner={isOwner}
          handleArrayUpdate={handleArrayUpdate}
        />
      )}

      <Contact
        user={user}
        contactForm={contactForm || { name: "", email: "", subject: "", message: "" }}
        setContactForm={setContactForm || (() => {})}
        handleContactSubmit={handleContactSubmit || ((e) => e.preventDefault())}
        isSending={isSending}
      />

      <Footer user={user} />
    </div>
  );
};

export default TerminalDarkTheme;
