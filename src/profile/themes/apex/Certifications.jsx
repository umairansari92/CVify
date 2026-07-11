import React from "react";
import InlineEdit from "../../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Certifications = ({ user, isOwner, handleArrayUpdate }) => {
  const list = Array.isArray(user?.certifications) ? user.certifications : [];
  if (list.length === 0 && !isOwner) return null;

  return (
    <section
      id="certifications"
      className="py-24 relative overflow-hidden border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
          >
            Certifications
          </h2>
          <p className="text-sm font-medium uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
            Professional Accreditations
          </p>
          <div className="h-1 w-20 rounded-full mx-auto" style={{ backgroundColor: tokens.colors.accent }}></div>
        </div>

        {list.length === 0 && isOwner ? (
          <div
            className="text-center py-10 rounded-2xl border"
            style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
          >
            <p>Add certifications from your profile editor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((cert, index) => (
              <div
                key={cert?._id || index}
                className="p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:border-teal-500/30 hover:-translate-y-1"
                style={{
                  backgroundColor: tokens.colors.surface,
                  borderColor: tokens.colors.border,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${tokens.colors.accent}20` }}
                  >
                    🏅
                  </div>
                  <div className="flex-1 min-w-0">
                    <InlineEdit
                      isOwner={isOwner}
                      id={`cert-name-${index}`}
                      value={cert?.name || ""}
                      onSave={(v) => handleArrayUpdate?.("certifications", index, { name: v })}
                    >
                      <h3 className="text-sm font-bold leading-snug" style={{ color: tokens.colors.primary }}>
                        {cert?.name || "Certification Name"}
                      </h3>
                    </InlineEdit>

                    <InlineEdit
                      isOwner={isOwner}
                      id={`cert-issuer-${index}`}
                      value={cert?.issuer || ""}
                      onSave={(v) => handleArrayUpdate?.("certifications", index, { issuer: v })}
                    >
                      <p className="text-xs font-semibold mt-1" style={{ color: tokens.colors.accent }}>
                        {cert?.issuer || "Issuer"}
                      </p>
                    </InlineEdit>

                    {cert?.date && (
                      <p className="text-xs mt-1" style={{ color: tokens.colors.secondary }}>
                        {cert.date}
                      </p>
                    )}

                    {cert?.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs mt-2 underline"
                        style={{ color: tokens.colors.accent }}
                      >
                        View Credential →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Certifications;
