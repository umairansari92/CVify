import React from "react";
import { ArrowRight } from "lucide-react";
import { tokens } from "./tokens";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";

const Hero = ({ user, isOwner, handleLiveUpdate, setShowResumeModal }) => {
  return (
    <section 
      id="home" 
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: tokens.colors.pureBlack, color: tokens.colors.paper }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-32 pb-24 md:pt-48 md:pb-32 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        {/* Main Content Area */}
        <div className="md:col-span-8 flex flex-col justify-end space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span 
              className="text-xs uppercase tracking-[0.2em]" 
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.borders }}
            >
              Available for Work
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight"
            style={{ fontFamily: tokens.fonts.heading }}
          >
            <InlineEdit
              value={user?.header?.heading || "Building Digital Experiences"}
              onSave={(val) => handleLiveUpdate("header", "heading", val)}
              isOwner={isOwner}
              placeholder="Your Headline Here"
            />
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: tokens.colors.borders }}
          >
            <InlineEdit
              value={user?.header?.subheading || "A brief description of what you do and your approach."}
              onSave={(val) => handleLiveUpdate("header", "subheading", val)}
              isOwner={isOwner}
              placeholder="Your Subheading Here"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="pt-8"
          >
            <button 
              onClick={() => setShowResumeModal(true)}
              className="group flex items-center gap-4 border px-8 py-4 text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black"
              style={{ 
                fontFamily: tokens.fonts.mono, 
                borderColor: tokens.colors.borders 
              }}
            >
              <span>View Resume</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </motion.div>

        </div>

        {/* Info Column */}
        <div className="md:col-span-4 flex flex-col justify-end space-y-6 md:pb-4 border-l pl-6 md:pl-8 border-[#333333]">
          <div className="space-y-1">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#78716C]" style={{ fontFamily: tokens.fonts.mono }}>Current Role</h3>
            <p className="text-sm">
              <InlineEdit
                value={user?.header?.currentRole || "Full Stack Developer"}
                onSave={(val) => handleLiveUpdate("header", "currentRole", val)}
                isOwner={isOwner}
              />
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#78716C]" style={{ fontFamily: tokens.fonts.mono }}>Location</h3>
            <p className="text-sm">
              <InlineEdit
                value={user?.location || "Planet Earth"}
                onSave={(val) => handleLiveUpdate("location", null, val)}
                isOwner={isOwner}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
