import React from "react";
import { tokens } from "./tokens";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Showcase from "./Showcase";
import Contact from "./Contact";
import Footer from "./Footer";

const TerminalDarkTheme = ({
  user,
  projects,
  isOwner,
  setShowResumeModal,
  contactForm,
  setContactForm,
  handleContactSubmit,
  isSending
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
      <div className="bg-cover bg-no-repeat bg-center">
        <Nav setShowResumeModal={setShowResumeModal} user={user} />
        <Hero user={user} isOwner={isOwner} setShowResumeModal={setShowResumeModal} />
      </div>

      <About user={user} />
      <Experience user={user} />
      <Skills user={user} />
      <Showcase projects={projects} />
      
      <div className="relative z-0">
        <Contact 
           contactForm={contactForm || { name: "", email: "", message: "" }}
           setContactForm={setContactForm || (() => {})}
           handleContactSubmit={handleContactSubmit || ((e) => e.preventDefault())}
           isSending={isSending}
        />
      </div>

      <Footer user={user} />
    </div>
  );
};

export default TerminalDarkTheme;
