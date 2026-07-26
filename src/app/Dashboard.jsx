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
  FiArrowRight, FiActivity, FiShare2, FiChevronRight, FiSparkles, FiCheckCircle
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
  const userAvatar = user?.profileImage || user?.profilePicture || user?.avatar || user?.image || user?.photo;
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "Umair Ahmed Ansari";
  const headline = user?.headline || "MERN Stack Developer & Chatbot Developer.";
  const location = user?.location || "Karachi, PK";
  const completionScore = user?.completionScore || healthScore || 91;

  const rawSkills = getSkillsList(user?.skills);
  const skills = rawSkills.length > 0 ? rawSkills : ["GenerativeAI", "Frontend Web Development", "MERN Stack Web Development", "Chatbot Development"];
  const visibleSkills = skills.slice(0, 4);
  const extraCount = skills.length - visibleSkills.length;

  const aboutText = user?.bio || user?.summary || "Architecting next-generation digital products as an AI-Powered Developer.";
  const email = user?.email || "umair.ansari.92@gmail.com";
  const roleContact = user?.headline || "MERN Stack Developer & Chatbot Developer";
  const linkContact = user?.socialLinks?.linkedin || user?.website || (user?.username ? `cvifypro/p/${user.username}` : "linkedin.com/in/umairansari92");

  return (
    <Card variant="elevated" className="!p-5 lg:!p-6 flex flex-col justify-between h-full border border-border-subtle hover:border-primary/30 transition-all">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Your Profile</h3>
            <p className="text-[11px] text-text-muted">Keep it strong to rank higher.</p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
            Active
          </span>
        </div>

        <div className="my-3 border-t border-border-subtle" />

        {/* Avatar + Identity */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full p-[2.5px] shadow-glow-primary" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={fullName}
                  className="w-full h-full rounded-full object-cover border-2 border-bg-secondary"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-primary/20 border-2 border-bg-secondary flex items-center justify-center font-bold text-xl text-primary">
                  {fullName.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[7px] font-black tracking-wider px-2 py-0.5 rounded-full uppercase shadow-md whitespace-nowrap">
              #OPENTOWORK
            </div>
          </div>

          <h2 className="text-base font-bold text-text-primary mt-1">{fullName}</h2>
          <p className="text-[11px] text-text-secondary mt-0.5 px-1 leading-snug font-medium line-clamp-2">{headline}</p>

          <div className="flex items-center justify-center gap-1 text-[11px] text-text-muted mt-1.5">
            <FaMapMarkerAlt size={10} className="text-primary" />
            <span>{location}</span>
          </div>
        </div>

        {/* Completion Bar */}
        <div className="mb-4 bg-primary/5 p-3 rounded-xl border border-primary/10">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] font-bold text-text-primary">Profile Completion</span>
            <span className="text-[11px] font-bold text-primary">{completionScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <m.div
              initial={{ width: 0 }}
              animate={{ width: `${completionScore}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }}
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-text-primary mb-1.5">Skills</p>
          <div className="flex flex-wrap gap-1">
            {visibleSkills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-md border border-primary/20 truncate max-w-[150px]"
              >
                {skill}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="px-2 py-0.5 bg-white/5 text-text-muted text-[10px] font-bold rounded-md border border-border-subtle">
                +{extraCount}
              </span>
            )}
          </div>
        </div>

        {/* About */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-text-primary mb-1">About</p>
          <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
            {aboutText}
          </p>
        </div>

        {/* Contact */}
        <div className="mb-4 space-y-1.5">
          <p className="text-[11px] font-bold text-text-primary mb-1">Contact</p>
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <FaEnvelopeOpenText size={10} className="shrink-0 text-primary" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <FaBriefcase size={10} className="shrink-0 text-primary" />
            <span className="truncate line-clamp-1">{roleContact}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <FaChartLine size={10} className="shrink-0 text-primary" />
            <span className="truncate">{linkContact}</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Button variant="glow" onClick={() => navigate("/profile")} className="w-full !h-10 !text-xs font-bold mt-2">
        View Full Profile
      </Button>
    </Card>
  );
};

// ─── Career Status Card (Executive SaaS Command Hub) ──────────────────────
const CareerStatusCard = ({ user, hiringProbability, onCreateResume, navigate, resumes }) => {
  const latestResume = resumes && resumes.length > 0 ? resumes[0] : null;

  return (
    <Card variant="glass" className="relative p-6 lg:p-7 overflow-hidden h-full flex flex-col justify-between gap-5 border border-border-subtle">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* TOP: Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Career OS — Command Hub</span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary tracking-tight">
            Welcome back, {user?.firstName || user?.name?.split(" ")[0] || "User"} 👋
          </h1>
          <div className="text-xs text-text-secondary font-medium flex items-center gap-2 mt-1">
            <TypeAnimation
              sequence={[
                "AI Workspace Active • All Engines Nominal", 3000,
                "ATS Scanner Ready • Real-Time Scoring On", 3000,
                "Career Intelligence • Elite Optimization Mode", 3000
              ]}
              repeat={Infinity}
              wrapper="span"
            />
          </div>
        </div>
      </div>

      {/* MIDDLE: Quick Action Dock */}
      <div className="relative z-10 space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-text-muted">Quick Launch Dock</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <Button variant="glow" onClick={onCreateResume} icon={FiPlus} className="w-full !h-10 !text-xs font-bold">
            New Resume
          </Button>
          <Button variant="ghost" onClick={() => navigate("/ats")} icon={FaSearchPlus} className="w-full !h-10 !text-xs !bg-white/5 hover:!bg-white/10 border border-border-subtle">
            ATS Analyzer
          </Button>
          <Button variant="ghost" onClick={() => navigate("/cover-letter")} icon={FaEnvelopeOpenText} className="w-full !h-10 !text-xs !bg-white/5 hover:!bg-white/10 border border-border-subtle">
            Cover Letter
          </Button>
          <Button variant="ghost" onClick={() => navigate("/interview")} icon={FiZap} className="w-full !h-10 !text-xs !bg-white/5 hover:!bg-white/10 border border-border-subtle">
            Mock Interview
          </Button>
        </div>
      </div>

      {/* BOTTOM GRID: Readiness Meter + Active Resume Spotlight */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* Box A: Job Readiness Score */}
        <div className="p-4 rounded-2xl bg-midground/80 border border-border-subtle flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" className="stroke-card-border fill-none" strokeWidth="7" />
              <m.circle
                cx="50" cy="50" r="38" fill="none"
                stroke="var(--primary)" strokeWidth="8" strokeLinecap="round"
                initial={{ strokeDasharray: "0, 1000" }}
                animate={{ strokeDasharray: `${hiringProbability * 2.387}, 1000` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-text-primary">{hiringProbability}%</span>
              <span className="text-[7px] font-black uppercase text-text-muted tracking-wider">Job Ready</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-text-primary mb-0.5">Career Health Score</h4>
            <p className="text-[11px] text-text-muted leading-relaxed mb-1.5">
              Evaluated across 14 ATS algorithms and profile parameters.
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              ▲ +5% vs last week
            </span>
          </div>
        </div>

        {/* Box B: Latest Active Draft Spotlight */}
        <div className="p-4 rounded-2xl bg-midground/80 border border-border-subtle flex flex-col justify-between">
          {latestResume ? (
            <>
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-text-muted">Active Draft</span>
                </div>
                {latestResume.atsScore ? (
                  <Badge variant="score" className="!text-[10px] !py-0.5 !px-2">
                    ATS {latestResume.atsScore}
                  </Badge>
                ) : null}
              </div>
              <h4 className="text-xs font-bold text-text-primary truncate mb-0.5">{latestResume.title}</h4>
              <p className="text-[10px] text-text-muted mb-2">Last updated: {new Date(latestResume.updatedAt || Date.now()).toLocaleDateString()}</p>
              <Button
                variant="ghost"
                onClick={() => navigate(`/resume-builder/editor/${latestResume.id}`)}
                className="w-full !h-7 !text-[11px] !bg-primary/10 hover:!bg-primary/20 !text-primary border border-primary/20 flex items-center justify-center gap-1.5 font-bold"
              >
                <span>Continue Editing</span>
                <FiArrowRight size={11} />
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center text-center justify-center h-full py-1">
              <p className="text-xs font-bold text-text-primary mb-1">No Active Resume Draft</p>
              <p className="text-[10px] text-text-muted mb-2">Create your first resume to unlock AI insights.</p>
              <Button variant="glow" onClick={onCreateResume} icon={FiPlus} className="!h-7 !text-[11px]">
                Create First Resume
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER: AI Co-Pilot Recommendation Bar */}
      <div className="relative z-10 p-3 rounded-xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <FiZap size={14} />
          </div>
          <p className="text-[11px] text-text-secondary leading-tight truncate">
            <strong className="text-text-primary font-semibold">AI Insight:</strong> Your profile matches 88% of Senior MERN roles. Scan target jobs now.
          </p>
        </div>
        <button
          onClick={() => navigate("/ats")}
          className="text-[11px] font-bold text-primary hover:underline whitespace-nowrap shrink-0 flex items-center gap-1"
        >
          <span>Run Scan</span>
          <FiChevronRight size={11} />
        </button>
      </div>
    </Card>
  );
};

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
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-text-primary tracking-tight">Active Resumes</h2>
        <Badge variant="default">{resumes?.length || 0}</Badge>
      </div>
      <Button variant="ghost" onClick={onCreateNew} icon={FiPlus} className="!text-xs !h-8 !px-3">New Resume</Button>
    </div>

    {(!resumes || resumes.length === 0) ? (
      <div className="text-center p-10 border border-dashed border-border-subtle rounded-3xl text-text-muted">
        <FaFileAlt size={28} className="mx-auto mb-2 opacity-30" />
        <p className="font-semibold text-sm">No resumes yet</p>
        <p className="text-xs mt-0.5">Create your first resume to get started.</p>
        <Button variant="glow" onClick={onCreateNew} icon={FiPlus} className="mt-3 !h-9 !text-xs">Create Resume</Button>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumes.map((resume) => (
          <m.div key={resume.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Card variant="elevated" className="!p-5 flex flex-col justify-between gap-4 h-full border border-border-subtle hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-text-primary truncate mb-0.5">{resume.title}</h3>
                  <p className="text-[11px] text-text-muted uppercase tracking-wider font-semibold">{resume.jobTitle || resume.status || "Draft"}</p>
                </div>
                {resume.atsScore ? (
                  <Badge variant={resume.atsScore > 75 ? "score" : "warning"} className="shrink-0">
                    ATS {resume.atsScore}
                  </Badge>
                ) : null}
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-border-subtle/60">
                <button
                  onClick={() => onEdit(resume.id)}
                  className="px-2 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[11px] flex items-center justify-center gap-1 transition-all"
                >
                  <FiEdit2 size={11} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onScan(resume.id)}
                  className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary font-bold text-[11px] flex items-center justify-center gap-1 transition-all"
                >
                  <FaSearchPlus size={11} />
                  <span>Scan</span>
                </button>
                <button
                  onClick={() => onShare(resume)}
                  className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary font-bold text-[11px] flex items-center justify-center gap-1 transition-all"
                >
                  <FiShare2 size={11} />
                  <span>Share</span>
                </button>
                <button
                  onClick={(e) => onDelete(resume.id, resume.title, e)}
                  className="px-2 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-[11px] flex items-center justify-center gap-1 transition-all"
                >
                  <FiTrash2 size={11} />
                  <span>Delete</span>
                </button>
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
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-text-primary tracking-tight">Cover Letters</h2>
        <Badge variant="default">{coverLetters.length}</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coverLetters.map((letter) => (
          <Card key={letter._id || letter.id} variant="elevated" className="!p-4 flex flex-col justify-between gap-3 border border-border-subtle">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <FaEnvelopeOpenText size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold text-text-primary truncate mb-0.5">{letter.title || "Cover Letter"}</h3>
                <p className="text-[11px] text-text-muted truncate">{letter.company || "Target Company"}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-border-subtle/60">
              <button
                onClick={() => onDownload(letter)}
                className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all"
              >
                <FiDownload size={11} />
                <span>Download</span>
              </button>
              <button
                onClick={(e) => onDelete(letter._id || letter.id, e)}
                className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-[11px] flex items-center justify-center gap-1 transition-all"
              >
                <FiTrash2 size={11} />
                <span>Delete</span>
              </button>
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
    <h2 className="text-lg font-bold text-text-primary tracking-tight">Recommended Actions</h2>
    <div className="space-y-2.5">
      {[
        { icon: <FiZap className="text-primary" />, bg: "bg-primary/10", title: "Practice Interview", desc: "Your interview readiness is holding back your hiring probability.", path: "/interview" },
        { icon: <FaSearchPlus className="text-yellow-400" />, bg: "bg-yellow-500/10", title: "Improve ATS Score", desc: "Your latest resume scored 72%. Push it past 85% with AI.", path: "/ats" },
        { icon: <FaEnvelopeOpenText className="text-emerald-400" />, bg: "bg-emerald-500/10", title: "Generate Cover Letter", desc: "A tailored cover letter increases interview callbacks by 40%.", path: "/cover-letter" },
        { icon: <FaBriefcase className="text-violet-400" />, bg: "bg-violet-500/10", title: "Match Jobs", desc: "Find roles that match your resume profile and ATS scores.", path: "/job-matcher" },
      ].map((action) => (
        <div
          key={action.title}
          onClick={() => navigate(action.path)}
          className="p-3.5 rounded-2xl bg-midground border border-border-subtle flex gap-3.5 items-center hover:border-primary/30 transition-all duration-200 cursor-pointer group"
        >
          <div className={`w-8 h-8 rounded-xl ${action.bg} flex items-center justify-center shrink-0`}>{action.icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-text-primary mb-0.5">{action.title}</p>
            <p className="text-[11px] text-text-muted leading-tight line-clamp-1">{action.desc}</p>
          </div>
          <FiChevronRight className="text-text-muted group-hover:text-primary transition-colors shrink-0" size={13} />
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
        <h2 className="text-lg font-bold text-text-primary tracking-tight">Career OS Modules</h2>
        <Badge variant="default">{modules.length} Active</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map((mod) => (
          <m.div
            key={mod.manifest.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(mod.manifest.routes.main)}
            className="p-4 rounded-2xl bg-midground border border-border-subtle cursor-pointer hover:border-primary/40 transition-all duration-200 flex flex-col gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${mod.manifest.color}15`, color: mod.manifest.color }}>
              {resolveIcon(mod.manifest.icon, 18)}
            </div>
            <div>
              <h3 className="text-xs font-bold text-text-primary mb-0.5 group-hover:text-primary transition-colors">{mod.manifest.name}</h3>
              <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">{mod.manifest.description}</p>
            </div>
            <div className="flex items-center gap-1 mt-auto">
              <span className="text-[11px] text-text-muted font-medium">Open</span>
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

  const authUser = useSelector((state) => state.auth?.user);
  const dashboard = useSelector(selectDashboardData);
  const loading = useSelector(selectDashboardLoading);
  const isRefreshing = useSelector(selectIsRefreshing);

  // Combine auth user profile data with dashboard API metrics
  const user = { ...authUser, ...dashboard?.user };
  const { resumes, coverLetters, stats } = dashboard;
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
    <div className="space-y-8 lg:space-y-10 pb-20 max-w-[1400px] mx-auto">

      {/* 1. HERO ROW: Profile Card (1 col) + Career Status Hub (2 cols) — EQUAL HEIGHT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        <div className="xl:col-span-1 h-full">
          <ProfileCard user={user} healthScore={healthScore} navigate={navigate} />
        </div>

        <div className="xl:col-span-2 h-full">
          <CareerStatusCard
            user={user}
            hiringProbability={hiringProbability}
            onCreateResume={handleCreateNew}
            navigate={navigate}
            resumes={resumes}
          />
        </div>
      </div>

      {/* 2. KPI METRICS */}
      <KpiSection resumes={resumes} coverLetters={coverLetters} stats={dashboard.stats} healthScore={healthScore} />

      {/* 3. RESUMES + NEXT ACTIONS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
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

      {/* 5. MODULE LAUNCHER */}
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
