import React from "react";
import { motion } from "framer-motion";

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

        {/* Animated 3D Globe — CSS-only, zero dependencies */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:flex-1 lg:h-auto md:h-[550px] h-[350px] flex justify-center items-center"
        >
          <style>{`
            @keyframes td-globe-spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes td-globe-spin-reverse {
              from { transform: rotate(0deg); }
              to   { transform: rotate(-360deg); }
            }
            @keyframes td-globe-spin-tilt {
              from { transform: rotateX(60deg) rotate(0deg); }
              to   { transform: rotateX(60deg) rotate(360deg); }
            }
            .td-globe-ring {
              position: absolute;
              border-radius: 50%;
              border: 2px solid rgba(145, 94, 255, 0.55);
            }
          `}</style>

          <div className="relative w-64 h-64 md:w-80 md:h-80" style={{ perspective: "800px" }}>
            {/* Core glowing sphere */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, #7c3aed, #1e0a4a 70%, #050816)",
                boxShadow: "0 0 60px rgba(145,94,255,0.5), inset 0 0 40px rgba(145,94,255,0.15)",
              }}
            />

            {/* Continents-style blobs */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
              <div className="absolute top-[20%] left-[15%] w-[30%] h-[20%] bg-[#915eff]/50 rounded-full blur-sm" />
              <div className="absolute top-[40%] left-[50%] w-[25%] h-[18%] bg-[#7c3aed]/60 rounded-full blur-sm" />
              <div className="absolute top-[60%] left-[20%] w-[20%] h-[15%] bg-[#915eff]/40 rounded-full blur-sm" />
              <div className="absolute top-[30%] left-[65%] w-[15%] h-[25%] bg-[#6d28d9]/50 rounded-full blur-sm" />
            </div>

            {/* Ring 1 — equatorial */}
            <div
              className="td-globe-ring"
              style={{
                width: "100%", height: "100%",
                top: 0, left: 0,
                transform: "rotateX(75deg)",
                animation: "td-globe-spin 8s linear infinite",
                borderColor: "rgba(145,94,255,0.7)",
              }}
            />

            {/* Ring 2 — tilted */}
            <div
              className="td-globe-ring"
              style={{
                width: "90%", height: "90%",
                top: "5%", left: "5%",
                transform: "rotateX(55deg) rotateY(30deg)",
                animation: "td-globe-spin-reverse 12s linear infinite",
                borderColor: "rgba(167,139,250,0.5)",
              }}
            />

            {/* Ring 3 — more tilted */}
            <div
              className="td-globe-ring"
              style={{
                width: "80%", height: "80%",
                top: "10%", left: "10%",
                transform: "rotateX(20deg) rotateY(60deg)",
                animation: "td-globe-spin 6s linear infinite",
                borderColor: "rgba(196,181,253,0.35)",
                borderWidth: "1px",
              }}
            />

            {/* Ring 4 — outer halo */}
            <div
              className="td-globe-ring"
              style={{
                width: "110%", height: "110%",
                top: "-5%", left: "-5%",
                transform: "rotateX(80deg)",
                animation: "td-globe-spin-reverse 20s linear infinite",
                borderColor: "rgba(145,94,255,0.2)",
                borderWidth: "1px",
              }}
            />

            {/* Orbit dot */}
            <div
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: "100%",
                height: "100%",
                marginLeft: "-50%",
                marginTop: "-50%",
                animation: "td-globe-spin 8s linear infinite",
                transform: "rotateX(75deg)",
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#915eff]"
                style={{ boxShadow: "0 0 10px rgba(145,94,255,1)" }}
              />
            </div>

            {/* Stars background dots */}
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-40"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
