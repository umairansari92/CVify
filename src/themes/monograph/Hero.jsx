import React from "react";
import { ArrowRight } from "lucide-react";
import { tokens } from "./tokens";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";

const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  const headline = user?.headline || "";
  const bio = user?.bio || "";
  const location = user?.location || "";
  const isOpenToWork = user?.openToWork ?? true;

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: tokens.colors.pureBlack, color: tokens.colors.paper }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-32 pb-24 md:pt-48 md:pb-32 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">

        {/* Main Content Area */}
        <div className="md:col-span-8 flex flex-col justify-end space-y-8">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <div className={`w-2 h-2 rounded-full ${isOpenToWork ? "bg-green-500 animate-pulse" : "bg-[#78716C]"}`} />
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.borders }}
            >
              {isOpenToWork ? "Available for Work" : "Currently Unavailable"}
            </span>
          </motion.div>

          {/* Name — the big editorial headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: tokens.fonts.heading }}
          >
            <InlineEdit
              isOwner={isOwner}
              id="mg-hero-name"
              value={fullName}
              onSave={(v) => {
                const parts = v.trim().split(" ");
                handleLiveUpdate({ firstName: parts[0] || "", lastName: parts.slice(1).join(" ") || "" });
              }}
            >
              {fullName || "Your Name"}
            </InlineEdit>
          </motion.h1>

          {/* Headline (role/tagline) */}
          {(headline || isOwner) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-2xl leading-snug"
              style={{ color: tokens.colors.borders, fontFamily: tokens.fonts.body }}
            >
              <InlineEdit
                isOwner={isOwner}
                id="mg-hero-headline"
                value={headline}
                onSave={(v) => handleLiveUpdate({ headline: v })}
              >
                {headline || <span className="opacity-40 italic">Add your headline…</span>}
              </InlineEdit>
            </motion.div>
          )}

          {/* View Resume CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="pt-6"
          >
            <button
              onClick={() => setShowResumeModal(true)}
              className="group flex items-center gap-4 border px-8 py-4 text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ fontFamily: tokens.fonts.mono, borderColor: "#444" }}
            >
              <span>View Resume</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        {/* Right Info Column */}
        <div className="md:col-span-4 flex flex-col justify-end space-y-6 md:pb-4 border-l pl-6 md:pl-8"
          style={{ borderColor: "#333333" }}
        >
          {/* Current Role */}
          <div className="space-y-1">
            <h3 className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}>
              Current Role
            </h3>
            <p className="text-sm">
              <InlineEdit
                isOwner={isOwner}
                id="mg-hero-role"
                value={headline}
                onSave={(v) => handleLiveUpdate({ headline: v })}
              >
                {headline || (isOwner ? <span className="italic opacity-40">Add your role…</span> : null)}
              </InlineEdit>
            </p>
          </div>

          {/* Location */}
          {(location || isOwner) && (
            <div className="space-y-1">
              <h3 className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}>
                Location
              </h3>
              <p className="text-sm">
                <InlineEdit
                  isOwner={isOwner}
                  id="mg-hero-location"
                  value={location}
                  onSave={(v) => handleLiveUpdate({ location: v })}
                >
                  {location || <span className="italic opacity-40">Add location…</span>}
                </InlineEdit>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
