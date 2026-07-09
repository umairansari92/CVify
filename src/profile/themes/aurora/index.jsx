import React from "react";
import { tokens } from "./tokens.js";

const AuroraTheme = ({
  manifest,
  model,
  config,
  tokens: themeTokens,
  components,
  runtime,

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
  analytics,
}) => {
  if (!user && !model) return null;

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: tokens.colors.bg,
        color: tokens.colors.primary,
        fontFamily: tokens.fonts.body,
      }}
    >
      <div id="hero" className="min-h-screen flex items-center justify-center">
        <h1 style={{ color: tokens.colors.accent }}>
          {model?.hero?.fullName || user?.firstName || "Aurora Theme"}
        </h1>
      </div>
    </div>
  );
};

export default AuroraTheme;
