import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "./tokens";

const AuraDarkNav = ({ setShowResumeModal }) => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "ABOUT",    id: "about-ad",   num: "01" },
    { label: "JOURNEY",  id: "experience-ad", num: "02" },
    { label: "SKILLS",   id: "skills-ad",  num: "03" },
    { label: "PROJECTS", id: "showcase-ad",num: "04" },
    { label: "CONTACT",  id: "contact-ad", num: "05" },
  ];

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* Fixed minimal bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 py-5"
        style={{ pointerEvents: "none" }}
      >
        {/* Hamburger */}
        <button
          className="p-2 flex flex-col gap-[5px] group cursor-pointer"
          style={{ pointerEvents: "auto" }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span
            className="block w-6 h-[1.5px] transition-all duration-300"
            style={{ backgroundColor: tokens.colors.textDim }}
          />
          <span
            className="block w-4 h-[1.5px] transition-all duration-300 group-hover:w-6"
            style={{ backgroundColor: tokens.colors.textDim }}
          />
          <span
            className="block w-6 h-[1.5px] transition-all duration-300"
            style={{ backgroundColor: tokens.colors.textDim }}
          />
        </button>

        {/* CONTACT pill button */}
        <button
          onClick={() => {
            setOpen(false);
            document.getElementById("contact-ad")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-105"
          style={{
            pointerEvents: "auto",
            backgroundColor: tokens.colors.primary,
            color: "#000",
            fontFamily: tokens.fonts.mono,
          }}
        >
          CONTACT
          <span className="text-xs">⚙</span>
        </button>
      </div>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[500] flex flex-col"
            style={{ backgroundColor: "rgba(0,0,0,0.96)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button top-right */}
            <div className="flex items-center justify-between px-6 md:px-10 py-5">
              <p
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
              >
                EXPLORE ARCHIVE
              </p>
              <button
                onClick={() => setOpen(false)}
                className="text-xl hover:rotate-90 transition-transform duration-300"
                style={{ color: tokens.colors.textDim }}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 flex flex-col justify-center px-10 md:px-16 gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center gap-6 group text-left py-3 border-b"
                  style={{ borderColor: tokens.colors.borderFaint }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ x: 16 }}
                >
                  <span
                    className="text-xs tabular-nums"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="font-black uppercase leading-none tracking-tighter group-hover:text-purple-400 transition-colors"
                    style={{
                      fontFamily: tokens.fonts.display,
                      fontSize: "clamp(2.5rem, 6vw, 5rem)",
                      color: tokens.colors.textDim,
                    }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom: blurred portrait hint */}
            <div className="h-32 flex items-end justify-end px-10 pb-8 opacity-20 pointer-events-none select-none">
              <p
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
              >
                © {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuraDarkNav;
