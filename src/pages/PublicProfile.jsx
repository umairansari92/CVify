import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../api/axios";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaDownload,
  FaGem,
  FaWhatsapp,
  FaBriefcase,
  FaGraduationCap,
  FaPalette,
  FaCheckCircle,
  FaPlus,
  FaLayerGroup,
  FaChartBar,
  FaRocket,
  FaPlay,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchPublicProfile, 
  fetchProfileAnalytics,
  updateActiveProfileLocally,
  clearActiveProfile,
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

  const [localTheme, setLocalTheme] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
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

  useEffect(() => {
    if (user) {
      const fetchAts = async () => {
        try {
          const atsResponse = await api.get(`/ats/public-score/${username}`);
          if (atsResponse.data) setAtsScore(atsResponse.data);
        } catch (err) { console.warn("ATS score fetch failed"); }
      };
      fetchAts();
    }
  }, [user, username]);

  const handleLiveUpdate = async (updates) => {
    if (!user.isOwner) return;
    setIsUpdating(true);
    try {
      dispatch(updateActiveProfileLocally(updates));
      await api.patch("/auth/profile", updates);
      toast.success("Live Built Saved!", { id: "sync" });
    } catch (err) {
      toast.error("Builder sync failed.");
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

  const ensureAbsoluteUrl = (url) => {
    if (!url || typeof url !== "string") return "";
    const trimmed = url.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) return trimmed;
    return `https://${trimmed}`;
  };

  // Theme Presets [V4.1]
  const themePresets = [
    { name: "Classic Pro", headerBg: "#2563eb", headerBgSecondary: "#9333ea", bodyBg: "#0f172a", fontPrimary: "Inter", cardStyle: "glass", icon: "⚡", textPrimary: "#ffffff", textSecondary: "#94a3b8", accentColor: "#2563eb" },
    { name: "Midnight AI", headerBg: "#0f172a", headerBgSecondary: "#1e293b", bodyBg: "#020617", fontPrimary: "JetBrains Mono", cardStyle: "minimal", icon: "🌙", textPrimary: "#f8fafc", textSecondary: "#94a3b8", accentColor: "#38bdf8" },
    { name: "Executive", headerBg: "#1e3a8a", headerBgSecondary: "#1e40af", bodyBg: "#ffffff", fontPrimary: "Outfit", cardStyle: "classic", icon: "🏢", textPrimary: "#1e293b", textSecondary: "#475569", accentColor: "#1e3a8a" },
    { name: "Sunset Design", headerBg: "#f97316", headerBgSecondary: "#db2777", bodyBg: "#fff7ed", fontPrimary: "Poppins", cardStyle: "glass", icon: "🌅", textPrimary: "#431407", textSecondary: "#9a3412", accentColor: "#f97316" },
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (profileError || !user) return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 text-center italic">
      <h1 className="text-8xl font-black mb-4 opacity-20">404</h1>
      <p className="text-xl text-slate-400 mb-8">This professional universe is currently empty.</p>
      <Link to="/" className="px-10 py-4 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20">Go Home</Link>
    </div>
  );

  const portfolio = user.portfolio || user.projects || [];
  const theme = localTheme || themePresets[0];

  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Showcase", href: "#showcase" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-500 selection:bg-action selection:text-white overflow-x-hidden scroll-smooth"
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
        <title>{`${user.firstName} ${user.lastName} | Personal Website`}</title>
        <link href={`https://fonts.googleapis.com/css2?family=${theme.fontPrimary.replace(/\s+/g, "+")}:wght@300;400;500;600;700;800;900&display=swap`} rel="stylesheet" />
        <style>{`html { scroll-behavior: smooth; }`}</style>
      </Helmet>

      {/* ── Sticky Website Navbar [V4.1] ── */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${scrolled ? "py-4 bg-[var(--body-bg)]/80 backdrop-blur-xl border-white/10 shadow-2xl" : "py-8 bg-transparent border-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black uppercase tracking-tighter text-[var(--text-primary)]">
              {user.firstName} {user.lastName}
            </span>
            <span className="w-2 h-2 rounded-full bg-action animate-pulse" />
          </div>
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-action transition-all">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => handleDownloadPDF(user)} className="px-6 py-2.5 bg-action text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-action/20">Resume</button>
          </div>
        </div>
      </nav>

      {/* ── Visual Builder Controls ── */}
      {user.isOwner && (
        <>
          <div className="fixed bottom-10 right-10 z-[110] flex flex-col gap-4">
            <button onClick={() => setShowThemePanel(!showThemePanel)} className="w-14 h-14 bg-action text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group">
              <FaPalette className="group-hover:rotate-12 transition-transform" />
            </button>
            <Link to="/edit" className="w-14 h-14 bg-slate-800 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all">
              <FaPlus />
            </Link>
          </div>
          <ThemePanel isOpen={showThemePanel} onClose={() => setShowThemePanel(false)} theme={theme} onUpdate={handleThemeUpdate} isUpdating={isUpdating} presets={themePresets} />
        </>
      )}

      {/* ── SECTION 1: HOME (HERO) ── */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-6 py-24">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${theme.accentColor} 0%, transparent 60%)` }} />
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="mx-auto w-40 h-40 md:w-56 md:h-56 rounded-[3rem] overflow-hidden border-4 border-action/20 shadow-2xl mb-12">
            <img src={user.profileImage || "https://images.unsplash.com/photo-1519085185758-2ad3ed098fb4"} alt={user.firstName} className="w-full h-full object-cover" />
          </motion.div>
          <div className="space-y-6">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[10px] font-black uppercase tracking-[0.5em] text-action">Professional Portfolio</motion.p>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-[var(--text-primary)] leading-tight tracking-tighter">
              <InlineEdit value={`${user.firstName} ${user.lastName}`} onSave={(v) => { const [f, ...l] = v.split(" "); handleLiveUpdate({ firstName: f, lastName: l.join(" ") }); }} isOwner={user.isOwner} label="Full Name" />
            </h1>
            <p className="text-xl md:text-4xl font-medium text-[var(--text-secondary)] opacity-80 max-w-4xl mx-auto leading-tight">
              <InlineEdit value={user.headline} onSave={(v) => handleLiveUpdate({ headline: v })} isOwner={user.isOwner} label="Headline" />
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 pt-12">
            <a href="#about" className="px-12 py-5 bg-action text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-action/30">Explore Story</a>
            {user.socialLinks?.github && <a href={ensureAbsoluteUrl(user.socialLinks.github)} target="_blank" className="px-12 py-5 bg-white/5 border border-white/10 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all text-[var(--text-primary)]">Open Github</a>}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: ABOUT ── */}
      <section id="about" className="py-32 px-6">
        <motion.div {...reveal} className="max-w-4xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-action">Who Am I?</h2>
            <div className="h-px w-20 bg-action mx-auto opacity-30" />
          </div>
          <div className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] leading-relaxed italic opacity-90">
            <InlineEdit value={user.bio} onSave={(v) => handleLiveUpdate({ bio: v })} isOwner={user.isOwner} multiline label="About Me" className="whitespace-pre-wrap" />
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 3: EXPERTISE ── */}
      <section id="expertise" className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto space-y-20">
          <motion.div {...reveal} className="text-center space-y-4">
             <h2 className="text-xs font-black uppercase tracking-[0.5em] text-action">Core Expertise</h2>
             <p className="text-4xl md:text-6xl font-black text-[var(--text-primary)]">What I bring to the table</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <Card className="p-12 space-y-12 bg-action/5 border-action/10">
                <div className="flex justify-between items-center">
                   <h3 className="text-xs font-black uppercase tracking-widest text-action">Technical Stack</h3>
                   <FaLayerGroup className="text-action" />
                </div>
                <div className="space-y-8">
                   {(user.skills || []).filter(s => s.type === "Technical").map((s, i) => (
                      <div key={i} className="space-y-3">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                            <span>{s.name}</span>
                            <span>{s.percentage || 80}%</span>
                         </div>
                         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.percentage || 80}%` }} transition={{ duration: 1.5 }} className="h-full bg-action" />
                         </div>
                      </div>
                   ))}
                </div>
             </Card>

             <Card className="p-12 space-y-10">
                <div className="flex justify-between items-center">
                   <h3 className="text-xs font-black uppercase tracking-widest opacity-60">Strategic Domains</h3>
                   <FaRocket className="text-slate-500" />
                </div>
                <div className="flex flex-wrap gap-3">
                   {(user.skills || []).filter(s => s.type !== "Technical").map((s, i) => (
                      <span key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-action transition-all">
                         {s.name}
                      </span>
                   ))}
                </div>
             </Card>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SHOWCASE ── */}
      {portfolio.length > 0 && (
        <section id="showcase" className="py-32 px-6">
          <div className="max-w-7xl mx-auto space-y-20">
            <motion.div {...reveal} className="text-center space-y-4">
               <h2 className="text-xs font-black uppercase tracking-[0.5em] text-action">Portfolio Showcase</h2>
               <p className="text-4xl md:text-6xl font-black text-[var(--text-primary)]">Selected Masterpieces</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((proj, idx) => (
                <motion.div key={idx} {...reveal} transition={{ delay: idx * 0.1 }}>
                  <Card className="p-0 overflow-hidden border-none group hover:shadow-2xl transition-all h-full flex flex-col">
                    <div className="aspect-video relative bg-slate-800 overflow-hidden">
                       {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 transition-all backdrop-blur-md">
                          {proj.liveLink && <a href={ensureAbsoluteUrl(proj.liveLink)} target="_blank" className="p-5 bg-action text-white rounded-2xl hover:scale-110 transition-transform"><FaGlobe size={22} /></a>}
                          {proj.githubLink && <a href={ensureAbsoluteUrl(proj.githubLink)} target="_blank" className="p-5 bg-white text-midnight rounded-2xl hover:scale-110 transition-transform"><FaGithub size={22} /></a>}
                       </div>
                    </div>
                    <div className="p-10 space-y-4 flex-1">
                       <h3 className="text-xl font-black"><InlineEdit value={proj.title} onSave={(v) => handleArrayUpdate("portfolio", idx, { title: v })} isOwner={user.isOwner} label="Project Name" /></h3>
                       <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
                         <InlineEdit value={proj.description} onSave={(v) => handleArrayUpdate("portfolio", idx, { description: v })} isOwner={user.isOwner} multiline label="Summary" />
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
             <h2 className="text-xs font-black uppercase tracking-[0.5em] text-action">The Journey</h2>
             <p className="text-4xl md:text-6xl font-black text-[var(--text-primary)]">Professional Story</p>
          </motion.div>

          <div className="space-y-12 relative before:absolute before:left-[-1px] md:before:left-[31px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 ml-4 md:ml-0">
            {(user.experience || []).map((exp, idx) => (
               <motion.div key={idx} {...reveal} className="relative pl-12 md:pl-24">
                  <div className="absolute left-[-21px] md:left-[12px] top-6 w-10 h-10 rounded-2xl bg-[var(--body-bg)] border-2 border-white/10 z-10 flex items-center justify-center shadow-xl">
                     <FaBriefcase className="text-xs text-action" />
                  </div>
                  <Card className="p-10 md:p-14 space-y-6 hover:border-action/20 transition-all border-white/5">
                     <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                           <div className="space-y-2">
                              <h3 className="text-3xl font-black">
                                <InlineEdit value={exp.role} onSave={(v) => handleArrayUpdate("experience", idx, { role: v })} isOwner={user.isOwner} label="Role" />
                              </h3>
                              <div className="flex items-center gap-4 text-action font-black text-sm uppercase tracking-widest">
                                 <span><InlineEdit value={exp.company} onSave={(v) => handleArrayUpdate("experience", idx, { company: v })} isOwner={user.isOwner} label="Company" /></span>
                                 <span className="w-2 h-2 rounded-full bg-white/10" />
                                 <span className="opacity-60">{exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}</span>
                              </div>
                           </div>
                        </div>
                        <p className="text-lg text-[var(--text-secondary)] font-medium leading-relaxed italic">
                           <InlineEdit value={exp.achievements} onSave={(v) => handleArrayUpdate("experience", idx, { achievements: v })} isOwner={user.isOwner} multiline label="Story" className="whitespace-pre-wrap" />
                        </p>
                     </div>
                  </Card>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CONTACT (FOOTER) ── */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-20">
          <motion.div {...reveal} className="space-y-8">
             <h3 className="text-6xl md:text-9xl font-black tracking-tighter">Ready for <br /> <span className="text-action">Impact?</span></h3>
             <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium max-w-2xl mx-auto">Collaboration drives 10x value. Let's discuss your high-stakes projects or roles.</p>
             <div className="flex flex-wrap justify-center gap-8 pt-8">
                <a href={`mailto:${user.email}`} className="px-12 py-6 bg-action text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-action/40">Launch Conversation</a>
                {user.socialLinks?.linkedin && <a href={ensureAbsoluteUrl(user.socialLinks.linkedin)} target="_blank" className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all text-[var(--text-primary)]"><FaLinkedin size={24} /></a>}
                {user.whatsapp && <a href={`https://wa.me/${user.whatsapp.replace(/\D/g, "")}`} target="_blank" className="p-6 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-3xl hover:scale-110 transition-all"><FaWhatsapp size={24} /></a>}
             </div>
          </motion.div>

          <footer className="pt-32 opacity-20 space-y-4">
             <p className="text-[10px] font-black uppercase tracking-[0.5em]">System V4.1 • CVify Website Builder Engine</p>
             <p className="text-[8px] font-black uppercase tracking-widest text-action">Powered by Digital Identity Infrastructure</p>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default PublicProfile;
