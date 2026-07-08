import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

/**
 * NOIR — Contact Section
 *
 * Layout: 2-column split
 *   LEFT  — headline, email CTA, social links
 *   RIGHT — full contact form (name, email, subject, message, send)
 *
 * Props used: user, contactForm, setContactForm, handleContactSubmit, isSending
 */

const FormField = ({ id, label, value, onChange, type = "input", placeholder, disabled }) => (
  <div className="group relative">
    <label
      htmlFor={id}
      className="block text-[9px] font-black uppercase tracking-[0.2em] mb-2"
      style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
    >
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        rows={5}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ""}
        disabled={disabled}
        className="w-full bg-transparent border rounded-xl px-5 py-4 text-sm outline-none resize-none transition-all duration-300 placeholder:opacity-30 disabled:opacity-50"
        style={{
          color: tokens.colors.primary,
          borderColor: tokens.colors.border,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = tokens.colors.primary;
          e.target.style.boxShadow = `0 0 0 1px ${tokens.colors.primary}22`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = tokens.colors.border;
          e.target.style.boxShadow = "none";
        }}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ""}
        disabled={disabled}
        className="w-full bg-transparent border rounded-xl px-5 py-4 text-sm outline-none transition-all duration-300 placeholder:opacity-30 disabled:opacity-50"
        style={{
          color: tokens.colors.primary,
          borderColor: tokens.colors.border,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = tokens.colors.primary;
          e.target.style.boxShadow = `0 0 0 1px ${tokens.colors.primary}22`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = tokens.colors.border;
          e.target.style.boxShadow = "none";
        }}
      />
    )}
  </div>
);

const Contact = ({
  user,
  contactForm,
  setContactForm,
  handleContactSubmit,
  isSending,
}) => {
  const safeForm = contactForm || { name: "", email: "", subject: "", message: "" };
  const safeSet = setContactForm || (() => {});
  const safeSubmit = handleContactSubmit || ((e) => e.preventDefault());

  const email = user?.email || user?.contact?.email || "";
  const socialLinks = user?.socialLinks || user?.contact?.socialLinks || {};

  const updateField = (field) => (val) =>
    safeSet((prev) => ({ ...(prev || {}), [field]: val }));

  const socials = [
    { key: "github", label: "GitHub" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "twitter", label: "Twitter / X" },
    { key: "instagram", label: "Instagram" },
    { key: "website", label: "Website" },
  ].filter((s) => !!socialLinks[s.key]);

  return (
    <section
      id="contact"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section label */}
        <div className="mb-16 flex items-center gap-4">
          <span
            className="text-[10px] uppercase font-bold tracking-widest"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
          >
            (09)
          </span>
          <span
            className="text-[10px] uppercase font-bold tracking-widest"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          >
            Contact
          </span>
        </div>

        {/* 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — headline + email + socials */}
          <div className="space-y-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
              className="text-4xl md:text-6xl font-medium leading-[1.05]"
              style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
            >
              Let's build
              <br />
              something{" "}
              <span
                className="italic"
                style={{ color: tokens.colors.accent, fontFamily: "'Instrument Serif', serif" }}
              >
                together.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: tokens.motion.duration.normal }}
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif", opacity: 0.7 }}
            >
              Have a project in mind or want to explore collaboration? Drop a message
              and I'll get back within 24 hours.
            </motion.p>

            {/* Email */}
            {email && (
              <motion.a
                href={`mailto:${email}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: tokens.motion.duration.normal }}
                className="group relative inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-colors"
                style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}
                data-cursor="hover"
              >
                <span
                  className="w-8 h-px transition-all duration-300 group-hover:w-14"
                  style={{ backgroundColor: tokens.colors.accent }}
                />
                <span className="group-hover:text-[var(--accent)] transition-colors duration-300"
                  style={{ "--accent": tokens.colors.accent }}>
                  {email}
                </span>
              </motion.a>
            )}

            {/* Social links */}
            {socials.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: tokens.motion.duration.slow }}
                className="flex flex-wrap gap-6 pt-2"
              >
                {socials.map(({ key, label }) => (
                  <a
                    key={key}
                    href={socialLinks[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-widest transition-colors"
                    style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
                    onMouseEnter={(e) => (e.target.style.color = tokens.colors.primary)}
                    onMouseLeave={(e) => (e.target.style.color = tokens.colors.secondary)}
                    data-cursor="hover"
                  >
                    {label}
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          {/* RIGHT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
          >
            <form
              onSubmit={safeSubmit}
              className="space-y-6 p-8 md:p-10 rounded-3xl border"
              style={{
                backgroundColor: tokens.colors.cardBg,
                borderColor: tokens.colors.border,
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  id="noir-contact-name"
                  label="Full Name *"
                  value={safeForm.name}
                  onChange={updateField("name")}
                  placeholder="John Doe"
                  disabled={isSending}
                />
                <FormField
                  id="noir-contact-email"
                  label="Email Address *"
                  type="email"
                  value={safeForm.email}
                  onChange={updateField("email")}
                  placeholder="john@company.com"
                  disabled={isSending}
                />
              </div>

              <FormField
                id="noir-contact-subject"
                label="Subject"
                value={safeForm.subject}
                onChange={updateField("subject")}
                placeholder="Project Inquiry / Collaboration / ..."
                disabled={isSending}
              />

              <FormField
                id="noir-contact-message"
                label="Message *"
                type="textarea"
                value={safeForm.message}
                onChange={updateField("message")}
                placeholder="Tell me about your project, timeline, and budget..."
                disabled={isSending}
              />

              <button
                type="submit"
                disabled={isSending}
                className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: tokens.colors.bg,
                  fontFamily: tokens.fonts.mono,
                }}
                data-cursor="hover"
              >
                {/* Hover fill effect */}
                <span
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{ backgroundColor: tokens.colors.accent }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  {isSending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <span
                        className="text-base transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </>
                  )}
                </span>
              </button>

              <p
                className="text-center text-[9px] uppercase tracking-widest opacity-30"
                style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
              >
                No spam. Encrypted in transit. Replies within 24h.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
