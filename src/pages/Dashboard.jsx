import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardData,
} from "../features/dashboard/dashboardThunk";
import { 
  selectDashboardData, 
  selectDashboardLoading, 
  selectIsRefreshing 
} from "../features/dashboard/dashboardSlice";
import { handleDownloadPDF, handleDownloadLetter } from "../utils/pdfExport";
import { FaEye, FaTrash, FaDownload, FaFileAlt, FaTimes, FaSearchPlus, FaRocket, FaChartBar, FaAngleRight, FaEnvelopeOpenText } from "react-icons/fa";
import { FiEdit2, FiTrash2, FiDownload, FiPlus, FiCopy, FiZap, FiRefreshCw, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { lazy, Suspense } from "react";
const ThreeBackground = lazy(() => import("../components/three/ThreeBackground"));
import Swal from "sweetalert2";

import { TypeAnimation } from "react-type-animation";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { m, AnimatePresence } from "framer-motion";
import { 
  deleteResume, 
  cloneResume 
} from "../features/resume/resumeThunk";
import { clearCurrentResume } from "../features/resume/resumeSlice";
import QuestWidget from "../components/dashboard/QuestWidget";
import { FaGem } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const dashboard = useSelector(selectDashboardData);
  const loading = useSelector(selectDashboardLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  
  const { user, resumes, coverLetters, economy, stats, meta } = dashboard;

  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleDeleteLetter = async (id, e) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: "Delete Cover Letter?",
      text: "Permanent action. You can't recover this letter.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/cover-letters/${id}`);
        dispatch(fetchDashboardData());
        toast.success("Deleted");
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: "Delete Resume?",
      text: "This action cannot be undone. Your resume will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete It",
      cancelButtonText: "Cancel",
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: {
        popup: "glass",
        confirmButton: "btn-primary",
        cancelButton: "btn-secondary",
      },
    });

    if (result.isConfirmed) {
      await dispatch(deleteResume(id));
      dispatch(fetchDashboardData());
      Swal.fire({
        title: "Deleted!",
        text: "Your resume has been deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--midground)",
        color: "var(--text-main)",
        customClass: { popup: "glass" },
      });
    }
  };

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleClone = async (id, e, useDiamonds = false) => {
    if (e) e.stopPropagation();
    const result = await dispatch(cloneResume({ id, useDiamonds }));
    if (result.type.includes("fulfilled")) {
      dispatch(fetchDashboardData());
      Swal.fire({
        title: "Cloned!",
        text: "Resume has been duplicated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--midground)",
        color: "var(--text-main)",
        customClass: { popup: "glass" },
      });
    } else if (result.payload?.limitReached) {
      const confirm = await Swal.fire({
        title: "Resume Limit Reached",
        text: `You already have 2 resumes. To clone this one, you can either delete an old one or use 30 diamonds.`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Use 30 Diamonds",
        cancelButtonText: "Maybe Later",
        background: "var(--midground)",
        color: "var(--text-main)",
        customClass: {
          popup: "glass",
          confirmButton: "btn-primary",
          cancelButton: "btn-secondary",
        },
      });

      if (confirm.isConfirmed) handleClone(id, null, true);
    }
  };

  const handleCreateNew = () => {
    dispatch(clearCurrentResume());
    navigate("/create");
  };

  const handleScan = (id) => navigate("/ats", { state: { preSelectedResumeId: id } });
  const handleImprove = (id) => navigate("/ats", { state: { preSelectedResumeId: id, autoImprove: true } });

  const renderAtsBadge = (score) => {
    if (!score && score !== 0) return null;
    const colorClass = score >= 80 ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                       score >= 60 ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                       "bg-red-500/10 text-red-500 border-red-500/20";
    return (
      <div className={`px-2 py-1 rounded-lg border ${colorClass} font-black text-[9px] tracking-widest uppercase`}>
        ATS: {score}%
      </div>
    );
  };

  return (
    <div className="min-h-screen relative bg-background p-4 lg:p-10 transition-colors duration-500 overflow-y-auto custom-scrollbar bg-mesh">
      <Suspense fallback={<div className="fixed inset-0 bg-background" />}>
        <ThreeBackground />
      </Suspense>

      <m.div layout className="max-w-7xl mx-auto relative z-10 space-y-10 animate-fadeIn">
        
        {/* Elite Hero HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 glass-card p-10 rounded-[3rem] relative overflow-hidden group">
            {/* Mesh HUD Background */}
            <div className="absolute inset-0 bg-mesh-dark opacity-40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.2em] italic shadow-sm flex items-center gap-2 ${
                  economy?.tier === "Elite" ? "bg-amber-500/20 text-amber-500 border border-amber-500/30" : "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                }`}>
                  {economy?.tier || "BASIC"} SYSTEM ACCESS
                </span>
                {stats?.readyToClaimCount > 0 && (
                  <div className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black rounded-full animate-pulse-soft flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    BOUNTY AVAILABLE
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-4xl lg:text-6xl hero-text leading-tight mb-2">
                  System Online,<br />
                  <span className="text-primary">{user?.name?.split(" ")[0]}</span>
                </h1>
                <div className="text-text-muted font-bold text-sm tracking-tight opacity-60">
                  <TypeAnimation
                    sequence={[
                      "Architecting your professional future.", 3000,
                      "Synthesizing elite career documents.", 3000,
                      "ATS systems: Synchronized.", 3000
                    ]}
                    repeat={Infinity}
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={handleCreateNew}
                  className="px-8 py-3.5 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-3"
                >
                  <FiPlus className="text-lg" />
                  INITIATE NEW BUILD
                </button>
                <div className="px-6 py-3.5 glass-card rounded-2xl flex items-center gap-4 group/diamonds cursor-pointer border-white/5 hover:border-primary/30 transition-all">
                  <FaGem className="text-primary animate-pulse group-hover:scale-120 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-black text-text-main tabular-nums leading-none mb-1">
                      {economy?.diamonds || 0}
                    </span>
                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest opacity-60">
                      Diamond Reserve
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 h-full">
            <QuestWidget quests={dashboard.quests} />
          </div>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FaRocket size={64} />
             </div>
             <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-4 opacity-50">Profile Integrity</p>
             <div className="flex items-end justify-between">
                <p className="text-5xl font-black hero-text">{user?.completionScore || 0}%</p>
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-soft-glow">
                   <FaChartBar />
                </div>
             </div>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FaSearchPlus size={64} />
             </div>
             <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-4 opacity-50">Intelligence Scans</p>
             <div className="flex items-end justify-between">
                <p className="text-5xl font-black hero-text">{stats?.totalScans || 0}</p>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 border border-cyan-500/20 shadow-soft-glow">
                   <FaSearchPlus />
                </div>
             </div>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FaGem size={64} />
             </div>
             <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-4 opacity-50">Total Economy</p>
             <div className="flex items-end justify-between">
                <p className="text-5xl font-black hero-text">{economy?.diamonds || 0}</p>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-soft-glow">
                   <FaGem />
                </div>
             </div>
          </div>
        </div>

        {/* System Notifications */}
        <AnimatePresence>
          {meta?.partial && (
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center gap-4">
              <FiAlertCircle className="text-amber-500 " />
              <p className="text-[11px] font-bold text-amber-500 uppercase tracking-widest">
                System Interface Restricted: {meta.missing?.join(", ")} sync pending.
              </p>
            </m.div>
          )}
        </AnimatePresence>

        {/* Resumes Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-text-main flex items-center gap-4">
              Career Components
              <span className="text-[10px] bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10 uppercase tracking-widest">
                {resumes?.length || 0} Registered
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes?.map((resume) => (
              <div key={resume.id} className="premium-card group relative overflow-hidden p-0 h-[480px]">
                {/* Elite Card Header Visual */}
                <div className="h-40 bg-mesh opacity-40 relative group-hover:scale-[1.05] transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-midground to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {renderAtsBadge(resume.atsScore)}
                    <span className="bg-primary/10 text-primary border border-primary/20 text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
                      {resume.status}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-6 -mt-10 relative z-10">
                  <div>
                    <h3 className="text-2xl font-black text-text-main mb-1 truncate">{resume.title}</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-60">Modular Builder</p>
                  </div>

                  <div className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                      <FiEdit2 size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Revision ID</span>
                      <span className="text-xs font-bold text-text-main">
                        {new Date(resume.lastUpdated).toLocaleDateString(undefined, { month: "short", day: "numeric", year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleScan(resume.id)} className="p-3 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-2 hover:bg-primary/10 hover:border-primary/30 transition-all font-black group/btn">
                       <FaSearchPlus className="text-primary group-hover/btn:scale-110" />
                       <span className="text-[9px] uppercase tracking-widest">Analysis</span>
                    </button>
                    <button onClick={() => handleImprove(resume.id)} className="p-3 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-2 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all font-black group/btn">
                       <FiZap className="text-amber-500 group-hover/btn:animate-pulse" />
                       <span className="text-[9px] uppercase tracking-widest">Neural Optimize</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button onClick={() => handleEdit(resume.id)} className="flex-1 py-3 bg-primary text-white rounded-xl font-black text-[10px] tracking-widest hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                      <FiEdit2 size={12} /> OPEN BUILDER
                    </button>
                    <button onClick={() => handleDownloadPDF(resume, "Modern")} className="w-12 h-12 glass border border-white/10 rounded-xl flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                      <FiDownload size={18} />
                    </button>
                    <button onClick={(e) => handleClone(resume.id, e)} className="w-12 h-12 glass border border-white/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all shadow-sm">
                      <FiCopy size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Bottom Danger Zone (Hidden) */}
                <button onClick={(e) => handleDelete(resume.id, e)} className="absolute bottom-2 right-2 w-8 h-8 rounded-lg text-red-500 opacity-20 hover:opacity-100 hover:bg-red-500/10 transition-all flex items-center justify-center">
                   <FiTrash2 size={14} />
                </button>
              </div>
            ))}

            {resumes?.length < 3 && (
              <div onClick={handleCreateNew} className="premium-card group border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 bg-primary/[0.02] cursor-pointer hover:border-primary transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                  <FiPlus size={32} />
                </div>
                <p className="font-black text-xs uppercase tracking-[0.3em] text-text-muted group-hover:text-primary transition-colors">Assemble New Fragment</p>
              </div>
            )}
          </div>
        </div>

        {/* Cover Letters Bento Grid */}
        <div className="space-y-8 pt-10">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-black text-text-main flex items-center gap-4">
               Synthesis Archive
               <span className="text-[10px] bg-secondary/5 text-secondary px-3 py-1 rounded-full border border-secondary/10 uppercase tracking-widest">
                 {coverLetters?.length || 0} Artifacts
               </span>
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverLetters?.map((letter) => (
              <div key={letter.id} onClick={() => { setSelectedLetter(letter); setIsPreviewOpen(true); }} className="premium-card p-8 flex flex-col group cursor-pointer hover:border-secondary/40 transition-all border-l-4 border-l-secondary relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                   <FaFileAlt size={80} />
                </div>
                
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <FaEnvelopeOpenText size={18} />
                   </div>
                   <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-text-muted">
                      {letter.type === "ai" ? "Neural Build" : "Template"}
                   </span>
                </div>

                <div className="flex-1 space-y-2">
                   <h3 className="font-black text-text-main text-lg leading-tight line-clamp-2">{letter.jobTitle}</h3>
                   <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{letter.companyName}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-2 group/btn">
                      <span className="text-[10px] font-black text-secondary tracking-widest">ANALYZE</span>
                      <FiArrowRight className="text-secondary group-hover/btn:translate-x-1 transition-transform" />
                   </div>
                   <button onClick={(e) => handleDeleteLetter(letter.id, e)} className="w-8 h-8 rounded-lg bg-red-500/5 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-20 hover:opacity-100">
                      <FaTrash size={10} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </m.div>

      {/* Preview Modal 2.0 */}
      <AnimatePresence>
        {isPreviewOpen && selectedLetter && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPreviewOpen(false)} className="fixed inset-0 bg-background/80 backdrop-blur-md" />
            <m.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-midground w-full max-w-2xl max-h-[85vh] rounded-[3rem] border border-white/10 shadow-glow-primary flex flex-col relative z-10 overflow-hidden">
               <div className="p-10 border-b border-white/5 flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-2">Artifact Preview</p>
                    <h3 className="font-black text-3xl hero-text truncate max-w-sm">{selectedLetter.jobTitle}</h3>
                  </div>
                  <button onClick={() => setIsPreviewOpen(false)} className="w-12 h-12 glass border border-white/10 rounded-2xl flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all">
                    <FaTimes />
                  </button>
               </div>
               <div className="p-10 overflow-y-auto font-medium text-text-muted leading-relaxed whitespace-pre-wrap select-text scrollbar-thin">
                  {selectedLetter.content}
               </div>
               <div className="p-8 border-t border-white/5 bg-white/[0.02] flex gap-4">
                  <button onClick={() => handleDownloadLetter(selectedLetter, user)} className="flex-1 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                    <FaDownload /> SECURE EXPORT (PDF)
                  </button>
               </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>

      {isRefreshing && (
        <div className="fixed bottom-10 right-10 z-[100] glass px-8 py-4 rounded-full border border-primary/20 flex items-center gap-4 shadow-glow-primary animate-float">
          <FiRefreshCw className="animate-spin text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">System Refreshing</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
