import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../features/dashboard/dashboardThunk";
import { selectDashboardData, selectDashboardLoading, selectIsRefreshing } from "../features/dashboard/dashboardSlice";
import { handleDownloadPDF, handleDownloadLetter } from "../utils/pdfExport";
import { FaEye, FaTrash, FaDownload, FaFileAlt, FaTimes, FaSearchPlus, FaRocket, FaChartBar, FaAngleRight, FaEnvelopeOpenText } from "react-icons/fa";
import { FiEdit2, FiTrash2, FiDownload, FiPlus, FiCopy, FiZap, FiRefreshCw, FiAlertCircle, FiArrowRight, FiActivity, FiShare2 } from "react-icons/fi";
import { lazy, Suspense } from "react";
const ThreeBackground = lazy(() => import("../components/three/ThreeBackground"));
import Swal from "sweetalert2";
import ShareResumeModal from "../components/dashboard/ShareResumeModal";

import { m, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { deleteResume, cloneResume } from "../features/resume/resumeThunk";
import { clearCurrentResume } from "../features/resume/resumeSlice";
import QuestWidget from "../components/dashboard/QuestWidget";
import { FaGem, FaFileSignature, FaShieldAlt } from "react-icons/fa";

// New Executive UI Components
import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { MetricCard } from "../components/ui/MetricCard";
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
  const [shareModalData, setShareModalData] = useState(null);

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
      customClass: { popup: "glass-medium" },
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
        popup: "glass-medium",
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
        customClass: { popup: "glass-medium" },
      });
    }
  };

  const handleEdit = (id) => navigate(`/resume-builder/editor/${id}`);

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
        customClass: { popup: "glass-medium" },
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
          popup: "glass-medium",
          confirmButton: "btn-primary",
          cancelButton: "btn-secondary",
        },
      });

      if (confirm.isConfirmed) handleClone(id, null, true);
    }
  };

  const handleCreateNew = () => {
    dispatch(clearCurrentResume());
    navigate("/resume-builder/create");
  };

  const handleScan = (id) => navigate("/ats", { state: { preSelectedResumeId: id } });
  const handleImprove = (id) => navigate("/ats", { state: { preSelectedResumeId: id, autoImprove: true } });

  if (loading && !resumes) {
    return (
      <div className="min-h-screen p-6 lg:p-12 space-y-12">
        <SkeletonLoader className="h-[400px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkeletonLoader className="h-48" count={3} />
        </div>
      </div>
    );
  }

  // Derived metrics
  const hiringProbability = user?.completionScore ? Math.min(Math.round(user.completionScore * 1.1), 99) : 45;
  const healthScore = user?.completionScore || 0;

  return (
    <div className="space-y-12 lg:space-y-16 pb-20 max-w-7xl mx-auto">
      {/* 1. HERO SCORE SECTION */}
      <Card variant="glass" className="relative p-10 lg:p-14 overflow-hidden glow-primary">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              Good morning, {user?.name?.split(' ')[0] || "User"}.
            </h1>
            <div className="text-xl text-text-secondary font-medium flex gap-2 items-center">
              You are <span className="text-primary font-bold">{hiringProbability}%</span> job-ready.
            </div>
            
            <div className="mt-8 mb-8 text-text-muted text-sm flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow-primary" />
              <TypeAnimation
                sequence={[
                  "AI Workspace Active", 3000,
                  "Intelligence Synchronized", 3000,
                  "System Status: Elite", 3000
                ]}
                repeat={Infinity}
                wrapper="span"
              />
            </div>

            <Button variant="glow" onClick={handleCreateNew} icon={FiPlus}>
              Create New Resume
            </Button>
          </div>

          <div className="flex justify-end items-center">
            {/* Massive Score Ring for Hiring Probability */}
            <div className="relative w-48 h-48 lg:w-56 lg:h-56">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" className="stroke-card-border fill-none" strokeWidth="6" />
                <m.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="var(--primary)" strokeWidth="8" strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 1000" }}
                  animate={{ strokeDasharray: `${hiringProbability * 2.6389}, 1000` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="filter drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl lg:text-6xl font-bold text-text-primary tracking-tighter">
                  {hiringProbability}<span className="text-2xl text-text-muted">%</span>
                </span>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mt-2">
                  Probability
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Career Health" value={`${healthScore}/100`} trend={5} subtext="from last week" icon={FiActivity} />
        <MetricCard title="Active Resumes" value={resumes?.length || 0} icon={FaFileSignature} />
        <MetricCard title="ATS Scans" value={stats?.totalScans || 0} icon={FaSearchPlus} />
        <MetricCard title="Cover Letters" value={coverLetters?.length || 0} icon={FaEnvelopeOpenText} />
      </div>

      {/* 3. NEXT BEST ACTIONS & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-text-primary tracking-tight">Active Resumes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumes?.map((resume) => (
              <Card key={resume.id} variant="elevated" className="!p-6 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary truncate mb-1">{resume.title}</h3>
                    <p className="text-xs text-text-muted uppercase tracking-wider">{resume.status}</p>
                  </div>
                  {resume.atsScore ? (
                    <Badge variant={resume.atsScore > 75 ? "score" : "warning"}>
                      ATS {resume.atsScore}
                    </Badge>
                  ) : null}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" className="flex-1 !bg-primary/5 hover:!bg-primary/10 !text-primary !h-10 text-xs" onClick={() => handleEdit(resume.id)} icon={FiEdit2}>
                    Edit
                  </Button>
                  <Button variant="ghost" className="flex-1 !bg-white/5 hover:!bg-white/10 !h-10 text-xs" onClick={() => handleScan(resume.id)} icon={FaSearchPlus}>
                    Scan
                  </Button>
                  <Button variant="ghost" className="flex-1 !bg-white/5 hover:!bg-white/10 !h-10 text-xs" onClick={() => setShareModalData(resume)} icon={FiShare2}>
                    Share
                  </Button>
                </div>
              </Card>
            ))}
            {(!resumes || resumes.length === 0) && (
              <div className="col-span-2 text-center p-12 border border-dashed border-border-subtle rounded-3xl text-text-muted">
                No active resumes found. Create your first one to get started.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary tracking-tight">Next Best Actions</h2>
          <Card variant="default" className="!p-6 space-y-4 bg-bg-secondary/50">
            <div className="p-4 rounded-xl bg-midground border border-border-subtle flex gap-4 items-start hover:border-primary/30 transition-colors cursor-pointer" onClick={() => navigate('/interview')}>
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5"><FiZap size={14} /></div>
              <div>
                <p className="text-sm font-semibold text-text-primary mb-1">Practice Interview</p>
                <p className="text-xs text-text-muted">Your interview readiness is holding back your hiring probability.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-midground border border-border-subtle flex gap-4 items-start hover:border-primary/30 transition-colors cursor-pointer" onClick={() => navigate('/ats')}>
              <div className="w-8 h-8 rounded-full bg-warning/10 text-warning flex items-center justify-center shrink-0 mt-0.5"><FaSearchPlus size={14} /></div>
              <div>
                <p className="text-sm font-semibold text-text-primary mb-1">Improve ATS Score</p>
                <p className="text-xs text-text-muted">Your latest resume scored 72%. Let's push it past 85%.</p>
              </div>
            </div>
          </Card>

          <QuestWidget quests={dashboard.quests} />
        </div>
      </div>

      {isRefreshing && (
        <div className="fixed bottom-12 right-12 z-[100] glass-strong px-6 py-3 rounded-full border-primary/30 flex items-center gap-3 shadow-glow-primary">
          <FiRefreshCw className="animate-spin text-primary" size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Syncing</span>
        </div>
      )}

      <ShareResumeModal
        isOpen={!!shareModalData}
        onClose={() => setShareModalData(null)}
        resume={shareModalData}
        onUpdate={(updatedResume) => {
          // Update local modal state immediately (optimistic, no flicker)
          setShareModalData(updatedResume);
          // Re-fetch dashboard so the card's share state stays in sync with Redux store
          dispatch(fetchDashboardData());
        }}
      />
    </div>
  );
};

export default Dashboard;
