import React from "react";
import { tokens } from "./tokens";
import Hero from "./Hero";
import About from "./About";
import Resume from "./Resume";
import Showcase from "./Showcase";
import Contact from "./Contact";
import Footer from "./Footer";
import GithubStats from "../../components/profile/sections/GithubStats";

const MonographTheme = ({
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
      className="relative z-0 min-h-screen overflow-x-hidden selection:bg-black selection:text-white"
      style={{
        backgroundColor: tokens.colors.paper,
        fontFamily: tokens.fonts.body,
        color: tokens.colors.primaryText,
      }}
    >
      <Hero
        user={user}
        isOwner={isOwner}
        handleLiveUpdate={handleLiveUpdate}
        setShowResumeModal={setShowResumeModal}
      />

      <About user={user} isOwner={isOwner} handleLiveUpdate={handleLiveUpdate} />

      {(isOwner || user?.experience?.length > 0 || user?.education?.length > 0) && (
        <Resume user={user} isOwner={isOwner} handleArrayUpdate={handleArrayUpdate} />
      )}

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

export default MonographTheme;
