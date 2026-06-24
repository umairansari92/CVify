import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { Send, MapPin, Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";

const Contact = ({ contactForm, setContactForm, handleContactSubmit, isSending, user }) => {
  const socialLinks = user?.socialLinks || {};

  const socials = [
    { key: "linkedin", icon: Linkedin, url: socialLinks.linkedin },
    { key: "github", icon: Github, url: socialLinks.github },
    { key: "twitter", icon: Twitter, url: socialLinks.twitter },
  ].filter((s) => s.url);

  return (
    <section id="contact" className="py-20 px-6 relative z-10 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: tokens.fonts.heading }}>
            <span className="text-[var(--primary-color)]">04. </span> Get In Touch
          </h2>
          <p className="text-[#a1a1aa] max-w-xl mx-auto">
            Whether you have a question or just want to say hi, my inbox is always open!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Info */}
          <div className="md:w-1/3 space-y-8">
            <div className="bg-[#111] border border-[#222] p-6 rounded hover:border-[var(--primary-color)]/30 transition-colors group text-center md:text-left">
               <div className="w-12 h-12 mx-auto md:mx-0 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <Mail size={24} />
               </div>
               <h3 className="text-white font-bold mb-2">Email</h3>
               <p className="text-[#a1a1aa] font-mono text-sm break-all">{user?.email || "hello@example.com"}</p>
            </div>
            
            {user?.phoneNumber && (
              <div className="bg-[#111] border border-[#222] p-6 rounded hover:border-[var(--primary-color)]/30 transition-colors group text-center md:text-left">
                <div className="w-12 h-12 mx-auto md:mx-0 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <h3 className="text-white font-bold mb-2">Phone</h3>
                <p className="text-[#a1a1aa] font-mono text-sm">{user.phoneNumber}</p>
              </div>
            )}

            {user?.location && (
              <div className="bg-[#111] border border-[#222] p-6 rounded hover:border-[var(--primary-color)]/30 transition-colors group text-center md:text-left">
                <div className="w-12 h-12 mx-auto md:mx-0 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <h3 className="text-white font-bold mb-2">Location</h3>
                <p className="text-[#a1a1aa] font-mono text-sm">{user.location}</p>
              </div>
            )}

            {/* Social Icons */}
            {socials.length > 0 && (
              <div className="flex gap-4 pt-4 justify-center md:justify-start">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-[#222] bg-[#111] flex items-center justify-center text-[#a1a1aa] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all hover:shadow-[0_0_15px_rgba(0,255,204,0.3)]"
                  >
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-2/3 bg-[#111] border border-[#222] rounded-xl p-8"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#a1a1aa] text-sm font-mono mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-[#080808] border border-[#333] text-white px-4 py-3 rounded focus:outline-none focus:border-[var(--primary-color)] transition-colors font-mono text-sm placeholder-[#444]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[#a1a1aa] text-sm font-mono mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-[#080808] border border-[#333] text-white px-4 py-3 rounded focus:outline-none focus:border-[var(--primary-color)] transition-colors font-mono text-sm placeholder-[#444]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[#a1a1aa] text-sm font-mono mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full bg-[#080808] border border-[#333] text-white px-4 py-3 rounded focus:outline-none focus:border-[var(--primary-color)] transition-colors font-mono text-sm placeholder-[#444]"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label className="block text-[#a1a1aa] text-sm font-mono mb-2">Message</label>
                <textarea
                  required
                  rows="5"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-[#080808] border border-[#333] text-white px-4 py-3 rounded focus:outline-none focus:border-[var(--primary-color)] transition-colors font-mono text-sm resize-none placeholder-[#444]"
                  placeholder="Hello..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-[var(--primary-color)] text-black font-bold uppercase tracking-widest flex justify-center items-center gap-2 rounded hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,204,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: tokens.fonts.mono }}
              >
                {isSending ? "Sending..." : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
