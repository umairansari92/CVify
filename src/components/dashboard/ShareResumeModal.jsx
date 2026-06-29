import React, { useState, useEffect } from "react";
import {
  FiX, FiShare2, FiCopy, FiCheck, FiGlobe, FiLock,
  FiExternalLink, FiRefreshCw, FiEye,
} from "react-icons/fi";
import { m, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// ─── Utility ──────────────────────────────────────────────────────────────────

const formatViews = (n) => (n === 1 ? "1 view" : `${n} views`);

const formatRelativeTime = (date) => {
  if (!date) return null;
  const diff = Date.now() - new Date(date).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 60)  return `${mins || 1} minute${mins === 1 ? "" : "s"} ago`;
  if (hours < 24)  return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

const getShareUrl = (slug) =>
  slug ? `${window.location.origin}/share/r/${slug}` : null;

// ─── Component ────────────────────────────────────────────────────────────────

const ShareResumeModal = ({ isOpen, onClose, resume, onUpdate }) => {
  // Local sharing state mirrors resume.sharing — allows optimistic updates
  const [sharing, setSharing] = useState({ enabled: false, slug: null, views: 0, lastViewedAt: null });
  const [loading, setLoading]           = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [copied, setCopied]             = useState(false);

  // Sync when modal opens or resume prop changes
  useEffect(() => {
    if (resume?.sharing) {
      setSharing({
        enabled:     resume.sharing.enabled || false,
        slug:        resume.sharing.slug    || null,
        views:       resume.sharing.views   || 0,
        lastViewedAt:resume.sharing.lastViewedAt || null,
      });
    } else if (resume) {
      // Older resume objects without sharing object yet
      setSharing({ enabled: false, slug: null, views: 0, lastViewedAt: null });
    }
  }, [resume]);

  const resumeId = resume?.id || resume?._id;
  const shareUrl = getShareUrl(sharing.slug);

  // ── Toggle Public / Private ────────────────────────────────────────────────
  const handleToggle = async () => {
    if (!resume || !resumeId) return;
    setLoading(true);
    const nextEnabled = !sharing.enabled;
    // Optimistic update
    setSharing((prev) => ({ ...prev, enabled: nextEnabled }));
    try {
      const res = await api.patch(`/resumes/${resumeId}`, {
        sharing: { enabled: nextEnabled },
      });
      const updatedSharing = res.data?.sharing;
      if (updatedSharing) {
        setSharing({
          enabled:     updatedSharing.enabled,
          slug:        updatedSharing.slug,
          views:       updatedSharing.views,
          lastViewedAt:updatedSharing.lastViewedAt,
        });
        onUpdate?.({ ...resume, sharing: updatedSharing });
      }
      toast.success(nextEnabled ? "Resume is now public." : "Resume is now private.");
    } catch {
      // Rollback on failure
      setSharing((prev) => ({ ...prev, enabled: !nextEnabled }));
      toast.error("Failed to update sharing settings.");
    } finally {
      setLoading(false);
    }
  };

  // ── Copy Link ──────────────────────────────────────────────────────────────
  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Public link copied successfully.");
    setTimeout(() => setCopied(false), 2500);
  };

  // ── Open Link ─────────────────────────────────────────────────────────────
  const handleOpen = () => {
    if (shareUrl) window.open(shareUrl, "_blank", "noreferrer");
  };

  // ── Regenerate Link ───────────────────────────────────────────────────────
  const handleRegenerate = async () => {
    const confirm = await Swal.fire({
      title: "Regenerate Link?",
      text: "This will permanently invalidate the current link. Anyone who has it will lose access.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Regenerate",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      background: "var(--midground, #1e293b)",
      color: "var(--text-main, #f1f5f9)",
      customClass: { popup: "glass-medium" },
    });

    if (!confirm.isConfirmed) return;

    setRegenerating(true);
    try {
      const res = await api.post(`/resumes/${resumeId}/regenerate-slug`);
      const updatedSharing = res.data?.sharing;
      if (updatedSharing) {
        setSharing((prev) => ({ ...prev, slug: updatedSharing.slug }));
        onUpdate?.({ ...resume, sharing: { ...resume.sharing, ...updatedSharing } });
        toast.success("New link generated. The old link is now invalid.");
      }
    } catch {
      toast.error("Failed to regenerate link.");
    } finally {
      setRegenerating(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-[#0D1829] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                  <FiShare2 size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white leading-tight">Share Resume</h2>
                  <p className="text-[11px] text-slate-500 leading-none mt-0.5 truncate max-w-[220px]">
                    {resume?.personalInfo?.fullName || resume?.title || "Untitled"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">

              {/* ── Section 1: Status Toggle (Recruiter Language) ────────── */}
              <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                sharing.enabled
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-white/5 bg-slate-900/50"
              }`}>
                <div className={`mt-0.5 p-2.5 rounded-xl shrink-0 ${
                  sharing.enabled
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-slate-800 text-slate-500"
                }`}>
                  {sharing.enabled ? <FiGlobe size={18} /> : <FiLock size={18} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${sharing.enabled ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                    <h3 className="text-sm font-bold text-white">
                      {sharing.enabled ? "Public" : "Private"}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {sharing.enabled
                      ? "Anyone with the link can view this resume. Not indexed by search engines."
                      : "Only you can access this resume. Enable public sharing to send a link to recruiters."}
                  </p>

                  <button
                    onClick={handleToggle}
                    disabled={loading}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                      sharing.enabled
                        ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                        : "bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:brightness-110"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading
                      ? "Updating…"
                      : sharing.enabled
                      ? "Disable Sharing"
                      : "Enable Public Link"}
                  </button>
                </div>
              </div>

              {/* ── Section 2: Link + Actions (visible when public) ──────── */}
              <AnimatePresence>
                {sharing.enabled && sharing.slug && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Shareable Link
                    </p>

                    {/* URL bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0 bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 font-mono truncate select-all">
                        {shareUrl}
                      </div>
                      <button
                        onClick={handleCopy}
                        title="Copy link"
                        className={`p-2.5 rounded-xl transition-all shrink-0 ${
                          copied
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                        }`}
                      >
                        {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
                      </button>
                      <button
                        onClick={handleOpen}
                        title="Open in new tab"
                        className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shrink-0"
                      >
                        <FiExternalLink size={15} />
                      </button>
                    </div>

                    {/* Regenerate */}
                    <button
                      onClick={handleRegenerate}
                      disabled={regenerating}
                      className="flex items-center gap-2 text-[11px] text-slate-500 hover:text-red-400 transition-colors disabled:opacity-50"
                    >
                      <FiRefreshCw size={11} className={regenerating ? "animate-spin" : ""} />
                      {regenerating ? "Generating new link…" : "Regenerate link (invalidates current)"}
                    </button>
                  </m.div>
                )}
              </AnimatePresence>

              {/* ── Section 3: Analytics Row ─────────────────────────────── */}
              <AnimatePresence>
                {sharing.enabled && sharing.slug && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-4 py-3 bg-slate-900/60 border border-white/5 rounded-xl"
                  >
                    <FiEye size={13} className="text-slate-500 shrink-0" />
                    <span className="text-xs text-slate-400 font-medium">
                      {formatViews(sharing.views)}
                      {sharing.lastViewedAt && (
                        <span className="text-slate-600">
                          {" · "}Last viewed {formatRelativeTime(sharing.lastViewedAt)}
                        </span>
                      )}
                      {!sharing.lastViewedAt && sharing.views === 0 && (
                        <span className="text-slate-600"> · Not yet viewed</span>
                      )}
                    </span>
                  </m.div>
                )}
              </AnimatePresence>

            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareResumeModal;
