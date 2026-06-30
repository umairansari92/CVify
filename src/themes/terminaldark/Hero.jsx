import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";

const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  const firstName = user?.firstName || user?.name?.split(" ")[0] || "Developer";

  const rawHeadline = user?.headline || "";
  const typeSequence = [];
  if (rawHeadline) {
    rawHeadline.split(",").forEach((s) => {
      const trimmed = s.trim();
      if (trimmed) typeSequence.push(trimmed, 2000);
    });
  }
  if (typeSequence.length === 0) {
    typeSequence.push("Building things", 2000, "Breaking bugs", 2000, "Shipping ideas", 2000);
  }

  return (
    <section className="relative mx-auto flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      {/* Background SVG Wave Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke={tokens.colors.accent} strokeWidth="0.5" />
          <path d="M0,60 Q25,35 50,60 T100,60" fill="none" stroke={tokens.colors.accent} strokeWidth="0.3" />
          <path d="M0,40 Q25,15 50,40 T100,40" fill="none" stroke={tokens.colors.accent} strokeWidth="0.4" />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(145,94,255,0.16),_transparent_42%)]" />

      <div className="z-10 mx-auto mt-8 flex w-full max-w-7xl flex-col items-center gap-16 lg:flex-row">
        
        {/* Left Column: Intro */}
        <div className="flex flex-row items-start gap-5 flex-1">
          {/* Vertical Purple Line */}
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915eff]" />
            <div className="w-1 sm:h-80 h-40" style={{ background: "linear-gradient(180deg, #915eff 0%, rgba(145, 94, 255, 0) 100%)" }} />
          </div>

          <div>
            <h1 className="font-black text-white lg:text-[70px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[85px] mt-2">
              Hello World, <br />
              I'm{" "}
              <InlineEdit
                isOwner={isOwner}
                id="td-hero-firstname"
                value={fullName}
                onSave={(v) => {
                  const parts = v.split(" ");
                  handleLiveUpdate?.({ firstName: parts[0], lastName: parts.slice(1).join(" ") });
                }}
              >
                <span className="text-[#915eff]">{fullName || "Developer"}</span>
              </InlineEdit>
            </h1>

            <InlineEdit
              isOwner={isOwner}
              id="td-hero-headline"
              value={user?.headline || ""}
              onSave={(v) => handleLiveUpdate?.({ headline: v })}
            >
              <div className="text-[#aaa6c3] font-medium lg:text-[25px] sm:text-[22px] xs:text-[18px] text-[16px] lg:leading-[35px] mt-4 max-w-lg min-h-[70px] sm:min-h-[80px]">
                <TypeAnimation
                  sequence={typeSequence}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
            </InlineEdit>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById("contact-td")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 rounded-xl bg-[#915eff] px-8 py-3 font-bold text-white shadow-[0_0_15px_rgba(145,94,255,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7a4ce6] hover:shadow-[0_0_25px_rgba(145,94,255,0.6)]"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
                Hire Me
              </button>
              <button
                onClick={() => setShowResumeModal(true)}
                className="flex items-center gap-2 rounded-xl border border-[#915eff] bg-transparent px-8 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#915eff]/10"
              >
                Download CV
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Glowing Profile Image */}
        <div className="flex-1 flex justify-center lg:justify-end items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-72 h-72 lg:w-96 lg:h-96"
          >
            <div className="absolute inset-0 rounded-full bg-[#915eff] blur-[80px] opacity-20 animate-pulse" />
            <div className="absolute inset-0 rounded-2xl border-2 border-[#915eff]/30 rotate-6" />
            <div className="absolute inset-0 rounded-2xl border-2 border-[#915eff]/30 -rotate-3" />
            
            <div className="absolute inset-0 bg-[#151030] rounded-2xl overflow-hidden border border-[#915eff]/50 shadow-[0_0_30px_rgba(145,94,255,0.3)] z-10 flex items-center justify-center">
              {user?.profileImage || user?.profilePicture || user?.avatar ? (
                <img
                  src={user.profileImage || user.profilePicture || user.avatar}
                  alt={firstName}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#915eff] flex items-center justify-center text-4xl text-white font-black shadow-[0_0_30px_rgba(145,94,255,0.6)]">
                  {firstName.charAt(0)}
                </div>
              )}
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-[#151030] border border-[#915eff]/50 px-4 py-2 rounded-lg z-20 shadow-xl"
            >
              <p className="text-white text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for Work
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
