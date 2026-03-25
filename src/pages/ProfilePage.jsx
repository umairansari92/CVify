import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaLaptopCode,
  FaShieldAlt,
  FaPalette,
  FaGem,
  FaCheckCircle,
  FaRocket,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { updateUser } from "../features/auth/authSlice";
import api from "../api/axios";

// Modular Form Imports
import PersonalInfoForm from "../components/profile-forms/PersonalInfoForm";
import BrandingForm from "../components/profile-forms/BrandingForm";
import SocialLinksForm from "../components/profile-forms/SocialLinksForm";
import ExperienceManager from "../components/profile-forms/ExperienceManager";
import EducationManager from "../components/profile-forms/EducationManager";
import SkillsServicesManager from "../components/profile-forms/SkillsServicesManager";
import CredentialsManager from "../components/profile-forms/CredentialsManager";
import ProjectsManager from "../components/profile-forms/ProjectsManager";
import SecuritySettings from "../components/profile-forms/SecuritySettings";
import ThemeEditor from "../components/profile/ThemeEditor";

import ThreeBackground from "../components/three/ThreeBackground";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("identity");
  const [savingTheme, setSavingTheme] = useState(false);

  const handleThemeUpdate = async (newSettings, file = null) => {
    setSavingTheme(true);
    try {
      const formData = new FormData();
      formData.append("themeSettings", JSON.stringify(newSettings));
      if (file) formData.append("banner", file);

      const res = await api.patch("/auth/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("✨ Theme preferences synced!");
      }
    } catch (err) {
      toast.error("Failed to sync theme");
    } finally {
      setSavingTheme(false);
    }
  };

  const tabs = [
    { id: "identity", label: "Identity", icon: <FaUser />, color: "cyan" },
    { id: "branding", label: "Branding", icon: <FaRocket />, color: "violet" },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: <FaLaptopCode />,
      color: "emerald",
    },
    {
      id: "experience",
      label: "Experience",
      icon: <FaBriefcase />,
      color: "blue",
    },
    {
      id: "education",
      label: "Education",
      icon: <FaGraduationCap />,
      color: "amber",
    },
    { id: "expertise", label: "Expertise", icon: <FaTools />, color: "rose" },
    {
      id: "credentials",
      label: "Credentials",
      icon: <FaCheckCircle />,
      color: "teal",
    },
    {
      id: "security",
      label: "Security",
      icon: <FaShieldAlt />,
      color: "slate",
    },
    {
      id: "theme",
      label: "Theme Designer",
      icon: <FaPalette />,
      color: "indigo",
    },
  ];

  // Calculate Profile Completion (Simplified logic for the new UI)
  const calculateStrength = () => {
    if (!user) return 0;
    let score = 0;
    if (user.profileImage) score += 10;
    if (user.bio || user.summary) score += 15;
    if (user.experience?.length > 0) score += 20;
    if (user.projects?.length > 0) score += 20;
    if (
      user.skills?.technical?.length > 0 ||
      user.skills?.strategic?.length > 0
    )
      score += 15;
    if (user.education?.length > 0) score += 10;
    if (Object.keys(user.socialLinks || {}).length > 0) score += 10;
    return Math.min(score, 100);
  };

  const strength = calculateStrength();

  return (
    <div className="min-h-screen relative bg-background transition-colors duration-500 overflow-y-auto custom-scrollbar no-scrollbar">
      <ThreeBackground />

      {/* --- DASHBOARD HEADER --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <a
                href="https://app-cvifypro.vercel.app"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 bg-primary/5 shadow-lg shadow-primary/10 hover:scale-110 transition-all duration-500 overflow-hidden"
              >
                <img src="/CVify Favicon.jpg" alt="CVify" className="w-full h-full object-cover" />
              </a>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Builder Dashboard V5.2
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-text-main">
              Refine Your{" "}
              <span className="text-gradient italic">Digital Identity</span>.
            </h1>
            <p className="text-text-muted max-w-xl text-lg font-bold leading-relaxed opacity-70">
              Every detail you add here powers your high-impact public
              portfolio. Focus on results, not just roles.
            </p>
          </div>

          <div className="flex items-center gap-6 p-6 glass rounded-[2rem]">
            <div className="relative">
              <svg className="w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-text-main/5"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={226}
                  strokeDashoffset={226 - (226 * strength) / 100}
                  className="text-primary transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-black text-xs text-text-main">
                {strength}%
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">
                Profile Strength
              </p>
              <div className="flex items-center gap-2 text-primary font-black">
                <FaGem size={14} className="animate-bounce" />
                <span>{user?.diamonds || 0} Builder Points</span>
              </div>
            </div>
          </div>
        </div>
        {/* --- TAB NAVIGATION --- */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar no-scrollbar border-b border-border-subtle">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl whitespace-nowrap transition-all duration-300 font-black text-xs uppercase tracking-widest ${
                activeTab === tab.id
                  ? `bg-primary/10 text-primary border border-primary/30 shadow-lg`
                  : "bg-foreground/20 text-text-muted border border-border-subtle hover:bg-foreground/40 hover:text-text-main"
              }`}
            >
              <span
                className={
                  activeTab === tab.id ? `text-primary` : "text-text-muted/30"
                }
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 relative z-10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="premium-card p-6 sm:p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
        >
          {activeTab === "identity" && <PersonalInfoForm />}
          {activeTab === "branding" && (
            <div className="space-y-12">
              <BrandingForm />
              <div className="pt-12 border-t border-border-subtle">
                <SocialLinksForm />
              </div>
            </div>
          )}
          {activeTab === "portfolio" && <ProjectsManager />}
          {activeTab === "experience" && <ExperienceManager />}
          {activeTab === "education" && <EducationManager />}
          {activeTab === "expertise" && <SkillsServicesManager />}
          {activeTab === "credentials" && <CredentialsManager />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "theme" && (
            <ThemeEditor
              settings={user?.themeSettings}
              onUpdate={handleThemeUpdate}
              saving={savingTheme}
            />
          )}

          <AnimatePresence>
            {!tabs.find((t) => t.id === activeTab) && (
              <div className="text-center py-20">
                <p className="text-text-muted font-black uppercase tracking-widest italic animate-pulse opacity-20">
                  Initializing Component...
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] opacity-30">
            All edits are synchronized in real-time with your{" "}
            <a
              href={`/p/${user?.username}`}
              target="_blank"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              public portfolio website
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
