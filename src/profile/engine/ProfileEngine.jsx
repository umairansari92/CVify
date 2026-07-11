import React, { useState, useCallback, useMemo, startTransition } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchPublicProfile, 
  updateActiveProfileLocally 
} from "../../features/profile/profileSlice";
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import {
  FaChartBar, FaTimes, FaCheckCircle, FaFilePdf, FaPalette,
} from "react-icons/fa";
import { Edit2 } from "lucide-react";
import { handleDownloadPDF } from "../../utils/pdfExport";
import { ThemeContext } from "./ThemeContext.jsx";
import ThemeResolver from "./ThemeResolver.jsx";
import ThemePanel from "../../components/profile/ThemePanel";
import { AiAgentWidget } from "../../components/AiAgentWidget";

/**
 * ProfileEngine — Layer 3 of the CVify Theme Engine Pipeline.
 *
 * Responsibilities:
 * - Apply CSS variables to the DOM from theme settings
 * - Render global overlays: Navbar, Resume Modal, HUD Dock, ThemePanel, AIWidget
 * - Provide ThemeContext to all primitives
 * - Delegate theme rendering to ThemeResolver
 *
 * FORBIDDEN: Redux selectors/dispatches (use passed props only), data fetching.
 */

const themePresets = [
  { name: "CVIFY CLASSIC",   headerBg: "#2563eb", headerBgSecondary: "#9333ea", bodyBg: "#f8fafc",  fontPrimary: "Inter",           cardStyle: "glass",   icon: "⚡", textPrimary: "#0f172a", textSecondary: "#64748b",              accentColor: "#2563eb" },
  { name: "MIDNIGHT DEV",    headerBg: "#0f172a", headerBgSecondary: "#1e293b", bodyBg: "#020617",  fontPrimary: "JetBrains Mono",  cardStyle: "minimal", icon: "🌙", textPrimary: "#f8fafc",  textSecondary: "#94a3b8",              accentColor: "#38bdf8" },
  { name: "CORPORATE GOLD",  headerBg: "#1e3a8a", headerBgSecondary: "#1e40af", bodyBg: "#ffffff",  fontPrimary: "Outfit",          cardStyle: "classic", icon: "🏢", textPrimary: "#1e293b", textSecondary: "#475569",              accentColor: "#d97706" },
  { name: "CREATIVE SUNSET", headerBg: "#f97316", headerBgSecondary: "#db2777", bodyBg: "#fff7ed",  fontPrimary: "Poppins",         cardStyle: "glass",   icon: "🌅", textPrimary: "#431407", textSecondary: "#9a3412",              accentColor: "#e11d48" },
  { name: "SLATE MINIMALIST",headerBg: "#475569", headerBgSecondary: "#64748b", bodyBg: "#f1f5f9",  fontPrimary: "Roboto",          cardStyle: "minimal", icon: "🎨", textPrimary: "#334155", textSecondary: "#64748b",              accentColor: "#0f172a" },
  { name: "EMERALD LEADER",  headerBg: "#059669", headerBgSecondary: "#10b981", bodyBg: "#f0fdf4",  fontPrimary: "Montserrat",      cardStyle: "classic", icon: "🌿", textPrimary: "#064e3b", textSecondary: "#065f46",              accentColor: "#059669" },
  { name: "ORIENTAL LUXE",   headerBg: "#101010", headerBgSecondary: "#181818", bodyBg: "#090909",  fontPrimary: "Outfit",          cardStyle: "glass",   icon: "🕌", textPrimary: "#ffffff",  textSecondary: "#a3a3a3",              accentColor: "#b58953" },
  { name: "AURA DARK",       headerBg: "#050505", headerBgSecondary: "#101010", bodyBg: "#000000",  fontPrimary: "Syne",            cardStyle: "minimal", icon: "✨", textPrimary: "#ffffff",  textSecondary: "#a1a1aa",              accentColor: "#B677EF" },
  { name: "TERMINAL DARK",   headerBg: "#050816", headerBgSecondary: "#151030", bodyBg: "#050816",  fontPrimary: "Inter",           cardStyle: "glass",   icon: "💻", textPrimary: "#ffffff",  textSecondary: "#aaa6c3",              accentColor: "#915eff" },
  { name: "CYBER NEON",      headerBg: "#080808", headerBgSecondary: "#000000", bodyBg: "#0a0a0a",  fontPrimary: "Orbitron",        cardStyle: "glass",   icon: "🟢", textPrimary: "#ffffff",  textSecondary: "#a1a1aa",              accentColor: "#00ffcc" },
  { name: "MONOGRAPH",       headerBg: "#000000", headerBgSecondary: "#1C1917", bodyBg: "#FAFAF9",  fontPrimary: "IBM Plex Sans",   cardStyle: "minimal", icon: "🖋️", textPrimary: "#292524", textSecondary: "#78716C",              accentColor: "#000000" },
  { name: "NOIR",            headerBg: "#060606", headerBgSecondary: "#000000", bodyBg: "#000000",  fontPrimary: "Satoshi",         cardStyle: "minimal", icon: "🌑", textPrimary: "#F0F0F0",  textSecondary: "#b0b0b0",               accentColor: "#FF2E0C" },
  { name: "APEX",            headerBg: "#0D0F12", headerBgSecondary: "#161920", bodyBg: "#0D0F12",  fontPrimary: "Outfit",          cardStyle: "minimal", icon: "🏆", textPrimary: "#ffffff",  textSecondary: "#94A3B8",               accentColor: "#2D9881" },
];

