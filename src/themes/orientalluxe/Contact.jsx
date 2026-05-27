import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { tokens } from "./tokens";
import { staggerContainer, staggerChild, slideFromLeft, slideFromRight } from "./animations";

/**
 * ORIENTAL LUXE — Contact Section
 * ────────────────────────────────
 * 2-column layout: contact info (left) + form (right)
 * Completely different from default contact section.
 */
const Contact = ({ user, contactForm, setContactForm, handleContactSubmit, isSending }) => {
  const socialLinks = user?.socialLinks || {};

  const socials = [
    { key: "linkedin", icon: FaLinkedin, url: socialLinks.linkedin },
    { key: "github", icon: FaGithub, url: socialLinks.github },
    { key: "twitter", icon: FaTwitter, url: socialLinks.twitter },
  ].filter((s) => s.url);

  const inputStyle = {
    backgroundColor: tokens.colors.bgCard,
    borderColor: tokens.colors.border,
    color: tokens.colors.textPrimary,
    fontFamily: tokens.fonts.primary,
  };

  const focusStyle = {
    borderColor: tokens.colors.accent,
    boxShadow: `0 0 0 1px ${tokens.colors.accent}`,
  };

  return (
    <section
      id="contact-ol"
      className="relative py-20 sm:py-28"
      style={{ fontFamily: tokens.fonts.primary }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: tokens.colors.accent }}
          >
            GET IN TOUCH
          </p>
          <h2
            className="flex items-center gap-4 text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: tokens.colors.textPrimary }}
          >
            <span className="h-8 w-1 rounded-full" style={{ backgroundColor: tokens.colors.accent }} />
            Contact
          </h2>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT — Contact Info */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: tokens.colors.textSecondary }}
            >
              Whether you have a project in mind, a question, or simply want to connect — feel free to reach out. I'm always open to discussing new opportunities.
            </p>

            <div className="space-y-4">
              {user?.email && (
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${tokens.colors.accent}15`, color: tokens.colors.accent }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.colors.textMuted }}>Email</p>
                    <a href={`mailto:${user.email}`} className="text-sm font-medium" style={{ color: tokens.colors.textPrimary }}>
                      {user.email}
                    </a>
                  </div>
                </div>
              )}

              {user?.phoneNumber && (
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${tokens.colors.accent}15`, color: tokens.colors.accent }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.colors.textMuted }}>Phone</p>
                    <span className="text-sm font-medium" style={{ color: tokens.colors.textPrimary }}>
                      {user.phoneNumber}
                    </span>
                  </div>
                </div>
              )}

              {user?.location && (
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${tokens.colors.accent}15`, color: tokens.colors.accent }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.colors.textMuted }}>Location</p>
                    <span className="text-sm font-medium" style={{ color: tokens.colors.textPrimary }}>
                      {user.location}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Social Icons */}
            {socials.length > 0 && (
              <div className="flex gap-3 pt-4">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300"
                    style={{
                      borderColor: tokens.colors.border,
                      color: tokens.colors.textSecondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = tokens.colors.accent;
                      e.currentTarget.style.color = tokens.colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = tokens.colors.border;
                      e.currentTarget.style.color = tokens.colors.textSecondary;
                    }}
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[#555]"
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => { e.target.style.borderColor = tokens.colors.border; e.target.style.boxShadow = "none"; }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[#555]"
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => { e.target.style.borderColor = tokens.colors.border; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[#555]"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => { e.target.style.borderColor = tokens.colors.border; e.target.style.boxShadow = "none"; }}
              />
              <textarea
                placeholder="Your message..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
                rows={5}
                className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[#555]"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => { e.target.style.borderColor = tokens.colors.border; e.target.style.boxShadow = "none"; }}
              />
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50"
                style={{
                  backgroundColor: tokens.colors.accent,
                  color: "#000",
                  boxShadow: `0 0 20px ${tokens.colors.accentGlow}`,
                }}
              >
                <Send size={16} />
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
