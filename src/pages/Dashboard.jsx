import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  fetchDashboardData,
} from "../features/dashboard/dashboardThunk";
import { 
  selectDashboardData, 
  selectDashboardLoading, 
  selectIsRefreshing 
} from "../features/dashboard/dashboardSlice";
import { handleDownloadPDF, handleDownloadLetter } from "../utils/pdfExport";
import { FaEye, FaTrash, FaDownload, FaFileAlt, FaTimes, FaSearchPlus } from "react-icons/fa";
import { FiEdit2, FiTrash2, FiDownload, FiEye, FiPlus, FiCopy, FiZap, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { lazy, Suspense } from "react";
const ThreeBackground = lazy(() => import("../components/three/ThreeBackground"));
import Swal from "sweetalert2";

import { TypeAnimation } from "react-type-animation";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { m } from "framer-motion";
import { formatAuthError } from "../utils/formatAuthError";
import { 
  deleteResume, 
  cloneResume 
} from "../features/resume/resumeThunk";
import { clearCurrentResume } from "../features/resume/resumeSlice";

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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
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
      dispatch(fetchDashboardData()); // Refresh dashboard after delete
      Swal.fire({
        title: "Deleted!",
        text: "Your resume has been deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--midground)",
        color: "var(--text-main)",
        customClass: {
          popup: "glass",
        },
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleClone = async (id, e, useDiamonds = false) => {
    if (e) e.stopPropagation();
    const result = await dispatch(cloneResume({ id, useDiamonds }));
    if (result.type.includes("fulfilled")) {
      dispatch(fetchDashboardData()); // Refresh dashboard after clone
      Swal.fire({
        title: "Cloned!",
        text: "Resume has been duplicated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--midground)",
        color: "var(--text-main)",
        customClass: {
          popup: "glass",
        },
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

      if (confirm.isConfirmed) {
        handleClone(id, null, true);
      }
    }
  };

  const handleCreateNew = () => {
    dispatch(clearCurrentResume());
    navigate("/create");
  };

  const handleScan = (id) => {
    navigate("/ats", { state: { preSelectedResumeId: id } });
  };

  const handleImprove = (id) => {
    navigate("/ats", { state: { preSelectedResumeId: id, autoImprove: true } });
  };

  const renderAtsBadge = (score) => {
    if (!score && score !== 0) return null;
    
    let colorClass = "bg-red-500/10 text-red-500 border-red-500/20";
    let icon = "⚠️";
    
    if (score >= 80) {
      colorClass = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      icon = "🔥";
    } else if (score >= 60) {
      colorClass = "bg-amber-500/10 text-amber-500 border-amber-500/20";
      icon = "⚡";
    }

    return (
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${colorClass} font-black text-[10px] animate-pulse shadow-sm`}>
        <span>{icon}</span>
        <span className="tracking-tighter">ATS: {score}%</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative bg-background p-6 md:p-12 transition-colors duration-500 overflow-y-auto custom-scrollbar">
      <Suspense fallback={<div className="fixed inset-0 bg-background" />}>
        <ThreeBackground />
      </Suspense>
      <m.div 
        layout
        className="max-w-7xl mx-auto relative z-10 animate-fadeIn"
      >

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-16 gap-8 animate-fadeIn">
          <div className="w-full md:w-auto">
            <h1 className="text-4xl lg:text-5xl text-gradient font-black tracking-tighter flex flex-wrap items-center gap-4">
              Welcome Back, {user?.name?.split(" ")[0]}
              <span className={`bg-gradient-to-r ${economy?.tier === "Elite" ? "from-amber-400 to-orange-600" : "from-emerald-500 to-teal-600"} text-white font-bold text-[10px] px-3 py-1.5 rounded-full italic tracking-tight shadow-sm shadow-emerald-500/20`}>
                {economy?.tier || "BASIC"} MEMBER
              </span>
            </h1>

            <p className="text-text-muted mt-4 font-bold text-lg max-w-lg leading-relaxed">
              <TypeAnimation
                sequence={[
                  "Elevate your career with precision-crafted, high-impact resumes.",
                  3000,
                  "Build professional resumes that get you noticed.",
                  3000,
                  "Transform your career story into compelling narratives.",
                  3000,
                ]}
                wrapper="span"
                speed={60}
                repeat={Infinity}
              />
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={handleCreateNew}
              className="btn-primary flex items-center gap-3 px-10 py-4 text-lg"
              aria-label="Create New Resume"
            >
              <FiPlus className="text-2xl" />
              <span>Create New CV</span>
            </button>

          </div>
        </div>

        {meta?.partial && (
          <div className="mb-12 p-4 glass border-l-4 border-amber-500 rounded-2xl flex justify-between items-center shadow-lg animate-fadeIn">
            <div className="flex items-center gap-3">
              <FiAlertCircle className="text-amber-500 text-xl" />
              <div>
                <p className="font-bold text-text-primary text-sm">
                  Partial Sync: {meta.missing?.join(", ")} logic unavailable.
                </p>
              </div>
            </div>
          </div>
        )}

        {isRefreshing && (
          <div className="fixed bottom-8 right-8 z-[100] glass px-6 py-3 rounded-full border border-primary/20 flex items-center gap-3 shadow-2xl animate-bounce">
            <FiRefreshCw className="animate-spin text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Syncing...</span>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-h-[450px] aspect-[4/5] glass rounded-[3rem] relative overflow-hidden flex flex-col p-8"
              >
                {/* Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>
                
                {/* Visual Placeholder */}
                <div className="w-full aspect-[16/7] bg-white/5 rounded-2xl mb-8 animate-pulse" />
                
                {/* Text Placeholders */}
                <div className="w-2/3 h-8 bg-white/10 rounded-xl mb-4 animate-pulse" />
                <div className="w-1/3 h-4 bg-white/5 rounded-lg mb-8 animate-pulse" />
                
                <div className="flex gap-4 mb-8">
                  <div className="w-10 h-10 bg-white/5 rounded-2xl animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="w-1/2 h-3 bg-white/5 rounded-md animate-pulse" />
                    <div className="w-1/3 h-3 bg-white/5 rounded-md animate-pulse" />
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 mb-4">
                  <div className="w-full h-12 bg-white/5 rounded-xl animate-pulse" />
                  <div className="w-full h-12 bg-white/5 rounded-xl animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : resumes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="premium-card group min-h-[450px] aspect-[4/5] flex flex-col p-8"
              >
                {/* Visual Header */}
                <div className="relative mb-8 aspect-[16/7] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 bg-mesh opacity-30"></div>
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 rounded-lg border border-white/20 shadow-sm">
                      <p className="text-[9px] font-black uppercase tracking-widest text-primary">
                        Modern
                      </p>
                    </div>
                    {renderAtsBadge(resume.atsScore)}
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-[9px] px-2.5 py-1 rounded-full italic tracking-tight shadow-lg shadow-emerald-500/20">
                      Pro
                    </span>
                    <div className="bg-primary/20 px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-primary/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[9px] font-black text-primary uppercase tracking-tighter">
                        {resume.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-text-main leading-tight mb-2 truncate max-w-[220px]">
                        {resume.title}
                      </h3>
                      <p className="text-xs font-black text-primary uppercase tracking-[0.15em] opacity-80 mb-4 ml-0.5">
                        Resume Builder
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-text-secondary font-bold mb-8">
                    <div className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <FiEdit2 size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest opacity-50">
                        Last Modified
                      </span>
                      <span>
                        {new Date(resume.lastUpdated).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric" },
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => handleScan(resume.id)}
                      className="btn-glass flex items-center justify-center gap-2 py-3 !border-primary/20 hover:!bg-primary/10 group/scan"
                      aria-label="Scan Resume with ATS"
                    >
                      <FaSearchPlus className="text-primary group-hover/scan:scale-110 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Scan Now</span>
                    </button>
                    <button
                      onClick={() => handleImprove(resume.id)}
                      className="btn-glass flex items-center justify-center gap-2 py-3 !border-amber-500/20 hover:!bg-amber-500/10 group/improve"
                      aria-label="Improve Resume with AI"
                    >
                      <FiZap className="text-amber-500 group-hover/improve:animate-bounce" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Improve</span>
                    </button>

                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleEdit(resume.id)}
                      className="btn-primary px-4 bg-primary/10 !text-text-main border border-primary/20 hover:!bg-primary hover:!text-white flex items-center justify-center group/btn"
                      aria-label="Edit Resume"
                    >
                      <FiEdit2 className="group-hover/btn:rotate-12 transition-transform" />
                      <span className="ml-2 text-xs font-black uppercase tracking-wider">Edit</span>
                    </button>
                    <button
                      onClick={() =>
                        handleDownloadPDF(resume, "Modern")
                      }
                      className="btn-primary !px-0 !bg-success/10 !text-success border border-success/20 hover:!bg-success hover:!text-white flex items-center justify-center group/btn"
                      aria-label="Download PDF"
                    >
                      <FiDownload className="group-hover/btn:translate-y-1 transition-transform" />
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleClone(resume.id, e)}
                        className="flex-1 bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                        title="Duplicate"
                        aria-label="Clone Resume"
                      >
                        <FiCopy />
                      </button>
                      <button
                        onClick={(e) => handleDelete(resume.id, e)}
                        className="flex-1 bg-red-500/10 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                        title="Delete"
                        aria-label="Delete Resume"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="premium-card p-24 text-center max-w-4xl mx-auto border-2 border-dashed border-primary/20 bg-primary/5">
            <div className="w-32 h-32 bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-glow ring-4 ring-primary/5 group transition-all duration-500 hover:scale-110 hover:rotate-12">
              <FiPlus className="text-6xl" />
            </div>
            <h2 className="text-4xl font-black text-text-primary mb-6 tracking-tight">
              Create Your Career Masterpiece
            </h2>
            <p className="text-text-secondary mb-12 max-w-md mx-auto font-bold text-xl leading-relaxed opacity-70">
              Your dream job is waiting. Unleash your potential with CVify’s
              premium templates.
            </p>
            <button
              onClick={handleCreateNew}
              className="btn-primary px-16 py-5 text-xl font-black rounded-2xl"
            >
              Start Building Now
            </button>
          </div>
        )}

        {/* Cover Letters Section */}
        <div className="mt-24 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-black text-text-primary tracking-tight flex items-center gap-4">
              My Cover Letters
              <span className="text-xs font-black text-secondary bg-secondary/10 px-4 py-2 rounded-2xl border border-secondary/20 shadow-sm">
                {stats?.hasCoverLetters ? "LETTERS STORED" : "0 Letters"}
              </span>
            </h2>
          </div>

          {!stats?.hasCoverLetters ? (
            <div className="glass p-12 text-center rounded-[2.5rem] border-2 border-dashed border-white/5 opacity-50">
              <p className="font-bold text-text-muted text-lg italic">
                You haven't generated any cover letters yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coverLetters?.map((letter) => (
                <div 
                  key={letter.id} 
                  className="premium-card p-8 flex flex-col group hover:border-primary/40 transition-all border-l-4 border-l-secondary"
                  onClick={() => {
                    setSelectedLetter(letter);
                    setIsPreviewOpen(true);
                  }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <FaFileAlt className="text-xl" />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      letter.type === "ai" ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-500"
                    }`}>
                      {letter.type === "ai" ? "AI Generated" : "Template"}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-black text-text-primary text-lg line-clamp-1 mb-1">{letter.jobTitle}</h3>
                    <p className="text-xs font-bold text-text-muted">{letter.companyName}</p>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 mb-6">
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Linked Resume</p>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="text-[11px] font-black">{letter.resumeName}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-text-muted">
                      {new Date(letter.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <button 
                      onClick={(e) => handleDeleteLetter(letter.id, e)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </m.div>

      {/* Preview Modal */}
      {isPreviewOpen && selectedLetter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-midground w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col scale-in">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="font-black text-2xl text-text-primary uppercase tracking-tight">
                  {selectedLetter.jobTitle}
                </h3>
                <p className="text-sm text-secondary font-black">
                  {selectedLetter.companyName || "Professional Application"}
                </p>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all text-text-muted"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-10 overflow-y-auto font-medium text-base text-text-muted leading-relaxed whitespace-pre-wrap select-text scrollbar-thin">
              {selectedLetter.content}
            </div>
            <div className="p-8 border-t border-white/5 bg-white/5 flex gap-4">
              <button
                onClick={() => handleDownloadLetter(selectedLetter, user)}
                className="flex-1 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <FaDownload /> Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
