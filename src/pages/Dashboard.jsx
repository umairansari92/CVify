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
import { FiEdit2, FiTrash2, FiDownload, FiPlus, FiCopy, FiZap, FiRefreshCw, FiAlertCircle, FiArrowRight, FiActivity } from "react-icons/fi";
import { lazy, Suspense } from "react";
const ThreeBackground = lazy(() => import("../components/three/ThreeBackground"));
import Swal from "sweetalert2";

import { m, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { 
  deleteResume, 
  cloneResume 
} from "../features/resume/resumeThunk";
import { clearCurrentResume } from "../features/resume/resumeSlice";
import QuestWidget from "../components/dashboard/QuestWidget";
import { FaGem, FaFileSignature, FaShieldAlt } from "react-icons/fa";

// Premium UI Components
import PremiumButton from "../components/ui/PremiumButton";
import GlassContainer from "../components/ui/GlassContainer";
import SectionHeader from "../components/ui/SectionHeader";
import SkeletonLoader from "../components/ui/SkeletonLoader";

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

  const handleEdit = (id) => navigate(`/builder/${id}`);

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
    navigate("/builder");
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

  if (loading && !resumes) {
    return (
      <div className="min-h-screen p-6 lg:p-12 space-y-12">
        <SkeletonLoader className="h-[400px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkeletonLoader className="h-48" count={3} />
        </div>
        <SkeletonLoader className="h-[500px]" />
      </div>
    );
  }

  return (
    <div className="space-y-12 lg:space-y-20 pb-20">
      {/* Elite Hero HUD Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <GlassContainer intensity="strong" className="lg:col-span-3 p-10 lg:p-14 relative overflow-hidden group border-[var(--card-border)]">
          {/* HUD Mesh Layer */}
          <div className="absolute inset-0 bg-mesh-pro opacity-40 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[140px] rounded-full group-hover:bg-primary/20 transition-colors duration-1000" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 glass-soft rounded-full border-primary/20">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                    {economy?.tier || "PROFESSIONAL"} ACCOUNT STATUS
                  </span>
                </div>
                
                {stats?.readyToClaimCount > 0 && (
                  <m.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-4 py-2 glass-soft border-primary/30 text-primary text-[10px] font-black rounded-full shadow-glow-primary flex items-center gap-3"
                  >
                    <FiActivity className="animate-pulse" />
                    ACCOUNT ACTIVE
                  </m.div>
                )}
              </div>

              <div className="max-w-xl">
                <h1 className="text-5xl lg:text-7xl font-black hero-text leading-[1.1] mb-6 tracking-tighter">
                  Welcome Back,<br />
                  <span className="text-primary glow-text">{user?.name}</span>
                </h1>
                <div className="text-text-secondary font-black text-sm tracking-widest uppercase opacity-60 flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-primary/40" />
                  <TypeAnimation
                    sequence={[
                      "Crafting your professional presence...", 3000,
                      "Optimizing resume intelligence...", 3000,
                      "Refining career presentation...", 3000
                    ]}
                    repeat={Infinity}
                  />
                </div>
              </div>

              <div className="pt-6 flex flex-wrap gap-6 items-center">
                <PremiumButton 
                  onClick={handleCreateNew}
                  icon={FiPlus}
                  className="scale-110 !px-10 shadow-glow-primary"
                >
                  Build New Resume
                </PremiumButton>
              </div>
            </div>

            {/* Circular Profile Integrity Section */}
            <div className="flex flex-col items-center justify-center p-8 glass-medium rounded-3xl border-[var(--card-border)] relative group/integrity">
              <div className="absolute inset-0 bg-primary/5 blur-[60px] rounded-full opacity-0 group-hover/integrity:opacity-100 transition-opacity duration-1000" />
              <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    className="stroke-card-border fill-none"
                    strokeWidth="8"
                  />
                  <m.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0, 1000" }}
                    animate={{ strokeDasharray: `${(user?.completionScore || 0) * 2.6389}, 1000` }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="shadow-glow-primary filter drop-shadow-[0_0_8px_var(--primary)]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl lg:text-5xl font-black text-text-primary tracking-tighter italic">
                    {user?.completionScore || 0}%
                  </span>
                  <span className="text-[9px] font-black text-text-secondary uppercase tracking-[0.4em] opacity-50 mt-1">
                    Completion
                  </span>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="px-5 py-2 glass-soft border-primary/20 rounded-full">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                    Profile Strength Score
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GlassContainer>

        <div className="lg:col-span-1">
          <QuestWidget quests={dashboard.quests} />
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassContainer className="p-10 relative overflow-hidden group hover:glow-primary transition-all duration-700">
           <div className="absolute -top-6 -right-6 p-8 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 rotate-12 group-hover:rotate-0">
              <FaRocket size={100} />
           </div>
           <SectionHeader 
             title={`${user?.completionScore || 0}%`} 
             subtitle="Profile Completion Strength" 
             badge="LIVE DATA"
             className="mb-0"
           />
           <div className="mt-8 flex items-center justify-between">
              <div className="flex-1 h-2 bg-[var(--card-border)] rounded-full overflow-hidden">
                <m.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${user?.completionScore || 0}%` }}
                  className="h-full bg-gradient-to-r from-primary to-accent" 
                />
              </div>
           </div>
        </GlassContainer>

        <GlassContainer className="p-10 relative overflow-hidden group hover:glow-accent transition-all duration-700">
           <div className="absolute -top-6 -right-6 p-8 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 -rotate-12 group-hover:rotate-0">
              <FaSearchPlus size={100} />
           </div>
           <SectionHeader 
             title={stats?.totalScans || 0} 
             subtitle="Intelligence Scans Conducted" 
             badge="ENGINE DATA"
             className="mb-0"
           />
           <div className="mt-8 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i < (stats?.totalScans || 0) % 5 ? "bg-accent" : "bg-[var(--card-border)]"}`} />
              ))}
           </div>
        </GlassContainer>

        <GlassContainer className="p-10 relative overflow-hidden group hover:shadow-glow-success transition-all duration-700 border-[var(--card-border)]">
           <div className="absolute -top-6 -right-6 p-8 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 rotate-45 group-hover:rotate-0">
              <FaShieldAlt size={100} />
           </div>
           <SectionHeader 
             title="Verified" 
             subtitle="Data Protection Active" 
             badge="SECURITY"
             className="mb-0"
           />
           <div className="mt-8 text-[10px] font-black text-success uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-glow-success" />
              Verified & Secure Environment
           </div>
        </GlassContainer>
      </div>

      {/* Career Components Matrix */}
      <div className="space-y-10">
        <SectionHeader 
          title="Professional Resumes" 
          subtitle="Refined resume variations managed by the AI Engine."
          badge={`${resumes?.length || 0} ACTIVE`}
          icon={FaFileSignature}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {resumes?.map((resume) => (
            <GlassContainer key={resume.id} intensity="medium" className="group p-0 min-h-[550px] h-auto hover:glow-primary transition-all duration-700 flex flex-col border-[var(--card-border)] relative">
              {/* Revision Banner HUD */}
              <div className="h-44 relative group-hover:scale-[1.05] transition-transform duration-1000 shrink-0">
                <div className="absolute inset-0 bg-mesh opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
                <div className="absolute bottom-16 left-10 flex flex-col gap-3">
                  <div className="flex gap-2">
                    {renderAtsBadge(resume.atsScore)}
                    <span className="bg-primary/20 text-text-primary text-[9px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest border border-[var(--card-border)] backdrop-blur-md">
                      {resume.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-10 flex-1 flex flex-col -mt-10 relative z-10">
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-text-primary mb-2 truncate group-hover:text-primary transition-colors">{resume.title}</h3>
                  <p className="text-[11px] font-black text-primary/60 uppercase tracking-[0.3em]">Premium Resume Template</p>
                </div>

                <div className="flex-1 space-y-8">
                   <div className="flex items-center gap-5 p-5 glass-soft rounded-2xl border-[var(--card-border)] group/revision">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover/revision:rotate-12 transition-transform">
                        <FiEdit2 size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-text-secondary uppercase tracking-[0.3em] mb-1 opacity-50">Last Modification</span>
                        <span className="text-sm font-black text-text-primary">
                          {new Date(resume.lastUpdated).toLocaleDateString(undefined, { month: "long", day: "numeric" })}
                        </span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => handleScan(resume.id)} className="flex items-center justify-center gap-3 p-4 glass-soft rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all border-[var(--card-border)]">
                        <FaSearchPlus size={14} /> Analysis
                      </button>
                      <button onClick={() => handleImprove(resume.id)} className="flex items-center justify-center gap-3 p-4 glass-soft rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/10 hover:text-amber-500 transition-all border-[var(--card-border)]">
                        <FiZap size={14} /> Optimize
                      </button>
                   </div>
                </div>

                <div className="flex items-center gap-3 pt-8">
                  <PremiumButton onClick={() => handleEdit(resume.id)} className="flex-1 !py-4 !text-[10px] shadow-sm" icon={FiEdit2}>
                    Open Builder
                  </PremiumButton>
                  <button onClick={() => handleDownloadPDF(resume, "Modern")} className="w-14 h-14 glass-soft rounded-2xl border-[var(--card-border)] flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all">
                    <FiDownload size={20} />
                  </button>
                </div>
              </div>
            </GlassContainer>
          ))}

          {resumes?.length < 3 && (
            <GlassContainer intensity="soft" onClick={handleCreateNew} className="border-2 border-dashed border-[var(--card-border)] flex flex-col items-center justify-center p-12 bg-primary/[0.02] cursor-pointer hover:border-primary/40 group transition-all min-h-[550px]">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:glow-primary transition-all duration-500 mb-6">
                <FiPlus size={36} />
              </div>
              <p className="font-black text-xs uppercase tracking-[0.4em] text-text-secondary group-hover:text-primary transition-colors text-center leading-relaxed">
                Create New<br/><span className="text-[10px] opacity-50">Professional Resume</span>
              </p>
            </GlassContainer>
          )}
        </div>
      </div>

      {/* Synthesis Archive */}
      <div className="space-y-10">
        <SectionHeader 
          title="Cover Letter Collection" 
          subtitle="Artifacts generated through AI optimization."
          badge={`${coverLetters?.length || 0} GENERATED`}
          icon={FaEnvelopeOpenText}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coverLetters?.map((letter) => (
            <GlassContainer key={letter.id} onClick={() => { setSelectedLetter(letter); setIsPreviewOpen(true); }} className="group p-10 cursor-pointer hover:border-accent/40 transition-all flex flex-col relative overflow-hidden border-[var(--card-border)]">
              <div className="absolute -top-10 -right-10 p-10 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-700">
                 <FaEnvelopeOpenText size={120} />
              </div>
               
              <div className="flex justify-between items-start mb-10">
                 <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent glow-accent">
                    <FaEnvelopeOpenText size={20} />
                 </div>
                 <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_var(--accent)]" />
              </div>

              <div className="flex-1">
                 <h3 className="font-black text-text-primary text-2xl leading-[1.2] mb-3 line-clamp-2 group-hover:text-accent transition-colors italic tracking-tighter">
                   {letter.jobTitle}
                 </h3>
                 <p className="text-[11px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-60">
                   {letter.companyName}
                 </p>
              </div>

              <div className="mt-12 pt-6 border-t border-[var(--card-border)] flex items-center justify-between">
                 <div className="flex items-center gap-3 group/btn">
                    <span className="text-[11px] font-black text-accent tracking-[0.3em] uppercase">View Details</span>
                    <FiArrowRight className="text-accent group-hover/btn:translate-x-2 transition-transform" />
                 </div>
                 <button onClick={(e) => handleDeleteLetter(letter.id, e)} className="w-10 h-10 rounded-xl bg-red-500/5 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-10 hover:opacity-100">
                    <FiTrash2 size={16} />
                 </button>
              </div>
            </GlassContainer>
          ))}
        </div>
      </div>

      {/* Modals & Loaders */}
      <AnimatePresence>
        {isPreviewOpen && selectedLetter && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPreviewOpen(false)} className="fixed inset-0 bg-bg-secondary/90 backdrop-blur-xl transition-all" />
            <m.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="glass-strong w-full max-w-4xl max-h-[90vh] rounded-3xl border-[var(--card-border)] flex flex-col relative z-20 overflow-hidden shadow-2xl">
               <div className="p-12 border-b border-card-border flex justify-between items-start bg-[var(--glass-soft-bg)]">
                  <div>
                    <h3 className="text-[11px] font-black text-accent uppercase tracking-[0.4em] mb-4">Export Document</h3>
                    <h3 className="font-black text-4xl lg:text-5xl text-text-primary tracking-tighter leading-none">{selectedLetter.jobTitle}</h3>
                    <p className="mt-3 text-text-secondary font-bold text-lg opacity-60">{selectedLetter.companyName}</p>
                  </div>
                  <button onClick={() => setIsPreviewOpen(false)} className="w-14 h-14 glass-medium border-[var(--card-border)] rounded-2xl flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-90">
                    <FaTimes size={20} />
                  </button>
               </div>
               <div className="p-12 overflow-y-auto font-medium text-text-secondary text-lg leading-relaxed whitespace-pre-wrap select-text custom-scrollbar space-y-6">
                  {selectedLetter.content}
               </div>
               <div className="p-10 border-t border-[var(--card-border)] bg-[var(--glass-soft-bg)]">
                  <PremiumButton onClick={() => handleDownloadLetter(selectedLetter, user)} className="w-full !py-6" icon={FaDownload}>
                    Download as PDF
                  </PremiumButton>
               </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>

      {isRefreshing && (
        <div className="fixed bottom-12 right-12 z-[100] glass-strong px-10 py-5 rounded-full border-primary/30 flex items-center gap-6 shadow-glow-primary animate-float">
          <FiRefreshCw className="animate-spin text-primary" size={20} />
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Synchronizing...</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
