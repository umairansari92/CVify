import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import InlineEdit from "../InlineEdit";

const Testimonials = React.memo(({ user, isOwner, handleLiveUpdate, displayValue }) => {
  const testimonials = user?.testimonials || [
    {
      name: "Alex Rivera",
      role: "Engineering Manager",
      company: "TechFlow Systems",
      content: "An exceptional professional who consistently delivers high-quality code. Their ability to solve complex architectural challenges is truly impressive.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Lead Designer",
      company: "Creative Pulse",
      content: "Working together was a breeze. They have a keen eye for detail and perfectly translated my designs into a pixel-perfect reality.",
      rating: 5,
    }
  ];

  return (
    <section id="testimonials" className="relative py-20 lg:py-32 border-b border-[var(--card-border)] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary-color)]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary-color)] mb-4">Trust Signals</h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)]">
            Client <span className="text-transparent" style={{ WebkitTextStroke: '1px var(--text-primary)', opacity: 0.6 }}>Testimonials</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-[3rem] bg-[var(--card-bg)] border border-[var(--card-border)] relative group hover:border-[var(--primary-color)]/30 transition-all shadow-xl"
            >
              <div className="absolute -top-6 left-12 w-12 h-12 bg-[var(--primary-color)] rounded-2xl flex items-center justify-center text-[var(--bg-color)] shadow-lg shadow-[var(--primary-color)]/20">
                <Quote size={20} />
              </div>

              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(t.rating)].map((_, index) => (
                  <Star key={index} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-[var(--text-primary)] font-medium leading-relaxed italic mb-8 opacity-90">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                {t.image && (
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--card-border)]" />
                )}
                <div className="text-left">
                  <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider">{t.name}</h4>
                  <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest opacity-60">
                    {t.role} @ {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Testimonials;
