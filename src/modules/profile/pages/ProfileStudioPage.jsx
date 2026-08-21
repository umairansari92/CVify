import React, { startTransition } from "react";
import { useSelector } from "react-redux";
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
  FaChartLine,
  FaRobot,
} from "react-icons/fa";
import { ExternalLink, Sparkles, BookOpen, Layers } from "lucide-react";
import { Link } from "react-router-dom";

// Studio Forms
import PersonalInfoForm from "../../../components/profile-forms/PersonalInfoForm";
import BrandingForm from "../../../components/profile-forms/BrandingForm";
import SocialLinksForm from "../../../components/profile-forms/SocialLinksForm";
import ExperienceManager from "../../../components/profile-forms/ExperienceManager";
import EducationManager from "../../../components/profile-forms/EducationManager";
import SkillsServicesManager from "../../../components/profile-forms/SkillsServicesManager";
import CredentialsManager from "../../../components/profile-forms/CredentialsManager";
import ProjectsManager from "../../../components/profile-forms/ProjectsManager";
import SecuritySettings from "../../../components/profile-forms/SecuritySettings";
import AiSettings from "../../../components/profile-forms/AiSettings";
import ThemeEditor from "../../../components/profile/ThemeEditor";
import CareerAnalytics from "../../../components/profile/CareerAnalytics";

// Custom Hook
import { useProfileStudio } from "../hooks/useProfileStudio";

export const ProfileStudioPage = () => {
  const { user, activeTab, setActiveTab, strength, savingTheme, handleThemeUpdate } =
    useProfileStudio("identity");

  const tabs = [
    { id: "identity", label: "Identity", icon: <FaUser />, color: "cyan" },
    { id: "branding", label: "Branding", icon: <FaRocket />, color: "violet" },
    { id: "portfolio", label: "Portfolio", icon: <FaLaptopCode />, color: "emerald" },
    { id: "experience", label: "Experience", icon: <FaBriefcase />, color: "blue" },
    { id: "education", label: "Education", icon: <FaGraduationCap />, color: "amber" },
    { id: "expertise", label: "Expertise", icon: <FaTools />, color: "rose" },
    { id: "credentials", label: "Credentials", icon: <FaCheckCircle />, color: "teal" },
    { id: "security", label: "Security", icon: <FaShieldAlt />, color: "slate" },
    { id: "ai", label: "AI Chat", icon: <FaRobot />, color: "emerald" },
    { id: "theme", label: "Theme Designer", icon: <FaPalette />, color: "indigo" },
    { id: "intelligence", label: "Career Intelligence", icon: <FaChartLine />, color: "violet" },
  ];

  return (
    <div className="min-h-screen relative bg-background transition-colors duration-500 overflow-y-auto custom-scrollbar no-scrollbar">
      
      {/* ── HEADER BAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Digital Identity Studio v2.0
                </span>
              </div>

              <Link
                to="/profile"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <BookOpen className="w-3 h-3 text-[var(--primary)]" />
                <span>Interactive Field Guide</span>
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-text-main">
              Refine Your <span className="text-gradient italic">Digital Identity</span>.
            </h1>

            <p className="text-text-muted max-w-xl text-sm sm:text-base font-medium leading-relaxed opacity-80">
              Every detail you add here synchronizes in real-time with your high-impact public portfolio.
            </p>
          </div>

          {/* Strength Ring & Live Preview Link */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 p-4 sm:p-5 glass rounded-[1.5rem] border border-[var(--border)]">
              <div className="relative">
                <svg className="w-14 h-14 -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="text-text-main/5"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray={150}
                    strokeDashoffset={150 - (150 * strength) / 100}
                    className="text-primary transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xs text-text-main">
                  {strength}%
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-0.5">
                  Portfolio Completeness
                </p>
                <div className="flex items-center gap-1.5 text-primary font-black text-xs">
                  <FaGem size={12} className="animate-bounce" />
                  <span>{user?.diamonds || 0} Diamonds</span>
                </div>
              </div>
            </div>

            {user?.username && (
              <a
                href={`/p/${user.username}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 rounded-2xl bg-[var(--primary)] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[var(--primary-hover)] transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <span>Live Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* ── 11-TAB NAVIGATION BAR ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 custom-scrollbar no-scrollbar border-b border-border-subtle">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => startTransition(() => setActiveTab(tab.id))}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 font-bold text-xs uppercase tracking-wider ${
                activeTab === tab.id
                  ? `bg-primary/10 text-primary border border-primary/30 shadow-md`
                  : "bg-foreground/10 text-text-muted border border-border-subtle hover:bg-foreground/20 hover:text-text-main"
              }`}
            >
              <span className={activeTab === tab.id ? `text-primary` : "text-text-muted/50"}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 relative z-10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
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
          {activeTab === "ai" && <AiSettings />}
          {activeTab === "theme" && (
            <ThemeEditor
              settings={user?.themeSettings}
              onUpdate={handleThemeUpdate}
              saving={savingTheme}
            />
          )}
          {activeTab === "intelligence" && <CareerAnalytics />}

          <AnimatePresence>
            {!tabs.find((t) => t.id === activeTab) && (
              <div className="text-center py-20">
                <p className="text-text-muted font-black uppercase tracking-widest italic animate-pulse opacity-20">
                  Initializing Tab...
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Real-time synchronization notice */}
        <div className="mt-8 flex justify-center">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] opacity-40">
            All edits are synchronized in real-time with your{" "}
            <a
              href={`/p/${user?.username}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
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

export default ProfileStudioPage;
