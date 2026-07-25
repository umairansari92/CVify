import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { m, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Swal from "sweetalert2";
import api from "../api/axios";
import { toast } from "react-hot-toast";

// Redux
import { fetchDashboardData } from "../features/dashboard/dashboardThunk";
import { selectDashboardData, selectDashboardLoading, selectIsRefreshing } from "../features/dashboard/dashboardSlice";
import { deleteResume, cloneResume } from "../features/resume/resumeThunk";
import { clearCurrentResume } from "../features/resume/resumeSlice";

// Icons
import {
  FaFileAlt, FaSearchPlus, FaEnvelopeOpenText, FaShieldAlt, FaChartLine,
  FaUser, FaTimes, FaBriefcase, FaGem, FaFileSignature, FaBell
} from "react-icons/fa";
import {
  FiEdit2, FiTrash2, FiDownload, FiPlus, FiCopy, FiZap, FiRefreshCw,
  FiArrowRight, FiActivity, FiShare2, FiChevronRight, FiAward
} from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";

// Components
import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { MetricCard } from "../components/ui/MetricCard";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import ShareResumeModal from "../components/dashboard/ShareResumeModal";
import QuestWidget from "../components/dashboard/QuestWidget";

// Registry
import { ModuleRegistry } from "../core/registry/ModuleRegistry";
import { handleDownloadPDF, handleDownloadLetter } from "../utils/pdfExport";

// Helper to resolve icon from string
const resolveIcon = (iconString, size = 22) => {
  if (!iconString) return <FaFileAlt size={size} />;
  if (iconString.startsWith("Fa")) {
    const Icon = FaIcons[iconString];
    return Icon ? <Icon size={size} /> : <FaFileAlt size={size} />;
  }
  if (iconString.startsWith("Hi")) {
    const Icon = HiIcons[iconString];
    return Icon ? <Icon size={size} /> : <FaFileAlt size={size} />;
  }
  return <FaFileAlt size={size} />;
};

// ─── Section: User Hero ──────────────────────────────────────────────────────
const UserHeroSection = ({ user, hiringProbability, healthScore, onCreateResume }) => (
  <Card variant="glass" className="relative p-8 lg:p-12 overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      {/* Left: Identity */}
      <div className="lg:col-span-2 flex items-center gap-6">
        <div className="relative shrink-0">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user?.name || "User"}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/30 shadow-glow-primary"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
              <FaUser className="text-primary" size={28} />
            </div>
          )}
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-bg-secondary rounded-full" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-1">
            Career OS — Active Session
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary tracking-tight">
            Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
          </h1>
          <div className="mt-2 text-sm text-text-secondary font-medium flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <TypeAnimation
              sequence={[
                "AI Workspace Active", 3000,
                "Intelligence Synchronized", 3000,
                "Career OS — Elite Mode", 3000,
              ]}
              repeat={Infinity}
              wrapper="span"
            />
          </div>
          <div className="mt-4 flex gap-3 flex-wrap">
            <Button variant="glow" onClick={onCreateResume} icon={FiPlus}>
              New Resume
            </Button>
            <Button variant="ghost" onClick={() => {}} icon={FaSearchPlus}>
              ATS Scan
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Career Health Ring */}
      <div className="flex justify-center lg:justify-end items-center gap-6">
        <div className="relative w-40 h-40">
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
            <span className="text-4xl font-bold text-text-primary">{hiringProbability}<span className="text-lg text-text-muted">%</span></span>
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.15em] mt-1">Job Ready</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

// ─── Section: KPI Metrics ────────────────────────────────────────────────────
const KpiSection = ({ resumes, coverLetters, stats, healthScore }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
    <MetricCard title="Career Health" value={`${healthScore}/100`} trend={5} subtext="from last week" icon={FiActivity} />
    <MetricCard title="Active Resumes" value={resumes?.length || 0} icon={FaFileSignature} />
    <MetricCard title="ATS Scans" value={stats?.totalScans || 0} icon={FaSearchPlus} />
    <MetricCard title="Cover Letters" value={coverLetters?.length || 0} icon={FaEnvelopeOpenText} />
  </div>
);