const ProfileEngine = ({
  user, model, loading, profileError,
  localTheme, setLocalTheme, analytics, isUpdating,
  handleLiveUpdate, username,
  displayValue, ensureAbsoluteUrl, personalInfo,
  deleteProjectThunk, openProjectModalThunk,
}) => {
  const dispatch = useDispatch();
  const [showThemePanel,  setShowThemePanel]  = useState(false);
  const [showResumeModal, setShowResumeModalState] = useState(false);
  const [isMenuOpen,      setIsMenuOpen]      = useState(false);
  // Stable callback — does NOT change reference when showResumeModal state changes.
  // This prevents setShowResumeModal from being a useMemo dep, which would cause
  // themeProps to be recreated on every modal open/close.
  const setShowResumeModal = useCallback((val) => setShowResumeModalState(val), []);

  // ── Resolve theme object from presets ──
  const savedTheme = user?.themeSettings;
  const theme = useMemo(() => {
    const base = localTheme || savedTheme || themePresets[0];
    const preset = themePresets.find(p => p.name === (savedTheme?.name || base?.name)) || themePresets[0];
    return { ...preset, ...base };
  }, [localTheme, savedTheme]);

  const isLight = ["#f8fafc","#ffffff","#f1f5f9","#f0fdf4","#fff7ed"].includes(theme.bodyBg?.toLowerCase());

  const themeStyles = useMemo(() => ({
    backgroundColor: theme.bodyBg,
    fontFamily: `'${theme.fontPrimary}', sans-serif`,
    "--primary-color":  theme.accentColor  || "#2563eb",
    "--bg-primary":     theme.bodyBg       || "#0f172a",
    "--text-primary":   theme.textPrimary  || (isLight ? "#0f172a" : "#ffffff"),
    "--text-secondary": theme.textSecondary|| (isLight ? "#64748b" : "#94a3b8"),
    "--card-bg":     theme.cardStyle === "glass" ? (isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)") : (isLight ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.02)"),
    "--card-border": theme.cardStyle === "glass" ? (isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)")  : (isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)"),
    color: "var(--text-primary)",
  }), [theme, isLight]);

  // ── Theme Context value ──
  const themeContextValue = useMemo(() => ({
    tokens: { colors: { accent: theme.accentColor, bg: theme.bodyBg, textPrimary: theme.textPrimary, textSecondary: theme.textSecondary }, fonts: { body: theme.fontPrimary } },
    config: {},
    manifest: null,
  }), [theme]);

  // ── Section ID resolver (reads from manifest.navigation) ──
  const getSectionId = useCallback((label) => {
    const id = label.toLowerCase();
    const themeId = theme.name?.replace(/\s+/g, "_").toUpperCase();
    // Manifest-based nav overrides (registry will handle this fully after Phase 3)
    const navMaps = {
      "ORIENTAL_LUXE":  { home: "hero-ol",     journey: "experience-ol", about: "about-ol", showcase: "showcase-ol", contact: "contact-ol" },
      "AURA_DARK":      { home: "ad-hero-name", journey: "experience-ad", about: "about-ad", showcase: "showcase-ad", contact: "contact-ad" },
      "TERMINAL_DARK":  { home: "hero-td",      journey: "experience-td", about: "about-td", showcase: "showcase-td", contact: "contact-td" },
      "CYBER_NEON":     { journey: "resume",    showcase: "projects" },
      "MONOGRAPH":      { journey: "resume",    showcase: "projects" },
      "NOIR":           { journey: "experience",showcase: "work" },
    };
    return navMaps[themeId]?.[id] || id;
  }, [theme.name]);

  // ── Theme panel update handler ──
  const handleThemeUpdate = useCallback((newTheme) => {
    const root = document.documentElement;
    if (newTheme.accentColor)   root.style.setProperty("--primary-color", newTheme.accentColor);
    if (newTheme.bodyBg)        root.style.setProperty("--bg-primary",    newTheme.bodyBg);
    if (newTheme.textPrimary)   root.style.setProperty("--text-primary",  newTheme.textPrimary);
    if (newTheme.textSecondary) root.style.setProperty("--text-secondary",newTheme.textSecondary);
    setTimeout(() => startTransition(() => setLocalTheme(newTheme)), 0);
    if (window._themeTimeout) clearTimeout(window._themeTimeout);
    window._themeTimeout = setTimeout(() => {
      handleLiveUpdate({ themeSettings: { ...newTheme, name: newTheme.name || user?.themeSettings?.name || "CVIFY CLASSIC" } });
    }, 500);
  }, [handleLiveUpdate, setLocalTheme, user?.themeSettings?.name]);

  const handleTogglePublic = useCallback(async (resumeId, current) => {
    if (!user?.isOwner) return;
    const newStatus = !current;
    const updated = user.resumes.map(r => r._id === resumeId ? { ...r, isPublic: newStatus } : r);
    dispatch(updateActiveProfileLocally({ resumes: updated }));
    try {
      await api.patch(`/resumes/${resumeId}`, { isPublic: newStatus });
      toast.success(newStatus ? "Resume Shared Publicly!" : "Resume Private.");
    } catch {
      toast.error("Failed to update status.");
      dispatch(fetchPublicProfile(username));
    }
  }, [user?.isOwner, user?.resumes, username, dispatch]);

  const publicResumes = useMemo(
    () => user?.isOwner ? (user?.resumes || []) : (user?.resumes?.filter(r => r.isPublic) || []),
    [user?.isOwner, user?.resumes]
  );

  const isOwner = user?.isOwner;

  // ── Resolve theme ID for registry ──
  const themeId = theme.name?.replace(/\s+/g, "_").toUpperCase() || "STANDARD";

  // ── ThemeProps contract ──
  const themeProps = useMemo(() => ({
    manifest: null, // will be injected by ThemeResolver from registry
    model,
    config: {},
    tokens: themeContextValue.tokens,
    components: {},
    runtime: {
      engineVersion: "4.0",
      themeVersion:  "1.0.0",
      mode:          isLight ? "light" : "dark",
      isPreview:     false,
      isOwner:       isOwner || false,
      viewport:      "desktop",
    },
    // Legacy props — kept for backward compat with existing theme sub-components
    user,
    projects:             model?.projects || [],
    isOwner:              isOwner,
    theme,
    displayValue,
    ensureAbsoluteUrl,
    personalInfo,
    deleteProjectThunk,
    openProjectModalThunk,
    dispatch,
    handleLiveUpdate:     model?.actions?.handleLiveUpdate,
    handleArrayUpdate:    model?.actions?.handleArrayUpdate,
    setShowResumeModal,
    contactForm:          model?.contact?.form,
    setContactForm:       model?.contact?.setForm,
    handleContactSubmit:  model?.contact?.onSubmit,
    isSending:            model?.contact?.isSending,
    githubData:           model?.github?.data,
    githubLoading:        model?.github?.loading,
    analytics,
  }), [model, user, isOwner, isLight, analytics, setShowResumeModal, themeContextValue.tokens,
       theme, displayValue, ensureAbsoluteUrl, personalInfo, deleteProjectThunk, openProjectModalThunk, dispatch]);

  // ── Guards ──
  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (profileError || !user) return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 text-center italic">
      <h1 className="text-8xl font-black mb-4 opacity-10">404</h1>
      <p className="text-xl text-slate-400 mb-8">Professional Intelligence Not Found.</p>
      <Link to="/" className="px-10 py-4 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">Back to Base</Link>
    </div>
  );

  const fullName  = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const jobTitle  = user?.headline || "";
  const bio       = user?.bio || "";
  const image     = user?.profileImage || "";

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div
        className={`min-h-screen bg-[var(--bg-primary)] overflow-x-hidden selection:bg-[var(--primary-color)] selection:text-gray-900`}
        style={themeStyles}
      >
        {/* ── SEO ── */}
        <Helmet>
          <title>{`${fullName}${jobTitle ? ` | ${jobTitle}` : ""} | CVify Pro`}</title>
          <meta name="description" content={bio.substring(0, 160) || "Professional Portfolio"} />
          <link rel="canonical" href={`https://app-cvifypro.vercel.app/p/${username}`} />
          <meta property="og:type"        content="profile" />
          <meta property="og:title"       content={`${fullName} - ${jobTitle || "Professional Portfolio"}`} />
          <meta property="og:description" content={bio.substring(0, 160)} />
          <meta property="og:image"       content={image || "https://cvifypro.vercel.app/og-image.png"} />
          <meta property="og:url"         content={`https://app-cvifypro.vercel.app/p/${username}`} />
          <meta name="twitter:card"        content="summary_large_image" />
          <meta name="twitter:title"       content={`${fullName} | ${jobTitle}`} />
          <meta name="twitter:description" content={bio.substring(0, 160)} />
          <meta name="twitter:image"       content={image} />
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org", "@type": "Person",
            name: fullName, jobTitle, image,
            url: `https://app-cvifypro.vercel.app/p/${username}`,
            description: bio,
            sameAs: [user?.socialLinks?.linkedin, user?.socialLinks?.github, user?.socialLinks?.twitter].filter(Boolean),
          })}</script>
          <style>{`html { scroll-behavior: smooth; }`}</style>
        </Helmet>

        {/* ── Resume Modal ── */}
        <AnimatePresence>
          {showResumeModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl">
                <div className="p-10 space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black">Select Version</h3>
                      <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Targeted for specific roles</p>
                    </div>
                    <button onClick={() => setShowResumeModal(false)} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                      <FaTimes />
                    </button>
                  </div>
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {publicResumes.length > 0 ? publicResumes.map((resume) => (
                      <div className="flex flex-col gap-2 w-full" key={resume._id}>
                        <div className="flex items-center justify-between w-full">
                          <button
                            onClick={() => { handleDownloadPDF(resume, resume.templateId); setShowResumeModal(false); }}
                            className="flex-1 p-8 bg-white/5 border border-white/10 hover:border-[var(--primary-color)]/50 rounded-[2rem] flex items-center justify-between group transition-all mr-2 relative overflow-hidden"
                          >
                            <div className="flex items-center gap-6 text-left">
                              <div className="w-16 h-16 bg-[var(--primary-color)]/10 rounded-2xl flex items-center justify-center text-[var(--primary-color)] group-hover:scale-110 transition-all duration-500">
                                <FaFilePdf size={24} />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-[var(--primary-color)] uppercase tracking-[0.2em] mb-1">Target Role</p>
                                <p className="text-lg font-black text-white leading-tight">{resume.jobTitle}</p>
                                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">{resume.title}</p>
                              </div>
                            </div>
                            <div className="text-right bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:border-[var(--primary-color)]/20 transition-all">
                              <p className="text-2xl font-black text-emerald-500">{resume.atsScore}%</p>
                              <p className="text-[8px] font-black opacity-30 uppercase tracking-tighter">ATS Intelligence</p>
                            </div>
                          </button>
                          {isOwner && (
                            <button
                              onClick={() => handleTogglePublic(resume._id, resume.isPublic)}
                              className={`p-6 rounded-3xl border transition-all ${resume.isPublic ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-white/5 border-white/10 text-white/40"}`}
                            >
                              {resume.isPublic ? <FaCheckCircle size={20} /> : <FaTimes size={20} />}
                            </button>
                          )}
                        </div>
                      </div>
                    )) : (
                      <div className="py-10 text-center opacity-30 italic">No public resumes shared.</div>
                    )}
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl flex items-center gap-4">
                    <FaCheckCircle className="text-emerald-500 text-xl" />
                    <p className="text-[9px] font-bold text-emerald-500/80 leading-relaxed uppercase tracking-widest">Public profile only displays AI-Audit verified versions.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── HUD Dock ── */}
        {isOwner && (
          <div className="fixed bottom-10 left-0 right-0 z-[110] flex items-center justify-center pointer-events-none">
            <motion.div drag dragMomentum={false} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileDrag={{ scale: 1.05 }}
              className="backdrop-blur-3xl border rounded-[2rem] p-4 flex items-center justify-between gap-10 shadow-2xl pointer-events-auto cursor-grab"
              style={{ background: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--text-primary)" }}>
              <div className="flex items-center gap-2 px-4 border-r border-white/5">
                <FaChartBar className="text-[var(--primary-color)] text-sm" />
                <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Recruiter Insights HUD</span>
              </div>
              <div className="flex gap-8 px-4">
                {[
                  { label: "Recruiters Reached",  value: analytics?.views || 0 },
                  { label: "Action Signals",       value: analytics?.resumeDownloads || 0 },
                  { label: "Direct Outreach",      value: analytics?.contactClicks || 0 },
                ].map(({ label, value }) => (
                  <div className="text-center" key={label}>
                    <p className="text-sm font-black">{value}</p>
                    <p className="text-[7px] font-bold opacity-40 uppercase tracking-tighter">{label}</p>
                  </div>
                ))}
              </div>
              <div className="pr-2 opacity-20"><div className="w-1 h-8 bg-white/20 rounded-full" /></div>
            </motion.div>
          </div>
        )}

        {/* ── Universal Floating Navbar ── */}
        <nav className="pub-nav fixed top-0 left-0 w-full z-[100] transition-all duration-500 p-4 sm:p-6 pt-6 sm:pt-8 flex justify-center">
          <div className="w-full max-w-7xl px-4 sm:px-8 h-16 sm:h-20 md:h-24 grid grid-cols-2 lg:grid-cols-3 items-center backdrop-blur-md bg-[var(--bg-primary)]/80 border border-[var(--card-border)] rounded-full shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-white/20 w-[150%] h-full transform -skew-x-12 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out z-20" />
                <img src="/CVify Favicon.jpg" alt="CVify Logo" className="w-full h-full object-contain relative z-10" />
              </div>
              <div className="hidden sm:flex flex-col justify-center">
                <span className="text-xl font-black tracking-tight text-[var(--text-primary)] leading-none mb-0.5">
                  CVify<span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-blue-400">Pro</span>
                </span>
                <span className="text-[9px] text-[var(--text-secondary)] font-bold tracking-[0.1em] uppercase whitespace-nowrap">Portfolio Engine</span>
              </div>
            </div>
            <div className="hidden lg:flex justify-center" />
            <div className="flex items-center justify-end gap-6">
              <div className="hidden xl:flex items-center space-x-6">
                {["Home","About","Journey","Showcase","Contact"].map((item) => (
                  <a key={item} href={`#${getSectionId(item)}`}
                    onClick={(e) => { e.preventDefault(); document.getElementById(getSectionId(item))?.scrollIntoView({ behavior: "smooth" }); }}
                    className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap">
                    {item}
                  </a>
                ))}
              </div>
              {isOwner && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary-color)]/30 bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-[8px] font-black tracking-widest uppercase animate-pulse">
                  <Edit2 size={12} /> Live Editor
                </div>
              )}
              <button
                onClick={() => setShowResumeModal(true)}
                className="hidden md:flex px-6 py-3 bg-[var(--primary-color)] text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                Get CV
              </button>
            </div>
          </div>
        </nav>

        {/* ── Theme Renderer ── */}
        <ThemeResolver themeId={themeId} themeProps={themeProps} />

        {/* ── Builder Controls ── */}
        {isOwner && (
          <>
            <div className="fixed top-32 right-6 z-[120]">
              <button onClick={() => setShowThemePanel(!showThemePanel)}
                className="w-16 h-16 bg-[var(--primary-color)] text-white rounded-[2rem] shadow-2xl flex items-center justify-center hover:scale-110 transition-all group">
                <FaPalette className="text-xl group-hover:rotate-12 transition-transform" />
              </button>
            </div>
            <ThemePanel
              isOpen={showThemePanel}
              onClose={() => setShowThemePanel(false)}
              theme={theme}
              onUpdate={handleThemeUpdate}
              isUpdating={isUpdating}
              presets={themePresets}
            />
          </>
        )}

        {/* ── AI Agent Widget ── */}
        <AiAgentWidget profileData={user} />
      </div>
    </ThemeContext.Provider>
  );
};

export default ProfileEngine;
