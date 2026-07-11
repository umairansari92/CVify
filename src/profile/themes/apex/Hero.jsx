import React from "react";
import { TypeAnimation } from "react-type-animation";
import InlineEdit from "../../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Developer";

  // Build type sequence from headline
  const typeSeq = [];
  const headline = user?.headline || "Full Stack Developer, UI/UX Designer, Tech Enthusiast";
  headline.split(",").forEach((s) => {
    const t = s.trim();
    if (t) {
      typeSeq.push(t, 2000);
    }
  });
  if (typeSeq.length === 0) {
    typeSeq.push("Developer", 2000);
  }

  const profileImg = user?.profileImage || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`;
  const resumeUrl = user?.branding?.resumeUrl || user?.resumeUrl || null;

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden"
      style={{ backgroundColor: tokens.colors.bg }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="md:col-span-7 space-y-6 text-left order-2 md:order-1">
          <div className="space-y-2">
            <h4
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: tokens.colors.accent }}
            >
              Welcome to my portfolio
            </h4>
            <h1
              className="text-4xl sm:text-6xl font-extrabold tracking-tight"
              style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
            >
              Hi, I'm{" "}
              <InlineEdit
                isOwner={isOwner}
                id="hero-name"
                value={fullName}
                onSave={(v) => {
                  const parts = v.trim().split(" ");
                  const fName = parts[0] || "";
                  const lName = parts.slice(1).join(" ") || "";
                  handleLiveUpdate?.({ firstName: fName, lastName: lName });
                }}
                className="inline-block"
              >
                <span style={{ color: tokens.colors.accent }}>{fullName}</span>
              </InlineEdit>
            </h1>
          </div>

          <div
            className="text-xl sm:text-2xl font-medium min-h-[40px] flex items-center"
            style={{ color: tokens.colors.primary }}
          >
            <span className="mr-2">I am a</span>
            {isOwner ? (
              <InlineEdit
                isOwner={isOwner}
                id="hero-headline"
                value={headline}
                onSave={(v) => handleLiveUpdate?.({ headline: v })}
                className="inline-block"
              >
                <span className="underline decoration-dotted" style={{ color: tokens.colors.accent }}>
                  {headline}
                </span>
              </InlineEdit>
            ) : (
              <TypeAnimation
                sequence={typeSeq}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: tokens.colors.accent }}
              />
            )}
          </div>

          <InlineEdit
            isOwner={isOwner}
            id="hero-bio"
            value={user?.bio || ""}
            type="textarea"
            multiline={true}
            onSave={(v) => handleLiveUpdate?.({ bio: v })}
            className="text-base sm:text-lg leading-relaxed max-w-xl text-slate-400"
          >
            <p style={{ color: tokens.colors.secondary }}>
              {user?.bio || "I am a passionate developer focused on building responsive, user-friendly, and modern web applications."}
            </p>
          </InlineEdit>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#about"
              className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-teal-500/20 text-white"
              style={{
                backgroundColor: tokens.colors.accent,
              }}
            >
              Explore
            </a>
            
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 border hover:bg-white/5 transform hover:-translate-y-1 text-white"
                style={{
                  borderColor: tokens.colors.border,
                }}
              >
                Download CV
              </a>
            ) : (
              <button
                onClick={() => setShowResumeModal?.(true)}
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 border hover:bg-white/5 transform hover:-translate-y-1 text-white"
                style={{
                  borderColor: tokens.colors.border,
                }}
              >
                Download CV
              </button>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div className="md:col-span-5 flex justify-center order-1 md:order-2">
          <div className="relative group">
            {/* Soft glowing background element */}
            <div
              className="absolute -inset-1 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"
              style={{
                background: `radial-gradient(circle, ${tokens.colors.accent} 0%, transparent 70%)`,
              }}
            ></div>
            <img
              src={profileImg}
              alt={fullName}
              className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-full border-4 shadow-2xl transition-all duration-500 hover:scale-105"
              style={{
                borderColor: tokens.colors.accent,
                filter: `drop-shadow(0 10px 20px ${tokens.colors.accent}40)`,
              }}
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`;
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