// ─── Section: Resume Cards ───────────────────────────────────────────────────
const ResumeSection = ({ resumes, onEdit, onScan, onShare, onDelete, onClone, onCreateNew }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-text-primary tracking-tight">Active Resumes</h2>
      <Button variant="ghost" onClick={onCreateNew} icon={FiPlus} className="!text-sm !h-9">
        New Resume
      </Button>
    </div>

    {(!resumes || resumes.length === 0) ? (
      <div className="text-center p-12 border border-dashed border-border-subtle rounded-3xl text-text-muted">
        <FaFileAlt size={32} className="mx-auto mb-3 opacity-30" />
        <p className="font-semibold">No resumes yet</p>
        <p className="text-sm mt-1">Create your first resume to get started.</p>
        <Button variant="glow" onClick={onCreateNew} icon={FiPlus} className="mt-4">
          Create Resume
        </Button>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {resumes.map((resume) => (
          <m.div
            key={resume.id}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card variant="elevated" className="!p-6 flex flex-col gap-5 h-full">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-text-primary truncate mb-1">{resume.title}</h3>
                  <p className="text-xs text-text-muted uppercase tracking-wider">{resume.jobTitle || resume.status || "Draft"}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  {resume.atsScore ? (
                    <Badge variant={resume.atsScore > 75 ? "score" : "warning"}>
                      ATS {resume.atsScore}
                    </Badge>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="ghost" className="!bg-primary/5 hover:!bg-primary/10 !text-primary !h-9 text-xs" onClick={() => onEdit(resume.id)} icon={FiEdit2}>
                  Edit
                </Button>
                <Button variant="ghost" className="!bg-white/5 hover:!bg-white/10 !h-9 text-xs" onClick={() => onScan(resume.id)} icon={FaSearchPlus}>
                  Scan ATS
                </Button>
                <Button variant="ghost" className="!bg-white/5 hover:!bg-white/10 !h-9 text-xs" onClick={() => onShare(resume)} icon={FiShare2}>
                  Share
                </Button>
                <Button variant="ghost" className="!bg-red-500/10 hover:!bg-red-500/20 !text-red-400 !h-9 text-xs" onClick={(e) => onDelete(resume.id, resume.title, e)} icon={FiTrash2}>
                  Delete
                </Button>
              </div>
            </Card>
          </m.div>
        ))}
      </div>
    )}
  </div>
);

// ─── Section: Cover Letters ──────────────────────────────────────────────────
const CoverLetterSection = ({ coverLetters, onDelete, onDownload }) => {
  if (!coverLetters || coverLetters.length === 0) return null;
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text-primary tracking-tight">Cover Letters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {coverLetters.map((letter) => (
          <Card key={letter._id || letter.id} variant="elevated" className="!p-5 flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary truncate mb-1">{letter.title || "Cover Letter"}</h3>
              <p className="text-xs text-text-muted">{letter.company || ""}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1 !h-8 text-xs !bg-white/5 hover:!bg-white/10" onClick={() => onDownload(letter)} icon={FiDownload}>
                Download
              </Button>
              <Button variant="ghost" className="!bg-red-500/10 hover:!bg-red-500/20 !text-red-400 !h-8 px-3 text-xs" onClick={(e) => onDelete(letter._id || letter.id, e)} icon={FiTrash2}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── Section: Next Best Actions ──────────────────────────────────────────────
const NextActionsSection = ({ navigate, quests }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold text-text-primary tracking-tight">Recommended Actions</h2>
    <div className="space-y-3">
      {[
        { icon: <FiZap className="text-primary" />, bg: "bg-primary/10", title: "Practice Interview", desc: "Your interview readiness is holding back your hiring probability.", path: "/interview" },
        { icon: <FaSearchPlus className="text-warning" />, bg: "bg-warning/10", title: "Improve ATS Score", desc: "Your latest resume scored 72%. Push it past 85% with AI suggestions.", path: "/ats" },
        { icon: <FaEnvelopeOpenText className="text-emerald-400" />, bg: "bg-emerald-500/10", title: "Generate Cover Letter", desc: "A tailored cover letter increases interview callback rate by 40%.", path: "/cover-letter" },
        { icon: <FiBriefcase className="text-violet-400" />, bg: "bg-violet-500/10", title: "Match Jobs", desc: "Find roles that align with your resume profile and ATS scores.", path: "/job-matcher" },
      ].map((action) => (
        <div
          key={action.title}
          onClick={() => navigate(action.path)}
          className="p-4 rounded-2xl bg-midground border border-border-subtle flex gap-4 items-start hover:border-primary/30 transition-all duration-200 cursor-pointer group"
        >
          <div className={`w-9 h-9 rounded-xl ${action.bg} flex items-center justify-center shrink-0 mt-0.5`}>
            {action.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-text-primary mb-0.5">{action.title}</p>
            <p className="text-xs text-text-muted leading-relaxed">{action.desc}</p>
          </div>
          <FiChevronRight className="text-text-muted group-hover:text-primary transition-colors shrink-0 mt-1" size={14} />
        </div>
      ))}
    </div>

    {quests && <QuestWidget quests={quests} />}
  </div>
);

// ─── Section: Module Launcher ────────────────────────────────────────────────
const ModuleLauncherSection = ({ modules, navigate }) => {
  if (!modules || modules.length === 0) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Career OS Modules</h2>
        <Badge variant="default">
          {modules.length} Active
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map((mod) => (
          <m.div
            key={mod.manifest.id}
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(mod.manifest.routes.main)}
            className="p-5 rounded-2xl bg-midground border border-border-subtle cursor-pointer hover:border-primary/40 transition-all duration-200 flex flex-col gap-3 group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${mod.manifest.color}15`, color: mod.manifest.color }}
            >
              {resolveIcon(mod.manifest.icon, 20)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary mb-0.5 group-hover:text-primary transition-colors">{mod.manifest.name}</h3>
              <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{mod.manifest.description}</p>
            </div>
            <div className="flex items-center gap-1 mt-auto">
              <span className="text-xs text-text-muted font-medium">Open</span>
              <FiArrowRight size={11} className="text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
};

// ─── Fix missing FiBriefcase import ─────────────────────────────────────────
const FiBriefcase = FaIcons.FaBriefcase;

// ─── Main Dashboard Component ────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dashboard = useSelector(selectDashboardData);
  const loading = useSelector(selectDashboardLoading);
  const isRefreshing = useSelector(selectIsRefreshing);

  const { user, resumes, coverLetters, economy, stats, meta } = dashboard;
  const [shareModalData, setShareModalData] = useState(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    dispatch(fetchDashboardData());
    setModules(ModuleRegistry.getModules());
  }, [dispatch]);

  // ── Derived values ──────────────────────────────────────────────────────
  const hiringProbability = user?.completionScore ? Math.min(Math.round(user.completionScore * 1.1), 99) : 45;
  const healthScore = user?.completionScore || 0;

  // ── Event handlers (preserved from original) ────────────────────────────
  const handleCreateNew = () => {
    dispatch(clearCurrentResume());
    navigate("/resume-builder/create");
  };

  const handleEdit = (id) => navigate(`/resume-builder/editor/${id}`);
  const handleScan = (id) => navigate("/ats", { state: { preSelectedResumeId: id } });

  const handleDelete = async (id, title, e) => {
    if (e) e.stopPropagation();
    const result = await Swal.fire({
      title: "Delete Resume?",
      text: `Delete "${title || "this resume"}"? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete It",
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#ffffff",
      customClass: { popup: "glass-medium" },
    });
    if (result.isConfirmed) {
      const res = await dispatch(deleteResume(id));
      if (res.type.includes("fulfilled")) {
        dispatch(fetchDashboardData());
        toast.success("Resume deleted successfully");
      } else {
        toast.error(res.payload || "Failed to delete resume");
      }
    }
  };

  const handleClone = async (id, e) => {
    if (e) e.stopPropagation();
    const result = await dispatch(cloneResume({ id }));
    if (result.type.includes("fulfilled")) {
      dispatch(fetchDashboardData());
      Swal.fire({
        title: "Cloned!", text: "Resume duplicated successfully.",
        icon: "success", timer: 2000, showConfirmButton: false,
        background: "var(--midground)", color: "var(--text-main)",
        customClass: { popup: "glass-medium" },
      });
    } else if (result.payload?.limitReached) {
      Swal.fire({
        title: "Resume Limit Reached",
        text: "You already have 2 resumes. Delete one to clone this.",
        icon: "info", background: "var(--midground)", color: "var(--text-main)",
        customClass: { popup: "glass-medium" },
      });
    }
  };

  const handleDeleteLetter = async (id, e) => {
    e?.stopPropagation();
    const result = await Swal.fire({
      title: "Delete Cover Letter?",
      text: "This action is permanent and cannot be recovered.",
      icon: "warning", showCancelButton: true,
      confirmButtonColor: "#ef4444", confirmButtonText: "Delete",
      background: "var(--midground)", color: "var(--text-main)",
      customClass: { popup: "glass-medium" },
    });
    if (result.isConfirmed) {
      try {
        await api.delete(`/cover-letters/${id}`);
        dispatch(fetchDashboardData());
        toast.success("Deleted");
      } catch {
        toast.error("Failed to delete");
      }
    }
  };

  // ── Skeleton loading state ──────────────────────────────────────────────
  if (loading && !resumes) {
    return (
      <div className="min-h-screen p-6 lg:p-10 space-y-8">
        <SkeletonLoader className="h-52 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SkeletonLoader className="h-28" />
          <SkeletonLoader className="h-28" />
          <SkeletonLoader className="h-28" />
          <SkeletonLoader className="h-28" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <SkeletonLoader className="h-48" />
          <SkeletonLoader className="h-48" />
          <SkeletonLoader className="h-48" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 lg:space-y-14 pb-20 max-w-[1400px] mx-auto">

      {/* 1. USER HERO */}
      <UserHeroSection
        user={user}
        hiringProbability={hiringProbability}
        healthScore={healthScore}
        onCreateResume={handleCreateNew}
      />

      {/* 2. KPI METRICS */}
      <KpiSection
        resumes={resumes}
        coverLetters={coverLetters}
        stats={stats}
        healthScore={healthScore}
      />

      {/* 3. RESUMES + NEXT ACTIONS (Side-by-Side) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <ResumeSection
            resumes={resumes}
            onEdit={handleEdit}
            onScan={handleScan}
            onShare={setShareModalData}
            onDelete={handleDelete}
            onClone={handleClone}
            onCreateNew={handleCreateNew}
          />
        </div>
        <div>
          <NextActionsSection navigate={navigate} quests={dashboard.quests} />
        </div>
      </div>

      {/* 4. COVER LETTERS */}
      <CoverLetterSection
        coverLetters={coverLetters}
        onDelete={handleDeleteLetter}
        onDownload={handleDownloadLetter}
      />

      {/* 5. MODULE LAUNCHER — Registry-driven, last section */}
      <ModuleLauncherSection modules={modules} navigate={navigate} />

      {/* Syncing indicator */}
      <AnimatePresence>
        {isRefreshing && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 right-10 z-[100] glass-strong px-5 py-3 rounded-full border border-primary/30 flex items-center gap-3 shadow-glow-primary"
          >
            <FiRefreshCw className="animate-spin text-primary" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Syncing</span>
          </m.div>
        )}
      </AnimatePresence>

      {/* Share Modal (preserved) */}
      <ShareResumeModal
        isOpen={!!shareModalData}
        onClose={() => setShareModalData(null)}
        resume={shareModalData}
        onUpdate={(updatedResume) => {
          setShareModalData(updatedResume);
          dispatch(fetchDashboardData());
        }}
      />
    </div>
  );
};

export default Dashboard;
