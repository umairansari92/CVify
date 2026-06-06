import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { tokens } from "./tokens";

const Experience = ({ user, isOwner, handleArrayUpdate }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const experience = user?.experience || [];

  if (!experience.length) return null;

  return (
    <section
      ref={ref}
      className="w-full py-24 px-8 md:px-16 lg:px-24 border-t"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          className="text-xs tracking-[0.25em] uppercase mb-12"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          EXPERIENCE
        </motion.p>
        <div className="flex flex-col gap-10">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp._id || idx}
              className="flex gap-4 pb-10 border-b"
              style={{ borderColor: tokens.colors.borderFaint }}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="flex flex-col items-center pt-1">
                <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: tokens.colors.textDim }} />
              </div>
              <div>
                <p
                  className="text-[10px] uppercase tracking-widest mb-2"
                  style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
                >
                  {exp.startDate ? new Date(exp.startDate).getFullYear() : ""}
                  {" — "}
                  {exp.endDate ? new Date(exp.endDate).getFullYear() : "PRESENT"}
                </p>
                <h3
                  className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2"
                  style={{ color: tokens.colors.foreground }}
                >
                  {exp.company} — {exp.role || exp.position}
                </h3>
                {(exp.achievements || exp.description) && (
                  <p 
                    className="text-sm max-w-2xl whitespace-pre-wrap leading-relaxed" 
                    style={{ color: tokens.colors.textDim }}
                  >
                    {exp.achievements || exp.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
