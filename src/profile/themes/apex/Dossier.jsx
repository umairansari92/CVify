import React from "react";
import { tokens } from "./tokens";

const Dossier = ({ user, isOwner, setShowResumeModal }) => {
  const resumeUrl = user?.branding?.resumeUrl || user?.resumeUrl || null;

  return (
    <section
      id="dossier"
      className="py-24 relative overflow-hidden border-t"
      style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
    >
      <div className="max-w-3xl mx-auto px-6 w-full relative z-10 text-center">

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-8"
          style={{ backgroundColor: `${tokens.colors.accent}20` }}
        >
          📄
        </div>

        <h2
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
        >
          My Resume / CV
        </h2>

        <p className="text-base mb-10" style={{ color: tokens.colors.secondary }}>
          View or download my latest resume to learn more about my professional experience,
          skills, and qualifications.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setShowResumeModal?.(true)}
            className="px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-teal-500/20"
            style={{ backgroundColor: tokens.colors.accent }}
          >
            View CV Online
          </button>

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border transform hover:-translate-y-1 hover:bg-white/5 text-white"
              style={{ borderColor: tokens.colors.border }}
            >
              Download PDF
            </a>
          )}
        </div>

      </div>
    </section>
  );
};

export default Dossier;
