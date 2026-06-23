import React from "react";
import { motion } from "framer-motion";
import AnimatedGlobe from "./AnimatedGlobe";

const Contact = ({ contactForm, setContactForm, handleContactSubmit, isSending }) => {
  return (
    <section id="contact-td" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col-reverse lg:flex-row gap-10 overflow-hidden">
        
        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-[0.75] bg-[#151030] p-8 rounded-2xl border border-[#915eff]/20 shadow-[0_0_20px_rgba(145,94,255,0.1)]"
        >
          <p className="text-[#aaa6c3] text-[18px] uppercase tracking-wider">Get in touch</p>
          <h3 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Contact.</h3>

          <form onSubmit={handleContactSubmit} className="mt-12 flex flex-col gap-8">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                required
                name="name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="What's your good name?"
                className="bg-[#050816] py-4 px-6 placeholder:text-[#aaa6c3] text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-[#915eff]/50 transition-all shadow-inner"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your email</span>
              <input
                type="email"
                required
                name="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="What's your web address?"
                className="bg-[#050816] py-4 px-6 placeholder:text-[#aaa6c3] text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-[#915eff]/50 transition-all shadow-inner"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows="7"
                name="message"
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="What you want to say?"
                className="bg-[#050816] py-4 px-6 placeholder:text-[#aaa6c3] text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-[#915eff]/50 transition-all shadow-inner resize-none"
              />
            </label>

            <button
              type="submit"
              disabled={isSending}
              className="bg-[#050816] py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl border border-[#915eff]/40 hover:bg-[#915eff] hover:border-[#915eff] transition-all disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        {/* Animated 3D Globe — React Three Fiber */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:flex-1 lg:h-auto md:h-[550px] h-[350px] flex justify-center items-center rounded-2xl overflow-hidden border border-[#915eff]/20 shadow-[0_0_20px_rgba(145,94,255,0.1)]"
        >
          <AnimatedGlobe />
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
