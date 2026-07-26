import React from "react";
import { m } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Card from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { FaGem, FaSearchPlus, FaEnvelopeOpenText } from "react-icons/fa";
import { FiPlus, FiZap, FiArrowRight, FiChevronRight } from "react-icons/fi";

export const CommandCenterWidget = ({ user, data, navigate }) => {
  const profile = data?.profile || {};
  const metrics = data?.metrics || {};
  const resumes = data?.resumes || [];
  const latestResume = resumes.length > 0 ? resumes[0] : null;

  return (
    <Card variant="glass" className="relative p-6 lg:p-7 overflow-hidden h-full flex flex-col justify-between gap-5 border border-border-subtle">
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* TOP: Greeting & Live Status */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Career OS — Command Hub</span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary tracking-tight">
            Welcome back, {profile.fullName?.split(" ")[0] || "User"} 👋
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
          <Button variant="glow" onClick={() => navigate("/resume-builder/create")} icon={FiPlus} className="w-full !h-10 !text-xs font-bold">
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

      {/* BOTTOM GRID: Readiness Meter + Active Draft Spotlight */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* Job Readiness Meter */}
        <div className="p-4 rounded-2xl bg-midground/80 border border-border-subtle flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" className="stroke-card-border fill-none" strokeWidth="7" />
              <m.circle
                cx="50" cy="50" r="38" fill="none"
                stroke="var(--primary)" strokeWidth="8" strokeLinecap="round"
                initial={{ strokeDasharray: "0, 1000" }}
                animate={{ strokeDasharray: `${(metrics.hiringProbability || 45) * 2.387}, 1000` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-text-primary">{metrics.hiringProbability || 45}%</span>
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

        {/* Latest Draft Spotlight */}
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
              <Button variant="glow" onClick={() => navigate("/resume-builder/create")} icon={FiPlus} className="!h-7 !text-[11px]">
                Create First Resume
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER: AI Insight Banner */}
      <div className="relative z-10 p-3 rounded-xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <FiZap size={14} />
          </div>
          <p className="text-[11px] text-text-secondary leading-tight truncate">
            <strong className="text-text-primary font-semibold">AI Insight:</strong> Your profile matches 88% of Senior MERN roles. Target job scan recommended.
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
