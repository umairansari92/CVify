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
      if (!user || user.isOwner) return;
      const userId = user._id;
      if (type === "view") await api.post(`/profile-analytics/${userId}/view`);
      else if (type === "download") await api.post(`/profile-analytics/${userId}/download`);
      else if (type === "contact") await api.post(`/profile-analytics/${userId}/contact-click`);
    } catch (err) { console.error("Interaction failed:", err); }
  };

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
      dispatch(updateActiveProfileLocally(updates));
      await api.patch("/auth/profile", updates);
      toast.success("Syncing Live...", { id: "sync" });
    } catch (err) {
      toast.error("Failed to sync.");
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
    if (trimmed.startsWith("//")) return `https:${trimmed}`;
    return `https://${trimmed}`;
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (profileError || !user) return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 text-center italic">
      <h1 className="text-6xl font-black mb-4">404</h1>
      <p className="text-xl text-slate-400 mb-8">No professional path found here.</p>
      <Link to="/" className="px-8 py-3 bg-blue-600 rounded-2xl font-black uppercase text-sm">Go Home</Link>
    </div>
  );

  const portfolio = user.portfolio || user.projects || [];
  const sectionNames = user.sectionNames || {
    experience: "Professional Experience",
    education: "Education History",
    skills: "Expertise & Skills",
    projects: "Work Portfolio",
    services: "Professional Services",
  };
  
  const theme = localTheme || {
    headerBg: "#2563eb",
    headerBgSecondary: "#9333ea",
    bodyBg: "#0f172a",
    cardStyle: "glass",
    fontPrimary: "Inter",
    textPrimary: "#ffffff",
    textSecondary: "#94a3b8",
    accentColor: "#2563eb",
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500 pb-40 relative selection:bg-action selection:text-white overflow-x-hidden"
      style={{
        backgroundColor: theme.bodyBg,
        fontFamily: `'${theme.fontPrimary}', sans-serif`,
        "--action": theme.accentColor || "#2563eb",
        "--text-primary": theme.textPrimary || "#ffffff",
        "--text-secondary": theme.textSecondary || "#94a3b8",
        "--body-bg": theme.bodyBg || "#0f172a",
        "--card-bg": theme.cardStyle === "glass" ? "rgba(255, 255, 255, 0.05)" : "rgba(255,255,255,0.03)",
        "--card-border": "rgba(255,255,255,0.1)",
        "--card-shadow": "0 10px 40px -10px rgba(0,0,0,0.5)",
        color: "var(--text-primary)",
      }}
    >
      {/* ── Owner Controls ── */}
      {user.isOwner && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
          <button onClick={() => setShowThemePanel(!showThemePanel)} className="p-4 bg-action text-white rounded-full shadow-2xl hover:scale-110 transition-all"><FaPalette /></button>
          <Link to="/edit" className="p-4 bg-slate-800 text-white rounded-full shadow-2xl hover:scale-110 transition-all"><FaCog /></Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-12">
          
          {/* LEFT MAIN (Column 1 & 2) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* HERO [V3.4.2 RESTORED] */}
            <section>
              <Card className="relative overflow-hidden border-none p-0 group min-h-[500px] flex items-center">
                <div className="absolute inset-0 z-0" style={{ background: `linear-gradient(135deg, ${theme.headerBg}, ${theme.headerBgSecondary || "#4c1d95"})`, opacity: 0.95 }} />
                <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 w-full">
                  <div className="relative flex-shrink-0">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] overflow-hidden border-4 border-white/20 shadow-2xl">
                      <img src={user.profileImage || "https://images.unsplash.com/photo-1519085185758-2ad3ed098fb4"} alt={user.firstName} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-4 rounded-3xl shadow-2xl border-4 border-white/10 flex items-center gap-2">
                       <FaCheckCircle className="text-xl" />
                       <span className="font-black text-xs uppercase tracking-tighter">{atsScore?.score || 85}%</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-6">
                    <div className="space-y-2">
                      <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/80 text-[10px] font-black uppercase tracking-widest leading-none">
                        Certified {user.industry || "Professional"}
                      </span>
                      <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                         {user.firstName} {user.lastName}
                      </h1>
                      <p className="text-xl md:text-2xl font-medium text-white/70 max-w-xl">
                        {user.headline}
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                       <button onClick={() => toast.success("PDF Generation...")} className="px-8 py-4 bg-white text-midnight rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Resume</button>
                       <button onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })} className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">Portfolio</button>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* DASHBOARD */}
            <section className="space-y-6">
               <h2 className="text-xl font-black uppercase tracking-widest px-2 opacity-60">Strategic Analytics</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-8 space-y-6 bg-gradient-to-br from-action/10 to-transparent">
                     <div className="flex justify-between items-center text-action">
                        <span className="text-[10px] font-black uppercase tracking-widest">Market Visibility</span>
                        <FaRocket />
                     </div>
                     <div className="flex items-end gap-2">
                        <span className="text-6xl font-black">{atsScore?.score || 85}</span>
                        <span className="text-sm font-bold opacity-40 pb-2">/ 100</span>
                     </div>
                     <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-action" style={{ width: `${atsScore?.score || 85}%` }} />
                     </div>
                  </Card>
                  <Card className="p-8 space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Strengths</h3>
                     <div className="space-y-3">
                        {atsScore?.feedback?.positives?.slice(0, 3).map((v, i) => (
                           <div key={i} className="flex items-center gap-3 text-sm font-bold opacity-80">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {v}
                           </div>
                        ))}
                     </div>
                  </Card>
               </div>
            </section>

            {/* EXPERIENCE */}
            <section className="space-y-8">
               <h2 className="text-xl font-black uppercase tracking-widest px-2 opacity-60">{sectionNames.experience}</h2>
               <div className="space-y-8 relative before:absolute before:left-[-1px] md:before:left-[31px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 ml-4 md:ml-0">
                  {(user.experience || []).map((exp, idx) => (
                     <div key={idx} className="relative pl-12 md:pl-24 group">
                        <div className="absolute left-[-21px] md:left-[12px] top-6 w-10 h-10 rounded-2xl bg-[#0f172a] border-2 border-[var(--card-border)] z-10 flex items-center justify-center group-hover:border-action transition-colors shadow-2xl">
                           <FaBriefcase className="text-xs group-hover:text-action transition-colors" />
                        </div>
                        <Card className="hover:border-action/30 transition-all p-8 md:p-10 space-y-6">
                           <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div className="space-y-1">
                                 <h3 className="text-2xl font-black">{exp.role}</h3>
                                 <div className="flex items-center gap-3 text-action font-bold">
                                    <span>{exp.company}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                    <span className="text-xs uppercase tracking-widest opacity-60">{exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}</span>
                                 </div>
                              </div>
                           </div>
                           <p className="text-slate-400 font-medium leading-relaxed whitespace-pre-wrap">{exp.achievements}</p>
                        </Card>
                     </div>
                  ))}
               </div>
            </section>

            {/* PORTFOLIO */}
            <section className="space-y-6">
               <h2 className="text-xl font-black uppercase tracking-widest px-2 opacity-60">{sectionNames.projects}</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {portfolio.map((proj, idx) => (
                     <Card key={idx} className="p-0 overflow-hidden border-none group hover:shadow-2xl transition-all">
                        <div className="aspect-video relative bg-slate-800 overflow-hidden">
                           {proj.thumbnail && <img src={proj.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 transition-all backdrop-blur-sm">
                              {proj.liveLink && <a href={ensureAbsoluteUrl(proj.liveLink)} target="_blank" className="p-4 bg-action text-white rounded-2xl"><FaGlobe /></a>}
                           </div>
                        </div>
                        <div className="p-8 space-y-4">
                           <h3 className="text-xl font-black">{proj.title}</h3>
                           <p className="text-sm text-slate-400 font-medium leading-relaxed">{proj.description}</p>
                        </div>
                     </Card>
                  ))}
               </div>
            </section>

            {/* SKILLS */}
            <section className="space-y-6">
               <h2 className="text-xl font-black uppercase tracking-widest px-2 opacity-60">{sectionNames.skills}</h2>
               <Card className="p-10 md:p-14 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                     <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Technical Architecture</h4>
                        <div className="space-y-6">
                           {(user.skills || []).filter(s => s.type === "Technical").map((s, i) => (
                              <div key={i} className="space-y-2">
                                 <div className="flex justify-between text-[10px] font-black uppercase opacity-60"><span>{s.name}</span><span>{s.percentage || 80}%</span></div>
                                 <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-action" style={{ width: `${s.percentage || 80}%` }} /></div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Strategic Domains</h4>
                        <div className="flex flex-wrap gap-2.5">
                           {(user.skills || []).filter(s => s.type !== "Technical").map((s, i) => (
                              <span key={i} className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-action/40 transition-all">{s.name}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               </Card>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1 space-y-8 sticky top-12 self-start">
            
            {/* INTERACTION WIDGET */}
            <Card className="p-10 text-center space-y-8 bg-action/5 border-action/20">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-action">Interaction Hub</h3>
               <div className="flex justify-between px-4">
                  <div><p className="text-4xl font-black">{analytics.views || 0}</p><p className="text-[8px] font-black opacity-40 uppercase tracking-widest">Views</p></div>
                  <div><p className="text-4xl font-black">{analytics.contactClicks || 0}</p><p className="text-[8px] font-black opacity-40 uppercase tracking-widest">Interests</p></div>
               </div>
            </Card>

            {/* SIDEBAR SECTIONS [WRAPPED IN CARDS FOR V3.4.2] */}
            <Card className="p-8 space-y-8">
               <div className="space-y-8">
                  <div>
                     <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-6">{sectionNames.education}</h3>
                     <div className="space-y-6">
                        {(user.education || []).map((edu, i) => (
                           <div key={i} className="flex gap-4 group">
                              <div className="w-10 h-10 rounded-2xl bg-action/10 flex items-center justify-center text-action border border-action/5"><FaGraduationCap /></div>
                              <div className="space-y-1"><p className="text-sm font-black leading-none">{edu.degree}</p><p className="text-[10px] font-bold opacity-40">{edu.institution}</p></div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="pt-8 border-t border-white/5">
                     <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-6">Expert Services</h3>
                     <div className="space-y-6">
                        {(user.services || []).map((srv, i) => (
                           <div key={i} className="flex gap-4">
                              <div className="w-10 h-10 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-500 border border-violet-500/5"><FaGem /></div>
                              <div className="space-y-1"><p className="text-sm font-black leading-none">{srv.title}</p><p className="text-[10px] font-bold opacity-40 truncate">{srv.description}</p></div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="pt-8 border-t border-white/5">
                     <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-6">Certifications</h3>
                     <div className="space-y-6">
                        {(user.certifications || []).slice(0, 3).map((cert, i) => (
                           <div key={i} className="flex items-center gap-3 text-xs font-black opacity-80"><FaCheckCircle className="text-emerald-500" /> {cert.name}</div>
                        ))}
                     </div>
                  </div>
                  <div className="pt-8 border-t border-white/5">
                     <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-6">Linguistic Hub</h3>
                     <div className="flex flex-wrap gap-2">
                        {(user.languages || []).map((lang, i) => (
                           <span key={i} className="px-3 py-1.5 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-tighter opacity-60 border border-white/5">{lang.name} — {lang.level}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </Card>

            {/* CALL TO ACTION */}
            <Card className="p-8 bg-blue-600 text-white text-center space-y-6 border-none">
               <h3 className="text-xl font-black leading-tight">Ready to hire {user.firstName}?</h3>
               <p className="text-xs opacity-80 font-medium">Direct contact for high-impact roles and consulting.</p>
               <a href={`mailto:${user.email}`} className="block w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest">Message Now</a>
            </Card>
          </div>
        </div>
      </div>

      <footer className="mt-24 py-20 text-center border-t border-white/5">
         <div className="space-y-4 opacity-20">
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Powered by CVify Pro Career Infra</p>
            <p className="text-[8px] font-black uppercase">V3.4.2_Stable • Unified SaaS Design</p>
         </div>
      </footer>
    </div>
  );
};

export default PublicProfile;
