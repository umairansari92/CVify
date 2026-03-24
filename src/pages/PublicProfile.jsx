import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../api/axios";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaGlobe,
  FaBriefcase,
  FaPalette,
  FaCheckCircle,
  FaPlus,
  FaLayerGroup,
} from "react-icons/fa";
import { 
  Trash, 
  Plus, 
  FileText, 
  Edit3, 
  Download, 
  Palette,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  Globe,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Send,
  Image as ImageIcon,
  Rocket,
  Edit2,
  X,
  Menu
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchPublicProfile, 
  fetchProfileAnalytics,
  updateActiveProfileLocally,
  clearActiveProfile,
  applyAtsFix,
  deleteSloganThunk,
  addSloganThunk,
  updateHeroImageThunk,
  deleteProjectThunk,
  openProjectModalThunk
} from "../features/profile/profileSlice";
import { handleDownloadPDF } from "../utils/pdfExport";
import InlineEdit from "../components/profile/InlineEdit";
import ThemePanel from "../components/profile/ThemePanel";
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
  const profile = { data: user || {} };

  // V4.3 ENRICHMENT: Seed Namaz Tracking App if missing for umairansari92
  const projects = useMemo(() => {
    const baseProjects = [...(user?.projects || user?.portfolio || [])];
    if (baseProjects.length === 0 && user?.username === "umairansari92") {
      baseProjects.push({
        _id: "seed-namaz",
        title: "Namaz Tracking Dashboard — Real-Time Utility",
        description: "A specialized PWA built with Firebase & Firestore for seamless daily prayer tracking. Features include history filtering (7/30 days), Urdu & English UI support (Nastaliq fonts), and privacy-first offline capability.",
        githubLink: "https://github.com/umairansari92/Namaz-Tracking-App",
        isFeatured: true,
        techStack: ["React", "Firebase", "PWA", "Urdu Fonts"]
      });
    }
    return baseProjects;
  }, [user?.projects, user?.portfolio, user?.username]);

  // V4.4 Dynamic Selectors
  const slogans = user?.heroSlogans || [];
  const personalInfo = user?.personalInfo || { fullName: user?.firstName + " " + user?.lastName, image: user?.profileImage, objective: user?.headline };
  const branding = user?.branding || {};
  const isOwner = user?.isOwner;
  const publicResumes = isOwner ? (user?.resumes || []) : (user?.resumes?.filter(r => r.isPublic === true) || []);

  const [localTheme, setLocalTheme] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user?.themeSettings) {
      const theme = user.themeSettings;
      const root = document.documentElement;
      root.style.setProperty('--bg-body', theme.bodyBg || "#0f172a");
      root.style.setProperty('--accent', theme.accentColor || "#2563eb");
      root.style.setProperty('--header-from', theme.headerBg || "#2563eb");
      root.style.setProperty('--header-to', theme.headerBgSecondary || "#9333ea");
      root.style.setProperty('--text-primary', theme.textPrimary || "#ffffff");
      root.style.setProperty('--text-secondary', theme.textSecondary || "#94a3b8");
      setLocalTheme(theme);
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

  const handleLiveUpdate = async (updates) => {
    if (!user.isOwner) return;
    setIsUpdating(true);
    try {
      dispatch(updateActiveProfileLocally(updates));
      await api.patch("/auth/profile", updates);
      toast.success("Branding Synced!", { id: "sync" });
    } catch (err) {
      toast.error("Sync failed.");
      dispatch(fetchPublicProfile(username));
    } finally { setIsUpdating(false); }
  };

  const handleArrayUpdate = (field, index, updatedItem) => {
    if (!user.isOwner) return;
    const newArray = [...user[field]];
    newArray[index] = { ...newArray[index], ...updatedItem };
    handleLiveUpdate({ [field]: newArray });
  };

  const handleThemeUpdate = async (newTheme) => {
    setLocalTheme(newTheme);
    if (window.themeUpdateTimeout) clearTimeout(window.themeUpdateTimeout);
    window.themeUpdateTimeout = setTimeout(() => {
      handleLiveUpdate({ themeSettings: newTheme });
    }, 500);
  };

  const handleTogglePublic = async (resumeId, currentStatus) => {
    if (!user.isOwner) return;
    try {
      const newStatus = !currentStatus;
      // Optimistic Update
      const updatedResumes = user.resumes.map(r => r._id === resumeId ? { ...r, isPublic: newStatus } : r);
      dispatch(updateActiveProfileLocally({ resumes: updatedResumes }));
      
      await api.patch(`/resumes/${resumeId}`, { isPublic: newStatus });
      toast.success(newStatus ? "Resume Shared Publicly!" : "Resume Private.");
    } catch (_err) {
      toast.error("Failed to update status.");
      dispatch(fetchPublicProfile(username));
    }
  };



  const ensureAbsoluteUrl = (url) => {
    if (!url || typeof url !== "string") return "";
    const trimmed = url.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) return trimmed;
    return `https://${trimmed}`;
  };

  const themePresets = [
    { name: "Classic Pro", headerBg: "#2563eb", headerBgSecondary: "#9333ea", bodyBg: "#0f172a", fontPrimary: "Inter", cardStyle: "glass", icon: "⚡", textPrimary: "#ffffff", textSecondary: "#94a3b8", accentColor: "#2563eb" },
    { name: "Executive Dark", headerBg: "#000000", headerBgSecondary: "#1e293b", bodyBg: "#020617", fontPrimary: "JetBrains Mono", cardStyle: "minimal", icon: "💎", textPrimary: "#f8fafc", textSecondary: "#94a3b8", accentColor: "#38bdf8" },
    { name: "Minimalist", headerBg: "#f1f5f9", headerBgSecondary: "#e2e8f0", bodyBg: "#ffffff", fontPrimary: "Outfit", cardStyle: "classic", icon: "⚪", textPrimary: "#1e293b", textSecondary: "#475569", accentColor: "#1e3a8a" },
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (profileError || !user) return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 text-center italic">
      <h1 className="text-8xl font-black mb-4 opacity-10">404</h1>
      <p className="text-xl text-slate-400 mb-8">Professional Intelligence Not Found.</p>
      <Link to="/" className="px-10 py-4 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">Back to Base</Link>
    </div>
  );

  const theme = localTheme || themePresets[0];

  const ScoreCard = ({ label, score, color = "var(--action)" }) => (
    <Card className="p-8 space-y-6 bg-white/[0.02]">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
        <span>{label}</span>
        <span style={{ color }}>{score}%</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-black">{score}</span>
        <span className="text-[10px] font-bold opacity-30 pb-1.5">%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${score}%` }} transition={{ duration: 1.5 }} className="h-full" style={{ backgroundColor: color }} />
      </div>
    </Card>
  );

  return (
    <div
      className="min-h-screen transition-colors duration-500 selection:bg-[var(--primary-color)] selection:text-white overflow-x-hidden"
      style={{
        backgroundColor: theme.bodyBg,
        fontFamily: `'${theme.fontPrimary}', sans-serif`,
        "--primary-color": theme.accentColor || "#2563eb",
        "--bg-primary": theme.bodyBg || "#0f172a",
        "--text-primary": theme.textPrimary || "#ffffff",
        "--text-secondary": theme.textSecondary || "#94a3b8",
        "--card-bg": theme.cardStyle === "glass" ? "rgba(255, 255, 255, 0.04)" : "rgba(255,255,255,0.02)",
        "--card-border": theme.cardStyle === "glass" ? "rgba(255, 255, 255, 0.1)" : "rgba(255,255,255,0.08)",
        color: "var(--text-primary)",
      }}
    >
      <Helmet>
        <title>{`${personalInfo.fullName} | ${branding.siteTitle || "Career Intelligence"}`}</title>
        <link href={`https://fonts.googleapis.com/css2?family=${theme.fontPrimary.replace(/\s+/g, "+")}:wght@300;400;500;600;700;800;900&display=swap`} rel="stylesheet" />
        <style>{`html { scroll-behavior: smooth; }`}</style>
      </Helmet>

      {/* ── Resume Selector Modal [V4.4] ── */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl">
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-center text-center">
                  <div className="space-y-1 text-left">
                    <h3 className="text-2xl font-black">Select Version</h3>
                    <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Targeted for specific roles</p>
                  </div>
                  <button onClick={() => setShowResumeModal(false)} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {publicResumes.length > 0 ? (
                    publicResumes.map((resume, idx) => (
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center justify-between w-full">
                          <button 
                            onClick={() => { handleDownloadPDF(resume, resume.templateId); setShowResumeModal(false); }}
                            className="flex-1 p-6 bg-white/5 border border-white/5 hover:border-action/30 rounded-3xl flex items-center justify-between group transition-all mr-2"
                          >
                            <div className="flex items-center gap-6 text-left">
                              <div className="w-12 h-12 bg-action/10 rounded-2xl flex items-center justify-center text-action group-hover:scale-110 transition-all">
                                <FaFilePdf size={20} />
                              </div>
                              <div>
                                <p className="text-sm font-black text-white">{resume.title || `Resume Version ${idx + 1}`}</p>
                                <p className="text-[9px] font-bold opacity-40 uppercase tracking-wider">{resume.jobTitle || "Professional Standard"}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-black text-emerald-500">{resume.atsScore || "85"}%</p>
                              <p className="text-[7px] font-black opacity-30 uppercase tracking-tighter">ATS Score</p>
                            </div>
                          </button>
                          
                          {isOwner && (
                            <button 
                              onClick={() => handleTogglePublic(resume._id, resume.isPublic)}
                              className={`p-6 rounded-3xl border transition-all ${resume.isPublic ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-white/5 border-white/10 text-white/40"}`}
                              title={resume.isPublic ? "Publicly Shared" : "Private (Hidden)"}
                            >
                              {resume.isPublic ? <FaCheckCircle size={20} /> : <FaTimes size={20} />}
                            </button>
                          )}
                        </div>
                        {isOwner && (
                          <p className="text-[7px] font-black uppercase tracking-widest opacity-30 pl-4">
                            {resume.isPublic ? "Visible to Recruiters" : "Hidden from Public"}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center opacity-30 italic">No public resumes shared.</div>
                  )}
                </div>

                <div className="bg-action/5 border border-action/20 p-6 rounded-3xl flex items-center gap-4">
                  <FaCheckCircle className="text-action text-xl" />
                  <p className="text-[9px] font-bold text-action/80 leading-relaxed uppercase tracking-widest">Public profile only displays AI-Audit verified versions.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Owner Analytics Bar ── */}
      {user.isOwner && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] w-full max-w-lg px-4 flex items-center justify-center pointer-events-none">
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 flex items-center justify-between gap-10 shadow-2xl pointer-events-auto">
            <div className="flex items-center gap-2 px-4 border-r border-white/5">
              <FaChartBar className="text-action text-sm" />
              <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Intelligence Hub</span>
            </div>
            <div className="flex gap-8 px-4">
              <div className="text-center"><p className="text-sm font-black text-white">{analytics.views || 0}</p><p className="text-[7px] font-bold opacity-40 uppercase tracking-tighter">Views</p></div>
              <div className="text-center"><p className="text-sm font-black text-white">{analytics.resumeDownloads || 0}</p><p className="text-[7px] font-bold opacity-40 uppercase tracking-tighter">Downloads</p></div>
              <div className="text-center"><p className="text-sm font-black text-white">{analytics.contactClicks || 0}</p><p className="text-[7px] font-bold opacity-40 uppercase tracking-tighter">Interests</p></div>
            </div>
          </motion.div>
        </div>
      )}

      {/* --- PREMIUM FLOATING NAVBAR (V4.5) --- */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 p-6 flex justify-center ${scrolled ? 'pt-4' : 'pt-8'}`}>
        <div className={`w-full max-w-7xl px-8 h-20 md:h-24 flex items-center justify-between backdrop-blur-md bg-[var(--bg-primary)]/80 border border-[var(--card-border)] rounded-full shadow-2xl transition-all duration-500 ${scrolled ? 'shadow-[var(--primary-color)]/10 scale-[0.98]' : ''}`}>
          
          {/* Brand/Identity (Left) */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[0_0_15px_var(--primary-color)]/20 group-hover:scale-110 transition-all duration-500">
               <span className="text-2xl font-black text-[var(--text-primary)]">C</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-black tracking-tighter text-[var(--text-primary)]">
                CVify <span className="text-[var(--primary-color)]">Pro</span>
              </span>
            </div>
          </div>

          {/* Dynamic Name Branding (Center) */}
          <div 
             className="absolute left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <InlineEdit isOwner={isOwner} id="fullNameNav" value={personalInfo.fullName} selector={state => state.profile.data.personalInfo.fullName}>
              <h1 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tighter uppercase font-serif">
                {personalInfo.fullName || 'Welcome'}
              </h1>
            </InlineEdit>
          </div>

          {/* Navigation & Action (Right) */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'About', 'Journey', 'Showcase', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Owner HUD Widget */}
            {isOwner && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary-color)]/30 bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-[8px] font-black tracking-widest uppercase animate-pulse">
                <Edit2 size={12} /> Live Editor
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-full bg-white/5 text-[var(--text-primary)] hover:bg-[var(--primary-color)]/20 transition-all"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {/* Resume Button (Desktop) */}
            <button 
              onClick={() => setShowResumeModal(true)}
              className="hidden md:flex px-6 py-3 bg-[var(--primary-color)] text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_var(--primary-color)]/30"
            >
              Get CV
            </button>
          </div>
        </div>

        {/* --- MOBILE DRAWER (V4.6) --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-32 left-6 right-6 z-[90] p-8 bg-[var(--bg-primary)]/95 backdrop-blur-2xl border border-[var(--card-border)] rounded-[3rem] shadow-2xl lg:hidden flex flex-col gap-6"
            >
              {['Home', 'About', 'Journey', 'Showcase', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[var(--text-primary)] text-2xl font-black uppercase tracking-tighter hover:text-[var(--primary-color)] transition-colors"
                >
                  {item}
                </a>
              ))}
              <hr className="border-white/5" />
              <button 
                onClick={() => { setIsMenuOpen(false); setShowResumeModal(true); }}
                className="w-full py-5 bg-[var(--primary-color)] text-white rounded-2xl font-black uppercase tracking-widest"
              >
                Download Resume
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- KILLER HERO SECTION (V4.6) --- */}
      <section id="home" className="relative min-h-[95vh] flex items-center justify-center pt-32 overflow-hidden outline-none">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[var(--primary-color)]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-10 md:space-y-14">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl">
              <Rocket size={16} className="text-[var(--primary-color)]" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">
                <InlineEdit isOwner={isOwner} id="heroStatus" value={branding.identityLabel || "Available for High-Impact Projects"} selector={state => state.profile.data.branding.identityLabel}>
                   {branding.identityLabel || "Available for High-Impact Projects"}
                </InlineEdit>
              </span>
            </span>
          </motion.div>

          {/* Massive Typography Headline */}
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-primary)] tracking-tighter leading-[0.9] uppercase"
            >
              <InlineEdit isOwner={isOwner} id="heroTitle" value={personalInfo.fullName} selector={state => state.profile.data.personalInfo.fullName}>
                {personalInfo.fullName || 'Architect'}
              </InlineEdit>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--primary-color)] to-[var(--text-secondary)] tracking-tight leading-tight"
            >
              <InlineEdit isOwner={isOwner} id="heroRole" value={personalInfo.jobTitle} selector={state => state.profile.data.personalInfo.jobTitle}>
                {personalInfo.jobTitle || 'Engineering Future Solutions.'}
              </InlineEdit>
            </motion.h2>
          </div>

          {/* Power Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl lg:text-3xl text-[var(--text-secondary)] font-medium max-w-3xl mx-auto leading-relaxed"
          >
            <InlineEdit isOwner={isOwner} id="heroObjective" value={personalInfo.objective} selector={state => state.profile.data.personalInfo.objective} type="textarea">
              <p className="opacity-80">"{personalInfo.objective || 'I build intelligent digital products that bridge the gap between human needs and complex technology.'}"</p>
            </InlineEdit>
          </motion.div>

          {/* Interactive CTA Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10"
          >
            <a 
              href="#showcase" 
              className="group relative px-12 py-5 bg-[var(--primary-color)] text-white rounded-full font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_var(--primary-color)]/40 flex items-center gap-3"
            >
              <span className="relative z-10">🚀 View My Journey</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-5 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-full font-black text-xs uppercase tracking-widest hover:border-[var(--primary-color)]/50 transition-all flex items-center gap-3"
            >
              📩 Contact Me
            </button>
          </motion.div>

        </div>

        {/* Subtle Animated Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--primary-color)] opacity-40 flex flex-col items-center gap-2"
        >
           <span className="text-[8px] font-black uppercase tracking-[0.4em]">Initialize</span>
           <FaChevronDown size={20} />
        </motion.div>
      </section>

      {/* --- 1. ABOUT & INDUSTRY --- */}
      <section id="about" className="py-24 border-b border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          {/* Industry Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold tracking-widest text-[var(--primary-color)] uppercase bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 rounded-full">
              <InlineEdit isOwner={isOwner} label="Industry" value={user.personalInfo?.industry} onSave={(v) => handleLiveUpdate({ "personalInfo.industry": v })}>
                {user.personalInfo?.industry || 'Technology & Software'}
              </InlineEdit>
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
            <InlineEdit isOwner={isOwner} label="Full Name" value={personalInfo.fullName} onSave={(v) => { const [f, ...l] = v.split(" "); handleLiveUpdate({ firstName: f, lastName: l.join(" ") }); }}>
              {personalInfo.fullName}
            </InlineEdit>
            <span className="opacity-20"> : </span>
            <InlineEdit isOwner={isOwner} label="Job Title" value={personalInfo.jobTitle} onSave={(v) => handleLiveUpdate({ "personalInfo.jobTitle": v })}>
              {personalInfo.jobTitle}
            </InlineEdit>
          </h2>
          
          <div className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-light max-w-3xl mx-auto">
            <InlineEdit isOwner={isOwner} label="Summary" value={user.summary} onSave={(v) => handleLiveUpdate({ summary: v })} multiline>
              <p className="whitespace-pre-wrap">{user.summary || "Welcome to my digital space. I am passionate about building scalable solutions and crafting captivating digital experiences..."}</p>
            </InlineEdit>
          </div>

          <div className="pt-8">
            <button onClick={() => setShowResumeModal(true)} className="px-8 py-3 bg-[var(--card-bg)] hover:bg-[var(--primary-color)]/10 border border-[var(--card-border)] rounded-full text-[var(--text-primary)] font-medium transition-all flex items-center gap-2 mx-auto">
              <Download size={18} /> Download CV
            </button>
          </div>
        </div>
      </section>

      {/* --- 2. PROFESSIONAL EXPERIENCE --- */}
      {(isOwner || (user.experience?.length > 0)) && (
        <section id="journey" className="py-24 border-b border-[var(--card-border)]">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-16 text-center flex items-center gap-3">
               <FaHistory />
               <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.experience} onSave={(v) => handleLiveUpdate({ "sectionNames.experience": v })}>
                  {user.sectionNames?.experience || "Professional Experience"}
               </InlineEdit>
            </h2>
            <div className="w-full max-w-2xl space-y-12 relative before:absolute before:inset-0 before:mx-auto before:h-full before:w-0.5 before:bg-[var(--primary-color)]/20">
              {(user.experience || []).map((exp, index) => (
                <div key={exp._id || index} className="relative flex flex-col items-center group">
                  <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary-color)] text-white mb-6 shadow-lg shadow-[var(--primary-color)]/20">
                    <Briefcase size={20} />
                  </div>
                  <div className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 text-center shadow-xl backdrop-blur-sm hover:border-[var(--primary-color)]/30 transition-all">
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-[var(--primary-color)] opacity-80 mb-2">
                      <InlineEdit isOwner={isOwner} label="Period" value={`${exp.startDate} - ${exp.endDate || 'Present'}`} onSave={(v) => { 
                        const [s, e] = v.split(" - "); 
                        handleArrayUpdate("experience", index, { startDate: s, endDate: e === "Present" ? "" : e, isCurrent: e === "Present" });
                      }}>
                        {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                      </InlineEdit>
                      <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]/20" />
                      <InlineEdit isOwner={isOwner} label="Location" value={exp.location} onSave={(v) => handleArrayUpdate("experience", index, { location: v })}>
                         {exp.location || "Location"}
                      </InlineEdit>
                      <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]/20" />
                      <InlineEdit isOwner={isOwner} label="Mode" value={exp.type} onSave={(v) => handleArrayUpdate("experience", index, { type: v })}>
                         {exp.type || "Full-time"}
                      </InlineEdit>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                      <InlineEdit isOwner={isOwner} label="Role" value={exp.role} onSave={(v) => handleArrayUpdate("experience", index, { role: v })}>{exp.role}</InlineEdit>
                    </h3>
                    <h4 className="text-lg font-semibold text-[var(--text-secondary)] mb-6">
                      <InlineEdit isOwner={isOwner} label="Company" value={exp.company} onSave={(v) => handleArrayUpdate("experience", index, { company: v })}>{exp.company}</InlineEdit>
                    </h4>
                    <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      <InlineEdit isOwner={isOwner} label="Achievements" value={exp.achievements} onSave={(v) => handleArrayUpdate("experience", index, { achievements: v })} multiline>
                        <p className="whitespace-pre-wrap">{exp.achievements || "Description..."}</p>
                      </InlineEdit>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {isOwner && (
              <button onClick={() => toast.error("Please add via Dashboard for full validation.")} className="mt-12 px-6 py-2 bg-[var(--card-bg)] hover:bg-[var(--primary-color)]/20 border border-[var(--primary-color)]/30 rounded-full text-[var(--primary-color)] text-sm font-medium transition-all flex items-center gap-2 z-10">
                <FaPlus size={16} /> Add Experience
              </button>
            )}
          </div>
        </section>
      )}

      {/* --- 3. EDUCATION HISTORY --- */}
      {(isOwner || (user.education?.length > 0)) && (
        <section id="education" className="py-24 border-b border-[var(--card-border)] bg-white/[0.01]">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-16 text-center">
               <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.education} onSave={(v) => handleLiveUpdate({ "sectionNames.education": v })}>
                  {user.sectionNames?.education || "Education History"}
               </InlineEdit>
            </h2>
            <div className="w-full max-w-2xl space-y-12 relative before:absolute before:inset-0 before:mx-auto before:h-full before:w-0.5 before:bg-[var(--primary-color)]/20">
              {(user.education || []).map((edu, index) => (
                <div key={edu._id || index} className="relative flex flex-col items-center group">
                  <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary-color)] text-white mb-6 shadow-lg shadow-[var(--primary-color)]/20">
                    <GraduationCap size={20} />
                  </div>
                  <div className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 text-center shadow-xl backdrop-blur-sm hover:border-[var(--primary-color)]/30 transition-all">
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-[var(--primary-color)] opacity-80 mb-2">
                      <InlineEdit isOwner={isOwner} label="Period" value={`${edu.startDate} - ${edu.endDate || 'Present'}`} onSave={(v) => {
                        const [s, e] = v.split(" - ");
                        handleArrayUpdate("education", index, { startDate: s, endDate: e === "Present" ? "" : e });
                      }}>
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </InlineEdit>
                      <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]/20" />
                      <InlineEdit isOwner={isOwner} label="Result" value={edu.fieldOfStudy} onSave={(v) => handleArrayUpdate("education", index, { fieldOfStudy: v })}>
                         {edu.fieldOfStudy || "Field of Study"}
                      </InlineEdit>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                      <InlineEdit isOwner={isOwner} label="Degree" value={edu.degree} onSave={(v) => handleArrayUpdate("education", index, { degree: v })}>{edu.degree}</InlineEdit>
                    </h3>
                    <h4 className="text-lg font-semibold text-[var(--text-secondary)] mb-2">
                      <InlineEdit isOwner={isOwner} label="Institution" value={edu.institution} onSave={(v) => handleArrayUpdate("education", index, { institution: v })}>{edu.institution}</InlineEdit>
                    </h4>
                    {edu.description && (
                       <p className="text-xs text-[var(--text-secondary)] opacity-60 mt-4 italic">
                          <InlineEdit isOwner={isOwner} label="Story" value={edu.description} onSave={(v) => handleArrayUpdate("education", index, { description: v })} multiline>{edu.description}</InlineEdit>
                       </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {isOwner && (
              <button onClick={() => toast.error("Please add via Dashboard.")} className="mt-12 px-6 py-2 bg-[var(--card-bg)] hover:bg-[var(--primary-color)]/20 border border-[var(--primary-color)]/30 rounded-full text-[var(--primary-color)] text-sm font-medium transition-all flex items-center gap-2 z-10">
                <FaPlus size={16} /> Add Education
              </button>
            )}
          </div>
        </section>
      )}

      {/* --- SECTION: PROJECTS / PORTFOLIO [V4.3 SURGERY MODE] --- */}
      {(isOwner || (profile.data.projects && profile.data.projects.length > 0) || (profile.data.portfolio && profile.data.portfolio.length > 0)) && (
        <section id="showcase" className="py-24 border-b border-[var(--card-border)]">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight flex items-center justify-center gap-4">
                <FaBriefcase className="text-[var(--primary-color)]" />
                <span className="text-[var(--text-primary)]">My </span>
                <span className="text-[var(--primary-color)]">Portfolio</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] font-light max-w-2xl mx-auto opacity-80">
                A curated collection of my most impactful work and technical expertise.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div 
                  key={project._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--card-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--primary-color)]/80 hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.25)] hover:-translate-y-1"
                >
                  {/* Project Image / Thumbnail */}
                  <div className="relative aspect-video w-full bg-white/5 overflow-hidden border-b border-white/10">
                    {project.thumbnail || project.image ? (
                      <img 
                        src={project.thumbnail || project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">
                        <ImageIcon size={48} strokeWidth={1} />
                      </div>
                    )}
                    {/* Overlay for Owner to change image */}
                    {isOwner && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                        <span className="text-sm text-white font-medium px-4 py-2 bg-white/10 rounded-full border border-white/20">Change Image</span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight">
                        <InlineEdit isOwner={isOwner} id={`proj-title-${index}`} value={project.title} onSave={(v) => handleArrayUpdate("projects", index, { title: v })}>
                          {project.title || 'Project Title'}
                        </InlineEdit>
                      </h3>
                      {(project.featured || project.isFeatured) && (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-orange-500/20 text-orange-400 rounded">Featured</span>
                      )}
                    </div>
                    
                    <div className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-1 line-clamp-3 group-hover:line-clamp-none transition-all">
                      <InlineEdit isOwner={isOwner} id={`proj-desc-${index}`} value={project.description} type="textarea" onSave={(v) => handleArrayUpdate("projects", index, { description: v })}>
                        <p>{project.description || 'Describe the problem you solved and the technologies you used...'}</p>
                      </InlineEdit>
                    </div>

                    {/* Links & Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-[var(--card-border)] mt-auto">
                      {(project.liveUrl || project.liveLink) && (
                        <a href={project.liveUrl || project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--primary-color)] hover:opacity-80 transition-all">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                      {(project.githubUrl || project.githubLink) && (
                        <a href={project.githubUrl || project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                          <FaGithub size={16} /> Source Code
                        </a>
                      )}
                      
                      {/* Spacer */}
                      <div className="flex-1"></div>

                      {isOwner && (
                        <button onClick={() => dispatch(deleteProjectThunk(project._id || index))} className="text-white/30 hover:text-red-400 transition-colors">
                          <Trash size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {isOwner && (
              <div className="mt-16 text-center">
                <button onClick={() => dispatch(openProjectModalThunk())} className="px-8 py-3 bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20 border border-[var(--primary-color)]/30 rounded-full text-[var(--primary-color)] font-medium transition-all flex items-center gap-2 mx-auto shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">
                  <FaPlus size={18} /> Add New Project
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- 4. EXPERTISE & SKILLS (Categorized) --- */}
      {(isOwner || (user.skills?.length > 0)) && (
        <section id="expertise" className="py-24 border-b border-[var(--card-border)]">
          <div className="max-w-6xl mx-auto px-4 space-y-24">
            <h2 className="text-3xl font-bold text-center text-[var(--primary-color)]">
               <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.skills} onSave={(v) => handleLiveUpdate({ "sectionNames.skills": v })}>
                  {user.sectionNames?.skills || "Expertise & Skills"}
               </InlineEdit>
            </h2>

            {/* Categorized Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
               {["Technical", "Soft Skills", "Other"].map((cat) => {
                  const filteredSkills = (user.skills || []).filter(s => (s.category || "Other") === cat || (cat === "Technical" && s.category === "Administrative"));
                  if (filteredSkills.length === 0 && !isOwner) return null;
                  
                  return (
                     <div key={cat} className="space-y-8">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-2xl bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)] border border-[var(--primary-color)]/20"><FaLayerGroup size={16}/></div>
                           <h3 className="text-lg font-black uppercase tracking-widest text-[var(--text-primary)] opacity-80">{cat}</h3>
                        </div>
                        <div className="space-y-6">
                           {filteredSkills.map((skill, index) => {
                              const skillName = typeof skill === 'string' ? skill : skill.name;
                              const skillLevel = typeof skill === 'string' ? 80 : (skill.percentage || 80); 
                              return (
                                <div key={index} className="space-y-3 group">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary-color)] transition-colors">
                                      <InlineEdit isOwner={isOwner} label="Skill" value={skillName} onSave={(v) => handleArrayUpdate("skills", index, { name: v })}>{skillName}</InlineEdit>
                                    </span>
                                    <span className="text-[var(--text-secondary)] opacity-50 text-[10px] font-mono">{skillLevel}%</span>
                                  </div>
                                  <div className="w-full bg-[var(--card-bg)] rounded-full h-1 overflow-hidden">
                                    <div className="bg-[var(--primary-color)] h-1 rounded-full group-hover:scale-x-105 transition-transform origin-left" style={{ width: `${skillLevel}%` }}></div>
                                  </div>
                                </div>
                              )
                           })}
                        </div>
                     </div>
                  )
               })}
            </div>

            {isOwner && (
              <div className="text-center">
                 <button onClick={() => toast.error("Manage categories in Dashboard.")} className="px-6 py-2 bg-[var(--card-bg)] hover:bg-[var(--primary-color)]/20 border border-[var(--primary-color)]/30 rounded-full text-[var(--primary-color)] text-sm font-medium transition-all flex items-center gap-2 mx-auto">
                  <FaPlus size={16} /> Add Skill
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- 5. CREDENTIALS (CERTIFICATIONS & AWARDS) --- */}
      {(isOwner || user.certifications?.length > 0 || user.honorsAndAwards?.length > 0) && (
        <section id="credentials" className="py-24 border-b border-[var(--card-border)] bg-white/[0.01]">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Certifications */}
            {(isOwner || user.certifications?.length > 0) && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-[var(--primary-color)] flex items-center gap-3 justify-center md:justify-start"><Award size={24}/> Certifications</h2>
                <div className="space-y-4">
                  {(user.certifications || []).map((cert, index) => (
                    <div key={index} className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6 hover:border-[var(--primary-color)]/30 transition-all">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                        <InlineEdit isOwner={isOwner} label="Name" value={cert.name} onSave={(v) => handleArrayUpdate("certifications", index, { name: v })}>{cert.name}</InlineEdit>
                      </h3>
                      <p className="text-sm text-[var(--primary-color)] opacity-80 mb-2">
                        <InlineEdit isOwner={isOwner} label="Issuer" value={cert.issuer} onSave={(v) => handleArrayUpdate("certifications", index, { issuer: v })}>{cert.issuer}</InlineEdit>
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] opacity-60 uppercase tracking-wider">
                        <InlineEdit isOwner={isOwner} label="Date" value={cert.date} onSave={(v) => handleArrayUpdate("certifications", index, { date: v })}>{cert.date || 'No Date'}</InlineEdit>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Honors & Awards */}
            {(isOwner || user.honorsAndAwards?.length > 0) && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-[var(--primary-color)] flex items-center gap-3 justify-center md:justify-start"><Trophy size={24}/> Honors & Awards</h2>
                <div className="space-y-4">
                  {(user.honorsAndAwards || []).map((award, index) => (
                    <div key={index} className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6 hover:border-[var(--primary-color)]/30 transition-all">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                        <InlineEdit isOwner={isOwner} label="Title" value={award.title} onSave={(v) => handleArrayUpdate("honorsAndAwards", index, { title: v })}>{award.title}</InlineEdit>
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] opacity-60 uppercase tracking-wider mt-3">
                        <InlineEdit isOwner={isOwner} label="Date" value={award.date} onSave={(v) => handleArrayUpdate("honorsAndAwards", index, { date: v })}>{award.date || 'No Date'}</InlineEdit>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- 6. LANGUAGES --- */}
      {(isOwner || user.languages?.length > 0) && (
        <section id="languages" className="py-24 border-b border-[var(--card-border)]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
            <h2 className="text-3xl font-bold text-[var(--primary-color)] flex justify-center items-center gap-3"><Globe size={28}/> Languages</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {(user.languages || []).map((lang, index) => (
                <div key={index} className="flex flex-col items-center bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl px-8 py-4 hover:border-[var(--primary-color)]/40 transition-all">
                  <span className="text-[var(--text-primary)] font-bold text-lg mb-1">
                    <InlineEdit isOwner={isOwner} label="Language" value={lang.name} onSave={(v) => handleArrayUpdate("languages", index, { name: v })}>{lang.name}</InlineEdit>
                  </span>
                  <span className="text-[var(--primary-color)] opacity-80 text-xs uppercase tracking-widest font-medium">
                    <InlineEdit isOwner={isOwner} label="Proficiency" value={lang.proficiency} onSave={(v) => handleArrayUpdate("languages", index, { proficiency: v })}>{lang.proficiency}</InlineEdit>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 7. CERTIFICATIONS --- */}
      {(isOwner || user.certifications?.length > 0) && (
        <section id="certifications" className="py-24 border-b border-[var(--card-border)] bg-white/[0.01]">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-16 text-center">
               <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.certifications} onSave={(v) => handleLiveUpdate({ "sectionNames.certifications": v })}>
                  {user.sectionNames?.certifications || "Certifications"}
               </InlineEdit>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {(user.certifications || []).map((cert, index) => (
                <div key={index} className="p-8 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl hover:border-[var(--primary-color)]/30 transition-all group">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)]"><Award size={24}/></div>
                      <div className="flex-1 space-y-1">
                         <h3 className="text-lg font-black text-[var(--text-primary)]">
                            <InlineEdit isOwner={isOwner} label="Cert Name" value={cert.name} onSave={(v) => handleArrayUpdate("certifications", index, { name: v })}>{cert.name}</InlineEdit>
                         </h3>
                         <p className="text-sm font-bold text-[var(--primary-color)] opacity-80">
                            <InlineEdit isOwner={isOwner} label="Issuer" value={cert.issuer} onSave={(v) => handleArrayUpdate("certifications", index, { issuer: v })}>{cert.issuer}</InlineEdit>
                         </p>
                         <div className="flex items-center gap-3 text-[10px] text-[var(--text-secondary)] opacity-40 font-bold uppercase tracking-widest pt-2">
                            <span>
                               <InlineEdit isOwner={isOwner} label="Date" value={cert.date} onSave={(v) => handleArrayUpdate("certifications", index, { date: v })}>{cert.date}</InlineEdit>
                            </span>
                            {cert.link && (
                               <a href={ensureAbsoluteUrl(cert.link)} target="_blank" className="text-[var(--primary-color)] hover:opacity-80 flex items-center gap-1 transition-colors">
                                  Verify Cert <FaArrowRight size={8}/>
                               </a>
                            )}
                         </div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 8. HONORS & AWARDS --- */}
      {(isOwner || user.achievements?.length > 0) && (
        <section id="achievements" className="py-24 border-b border-[var(--card-border)]">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-16 text-center">
               <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.achievements} onSave={(v) => handleLiveUpdate({ "sectionNames.achievements": v })}>
                  {user.sectionNames?.achievements || "Honors & Awards"}
               </InlineEdit>
            </h2>
            <div className="space-y-6 w-full max-w-2xl">
              {(user.achievements || []).map((ach, index) => (
                <div key={index} className="relative p-8 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl hover:border-[var(--primary-color)]/30 transition-all flex gap-6 items-center">
                   <div className="w-16 h-16 rounded-3xl bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)] flex-shrink-0 animate-pulse"><Trophy size={32}/></div>
                   <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                         <h3 className="text-xl font-black text-[var(--text-primary)]">
                            <InlineEdit isOwner={isOwner} label="Award Title" value={ach.title} onSave={(v) => handleArrayUpdate("achievements", index, { title: v })}>{ach.title}</InlineEdit>
                         </h3>
                         <span className="text-[10px] font-black text-[var(--primary-color)] opacity-60 uppercase tracking-widest">
                            <InlineEdit isOwner={isOwner} label="Date" value={ach.date} onSave={(v) => handleArrayUpdate("achievements", index, { date: v })}>{ach.date}</InlineEdit>
                         </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic opacity-80">
                         <InlineEdit isOwner={isOwner} label="Description" value={ach.description} onSave={(v) => handleArrayUpdate("achievements", index, { description: v })} multiline>{ach.description}</InlineEdit>
                      </p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 9. PROFESSIONAL SERVICES --- */}
      {(isOwner || user.services?.length > 0) && (
        <section id="services" className="py-32">
          <div className="max-w-6xl mx-auto px-6 space-y-20">
            <div className="text-center space-y-4">
               <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[var(--primary-color)]">Professional Ecosystem</h2>
               <p className="text-4xl md:text-6xl font-black">
                  <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.services} onSave={(v) => handleLiveUpdate({ "sectionNames.services": v })}>
                     {user.sectionNames?.services || "What I Offer"}
                  </InlineEdit>
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(user.services || []).map((service, idx) => (
                <div key={idx} className="p-10 space-y-6 rounded-3xl transition-all border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--primary-color)]/30 group">
                   <div className="w-16 h-16 rounded-3xl bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)] group-hover:bg-[var(--primary-color)] group-hover:text-white transition-all">
                      <FaMagic size={24} />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-xl font-black text-[var(--text-primary)]">
                         <InlineEdit isOwner={isOwner} label="Service Title" value={service.title} onSave={(v) => handleArrayUpdate("services", idx, { title: v })}>{service.title || "Consulting"}</InlineEdit>
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] font-medium italic opacity-60">
                         <InlineEdit isOwner={isOwner} label="Service Description" value={service.description} onSave={(v) => handleArrayUpdate("services", idx, { description: v })} multiline>{service.description || "Deep architectural strategy and semantic engineering..."}</InlineEdit>
                      </p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 8. INTERESTS & HOBBIES --- */}
      {(isOwner || user.interests?.length > 0) && (
        <section id="hobbies" className="py-24 border-b border-[var(--card-border)]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
            <h2 className="text-2xl font-black uppercase tracking-[0.4em] text-[var(--primary-color)]">Beyond the Desktop</h2>
            <div className="flex flex-wrap justify-center gap-6">
               {(user.interests || []).map((hobby, idx) => (
                  <div key={idx} className="px-8 py-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl hover:border-[var(--primary-color)]/40 hover:bg-[var(--primary-color)]/5 transition-all text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                     <InlineEdit isOwner={isOwner} label="Hobby" value={hobby} onSave={(v) => { 
                        const newInterests = [...user.interests];
                        newInterests[idx] = v;
                        handleLiveUpdate({ interests: newInterests });
                     }}>{hobby}</InlineEdit>
                  </div>
               ))}
               {isOwner && (
                  <button onClick={() => {
                     const h = window.prompt("Add Hobby:");
                     if (h) handleLiveUpdate({ interests: [...(user.interests || []), h] });
                  }} className="px-8 py-4 bg-[var(--card-bg)] border border-dashed border-[var(--card-border)] rounded-3xl text-sm font-bold text-[var(--text-secondary)] opacity-40 hover:opacity-100 transition-all">
                     + Add Interest
                  </button>
               )}
            </div>
          </div>
        </section>
      )}
      
{/* --- SECTION: CONTACT --- */}
<section id="contact" className="relative py-32 border-b border-[var(--card-border)] overflow-hidden bg-[var(--bg-primary)]/50">
  
  {/* Large Background Text Effect (From Image 2) */}
  <div className="absolute top-10 left-0 w-full text-center pointer-events-none select-none overflow-hidden flex justify-center">
    <h2 className="text-[10vw] font-black text-[var(--text-primary)] opacity-[0.03] uppercase tracking-tighter whitespace-nowrap">
      For Assistance
    </h2>
  </div>

  <div className="max-w-7xl mx-auto px-4 relative z-10">
    
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] flex justify-center gap-3">
        Contact <span className="text-[var(--primary-color)]">Me</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      {/* Left Column: Contact Info & Socials */}
      <div className="space-y-12">
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-8 uppercase tracking-wider">Contact Me Here</h3>
          
          <div className="space-y-6">
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="mt-1 text-[var(--primary-color)]"><MapPin size={24} /></div>
              <div>
                <span className="block text-sm text-[var(--text-secondary)] opacity-50 uppercase font-medium mb-1">Location</span>
                <span className="text-[var(--text-primary)] opacity-90 text-lg">
                  <InlineEdit isOwner={isOwner} id="loc" value={personalInfo.location} selector={state => state.profile.data.personalInfo.location}>
                    {personalInfo.location || 'City, Country'}
                  </InlineEdit>
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="mt-1 text-[var(--primary-color)]"><Mail size={24} /></div>
              <div>
                <span className="block text-sm text-[var(--text-secondary)] opacity-50 uppercase font-medium mb-1">Email</span>
                <span className="text-[var(--text-primary)] opacity-90 text-lg">
                  <InlineEdit isOwner={isOwner} id="email" value={personalInfo.email} selector={state => state.profile.data.personalInfo.email}>
                    {personalInfo.email || 'your.email@example.com'}
                  </InlineEdit>
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="mt-1 text-[var(--primary-color)]"><Phone size={24} /></div>
              <div>
                <span className="block text-sm text-[var(--text-secondary)] opacity-50 uppercase font-medium mb-1">Mobile Number</span>
                <span className="text-[var(--text-primary)] opacity-90 text-lg">
                  <InlineEdit isOwner={isOwner} id="phone" value={personalInfo.phone} selector={state => state.profile.data.personalInfo.phone}>
                    {personalInfo.phone || '+00 123 456 789'}
                  </InlineEdit>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons (Inspired by Image 1) */}
        <div>
          <h3 className="text-xl font-bold text-[var(--primary-color)] mb-6 uppercase tracking-wider">Follow Me:</h3>
          <div className="flex flex-wrap gap-4">
            {/* Map through socialLinks if available, fallback to placeholders for owner to edit */}
            {['linkedin', 'github', 'twitter', 'portfolio'].map((platform) => {
              const link = profile.data.socialLinks?.[platform];
              if (!link && !isOwner) return null; // Hide if empty and visitor
              
              const getIcon = (p) => {
                switch(p) {
                  case 'linkedin': return <FaLinkedin size={20} />;
                  case 'github': return <FaGithub size={20} />;
                  case 'twitter': return <FaTwitter size={20} />;
                  case 'instagram': return <FaInstagram size={20} />;
                  case 'facebook': return <FaFacebook size={20} />;
                  case 'portfolio': return <Globe size={20} />;
                  default: return <Globe size={20} />;
                }
              };

              return (
                <a 
                  key={platform}
                  href={link || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={platform}
                  className="w-12 h-12 rounded-full border border-[var(--primary-color)]/50 bg-[var(--primary-color)]/10 text-[var(--primary-color)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:bg-[var(--primary-color)] hover:text-gray-900 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                >
                  {getIcon(platform)}
                </a>
              );
            })}
          </div>
          {isOwner && <p className="text-xs text-[var(--text-secondary)] opacity-30 mt-3">* Edit social links in your dashboard settings.</p>}
        </div>
      </div>

      {/* Right Column: Contact Form (Image 2) */}
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); /* Dispatch mailto or API thunk here */ }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="YOUR NAME" 
              className="w-full bg-[var(--bg-primary)]/50 border border-[var(--card-border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-30 focus:opacity-100 focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-all"
              required
            />
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="w-full bg-[var(--bg-primary)]/50 border border-[var(--card-border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-30 focus:opacity-100 focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-all"
              required
            />
          </div>
          <input 
            type="text" 
            placeholder="ENTER SUBJECT" 
            className="w-full bg-[var(--bg-primary)]/50 border border-[var(--card-border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-30 focus:opacity-100 focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-all"
            required
          />
          <textarea 
            placeholder="Message Here..." 
            rows="6"
            className="w-full bg-[var(--bg-primary)]/50 border border-[var(--card-border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-30 focus:opacity-100 focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-all resize-none"
            required
          ></textarea>
          
          <div className="text-right pt-4">
            <button 
              type="submit" 
              className="px-10 py-4 bg-transparent border border-[var(--card-border)] hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 hover:text-[var(--primary-color)] rounded-full text-[var(--text-primary)] font-medium transition-all duration-300 flex items-center justify-center gap-2 ml-auto"
            >
              Submit <Send size={18} />
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</section>

{/* --- FOOTER --- */}
<footer id="footer" className="py-8 bg-[var(--bg-primary)] border-t border-[var(--card-border)] text-center">
  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="text-[var(--text-secondary)] opacity-50 text-sm">
      © {new Date().getFullYear()} <span className="text-[var(--text-primary)] opacity-80 font-medium">{personalInfo.fullName}</span>. Powered by <a href="https://cvifypro.vercel.app/" target="_blank" rel="noreferrer" className="text-[var(--primary-color)] hover:underline">CVify Pro</a>.
    </p>
    <div className="flex items-center gap-4">
       <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[var(--text-secondary)] opacity-50 hover:text-[var(--text-primary)] hover:opacity-100 text-sm transition-colors">
         Back to Top ↑
       </button>
    </div>
  </div>
</footer>

      {/* ── Builder Controls ── */}
      {user.isOwner && (
        <>
          <div className="fixed bottom-10 right-10 z-[120]">
            <button onClick={() => setShowThemePanel(!showThemePanel)} className="w-16 h-16 bg-action text-white rounded-[2rem] shadow-2xl flex items-center justify-center hover:scale-110 transition-all group">
              <FaPalette className="text-xl group-hover:rotate-12 transition-transform" />
            </button>
          </div>
          <ThemePanel isOpen={showThemePanel} onClose={() => setShowThemePanel(false)} theme={theme} onUpdate={handleThemeUpdate} isUpdating={isUpdating} presets={themePresets} />
        </>
      )}
    </div>
  );
};

export default PublicProfile;
