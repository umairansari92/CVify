import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Testimonials = ({ user, isOwner, handleArrayUpdate }) => {
  const testimonials = user?.testimonials || [];
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
              (07)
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
            Endorsements
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((test, i) => (
            <motion.div
              key={test._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
              className="p-8 border rounded-2xl flex flex-col justify-between gap-8 h-full"
              style={{ backgroundColor: tokens.colors.cardBg, borderColor: tokens.colors.border }}
            >
              <div>
                <span
                  className="text-4xl leading-none opacity-20 mb-6 block"
                  style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
                >
                  "
                </span>
                <p className="text-base leading-relaxed" style={{ color: tokens.colors.primary }}>
                  {test.text || test.content || test.testimonial}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: tokens.colors.border }}>
                {(test.image || test.avatar) ? (
                  <img
                    src={test.image || test.avatar}
                    alt={test.author || test.name}
                    className="w-10 h-10 rounded-full object-cover grayscale"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border"
                    style={{ borderColor: tokens.colors.border, backgroundColor: "rgba(255,255,255,0.02)" }}
                  >
                    <span className="text-xs font-medium" style={{ color: tokens.colors.secondary }}>
                      {(test.author || test.name)?.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium" style={{ color: tokens.colors.primary }}>
                    {test.author || test.name}
                  </span>
                  <span
                    className="text-[10px] uppercase font-bold tracking-widest mt-1"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
                  >
                    {test.position || test.role || test.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
