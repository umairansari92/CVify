import React from "react";
import InlineEdit from "../../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const About = ({ user, isOwner, handleLiveUpdate }) => {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Developer";

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: tokens.colors.bg }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Code Mockup Window */}
        <div className="md:col-span-6 order-2 md:order-1">
          <div
            className="w-full rounded-2xl border shadow-2xl overflow-hidden font-mono text-sm text-left"
            style={{
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            }}
          >
            {/* Window bar */}
            <div
              className="px-4 py-3 flex items-center justify-between border-b"
              style={{ borderColor: tokens.colors.border }}
            >
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-slate-500">developer.js</span>
              <div className="w-12"></div> {/* Spacer */}
            </div>
            {/* Terminal Body */}
            <div className="p-6 space-y-2">
              <p><span className="text-pink-400">const</span> developer = &#123;</p>
              <p className="pl-4">name: <span className="text-emerald-400">"{fullName}"</span>,</p>
              <p className="pl-4">role: <span className="text-emerald-400">"{user?.headline?.split(",")?.[0]?.trim() || "Frontend Developer"}"</span>,</p>
              <p className="pl-4">location: <span className="text-emerald-400">"{user?.location || "Earth"}"</span>,</p>
              <p className="pl-4">openToWork: <span className="text-amber-400">{user?.openToWork !== false ? "true" : "false"}</span>,</p>
              <p className="pl-4">skills: [</p>
              <p className="pl-8 text-cyan-400">
                "HTML", "CSS", "JavaScript", "React", "Tailwind"
              </p>
              <p className="pl-4">]</p>
              <p>&#125;;</p>
            </div>
          </div>
        </div>

        {/* Right Side: Text info */}
        <div className="md:col-span-6 space-y-6 text-left order-1 md:order-2">
          <div className="space-y-2">
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
            >
              About Me
            </h2>
            <div className="h-1 w-20 rounded-full" style={{ backgroundColor: tokens.colors.accent }}></div>
          </div>

          <h3
            className="text-xl sm:text-2xl font-bold"
            style={{ color: tokens.colors.primary }}
          >
            I'm {fullName}
            <span style={{ color: tokens.colors.accent }}>.</span>
          </h3>

          <InlineEdit
            isOwner={isOwner}
            id="about-bio"
            value={user?.bio || ""}
            type="textarea"
            multiline={true}
            onSave={(v) => handleLiveUpdate?.({ bio: v })}
            className="text-base leading-relaxed"
          >
            <p style={{ color: tokens.colors.secondary }}>
              {user?.bio || "I am a dedicated Developer with a passion for creating visually appealing and user-friendly websites. I enjoy turning ideas into responsive and interactive digital experiences while continuously learning new skills."}
            </p>
          </InlineEdit>

          {user?.location && (
            <div className="flex items-center space-x-3">
              <span className="text-slate-400 text-sm font-semibold">Location:</span>
              <span className="text-white text-sm">{user.location}</span>
            </div>
          )}

          <div className="pt-4">
            <a
              href="#showcase"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5"
              style={{
                backgroundColor: tokens.colors.accent,
              }}
            >
              View Projects
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
