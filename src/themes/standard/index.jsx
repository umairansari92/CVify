import React, { Suspense, lazy } from "react";
import ThemeBackgroundFX from "../../components/ThemeBackgroundFX";

// Critical components loaded directly
import Hero from "../../components/profile/sections/Hero";
import About from "../../components/profile/sections/About";

// Lazy loaded standard components
const Experience = lazy(() => import("../../components/profile/sections/Experience"));
const Education = lazy(() => import("../../components/profile/sections/Education"));
const Showcase = lazy(() => import("../../components/profile/sections/Showcase"));
const Skills = lazy(() => import("../../components/profile/sections/Skills"));
const Dossier = lazy(() => import("../../components/profile/sections/Dossier"));
const Interests = lazy(() => import("../../components/profile/sections/Interests"));
const Certifications = lazy(() => import("../../components/profile/sections/Certifications"));
const Testimonials = lazy(() => import("../../components/profile/sections/Testimonials"));
const Brands = lazy(() => import("../../components/profile/sections/Brands"));
const GithubStats = lazy(() => import("../../components/profile/sections/GithubStats"));
const Contact = lazy(() => import("../../components/profile/sections/Contact"));
const Footer = lazy(() => import("../../components/profile/sections/Footer"));

const StandardTheme = ({
  user,
  projects,
  isOwner,
  theme,
  displayValue,
  handleLiveUpdate,
  handleArrayUpdate,
  setShowResumeModal,
  contactForm,
  setContactForm,
  handleContactSubmit,
  isSending,
  githubData,
  githubLoading,
  dispatch,
  deleteProjectThunk,
  openProjectModalThunk,
  ensureAbsoluteUrl,
  analytics,
  personalInfo
}) => {
  return (
    <>
      <ThemeBackgroundFX themeName={theme.name} />

      <Hero 
        user={user} 
        isOwner={isOwner} 
        theme={theme} 
        displayValue={displayValue} 
        handleLiveUpdate={handleLiveUpdate} 
        analytics={analytics}
      />

      <Suspense fallback={null}>
        <GithubStats 
          githubUrl={user?.socialLinks?.github} 
          userSkills={user?.skills?.technical || user?.skills || []} 
          data={githubData}
          loading={githubLoading}
        />
      </Suspense>

      <Suspense fallback={null}>
        <Brands user={user} isOwner={isOwner} />
      </Suspense>

      <About 
        user={user} 
        isOwner={isOwner} 
        displayValue={displayValue} 
        handleLiveUpdate={handleLiveUpdate} 
        setShowResumeModal={setShowResumeModal} 
      />

      <Suspense fallback={
        <div className="py-20 text-center opacity-20 animate-pulse font-black uppercase tracking-[0.5em] text-[8px]">
          Loading Intelligence...
        </div>
      }>
        {(isOwner || (user.experience?.length > 0)) && (
          <Experience 
            user={user} 
            isOwner={isOwner} 
            displayValue={displayValue} 
            handleLiveUpdate={handleLiveUpdate} 
            handleArrayUpdate={handleArrayUpdate} 
          />
        )}

        {(isOwner || (user.projects?.length > 0) || (user.portfolio?.length > 0)) && (
          <Showcase 
            user={user} 
            isOwner={isOwner} 
            projects={projects} 
            displayValue={displayValue} 
            handleArrayUpdate={handleArrayUpdate} 
            dispatch={dispatch} 
            deleteProjectThunk={deleteProjectThunk} 
            openProjectModalThunk={openProjectModalThunk} 
          />
        )}

        {(isOwner || (Array.isArray(user.skills) ? user.skills.length > 0 : (user.skills?.technical?.length > 0)) || (user.services?.length > 0)) && (
          <Skills 
            user={user} 
            isOwner={isOwner} 
            displayValue={displayValue} 
            handleLiveUpdate={handleLiveUpdate} 
            handleArrayUpdate={handleArrayUpdate} 
            githubStats={githubData}
            projectsCount={projects.length}
          />
        )}

        {(isOwner || (user.education?.length > 0)) && (
          <Education 
            user={user} 
            isOwner={isOwner} 
            displayValue={displayValue} 
            handleLiveUpdate={handleLiveUpdate} 
            handleArrayUpdate={handleArrayUpdate} 
          />
        )}

        {(isOwner || (user.certifications?.length > 0)) && (
          <Certifications user={user} isOwner={isOwner} />
        )}

        {(isOwner || (user.achievements?.length > 0) || (user.languages?.length > 0)) && (
          <Dossier 
            user={user} 
            isOwner={isOwner} 
            displayValue={displayValue} 
            handleLiveUpdate={handleLiveUpdate} 
            handleArrayUpdate={handleArrayUpdate} 
          />
        )}

        {(isOwner || (user.testimonials?.length > 0)) && (
          <Testimonials user={user} isOwner={isOwner} handleLiveUpdate={handleLiveUpdate} displayValue={displayValue} />
        )}

        {(isOwner || (user.interests?.length > 0)) && (
          <Interests 
            user={user} 
            isOwner={isOwner} 
            displayValue={displayValue} 
            handleLiveUpdate={handleLiveUpdate} 
            handleArrayUpdate={handleArrayUpdate} 
          />
        )}

        <Contact 
          user={user} 
          isOwner={isOwner} 
          contactForm={contactForm} 
          setContactForm={setContactForm} 
          handleContactSubmit={handleContactSubmit} 
          isSending={isSending} 
          handleLiveUpdate={handleLiveUpdate} 
          ensureAbsoluteUrl={ensureAbsoluteUrl} 
        />

        <Footer personalInfo={personalInfo} />
      </Suspense>
    </>
  );
};

export default StandardTheme;
