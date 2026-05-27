import React from "react";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Showcase from "./Showcase";
import Skills from "./Skills";
import BackgroundFX from "./BackgroundFX";

const OrientalLuxeTheme = ({ user, projects, isOwner, handleLiveUpdate, handleArrayUpdate, setShowResumeModal }) => {
  return (
    <div className="relative min-h-screen text-white bg-[#090909] select-none z-10">
      {/* Premium Background Shader and Backdrop FX */}
      <BackgroundFX />

      {/* Header/Title Centered Hero */}
      <Hero 
        user={user} 
        isOwner={isOwner} 
        handleLiveUpdate={handleLiveUpdate} 
        setShowResumeModal={setShowResumeModal} 
      />

      {/* Split-Grid Column-Wise Layout for About */}
      <About 
        user={user} 
        isOwner={isOwner} 
        handleLiveUpdate={handleLiveUpdate} 
      />

      {/* Spacing and Section Layout for Journey */}
      <Experience 
        user={user} 
        isOwner={isOwner} 
        handleArrayUpdate={handleArrayUpdate} 
      />

      {/* Projects Showcase cards */}
      <Showcase 
        user={user} 
        isOwner={isOwner} 
        projects={projects} 
        handleArrayUpdate={handleArrayUpdate} 
      />

      {/* 3-Column Skills alignment grid */}
      <Skills 
        user={user} 
        isOwner={isOwner} 
        handleLiveUpdate={handleLiveUpdate} 
      />
    </div>
  );
};

export default OrientalLuxeTheme;
