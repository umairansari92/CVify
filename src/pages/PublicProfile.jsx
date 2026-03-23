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
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchPublicProfile, 
  fetchProfileAnalytics,
  updateActiveProfileLocally,
  clearActiveProfile 
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
          if (atsResponse.data?.score) setAtsScore(atsResponse.data.score);
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
                
                {/* ATS Badge [V3.1 Dynamic] */}
                {atsScore && (
                  <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-br from-action to-violet-600 rounded-2xl shadow-2xl border border-white/20 z-20 animate-bounce-subtle">
                    <div className="text-[9px] font-black text-white uppercase tracking-widest leading-none mb-1 text-center">ATS Match</div>
                    <div className="text-lg font-black text-white leading-none text-center">{atsScore}%</div>
                  </div>
                )}

                <div 
                  className="absolute -bottom-6 -right-4 p-3 pr-6 rounded-2xl shadow-xl flex items-center gap-3 border z-20 group"
                  style={{
                    backgroundColor: theme.cardStyle === 'glass' ? `color-mix(in srgb, ${theme.textPrimary} 8%, ${theme.bodyBg})` : theme.bodyBg,
                    backdropFilter: theme.cardStyle === 'glass' ? 'blur(20px)' : 'none',
                    borderColor: `color-mix(in srgb, ${theme.textPrimary} 20%, transparent)`
                  }}
                >
                  <div className="w-8 h-8 rounded-xl bg-action/10 flex items-center justify-center">
                    <FaMapMarkerAlt style={{ color: theme.accentColor }} className="animate-pulse" />
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] font-bold uppercase tracking-widest opacity-60">Location</div>
                    <div className="text-xs font-black transition-colors" style={{ color: theme.textPrimary }}>
                      {user.location || "Available Remote"}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Bio & Actions */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
              {/* Availability Badge */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border shadow-lg backdrop-blur-md ${
                  user.availability === "Open to Work"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : user.availability === "Freelance Available"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                <div className={`w-2 h-2 rounded-full animate-pulse shadow-glow ${
                  user.availability === "Open to Work" ? "bg-emerald-400" :
                  user.availability === "Freelance Available" ? "bg-amber-400" : "bg-red-400"
                }`} />
                {user.availability || "Open to Work"}
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl md:text-7xl font-black tracking-tight text-white leading-tight"
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
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
                >
                  <InlineEdit
                    value={user.headline}
                    onSave={(val) => handleLiveUpdate({ headline: val })}
                    isOwner={user.isOwner}
                    label="Headline"
                    className="text-xl md:text-3xl font-bold text-white/90 leading-tight block"
                  />
                  {user.industry && user.industry !== "Other" && (
                    <span className="px-4 py-1 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 shadow-lg text-white/70">
                      {user.industry}
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Contact Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                {user.phoneNumber && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href={`https://wa.me/${user.phoneNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleTrackInteraction("contact")}
                    className="flex items-center gap-3 px-6 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-2xl transition-all group"
                  >
                    <FaWhatsapp className="text-green-500 text-xl group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none mb-1">WhatsApp</div>
                      <div className="text-xs font-black text-white">{user.phoneNumber}</div>
                    </div>
                  </motion.a>
                )}
                
                <div className="flex items-center gap-3">
                  {[
                    { icon: <FaLinkedin />, link: user.socialLinks?.linkedin, title: "LinkedIn", color: "hover:text-blue-500" },
                    { icon: <FaGithub />, link: user.socialLinks?.github, title: "GitHub", color: "hover:text-slate-400" },
                    { icon: <FaTwitter />, link: user.socialLinks?.twitter, title: "Twitter", color: "hover:text-blue-400" },
                    { icon: <FaGlobe />, link: user.socialLinks?.portfolio, title: "Portfolio", color: "hover:text-action" }
                  ].map((social, idx) => social.link && (
                    <a
                      key={idx}
                      href={ensureAbsoluteUrl(social.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all hover:-translate-y-1 ${social.color}`}
                      title={social.title}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Premium Action CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="px-10 py-5 bg-white text-midnight font-black rounded-3xl flex items-center gap-4 hover:shadow-glow-white transition-all shadow-2xl text-base group"
                  style={{ color: '#0f172a' }}
                >
                  <div className="w-8 h-8 rounded-xl bg-midnight/5 flex items-center justify-center group-hover:bg-midnight group-hover:text-white transition-colors">
                    <FaDownload />
                  </div>
                  <span className="uppercase tracking-widest text-sm">Download Resume</span>
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={`mailto:${user.email}?subject=Professional Collaboration Inquiry`}
                  onClick={() => handleTrackInteraction("contact")}
                  className="px-10 py-5 bg-action text-white font-black rounded-3xl flex items-center gap-4 hover:bg-action/90 shadow-2xl transition-all shadow-action/20 text-base"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <FaEnvelope />
                  </div>
                  <span className="uppercase tracking-widest text-sm">Hire Candidate</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </header>

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
                      
                      {(exp.tools?.length > 0 || user.isOwner) && (
                        <div className="mt-8 pt-6 border-t border-white/5">
                          <div className="flex flex-wrap gap-2">
                            {(exp.tools || []).map((tool, tidx) => (
                              <span key={tidx} className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] border border-white/5">
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
                        <span className="text-[10px] font-black text-orange-600 bg-orange-500/5 px-2 py-0.5 rounded-lg border border-orange-500/10 uppercase tracking-tighter">
                          {edu.graduationDate || "Graduated"}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="text-xs font-medium text-[var(--text-secondary)] mt-4 leading-relaxed group-hover:text-[var(--text-primary)] transition-colors italic">
                          "{edu.description}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
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
                      className="flex flex-col gap-3 p-6 rounded-3xl border transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl"
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
                        <h4 className="font-black text-base leading-tight">
                          {service.title}
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed opacity-80 mt-1 font-medium">
                        {service.description}
                      </p>
                    </div>
                  ))}
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
                      className={`${cardClasses} p-8 rounded-[2.5rem] flex flex-col h-full group hover:shadow-glow-action transition-all border relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-action/5 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:bg-action/10 transition-colors"></div>

                      {/* Project Thumbnail Placeholder/Generated */}
                      <div className="aspect-video rounded-3xl overflow-hidden mb-6 bg-white/5 border border-white/10 relative group">
                        {proj.thumbnail ? (
                          <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-action/20 to-violet-600/20">
                            <FaLayerGroup className="text-4xl text-action/40 animate-pulse" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                          {proj.githubLink && (
                            <a href={ensureAbsoluteUrl(proj.githubLink)} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl transition-all border border-white/20">
                              <FaGithub size={20} />
                            </a>
                          )}
                          {proj.liveLink && (
                            <a href={ensureAbsoluteUrl(proj.liveLink)} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 hover:bg-white text-white hover:text-action rounded-2xl transition-all border border-white/20">
                              <FaGlobe size={20} />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-black text-[var(--text-primary)] group-hover:text-[var(--action)] transition-colors">
                            {proj.title}
                          </h4>
                          {proj.isFeatured && (
                            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-amber-500/20">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3">
                          {proj.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {(proj.techStack || []).map((tech, tidx) => (
                            <span key={tidx} className="px-3 py-1 rounded-lg bg-action/5 text-[9px] font-black uppercase tracking-tighter text-[var(--action)] border border-action/10">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            {proj.githubLink && (
                              <a href={ensureAbsoluteUrl(proj.githubLink)} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--action)] transition-colors flex items-center gap-2">
                                <FaGithub /> GitHub
                              </a>
                            )}
                            {proj.liveLink && (
                              <a href={ensureAbsoluteUrl(proj.liveLink)} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--action)] transition-colors flex items-center gap-2">
                                <FaGlobe /> Live Demo
                              </a>
                            )}
                         </div>
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--text-secondary)] opacity-40">
                           <FaCheckCircle size={14} />
                         </div>
                      </div>
                    </motion.div>
                  ))}
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
                          <h4 className="text-lg font-black text-[var(--text-primary)] truncate">
                            {cert.name}
                          </h4>
                          <p className="text-sm font-bold text-emerald-500">
                            {cert.issuer}
                          </p>
                          <p className="text-[10px] font-black uppercase text-[var(--text-secondary)] mt-2 opacity-60">
                            Issued: {cert.date}
                          </p>
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
                            <h4 className="text-xl font-black text-[var(--text-primary)]">
                              {ach.title}
                            </h4>
                            <span className="text-[10px] font-black text-amber-600 bg-amber-500/5 px-2 py-0.5 rounded-lg border border-amber-500/10 uppercase tracking-tighter">
                              {ach.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed relative z-10">
                        {ach.description}
                      </p>
                    </motion.div>
                  ))}
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
                        <h4 className="text-sm font-black text-[var(--text-primary)]">
                          {lang.name}
                        </h4>
                        <div className="flex gap-1 mt-1">
                          {[1, 2, 3, 4].map((step) => {
                            const levels = [
                              "Beginner",
                              "Professional",
                              "Advanced",
                              "Native",
                            ];
                            const currentLevelIdx = levels.indexOf(
                              lang.proficiency,
                            );
                            const isActive = step <= currentLevelIdx + 1;
                            return (
                              <div
                                key={step}
                                className={`h-1 w-6 rounded-full transition-all duration-500 ${isActive ? "bg-action" : "bg-foreground/10"}`}
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
                </div>
              </section>
            )}

            {/* Technical Expertise [Moved & Dynamic] */}
            <section
              className={`${cardClasses} p-8 rounded-[2.5rem] border shadow-xl hover:shadow-action/10 transition-all overflow-hidden relative`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-action/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-[var(--text-secondary)] flex items-center gap-3">
                {sectionNames.skills}
                <span className="flex-1 h-px bg-border-subtle opacity-20"></span>
              </h3>

              <div className="space-y-8 relative z-10">
                {/* Technical Skills (Progress Bars) */}
                <div className="space-y-6">
                  {(user.skills || [])
                    .filter(s => s.category === "Technical" || !s.category)
                    .map((skill, idx) => {
                      const actualIdx = user.skills.findIndex(s => s.name === skill.name);
                      return (
                        <div key={idx} className="space-y-3 group">
                          <div className="flex justify-between items-end">
                            <span className="text-sm font-black text-[var(--text-primary)] group-hover:text-action transition-colors">{skill.name}</span>
                            <div className="flex items-center gap-1">
                              <InlineEdit
                                value={skill.percentage || 80}
                                onSave={(val) => handleArrayUpdate("skills", actualIdx, { percentage: parseInt(val) || 80 })}
                                isOwner={user.isOwner}
                                label="%"
                                className="text-[10px] font-black text-action bg-action/10 px-2 py-0.5 rounded-md cursor-help"
                              />
                              <span className="text-[10px] font-black text-action/50">%</span>
                            </div>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.percentage || 80}%` }}
                              transition={{ duration: 1, delay: idx * 0.1 }}
                              className="h-full bg-gradient-to-r from-action to-violet-500 rounded-full shadow-glow-action"
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Core Competencies (Badges) */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Core Competencies</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(user.skills || [])
                      .filter(s => s.category && s.category !== "Technical")
                      .map((skill, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-action/30 hover:bg-white/10 text-xs font-bold text-[var(--text-secondary)] transition-all cursor-default"
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                  </div>
                </div>
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
      <footer className="w-full py-6 mt-12 border-t border-white/10 text-center text-[10px] md:text-xs text-[var(--text-secondary)]">
        <p>
          Designed and developed by{" "}
          <a
            href="https://cvifypro.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black hover:text-[var(--action)] transition-colors uppercase tracking-widest"
          >
            CVify
          </a>
        </p>
      </footer>
    </div>
  );
};

export default PublicProfile;
