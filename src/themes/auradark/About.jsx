import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";

const About = ({ user, isOwner, handleLiveUpdate, handleArrayUpdate, setShowResumeModal }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const bio = user?.bio || "";
  const education = user?.education || [];

  return (
    <section
      ref={ref}
      className="w-full py-24 md:py-32 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: tokens.colors.background }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* LEFT */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section label */}
          <p
            className="text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          >
            THE PROFILE / 01
          </p>

          {/* Giant name */}
          <InlineEdit
            isOwner={isOwner}
            id="ad-about-name"
            value={fullName}
            onSave={(v) => {
              const parts = v.split(" ");
              handleLiveUpdate?.({ firstName: parts[0], lastName: parts.slice(1).join(" ") });
            }}
          >
            <h2
              className="font-black uppercase leading-none tracking-tighter"
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                color: tokens.colors.foreground,
              }}
            >
              {firstName}
              <br />
              <span style={{ color: tokens.colors.primary }}>
                {lastName}.
              </span>
            </h2>
          </InlineEdit>

          {/* Bio */}
          <InlineEdit
            isOwner={isOwner}
            id="ad-about-bio"
            value={bio}
            type="textarea"
            onSave={(v) => handleLiveUpdate?.({ bio: v })}
          >
            <p className="text-base leading-relaxed" style={{ color: tokens.colors.textDim, maxWidth: "520px" }}>
              {bio || "Share your professional background here..."}
            </p>
          </InlineEdit>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            {setShowResumeModal && (
              <button
                onClick={() => setShowResumeModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:scale-105"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: "#000",
                  fontFamily: tokens.fonts.mono,
                }}
              >
                ↓ DOWNLOAD RESUME
              </button>
            )}
            <a
              href="#contact-ad"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest border transition-all hover:scale-105"
              style={{
                borderColor: tokens.colors.borderStrong,
                color: tokens.colors.foreground,
                fontFamily: tokens.fonts.mono,
              }}
            >
              GET IN TOUCH
            </a>
          </div>

          {/* Location */}
          {user?.location && (
            <p
              className="text-xs uppercase tracking-widest flex items-center gap-2"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
            >
              <MapPin size={12} /> {user.location} — OPEN TO REMOTE
            </p>
          )}
        </motion.div>

        {/* RIGHT: Education & Certifications timelines */}
        <div className="flex flex-col gap-12">
          {/* Education */}
          {education.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p
                className="text-xs tracking-[0.25em] uppercase mb-8"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                EDUCATION
              </p>
              <div className="flex flex-col gap-10">
                {education.map((edu, idx) => (
                  <div key={edu._id || idx} className="flex gap-4">
                    <div className="flex flex-col items-center pt-1">
                      <div
                        className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: tokens.colors.textDim }}
                      />
                      {idx < education.length - 1 && (
                        <div className="w-px flex-1 mt-2" style={{ backgroundColor: tokens.colors.borderFaint }} />
                      )}
                    </div>
                    <div className="pb-6">
                      <p
                        className="text-[10px] uppercase tracking-widest mb-2"
                        style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
                      >
                        {edu.startYear || ""}{edu.endYear ? ` — ${edu.endYear}` : " — PRESENT"}
                      </p>
                      <h3
                        className="text-xl font-bold uppercase tracking-tight mb-1"
                        style={{ color: tokens.colors.foreground }}
                      >
                        {edu.school} — {edu.degree}
                      </h3>
                      {(edu.description || edu.fieldOfStudy) && (
                        <p className="text-sm" style={{ color: tokens.colors.textDim }}>
                          {edu.description || edu.fieldOfStudy}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Certifications */}
          {user?.certifications && user.certifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p
                className="text-xs tracking-[0.25em] uppercase mb-8"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
              >
                CERTIFICATIONS
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.certifications.map((cert, idx) => (
                  <div 
                    key={cert._id || idx} 
                    className="p-5 rounded-2xl border flex flex-col justify-between"
                    style={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.01)", 
                      borderColor: tokens.colors.borderFaint 
                    }}
                  >
                    <div>
                      <h4 
                        className="text-sm font-bold uppercase tracking-tight mb-1"
                        style={{ color: tokens.colors.foreground }}
                      >
                        {cert.name}
                      </h4>
                      <p 
                        className="text-[10px] uppercase tracking-widest font-mono mb-2"
                        style={{ color: tokens.colors.primary }}
                      >
                        {cert.issuer}
                      </p>
                      {cert.description && (
                        <p className="text-xs" style={{ color: tokens.colors.textDim }}>
                          {cert.description}
                        </p>
                      )}
                    </div>
                    {cert.link && (
                      <a 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-[9px] uppercase tracking-widest font-bold flex items-center gap-1 hover:text-purple-400 transition-colors"
                        style={{ color: tokens.colors.textDim }}
                      >
                        View Verification ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
