import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";

const Testimonials = ({ user, isOwner, handleArrayUpdate }) => {
  const testimonials = user?.testimonials || [];

  if (testimonials.length === 0) return null;

  return (
    <section
      className="py-20 md:py-32 border-t"
      style={{
        backgroundColor: tokens.colors.paper,
        borderColor: tokens.colors.borders,
        color: tokens.colors.primaryText,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="text-xs uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
          >
            Trust Signals
          </h2>
          <h3
            className="text-3xl font-bold leading-tight"
            style={{ fontFamily: tokens.fonts.heading }}
          >
            Client Testimonials
          </h3>
        </motion.div>

        <div className="space-y-24">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div 
                className="text-6xl leading-none opacity-20 mb-4" 
                style={{ fontFamily: tokens.fonts.heading }}
              >
                "
              </div>
              <blockquote 
                className="text-xl md:text-2xl italic leading-relaxed mb-8"
                style={{ fontFamily: tokens.fonts.body, color: tokens.colors.primaryText }}
              >
                <InlineEdit 
                  isOwner={isOwner} 
                  value={testimonial.text || testimonial.quote} 
                  onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, text: v })}
                >
                  {testimonial.text || testimonial.quote}
                </InlineEdit>
              </blockquote>
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold uppercase tracking-wider text-sm" style={{ fontFamily: tokens.fonts.heading }}>
                  <InlineEdit 
                    isOwner={isOwner} 
                    value={testimonial.author || testimonial.name} 
                    onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, author: v })}
                  >
                    {testimonial.author || testimonial.name}
                  </InlineEdit>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}>
                  <InlineEdit 
                    isOwner={isOwner} 
                    value={testimonial.position || testimonial.title} 
                    onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, position: v })}
                  >
                    {testimonial.position || testimonial.title}
                  </InlineEdit>
                  {(testimonial.company) && (
                    <>
                      <span className="mx-2">—</span>
                      <InlineEdit 
                        isOwner={isOwner} 
                        value={testimonial.company} 
                        onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, company: v })}
                      >
                        {testimonial.company}
                      </InlineEdit>
                    </>
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
