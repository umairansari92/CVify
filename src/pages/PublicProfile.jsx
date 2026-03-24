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
} from "react-icons/fa";
import { 
  Trash, 
  Plus, 
  FileText, 
  Edit3, 
  Download, 
  Palette 
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
  updateHeroImageThunk
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
      setLocalTheme(user.themeSettings);
    } else if (user) {
      setLocalTheme({
        headerBg: "#2563eb",
        headerBgSecondary: "#9333ea",
        bodyBg: "#0f172a",
        cardStyle: "glass",
        fontPrimary: "Inter",
        textPrimary: "#ffffff",
        textSecondary: "#94a3b8",
        accentColor: "#2563eb",
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
          <div className="hidden lg:flex items-center gap-8 text-[9px] font-black uppercase tracking-widest">
            <a href="#home" className="text-[var(--text-secondary)] hover:text-action">Home</a>
            <a href="#dashboard" className="text-[var(--text-secondary)] hover:text-action">Intelligence</a>
            <a href="#showcase" className="text-[var(--text-secondary)] hover:text-action">Showcase</a>
            <a href="#journey" className="text-[var(--text-secondary)] hover:text-action">Journey</a>
          </div>
          <button onClick={() => setShowResumeModal(true)} className="px-6 py-2.5 bg-action text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-action/20">Get Resume</button>
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
                <span className="px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-action mb-4 inline-block">{branding.identityLabel || "Professional Showcase"}</span>
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

            <div className="flex flex-wrap gap-6 pt-6">
               <button onClick={() => setShowResumeModal(true)} className="px-12 py-6 bg-action text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-action/30 flex items-center gap-3">
                  <Download size={18} /> Download Resume
               </button>
               <a href={`mailto:${user.email}`} className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                  {branding.ctaButtonText || "Inquire Now"} <FaArrowRight className="text-[10px] opacity-60" />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: INTELLIGENCE DASHBOARD ── */}
      <section id="dashboard" className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto space-y-20">
          <motion.div {...reveal} className="text-center space-y-4">
             <h2 className="text-xs font-black uppercase tracking-[0.5em] text-action">{branding.intelligenceSubtitle || "Career Intelligence"}</h2>
             <p className="text-4xl md:text-6xl font-black text-[var(--text-primary)]">{branding.intelligenceTitle || "Audit Accuracy & Semantic Power"}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <ScoreCard label={branding.formattingLabel || "Formatting Precision"} score={atsScores.formattingScore} color="#3b82f6" />
             <ScoreCard label={branding.keywordsLabel || "Keyword Synergy"} score={atsScores.keywordScore} color="#a855f7" />
             <ScoreCard label={branding.quantificationLabel || "Data Quantification"} score={atsScores.quantificationScore} color="#f59e0b" />
             <ScoreCard label={branding.impactLabel || "Strategic Impact"} score={atsScores.impactScore} color="#10b981" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12">
             <Card className="p-10 space-y-10 group hover:border-emerald-500/20 transition-all">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-emerald-500">
                   <h3>{branding.strengthsLabel || "AI-Verified Strengths"}</h3>
                   <FaCheckCircle className="text-emerald-500" />
                </div>
                <div className="space-y-6">
                   {analysis.strengths.map((st, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl group-hover:bg-emerald-500/10 transition-all">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shadow-lg shadow-emerald-500/80" />
                         <p className="text-sm font-bold opacity-80">{st}</p>
                      </div>
                   ))}
                </div>
             </Card>
             <Card className="p-10 space-y-10 group hover:border-amber-500/20 transition-all">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-amber-500">
                   <h3>{branding.weaknessesLabel || "Constructive Weaknesses"}</h3>
                   <FaExclamationTriangle className="text-amber-500" />
                </div>
                <div className="space-y-6">
                   {analysis.weaknesses.map((wk, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl group-hover:bg-amber-500/10 transition-all">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                         <p className="text-sm font-bold opacity-80">{wk}</p>
                      </div>
                   ))}
                </div>
             </Card>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: AI OPTIMIZATION IMPACT ── */}
      {(user.history?.length > 0 || user.isOwner) && (
        <section id="impact" className="py-32 px-6 bg-action/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-action/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="max-w-6xl mx-auto space-y-20 relative z-10 text-center">
              <motion.div {...reveal} className="space-y-4">
                 <h2 className="text-xs font-black uppercase tracking-[0.5em] text-action">{branding.impactSubtitle || "The Transformation"}</h2>
                 <p className="text-4xl md:text-6xl font-black">{branding.impactTitle || "AI Optimization Impact"}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
                 <div className="space-y-8">
                    <Card className="p-10 bg-white/[0.02] border-white/5 opacity-50 space-y-4">
                       <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Before Audit</span>
                       <div className="flex items-end gap-3"><span className="text-6xl font-black">58</span><span className="text-lg font-black opacity-20">%</span></div>
                    </Card>
                    <div className="flex justify-center"><FaChevronDown className="text-action animate-bounce" /></div>
                    <Card className="p-10 border-action/30 bg-action/5 space-y-4">
                       <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-action">
                          <span>After AI Engine</span>
                          <span className="px-3 py-1 bg-emerald-500 text-white rounded-full uppercase">+30% Growth</span>
                       </div>
                       <div className="flex items-end gap-3"><span className="text-8xl font-black text-white">{atsScores.overall}</span><span className="text-lg font-black opacity-40 pb-2">%</span></div>
                    </Card>
                 </div>
                 <div className="space-y-10">
                    <h3 className="text-3xl md:text-4xl font-black leading-tight">{branding.impactLead || "Data doesn't lie."} <br /><span className="text-action">{branding.impactLeadAlt || "Career authority is built."}</span></h3>
                    <p className="text-lg font-medium opacity-60 leading-relaxed">{branding.impactDescription || "Semantically engineered to pass multi-layer ATS audits and recruiter human psychology."}</p>
                    <ul className="space-y-6">
                       {[
                         { icon: <FaRocket />, label: branding.proofLabel1 || "70% More Semantic Reach" },
                         { icon: <FaMagic />, label: branding.proofLabel2 || "Faang-Grade Bullet Optimization" },
                         { icon: <FaCheckCircle />, label: branding.proofLabel3 || "Human-Centric UX Design" }
                       ].map((item, i) => (
                         <li key={i} className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-2xl bg-action/10 flex items-center justify-center text-action group-hover:scale-110 transition-all">{item.icon}</div>
                            <span className="text-sm font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all">{item.label}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* ── SECTION 4: SHOWCASE ── */}
      {portfolio.length > 0 && (
        <section id="showcase" className="py-32 px-6">
          <div className="max-w-7xl mx-auto space-y-20">
            <motion.div {...reveal} className="text-center space-y-4">
               <h2 className="text-xs font-black uppercase tracking-[0.5em] text-action">{branding.showcaseSubtitle || "Project Showcase"}</h2>
               <p className="text-4xl md:text-6xl font-black">{branding.showcaseTitle || "High-Impact Deliverables"}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {portfolio.map((proj, idx) => (
                <motion.div key={idx} {...reveal} transition={{ delay: idx * 0.1 }}>
                  <Card className="p-0 overflow-hidden border-none group hover:shadow-2xl transition-all h-full flex flex-col bg-white/[0.01]">
                    <div className="aspect-video relative bg-slate-800 overflow-hidden">
                       {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 transition-all backdrop-blur-md">
                          {proj.liveLink && <a href={ensureAbsoluteUrl(proj.liveLink)} target="_blank" className="p-5 bg-action text-white rounded-2xl hover:scale-110"><FaGlobe size={20} /></a>}
                          {proj.githubLink && <a href={ensureAbsoluteUrl(proj.githubLink)} target="_blank" className="p-5 bg-white text-midnight rounded-2xl hover:scale-110"><FaGithub size={20} /></a>}
                       </div>
                    </div>
                    <div className="p-10 space-y-6 flex-1">
                       <div className="space-y-2">
                          <h3 className="text-xl font-black">
                            <InlineEdit value={proj.title} onSave={(v) => handleArrayUpdate("portfolio", idx, { title: v })} isOwner={user.isOwner} label="Project Name" />
                          </h3>
                       </div>
                       <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed italic opacity-80">
                         <InlineEdit value={proj.description} onSave={(v) => handleArrayUpdate("portfolio", idx, { description: v })} isOwner={user.isOwner} multiline label="Achievement Summary" />
                       </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 5: JOURNEY ── */}
      <section id="journey" className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto space-y-20">
          <motion.div {...reveal} className="text-center space-y-4">
             <h2 className="text-xs font-black uppercase tracking-[0.5em] text-action">{branding.journeySubtitle || "Professional Journey"}</h2>
             <p className="text-4xl md:text-6xl font-black">{branding.journeyTitle || "Authority Evolution"}</p>
          </motion.div>

          <div className="space-y-12 relative before:absolute before:left-[-1px] md:before:left-[31px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 ml-4 md:ml-0 text-left">
            {(user.experience || []).map((exp, idx) => (
               <motion.div key={idx} {...reveal} className="relative pl-12 md:pl-24">
                  <div className="absolute left-[-21px] md:left-[12px] top-6 w-10 h-10 rounded-2xl bg-[var(--body-bg)] border-2 border-white/10 z-10 flex items-center justify-center shadow-xl">
                     <FaBriefcase className="text-xs text-action" />
                  </div>
                  <Card className="p-10 md:p-14 space-y-8 hover:border-action/20 transition-all border-white/5 bg-white/[0.01]">
                     <div className="space-y-4">
                        <h3 className="text-3xl font-black leading-none">
                           <InlineEdit value={exp.role} onSave={(v) => handleArrayUpdate("experience", idx, { role: v })} isOwner={user.isOwner} label="Role" />
                        </h3>
                        <div className="flex items-center gap-4 text-action font-black text-[10px] uppercase tracking-[0.2em] opacity-80">
                           <InlineEdit value={exp.company} onSave={(v) => handleArrayUpdate("experience", idx, { company: v })} isOwner={user.isOwner} label="Company" />
                           <span className="w-1 h-1 rounded-full bg-white/10" />
                           <span className="opacity-50 tracking-tighter">{exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}</span>
                        </div>
                     </div>
                     <p className="text-lg text-[var(--text-secondary)] font-medium leading-relaxed italic opacity-70">
                        <InlineEdit value={exp.achievements} onSave={(v) => handleArrayUpdate("experience", idx, { achievements: v })} isOwner={user.isOwner} multiline label="Story" className="whitespace-pre-wrap" />
                     </p>
                  </Card>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

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
