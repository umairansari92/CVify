import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from "react";
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
  FaRocket,
  FaChartBar,
  FaExclamationTriangle,
  FaArrowRight,
  FaHistory,
  FaMagic,
  FaChevronDown,
  FaTimes,
  FaFilePdf,
  FaEnvelope,
  FaPhone,
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

// Modular Sections (Hero and About are critical, others lazy)
import Hero from "../components/profile/sections/Hero";
import About from "../components/profile/sections/About";
const Experience = lazy(() => import("../components/profile/sections/Experience"));
const Education = lazy(() => import("../components/profile/sections/Education"));
const Showcase = lazy(() => import("../components/profile/sections/Showcase"));
const Skills = lazy(() => import("../components/profile/sections/Skills"));
const Dossier = lazy(() => import("../components/profile/sections/Dossier"));
const Interests = lazy(() => import("../components/profile/sections/Interests"));
const Contact = lazy(() => import("../components/profile/sections/Contact"));
const Footer = lazy(() => import("../components/profile/sections/Footer"));

// Modular Components
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

  const slogans = user?.heroSlogans || [];
  const personalInfo = { 
    fullName: [user?.firstName, user?.lastName].filter(Boolean).join(" "), 
    image: user?.profileImage, 
    jobTitle: user?.headline,
    objective: user?.bio,
    summary: user?.bio,
    location: user?.location,
    email: user?.email,
    phone: user?.phoneNumber
  };
  const branding = user?.branding || {};
  const isOwner = user?.isOwner;
  const publicResumes = isOwner ? (user?.resumes || []) : (user?.resumes?.filter(r => r.isPublic === true) || []);

  const [localTheme, setLocalTheme] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSending, setIsSending] = useState(false);

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

  const displayValue = useCallback((value, placeholder) => {
    if (value && value.trim() !== "") return value;
    if (isOwner) return placeholder;
    return null;
  }, [isOwner]);

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
      const updatedResumes = user.resumes.map(r => r._id === resumeId ? { ...r, isPublic: newStatus } : r);
      dispatch(updateActiveProfileLocally({ resumes: updatedResumes }));
      
      await api.patch(`/resumes/${resumeId}`, { isPublic: newStatus });
      toast.success(newStatus ? "Resume Shared Publicly!" : "Resume Private.");
    } catch (err) {
      toast.error("Failed to update status.");
      dispatch(fetchPublicProfile(username));
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);
    const loadingToast = toast.loading("Sending your message...");
    try {
      await api.post(`/portfolio/contact/${username}`, contactForm);
      toast.success("Message sent! The owner will get back to you soon.", { id: loadingToast });
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message. Please try again.", { id: loadingToast });
    } finally {
      setIsSending(false);
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

      {/* ── Resume Selector Modal ── */}
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
                      <div className="flex flex-col gap-2 w-full" key={resume._id}>
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

      {/* ── Owner Analytics Bar (HUD Dock) ── */}
      {user.isOwner && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] w-full max-w-lg px-4 flex items-center justify-center pointer-events-none">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 flex items-center justify-between gap-10 shadow-2xl pointer-events-auto">
            <div className="flex items-center gap-2 px-4 border-r border-white/5">
              <FaChartBar className="text-[var(--primary-color)] text-sm" />
              <span className="text-[8px] font-black uppercase tracking-widest opacity-60">HUD Intelligence</span>
            </div>
            <div className="flex gap-8 px-4">
              <div className="text-center"><p className="text-sm font-black text-white">{analytics.views || 0}</p><p className="text-[7px] font-bold opacity-40 uppercase tracking-tighter">Views</p></div>
              <div className="text-center"><p className="text-sm font-black text-white">{analytics.resumeDownloads || 0}</p><p className="text-[7px] font-bold opacity-40 uppercase tracking-tighter">Pulse</p></div>
              <div className="text-center"><p className="text-sm font-black text-white">{analytics.contactClicks || 0}</p><p className="text-[7px] font-bold opacity-40 uppercase tracking-tighter">Interests</p></div>
            </div>
          </motion.div>
        </div>
      )}

      {/* --- PREMIUM FLOATING NAVBAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 p-4 sm:p-6 flex justify-center ${scrolled ? 'pt-2 sm:pt-4' : 'pt-6 sm:pt-8'}`}>
        <div className={`w-full max-w-7xl px-4 sm:px-8 h-16 sm:h-20 md:h-24 grid grid-cols-2 lg:grid-cols-3 items-center backdrop-blur-md bg-[var(--bg-primary)]/80 border border-[var(--card-border)] rounded-full shadow-2xl transition-all duration-500 ${scrolled ? 'shadow-[var(--primary-color)]/10 scale-[0.98]' : ''}`}>
          
          {/* COLUMN A (LEFT): Premium CVify Logo with Shine Effect */}
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* App Icon */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
              {/* Shine Animation overlay */}
              <div className="absolute inset-0 bg-white/20 w-[150%] h-full transform -skew-x-12 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out z-20"></div>
              <img 
                src="/CVify Favicon.jpg" 
                alt="CVify Logo" 
                className="w-full h-full object-contain relative z-10" 
              />
            </div>
            
            {/* Logo Text */}
            <div className="hidden sm:flex flex-col justify-center">
              <span className="text-xl font-black tracking-tight text-[var(--text-primary)] leading-none mb-0.5">
                CVify<span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-blue-400">Pro</span>
              </span>
              <span className="text-[9px] text-[var(--text-secondary)] font-bold tracking-[0.1em] uppercase whitespace-nowrap">
                Portfolio Engine
              </span>
            </div>
          </div>

          <div className="hidden lg:flex justify-center" />

          {/* Navigation & Action (Right) */}
          <div className="flex items-center justify-end gap-6">
            <div className="hidden xl:flex items-center space-x-6">
              {['Home', 'About', 'Journey', 'Showcase', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap"
                >
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-full bg-white/5 text-[var(--text-primary)] hover:bg-[var(--primary-color)]/20 transition-all"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <button 
              onClick={() => setShowResumeModal(true)}
              className="hidden md:flex px-6 py-3 bg-[var(--primary-color)] text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_var(--primary-color)]/30"
            >
              Get CV
            </button>
          </div>
        </div>

        {/* --- MOBILE DRAWER --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 sm:top-32 left-4 right-4 sm:left-6 sm:right-6 z-[90] p-6 sm:p-8 bg-[var(--bg-primary)]/95 backdrop-blur-2xl border border-[var(--card-border)] rounded-[2rem] sm:rounded-[3rem] shadow-2xl lg:hidden flex flex-col gap-4 sm:gap-6"
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

      <Hero 
        user={user} 
        isOwner={isOwner} 
        theme={theme} 
        displayValue={displayValue} 
        handleLiveUpdate={handleLiveUpdate} 
      />

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

        {(isOwner || (user.education?.length > 0)) && (
          <Education 
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

        {(isOwner || (user.skills?.length > 0)) && (
          <Skills 
            user={user} 
            isOwner={isOwner} 
            displayValue={displayValue} 
            handleLiveUpdate={handleLiveUpdate} 
            handleArrayUpdate={handleArrayUpdate} 
          />
        )}

        {(isOwner || (user.certifications?.length > 0) || (user.achievements?.length > 0)) && (
          <Dossier 
            user={user} 
            isOwner={isOwner} 
            displayValue={displayValue} 
            handleLiveUpdate={handleLiveUpdate} 
            handleArrayUpdate={handleArrayUpdate} 
          />
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
