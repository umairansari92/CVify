import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { Send, Mail, MapPin } from "lucide-react";

const Contact = ({ user, contactForm, setContactForm, handleContactSubmit, isSending }) => {
  return (
    <section 
      id="contact" 
      className="border-t pt-32 pb-20 relative overflow-hidden"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Giant Header */}
        <div className="mb-20">
          <h2 
            className="text-5xl md:text-7xl lg:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase mb-6"
            style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground }}
          >
            LET'S <span style={{ color: tokens.colors.primary }}>BUILD</span><br />
            SOMETHING.
          </h2>
          <p className="text-xl font-light" style={{ color: tokens.colors.textDim }}>
            Have a project in mind? Let's talk about it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold block mb-4" style={{ color: tokens.colors.primary }}>
                DIRECT CONTACT
              </span>
              <a 
                href={`mailto:${user?.email || "hello@example.com"}`}
                className="text-2xl md:text-3xl font-light hover:underline transition-all"
                style={{ color: tokens.colors.foreground }}
              >
                {user?.email || "hello@example.com"}
              </a>
            </div>
            
            {user?.location && (
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold block mb-4" style={{ color: tokens.colors.primary }}>
                  LOCATION
                </span>
                <p className="text-xl font-light" style={{ color: tokens.colors.foreground }}>
                  {user.location}
                </p>
              </div>
            )}
            
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold block mb-6" style={{ color: tokens.colors.primary }}>
                SOCIALS
              </span>
              <div className="flex flex-col gap-4">
                {user?.socialLinks && Object.entries(user.socialLinks).map(([key, url], idx) => {
                  if (!url) return null;
                  return (
                    <a 
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono uppercase tracking-widest hover:pl-2 transition-all duration-300"
                      style={{ color: tokens.colors.textDim }}
                    >
                      → {key}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-3xl opacity-[0.03] blur-xl"
              style={{ backgroundColor: tokens.colors.primary }}
            />
            
            <form 
              onSubmit={handleContactSubmit}
              className="relative p-8 md:p-10 rounded-3xl border backdrop-blur-sm space-y-6"
              style={{ backgroundColor: tokens.colors.backgroundFaint, borderColor: tokens.colors.borderFaint }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest" style={{ color: tokens.colors.textFaint }}>Name</label>
                  <input 
                    type="text"
                    required
                    value={contactForm?.name || ""}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-transparent border-b pb-2 text-sm outline-none transition-colors"
                    style={{ borderColor: tokens.colors.borderDim, color: tokens.colors.foreground }}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest" style={{ color: tokens.colors.textFaint }}>Email</label>
                  <input 
                    type="email"
                    required
                    value={contactForm?.email || ""}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-transparent border-b pb-2 text-sm outline-none transition-colors"
                    style={{ borderColor: tokens.colors.borderDim, color: tokens.colors.foreground }}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <label className="font-mono text-[10px] uppercase tracking-widest" style={{ color: tokens.colors.textFaint }}>Subject</label>
                <input 
                  type="text"
                  required
                  value={contactForm?.subject || ""}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full bg-transparent border-b pb-2 text-sm outline-none transition-colors"
                  style={{ borderColor: tokens.colors.borderDim, color: tokens.colors.foreground }}
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2 pt-4">
                <label className="font-mono text-[10px] uppercase tracking-widest" style={{ color: tokens.colors.textFaint }}>Message</label>
                <textarea 
                  required
                  rows={4}
                  value={contactForm?.message || ""}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-transparent border-b pb-2 text-sm outline-none transition-colors resize-none"
                  style={{ borderColor: tokens.colors.borderDim, color: tokens.colors.foreground }}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSending}
                className="group w-full py-4 rounded-full flex items-center justify-center gap-3 font-bold text-[11px] tracking-[0.2em] uppercase transition-all duration-500 mt-8 disabled:opacity-50"
                style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.foreground }}
              >
                {isSending ? "SENDING..." : "SEND MESSAGE"}
                {!isSending && <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
