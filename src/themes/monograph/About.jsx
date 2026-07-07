import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";

const About = ({ user, isOwner, handleLiveUpdate }) => {
  return (
    <section 
      id="about" 
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: tokens.colors.paper, color: tokens.colors.primaryText }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-20">
        
        {/* Left Column (Section Title) */}
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
            >
              Background
            </h2>
            <h3 
              className="text-3xl font-bold leading-tight"
              style={{ fontFamily: tokens.fonts.heading }}
            >
              About Me
            </h3>
          </motion.div>
        </div>

        {/* Right Column (Content) */}
        <div className="md:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-lg max-w-none"
            style={{ fontFamily: tokens.fonts.body, color: tokens.colors.primaryText }}
          >
            <p className="leading-relaxed whitespace-pre-wrap text-lg text-[#292524]">
              <InlineEdit
                value={user?.about || "I am a passionate developer focused on crafting clean, editorial interfaces."}
                onSave={(val) => handleLiveUpdate("about", null, val)}
                isOwner={isOwner}
                multiline
                placeholder="Write your story here..."
              />
            </p>
          </motion.div>

          {/* Quick Stats or Metadata (Optional) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t"
            style={{ borderColor: tokens.colors.borders }}
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}>Years Active</p>
              <p className="text-xl font-bold" style={{ fontFamily: tokens.fonts.mono }}>
                <InlineEdit
                  value={user?.yearsOfExperience || "5+"}
                  onSave={(val) => handleLiveUpdate("yearsOfExperience", null, val)}
                  isOwner={isOwner}
                  placeholder="e.g. 5+"
                />
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}>Main Focus</p>
              <p className="text-xl font-bold" style={{ fontFamily: tokens.fonts.mono }}>
                <InlineEdit
                  value={user?.header?.currentRole || "Engineering"}
                  onSave={(val) => handleLiveUpdate("header", "currentRole", val)}
                  isOwner={isOwner}
                  placeholder="Focus area"
                />
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
