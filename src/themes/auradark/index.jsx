import React, { useState, useEffect } from "react";
import { tokens } from "./tokens";
import { AnimatePresence } from "framer-motion";

import Loader from "./Loader";
import BackgroundFX from "./BackgroundFX";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Showcase from "./Showcase";
import Contact from "./Contact";
import Footer from "./Footer";

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
  const [loading, setLoading] = useState(true);

  // We handle the loader internally
  // If the user is just switching themes in the editor, we might not want the 2-second loader every time,
  // but for the public profile it's perfect. Let's just run it once on mount.
  useEffect(() => {
    // The loader unmounts itself when it reaches 100%, but we keep the state here to hide scrollbars during load
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: tokens.colors.background,
        color: tokens.colors.foreground,
        fontFamily: tokens.fonts.body,
        overflowX: "hidden"
      }}
    >
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Only render the actual content once loading is complete (or keep it under and fade it in) 
          Keeping it under allows the loader to slide up and reveal it! */}
      <div 
        className="relative z-10 transition-opacity duration-1000"
        style={{ opacity: loading ? 0 : 1 }}
      >
        <BackgroundFX />

        <Hero 
          user={user} 
        />
        
        <About 
          user={user} 
          setShowResumeModal={setShowResumeModal}
        />

        {/* Education & Experience */}
        <Education user={user} />
        <Experience user={user} />

        {/* Skills & Services */}
        <Skills user={user} />

        {/* Projects Showcase */}
        <Showcase projects={projects} />

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
