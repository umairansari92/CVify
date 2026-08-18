import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { m, AnimatePresence } from "framer-motion";
import Card from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import ShareResumeModal from "../../../components/dashboard/ShareResumeModal";
import { deleteResume, cloneResume, getMyResumes } from "../../../features/resume/resumeThunk";
import { fetchDashboardData } from "../../../features/dashboard/dashboardThunk";

import { FaFileAlt, FaSearchPlus, FaShareAlt, FaCopy, FaTrashAlt, FaEdit, FaFilePdf } from "react-icons/fa";
import { FiPlus, FiMoreVertical, FiArrowRight } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export const ResumeOverviewWidget = ({ data, navigate }) => {
  const dispatch = useDispatch();
  const resumes = data?.resumes || [];
  
  // Dashboard Progressive Disclosure: Max 3 resumes on Dashboard Home Screen
  const dashboardResumes = resumes.slice(0, 3);

  // Modal State
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [shareModalResume, setShareModalResume] = useState(null);

  // Handlers
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
      toast.success("Resume duplicated successfully!");
      dispatch(fetchDashboardData());
    } catch (err) {
      toast.error(err?.message || "Failed to duplicate resume.");
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
        dispatch(fetchDashboardData());
      } catch (err) {
        toast.error(err || "Failed to delete resume.");
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-text-primary tracking-tight">Active Resumes</h2>
          <Badge variant="default">{resumes.length}</Badge>
        </div>
        
        {resumes.length > 0 && (
          <button
            onClick={() => navigate("/resume-builder/my-resumes")}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 transition-all"
          >
            <span>View All Resumes ({resumes.length})</span>
            <FiArrowRight size={12} />
          </button>
        )}
      </div>

      {resumes.length === 0 ? (
        <Card variant="glass" className="text-center p-8 border border-dashed border-border-subtle rounded-2xl text-text-muted">
          <FaFileAlt size={28} className="mx-auto mb-2 opacity-30 text-primary" />
          <p className="font-bold text-sm text-text-primary">No resumes yet</p>
          <p className="text-xs mt-0.5 text-text-muted">Create your first resume to unlock AI scoring & career optimization.</p>
          <Button variant="glow" onClick={() => navigate("/resume-builder/create")} icon={FiPlus} className="mt-4 !h-9 !text-xs font-bold">
            Create First Resume
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardResumes.map((resume) => {
            const resumeId = resume.id || resume._id;
            return (
              <m.div key={resumeId} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Card variant="elevated" className="!p-4 flex flex-col justify-between gap-3 h-full border border-border-subtle hover:border-primary/30 transition-all relative">
                  
                  {/* Top Row: Title + Status + Overflow Button */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-text-primary truncate mb-0.5" title={resume.title}>
                        {resume.title || "Untitled Resume"}
                      </h3>
                      <p className="text-[10px] text-text-muted font-medium">
                        Updated {new Date(resume.updatedAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {resume.atsScore ? (
                        <Badge variant={resume.atsScore >= 75 ? "score" : "warning"} className="!text-[9px] !px-1.5 !py-0.2">
                          ATS {resume.atsScore}
                        </Badge>
                      ) : null}

                      {/* 3-Dot Overflow Menu Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === resumeId ? null : resumeId);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors"
                        title="Actions"
                      >
                        <FiMoreVertical size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Document Preview Card Graphic */}
                  <div 
                    onClick={() => navigate(`/resume-builder/editor/${resumeId}`)}
                    className="relative w-full h-24 rounded-xl bg-midground/80 border border-border-subtle p-3 flex flex-col justify-between overflow-hidden cursor-pointer group hover:border-primary/40 transition-all"
                  >
                    {/* Background Document Grid */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[9px] font-black uppercase text-primary tracking-wider flex items-center gap-1">
                        <FaFilePdf size={10} />
                        {resume.templateId || "Modern Template"}
                      </span>
                      <span className="text-[9px] text-text-muted font-mono">
                        {resume.sharing?.enabled ? "🌐 Public" : "🔒 Private"}
                      </span>
                    </div>

                    <div className="space-y-1 relative z-10 my-auto">
                      <div className="h-1.5 bg-text-primary/20 rounded-full w-3/4" />
                      <div className="h-1 bg-text-muted/20 rounded-full w-1/2" />
                      <div className="h-1 bg-text-muted/15 rounded-full w-2/3" />
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-text-muted relative z-10 pt-1 border-t border-white/5">
                      <span>CVify Document</span>
                      <span className="group-hover:text-primary transition-colors font-bold flex items-center gap-0.5">
                        Edit ➔
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <Button
                    variant="glow"
                    onClick={() => navigate(`/resume-builder/editor/${resumeId}`)}
                    className="w-full !h-8 !text-xs font-bold mt-1"
                  >
                    Continue Editing ➔
                  </Button>

                  {/* Reconnected Overflow Dropdown Menu */}
                  <AnimatePresence>
                    {activeMenuId === resumeId && (
                      <m.div
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        className="absolute right-3 top-10 z-50 bg-[#18181b] border border-border-subtle rounded-xl p-1.5 shadow-2xl w-44 space-y-0.5"
                      >
                        <button
                          onClick={() => { setActiveMenuId(null); navigate(`/resume-builder/editor/${resumeId}`); }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-text-secondary hover:text-text-primary hover:bg-white/10 flex items-center gap-2 transition-colors"
                        >
                          <FaEdit size={11} className="text-blue-400" />
                          <span>Edit Resume</span>
                        </button>
                        <button
                          onClick={() => { setActiveMenuId(null); navigate("/ats/scan", { state: { preSelectedResumeId: resumeId } }); }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-text-secondary hover:text-text-primary hover:bg-white/10 flex items-center gap-2 transition-colors"
                        >
                          <FaSearchPlus size={11} className="text-emerald-400" />
                          <span>ATS Scan</span>
                        </button>
                        <button
                          onClick={(e) => handleOpenShare(resume, e)}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-text-secondary hover:text-text-primary hover:bg-white/10 flex items-center gap-2 transition-colors"
                        >
                          <FaShareAlt size={11} className="text-purple-400" />
                          <span>Share Link</span>
                        </button>
                        <button
                          onClick={(e) => handleClone(resumeId, e)}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-text-secondary hover:text-text-primary hover:bg-white/10 flex items-center gap-2 transition-colors"
                        >
                          <FaCopy size={11} className="text-amber-400" />
                          <span>Duplicate</span>
                        </button>
                        <div className="my-1 border-t border-border-subtle" />
                        <button
                          onClick={(e) => handleDelete(resumeId, resume.title, e)}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                        >
                          <FaTrashAlt size={11} />
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

      {/* Share Resume Modal Component */}
      <ShareResumeModal
        isOpen={!!shareModalResume}
        onClose={() => setShareModalResume(null)}
        resume={shareModalResume}
        onUpdate={() => dispatch(fetchDashboardData())}
      />
    </div>
  );
};
