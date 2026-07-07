import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { tokens } from "./tokens";

const Contact = ({ user, contactForm, setContactForm, handleContactSubmit, isSending }) => {
  return (
    <section 
      id="contact" 
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: tokens.colors.darkSection, color: tokens.colors.paper }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-20">
        
        <div className="md:col-span-5">
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
              Inquiries
            </h2>
            <h3 
              className="text-4xl font-bold leading-tight mb-8"
              style={{ fontFamily: tokens.fonts.heading }}
            >
              Let's build something.
            </h3>
            <p className="text-lg mb-12" style={{ color: "#D6D3D1", fontFamily: tokens.fonts.body }}>
              Reach out to discuss a project, an opportunity, or just to say hello.
            </p>

            <div className="space-y-6">
              {user?.email && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}>Email</p>
                  <a href={`mailto:${user.email}`} className="text-lg hover:text-white transition-colors border-b border-transparent hover:border-white pb-1 inline-block" style={{ fontFamily: tokens.fonts.mono }}>
                    {user.email}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-7">
          <motion.form 
            onSubmit={handleContactSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="relative">
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Name"
                className="w-full bg-transparent border-b border-[#333333] py-4 text-lg focus:outline-none focus:border-white transition-colors placeholder-[#78716C]"
                style={{ fontFamily: tokens.fonts.body }}
              />
            </div>

            <div className="relative">
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-[#333333] py-4 text-lg focus:outline-none focus:border-white transition-colors placeholder-[#78716C]"
                style={{ fontFamily: tokens.fonts.body }}
              />
            </div>

            <div className="relative">
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Your Message"
                className="w-full bg-transparent border-b border-[#333333] py-4 text-lg focus:outline-none focus:border-white transition-colors resize-none placeholder-[#78716C]"
                style={{ fontFamily: tokens.fonts.body }}
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="group flex items-center justify-center gap-4 border px-8 py-4 text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-50 w-full md:w-auto"
              style={{ 
                fontFamily: tokens.fonts.mono, 
                borderColor: "#333333" 
              }}
            >
              {isSending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
                </>
              )}
            </button>
          </motion.form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
