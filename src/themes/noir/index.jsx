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
import { tokens } from "./tokens";

const NoirTheme = ({ user, isOwner }) => {
  if (!user) return null;

  return (
    <div 
      className="min-h-screen relative font-sans antialiased" 
      style={{ 
        backgroundColor: tokens.colors.bg, 
        color: tokens.colors.primary,
        fontFamily: tokens.fonts.body
      }}
    >
      {/* Custom Pointer (Desktop only) */}
      <CursorFX />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero user={user} isOwner={isOwner} />
        <About user={user} isOwner={isOwner} />
        <Experience user={user} isOwner={isOwner} />
        <Education user={user} isOwner={isOwner} />
        <Skills user={user} isOwner={isOwner} />
        <Showcase user={user} isOwner={isOwner} />
        <Certifications user={user} isOwner={isOwner} />
        <Testimonials user={user} isOwner={isOwner} />
        <Dossier user={user} isOwner={isOwner} />
        <Interests user={user} isOwner={isOwner} />
        <Contact user={user} isOwner={isOwner} />
      </main>

      <Footer user={user} />
    </div>
  );
};

export default NoirTheme;
