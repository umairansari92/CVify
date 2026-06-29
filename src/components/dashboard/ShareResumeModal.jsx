import React, { useState, useEffect } from "react";
import { FiX, FiShare2, FiCopy, FiCheck, FiGlobe, FiLock } from "react-icons/fi";
import { m, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import api from "../../api/axios";
import toast from "react-hot-toast";

const ShareResumeModal = ({ isOpen, onClose, resume, onUpdate }) => {
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (resume) {
      setIsPublic(resume.isPublic || false);
    }
  }, [resume]);

  const handleTogglePublic = async () => {
    if (!resume) return;
    setLoading(true);
    try {
      const updatedStatus = !isPublic;
      // Use the existing update endpoint which allows partial updates
      const res = await api.patch(`/resumes/${resume.id || resume._id}`, { isPublic: updatedStatus });
      setIsPublic(updatedStatus);
      toast.success(updatedStatus ? "Resume is now public!" : "Resume is now private.");
      
      // Update local dashboard state seamlessly
      if (onUpdate && res.data) {
        onUpdate({ ...resume, isPublic: updatedStatus });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update sharing settings.");
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = `${window.location.origin}/share/resume/${resume?.id || resume?._id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <m.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <FiShare2 size={20} />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Share Resume</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Status Toggle Area */}
              <div className="flex items-start gap-4 p-4 rounded-xl border bg-slate-900/50 transition-colors border-white/5">
                <div className={`mt-1 p-2 rounded-full ${isPublic ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"}`}>
                  {isPublic ? <FiGlobe size={20} /> : <FiLock size={20} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">
                    {isPublic ? "Public Access On" : "Private Access Only"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {isPublic 
                      ? "Anyone with the link can view this resume. It will not be indexed by search engines." 
                      : "Only you can see this resume. Turn on public access to share it with recruiters."}
                  </p>
                  
                  <Button 
                    variant={isPublic ? "ghost" : "glow"} 
                    className={`w-full ${isPublic ? "!bg-slate-800 hover:!bg-slate-700" : ""}`}
                    onClick={handleTogglePublic}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : (isPublic ? "Make Private" : "Enable Public Link")}
                  </Button>
                </div>
              </div>

              {/* Link Copy Area */}
              <AnimatePresence>
                {isPublic && (
                  <m.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Shareable Link
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 font-mono truncate select-all">
                        {shareUrl}
                      </div>
                      <Button 
                        variant={copied ? "default" : "secondary"}
                        className={`px-4 py-3 h-auto shrink-0 ${copied ? "bg-emerald-500 text-white hover:bg-emerald-600" : ""}`}
                        onClick={handleCopyLink}
                        icon={copied ? FiCheck : FiCopy}
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </div>
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
