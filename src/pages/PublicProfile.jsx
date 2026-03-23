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
  FaChartBar,
  FaRocket,
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
      <div className="max-w-6xl mx-auto px-4 md:px-6">
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
                       <FaFillDrip className="text-[var(--action)]" /> Theme Presets
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {themePresets.map((p) => {
                         const handlePresetSelect = () => {
                           handleThemeUpdate({...theme, ...p});
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
                          <span className="text-3xl filter drop-shadow-md">{p.icon}</span>
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
                      <FaPalette className="text-[var(--action)] text-[10px]" /> Brand Identity
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Gradient Primary", key: "headerBg" },
                        { label: "Gradient Secondary", key: "headerBgSecondary" },
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
                                onChange={(e) => handleThemeUpdate({...theme, [c.key]: e.target.value})}
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

                  {/* Aesthetics */}
                  <div className="pt-8 border-t border-border-subtle/50 space-y-5">
                    <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-[0.2em] flex items-center gap-2">
                       <FaLayerGroup className="text-[var(--action)]" /> Card Aesthetics
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: "minimal", name: "Minimalist", desc: "Clean, professional & flat" },
                        { id: "glass", name: "Glassmorphism", desc: "Modern frosted depth" },
                        { id: "classic", name: "Classic Hub", desc: "Solid elevation & shadows" },
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() => handleThemeUpdate({ ...theme, cardStyle: style.id })}
                          className={`p-6 rounded-[2.5rem] border-2 text-left transition-all flex items-center justify-between ${
                            theme.cardStyle === style.id
                              ? "border-action bg-action/5 shadow-xl shadow-action/5"
                              : "border-transparent bg-foreground/5 hover:border-action/20"
                          }`}
                        >
                          <div>
                            <h5 className="text-[11px] font-black text-[var(--text-primary)] uppercase mb-1 tracking-tight">{style.name}</h5>
                            <p className="text-[9px] text-[var(--text-secondary)] font-bold opacity-70 tracking-tight">{style.desc}</p>
                          </div>
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${theme.cardStyle === style.id ? "bg-action text-white shadow-lg" : "bg-foreground/10 text-[var(--text-secondary)]"}`}>
                            {theme.cardStyle === style.id ? <FaGem size={14} className="animate-pulse" /> : <FaCheckCircle size={14} />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Banner & Sync Status */}
                  <div className="pt-8 border-t border-border-subtle/50 space-y-6 pb-6">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-[0.2em] flex items-center gap-2">
                        <FaCog className="text-[var(--action)]" /> Banner Contrast
                      </label>
                      <span className="text-xs font-black text-[var(--action)] bg-action/10 px-3 py-1 rounded-full">{theme.bannerOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={theme.bannerOpacity}
                      onChange={(e) => handleThemeUpdate({...theme, bannerOpacity: parseInt(e.target.value)})}
                      className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-action"
                    />

                    <div className={`mt-4 p-4 rounded-3xl border flex items-center justify-center gap-3 transition-all duration-500 bg-white/50 dark:bg-black/20 ${isUpdating ? "border-amber-500/20 text-amber-500" : "border-emerald-500/20 text-emerald-500"}`}>
                      {isUpdating ? (
                        <><FaCog className="animate-spin text-sm" /><span className="text-[10px] font-black uppercase tracking-widest">Saving live...</span></>
                      ) : (
                        <><FaCheckCircle className="text-sm" /><span className="text-[10px] font-black uppercase tracking-widest">System Synced</span></>
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
        </motion.div>
      )}

      <Helmet>
        <title>{`${user.firstName} ${user.lastName} | ${user.headline || "Professional"} | CVify`}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={`https://fonts.googleapis.com/css2?family=${theme.fontPrimary.replace(/\s+/g, "+")}:wght@300;400;500;600;700;800;900&display=swap`} rel="stylesheet" />
        <meta name="description" content={user.bio || `Check out ${user.firstName}'s professional portfolio.`} />
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-10">
        {/* LEFT MAIN CONTENT (lg:cols-2) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Hero Unit [V3.4 PREMIUM] */}
          <section>
            <Card variant="glass" className="relative overflow-hidden border-none p-0 group">
              <div
                className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
                style={{
                  background: theme.bannerUrl
                    ? `url(${theme.bannerUrl}) center/cover no-repeat`
                    : `linear-gradient(to bottom right, ${theme.headerBg}, ${theme.headerBgSecondary || "#4c1d95"}, #1e1b4b)`,
                  opacity: (theme.bannerOpacity || 95) / 100,
                }}
              />
              <div className="relative z-10 p-8 md:p-14 lg:p-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} className="relative group/avatar">
                  <div className="w-56 h-56 md:w-72 md:h-72 rounded-[3.5rem] overflow-hidden border-4 border-white/20 shadow-2xl relative z-20">
                    <img src={user.profileImage || "https://images.unsplash.com/photo-1519085185758-2ad3ed098fb4"} alt={user.firstName} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-[2rem] shadow-2xl z-30">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400"><FaCheckCircle size={20} /></div>
                        <div>
                          <p className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none mb-1">ATS Score</p>
                          <p className="text-xl font-black text-white">{atsScore?.score || 0}%</p>
                        </div>
                     </div>
                  </div>
                </motion.div>
                <div className="flex-1 space-y-8 text-center lg:text-left">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/80 text-xs font-black uppercase tracking-widest">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> {user.industry || "Industry Expert"}
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
                     <button onClick={handleDownload} className="px-10 py-5 bg-action text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-action/30 flex items-center gap-3"><FaDownload /> Resume</button>
                     <button onClick={() => document.getElementById('career-dashboard')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-5 bg-white/10 backdrop-blur-md text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10 flex items-center gap-3"><FaChartBar /> Insights</button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Career Intelligence Dashboard [V3.4] */}
          <section id="career-dashboard" className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">Career Intelligence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
               <Card className="p-8 space-y-8 bg-gradient-to-br from-action/5 to-transparent border-action/20">
                  <div className="flex justify-between items-center">
                     <h3 className="text-xs font-black uppercase tracking-widest text-action">Optimization</h3>
                     <FaRocket className="text-action" />
                  </div>
                  <div className="relative flex items-center justify-center h-48">
                     <svg className="w-full h-full transform -rotate-90">
                        <circle cx="50%" cy="50%" r="70" className="stroke-white/5 fill-none stroke-[12]" />
                        <motion.circle cx="50%" cy="50%" r="70" className="stroke-action fill-none stroke-[12]" style={{ strokeDasharray: "440", strokeLinecap: "round" }} initial={{ strokeDashoffset: 440 }} animate={{ strokeDashoffset: 440 - (440 * (atsScore?.score || 0)) / 100 }} />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-[var(--text-primary)]">{atsScore?.score || 0}</span>
                        <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-60">SCORE</span>
                     </div>
                  </div>
               </Card>
               <Card className="p-8 space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500">Strengths</h3>
                  <div className="space-y-4">
                     {atsScore?.feedback?.positives?.slice(0, 4).map((match, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                           <span className="text-sm font-bold text-[var(--text-primary)] opacity-80">{match}</span>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>
          </section>

          {/* Professional Narrative [V3.4] */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">Narrative</h2>
            <Card className="p-8 md:p-12">
              <InlineEdit value={user.bio} onSave={(val) => handleLiveUpdate({ bio: val })} isOwner={user.isOwner} multiline={true} label="Bio" className="text-[var(--text-primary)] text-lg md:text-xl leading-relaxed font-medium whitespace-pre-wrap" />
            </Card>
          </section>

          {/* Professional Experience [V3.4] */}
          <section className="space-y-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">{sectionNames.experience}</h2>
            <div className="space-y-10 relative before:absolute before:left-[-1px] md:before:left-[31px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-action before:via-violet-600/30 before:to-transparent ml-4 md:ml-0">
            {(user.experience || []).map((exp, idx) => (
              <motion.div key={idx} initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="relative pl-12 md:pl-24">
                <div className="absolute left-[-21px] md:left-[12px] top-6 w-10 h-10 rounded-2xl bg-[var(--body-bg)] border-2 border-action z-10 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]"><FaBriefcase className="text-action text-sm" /></div>
                <Card className="hover:border-action/40 transition-all duration-500">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-[var(--text-primary)] group-hover:text-action transition-colors">
                      <InlineEdit value={exp.role} onSave={(v) => handleArrayUpdate("experience", idx, { role: v })} isOwner={user.isOwner} label="Role" />
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-action font-black text-lg"><InlineEdit value={exp.company} onSave={(v) => handleArrayUpdate("experience", idx, { company: v })} isOwner={user.isOwner} label="Company" /></span>
                      <span className="text-sm font-bold text-[var(--text-secondary)] tracking-widest uppercase">{exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-base text-[var(--text-secondary)] font-medium leading-relaxed">
                      <InlineEdit value={exp.achievements} onSave={(v) => handleArrayUpdate("experience", idx, { achievements: v })} isOwner={user.isOwner} multiline label="Achievements" />
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
            {user.isOwner && (
              <button onClick={() => handleLiveUpdate({ experience: [...(user.experience || []), { role: "New Role", company: "Company", startDate: "Date", endDate: "Present", isCurrent: true, achievements: "" }] })} className="ml-12 md:ml-24 w-full p-8 rounded-2xl border-2 border-dashed border-[var(--card-border)] hover:border-action/40 transition-all flex items-center justify-center gap-3 text-[var(--text-secondary)] hover:text-action bg-[var(--card-bg)]"><FaPlus /><span className="text-xs font-black uppercase tracking-widest">Add Experience</span></button>
            )}
            </div>
          </section>

          {/* Work Portfolio [V3.4] */}
          <section className="space-y-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">{sectionNames.projects}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {portfolio.map((proj, idx) => (
                <Card key={idx} className="group p-0 overflow-hidden border-none hover:shadow-glow-action transition-all duration-700">
                  <div className="aspect-video relative overflow-hidden bg-white/5">
                    {proj.thumbnail ? <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" /> : <div className="w-full h-full flex items-center justify-center bg-action/10"><FaLayerGroup className="text-5xl text-action/20" /></div>}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 backdrop-blur-sm">
                      {proj.githubLink && <a href={ensureAbsoluteUrl(proj.githubLink)} target="_blank" className="p-4 bg-white text-midnight rounded-2xl hover:scale-110 transition-transform"><FaGithub size={22} /></a>}
                      {proj.liveLink && <a href={ensureAbsoluteUrl(proj.liveLink)} target="_blank" className="p-4 bg-action text-white rounded-2xl hover:scale-110 transition-transform"><FaGlobe size={22} /></a>}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]"><InlineEdit value={proj.title} onSave={(v) => handleArrayUpdate("portfolio", idx, { title: v })} isOwner={user.isOwner} label="Project Name" /></h3>
                    <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed"><InlineEdit value={proj.description} onSave={(v) => handleArrayUpdate("portfolio", idx, { description: v })} isOwner={user.isOwner} multiline label="Overview" /></p>
                  </div>
                </Card>
              ))}
              {user.isOwner && (
                <button onClick={() => handleLiveUpdate({ portfolio: [...(user.portfolio || []), { title: "New Project", description: "" }] })} className="p-10 rounded-2xl border-2 border-dashed border-[var(--card-border)] hover:border-action/40 transition-all flex flex-col items-center justify-center gap-4 bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-action group opacity-60 hover:opacity-100 h-full"><FaPlus size={32} /><span className="text-xs font-black uppercase tracking-widest">Add Project</span></button>
              )}
            </div>
          </section>

          {/* Skill Architecture [V3.4] */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wide px-2">{sectionNames.skills}</h2>
            <Card className="p-8 md:p-12 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-60">Strategic Strengths</h4>
                     <div className="flex flex-wrap gap-2">
                        {(user.skills || []).filter(s => s.type !== "Technical").map((skill, si) => (
                           <span key={si} className="px-4 py-2 bg-[var(--body-bg)] border border-[var(--card-border)] rounded-xl text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest hover:border-action transition-colors">{skill.name}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </Card>
          </section>
        </div>

        {/* RIGHT SIDEBAR (lg:col-span-1) */}
        <div className="lg:col-span-1 space-y-6 sticky top-6 self-start">
          <Card variant="glass" className="bg-action/5 border-action/20 text-center py-6">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-action mb-6">Interaction Hub</h3>
             <div className="flex justify-center gap-10">
                <div className="text-center">
                   <p className="text-3xl font-black text-[var(--text-primary)]">{analytics.views || 0}</p>
                   <p className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Views</p>
                </div>
                <div className="text-center">
                   <p className="text-3xl font-black text-[var(--text-primary)]">{analytics.contactClicks || 0}</p>
                   <p className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Interests</p>
                </div>
             </div>
          </Card>

          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] opacity-60 px-2">{sectionNames.education}</h2>
            <div className="space-y-4">
              {(user.education || []).map((edu, i) => (
                <Card key={i} className="group hover:border-action/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-action/10 flex items-center justify-center text-action border border-action/10"><FaGraduationCap size={18} /></div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-sm font-black text-[var(--text-primary)]"><InlineEdit value={edu.degree} onSave={(v) => handleArrayUpdate("education", i, { degree: v })} isOwner={user.isOwner} label="Degree" /></h3>
                      <p className="text-[var(--text-secondary)] font-bold text-xs"><InlineEdit value={edu.institution} onSave={(v) => handleArrayUpdate("education", i, { institution: v })} isOwner={user.isOwner} label="Institution" /></p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] opacity-60 px-2">{sectionNames.services}</h2>
            <div className="space-y-4">
              {(user.services || []).map((srv, i) => (
                <Card key={i} className="group hover:border-action/40">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-action/10 flex items-center justify-center text-action border border-action/10"><FaGem size={16} /></div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-black text-[var(--text-primary)]"><InlineEdit value={srv.title} onSave={(v) => handleArrayUpdate("services", i, { title: v })} isOwner={user.isOwner} label="Service" /></h4>
                      <p className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed leading-none tracking-tight opacity-70 truncate">{srv.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] opacity-60 px-2">Certifications</h2>
            <div className="space-y-4">
              {(user.certifications || []).map((cert, idx) => (
                <Card key={idx} className="group hover:border-emerald-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/10"><FaCheckCircle size={18} /></div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-black text-[var(--text-primary)] leading-none"><InlineEdit value={cert.name} onSave={(v) => handleArrayUpdate("certifications", idx, { name: v })} isOwner={user.isOwner} label="Cert" /></h4>
                      <p className="text-emerald-500 font-bold text-[10px] uppercase opacity-70 tracking-widest">{cert.issuer}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] opacity-60 px-2">Linguistic Hub</h2>
            <Card>
               <div className="flex flex-wrap gap-2">
                  {(user.languages || []).map((lang, li) => (
                     <div key={li} className="px-3 py-1.5 bg-action/5 border border-action/20 rounded-xl flex items-center gap-2">
                        <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-wider">{lang.name}</span>
                        <span className="text-[8px] font-black text-action uppercase opacity-60">{lang.level}</span>
                     </div>
                  ))}
               </div>
            </Card>
          </section>
        </div>
      </div>

      <section className="pt-24 pb-48 text-center space-y-8">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
           <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest">Available for High-Impact Roles</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-black text-[var(--text-primary)] leading-tight tracking-tight">Ready for your next <br /> <span className="text-action">Major Breakthrough?</span></h2>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-medium leading-relaxed opacity-60">Directly collaborate to drive 10x value for your organization or high-stakes projects.</p>
      </section>
    </div>

    {/* Fixed Floating Action Bar [V3.4 PREMIUM] */}
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 flex justify-center pointer-events-none">
       <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-3xl bg-[var(--card-bg)] border border-action/20 shadow-[0_30px_90px_rgba(0,0,0,0.4)] rounded-[2rem] p-4 flex items-center gap-6 backdrop-blur-2xl pointer-events-auto">
          <div className="hidden sm:flex flex-col pl-4 border-r border-[var(--card-border)] pr-8">
             <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-tighter opacity-60">Candidate ID</span>
             <span className="text-sm font-black text-[var(--text-primary)]">{user.username?.toUpperCase()}</span>
          </div>
          <div className="flex-1 flex gap-3">
             {user.phoneNumber && <a href={`https://wa.me/${user.phoneNumber.replace(/\D/g, "")}`} className="p-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-2xl flex items-center justify-center"><FaWhatsapp size={22} /></a>}
             <a href={`mailto:${user.email}`} className="flex-1 px-10 py-4 bg-action text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-center shadow-lg shadow-action/20 transition-all hover:bg-violet-600">Contact Now</a>
          </div>
          <div className="hidden sm:flex items-center gap-5 pr-4">
             {user.socialLinks?.linkedin && <a href={ensureAbsoluteUrl(user.socialLinks.linkedin)} className="text-[var(--text-secondary)] hover:text-action transition-colors"><FaLinkedin size={22} /></a>}
             {user.socialLinks?.github && <a href={ensureAbsoluteUrl(user.socialLinks.github)} className="text-[var(--text-secondary)] hover:text-action transition-colors"><FaGithub size={22} /></a>}
          </div>
       </motion.div>
    </div>

    <footer className="w-full py-20 text-center border-t border-[var(--card-border)] bg-[var(--body-bg)]">
       <div className="max-w-6xl mx-auto px-6 space-y-6">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.5em] opacity-30">Powered by <span className="text-action">CVify Pro</span> Career Infrastructure</p>
          <div className="flex flex-wrap justify-center gap-8 text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-20">
             <span>System V3.4.1</span><span>•</span><span>ATS Intelligence: Active</span><span>•</span><span>Design: Unified</span>
          </div>
       </div>
    </footer>
  </div>
);
};

export default PublicProfile;
