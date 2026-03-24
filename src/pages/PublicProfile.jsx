import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../api/axios";
import {
  FaLinkedin,
  FaGithub,
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
  Github as GithubIcon,
  Image as ImageIcon
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
    } catch (err) {
      toast.error("Failed to update status.");
      dispatch(fetchPublicProfile(username));
    }
  };

  const handleApplyAtsFix = async (field, index, bullet) => {
    if (!user.isOwner) return;
    setIsUpdating(true);
    try {
      const updatedBullet = bullet.improved || bullet.original;
      handleArrayUpdate(field, index, { achievements: updatedBullet });
      toast.success("AI Fix Applied Locally!");
    } catch (err) { toast.error("AI Fix failed."); }
    finally { setIsUpdating(false); }
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

  const portfolio = user.portfolio || user.projects || [];
  const theme = localTheme || themePresets[0];
  const atsScores = user.atsScore || { overall: 85, formattingScore: 90, keywordScore: 82, quantificationScore: 78, impactScore: 88 };
  const analysis = user.analysis || { strengths: ["Action verbs usage", "Clean formatting"], weaknesses: ["Keyword density could be higher"], weakBullets: [] };

  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

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
      className="min-h-screen transition-colors duration-500 selection:bg-action selection:text-white overflow-x-hidden"
      style={{
        backgroundColor: theme.bodyBg,
        fontFamily: `'${theme.fontPrimary}', sans-serif`,
        "--action": theme.accentColor || "#2563eb",
        "--text-primary": theme.textPrimary || "#ffffff",
        "--text-secondary": theme.textSecondary || "#94a3b8",
        "--body-bg": theme.bodyBg || "#0f172a",
        "--card-bg": theme.cardStyle === "glass" ? "rgba(255, 255, 255, 0.04)" : "rgba(255,255,255,0.02)",
        "--card-border": "rgba(255,255,255,0.08)",
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

      {/* ── Sticky Navigation ── */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${scrolled ? "py-4 bg-[var(--body-bg)]/80 backdrop-blur-xl border-white/10 shadow-xl" : "py-8 bg-transparent border-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black uppercase tracking-tighter">{personalInfo.fullName}</span>
            <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[7px] font-black uppercase tracking-widest text-emerald-500">AI Verified</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-[9px] font-black uppercase tracking-widest text-action">
            <a href="#about" className="hover:opacity-100 transition-all opacity-40">About</a>
            {(user.experience?.length > 0 || isOwner) && <a href="#journey" className="hover:opacity-100 transition-all opacity-40">{user.sectionNames?.experience || "Experience"}</a>}
            {(user.education?.length > 0 || isOwner) && <a href="#education" className="hover:opacity-100 transition-all opacity-40">{user.sectionNames?.education || "Education"}</a>}
            {(user.skills?.length > 0 || isOwner) && <a href="#expertise" className="hover:opacity-100 transition-all opacity-40">{user.sectionNames?.skills || "Skills"}</a>}
            {(portfolio.length > 0 || isOwner) && <a href="#showcase" className="hover:opacity-100 transition-all opacity-40">{user.sectionNames?.portfolio || "Portfolio"}</a>}
          </div>
          <div className="flex items-center gap-4">
             {user.socialLinks?.linkedin && <a href={ensureAbsoluteUrl(user.socialLinks.linkedin)} target="_blank" className="opacity-40 hover:opacity-100 transition-all"><FaLinkedin size={18} /></a>}
             {user.socialLinks?.github && <a href={ensureAbsoluteUrl(user.socialLinks.github)} target="_blank" className="opacity-40 hover:opacity-100 transition-all"><FaGithub size={18} /></a>}
             <button onClick={() => setShowResumeModal(true)} className="px-6 py-2.5 bg-action text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-action/20 ml-2">Get Resume</button>
          </div>
        </div>
      </nav>

      {/* ── SECTION 1: HERO (HOME) ── */}
      <section id="home" className="space-y-16 py-24">
        {/* Slogans Builder Div */}
        {(isOwner || (slogans && slogans.length > 0)) && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="border-t border-b border-white/5 py-10 bg-white/[0.01]">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
              {isOwner ? (
                <>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-action">Builder: My Slogans (Max 5)</h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {slogans.slice(0, 5).map((slogan, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-action/30 transition-all">
                        <span className="text-[10px] font-bold uppercase tracking-tight">{slogan}</span>
                        <button onClick={() => dispatch(deleteSloganThunk(index))} className="text-red-500 hover:text-red-400 p-1">
                          <Trash size={12} />
                        </button>
                      </div>
                    ))}
                    {slogans.length < 5 && (
                      <button 
                        onClick={() => {
                          const s = window.prompt("Enter new slogan:");
                          if (s) dispatch(addSloganThunk(s));
                        }} 
                        className="bg-action/10 border border-action/20 rounded-full px-4 py-2 hover:bg-action/20 flex items-center gap-2 text-[10px] font-black uppercase text-action transition-all"
                      >
                        <Plus size={14} /> Add Slogan
                      </button>
                    )}
                  </div>
                </>
              ) : (
                slogans.length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slogans[0]}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.8 }}
                      className="font-black text-xl uppercase tracking-[0.2em] text-action"
                    >
                      <TypeAnimation
                        sequence={slogans.flatMap(slogan => [slogan, 3000])}
                        wrapper="p"
                        speed={50}
                        repeat={Infinity}
                      />
                    </motion.div>
                  </AnimatePresence>
                )
              )}
            </div>
          </motion.div>
        )}

        {/* Split Hero: Image | Text [Dynamic Polish] */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="relative aspect-square flex items-center justify-center group text-center">
            <div className="absolute inset-0 bg-action/20 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
            {personalInfo.image ? (
              <img src={personalInfo.image} alt={personalInfo.fullName} className="w-full h-full object-cover rounded-[4rem] shadow-2xl border-4 border-white/10 relative z-10 hover:scale-[1.01] transition-transform duration-700" />
            ) : (
              <div className="w-full h-full bg-white/5 rounded-[4rem] border-4 border-dashed border-white/10 flex items-center justify-center relative z-10">
                <FileText size={48} className="text-white/20" />
              </div>
            )}
            {isOwner && (
              <button 
                onClick={() => {
                  const url = window.prompt("Enter image URL:");
                  if (url) dispatch(updateHeroImageThunk(url));
                }} 
                className="absolute inset-0 z-20 flex items-center justify-center rounded-[4rem] opacity-0 group-hover:opacity-100 bg-black/60 backdrop-blur-sm transition-all"
              >
                <div className="bg-white/10 p-5 rounded-3xl border border-white/20 hover:scale-110 transition-transform">
                   <Edit3 size={24} className="text-white" />
                </div>
              </button>
            )}
          </motion.div>

          <div className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                   <span className="px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-action inline-block">{branding.identityLabel || "Professional Showcase"}</span>
                   {user.availability && (
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                         user.availability === "Not Available" ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      }`}>
                         {user.availability}
                      </span>
                   )}
                   {user.industry && user.industry !== "Other" && (
                      <span className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-[9px] font-black uppercase tracking-widest">
                         {user.industry}
                      </span>
                   )}
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter">
                  <InlineEdit 
                    value={personalInfo.fullName} 
                    onSave={(v) => { 
                      const [f, ...l] = v.split(" "); 
                      handleLiveUpdate({ firstName: f, lastName: l.join(" ") }); 
                    }} 
                    isOwner={isOwner} 
                    label="Full Name" 
                  />
                </h1>
              </div>

              {personalInfo.objective && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  <div className="text-2xl md:text-4xl font-black text-white/90 leading-tight">
                    <TypeAnimation
                      sequence={[personalInfo.objective, 2000, branding.taglineAlt || "Semantically Engineered Authority.", 2000, personalInfo.objective, 2000]}
                      wrapper="p"
                      speed={50}
                      repeat={Infinity}
                      className="inline-block"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Contact Suite Bar (Advanced) */}
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest py-8 border-y border-white/5">
              {(user.privacy?.showEmail !== false || isOwner) && user.email && (
                <div className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-action group-hover:bg-action group-hover:text-white transition-all"><FaEnvelope size={14}/></div>
                  <span className="opacity-40 group-hover:opacity-100 transition-all font-mono tracking-tighter">{user.email}</span>
                </div>
              )}
              {(user.privacy?.showPhone || isOwner) && user.phoneNumber && (
                 <div className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all"><FaPhone size={14}/></div>
                  <span className="opacity-40 group-hover:opacity-100 transition-all">
                     <InlineEdit value={user.phoneNumber} onSave={(v) => handleLiveUpdate({ phoneNumber: v })} label="Phone">{user.phoneNumber}</InlineEdit>
                  </span>
                </div>
              )}
              {user.location && (
                 <div className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-orange-400 group-hover:bg-orange-400 group-hover:text-white transition-all font-black">
                       <InlineEdit value={user.location} onSave={(v) => handleLiveUpdate({ location: v })} label="Location">📍</InlineEdit>
                    </div>
                    <span className="opacity-40 group-hover:opacity-100 transition-all uppercase tracking-[0.1em]">
                       {user.location}
                    </span>
                 </div>
              )}
              {user.socialLinks?.portfolio && (
                 <div className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all"><FaGlobe size={14}/></div>
                  <span className="opacity-40 group-hover:opacity-100 transition-all">
                     <InlineEdit value={user.socialLinks.portfolio} onSave={(v) => handleLiveUpdate({ "socialLinks.portfolio": v })} label="Website">{user.socialLinks.portfolio}</InlineEdit>
                  </span>
                </div>
              )}
            </div>

            {/* Social Link Suite */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {user.socialLinks?.linkedin && <a href={ensureAbsoluteUrl(user.socialLinks.linkedin)} target="_blank" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-action/20 transition-all text-white/40 hover:text-white"><FaLinkedin size={18} /></a>}
              {user.socialLinks?.github && <a href={ensureAbsoluteUrl(user.socialLinks.github)} target="_blank" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white"><FaGithub size={18} /></a>}
              {user.socialLinks?.twitter && <a href={ensureAbsoluteUrl(user.socialLinks.twitter)} target="_blank" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-blue-400/20 transition-all text-white/40 hover:text-white"><FaTwitter size={18} /></a>}
              {isOwner && (
                 <button onClick={() => toast.success("Add more socials in Dashboard.")} className="p-4 bg-white/5 border border-dashed border-white/20 rounded-2xl text-white/20 hover:text-white transition-all">
                    <Plus size={18} />
                 </button>
              )}
            </div>

            <div className="flex flex-wrap gap-6 pt-12">
               <button onClick={() => setShowResumeModal(true)} className="px-10 py-5 bg-action text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-action/30 flex items-center gap-3">
                  <Download size={18} /> Download Executive CV
               </button>
               <a href={`mailto:${user.email}`} className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                  {branding.ctaButtonText || "Direct Inquire"} <FaArrowRight size={12} className="opacity-60" />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- 1. ABOUT & INDUSTRY --- */}
      <section id="about" className="py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          {/* Industry Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-400/10 border border-cyan-400/20 rounded-full">
              <InlineEdit isOwner={isOwner} label="Industry" value={user.personalInfo?.industry} onSave={(v) => handleLiveUpdate({ "personalInfo.industry": v })}>
                {user.personalInfo?.industry || 'Technology & Software'}
              </InlineEdit>
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            <InlineEdit isOwner={isOwner} label="Full Name" value={personalInfo.fullName} onSave={(v) => { const [f, ...l] = v.split(" "); handleLiveUpdate({ firstName: f, lastName: l.join(" ") }); }}>
              {personalInfo.fullName}
            </InlineEdit>
            <span className="text-white/50"> : </span>
            <InlineEdit isOwner={isOwner} label="Job Title" value={personalInfo.jobTitle} onSave={(v) => handleLiveUpdate({ "personalInfo.jobTitle": v })}>
              {personalInfo.jobTitle}
            </InlineEdit>
          </h2>
          
          <div className="text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-3xl mx-auto">
            <InlineEdit isOwner={isOwner} label="Summary" value={user.summary} onSave={(v) => handleLiveUpdate({ summary: v })} multiline>
              <p className="whitespace-pre-wrap">{user.summary || "Welcome to my digital space. I am passionate about building scalable solutions and crafting captivating digital experiences..."}</p>
            </InlineEdit>
          </div>

          <div className="pt-8">
            <button onClick={() => setShowResumeModal(true)} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white font-medium transition-all flex items-center gap-2 mx-auto">
              <Download size={18} /> Download CV
            </button>
          </div>
        </div>
      </section>

      {/* --- 2. PROFESSIONAL EXPERIENCE --- */}
      {(isOwner || (user.experience?.length > 0)) && (
        <section id="journey" className="py-24 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-teal-400 mb-16 text-center">
               <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.experience} onSave={(v) => handleLiveUpdate({ "sectionNames.experience": v })}>
                  {user.sectionNames?.experience || "Professional Experience"}
               </InlineEdit>
            </h2>
            <div className="w-full max-w-2xl space-y-12 relative before:absolute before:inset-0 before:mx-auto before:h-full before:w-0.5 before:bg-teal-500/20">
              {(user.experience || []).map((exp, index) => (
                <div key={exp._id || index} className="relative flex flex-col items-center group">
                  <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-teal-500 text-white mb-6 shadow-lg shadow-teal-500/20">
                    <Briefcase size={20} />
                  </div>
                  <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center shadow-xl backdrop-blur-sm hover:border-teal-500/30 transition-all">
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-teal-400/80 mb-2">
                      <InlineEdit isOwner={isOwner} label="Period" value={`${exp.startDate} - ${exp.endDate || 'Present'}`} onSave={(v) => { 
                        const [s, e] = v.split(" - "); 
                        handleArrayUpdate("experience", index, { startDate: s, endDate: e === "Present" ? "" : e, isCurrent: e === "Present" });
                      }}>
                        {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                      </InlineEdit>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <InlineEdit isOwner={isOwner} label="Location" value={exp.location} onSave={(v) => handleArrayUpdate("experience", index, { location: v })}>
                         {exp.location || "Location"}
                      </InlineEdit>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <InlineEdit isOwner={isOwner} label="Mode" value={exp.type} onSave={(v) => handleArrayUpdate("experience", index, { type: v })}>
                         {exp.type || "Full-time"}
                      </InlineEdit>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      <InlineEdit isOwner={isOwner} label="Role" value={exp.role} onSave={(v) => handleArrayUpdate("experience", index, { role: v })}>{exp.role}</InlineEdit>
                    </h3>
                    <h4 className="text-lg font-semibold text-white/50 mb-6">
                      <InlineEdit isOwner={isOwner} label="Company" value={exp.company} onSave={(v) => handleArrayUpdate("experience", index, { company: v })}>{exp.company}</InlineEdit>
                    </h4>
                    <div className="text-sm text-white/70 leading-relaxed">
                      <InlineEdit isOwner={isOwner} label="Achievements" value={exp.achievements} onSave={(v) => handleArrayUpdate("experience", index, { achievements: v })} multiline>
                        <p className="whitespace-pre-wrap">{exp.achievements || "Description..."}</p>
                      </InlineEdit>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {isOwner && (
              <button onClick={() => toast.error("Please add via Dashboard for full validation.")} className="mt-12 px-6 py-2 bg-white/5 hover:bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-400 text-sm font-medium transition-all flex items-center gap-2 z-10">
                <Plus size={16} /> Add Experience
              </button>
            )}
          </div>
        </section>
      )}

      {/* --- 3. EDUCATION HISTORY --- */}
      {(isOwner || (user.education?.length > 0)) && (
        <section id="education" className="py-24 border-b border-white/10 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-purple-400 mb-16 text-center">
               <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.education} onSave={(v) => handleLiveUpdate({ "sectionNames.education": v })}>
                  {user.sectionNames?.education || "Education History"}
               </InlineEdit>
            </h2>
            <div className="w-full max-w-2xl space-y-12 relative before:absolute before:inset-0 before:mx-auto before:h-full before:w-0.5 before:bg-purple-500/20">
              {(user.education || []).map((edu, index) => (
                <div key={edu._id || index} className="relative flex flex-col items-center group">
                  <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white mb-6 shadow-lg shadow-purple-500/20">
                    <GraduationCap size={20} />
                  </div>
                  <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center shadow-xl backdrop-blur-sm hover:border-purple-500/30 transition-all">
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-purple-400/80 mb-2">
                      <InlineEdit isOwner={isOwner} label="Period" value={`${edu.startDate} - ${edu.endDate || 'Present'}`} onSave={(v) => {
                        const [s, e] = v.split(" - ");
                        handleArrayUpdate("education", index, { startDate: s, endDate: e === "Present" ? "" : e });
                      }}>
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </InlineEdit>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <InlineEdit isOwner={isOwner} label="Result" value={edu.fieldOfStudy} onSave={(v) => handleArrayUpdate("education", index, { fieldOfStudy: v })}>
                         {edu.fieldOfStudy || "Field of Study"}
                      </InlineEdit>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      <InlineEdit isOwner={isOwner} label="Degree" value={edu.degree} onSave={(v) => handleArrayUpdate("education", index, { degree: v })}>{edu.degree}</InlineEdit>
                    </h3>
                    <h4 className="text-lg font-semibold text-white/50 mb-2">
                      <InlineEdit isOwner={isOwner} label="Institution" value={edu.institution} onSave={(v) => handleArrayUpdate("education", index, { institution: v })}>{edu.institution}</InlineEdit>
                    </h4>
                    {edu.description && (
                       <p className="text-xs text-white/40 mt-4 italic">
                          <InlineEdit isOwner={isOwner} label="Story" value={edu.description} onSave={(v) => handleArrayUpdate("education", index, { description: v })} multiline>{edu.description}</InlineEdit>
                       </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {isOwner && (
              <button onClick={() => toast.error("Please add via Dashboard.")} className="mt-12 px-6 py-2 bg-white/5 hover:bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium transition-all flex items-center gap-2 z-10">
                <Plus size={16} /> Add Education
              </button>
            )}
          </div>
        </section>
      )}

      {/* --- SECTION: PROJECTS / PORTFOLIO [V4.3 SURGERY MODE] --- */}
      {(isOwner || (profile.data.projects && profile.data.projects.length > 0) || (profile.data.portfolio && profile.data.portfolio.length > 0)) && (
        <section id="showcase" className="py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">My </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Portfolio</span>
              </h2>
              <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">
                Here is some of my selected work that showcases my expertise.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(profile.data.projects || profile.data.portfolio || []).map((project, index) => (
                <motion.div 
                  key={project._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col bg-[#0f172a]/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400/80 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:-translate-y-1"
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
                      <h3 className="text-xl font-bold text-white leading-tight">
                        <InlineEdit isOwner={isOwner} id={`proj-title-${index}`} value={project.title} onSave={(v) => handleArrayUpdate("projects", index, { title: v })}>
                          {project.title || 'Project Title'}
                        </InlineEdit>
                      </h3>
                      {(project.featured || project.isFeatured) && (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-orange-500/20 text-orange-400 rounded">Featured</span>
                      )}
                    </div>
                    
                    <div className="text-sm text-white/60 leading-relaxed mb-6 flex-1 line-clamp-3 group-hover:line-clamp-none transition-all">
                      <InlineEdit isOwner={isOwner} id={`proj-desc-${index}`} value={project.description} type="textarea" onSave={(v) => handleArrayUpdate("projects", index, { description: v })}>
                        <p>{project.description || 'Describe the problem you solved and the technologies you used...'}</p>
                      </InlineEdit>
                    </div>

                    {/* Links & Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                      {(project.liveUrl || project.liveLink) && (
                        <a href={project.liveUrl || project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                      {(project.githubUrl || project.githubLink) && (
                        <a href={project.githubUrl || project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
                          <GithubIcon size={16} /> Source Code
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
                <button onClick={() => dispatch(openProjectModalThunk())} className="px-8 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 font-medium transition-all flex items-center gap-2 mx-auto shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                  <Plus size={18} /> Add New Project
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- 4. EXPERTISE & SKILLS (Categorized) --- */}
      {(isOwner || (user.skills?.length > 0)) && (
        <section id="expertise" className="py-24 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 space-y-24">
            <h2 className="text-3xl font-bold text-center text-blue-400">
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
                           <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20"><FaLayerGroup size={16}/></div>
                           <h3 className="text-lg font-black uppercase tracking-widest text-white/80">{cat}</h3>
                        </div>
                        <div className="space-y-6">
                           {filteredSkills.map((skill, index) => {
                              const skillName = typeof skill === 'string' ? skill : skill.name;
                              const skillLevel = typeof skill === 'string' ? 80 : (skill.percentage || 80); 
                              return (
                                <div key={index} className="space-y-3 group">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                                      <InlineEdit isOwner={isOwner} label="Skill" value={skillName} onSave={(v) => handleArrayUpdate("skills", index, { name: v })}>{skillName}</InlineEdit>
                                    </span>
                                    <span className="text-white/20 text-[10px] font-mono">{skillLevel}%</span>
                                  </div>
                                  <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                                    <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-1 rounded-full group-hover:scale-x-105 transition-transform origin-left" style={{ width: `${skillLevel}%` }}></div>
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
                 <button onClick={() => toast.error("Manage categories in Dashboard.")} className="px-6 py-2 bg-white/5 hover:bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium transition-all flex items-center gap-2 mx-auto">
                  <Plus size={16} /> Add Skill
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- 5. CREDENTIALS (CERTIFICATIONS & AWARDS) --- */}
      {(isOwner || user.certifications?.length > 0 || user.honorsAndAwards?.length > 0) && (
        <section id="credentials" className="py-24 border-b border-white/10 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Certifications */}
            {(isOwner || user.certifications?.length > 0) && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-3 justify-center md:justify-start"><Award size={24}/> Certifications</h2>
                <div className="space-y-4">
                  {(user.certifications || []).map((cert, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 transition-all">
                      <h3 className="text-lg font-bold text-white mb-1">
                        <InlineEdit isOwner={isOwner} label="Name" value={cert.name} onSave={(v) => handleArrayUpdate("certifications", index, { name: v })}>{cert.name}</InlineEdit>
                      </h3>
                      <p className="text-sm text-emerald-400/80 mb-2">
                        <InlineEdit isOwner={isOwner} label="Issuer" value={cert.issuer} onSave={(v) => handleArrayUpdate("certifications", index, { issuer: v })}>{cert.issuer}</InlineEdit>
                      </p>
                      <p className="text-xs text-white/40 uppercase tracking-wider">
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
                <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-3 justify-center md:justify-start"><Trophy size={24}/> Honors & Awards</h2>
                <div className="space-y-4">
                  {(user.honorsAndAwards || []).map((award, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-yellow-500/30 transition-all">
                      <h3 className="text-lg font-bold text-white mb-1">
                        <InlineEdit isOwner={isOwner} label="Title" value={award.title} onSave={(v) => handleArrayUpdate("honorsAndAwards", index, { title: v })}>{award.title}</InlineEdit>
                      </h3>
                      <p className="text-xs text-white/40 uppercase tracking-wider mt-3">
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
        <section id="languages" className="py-24 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
            <h2 className="text-3xl font-bold text-indigo-400 flex justify-center items-center gap-3"><Globe size={28}/> Languages</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {(user.languages || []).map((lang, index) => (
                <div key={index} className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl px-8 py-4 hover:border-indigo-500/40 transition-all">
                  <span className="text-white font-bold text-lg mb-1">
                    <InlineEdit isOwner={isOwner} label="Language" value={lang.name} onSave={(v) => handleArrayUpdate("languages", index, { name: v })}>{lang.name}</InlineEdit>
                  </span>
                  <span className="text-indigo-400/80 text-xs uppercase tracking-widest font-medium">
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
        <section id="certifications" className="py-24 border-b border-white/10 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-emerald-400 mb-16 text-center">
               <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.certifications} onSave={(v) => handleLiveUpdate({ "sectionNames.certifications": v })}>
                  {user.sectionNames?.certifications || "Certifications"}
               </InlineEdit>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {(user.certifications || []).map((cert, index) => (
                <div key={index} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-emerald-500/30 transition-all group">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400"><Award size={24}/></div>
                      <div className="flex-1 space-y-1">
                         <h3 className="text-lg font-black text-white">
                            <InlineEdit isOwner={isOwner} label="Cert Name" value={cert.name} onSave={(v) => handleArrayUpdate("certifications", index, { name: v })}>{cert.name}</InlineEdit>
                         </h3>
                         <p className="text-sm font-bold text-emerald-400/80">
                            <InlineEdit isOwner={isOwner} label="Issuer" value={cert.issuer} onSave={(v) => handleArrayUpdate("certifications", index, { issuer: v })}>{cert.issuer}</InlineEdit>
                         </p>
                         <div className="flex items-center gap-3 text-[10px] text-white/30 font-bold uppercase tracking-widest pt-2">
                            <span>
                               <InlineEdit isOwner={isOwner} label="Date" value={cert.date} onSave={(v) => handleArrayUpdate("certifications", index, { date: v })}>{cert.date}</InlineEdit>
                            </span>
                            {cert.link && (
                               <a href={ensureAbsoluteUrl(cert.link)} target="_blank" className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1 transition-colors">
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
        <section id="achievements" className="py-24 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-amber-400 mb-16 text-center">
               <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.achievements} onSave={(v) => handleLiveUpdate({ "sectionNames.achievements": v })}>
                  {user.sectionNames?.achievements || "Honors & Awards"}
               </InlineEdit>
            </h2>
            <div className="space-y-6 w-full max-w-2xl">
              {(user.achievements || []).map((ach, index) => (
                <div key={index} className="relative p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-amber-500/30 transition-all flex gap-6 items-center">
                   <div className="w-16 h-16 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0 animate-pulse"><Trophy size={32}/></div>
                   <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                         <h3 className="text-xl font-black text-white">
                            <InlineEdit isOwner={isOwner} label="Award Title" value={ach.title} onSave={(v) => handleArrayUpdate("achievements", index, { title: v })}>{ach.title}</InlineEdit>
                         </h3>
                         <span className="text-[10px] font-black text-amber-400/60 uppercase tracking-widest">
                            <InlineEdit isOwner={isOwner} label="Date" value={ach.date} onSave={(v) => handleArrayUpdate("achievements", index, { date: v })}>{ach.date}</InlineEdit>
                         </span>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed italic">
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
        <section id="services" className="py-32 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-6 space-y-20">
            <div className="text-center space-y-4">
               <h2 className="text-xs font-black uppercase tracking-[0.5em] text-action">Professional Ecosystem</h2>
               <p className="text-4xl md:text-6xl font-black">
                  <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.services} onSave={(v) => handleLiveUpdate({ "sectionNames.services": v })}>
                     {user.sectionNames?.services || "What I Offer"}
                  </InlineEdit>
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(user.services || []).map((service, idx) => (
                <Card key={idx} className="p-10 space-y-6 hover:border-action/20 transition-all border-white/5 bg-white/[0.02]">
                   <div className="w-16 h-16 rounded-3xl bg-action/10 flex items-center justify-center text-action">
                      <FaMagic size={24} />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-xl font-black">
                         <InlineEdit isOwner={isOwner} label="Service Title" value={service.title} onSave={(v) => handleArrayUpdate("services", idx, { title: v })}>{service.title || "Consulting"}</InlineEdit>
                      </h3>
                      <p className="text-sm text-[var(--test-secondary)] font-medium italic opacity-60">
                         <InlineEdit isOwner={isOwner} label="Service Description" value={service.description} onSave={(v) => handleArrayUpdate("services", idx, { description: v })} multiline>{service.description || "Deep architectural strategy and semantic engineering..."}</InlineEdit>
                      </p>
                   </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 8. INTERESTS & HOBBIES --- */}
      {(isOwner || user.interests?.length > 0) && (
        <section id="hobbies" className="py-24 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
            <h2 className="text-2xl font-black uppercase tracking-[0.4em] text-cyan-400">Beyond the Desktop</h2>
            <div className="flex flex-wrap justify-center gap-6">
               {(user.interests || []).map((hobby, idx) => (
                  <div key={idx} className="px-8 py-4 bg-white/5 border border-white/10 rounded-3xl hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all text-sm font-bold text-white/60 hover:text-white">
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
                  }} className="px-8 py-4 bg-white/5 border border-dashed border-white/20 rounded-3xl text-sm font-bold text-white/20 hover:text-white transition-all">
                     + Add Interest
                  </button>
               )}
            </div>
          </div>
        </section>
      )}
      
      {/* ── FOOTER ── */}
      <footer id="contact" className="py-40 px-6 text-center">
         <div className="max-w-4xl mx-auto space-y-20">
            <motion.div {...reveal} className="space-y-12">
               <div className="space-y-4">
                  <h3 className="text-7xl md:text-9xl font-black tracking-tighter">{branding.ctaTitle || "Ready for Impact?"}</h3>
                  <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium max-w-2xl mx-auto opacity-60">{branding.ctaSubtitle || "Leverage the power of career intelligence."}</p>
               </div>
               <div className="flex flex-wrap justify-center gap-8 pt-10">
                  <a href={`mailto:${user.email}`} className="px-12 py-6 bg-action text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-action/40">Launch Conversation</a>
                  {user.socialLinks?.github && <a href={ensureAbsoluteUrl(user.socialLinks.github)} target="_blank" className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all"><FaGithub size={24} /></a>}
               </div>
            </motion.div>
            
            <div className="pt-20 border-t border-white/5 space-y-6">
               <div className="opacity-30 space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.8em]">{branding.siteFooter || "Career Intelligence V4.4"}</p>
                  <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-action">Powered by CVify Semantic Architecture</p>
               </div>
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
