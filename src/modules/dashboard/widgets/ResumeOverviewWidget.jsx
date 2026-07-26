import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Card from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { FaFileAlt, FaSearchPlus } from "react-icons/fa";
import { FiPlus, FiMoreVertical, FiEdit2, FiShare2, FiTrash2, FiCopy } from "react-icons/fi";

export const ResumeOverviewWidget = ({ data, navigate }) => {
  const resumes = data?.resumes || [];
  const [activeMenuId, setActiveMenuId] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-text-primary tracking-tight">Active Resumes</h2>
          <Badge variant="default">{resumes.length}</Badge>
        </div>
        <Button variant="ghost" onClick={() => navigate("/resume-builder/create")} icon={FiPlus} className="!text-xs !h-8 !px-3">
          New Resume
        </Button>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center p-10 border border-dashed border-border-subtle rounded-3xl text-text-muted">
          <FaFileAlt size={28} className="mx-auto mb-2 opacity-30" />
          <p className="font-semibold text-sm">No resumes yet</p>
          <p className="text-xs mt-0.5">Create your first resume to unlock AI features (Est. 8 min).</p>
          <Button variant="glow" onClick={() => navigate("/resume-builder/create")} icon={FiPlus} className="mt-3 !h-9 !text-xs">
            Create First Resume
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumes.map((resume) => (
            <m.div key={resume.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Card variant="elevated" className="!p-5 flex flex-col justify-between gap-4 h-full border border-border-subtle hover:border-primary/30 transition-all relative">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-text-primary truncate mb-0.5">{resume.title}</h3>
                    <p className="text-[11px] text-text-muted uppercase tracking-wider font-semibold">
                      {resume.jobTitle || resume.status || "Draft"} • Updated {new Date(resume.updatedAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {resume.atsScore ? (
                      <Badge variant={resume.atsScore > 75 ? "score" : "warning"} className="!text-[10px]">
                        ATS {resume.atsScore}
                      </Badge>
                    ) : null}
                    
                    {/* Overflow Menu Button */}
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === resume.id ? null : resume.id)}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted transition-colors"
                    >
                      <FiMoreVertical size={14} />
                    </button>
                  </div>
                </div>

                {/* Primary Action Button (Clean SaaS Pattern) */}
                <Button
                  variant="glow"
                  onClick={() => navigate(`/resume-builder/editor/${resume.id}`)}
                  className="w-full !h-8 !text-xs font-bold"
                >
                  Continue Editing ➔
                </Button>

                {/* Overflow Dropdown */}
                <AnimatePresence>
                  {activeMenuId === resume.id && (
                    <m.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-4 top-12 z-50 bg-midground border border-border-subtle rounded-xl p-1.5 shadow-2xl w-40 space-y-1"
                    >
                      <button
                        onClick={() => { setActiveMenuId(null); navigate("/ats", { state: { preSelectedResumeId: resume.id } }); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-bold text-text-secondary hover:text-text-main hover:bg-white/5 flex items-center gap-2"
                      >
                        <FaSearchPlus size={12} />
                        <span>Run ATS Scan</span>
                      </button>
                      <button
                        onClick={() => { setActiveMenuId(null); navigate(`/resume-builder/editor/${resume.id}`); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-bold text-text-secondary hover:text-text-main hover:bg-white/5 flex items-center gap-2"
                      >
                        <FiEdit2 size={12} />
                        <span>Edit Full Details</span>
                      </button>
                    </m.div>
                  )}
                </AnimatePresence>
              </Card>
            </m.div>
          ))}
        </div>
      )}
    </div>
  );
};
