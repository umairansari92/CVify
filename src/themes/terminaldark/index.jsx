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
      <Nav setShowResumeModal={setShowResumeModal} user={user} />
      <Hero user={user} isOwner={isOwner} setShowResumeModal={setShowResumeModal} />

      {/* GitHub Stats */}
      <GithubStats
        githubUrl={user?.socialLinks?.github}
        userSkills={user?.skills?.technical || user?.skills || []}
        data={githubData}
        loading={githubLoading}
      />

      <About user={user} />
      <Experience user={user} />
      <Education user={user} />
      <Skills user={user} />
      <Showcase projects={projects} />
      
      <Contact 
         contactForm={contactForm || { name: "", email: "", message: "" }}
         setContactForm={setContactForm || (() => {})}
         handleContactSubmit={handleContactSubmit || ((e) => e.preventDefault())}
         isSending={isSending}
      />

      <Footer user={user} />
    </div>
  );
};

export default TerminalDarkTheme;
