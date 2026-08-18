import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { m, AnimatePresence } from "framer-motion";
import { getMyResumes, deleteResume, cloneResume, parseResume } from "../features/resume/resumeThunk";
import ShareResumeModal from "../components/dashboard/ShareResumeModal";
import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import SkeletonLoader from "../components/ui/SkeletonLoader";

import {
  FaFilePdf, FaSearchPlus, FaShareAlt, FaCopy, FaTrashAlt, FaEdit,
  FaCloudUploadAlt, FaFileAlt, FaCheckCircle, FaExclamationCircle, FaLock, FaGlobe
} from "react-icons/fa";
import { FiPlus, FiMoreVertical, FiArrowRight, FiDownload } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyResumesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { resumes = [], loading } = useSelector((state) => state.resume);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [shareModalResume, setShareModalResume] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadZone, setShowUploadZone] = useState(false);

  useEffect(() => {
    dispatch(getMyResumes());
  }, [dispatch]);

  // Compute Metrics from Redux Data
  const metrics = useMemo(() => {
    const total = resumes.length;
    const scoredResumes = resumes.filter((r) => typeof r.atsScore === "number" && r.atsScore > 0);
    const avgScore = scoredResumes.length > 0
      ? Math.round(scoredResumes.reduce((acc, r) => acc + r.atsScore, 0) / scoredResumes.length)
      : 0;
    const highQuality = resumes.filter((r) => (r.atsScore || 0) >= 80).length;
    const pending = resumes.filter((r) => !r.atsScore).length;

    return { total, avgScore, highQuality, pending };
  }, [resumes]);

  // File Drag & Drop Upload
  const handleFileUpload = async (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      await dispatch(parseResume(formData)).unwrap();
      toast.success("Resume uploaded & parsed successfully!");
      dispatch(getMyResumes());
      setShowUploadZone(false);
    } catch (err) {
      toast.error(err?.message || err || "Failed to parse resume PDF.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  // Actions
  const handleOpenShare = (resume, e) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setShareModalResume(resume);
  };

  const handleClone = async (resumeId, e) => {
    e.stopPropagation();
    setActiveMenuId(null);
    try {
      await dispatch(cloneResume({ id: resumeId })).unwrap();
      toast.success("Resume cloned successfully!");
      dispatch(getMyResumes());
    } catch (err) {
      toast.error(err?.message || "Failed to clone resume.");
    }
  };

  const handleDelete = async (resumeId, resumeTitle, e) => {
    e.stopPropagation();
    setActiveMenuId(null);
    const confirm = await Swal.fire({
      title: "Delete Resume?",
      text: `Are you sure you want to delete "${resumeTitle || "Untitled"}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      background: "#18181b",
      color: "#f8fafc",
    });

    if (confirm.isConfirmed) {
      try {
        await dispatch(deleteResume(resumeId)).unwrap();
        toast.success("Resume deleted.");
        dispatch(getMyResumes());
      } catch (err) {
        toast.error(err || "Failed to delete resume.");
      }
    }
  };

  return (
    <div className="space-y-8 pb-24 max-w-[1400px] mx-auto px-4 sm:px-6">
      
      {/* ── SECTION 1: Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Resume Management Module</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mt-0.5">
            My Resume Library
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Manage, optimize, and share every version of your resume from one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => setShowUploadZone(!showUploadZone)}
            icon={FaCloudUploadAlt}
            className="!h-10 !text-xs !bg-white/5 hover:!bg-white/10 border border-border-subtle font-bold"
          >
            {showUploadZone ? "Hide Upload" : "Upload Resume"}
          </Button>
          <Button
            variant="glow"
            onClick={() => navigate("/resume-builder/create")}
            icon={FiPlus}
            className="!h-10 !text-xs font-bold"
          >
            Create Resume
          </Button>
        </div>
      </div>

      {/* ── SECTION 2: Metrics Row (4 Cards) ────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="p-4 border border-border-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <FaFilePdf size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Total Resumes</p>
            <h3 className="text-xl font-bold text-text-primary mt-0.5">{metrics.total}</h3>
          </div>
        </Card>

        <Card variant="glass" className="p-4 border border-border-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <FaSearchPlus size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Avg ATS Score</p>
            <h3 className="text-xl font-bold text-text-primary mt-0.5">{metrics.avgScore}%</h3>
          </div>
        </Card>

        <Card variant="glass" className="p-4 border border-border-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
            <FaCheckCircle size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">High Quality (80%+)</p>
            <h3 className="text-xl font-bold text-text-primary mt-0.5">{metrics.highQuality}</h3>
          </div>
        </Card>

        <Card variant="glass" className="p-4 border border-border-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <FaExclamationCircle size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Pending Analysis</p>
            <h3 className="text-xl font-bold text-text-primary mt-0.5">{metrics.pending}</h3>
          </div>
        </Card>
      </div>

      {/* ── SECTION 3: Upload Drag & Drop Area ──────────────────────────────── */}
      <AnimatePresence>
        {showUploadZone && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card
              variant="glass"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="p-8 border-2 border-dashed border-primary/30 rounded-3xl text-center flex flex-col items-center justify-center gap-3 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer relative"
            >
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center shadow-glow-primary">
                <FaCloudUploadAlt size={28} />
              </div>
              <div>
                <h4 className="text-base font-bold text-text-primary">
                  {isUploading ? "Parsing PDF with AI Engine..." : "Upload or Drag & Drop Resume PDF"}
                </h4>
                <p className="text-xs text-text-muted mt-1">
                  Supported formats: PDF (Max size 5MB). AI engine extracts experience & skills automatically.
                </p>
              </div>
            </Card>
          </m.div>
        )}
      </AnimatePresence>

      {/* ── SECTION 4: Resume Grid Collection ───────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary tracking-tight">Your Resumes ({resumes.length})</h2>
          <span className="text-xs text-text-muted">Sorted by latest activity</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <Card variant="glass" className="text-center p-12 border border-dashed border-border-subtle rounded-3xl text-text-muted">
            <FaFileAlt size={36} className="mx-auto mb-3 opacity-30 text-primary" />
            <h3 className="text-lg font-bold text-text-primary">Your Resume Collection is Empty</h3>
            <p className="text-xs text-text-muted mt-1 max-w-md mx-auto">
              Create your first AI-tailored resume or upload an existing PDF to start scoring and applying.
            </p>
            <Button
              variant="glow"
              onClick={() => navigate("/resume-builder/create")}
              icon={FiPlus}
              className="mt-6 !h-10 !text-xs font-bold"
            >
              Create Resume
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => {
              const resumeId = resume.id || resume._id;
              const atsScore = resume.atsScore || 0;

              return (
                <m.div key={resumeId} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Card variant="elevated" className="!p-5 flex flex-col justify-between h-full border border-border-subtle hover:border-primary/40 transition-all relative group">
                    
                    {/* Header: Title + Category + Overflow */}
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-text-primary truncate" title={resume.title}>
                          {resume.title || "Untitled Resume"}
                        </h3>
                        <p className="text-[11px] text-text-muted font-medium mt-0.5">
                          {resume.jobTitle || resume.targetRole || "General Resume"} • Updated {new Date(resume.updatedAt || Date.now()).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === resumeId ? null : resumeId);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors shrink-0"
                      >
                        <FiMoreVertical size={16} />
                      </button>
                    </div>

                    {/* PDF Document Visual Preview Card */}
                    <div
                      onClick={() => navigate(`/resume-builder/editor/${resumeId}`)}
                      className="relative w-full h-36 rounded-2xl bg-midground/90 border border-border-subtle p-4 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-primary/50 transition-all mb-4"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

                      <div className="flex justify-between items-center relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-wider text-primary flex items-center gap-1.5">
                          <FaFilePdf size={12} />
                          {resume.templateId || "Modern Template"}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          resume.sharing?.enabled ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-text-muted border border-border-subtle"
                        }`}>
                          {resume.sharing?.enabled ? <FaGlobe size={9} /> : <FaLock size={9} />}
                          {resume.sharing?.enabled ? "Public" : "Private"}
                        </span>
                      </div>

                      {/* Document Layout Mock */}
                      <div className="space-y-1.5 relative z-10 my-auto px-1">
                        <div className="h-2 bg-text-primary/30 rounded-full w-4/5" />
                        <div className="h-1.5 bg-text-muted/25 rounded-full w-3/5" />
                        <div className="h-1 bg-text-muted/15 rounded-full w-2/3" />
                      </div>

                      {/* Footer Info inside Document */}
                      <div className="flex justify-between items-center text-[10px] text-text-muted relative z-10 pt-2 border-t border-white/5">
                        <span>ATS Compatibility</span>
                        <span className="font-bold text-text-primary">{atsScore > 0 ? `${atsScore}%` : "Not Scanned"}</span>
                      </div>
                    </div>

                    {/* ATS Progress Bar */}
                    <div className="mb-4 bg-primary/5 p-3 rounded-xl border border-primary/10">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] font-bold text-text-primary">ATS Score</span>
                        <Badge variant={atsScore >= 75 ? "score" : atsScore > 0 ? "warning" : "default"} className="!text-[10px]">
                          {atsScore > 0 ? `${atsScore}%` : "Pending"}
                        </Badge>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${atsScore}%`,
                            background: atsScore >= 75 ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #6366f1, #a855f7)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <Button
                        variant="glow"
                        onClick={() => navigate(`/resume-builder/editor/${resumeId}`)}
                        className="w-full !h-9 !text-xs font-bold"
                      >
                        View Resume
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => navigate("/ats/scan", { state: { preSelectedResumeId: resumeId } })}
                        icon={FaSearchPlus}
                        className="w-full !h-9 !text-xs !bg-white/5 hover:!bg-white/10 border border-border-subtle font-bold"
                      >
                        View ATS
                      </Button>
                    </div>

                    {/* Reconnected Overflow Dropdown Menu */}
                    <AnimatePresence>
                      {activeMenuId === resumeId && (
                        <m.div
                          initial={{ opacity: 0, scale: 0.95, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          className="absolute right-4 top-12 z-50 bg-[#18181b] border border-border-subtle rounded-2xl p-2 shadow-2xl w-48 space-y-1"
                        >
                          <button
                            onClick={() => { setActiveMenuId(null); navigate(`/resume-builder/editor/${resumeId}`); }}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-white/10 flex items-center gap-2.5 transition-colors"
                          >
                            <FaEdit size={12} className="text-blue-400" />
                            <span>Edit Resume</span>
                          </button>
                          <button
                            onClick={() => { setActiveMenuId(null); navigate("/ats/scan", { state: { preSelectedResumeId: resumeId } }); }}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-white/10 flex items-center gap-2.5 transition-colors"
                          >
                            <FaSearchPlus size={12} className="text-emerald-400" />
                            <span>Run ATS Check</span>
                          </button>
                          <button
                            onClick={(e) => handleOpenShare(resume, e)}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-white/10 flex items-center gap-2.5 transition-colors"
                          >
                            <FaShareAlt size={12} className="text-purple-400" />
                            <span>Share Link</span>
                          </button>
                          <button
                            onClick={(e) => handleClone(resumeId, e)}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-white/10 flex items-center gap-2.5 transition-colors"
                          >
                            <FaCopy size={12} className="text-amber-400" />
                            <span>Duplicate</span>
                          </button>
                          <div className="my-1 border-t border-border-subtle" />
                          <button
                            onClick={(e) => handleDelete(resumeId, resume.title, e)}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-2.5 transition-colors"
                          >
                            <FaTrashAlt size={12} />
                            <span>Delete Resume</span>
                          </button>
                        </m.div>
                      )}
                    </AnimatePresence>

                  </Card>
                </m.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ShareResumeModal
        isOpen={!!shareModalResume}
        onClose={() => setShareModalResume(null)}
        resume={shareModalResume}
        onUpdate={() => dispatch(getMyResumes())}
      />
    </div>
  );
};

export default MyResumesPage;
