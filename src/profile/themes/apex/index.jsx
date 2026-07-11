import React, { useMemo } from "react";
import { tokens } from "./tokens";
import GithubStats from "../../../components/profile/sections/GithubStats";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Showcase from "./Showcase";
import Certifications from "./Certifications";
import Testimonials from "./Testimonials";
import Interests from "./Interests";
import Dossier from "./Dossier";
import Contact from "./Contact";
import Footer from "./Footer";

const ApexTheme = ({
  // Core Engine v4.0 Props
  manifest,
  model,
  config,
  tokens: themeTokens,
  components,
  runtime,

  // Legacy Compatibility Props
  user,
  projects,
  isOwner,
  theme,
  displayValue,
  ensureAbsoluteUrl,
  personalInfo,
  deleteProjectThunk,
  openProjectModalThunk,
  dispatch,
  handleLiveUpdate,
  handleArrayUpdate,
  setShowResumeModal,
  contactForm,
  setContactForm,
  handleContactSubmit,
  isSending,
  githubData,
  githubLoading,
  analytics,
}) => {
  if (!user && !model) return null;

  const githubUrl = user?.socialLinks?.github;
  const userSkills = useMemo(() => {
    if (Array.isArray(user?.skills)) return user.skills.map((s) => s?.name || s).filter(Boolean);
    if (user?.skills && typeof user.skills === "object") {
      return [...(user.skills.technical || []), ...(user.skills.soft || []), ...(user.skills.strategic || [])];
    }
    return [];
  }, [user?.skills]);

  return (
    <div
      className="relative z-0 min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: tokens.colors.bg,
        fontFamily: tokens.fonts.body,
        color: tokens.colors.primary,
      }}
    >
      <Hero
        user={user}
        isOwner={isOwner}
        handleLiveUpdate={handleLiveUpdate}
        setShowResumeModal={setShowResumeModal}
      />

      <About
        user={user}
        isOwner={isOwner}
        handleLiveUpdate={handleLiveUpdate}
      />

      <GithubStats
        githubUrl={githubUrl}
        userSkills={userSkills}
        data={githubData}
        loading={githubLoading}
      />

      {(isOwner || (Array.isArray(user?.experience) && user.experience.length > 0)) && (
        <Experience
          user={user}
          isOwner={isOwner}
          handleArrayUpdate={handleArrayUpdate}
        />
      )}

      {(isOwner || (Array.isArray(user?.education) && user.education.length > 0)) && (
        <Education
          user={user}
          isOwner={isOwner}
          handleArrayUpdate={handleArrayUpdate}
        />
      )}

      <Skills user={user} isOwner={isOwner} />

      {(isOwner || (Array.isArray(projects) && projects.length > 0)) && (
        <Showcase
          projects={projects}
          isOwner={isOwner}
          handleArrayUpdate={handleArrayUpdate}
        />
      )}

      {(isOwner || (Array.isArray(user?.certifications) && user.certifications.length > 0)) && (
        <Certifications
          user={user}
          isOwner={isOwner}
          handleArrayUpdate={handleArrayUpdate}
        />
      )}

      {(isOwner || (Array.isArray(user?.testimonials) && user.testimonials.length > 0)) && (
        <Testimonials
          user={user}
          isOwner={isOwner}
          handleArrayUpdate={handleArrayUpdate}
        />
      )}

      {(isOwner || (Array.isArray(user?.interests) && user.interests.length > 0)) && (
        <Interests
          user={user}
          isOwner={isOwner}
          handleArrayUpdate={handleArrayUpdate}
        />
      )}

      <Dossier
        user={user}
        isOwner={isOwner}
        setShowResumeModal={setShowResumeModal}
      />

      <Contact
        user={user}
        contactForm={contactForm || { name: "", email: "", subject: "", message: "" }}
        setContactForm={setContactForm || (() => {})}
        handleContactSubmit={handleContactSubmit || ((e) => e?.preventDefault?.())}
        isSending={isSending || false}
      />

      <Footer user={user} />
    </div>
  );
};

export default React.memo(ApexTheme);
