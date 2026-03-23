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
      className="min-h-screen transition-colors duration-500 pb-40 relative"
      style={{
        backgroundColor: theme.bodyBg,
        fontFamily: `'${theme.fontPrimary}', sans-serif`,
        "--action": theme.accentColor || "#2563eb",
        "--text-primary": theme.textPrimary || "#ffffff",
        "--text-secondary": theme.textSecondary || "#94a3b8",
        "--body-bg": theme.bodyBg || "#0f172a",
        "--bg-glass": "color-mix(in srgb, var(--text-primary) 5%, transparent)",
        "--border-glass": "color-mix(in srgb, var(--text-primary) 10%, transparent)",
        "--border-minimal": "color-mix(in srgb, var(--text-primary) 15%, transparent)",
        "--bg-classic": "color-mix(in srgb, var(--text-primary) 3%, var(--body-bg))",
        color: "var(--text-primary)",
      }}
    >
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

      {/* Hero 2.0 */}
      <header className="relative pt-20 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 animate-gradient"
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

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
            {/* Left Column: Image & Quick Info */}
            <div className="flex-shrink-0 relative group">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3.5rem] overflow-hidden border-8 border-white/10 shadow-3xl relative z-10 transition-transform hover:scale-105 duration-500">
                  <img
                    src={user.profileImage}
                    alt={user.firstName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                {/* ATS Authority Proof Layer [V3.2] */}
                {atsScore?.score && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-6 -right-6 px-6 py-3 bg-gradient-to-br from-action via-violet-600 to-indigo-700 rounded-[2rem] shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] border border-white/30 z-20 group/ats cursor-help"
                  >
                    <div className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] leading-none mb-1 text-center">ATS Match</div>
                    <div className="text-3xl font-black text-white leading-none text-center flex items-center justify-center gap-1">
                      {atsScore.score}
                      <span className="text-sm opacity-60">%</span>
                    </div>
                    {atsScore.improvement > 0 && (
                      <div className="mt-1 flex items-center justify-center gap-1 text-[8px] font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <span>↑</span> {atsScore.improvement}% AI Boost
                      </div>
                    )}
                  </motion.div>
                )}

                <div 
                  className="absolute -bottom-6 -right-4 p-4 pr-8 rounded-3xl shadow-2xl flex items-center gap-4 border z-20 group backdrop-blur-3xl overflow-hidden"
                  style={{
                    backgroundColor: theme.cardStyle === 'glass' ? `color-mix(in srgb, ${theme.textPrimary} 10%, ${theme.bodyBg})` : theme.bodyBg,
                    borderColor: `color-mix(in srgb, ${theme.textPrimary} 20%, transparent)`
                  }}
                >
                  <div className="absolute inset-0 bg-action/5 animate-pulse" />
                  <div className="w-10 h-10 rounded-2xl bg-action/10 flex items-center justify-center relative z-10 shadow-inner">
                    <FaMapMarkerAlt style={{ color: theme.accentColor }} className="text-lg" />
                  </div>
                  <div className="text-left relative z-10">
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-0.5">Base Location</div>
                    <InlineEdit
                      value={user.location || "Available Remote"}
                      onSave={(val) => handleLiveUpdate({ location: val })}
                      isOwner={user.isOwner}
                      label="Location"
                      className="text-sm font-black transition-colors block leading-tight"
                      style={{ color: theme.textPrimary }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Bio & Actions */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-10">
              {/* Premium Proof Tagline */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 shadow-xl text-white/50 flex items-center gap-2">
                  <FaGem className="text-amber-500" />
                  Optimized using AI Resume Intelligence
                </div>
                <InlineEdit
                  value={user.availability || "Open to Work"}
                  onSave={(val) => handleLiveUpdate({ availability: val })}
                  isOwner={user.isOwner}
                  label="Availability Status"
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border shadow-xl backdrop-blur-md cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                    user.availability === "Open to Work"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : user.availability === "Freelance Available"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                />
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] drop-shadow-2xl"
                >
                  <InlineEdit
                    value={`${user.firstName} ${user.lastName}`}
                    onSave={(val) => {
                      const [first, ...rest] = val.split(" ");
                      handleLiveUpdate({ firstName: first, lastName: rest.join(" ") });
                    }}
                    isOwner={user.isOwner}
                    label="Full Name"
                    className="block"
                  />
                </motion.h1>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    <span className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 leading-tight block">
                      <InlineEdit
                        value={user.headline || "Professional Developer"}
                        onSave={(val) => handleLiveUpdate({ headline: val })}
                        isOwner={user.isOwner}
                        label="Headline"
                      />
                    </span>
                    {user.industry && user.industry !== "Other" && (
                      <span className="px-5 py-1.5 bg-action/20 backdrop-blur-2xl rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-action/30 shadow-2xl text-white">
                        {user.industry}
                      </span>
                    )}
                  </div>
                  
                  {/* Dynamic Authority Line [V3.2] */}
                  <div className="flex items-center gap-3 text-[var(--action)] text-sm font-black uppercase tracking-widest animate-pulse">
                    <div className="w-8 h-px bg-current opacity-40" />
                    AI-Optimized Performance Profile
                    <div className="w-8 h-px bg-current opacity-40" />
                  </div>
                </motion.div>
              </div>

              {/* Contact & Social Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                {user.phoneNumber && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/${user.phoneNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleTrackInteraction("contact")}
                    className="flex items-center gap-4 px-8 py-4 bg-green-500/10 hover:bg-green-500/20 border-2 border-green-500/20 rounded-[2rem] transition-all group shadow-xl"
                  >
                    <FaWhatsapp className="text-green-500 text-2xl group-hover:rotate-12 transition-transform" />
                    <div className="text-left">
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1.5">WhatsApp Direct</div>
                      <span className="text-sm font-black text-white block leading-none">{user.phoneNumber}</span>
                    </div>
                  </motion.a>
                )}
                
                <div className="flex items-center gap-4">
                  {[
                    { icon: <FaLinkedin />, key: "linkedin", title: "LinkedIn", color: "hover:bg-blue-600 shadow-blue-500/20" },
                    { icon: <FaGithub />, key: "github", title: "GitHub", color: "hover:bg-slate-800 shadow-slate-500/20" },
                    { icon: <FaTwitter />, key: "twitter", title: "Twitter", color: "hover:bg-sky-500 shadow-sky-500/20" },
                    { icon: <FaGlobe />, key: "portfolio", title: "Portfolio", color: "hover:bg-action shadow-action/20" }
                  ].map((social, idx) => (user.socialLinks?.[social.key] || user.isOwner) && (
                    <div key={idx} className="relative group/social">
                      <a
                        href={user.socialLinks?.[social.key] ? ensureAbsoluteUrl(user.socialLinks[social.key]) : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (!user.socialLinks?.[social.key]) e.preventDefault();
                          handleTrackInteraction("contact");
                        }}
                        className={`w-14 h-14 bg-white/5 border border-white/10 rounded-[1.5rem] flex items-center justify-center text-xl text-white transition-all hover:-translate-y-2 hover:shadow-2xl ${social.color} ${!user.socialLinks?.[social.key] ? 'opacity-20 grayscale' : ''}`}
                        title={social.title}
                      >
                        {social.icon}
                      </a>
                    </div>
                  ))}
                  
                  {/* Share Trigger [V3.2] */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                       navigator.clipboard.writeText(window.location.href);
                       toast.success("Profile link copied!");
                    }}
                    className="w-14 h-14 bg-action/10 border-2 border-action/20 rounded-[1.5rem] flex items-center justify-center text-xl text-action hover:bg-action hover:text-white transition-all shadow-xl shadow-action/10"
                    title="Copy Profile Link"
                  >
                    <FaShareAlt />
                  </motion.button>
                </div>
              </div>

              {/* Master Actions (V3.2 Action Layer) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4 w-full">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex-1 max-w-[280px] px-10 py-6 bg-white text-midnight font-black rounded-[2.5rem] flex items-center justify-center gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)] transition-all shadow-3xl text-base group relative overflow-hidden"
                  style={{ color: '#0f172a' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <FaDownload className="text-xl group-hover:bounce-y" />
                  <span className="uppercase tracking-widest text-sm">Download Resume</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('career-dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 max-w-[280px] px-10 py-6 bg-action text-white font-black rounded-[2.5rem] flex items-center justify-center gap-5 hover:bg-action/90 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all shadow-action/20 text-base group"
                >
                  <FaGem className="text-xl group-hover:rotate-12 transition-transform" />
                  <span className="uppercase tracking-widest text-sm">View ATS Insights</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Career Intelligence Dashboard V3.2 ── */}
      <section id="career-dashboard" className="max-w-6xl mx-auto px-6 mb-20">
        <div className={`${cardClasses} p-10 md:p-14 border-2 border-action/20 shadow-glow-action relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-action/5 rounded-full blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-action/10" />
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 relative z-10">
            {/* Left: Score Breakdown */}
            <div className="flex-1 space-y-10">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">Career Intelligence Dashboard</h2>
                <div className="flex items-center gap-3 text-[10px] font-black text-[var(--action)] bg-action/10 px-3 py-1 rounded-full border border-action/20 uppercase tracking-[0.2em] w-fit">
                  <FaGem className="animate-pulse" /> AI Resume Audit: Level {atsScore?.score > 80 ? 'Elite' : 'Professional'}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Formatting", score: atsScore?.breakdown?.formatting || 0, icon: <FaLayerGroup />, color: "text-blue-400" },
                  { label: "Keywords", score: atsScore?.breakdown?.keywordMatch || 0, icon: <FaCheckCircle />, color: "text-emerald-400" },
                  { label: "Impact", score: atsScore?.breakdown?.impact || 0, icon: <FaGem />, color: "text-amber-400" },
                  { label: "Quantification", score: atsScore?.breakdown?.quantification || 0, icon: <FaFont />, color: "text-violet-400" },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-action/30 transition-all group/card"
                  >
                    <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${stat.color} group-hover/card:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-black text-white mb-1">{stat.score}%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Strengths vs Weaknesses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                    <FaCheckCircle /> Profile Strengths
                  </h4>
                  <div className="space-y-3">
                    {(atsScore?.feedback?.positives || ["Strong keyword distribution", "Clear section headers"]).map((pos, pidx) => (
                      <div key={pidx} className="flex gap-3 text-sm text-white/70 font-medium">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        {pos}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 flex items-center gap-2">
                    <FaExclamationTriangle /> Growth Areas
                  </h4>
                  <div className="space-y-3">
                    {(atsScore?.feedback?.improvements || ["Missing numeric metrics", "Passive voice detected"]).map((imp, iidx) => (
                      <div key={iidx} className="flex gap-3 text-sm text-white/70 font-medium font-mono opacity-80 decoration-amber-500/20 underline underline-offset-4">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        {imp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interaction/Impact Layer */}
            <div className="lg:w-96 space-y-8">
              {/* Before vs After Impact Block */}
              <div className="p-8 bg-gradient-to-br from-indigo-900/40 to-action/20 rounded-[2.5rem] border-2 border-action/30 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-action/5 animate-shimmer" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-8 relative z-10">AI Optimization Impact</h4>
                
                <div className="flex items-center justify-between relative z-10 gap-4">
                  <div className="text-center">
                    <div className="text-[8px] font-black uppercase text-white/40 mb-2">Before</div>
                    <div className="text-2xl font-black text-white/40">{atsScore?.previousScore || 52}%</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} className="h-full bg-action" />
                    </div>
                    <div className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      +{atsScore?.improvement || 30}% Score Boost
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[8px] font-black uppercase text-action mb-2">After</div>
                    <div className="text-4xl font-black text-white shadow-glow-white">{atsScore?.score || 82}%</div>
                  </div>
                </div>
                
                <p className="text-[9px] font-medium text-white/50 mt-8 text-center italic relative z-10 leading-relaxed">
                  "This candidate's profile has been surgically optimized for high-authority placement."
                </p>
              </div>

              {/* Interaction Block: Apply Fixes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                   <div className="flex items-center gap-2">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">AI Fixes Queue</h4>
                      <div className="px-2 py-0.5 bg-action text-white rounded-lg text-[7px] font-black uppercase tracking-tighter shadow-glow-action">ONE-CLICK FIX</div>
                   </div>
                   <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-lg text-[8px] font-black">2 PENDING</span>
                </div>
                <div className={`space-y-3 relative ${!user.isOwner ? 'blur-[4px] pointer-events-none grayscale' : ''}`}>
                   <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:border-action transition-all group/fix shadow-lg">
                      <div className="text-[9px] font-black text-amber-500 mb-1">Issue: Missing Metrics</div>
                      <p className="text-xs font-medium text-white/80 mb-4 leading-relaxed">
                        Your experience bullet points lack quantification (%, $, numbers).
                      </p>
                      <button 
                        onClick={() => handleApplyFix("Add metrics to Google role")}
                        className="w-full py-3 bg-action hover:bg-white text-white hover:text-action rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn shadow-xl shadow-action/20"
                      >
                        Apply AI Fix <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                   </div>
                   {!user.isOwner && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center p-6 bg-black/40 backdrop-blur-sm rounded-[2.5rem]">
                         <FaLock className="text-action text-3xl mb-4" />
                         <p className="text-xs font-black text-white uppercase tracking-widest mb-4">Recruiter View Restricted</p>
                         <Link to="/login" className="px-8 py-3 bg-action text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Login to Fix Profile</Link>
                      </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (Bio & Experience) */}
          <div className="lg:col-span-8 space-y-10">
            {/* About Section */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className={`${cardClasses} p-8 md:p-12 rounded-[2.5rem] shadow-xl border`}
            >
              <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                Professional Overview{" "}
                <span className="flex-1 h-px bg-border-subtle"></span>
              </h3>
              <InlineEdit
                value={user.bio}
                onSave={(val) => handleLiveUpdate({ bio: val })}
                isOwner={user.isOwner}
                multiline={true}
                label="Bio"
                className="text-[var(--text-primary)] text-lg leading-relaxed font-medium whitespace-pre-wrap"
              />
            </motion.section>

            {/* Experience Timeline [V3.1] */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] flex items-center gap-4 flex-1">
                  {sectionNames.experience}{" "}
                  <span className="flex-1 h-px bg-border-subtle opacity-20"></span>
                </h3>
              </div>
              
              <div className="space-y-12 relative before:absolute before:left-0 md:before:left-5 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-action before:via-violet-500 before:to-transparent before:rounded-full ml-2 md:ml-0">
                {(user.experience || []).map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-12 md:pl-20"
                  >
                    <div className="absolute left-[-18px] md:left-[2px] top-1 w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border-4 border-action z-10 flex items-center justify-center shadow-glow-action">
                      <FaBriefcase className="text-[var(--action)] text-sm" />
                    </div>

                        <div className={`${cardClasses} p-8 md:p-10 rounded-[2.5rem] hover:border-[var(--action)] transition-all group relative overflow-hidden`}>
                          <div className="absolute top-0 right-0 w-40 h-40 bg-action/5 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-action/10 transition-colors"></div>
                          {user.isOwner && (
                            <button
                               onClick={() => {
                                 const confirmDelete = window.confirm("Delete this experience?");
                                 if(confirmDelete) handleLiveUpdate({ experience: user.experience.filter((_, i) => i !== idx) });
                               }}
                               className="absolute top-6 right-6 p-3 bg-red-500/10 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white z-20 shadow-xl"
                               title="Delete Experience"
                            >
                               <FaTrashAlt size={14} />
                            </button>
                          )}

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
                        <div className="flex-1">
                          <InlineEdit
                            value={exp.role}
                            onSave={(val) => handleArrayUpdate("experience", idx, { role: val })}
                            isOwner={user.isOwner}
                            label="Role"
                            className="text-2xl md:text-3xl font-black text-[var(--text-primary)] group-hover:text-[var(--action)] transition-colors leading-tight block w-full"
                          />
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                             <InlineEdit
                                value={exp.company}
                                onSave={(val) => handleArrayUpdate("experience", idx, { company: val })}
                                isOwner={user.isOwner}
                                label="Company"
                                className="text-[var(--action)] font-black text-lg"
                             />
                             <span className="w-1.5 h-1.5 rounded-full bg-border-subtle opacity-40"></span>
                             <div className="flex items-center gap-2 text-[var(--text-secondary)] font-bold text-sm tracking-wide bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                <InlineEdit
                                  value={exp.startDate}
                                  onSave={(val) => handleArrayUpdate("experience", idx, { startDate: val })}
                                  isOwner={user.isOwner}
                                  label="Start"
                                />
                                <span>—</span>
                                <InlineEdit
                                  value={exp.isCurrent ? "Present" : exp.endDate}
                                  onSave={(val) => handleArrayUpdate("experience", idx, { endDate: val, isCurrent: val.toLowerCase().includes("present") })}
                                  isOwner={user.isOwner}
                                  label="End"
                                />
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 relative z-10">
                        {/* Summary / Achievements */}
                        {(exp.achievements || user.isOwner) && (
                          <div className="space-y-2">
                            {user.isOwner && <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">Key Achievements</span>}
                            <InlineEdit
                              value={exp.achievements}
                              onSave={(val) => handleArrayUpdate("experience", idx, { achievements: val })}
                              isOwner={user.isOwner}
                              multiline={true}
                              label="Achievements"
                              className="text-[var(--text-secondary)] text-base leading-relaxed whitespace-pre-wrap"
                              placeholder="Describe your impact and results..."
                            />
                          </div>
                        )}

                        {/* Structured Responsibilities */}
                        {(exp.responsibilities && exp.responsibilities.length > 0) ? (
                          <ul className="space-y-3 pt-2">
                            {exp.responsibilities.map((resp, ridx) => (
                              <li key={ridx} className="flex gap-4 text-[var(--text-secondary)] text-base leading-relaxed group/item">
                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-action/40 group-hover/item:bg-action transition-colors flex-shrink-0" />
                                <InlineEdit
                                  value={resp}
                                  onSave={(val) => {
                                    const newResp = [...exp.responsibilities];
                                    newResp[ridx] = val;
                                    handleArrayUpdate("experience", idx, { responsibilities: newResp });
                                  }}
                                  isOwner={user.isOwner}
                                  label={`Detail ${ridx + 1}`}
                                  className="w-full"
                                />
                              </li>
                            ))}
                          </ul>
                        ) : user.isOwner && !exp.achievements && (
                           <div className="p-4 border-2 border-dashed border-white/5 rounded-2xl text-center">
                              <p className="text-xs text-[var(--text-secondary)] opacity-50 font-bold uppercase tracking-widest">No details added yet</p>
                           </div>
                        )}
                      </div>
                      
                      {/* Technical Skills: Only show if they exist (Inclusive of non-tech roles) */}
                      {exp.tools?.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-white/5">
                          <div className="flex flex-wrap gap-2">
                            {exp.tools.map((tool, tidx) => (
                              <span key={tidx} className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] border border-white/5 hover:border-action/30 transition-colors">
                                {tool}
                              </span>
                            ))}
                            {user.isOwner && (
                               <button 
                                 onClick={() => {
                                   const tool = prompt("Add tool/tech:");
                                   if(tool) handleArrayUpdate("experience", idx, { tools: [...(exp.tools || []), tool] });
                                 }}
                                 className="px-3 py-1 rounded-lg bg-action/10 text-[10px] font-black uppercase tracking-widest text-action border border-action/20 hover:bg-action/20"
                               >
                                 + Add Tech
                               </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {user.isOwner && (
                   <button 
                     onClick={() => handleLiveUpdate({ experience: [...(user.experience || []), { role: "New Role", company: "New Company", startDate: "Start", endDate: "Present", isCurrent: true, achievements: "", responsibilities: [], tools: [] }] })}
                     className="w-full p-10 rounded-[2.5rem] border-2 border-dashed border-white/10 hover:border-action/40 transition-all group opacity-60 hover:opacity-100 flex flex-col items-center justify-center gap-4 bg-white/5"
                   >
                     <FaPlus className="text-3xl text-action" />
                     <span className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Add Work Experience</span>
                   </button>
                )}
              </div>
            </section>

            {/* Education Timeline */}
            <section
              className={`${cardClasses} p-8 rounded-[2.5rem] border shadow-xl`}
            >
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-[var(--text-secondary)] flex items-center gap-3">
                {sectionNames.education}
                <span className="flex-1 h-px bg-border-subtle"></span>
              </h3>
              <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-orange-500/20">
                {(user.education || []).map((edu, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 z-10">
                      <FaGraduationCap size={18} />
                    </div>
                    <div className={`${cardClasses} p-6 rounded-[2rem] hover:border-[var(--action)] transition-all group overflow-hidden relative`}>
                      {user.isOwner && (
                        <button
                           onClick={() => {
                             const confirmDelete = window.confirm("Delete this education record?");
                             if(confirmDelete) handleLiveUpdate({ education: user.education.filter((_, idx) => idx !== i) });
                           }}
                           className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white z-20"
                           title="Delete Education"
                        >
                           <FaTrashAlt size={12} />
                        </button>
                      )}
                      <InlineEdit
                        value={edu.degree}
                        onSave={(val) =>
                          handleArrayUpdate("education", i, { degree: val })
                        }
                        isOwner={user.isOwner}
                        label="Degree"
                        className="text-base font-black text-[var(--text-primary)] leading-tight block"
                      />
                      <InlineEdit
                        value={edu.institution}
                        onSave={(val) =>
                          handleArrayUpdate("education", i, {
                            institution: val,
                          })
                        }
                        isOwner={user.isOwner}
                        label="Institution"
                        className="text-sm font-bold text-[var(--text-secondary)] mt-1 block"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 text-[10px] font-black text-orange-600 bg-orange-500/5 px-2 py-0.5 rounded-lg border border-orange-500/10 uppercase tracking-tighter">
                          <InlineEdit
                             value={edu.startYear}
                             onSave={(val) => handleArrayUpdate("education", i, { startYear: val })}
                             isOwner={user.isOwner}
                             label="Start"
                          />
                          <span>-</span>
                          <InlineEdit
                             value={edu.endYear || edu.graduationDate}
                             onSave={(val) => handleArrayUpdate("education", i, { endYear: val, graduationDate: val })}
                             isOwner={user.isOwner}
                             label="End"
                          />
                        </div>
                      </div>
                      <InlineEdit
                        value={edu.description}
                        onSave={(val) => handleArrayUpdate("education", i, { description: val })}
                        isOwner={user.isOwner}
                        multiline={true}
                        label="Details"
                        placeholder="Describe your achievements..."
                        className="text-xs font-medium text-[var(--text-secondary)] mt-4 leading-relaxed group-hover:text-[var(--text-primary)] transition-colors italic block"
                      />
                    </div>
                  </div>
                ))}
                {user.isOwner && (
                  <button 
                    onClick={() => handleLiveUpdate({ education: [...(user.education || []), { institution: "University/School", degree: "Degree Name", startYear: "YYYY", endYear: "YYYY", graduationDate: "YYYY", description: "" }] })}
                    className="w-full p-8 rounded-[2rem] border-2 border-dashed border-white/10 hover:border-orange-500/40 transition-all group opacity-60 hover:opacity-100 flex flex-col items-center justify-center gap-3 bg-white/5"
                  >
                    <FaPlus className="text-2xl text-orange-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Add Education Record</span>
                  </button>
                )}
              </div>
            </section>

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
                        <InlineEdit
                          value={service.title}
                          onSave={(val) => handleArrayUpdate("services", idx, { title: val })}
                          isOwner={user.isOwner}
                          label="Service Title"
                          className="font-black text-base leading-tight block w-full"
                        />
                      </div>
                      <InlineEdit
                        value={service.description}
                        onSave={(val) => handleArrayUpdate("services", idx, { description: val })}
                        isOwner={user.isOwner}
                        multiline={true}
                        label="Description"
                        className="text-sm leading-relaxed opacity-80 mt-1 font-medium block"
                      />
                    </div>
                  ))}
                  {user.isOwner && (
                    <button
                      onClick={() => {
                        handleLiveUpdate({ 
                          services: [...(user.services || []), { title: "New Service", description: "Describe your service..." }] 
                        });
                      }}
                      className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 border-dashed border-white/10 hover:border-action/40 transition-all group opacity-60 hover:opacity-100"
                    >
                      <FaPlus className="text-2xl text-action" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Add Service</span>
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* Projects Portfolio [V3.1] */}
            {portfolio.length > 0 && (
              <section className="space-y-8">
                 <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] flex items-center gap-4">
                  {sectionNames.projects || sectionNames.portfolio}{" "}
                  <span className="flex-1 h-px bg-border-subtle opacity-20"></span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {portfolio.map((proj, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={`${cardClasses} p-8 rounded-[3rem] flex flex-col h-full group hover:shadow-glow-action transition-all border-2 border-white/5 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent`}
                    >
                      {user.isOwner && (
                         <button
                           onClick={() => {
                             if(window.confirm("Delete this project?")) handleLiveUpdate({ portfolio: portfolio.filter((_, i) => i !== idx) });
                           }}
                           className="absolute top-6 left-6 p-2 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white z-20"
                           title="Delete Project"
                         >
                           <FaTrashAlt size={12} />
                         </button>
                      )}
                      
                      {/* Project Rank/Number */}
                      <div className="absolute top-8 left-8 text-[4rem] font-black text-white/[0.03] leading-none pointer-events-none select-none">
                        0{idx + 1}
                      </div>

                      <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-8 bg-white/5 border border-white/10 relative group/thumb shadow-2xl">
                        {proj.thumbnail ? (
                          <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover/thumb:scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-action/20 to-violet-600/30">
                            <FaLayerGroup className="text-5xl text-action/40 animate-pulse" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-action/40 mix-blend-overlay opacity-0 group-hover/thumb:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-6 backdrop-blur-md">
                          {proj.githubLink && (
                            <a href={ensureAbsoluteUrl(proj.githubLink)} target="_blank" rel="noopener noreferrer" className="p-5 bg-white text-slate-900 rounded-full transition-all hover:scale-110 shadow-xl">
                              <FaGithub size={24} />
                            </a>
                          )}
                          {proj.liveLink && (
                            <a href={ensureAbsoluteUrl(proj.liveLink)} target="_blank" rel="noopener noreferrer" className="p-5 bg-action text-white rounded-full transition-all hover:scale-110 shadow-xl">
                              <FaGlobe size={24} />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 space-y-6 relative z-10">
                        <div className="flex items-start justify-between gap-4">
                          <InlineEdit
                             value={proj.title}
                             onSave={(val) => handleArrayUpdate("portfolio", idx, { title: val })}
                             isOwner={user.isOwner}
                             label="Project Name"
                             className="text-2xl font-black text-white group-hover:text-action transition-colors block w-full leading-tight"
                          />
                          {proj.isFeatured && (
                            <div className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-amber-500/20 flex-shrink-0 flex items-center gap-2">
                              <FaGem size={10} /> Featured
                            </div>
                          )}
                        </div>
                        
                        <InlineEdit
                          value={proj.description}
                          onSave={(val) => handleArrayUpdate("portfolio", idx, { description: val })}
                          isOwner={user.isOwner}
                          multiline={true}
                          label="Project Description"
                          className="text-white/60 text-sm leading-relaxed block"
                        />

                        {/* Impact Line [V3.2 MANDATORY] */}
                        <div className="p-4 bg-action/5 rounded-2xl border border-action/20 group/impact">
                           <div className="text-[8px] font-black text-action uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                              <FaCheckCircle /> Quantified Impact
                           </div>
                           <InlineEdit
                             value={proj.impact || "Boosted system performance by 30% through architecture redesign."}
                             onSave={(val) => handleArrayUpdate("portfolio", idx, { impact: val })}
                             isOwner={user.isOwner}
                             label="Quantified Impact"
                             className="text-xs font-black text-white block leading-tight group-hover/impact:text-action transition-colors"
                           />
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {(proj.techStack || []).map((tech, tidx) => (
                            <span key={tidx} className="px-3 py-1 rounded-xl bg-white/5 text-[10px] font-black uppercase tracking-tight text-white/50 border border-white/10 group-hover:border-action/30 transition-colors">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-6">
                            {proj.githubLink && (
                              <a href={ensureAbsoluteUrl(proj.githubLink)} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors flex items-center gap-2">
                                <FaGithub /> Source
                              </a>
                            )}
                            {proj.liveLink && (
                              <a href={ensureAbsoluteUrl(proj.liveLink)} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors flex items-center gap-2">
                                <FaGlobe /> Preview
                              </a>
                            )}
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Verified Project</span>
                            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-action/40">
                              <FaCheckCircle size={12} />
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                  {user.isOwner && (
                    <button
                      onClick={() => handleLiveUpdate({ portfolio: [...(portfolio || []), { title: "New Project", description: "Describe your project...", techStack: [], githubLink: "", liveLink: "", isFeatured: false }] })}
                      className="w-full p-12 rounded-[2.5rem] border-2 border-dashed border-white/10 hover:border-action/40 transition-all group opacity-60 hover:opacity-100 flex flex-col items-center justify-center gap-4 bg-white/5 min-h-[400px]"
                    >
                      <FaPlus className="text-4xl text-action" />
                      <span className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Add Project to Portfolio</span>
                    </button>
                  )}
                </div>
              </section>
            )}


            {/* Certifications Section */}
            {(user.certifications || []).length > 0 && (
              <section className="space-y-6">
                <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] flex items-center gap-4">
                  {sectionNames.certifications || "Certifications"}{" "}
                  <span className="flex-1 h-px bg-border-subtle"></span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.certifications.map((cert, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className={`${cardClasses} p-6 rounded-[2rem] border shadow-lg group hover:border-emerald-500/30 transition-all`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
                          <FaCheckCircle size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <InlineEdit
                            value={cert.name}
                            onSave={(val) => handleArrayUpdate("certifications", idx, { name: val })}
                            isOwner={user.isOwner}
                            label="Certification Name"
                            className="text-lg font-black text-[var(--text-primary)] truncate block w-full"
                          />
                          <InlineEdit
                            value={cert.issuer}
                            onSave={(val) => handleArrayUpdate("certifications", idx, { issuer: val })}
                            isOwner={user.isOwner}
                            label="Issuer"
                            className="text-sm font-bold text-emerald-500 block w-full"
                          />
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-black uppercase text-[var(--text-secondary)] opacity-60">Issued:</span>
                            <InlineEdit
                              value={cert.date}
                              onSave={(val) => handleArrayUpdate("certifications", idx, { date: val })}
                              isOwner={user.isOwner}
                              label="Date"
                              className="text-[10px] font-black uppercase text-[var(--text-secondary)]"
                            />
                          </div>
                          {cert.link && (
                            <a
                              href={ensureAbsoluteUrl(cert.link)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 mt-4 text-[10px] font-black text-[var(--action)] uppercase tracking-widest hover:underline"
                            >
                              Verify Credential ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {user.isOwner && (
                    <button
                      onClick={() => {
                        handleLiveUpdate({ 
                          certifications: [...(user.certifications || []), { name: "New Certification", issuer: "Issuer Name", date: "MM/YYYY" }] 
                        });
                      }}
                      className="flex items-center justify-center p-6 rounded-[2rem] border-2 border-dashed border-white/10 hover:border-emerald-500/40 transition-all group opacity-60 hover:opacity-100 min-h-[140px]"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <FaPlus className="text-xl text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Add Cert</span>
                      </div>
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* Achievements Section */}
            {(user.achievements || []).length > 0 && (
              <section className="space-y-6">
                <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] flex items-center gap-4">
                  {sectionNames.achievements || "Honors & Awards"}{" "}
                  <span className="flex-1 h-px bg-border-subtle"></span>
                </h3>
                <div className="space-y-6">
                  {user.achievements.map((ach, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      className={`${cardClasses} p-8 rounded-[2.5rem] border shadow-xl relative overflow-hidden group`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-colors"></div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner">
                            <span className="text-xl">🏆</span>
                          </div>
                          <div>
                            <InlineEdit
                              value={ach.title}
                              onSave={(val) => handleArrayUpdate("achievements", idx, { title: val })}
                              isOwner={user.isOwner}
                              label="Award Title"
                              className="text-xl font-black text-[var(--text-primary)] block w-full"
                            />
                            <div className="flex items-center gap-2 mt-1">
                               <InlineEdit
                                 value={ach.date}
                                 onSave={(val) => handleArrayUpdate("achievements", idx, { date: val })}
                                 isOwner={user.isOwner}
                                 label="Date"
                                 className="text-[10px] font-black text-amber-600 bg-amber-500/5 px-2 py-0.5 rounded-lg border border-amber-500/10 uppercase tracking-tighter"
                               />
                            </div>
                          </div>
                        </div>
                      </div>
                      <InlineEdit
                        value={ach.description}
                        onSave={(val) => handleArrayUpdate("achievements", idx, { description: val })}
                        isOwner={user.isOwner}
                        multiline={true}
                        label="Description"
                        className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed relative z-10 block"
                      />
                    </motion.div>
                  ))}
                  {user.isOwner && (
                    <button
                      onClick={() => {
                        handleLiveUpdate({ 
                          achievements: [...(user.achievements || []), { title: "New Award", date: "YYYY", description: "Describe your achievement..." }] 
                        });
                      }}
                      className={`${cardClasses} w-full p-8 rounded-[2.5rem] border-2 border-dashed border-white/10 hover:border-amber-500/40 transition-all flex flex-col items-center justify-center gap-3 group opacity-60 hover:opacity-100`}
                    >
                       <FaPlus className="text-2xl text-amber-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Add Achievement</span>
                    </button>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (Skills & Stats) */}
          <div className="lg:col-span-4 space-y-10">
            {/* Community Impact & Analytics Widget */}
            <section
              className={`${cardClasses} p-8 rounded-[2.5rem] border shadow-xl relative overflow-hidden group`}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-action/5 rounded-full blur-3xl group-hover:bg-action/10 transition-colors"></div>

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                  Community Impact
                </h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full border border-blue-500/20">
                  <FaGem size={12} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase">
                    Impact Badge
                  </span>
                </div>
              </div>

              {/* Conditional Stats: Only show if they exist (returned for owner) */}
              {user.stats?.profileViews !== undefined ||
              user.stats?.contactClicks !== undefined ? (
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-foreground/5 dark:bg-midnight/30 rounded-3xl border border-border-subtle hover:border-action/30 transition-all text-center">
                    <p className="text-3xl font-black text-[var(--text-primary)]">
                      {user.stats?.profileViews || 0}
                    </p>
                    <p className="text-[9px] font-bold uppercase text-[var(--text-secondary)] mt-1 tracking-widest">
                      Profile Views
                    </p>
                  </div>
                  <div className="p-6 bg-foreground/5 dark:bg-midnight/30 rounded-3xl border border-border-subtle hover:border-action/30 transition-all text-center">
                    <p className="text-3xl font-black text-[var(--text-primary)]">
                      {user.stats?.contactClicks || 0}
                    </p>
                    <p className="text-[9px] font-bold uppercase text-[var(--text-secondary)] mt-1 tracking-widest">
                      Recruiter Interests
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm font-black text-[var(--text-primary)]">
                    Stellar Growth Track
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-1 uppercase font-bold tracking-widest">
                    Active Professional Portfolio
                  </p>
                </div>
              )}

              <div className="mt-8 p-4 bg-action/5 rounded-2xl border border-action/10 text-center">
                <p className="text-[10px] font-medium text-[var(--action)] flex items-center justify-center gap-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-action opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-action"></span>
                  </span>
                  Currently trending in {user.headline || "your industry"}
                </p>
              </div>
            </section>


            {/* Languages Card */}
            {user.languages && user.languages.length > 0 && (
              <section
                className={`${cardClasses} p-8 rounded-[2.5rem] border shadow-xl hover:shadow-action/10 transition-all`}
              >
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-[var(--text-secondary)]">
                  {sectionNames.languages || "Languages"}
                </h3>
                <div className="space-y-4">
                  {user.languages.map((lang, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 ${theme.cardStyle === 'classic' ? 'bg-foreground/5 dark:bg-slate-800' : 'bg-foreground/5 dark:bg-midnight/30'} rounded-2xl border border-border-subtle group hover:border-action/30 transition-all`}
                    >
                      <div>
                        <InlineEdit
                          value={lang.name}
                          onSave={(val) => handleArrayUpdate("languages", i, { name: val })}
                          isOwner={user.isOwner}
                          label="Language"
                          className="text-sm font-black text-[var(--text-primary)] block"
                        />
                        <div className="flex gap-1 mt-1">
                          {[1, 2, 3, 4].map((step) => {
                            const levels = ["Beginner", "Professional", "Advanced", "Native"];
                            const currentLevelIdx = levels.indexOf(lang.proficiency);
                            const isActive = step <= currentLevelIdx + 1;
                            return (
                              <button
                                key={step}
                                onClick={() => user.isOwner && handleArrayUpdate("languages", i, { proficiency: levels[step-1] })}
                                className={`h-1 w-6 rounded-full transition-all duration-500 ${isActive ? "bg-action" : "bg-foreground/10"} ${user.isOwner ? 'cursor-pointer hover:bg-action/50' : 'cursor-default'}`}
                                title={levels[step-1]}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <span className="text-[8px] font-black bg-action/10 text-[var(--action)] px-2 py-1 rounded-lg uppercase tracking-widest border border-action/20">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                  {user.isOwner && (
                    <button
                      onClick={() => handleLiveUpdate({ languages: [...(user.languages || []), { name: "New Language", proficiency: "Professional" }] })}
                      className="w-full p-4 rounded-2xl border-2 border-dashed border-white/10 hover:border-action/40 transition-all group opacity-60 hover:opacity-100 flex items-center justify-center gap-2"
                    >
                      <FaPlus className="text-xs text-action" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Add Language</span>
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* Skill Architecture [V3.2 Premium Split] */}
            <section
              className={`${cardClasses} p-8 md:p-10 rounded-[3rem] border-2 border-white/5 shadow-2xl hover:shadow-action/10 transition-all overflow-hidden relative group/skills`}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-action/5 rounded-full blur-[80px] -mr-24 -mt-24 group-hover/skills:bg-action/10 transition-colors" />
              
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white/40 flex items-center gap-3">
                <FaGem className="text-action" /> Skill Architecture
                <span className="flex-1 h-px bg-white/10" />
              </h3>

              <div className="space-y-12 relative z-10">
                {/* Technical Stack */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60">Technical Stack</h4>
                     <span className="text-[8px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">VERIFIED</span>
                  </div>
                  <div className="space-y-6">
                    {(user.skills || [])
                      .filter(s => s.category === "Technical" || !s.category || s.category === "Standard")
                      .map((skill, idx) => {
                        const actualIdx = user.skills.findIndex(s => s.name === skill.name);
                        return (
                          <div key={idx} className="space-y-3">
                            <div className="flex justify-between items-end">
                              <InlineEdit
                                value={skill.name}
                                onSave={(val) => handleArrayUpdate("skills", actualIdx, { name: val })}
                                isOwner={user.isOwner}
                                label="Skill"
                                className="text-sm font-black text-white"
                              />
                              <span className="text-[10px] font-black text-action/60">{skill.percentage || 80}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.percentage || 80}%` }}
                                transition={{ duration: 1.5 }}
                                className="h-full bg-action"
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Strategic Strengths */}
                <div className="space-y-6 pt-4 border-t border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60">Strategic Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {(user.skills || [])
                      .filter(s => s.category === "Soft Skills" || s.category === "Core Competencies" || s.category === "Strategic")
                      .map((skill, idx) => (
                        <div key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40">
                          {skill.name}
                        </div>
                      ))}
                  </div>
                </div>

                {user.isOwner && (
                  <button
                    onClick={() => handleLiveUpdate({ skills: [...(user.skills || []), { name: "New Skill", percentage: 80, category: "Technical" }] })}
                    className="w-full py-4 rounded-2xl border-2 border-dashed border-white/10 hover:border-action/40 transition-all opacity-40 hover:opacity-100 flex items-center justify-center gap-2"
                  >
                    <FaPlus className="text-[8px]" />
                    <span className="text-[8px] font-black uppercase tracking-tighter">Add Capability</span>
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>


      {/* Recruiter Sticky Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-white/80 dark:bg-midnight/80 backdrop-blur-2xl border-2 border-white/20 dark:border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-4 py-3 md:px-8 md:py-4 flex items-center gap-4 md:gap-8 w-full max-w-2xl pointer-events-auto"
        >
          {/* Quick Stats (Mobile Hide) */}
          <div className="hidden md:flex flex-col border-right pr-8 border-border-subtle">
            <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-tighter">
              Active Status
            </span>
            <span className="text-xs font-black text-[var(--action)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Open to Hire
            </span>
          </div>

          <div className="flex items-center gap-3 flex-1">
            {user.phoneNumber && (
              <a
                href={`https://wa.me/${user.phoneNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleTrackInteraction("contact")}
                className="p-4 bg-[#25D366] text-white rounded-2xl hover:bg-[#20ba5c] transition-all hover:-translate-y-1 shadow-lg shadow-green-500/20"
                title="WhatsApp Candidate"
              >
                <FaWhatsapp size={20} />
              </a>
            )}
            {user.email && (
              <a
                href={`mailto:${user.email}?subject=${encodeURIComponent(`Hiring Inquiry: ${user.firstName} ${user.lastName}`)}&body=${encodeURIComponent(`Hello ${user.firstName},\n\nI viewed your professional portfolio on CVify and I am interested in discussing a potential opportunity with you.\n\nBest regards.`)}`}
                onClick={() => handleTrackInteraction("contact")}
                className="flex-1 px-6 py-4 bg-action text-white rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-blue-600 transition-all hover:-translate-y-1 shadow-lg shadow-action/20 text-center relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                Hire {user.firstName} Now
              </a>
            )}
          </div>

          {/* Social Icons (Mobile Hide) */}
          <div className="hidden sm:flex items-center gap-4">
            {user.socialLinks?.linkedin && (
              <a
                href={ensureAbsoluteUrl(user.socialLinks.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-blue-600 transition-colors"
                onClick={() => handleTrackInteraction("contact")}
                title="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            )}
            {user.socialLinks?.github && (
              <a
                href={ensureAbsoluteUrl(user.socialLinks.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-black dark:hover:text-white transition-colors"
                onClick={() => handleTrackInteraction("contact")}
                title="GitHub"
              >
                <FaGithub size={20} />
              </a>
            )}
            {user.socialLinks?.twitter && (
              <a
                href={ensureAbsoluteUrl(user.socialLinks.twitter)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-blue-400 transition-colors"
                onClick={() => handleTrackInteraction("contact")}
                title="Twitter / X"
              >
                <FaTwitter size={20} />
              </a>
            )}
            {user.socialLinks?.portfolio && (
              <a
                href={ensureAbsoluteUrl(user.socialLinks.portfolio)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--action)] transition-colors"
                onClick={() => handleTrackInteraction("contact")}
                title="Personal Portfolio"
              >
                <FaGlobe size={20} />
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Global Branding Footer */}
      <footer className="w-full py-12 mt-20 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-action/5 to-transparent pointer-events-none" />
        <p className="relative z-10 flex items-center justify-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/20">
          Powered by <span className="text-action">CVify AI</span> Career Intelligence Engine
        </p>
        <p className="mt-4 text-[8px] font-bold text-white/10 uppercase tracking-widest">
          Version 3.2 Killer Upgrade • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default PublicProfile;
