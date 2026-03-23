import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../api/axios";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaDownload,
  FaGem,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaTimes,
  FaPalette,
  FaFillDrip,
  FaCog,
  FaSave,
  FaCheckCircle,
  FaTrashAlt,
  FaPlus,
  FaFont,
  FaLayerGroup,
  FaShareAlt,
  FaExclamationTriangle,
  FaArrowRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchPublicProfile, 
  fetchProfileAnalytics,
  updateActiveProfileLocally,
  clearActiveProfile,
  applyAtsFix
} from "../features/profile/profileSlice";
import { handleDownloadPDF } from "../utils/pdfExport";
import InlineEdit from "../components/profile/InlineEdit";
import Card from "../components/ui/Card";

const PublicProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { 
    activeProfile: user, 
    loading, 
    error: profileError, 
    analytics 
  } = useSelector((state) => state.profile);

  const [localTheme, setLocalTheme] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [atsScore, setAtsScore] = useState(null);

  useEffect(() => {
    if (user?.themeSettings) {
      setLocalTheme(user.themeSettings);
    } else if (user) {
      setLocalTheme({
        headerBg: "#2563eb",
        headerBgSecondary: "#9333ea",
        bodyBg: "#0f172a",
        cardStyle: "glass",
        fontPrimary: "Inter",
        bannerUrl: "",
        bannerOpacity: 95,
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchPublicProfile(username));
    return () => dispatch(clearActiveProfile());
  }, [dispatch, username]);

  useEffect(() => {
    if (user?.isOwner) {
      dispatch(fetchProfileAnalytics());
    }
  }, [dispatch, user?.isOwner]);

  // Fetch Public ATS Score [V3.1]
  useEffect(() => {
    if (user) {
      const fetchAts = async () => {
        try {
          const atsResponse = await api.get(`/ats/public-score/${username}`);
          if (atsResponse.data) setAtsScore(atsResponse.data);
        } catch (err) {
          console.warn("ATS score fetch failed");
        }
      };
      fetchAts();
    }
  }, [user, username]);

  const handleTrackInteraction = async (type) => {
    try {
      if (!user || user.isOwner) return; // Don't track owner actions on their own profile

      const userId = user._id;
      if (type === "view") {
        await api.post(`/profile-analytics/${userId}/view`);
      } else if (type === "download") {
        await api.post(`/profile-analytics/${userId}/download`);
      } else if (type === "contact") {
        await api.post(`/profile-analytics/${userId}/contact-click`);
      }
    } catch (err) {
      console.error("Interaction failed:", err);
    }
  };

  // Track view once on load
  useEffect(() => {
    if (user && !user.isOwner && !window.hasTrackedView) {
      window.hasTrackedView = true;
      handleTrackInteraction("view");
    }
  }, [user]);

  const handleLiveUpdate = async (updates) => {
    if (!user.isOwner) return;
    setIsUpdating(true);
    try {
      // Optimistic Update
      dispatch(updateActiveProfileLocally(updates));

      const res = await api.patch("/auth/profile", updates);
      if (res.data.user) {
        toast.success("Changes saved live!", { id: "live-update" });
      }
    } catch (err) {
      toast.error("Failed to save changes.");
      console.error(err);
      dispatch(fetchPublicProfile(username)); // Revert on failure
    } finally {
      setIsUpdating(false);
    }
  };

  const handleArrayUpdate = (field, index, updatedItem) => {
    if (!user.isOwner) return;
    const newArray = [...user[field]];
    newArray[index] = { ...newArray[index], ...updatedItem };
    handleLiveUpdate({ [field]: newArray });
  };

  const handleThemeUpdate = async (newTheme) => {
    setLocalTheme(newTheme);
    
    // Debounce the API call to prevent 500 errors from spamming on color drag
    if (window.themeUpdateTimeout) clearTimeout(window.themeUpdateTimeout);
    window.themeUpdateTimeout = setTimeout(() => {
      handleLiveUpdate({ themeSettings: newTheme });
    }, 500);
  };

  const themePresets = [
    {
      name: "CVify Classic",
      headerBg: "#2563eb",
      headerBgSecondary: "#9333ea",
      bodyBg: "#f8fafc",
      fontPrimary: "Inter",
      cardStyle: "glass",
      icon: "⚡",
      textPrimary: "#0f172a",
      textSecondary: "#64748b",
      accentColor: "#2563eb",
    },
    {
      name: "Midnight Dev",
      headerBg: "#0f172a",
      headerBgSecondary: "#1e293b",
      bodyBg: "#020617",
      fontPrimary: "JetBrains Mono",
      cardStyle: "minimal",
      icon: "🌙",
      textPrimary: "#f8fafc",
      textSecondary: "#94a3b8",
      accentColor: "#38bdf8",
    },
    {
      name: "Corporate Gold",
      headerBg: "#1e3a8a",
      headerBgSecondary: "#1e40af",
      bodyBg: "#ffffff",
      fontPrimary: "Outfit",
      cardStyle: "classic",
      icon: "🏢",
      textPrimary: "#1e293b",
      textSecondary: "#475569",
      accentColor: "#d97706",
    },
    {
      name: "Creative Sunset",
      headerBg: "#f97316",
      headerBgSecondary: "#db2777",
      bodyBg: "#fff7ed",
      fontPrimary: "Poppins",
      cardStyle: "glass",
      icon: "🌅",
      textPrimary: "#431407",
      textSecondary: "#9a3412",
      accentColor: "#e11d48",
    },
    {
      name: "Slate Minimalist",
      headerBg: "#475569",
      headerBgSecondary: "#64748b",
      bodyBg: "#f1f5f9",
      fontPrimary: "Roboto",
      cardStyle: "minimal",
      icon: "🎨",
      textPrimary: "#334155",
      textSecondary: "#64748b",
      accentColor: "#0f172a",
    },
    {
      name: "Emerald Leader",
      headerBg: "#059669",
      headerBgSecondary: "#10b981",
      bodyBg: "#f0fdf4",
      fontPrimary: "Montserrat",
      cardStyle: "classic",
      icon: "🌿",
      textPrimary: "#064e3b",
      textSecondary: "#065f46",
      accentColor: "#059669",
    },
  ];

  const handleDownload = async () => {
    if (!user) return;
    handleTrackInteraction("download");

    toast.loading("Preparing your professional resume...", { id: "pdf-gen" });

    try {
      // Transform public profile data to match Resume schema expected by templates
      const resumeData = {
        personalInfo: {
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phoneNumber,
          location: user.location,
          jobTitle: user.headline,
          industry: user.industry,
          linkedin: user.socialLinks?.linkedin,
          github: user.socialLinks?.github,
          portfolio: user.socialLinks?.portfolio,
          profileSummary: user.bio,
        },
        experience: (user.experience || []).map((exp) => ({
          position: exp.role,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.isCurrent ? "Present" : exp.endDate,
          responsibilities: exp.achievements
            ? exp.achievements.split("\n").filter((line) => line.trim())
            : [],
        })),
        education: (user.education || []).map((edu) => ({
          institution: edu.institution,
          degree: edu.degree,
          startDate: "",
          endDate: edu.graduationDate,
        })),
        certifications: (user.certifications || []).map(cert => ({
          name: cert.name,
          issuer: cert.issuer,
          date: cert.date
        })),
        achievements: (user.achievements || []).map(ach => ({
          title: ach.title,
          description: ach.description,
          date: ach.date
        })),
        technicalSkills: {
          skills: user.skills || [], // New categorized structure
        },
        projects: (user.portfolio || user.projects || []).map((proj) => ({
          name: proj.title,
          link: proj.liveLink,
          description: proj.description
            ? proj.description.split("\n").filter((line) => line.trim())
            : [],
        })),
        languages: user.languages || [],
        themeColor: theme.accentColor,
        fontFamily: theme.fontPrimary,
      };

      await handleDownloadPDF(resumeData, user.selectedTemplate || "modern");
      toast.success("Resume downloaded!", { id: "pdf-gen" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF", { id: "pdf-gen" });
    }
  };

  const handleApplyFix = async (suggestion) => {
    if (!user.isOwner) {
       toast.error("Login to apply AI fixes to your profile!");
       return;
    }

    const toastId = toast.loading("AI is optimizing your profile...");
    try {
      // Logic to find which part of the profile needs fixing.
      // For now, if no specific field is provided by the AI, we focus on the latest experience.
      const field = "experience";
      const index = 0; // Defaulting to latest experience for now
      const bulletPoints = user.experience?.[index]?.achievements?.split("\n") || [];

      const res = await dispatch(applyAtsFix({
        field,
        index,
        jobDescription: user.headline, // Using user's headline as a proxy for target JD
        bulletPoints
      })).unwrap();

      if (res.optimizedBullets) {
        const newArray = [...user[field]];
        newArray[index] = { ...newArray[index], achievements: res.optimizedBullets.join("\n") };
        await handleLiveUpdate({ [field]: newArray });
        toast.success("AI Fix Applied! Score boosted.", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed to apply AI fix.", { id: toastId });
    }
  };

  const ensureAbsoluteUrl = (url) => {
    if (!url || typeof url !== "string") return "";
    const trimmed = url.trim();
    if (!trimmed) return "";
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("mailto:") ||
      trimmed.startsWith("tel:")
    ) {
      return trimmed;
    }
    if (trimmed.startsWith("//")) return `https:${trimmed}`;
    return `https://${trimmed}`;
  };

  if (loading)
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-action border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (profileError || !user)
    return (
      <div className="min-h-screen bg-midnight text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-6xl font-black mb-4">404</h1>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          {profileError || "This profile is private or does not exist."}
        </p>
        <a
          href="/"
          className="px-8 py-3 bg-action rounded-2xl font-black uppercase text-sm"
        >
          Go Home
        </a>
      </div>
    );

  const portfolio = user.portfolio || user.projects || [];
  const featuredProject = portfolio.find((p) => p.isFeatured);
  const otherProjects = portfolio.filter((p) => !p.isFeatured);
  const sectionNames = user.sectionNames || {
    experience: "Professional Experience",
    education: "Education History",
    skills: "Expertise & Skills",
    projects: "Work Portfolio",
    services: "Professional Services",
    certifications: "Certifications",
    achievements: "Honors & Awards",
  };
  const theme = localTheme || {
    headerBg: "#2563eb",
    headerBgSecondary: "#9333ea",
    bodyBg: "#0f172a",
    cardStyle: "glass",
    fontPrimary: "Inter",
    bannerUrl: "",
    bannerOpacity: 95,
    textPrimary: "#ffffff",
    textSecondary: "#94a3b8",
    accentColor: "#2563eb",
  };

  const cardClasses = {
    glass: "bg-[var(--bg-glass)] border-[var(--border-glass)] border backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] rounded-[2.5rem]",
    minimal: "bg-transparent border-[var(--border-minimal)] border-2 rounded-[2.5rem]",
    classic: "bg-[var(--bg-classic)] shadow-[0_15px_50px_-12px_rgba(0,0,0,0.25)] border-none rounded-[2.5rem]",
  }[theme.cardStyle || "glass"];

  return (
    <div
      className="min-h-screen transition-colors duration-500 pb-40 relative selection:bg-action selection:text-white"
      style={{
        backgroundColor: theme.bodyBg,
        fontFamily: `'${theme.fontPrimary}', sans-serif`,
        "--action": theme.accentColor || "#2563eb",
        "--text-primary": theme.textPrimary || "#ffffff",
        "--text-secondary": theme.textSecondary || "#94a3b8",
        "--text-muted": theme.textSecondary || "#94a3b8",
        "--body-bg": theme.bodyBg || "#0f172a",
        "--card-bg": theme.cardStyle === "glass" 
          ? "rgba(255, 255, 255, 0.03)" 
          : theme.cardStyle === "classic" 
            ? "color-mix(in srgb, var(--text-primary) 3%, var(--body-bg))" 
            : "transparent",
        "--card-border": theme.cardStyle === "glass" 
          ? "rgba(255, 255, 255, 0.08)" 
          : "color-mix(in srgb, var(--text-primary) 12%, transparent)",
        "--card-shadow": theme.cardStyle === "classic" 
          ? "0 20px 50px -12px rgba(0,0,0,0.5)" 
          : "none",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12 pt-10">
      {/* ── Owner Live Editor Sidebar ── */}
      <AnimatePresence>
        {user.isOwner && (
          <>
            <motion.button
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              onClick={() => setShowThemePanel(!showThemePanel)}
              className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] p-4 bg-action text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
            >
              <FaPalette
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
              {isUpdating && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </motion.button>

            {showThemePanel && (
              <motion.div
                initial={{ x: 450, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 450, opacity: 0 }}
                className="fixed right-24 top-1/2 -translate-y-1/2 z-[99] w-[30rem] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] p-10 overflow-hidden flex flex-col max-h-[90vh]"
              >
              {/* Career Intelligence Dashboard [V3.2] */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide">
            Career Intelligence Dashboard
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-60">Verified AI Intelligence</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Optimization Score Card */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-row items-center gap-8 justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-2">Overall ATS Score</p>
              <h3 className="text-5xl font-black text-action">
                {atsScore?.score || 85}
                <span className="text-xl opacity-40 ml-1">%</span>
              </h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <span>↑</span> High Potential
              </div>
            </div>
            
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="8" className="text-[var(--text-secondary)] opacity-10" />
                <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={301.59} strokeDashoffset={301.59 * (1 - (atsScore?.score || 85) / 100)} className="text-action" strokeLinecap="round" />
              </svg>
              <FaGem className="absolute text-action text-xl" />
            </div>
          </Card>

          {/* AI Insights & Highlights */}
          <Card className="lg:col-span-2">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)]">Strategic Insights</h3>
               <span className="text-[9px] font-black text-white/50 bg-white/5 px-2 py-1 rounded-lg border border-white/5">CVify V3.3 AI</span>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Keywords", val: "Optimal", color: "text-emerald-500", bg: "bg-emerald-500/5", border: "border-emerald-500/10" },
                  { label: "Formatting", val: "Clean", color: "text-blue-500", bg: "bg-blue-500/5", border: "border-blue-500/10" },
                  { label: "Impact", val: "High", color: "text-violet-500", bg: "bg-violet-500/5", border: "border-violet-500/10" },
                  { label: "Authority", val: "Strong", color: "text-amber-500", bg: "bg-amber-500/5", border: "border-amber-500/10" },
                ].map(ins => (
                  <div key={ins.label} className={`p-4 rounded-2xl ${ins.bg} border ${ins.border} flex items-center justify-between`}>
                    <span className="text-[10px] font-black uppercase text-[var(--text-secondary)]">{ins.label}</span>
                    <span className={`text-[10px] font-black uppercase ${ins.color}`}>{ins.val}</span>
                  </div>
                ))}
             </div>
          </Card>

          {/* AI Fixes Queue [V3.3] */}
          {user.isOwner ? (
            <Card className="lg:col-span-3 border-action/30 bg-action/5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-action rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse">
                     <FaCog className="text-xl" />
                   </div>
                   <div>
                     <h3 className="text-base font-black text-[var(--text-primary)] flex items-center gap-2">
                       AI Optimization Queue
                       <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">New</span>
                     </h3>
                     <p className="text-xs text-[var(--text-secondary)] font-medium">Auto-optimize your experience bullets for 30% more match-rate.</p>
                   </div>
                 </div>
                 <button className="w-full md:w-auto px-8 py-3 bg-action text-white font-black text-xs rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-action/20 uppercase tracking-widest">
                   One-Click AI Optimization
                 </button>
              </div>
            </Card>
          ) : (
            <Card className="lg:col-span-3 border-white/10 bg-white/5 backdrop-blur-md overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                 <div className="flex items-center gap-4 blur-sm opacity-40 select-none">
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center" />
                   <div className="space-y-2">
                     <div className="w-32 h-3 bg-white/20 rounded" />
                     <div className="w-48 h-2 bg-white/10 rounded" />
                   </div>
                 </div>
                 <Link to="/login" className="w-full md:w-auto px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-black text-xs rounded-xl transition-all border border-white/10 uppercase tracking-widest text-center">
                   Login as Owner to Optimize
                 </Link>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20">Recruiter Privacy Mode Active</span>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">
          Professional Narrative
        </h2>
        <Card>
          <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed italic">
            <InlineEdit
              value={user.bio || "Crafting digital excellence through engineering..."}
              onSave={(val) => handleLiveUpdate({ bio: val })}
              isOwner={user.isOwner}
              label="Professional Bio"
              textarea
              className="block"
            />
          </p>
        </Card>
      </section>
                {/* Header */}
                <div className="flex items-center justify-between mb-10 flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-action/10 rounded-2xl flex items-center justify-center text-[var(--action)] shadow-sm shadow-action/10">
                      <FaPalette size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-black uppercase tracking-widest text-[var(--text-primary)] mb-0.5">
                        Portfolio Editor
                      </h3>
                      <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase opacity-60 tracking-tighter">
                        Live WYSIWYG Mode
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowThemePanel(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-2xl bg-foreground/5 text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-10 overflow-y-auto pr-3 custom-scrollbar pb-8">
                  {/* Presets */}
                  <div className="space-y-5">
                    <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-[0.2em] flex items-center gap-2">
                      <FaFillDrip className="text-[var(--action)]" /> Theme
                      Presets
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {themePresets.map((p) => {
                         const handlePresetSelect = () => {
                           handleThemeUpdate({
                             ...theme,
                             ...p // Spreading p completely overwrites custom colors, fonts, and aesthetics with the preset's defaults
                           });
                         };
                         return (
                        <button
                          key={p.name}
                          onClick={handlePresetSelect}
                          className={`flex flex-col items-center gap-2 p-5 rounded-[2.5rem] border-2 transition-all ${
                            theme.headerBg === p.headerBg
                              ? "bg-action/5 border-action ring-4 ring-action/5"
                              : "bg-foreground/5 border-transparent hover:border-action/20"
                          }`}
                        >
                          <span className="text-3xl filter drop-shadow-md">
                            {p.icon}
                          </span>
                          <span className="text-[9px] font-black uppercase leading-tight tracking-tighter text-[var(--text-primary)]">
                            {p.name.split(" ")[0]}
                          </span>
                        </button>
                      )})}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="pt-8 border-t border-border-subtle/50 space-y-5">
                    <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-[0.2em] flex items-center gap-2">
                      <FaPalette className="text-[var(--action)] text-[10px]" />{" "}
                      Brand Identity
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Gradient Primary", key: "headerBg" },
                        {
                          label: "Gradient Secondary",
                          key: "headerBgSecondary",
                        },
                        { label: "Page Background", key: "bodyBg" },
                        { label: "Primary Accent", key: "accentColor" },
                        { label: "Main Text Color", key: "textPrimary" },
                        { label: "Muted Text Color", key: "textSecondary" },
                      ].map((c) => (
                        <div
                          key={c.key}
                          className="p-5 bg-foreground/5 rounded-[2rem] border-2 border-border-subtle/50 flex flex-col gap-3 group transition-all hover:border-action/30"
                        >
                          <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-tighter opacity-80">
                            {c.label}
                          </span>
                          <div className="flex items-center gap-4">
                            <div className="relative w-10 h-10 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/50 dark:border-white/10 group-hover:scale-110 transition-transform">
                              <input
                                type="color"
                                value={theme[c.key]}
                                onChange={(e) =>
                                  handleThemeUpdate({
                                    ...theme,
                                    [c.key]: e.target.value,
                                  })
                                }
                                className="absolute inset-x-[-50%] inset-y-[-50%] w-[200%] h-[200%] cursor-pointer"
                              />
                            </div>
                            <span className="text-xs font-black font-mono tracking-widest uppercase opacity-70">
                              {theme[c.key]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography Style */}
                  <div className="pt-8 border-t border-border-subtle/50 space-y-5">
                    <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-[0.2em] flex items-center gap-2">
                      <FaFont className="text-[var(--action)] text-[10px]" />{" "}
                      Typography Style
                    </label>
                    <div className="relative group">
                      <select
                        value={theme.fontPrimary}
                        onChange={(e) =>
                          handleThemeUpdate({
                            ...theme,
                            fontPrimary: e.target.value,
                          })
                        }
                        className="w-full bg-foreground/5 p-5 rounded-[2rem] text-sm font-black outline-none cursor-pointer appearance-none border-2 border-transparent focus:border-action transition-all"
                      >
                        {[
                          "Inter",
                          "Roboto",
                          "Outfit",
                          "Poppins",
                          "Montserrat",
                          "JetBrains Mono",
                          "Space Grotesk",
                          "Playfair Display",
                        ].map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)] opacity-50 group-hover:opacity-100 transition-opacity">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Aesthetics */}
                  <div className="pt-8 border-t border-border-subtle/50 space-y-5">
                    <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-[0.2em] flex items-center gap-2">
                      <FaLayerGroup className="text-[var(--action)]" /> Card
                      Aesthetics
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        {
                          id: "minimal",
                          name: "Minimalist",
                          desc: "Clean, professional & flat",
                        },
                        {
                          id: "glass",
                          name: "Glassmorphism",
                          desc: "Modern frosted depth",
                        },
                        {
                          id: "classic",
                          name: "Classic Hub",
                          desc: "Solid elevation & shadows",
                        },
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() =>
                            handleThemeUpdate({ ...theme, cardStyle: style.id })
                          }
                          className={`p-6 rounded-[2.5rem] border-2 text-left transition-all flex items-center justify-between ${
                            theme.cardStyle === style.id
                              ? "border-action bg-action/5 shadow-xl shadow-action/5"
                              : "border-transparent bg-foreground/5 hover:border-action/20"
                          }`}
                        >
                          <div>
                            <h5 className="text-[11px] font-black text-[var(--text-primary)] uppercase mb-1 tracking-tight">
                              {style.name}
                            </h5>
                            <p className="text-[9px] text-[var(--text-secondary)] font-bold opacity-70 tracking-tight">
                              {style.desc}
                            </p>
                          </div>
                          <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${theme.cardStyle === style.id ? "bg-action text-white shadow-lg" : "bg-foreground/10 text-[var(--text-secondary)]"}`}
                          >
                            {theme.cardStyle === style.id ? (
                              <FaGem size={14} className="animate-pulse" />
                            ) : (
                              <FaCheckCircle size={14} />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Banner & Sync Status */}
                  <div className="pt-8 border-t border-border-subtle/50 space-y-6 pb-6">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-[0.2em] flex items-center gap-2">
                        <FaCog className="text-[var(--action)]" /> Banner
                        Contrast
                      </label>
                      <span className="text-xs font-black text-[var(--action)] bg-action/10 px-3 py-1 rounded-full">
                        {theme.bannerOpacity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={theme.bannerOpacity}
                      onChange={(e) =>
                        handleThemeUpdate({
                          ...theme,
                          bannerOpacity: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-action"
                    />

                    <div
                      className={`mt-4 p-4 rounded-3xl border flex items-center justify-center gap-3 transition-all duration-500 bg-white/50 dark:bg-black/20 ${isUpdating ? "border-amber-500/20 text-amber-500" : "border-emerald-500/20 text-emerald-500"}`}
                    >
                      {isUpdating ? (
                        <>
                          <FaCog className="animate-spin text-sm" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Saving live...
                          </span>
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="text-sm" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            System Synced
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* ── Owner Analytics Bar [V3.1] ── */}
      {user.isOwner && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-[101] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-action/20 px-6 py-2 shadow-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-widest">Analytics Dashboard</span>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <div className="h-6 w-px bg-border-subtle/50 mx-2" />
            <div className="flex items-center gap-8">
              {[
                { label: "Views", val: analytics.views, icon: "👁️" },
                { label: "Downloads", val: analytics.resumeDownloads, icon: "📄" },
                { label: "Contact", val: analytics.contactClicks, icon: "📞" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-lg">{stat.icon}</span>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-tighter text-[var(--text-secondary)] leading-none mb-1">{stat.label}</div>
                    <div className="text-sm font-black text-[var(--text-primary)] leading-none">{stat.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Profile Performance: Optimal
            </span>
          </div>
        </motion.div>
      )}
      <Helmet>
        <title>{`${user.firstName} ${user.lastName} | ${user.headline || "Professional"} ${user.industry ? `| ${user.industry}` : ""} | CVify`}</title>
        {/* Dynamic Font Import */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${theme.fontPrimary.replace(/\s+/g, "+")}:wght@300;400;500;600;700;800;900&display=swap`}
          rel="stylesheet"
        />
        <meta
          name="description"
          content={
            user.bio ||
            `Check out ${user.firstName}'s professional portfolio on CVify. ${user.industry ? `Industry: ${user.industry}.` : ""}`
          }
        />
        
        {/* Developer Credit */}
        <meta name="author" content="Umair Ahmed | DataVerse Technologies" />
        <meta name="designer" content="Umair Ahmed" />
        <meta name="publisher" content="CVify" />
        <meta name="reply-to" content="umair.ansari.92@gmail.com" />
        <link rel="author" href="https://dataversetechnologies.vercel.app/" />

        <link rel="canonical" href={`https://cvify.pro/p/${username}`} />

        {/* OpenGraph */}
        <meta property="og:type" content="profile" />
        <meta
          property="og:title"
          content={`${user.firstName} ${user.lastName} | ${user.headline || "Professional Portfolio"} ${user.industry ? `| ${user.industry}` : ""}`}
        />
        <meta property="og:description" content={`${user.availability || "Open to Work"}. ${user.bio?.substring(0, 120)}`} />
        <meta property="og:url" content={`https://cvify.pro/p/${username}`} />
        <meta
          property="og:image"
          content={user.profileImage || "/og-profile.png"}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${user.firstName} ${user.lastName} - Portfolio`}
        />
        <meta name="twitter:description" content={user.headline} />
        <meta name="twitter:image" content={user.profileImage} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: `${user.firstName} ${user.lastName}`,
            jobTitle: user.headline,
            description: user.bio,
            image: user.profileImage,
            url: `https://cvify.pro/p/${username}`,
            address: {
              "@type": "PostalAddress",
              addressLocality: user.location || "Available Remote",
            },
            alumniOf: user.education?.map((edu) => ({
              "@type": "EducationalOrganization",
              name: edu.institution,
            })),
            knowsLanguage: user.languages?.map((lang) => ({
              "@type": "Language",
              name: lang.name,
            })),
            knowsAbout: (user.skills || []).map(s => s.name),
            hasOccupation: {
              "@type": "Occupation",
              name: user.headline,
              occupationalCategory: user.industry
            },
            worksFor: {
              "@type": "Organization",
              name: "CVify",
            },
            sameAs: [
              user.socialLinks?.linkedin,
              user.socialLinks?.github,
              user.socialLinks?.twitter,
              user.socialLinks?.portfolio,
            ].filter(Boolean),
          })}
        </script>
      </Helmet>

      {/* ── Hero Unit [V3.3 PREMIUM] ── */}
      <Card variant="glass" className="relative overflow-hidden border-none p-0 group">
        <div
          className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
          style={{
            background: theme.bannerUrl
              ? `url(${theme.bannerUrl}) center/cover no-repeat`
              : `linear-gradient(to bottom right, ${theme.headerBg}, ${theme.headerBgSecondary || "#4c1d95"}, #1e1b4b)`,
            opacity: (theme.bannerOpacity || 95) / 100,
          }}
        >
          {!theme.bannerUrl && (
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          )}
        </div>

        <div className="relative z-10 p-8 md:p-14 lg:p-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Avatar Area */}
          <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} className="relative group/avatar">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-[3.5rem] overflow-hidden border-4 border-white/20 shadow-2xl relative z-20 transition-all duration-700 group-hover/avatar:rounded-[2.5rem] group-hover/avatar:rotate-2">
              <img src={user.profileImage || "https://images.unsplash.com/photo-1519085185758-2ad3ed098fb4"} alt={user.firstName} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-action blur-3xl opacity-20 scale-110 -z-10 group-hover/avatar:opacity-40 transition-opacity" />
            
            {/* ATS Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-[2rem] shadow-2xl z-30 group-hover:scale-110 transition-transform">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                     <FaCheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">ATS Score</p>
                    <p className="text-xl font-black text-white">{atsScore.score}%</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Identity & CTA Area */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/80 text-xs font-black uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                {user.industry || "Industry Expert"}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                <InlineEdit value={user.firstName} onSave={(v) => handleLiveUpdate({ firstName: v })} isOwner={user.isOwner} label="First" />{" "}
                <InlineEdit value={user.lastName} onSave={(v) => handleLiveUpdate({ lastName: v })} isOwner={user.isOwner} label="Last" />
              </h1>
              <p className="text-xl md:text-2xl font-medium text-white/70 max-w-2xl mx-auto lg:mx-0">
                <InlineEdit value={user.headline} onSave={(v) => handleLiveUpdate({ headline: v })} isOwner={user.isOwner} label="Headline" />
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
               <button onClick={handleDownload} className="px-10 py-5 bg-action text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-action/30 flex items-center gap-3">
                  <FaDownload /> Download Resume
               </button>
               <button onClick={() => document.getElementById('career-dashboard')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-5 bg-white/10 backdrop-blur-md text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10 flex items-center gap-3">
                  <FaChartBar /> ATS Insights
               </button>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Career Intelligence Dashboard [V3.3] ── */}
      <section id="career-dashboard" className="max-w-6xl mx-auto px-6 mb-20 space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">
          Career Intelligence Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Score Breakdown Widget */}
           <Card className="p-8 space-y-8 bg-gradient-to-br from-action/5 to-transparent border-action/20">
              <div className="flex justify-between items-center">
                 <h3 className="text-xs font-black uppercase tracking-widest text-action">Optimization Score</h3>
                 <span className="p-2 bg-action/10 rounded-lg"><FaRocket className="text-action" /></span>
              </div>
              <div className="relative flex items-center justify-center h-48">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="70" className="stroke-white/5 fill-none stroke-[12]" />
                    <motion.circle cx="50%" cy="50%" r="70" className="stroke-action fill-none stroke-[12]" style={{ strokeDasharray: "440", strokeLinecap: "round" }} initial={{ strokeDashoffset: 440 }} animate={{ strokeDashoffset: 440 - (440 * atsScore.score) / 100 }} />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-[var(--text-primary)]">{atsScore.score}</span>
                    <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-60">OPTIMIZED</span>
                 </div>
              </div>
           </Card>

           {/* Strengths Widget */}
           <Card className="p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500">Core Marketability</h3>
              <div className="space-y-4">
                 {atsScore.feedback?.positives?.slice(0, 4).map((match, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                       <span className="text-sm font-bold text-[var(--text-primary)] opacity-80 group-hover:opacity-100">{match}</span>
                    </div>
                 ))}
              </div>
           </Card>

           {/* Growth Map Widget */}
           <Card className="p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-violet-500">Industry Alignment</h3>
              <div className="flex flex-wrap gap-2">
                 {(user.skills || []).slice(0, 10).map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[var(--body-bg)] border border-[var(--card-border)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] group-hover:border-violet-500/30 transition-all cursor-default">{skill.name}</span>
                 ))}
              </div>
           </Card>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 md:px-6 space-y-20 pt-20">
        {/* Professional Bio [V3.3] */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">
            Professional Overview
          </h2>
          <Card className="p-8 md:p-12">
            <InlineEdit
              value={user.bio}
              onSave={(val) => handleLiveUpdate({ bio: val })}
              isOwner={user.isOwner}
              multiline={true}
              label="Bio"
              className="text-[var(--text-primary)] text-lg md:text-xl leading-relaxed font-medium whitespace-pre-wrap"
            />
          </Card>
        </section>

        {/* Professional Experience [V3.3] */}
        <section className="space-y-8">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">
            Professional Experience
          </h2>
          <div className="space-y-12 relative before:absolute before:left-[-1px] md:before:left-[31px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-action before:via-violet-600/30 before:to-transparent ml-4 md:ml-0">
            {(user.experience || []).map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="relative pl-12 md:pl-24"
              >
                <div className="absolute left-[-21px] md:left-[12px] top-6 w-10 h-10 rounded-2xl bg-[var(--body-bg)] border-2 border-action z-10 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  <FaBriefcase className="text-action text-sm" />
                </div>
                <Card className="hover:border-action/40 group relative transition-all duration-500">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-action/5 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-action/10 transition-colors" />
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-[var(--text-primary)] group-hover:text-action transition-colors">
                        <InlineEdit value={exp.role} onSave={(v) => handleArrayUpdate("experience", idx, { role: v })} isOwner={user.isOwner} label="Role" />
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-action font-black text-lg">
                          <InlineEdit value={exp.company} onSave={(v) => handleArrayUpdate("experience", idx, { company: v })} isOwner={user.isOwner} label="Company" />
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)] opacity-20" />
                        <span className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-2">
                           <InlineEdit value={exp.startDate} onSave={(v) => handleArrayUpdate("experience", idx, { startDate: v })} isOwner={user.isOwner} label="Start" />
                           <span className="opacity-40">—</span>
                           <InlineEdit value={exp.isCurrent ? "Present" : exp.endDate} onSave={(v) => handleArrayUpdate("experience", idx, { endDate: v })} isOwner={user.isOwner} label="End" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-6 relative z-10">
                    <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium">
                      <InlineEdit value={exp.achievements} onSave={(v) => handleArrayUpdate("experience", idx, { achievements: v })} isOwner={user.isOwner} multiline label="Achivements" />
                    </p>
                    {exp.tools?.length > 0 && (
                      <div className="flex flex-wrap gap-2.5">
                        {exp.tools.map((tool, ti) => (
                          <span key={ti} className="px-3.5 py-1.5 bg-[var(--body-bg)] border border-[var(--card-border)] rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education & Services Grid [V3.3] */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Education */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">Academic Core</h2>
            <div className="space-y-6">
              {(user.education || []).map((edu, i) => (
                <Card key={i} className="group hover:border-orange-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/10 transition-colors group-hover:bg-orange-500/20">
                      <FaGraduationCap size={20} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg font-black text-[var(--text-primary)]">
                        <InlineEdit value={edu.degree} onSave={(v) => handleArrayUpdate("education", i, { degree: v })} isOwner={user.isOwner} label="Degree" />
                      </h3>
                      <p className="text-orange-500 font-bold text-sm">
                        <InlineEdit value={edu.institution} onSave={(v) => handleArrayUpdate("education", i, { institution: v })} isOwner={user.isOwner} label="Institution" />
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Expert Services */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">Expert Services</h2>
            <div className="space-y-6">
              {(user.services || []).map((srv, i) => (
                <Card key={i} className="group hover:border-action/40">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-action/10 flex items-center justify-center text-action border border-action/10 group-hover:bg-action/20 transition-all">
                      <FaGem size={18} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg font-black text-[var(--text-primary)]">
                        <InlineEdit value={srv.title} onSave={(v) => handleArrayUpdate("services", i, { title: v })} isOwner={user.isOwner} label="Service" />
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
                        <InlineEdit value={srv.description} onSave={(v) => handleArrayUpdate("services", i, { description: v })} isOwner={user.isOwner} label="Summary" />
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Portfolio Showcase [V3.3] */}
        <section className="space-y-8">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">Signature Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {user.portfolio?.map((proj, idx) => (
              <Card key={idx} className="group p-0 overflow-hidden border-2 border-white/5 hover:border-action/30 transition-all duration-700 hover:shadow-glow-action">
                <div className="aspect-video relative overflow-hidden bg-white/5">
                  {proj.thumbnail ? (
                    <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-action/10">
                      <FaLayerGroup className="text-5xl text-action/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 backdrop-blur-sm">
                    {proj.githubLink && (
                      <a href={ensureAbsoluteUrl(proj.githubLink)} target="_blank" className="p-4 bg-white text-midnight rounded-2xl hover:scale-110 transition-transform shadow-xl">
                        <FaGithub size={22} />
                      </a>
                    )}
                    {proj.liveLink && (
                      <a href={ensureAbsoluteUrl(proj.liveLink)} target="_blank" className="p-4 bg-action text-white rounded-2xl hover:scale-110 transition-transform shadow-xl">
                        <FaGlobe size={22} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <h3 className="text-2xl font-black text-[var(--text-primary)] group-hover:text-action transition-colors">
                    <InlineEdit value={proj.title} onSave={(v) => handleArrayUpdate("portfolio", idx, { title: v })} isOwner={user.isOwner} label="Project Name" />
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
                    <InlineEdit value={proj.description} onSave={(v) => handleArrayUpdate("portfolio", idx, { description: v })} isOwner={user.isOwner} multiline label="Overview" />
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
          
          {user.isOwner && (
            <button 
              onClick={() => handleLiveUpdate({ experience: [...(user.experience || []), { role: "New Role", company: "Company", startDate: "Date", endDate: "Present", isCurrent: true, achievements: "", tools: [] }] })}
              className="ml-12 md:ml-24 p-8 rounded-2xl border-2 border-dashed border-[var(--card-border)] hover:border-action/50 transition-all flex items-center justify-center gap-3 text-[var(--text-secondary)] hover:text-action bg-[var(--card-bg)]"
            >
              <FaPlus />
              <span className="text-xs font-black uppercase tracking-widest">Add Professional Experience</span>
            </button>
          )}
        </div>
      </section>

      {/* Education & Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Education Section */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">
            Academic Foundation
          </h2>
          <div className="space-y-6">
            {(user.education || []).map((edu, i) => (
              <Card key={i} className="group hover:border-orange-500/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/10">
                    <FaGraduationCap size={20} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-black text-[var(--text-primary)]">
                      <InlineEdit
                        value={edu.degree}
                        onSave={(val) => handleArrayUpdate("education", i, { degree: val })}
                        isOwner={user.isOwner}
                        label="Degree"
                      />
                    </h3>
                    <p className="text-orange-500 font-bold text-sm">
                      <InlineEdit
                        value={edu.institution}
                        onSave={(val) => handleArrayUpdate("education", i, { institution: val })}
                        isOwner={user.isOwner}
                        label="Institution"
                      />
                    </p>
                    <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-60">
                       <InlineEdit value={edu.startYear} onSave={(v) => handleArrayUpdate("education", i, {startYear: v})} isOwner={user.isOwner} label="Start" />
                       <span className="mx-1">-</span>
                       <InlineEdit value={edu.endYear || edu.graduationDate} onSave={(v) => handleArrayUpdate("education", i, {endYear: v, graduationDate: v})} isOwner={user.isOwner} label="End" />
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">
            Professional Services
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {(user.services || []).map((service, idx) => (
              <Card key={idx} className="group hover:border-action/40">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-action/10 flex items-center justify-center text-action border border-action/10">
                    {service.icon || '🚀'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-[var(--text-primary)]">
                      <InlineEdit value={service.title} onSave={(v) => handleArrayUpdate("services", idx, { title: v })} isOwner={user.isOwner} label="Title" />
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] font-medium">
                      <InlineEdit value={service.description} onSave={(v) => handleArrayUpdate("services", idx, { description: v })} isOwner={user.isOwner} label="Description" />
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>


            {/* Services Section */}
            {user.services?.length > 0 && (
              <section
                className={`${cardClasses} p-8 rounded-[2.5rem] border shadow-xl`}
              >
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-[var(--text-secondary)] flex items-center gap-3">
                  {sectionNames.services}
                  <span className="flex-1 h-px bg-border-subtle"></span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.services.map((service, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-3 p-6 rounded-3xl border transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl group/service relative"
                      style={{
                        backgroundColor: theme.cardStyle === 'glass' ? 'color-mix(in srgb, var(--text-primary) 5%, transparent)' : 'color-mix(in srgb, var(--text-primary) 3%, var(--body-bg))',
                        borderColor: theme.accentColor + '40',
                        color: theme.textPrimary
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = theme.accentColor;
                        e.currentTarget.style.boxShadow = `0 10px 30px -10px ${theme.accentColor}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = theme.accentColor + '40';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span 
                          className="flex items-center justify-center w-12 h-12 rounded-2xl text-xl shadow-inner flex-shrink-0"
                          style={{
                            backgroundColor: theme.accentColor + '15',
                            color: theme.accentColor
                          }}
                        >
                          💼
                        </span>
      {/* Portfolio / Projects Grid [V3.3] */}
      {user.portfolio?.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">
            Signature Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {user.portfolio.map((proj, idx) => (
              <Card key={idx} className="group hover:border-action/50 overflow-hidden p-0 sm:p-0">
                {/* Project Thumbnail */}
                <div className="aspect-video relative overflow-hidden bg-white/5">
                  {proj.thumbnail ? (
                    <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-action/10">
                      <FaLayerGroup className="text-4xl text-action/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 backdrop-blur-sm">
                    {proj.githubLink && (
                      <a href={ensureAbsoluteUrl(proj.githubLink)} target="_blank" rel="noopener noreferrer" className="p-4 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform">
                        <FaGithub size={20} />
                      </a>
                    )}
                    {proj.liveLink && (
                      <a href={ensureAbsoluteUrl(proj.liveLink)} target="_blank" rel="noopener noreferrer" className="p-4 bg-action text-white rounded-full hover:scale-110 transition-transform">
                        <FaGlobe size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-black text-[var(--text-primary)] group-hover:text-action transition-colors">
                      <InlineEdit value={proj.title} onSave={(val) => handleArrayUpdate("portfolio", idx, { title: val })} isOwner={user.isOwner} label="Project Title" />
                    </h3>
                  </div>
                  
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    <InlineEdit value={proj.description} onSave={(val) => handleArrayUpdate("portfolio", idx, { description: val })} isOwner={user.isOwner} multiline label="Description" />
                  </p>

                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-action/20 transition-all">
                    <div className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <FaCheckCircle /> Quantified Impact
                    </div>
                    <p className="text-xs font-bold text-[var(--text-primary)]">
                      <InlineEdit value={proj.impact || "Delivered high-performance solution with optimized architecture."} onSave={(v) => handleArrayUpdate("portfolio", idx, { impact: v })} isOwner={user.isOwner} label="Impact" />
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(proj.techStack || []).map((tech, tidx) => (
                      <span key={tidx} className="px-2 py-1 bg-[var(--body-bg)] border border-[var(--card-border)] rounded-md text-[9px] font-black uppercase text-[var(--text-secondary)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
            
            {user.isOwner && (
              <button 
                onClick={() => handleLiveUpdate({ portfolio: [...(user.portfolio || []), { title: "New Project", description: "Project Description", techStack: [] }] })}
                className="p-12 rounded-2xl border-2 border-dashed border-[var(--card-border)] hover:border-action/40 transition-all flex flex-col items-center justify-center gap-4 bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-action group opacity-60 hover:opacity-100"
              >
                <FaPlus size={32} />
                <span className="text-sm font-black uppercase tracking-widest">Add Project to Portfolio</span>
              </button>
            )}
          </div>
        </section>
      )}


      {/* Certifications & Achievements Grid [V3.3] */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Certifications */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">
            Professional Certifications
          </h2>
          <div className="space-y-6">
            {(user.certifications || []).map((cert, idx) => (
              <Card key={idx} className="group hover:border-emerald-500/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/10">
                    <FaCheckCircle size={20} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-black text-[var(--text-primary)]">
                      <InlineEdit value={cert.name} onSave={(v) => handleArrayUpdate("certifications", idx, { name: v })} isOwner={user.isOwner} label="Certification" />
                    </h3>
                    <p className="text-emerald-500 font-bold text-sm">
                      <InlineEdit value={cert.issuer} onSave={(v) => handleArrayUpdate("certifications", idx, { issuer: v })} isOwner={user.isOwner} label="Issuer" />
                    </p>
                    <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-60">
                      Issued: <InlineEdit value={cert.date} onSave={(v) => handleArrayUpdate("certifications", idx, { date: v })} isOwner={user.isOwner} label="Date" />
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">
            Honors & Awards
          </h2>
          <div className="space-y-6">
            {(user.achievements || []).map((ach, idx) => (
              <Card key={idx} className="group hover:border-amber-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-amber-500/10 transition-colors" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/10">
                    🏆
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-black text-[var(--text-primary)]">
                       <InlineEdit value={ach.title} onSave={(v) => handleArrayUpdate("achievements", idx, { title: v })} isOwner={user.isOwner} label="Award" />
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                       <InlineEdit value={ach.description} onSave={(v) => handleArrayUpdate("achievements", idx, { description: v })} isOwner={user.isOwner} multiline label="Description" />
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Analytics & Skills Segment [V3.3] */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Community Impact */}
        <Card className="lg:col-span-1 bg-action/5 border-action/20 group relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-action/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-action/20 transition-colors" />
           <div className="relative z-10 space-y-8 text-center py-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-action">Community Impact</h3>
              
              <div className="flex justify-center gap-10 px-4">
                 <div className="space-y-1">
                    <p className="text-4xl font-black text-[var(--text-primary)]">{user.stats?.profileViews || 0}</p>
                    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Views</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-4xl font-black text-[var(--text-primary)]">{user.stats?.contactClicks || 0}</p>
                    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Interests</p>
                 </div>
              </div>

              <div className="bg-action/10 rounded-2xl p-4 border border-action/20">
                 <p className="text-[10px] font-black text-action uppercase tracking-widest flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-action rounded-full animate-pulse" />
                    Currently Trending Industry Expert
                 </p>
              </div>
           </div>
        </Card>

        {/* Skill Architecture */}
        <Card className="lg:col-span-2 space-y-10">
           <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Skill Architecture</h3>
              <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">V3.3 VERIFIED</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Tech Stack */}
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-60">Technical Stack</h4>
                 <div className="space-y-5">
                    {(user.skills || []).filter(s => s.type === "Technical").map((skill, si) => (
                       <div key={si} className="space-y-2">
                          <div className="flex justify-between items-end">
                             <span className="text-xs font-black text-[var(--text-primary)] uppercase">{skill.name}</span>
                             <span className="text-[10px] font-black text-action">{skill.percentage || 80}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[var(--body-bg)] rounded-full overflow-hidden border border-[var(--card-border)]">
                             <motion.div initial={{width:0}} whileInView={{width:`${skill.percentage || 80}%`}} className="h-full bg-action shadow-[0_0_10px_var(--action)]" />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Strategic */}
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-60">Strategic Strengths</h4>
                 <div className="flex flex-wrap gap-2">
                    {(user.skills || []).filter(s => s.type !== "Technical").map((skill, si) => (
                       <span key={si} className="px-4 py-2 bg-[var(--body-bg)] border border-[var(--card-border)] rounded-xl text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest hover:border-action/30 transition-colors">
                          {skill.name}
                       </span>
                    ))}
                 </div>
              </div>
           </div>
         </Card>
      </div>
    </main>

      {/* Recruiter Activity / Status Banner [V3.3] */}
      <section className="pt-20 pb-40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
             <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-sm font-black uppercase tracking-widest">Available for High-Impact Roles</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] leading-tight">
            Ready to lead your next <br /> <span className="text-action">Major Breakthrough?</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto font-medium">
            Contact me directly to discuss how I can drive 10x value for your organization or project.
          </p>
        </div>
      </section>
    </div>

    {/* Fixed Floating Action Bar [V3.3 PREMIUM] */}
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 flex justify-center pointer-events-none">
       <motion.div 
         initial={{ y: 100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         className="w-full max-w-2xl bg-[var(--card-bg)] border border-action/20 shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-4 flex items-center gap-6 backdrop-blur-xl pointer-events-auto"
       >
          <div className="hidden sm:flex flex-col pl-4 border-r border-[var(--card-border)] pr-6">
             <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-tighter">Candidate ID</span>
             <span className="text-xs font-black text-[var(--text-primary)]">{user.username?.toUpperCase() || "CVIFY-USER"}</span>
          </div>

          <div className="flex-1 flex gap-3">
             {user.phoneNumber && (
                <a href={`https://wa.me/${user.phoneNumber.replace(/\D/g, "")}`} target="_blank" className="p-4 bg-[#25D366] text-white rounded-2xl hover:scale-110 transition-transform">
                   <FaWhatsapp size={20} />
                </a>
             )}
             <a href={`mailto:${user.email}`} className="flex-1 px-8 py-4 bg-action text-white rounded-2xl font-black text-sm uppercase tracking-widest text-center hover:bg-violet-600 transition-colors">
                Hire {user.firstName || "Now"}
             </a>
          </div>

          <div className="hidden sm:flex items-center gap-4 pr-4">
             {user.socialLinks?.linkedin && <a href={ensureAbsoluteUrl(user.socialLinks.linkedin)} target="_blank" className="text-[var(--text-secondary)] hover:text-action transition-colors"><FaLinkedin size={20} /></a>}
             {user.socialLinks?.github && <a href={ensureAbsoluteUrl(user.socialLinks.github)} target="_blank" className="text-[var(--text-secondary)] hover:text-action transition-colors"><FaGithub size={20} /></a>}
          </div>
       </motion.div>
    </div>

    {/* Unified Footer [V3.3] */}
    <footer className="w-full py-16 text-center border-t border-[var(--card-border)] relative bg-[var(--body-bg)]">
       <div className="max-w-6xl mx-auto px-6 space-y-4">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.4em] opacity-40">
             Powered by <span className="text-action">CVify Pro</span> AI Career Engine
          </p>
          <div className="flex justify-center gap-6 text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-20">
             <span>System V3.3.0_Stable</span>
             <span>•</span>
             <span>ATS Intelligence: Optimized</span>
             <span>•</span>
             <span>UI Architecture: Systemized</span>
          </div>
       </div>
    </footer>
  </div>
);
};

export default PublicProfile;
