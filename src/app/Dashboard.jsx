import { useEffect, useState } from "react";
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
  FaUser, FaGem, FaFileSignature, FaBriefcase, FaMapMarkerAlt
} from "react-icons/fa";
import {
  FiEdit2, FiTrash2, FiDownload, FiPlus, FiCopy, FiZap, FiRefreshCw,
  FiArrowRight, FiActivity, FiShare2, FiChevronRight
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
import { handleDownloadLetter } from "../utils/pdfExport";

// Registry
import { ModuleRegistry } from "../core/registry/ModuleRegistry";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const resolveIcon = (iconString, size = 20) => {
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

const getSkillsList = (skills) => {
  if (Array.isArray(skills)) return skills.map(s => s?.name || s).filter(Boolean);
  if (skills && typeof skills === "object") {
    return [...(skills.technical || []), ...(skills.soft || []), ...(skills.strategic || [])];
  }
  return [];
};

// ─── Profile Card (HiringMine style) ─────────────────────────────────────────
const ProfileCard = ({ user, healthScore, navigate }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "User";
  const completionScore = user?.completionScore || healthScore || 0;
  const skills = getSkillsList(user?.skills);
  const visibleSkills = skills.slice(0, 5);
  const extraCount = skills.length - visibleSkills.length;

  return (
    <Card variant="elevated" className="!p-6 flex flex-col gap-0 h-full">
      {/* Header */}
      <div className="mb-1">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-text-muted">Your Profile</p>
        <p className="text-[11px] text-text-muted mt-0.5">Keep it strong to rank higher.</p>
      </div>

      <div className="my-5 border-t border-border-subtle" />

      {/* Avatar + Identity */}
      <div className="flex flex-col items-center text-center mb-5">
        <div className="relative mb-4">
          {user?.profileImage ? (
            <div className="relative">
              <div className="w-24 h-24 rounded-full p-[3px]" style={{ background: "linear-gradient(135deg, var(--primary), #818cf8)" }}>
                <img
                  src={user.profileImage}
                  alt={fullName}
                  className="w-full h-full rounded-full object-cover border-2 border-bg-secondary"
                />
              </div>
              {user?.openToWork && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[7px] font-black bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-glow-primary">
                  Open to Work
                </span>
              )}
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary/10 border-[3px] border-primary/30 flex items-center justify-center">
              <FaUser className="text-primary" size={28} />
            </div>
          )}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-400 border-2 border-bg-secondary rounded-full" />
        </div>

        <h2 className="text-base font-bold text-text-primary">{fullName}</h2>
        {user?.headline && (
          <p className="text-xs text-text-secondary mt-0.5 px-2 leading-relaxed line-clamp-2">{user.headline}</p>
        )}
        {user?.location && (
          <div className="flex items-center justify-center gap-1 text-xs text-text-muted mt-2">
            <FaMapMarkerAlt size={9} className="text-primary" />
            <span>{user.location}</span>
          </div>
        )}
      </div>

      {/* Completion Bar */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-text-primary">Profile Completion</span>
          <span className="text-xs font-bold text-primary">{completionScore}%</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <m.div
            initial={{ width: 0 }}
            animate={{ width: `${completionScore}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--primary), #818cf8)" }}
          />
        </div>
      </div>

      {/* Skills */}
      {visibleSkills.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-bold text-text-primary mb-2">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {visibleSkills.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-primary/8 text-primary text-[11px] font-semibold rounded-lg border border-primary/15 truncate max-w-[160px]"
              >
                {skill}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="px-2.5 py-1 bg-white/5 text-text-muted text-[11px] font-bold rounded-lg border border-border-subtle">
                +{extraCount}
              </span>
            )}
          </div>
        </div>
      )}

      {/* About */}
      {(user?.bio || user?.summary) && (
        <div className="mb-5">
          <p className="text-xs font-bold text-text-primary mb-1.5">About</p>
          <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
            {user?.bio || user?.summary}
          </p>
        </div>
      )}

      {/* Contact */}
      <div className="mb-5 space-y-2">
        <p className="text-xs font-bold text-text-primary mb-2">Contact</p>
        {user?.email && (
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <FaEnvelopeOpenText size={10} className="shrink-0 text-primary" />
            <span className="truncate">{user.email}</span>
          </div>
        )}
        {user?.headline && (
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <FaBriefcase size={10} className="shrink-0 text-primary" />
            <span className="truncate line-clamp-1">{user.headline}</span>
          </div>
        )}
        {user?.username && (
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <FaChartLine size={10} className="shrink-0 text-primary" />
            <span className="truncate">cvifypro/p/{user.username}</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <Button variant="glow" onClick={() => navigate("/profile")} className="w-full mt-auto">
        View Full Profile
      </Button>
    </Card>
  );
};

// ─── Career Status Card ───────────────────────────────────────────────────────
const CareerStatusCard = ({ user, hiringProbability, onCreateResume, navigate }) => (
  <Card variant="glass" className="relative p-7 lg:p-9 overflow-hidden h-full">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 h-full">
      <div className="flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">Career OS — Active Session</p>
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary tracking-tight mb-3">
          Welcome back, {user?.firstName || user?.name?.split(" ")[0] || "User"} 👋
        </h1>
        <div className="text-sm text-text-secondary font-medium flex items-center gap-2 mb-7">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <TypeAnimation
            sequence={["AI Workspace Active", 3000, "Intelligence Synchronized", 3000, "Career OS — Elite Mode", 3000]}
            repeat={Infinity}
            wrapper="span"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button variant="glow" onClick={onCreateResume} icon={FiPlus}>New Resume</Button>
          <Button variant="ghost" onClick={() => navigate("/ats")} icon={FaSearchPlus}>ATS Scan</Button>
          <Button variant="ghost" onClick={() => navigate("/cover-letter")} icon={FaEnvelopeOpenText}>Cover Letter</Button>
        </div>
      </div>

      {/* Career Health Ring */}
      <div className="relative w-36 h-36 shrink-0 self-center">
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
          <span className="text-4xl font-bold text-text-primary">
            {hiringProbability}<span className="text-lg text-text-muted">%</span>
          </span>
          <span className="text-[8px] font-bold text-text-secondary uppercase tracking-[0.15em] mt-1 text-center">Job Ready</span>
        </div>
      </div>
    </div>
  </Card>
);

// ─── KPI Section ──────────────────────────────────────────────────────────────
const KpiSection = ({ resumes, coverLetters, stats, healthScore }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <MetricCard title="Career Health" value={`${healthScore}/100`} trend={5} subtext="from last week" icon={FiActivity} />
    <MetricCard title="Active Resumes" value={resumes?.length || 0} icon={FaFileSignature} />
    <MetricCard title="ATS Scans" value={stats?.totalScans || 0} icon={FaSearchPlus} />
    <MetricCard title="Cover Letters" value={coverLetters?.length || 0} icon={FaEnvelopeOpenText} />
  </div>
);

// ─── Resume Cards ─────────────────────────────────────────────────────────────
const ResumeSection = ({ resumes, onEdit, onScan, onShare, onDelete, onCreateNew }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-text-primary tracking-tight">Active Resumes</h2>
      <Button variant="ghost" onClick={onCreateNew} icon={FiPlus} className="!text-sm !h-9">New Resume</Button>
    </div>

    {(!resumes || resumes.length === 0) ? (
      <div className="text-center p-12 border border-dashed border-border-subtle rounded-3xl text-text-muted">
        <FaFileAlt size={32} className="mx-auto mb-3 opacity-30" />
        <p className="font-semibold">No resumes yet</p>
        <p className="text-sm mt-1">Create your first resume to get started.</p>
        <Button variant="glow" onClick={onCreateNew} icon={FiPlus} className="mt-4">Create Resume</Button>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {resumes.map((resume) => (
          <m.div key={resume.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Card variant="elevated" className="!p-6 flex flex-col gap-5 h-full">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-text-primary truncate mb-1">{resume.title}</h3>
                  <p className="text-xs text-text-muted uppercase tracking-wider">{resume.jobTitle || resume.status || "Draft"}</p>
                </div>
                {resume.atsScore ? (
                  <Badge variant={resume.atsScore > 75 ? "score" : "warning"} className="shrink-0 ml-2">
                    ATS {resume.atsScore}
                  </Badge>
                ) : null}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="ghost" className="!bg-primary/5 hover:!bg-primary/10 !text-primary !h-9 text-xs" onClick={() => onEdit(resume.id)} icon={FiEdit2}>Edit</Button>
                <Button variant="ghost" className="!bg-white/5 hover:!bg-white/10 !h-9 text-xs" onClick={() => onScan(resume.id)} icon={FaSearchPlus}>Scan</Button>
                <Button variant="ghost" className="!bg-white/5 hover:!bg-white/10 !h-9 text-xs" onClick={() => onShare(resume)} icon={FiShare2}>Share</Button>
                <Button variant="ghost" className="!bg-red-500/10 hover:!bg-red-500/20 !text-red-400 !h-9 text-xs" onClick={(e) => onDelete(resume.id, resume.title, e)} icon={FiTrash2}>Delete</Button>
              </div>
            </Card>
          </m.div>
        ))}
      </div>
    )}
  </div>
);

// ─── Cover Letters ────────────────────────────────────────────────────────────
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
              <Button variant="ghost" className="flex-1 !h-8 text-xs !bg-white/5 hover:!bg-white/10" onClick={() => onDownload(letter)} icon={FiDownload}>Download</Button>
              <Button variant="ghost" className="!bg-red-500/10 hover:!bg-red-500/20 !text-red-400 !h-8 px-3 text-xs" onClick={(e) => onDelete(letter._id || letter.id, e)} icon={FiTrash2}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── Next Actions + QuestWidget ───────────────────────────────────────────────
const NextActionsSection = ({ navigate, quests }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold text-text-primary tracking-tight">Recommended Actions</h2>
    <div className="space-y-3">
      {[
        { icon: <FiZap className="text-primary" />, bg: "bg-primary/10", title: "Practice Interview", desc: "Your interview readiness is holding back your hiring probability.", path: "/interview" },
        { icon: <FaSearchPlus className="text-yellow-400" />, bg: "bg-yellow-500/10", title: "Improve ATS Score", desc: "Your latest resume scored 72%. Push it past 85% with AI.", path: "/ats" },
        { icon: <FaEnvelopeOpenText className="text-emerald-400" />, bg: "bg-emerald-500/10", title: "Generate Cover Letter", desc: "A tailored cover letter increases interview callbacks by 40%.", path: "/cover-letter" },
        { icon: <FaBriefcase className="text-violet-400" />, bg: "bg-violet-500/10", title: "Match Jobs", desc: "Find roles that match your resume profile and ATS scores.", path: "/job-matcher" },
      ].map((action) => (
        <div
          key={action.title}
          onClick={() => navigate(action.path)}
          className="p-4 rounded-2xl bg-midground border border-border-subtle flex gap-4 items-start hover:border-primary/30 transition-all duration-200 cursor-pointer group"
        >
          <div className={`w-9 h-9 rounded-xl ${action.bg} flex items-center justify-center shrink-0`}>{action.icon}</div>
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

// ─── Module Launcher ──────────────────────────────────────────────────────────
const ModuleLauncherSection = ({ modules, navigate }) => {
  if (!modules || modules.length === 0) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Career OS Modules</h2>
        <Badge variant="default">{modules.length} Active</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map((mod) => (
          <m.div
            key={mod.manifest.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(mod.manifest.routes.main)}
            className="p-5 rounded-2xl bg-midground border border-border-subtle cursor-pointer hover:border-primary/40 transition-all duration-200 flex flex-col gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${mod.manifest.color}15`, color: mod.manifest.color }}>
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

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dashboard = useSelector(selectDashboardData);
  const loading = useSelector(selectDashboardLoading);
  const isRefreshing = useSelector(selectIsRefreshing);

  const { user, resumes, coverLetters, stats } = dashboard;
  const [shareModalData, setShareModalData] = useState(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    dispatch(fetchDashboardData());
    setModules(ModuleRegistry.getModules());
  }, [dispatch]);

  const hiringProbability = user?.completionScore ? Math.min(Math.round(user.completionScore * 1.1), 99) : 45;
  const healthScore = user?.completionScore || 0;

  const handleCreateNew = () => { dispatch(clearCurrentResume()); navigate("/resume-builder/create"); };
  const handleEdit = (id) => navigate(`/resume-builder/editor/${id}`);
  const handleScan = (id) => navigate("/ats", { state: { preSelectedResumeId: id } });

  const handleDelete = async (id, title, e) => {
    if (e) e.stopPropagation();
    const result = await Swal.fire({
      title: "Delete Resume?", text: `Delete "${title || "this resume"}"? This cannot be undone.`,
      icon: "warning", showCancelButton: true, confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete It", cancelButtonText: "Cancel",
      background: "#0f172a", color: "#ffffff", customClass: { popup: "glass-medium" },
    });
    if (result.isConfirmed) {
      const res = await dispatch(deleteResume(id));
      if (res.type.includes("fulfilled")) { dispatch(fetchDashboardData()); toast.success("Resume deleted"); }
      else toast.error(res.payload || "Failed to delete");
    }
  };

  const handleDeleteLetter = async (id, e) => {
    e?.stopPropagation();
    const result = await Swal.fire({
      title: "Delete Cover Letter?", text: "This is permanent and cannot be recovered.",
      icon: "warning", showCancelButton: true, confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete", background: "var(--midground)", color: "var(--text-main)",
      customClass: { popup: "glass-medium" },
    });
    if (result.isConfirmed) {
      try { await api.delete(`/cover-letters/${id}`); dispatch(fetchDashboardData()); toast.success("Deleted"); }
      catch { toast.error("Failed to delete"); }
    }
  };

  if (loading && !resumes) {
    return (
      <div className="min-h-screen p-6 lg:p-10 space-y-8">
        <SkeletonLoader className="h-52 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonLoader key={i} className="h-28" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => <SkeletonLoader key={i} className="h-48" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 lg:space-y-12 pb-20 max-w-[1400px] mx-auto">

      {/* 1. HERO: Profile Card (left) + Career Status (right) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="xl:col-span-1">
          <ProfileCard user={user} healthScore={healthScore} navigate={navigate} />
        </div>

        {/* Career Status + Quick Actions */}
        <div className="xl:col-span-2">
          <CareerStatusCard
            user={user}
            hiringProbability={hiringProbability}
            onCreateResume={handleCreateNew}
            navigate={navigate}
          />
        </div>
      </div>

      {/* 2. KPI METRICS */}
      <KpiSection resumes={resumes} coverLetters={coverLetters} stats={dashboard.stats} healthScore={healthScore} />

      {/* 3. RESUMES + NEXT ACTIONS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <ResumeSection
            resumes={resumes}
            onEdit={handleEdit}
            onScan={handleScan}
            onShare={setShareModalData}
            onDelete={handleDelete}
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

      {/* 5. MODULE LAUNCHER — last section */}
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
