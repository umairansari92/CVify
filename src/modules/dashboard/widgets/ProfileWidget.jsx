import React from "react";
import { m } from "framer-motion";
import Card from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { FaMapMarkerAlt, FaEnvelopeOpenText, FaBriefcase, FaChartLine } from "react-icons/fa";

export const ProfileWidget = ({ user, data, navigate }) => {
  const profile = data?.profile || {};

  return (
    <Card variant="elevated" className="!p-5 lg:!p-6 flex flex-col justify-between h-full border border-border-subtle hover:border-primary/30 transition-all">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Your Profile</h3>
            <p className="text-[11px] text-text-muted mt-0.5">Keep it strong to rank higher.</p>
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
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className="w-full h-full rounded-full object-cover border-2 border-bg-secondary"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-primary/20 border-2 border-bg-secondary flex items-center justify-center font-bold text-xl text-primary">
                  {profile.fullName?.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            {profile.openToWork && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[7px] font-black tracking-wider px-2 py-0.5 rounded-full uppercase shadow-md whitespace-nowrap">
                #OPENTOWORK
              </div>
            )}
          </div>

          <h2 className="text-base font-bold text-text-primary mt-1">{profile.fullName}</h2>
          <p className="text-[11px] text-text-secondary mt-0.5 px-1 leading-snug font-medium line-clamp-2">{profile.headline}</p>

          <div className="flex items-center justify-center gap-1 text-[11px] text-text-muted mt-1.5">
            <FaMapMarkerAlt size={10} className="text-primary" />
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Completion Bar */}
        <div className="mb-4 bg-primary/5 p-3 rounded-xl border border-primary/10">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] font-bold text-text-primary">Profile Completion</span>
            <span className="text-[11px] font-bold text-primary">{profile.completionScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <m.div
              initial={{ width: 0 }}
              animate={{ width: `${profile.completionScore}%` }}
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
            {profile.skills?.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-md border border-primary/20 truncate max-w-[150px]"
              >
                {skill}
              </span>
            ))}
            {(profile.skills?.length || 0) > 4 && (
              <span className="px-2 py-0.5 bg-white/5 text-text-muted text-[10px] font-bold rounded-md border border-border-subtle">
                +{(profile.skills?.length || 0) - 4}
              </span>
            )}
          </div>
        </div>

        {/* About */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-text-primary mb-1">About</p>
          <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
            {profile.bio}
          </p>
        </div>

        {/* Contact */}
        <div className="mb-4 space-y-1.5">
          <p className="text-[11px] font-bold text-text-primary mb-1">Contact</p>
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <FaEnvelopeOpenText size={10} className="shrink-0 text-primary" />
            <span className="truncate">{profile.email}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <FaBriefcase size={10} className="shrink-0 text-primary" />
            <span className="truncate line-clamp-1">{profile.headline}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <FaChartLine size={10} className="shrink-0 text-primary" />
            <span className="truncate">{profile.link}</span>
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
