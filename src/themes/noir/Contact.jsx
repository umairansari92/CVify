import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { tokens } from "./tokens";

/**
 * NOIR — Contact Section (Enhanced)
 *
 * LEFT column:
 *   • Big cinematic headline
 *   • Description
 *   • Contact info cards (email, phone, location) with icon badges
 *   • Social icon row (circle bordered)
 *
 * RIGHT column:
 *   • Full form: Name, Email, Subject, Message, Send CTA
 *   • Focus glow ring on every input
 *   • Animated hover fill on submit button
 */

const InfoCard = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-start gap-4">
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
      style={{ backgroundColor: `${tokens.colors.accent}14`, color: tokens.colors.accent }}
    >
      <Icon size={17} />
    </div>
    <div>
      <p
        className="text-[9px] font-black uppercase tracking-[0.2em]"
        style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono, opacity: 0.6 }}
      >
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="mt-0.5 text-sm font-medium transition-colors"
          style={{ color: tokens.colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          onMouseEnter={(e) => (e.target.style.color = tokens.colors.accent)}
          onMouseLeave={(e) => (e.target.style.color = tokens.colors.primary)}
          data-cursor="hover"
        >
          {value}
        </a>
      ) : (
        <span
          className="mt-0.5 block text-sm font-medium"
          style={{ color: tokens.colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {value}
        </span>
      )}
    </div>
  </div>
);

const SocialIcon = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300"
    style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = tokens.colors.accent;
      e.currentTarget.style.color = tokens.colors.accent;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = tokens.colors.border;
      e.currentTarget.style.color = tokens.colors.secondary;
    }}
    data-cursor="hover"
  >
    <Icon size={16} />
  </a>
);

const FormInput = ({ id, type = "text", placeholder, value, onChange, disabled }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className="w-full bg-transparent border rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-300 placeholder:opacity-25 disabled:opacity-40"
    style={{
      color: tokens.colors.primary,
      borderColor: tokens.colors.border,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}
    onFocus={(e) => {
      e.target.style.borderColor = tokens.colors.primary;
      e.target.style.boxShadow = `0 0 0 1px ${tokens.colors.primary}1a`;
    }}
    onBlur={(e) => {
      e.target.style.borderColor = tokens.colors.border;
      e.target.style.boxShadow = "none";
    }}
  />
);

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

const Contact = ({
  user,
  handleContactSubmit,
  isSending,
}) => {
  const email = user?.email || user?.contact?.email || "";
  const phone = user?.phoneNumber || user?.phone || "";
  const location = user?.location || "";
  const socialLinks = user?.socialLinks || {};

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" }
  });

  const onSubmit = async (data) => {
    await handleContactSubmit(data);
    reset();
  };

  const socialItems = [
    { key: "github", icon: FaGithub },
    { key: "linkedin", icon: FaLinkedin },
    { key: "twitter", icon: FaTwitter },
    { key: "instagram", icon: FaInstagram },
  ].filter((s) => !!socialLinks[s.key]);

  return (
    <section
      id="contact"
      className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Section label */}
        <div className="mb-14 flex items-center gap-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── LEFT — info + socials ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
            className="space-y-12"
          >
            {/* Headline */}
            <div className="space-y-2">
              <p
                className="text-[10px] font-black uppercase tracking-[0.25em]"
                style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}
              >
                GET IN TOUCH
              </p>
              <h2
                className="text-4xl md:text-5xl font-medium leading-[1.1]"
                style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
              >
                Let's build{" "}
                <span
                  className="italic"
                  style={{ fontFamily: "'Instrument Serif', serif", color: tokens.colors.accent }}
                >
                  something
                </span>
                <br />
                together.
              </h2>
            </div>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif", opacity: 0.65 }}
            >
              Whether you have a project in mind, a question, or simply want to connect — 
              feel free to reach out. I'm always open to discussing new opportunities.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {email && (
                <InfoCard icon={Mail} label="Email" value={email} href={`mailto:${email}`} />
              )}
              {phone && (
                <InfoCard icon={Phone} label="Phone" value={phone} href={`tel:${phone}`} />
              )}
              {location && (
                <InfoCard icon={MapPin} label="Location" value={location} />
              )}
            </div>

            {/* Social icons */}
            {socialItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 pt-2"
              >
                {socialItems.map(({ key, icon }) => (
                  <SocialIcon
                    key={key}
                    href={socialLinks[key]}
                    icon={icon}
                    label={key}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ── RIGHT — contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.1, duration: tokens.motion.duration.normal, ease: tokens.motion.easing.base }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 p-8 md:p-10 rounded-3xl border"
              style={{
                backgroundColor: tokens.colors.cardBg,
                borderColor: tokens.colors.border,
              }}
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="noir-c-name"
                    className="block mb-2 text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
                  >
                    Full Name *
                  </label>
                  <input
                    {...register("name")}
                    id="noir-c-name"
                    placeholder="John Doe"
                    disabled={isSending}
                    className="w-full bg-transparent border rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-300 placeholder:opacity-25 disabled:opacity-40"
                    style={{
                      color: tokens.colors.primary,
                      borderColor: tokens.colors.border,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = tokens.colors.primary;
                      e.target.style.boxShadow = `0 0 0 1px ${tokens.colors.primary}1a`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = tokens.colors.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1" style={{ fontFamily: tokens.fonts.mono }}>{errors.name.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="noir-c-email"
                    className="block mb-2 text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
                  >
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    id="noir-c-email"
                    type="email"
                    placeholder="john@company.com"
                    disabled={isSending}
                    className="w-full bg-transparent border rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-300 placeholder:opacity-25 disabled:opacity-40"
                    style={{
                      color: tokens.colors.primary,
                      borderColor: tokens.colors.border,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = tokens.colors.primary;
                      e.target.style.boxShadow = `0 0 0 1px ${tokens.colors.primary}1a`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = tokens.colors.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1" style={{ fontFamily: tokens.fonts.mono }}>{errors.email.message}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="noir-c-subject"
                  className="block mb-2 text-[9px] font-black uppercase tracking-[0.2em]"
                  style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
                >
                  Subject *
                </label>
                <input
                  {...register("subject")}
                  id="noir-c-subject"
                  placeholder="Project Inquiry / Collaboration / ..."
                  disabled={isSending}
                  className="w-full bg-transparent border rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-300 placeholder:opacity-25 disabled:opacity-40"
                  style={{
                    color: tokens.colors.primary,
                    borderColor: tokens.colors.border,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = tokens.colors.primary;
                    e.target.style.boxShadow = `0 0 0 1px ${tokens.colors.primary}1a`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = tokens.colors.border;
                    e.target.style.boxShadow = "none";
                  }}
                />
                {errors.subject && <p className="text-red-500 text-[10px] font-bold mt-1" style={{ fontFamily: tokens.fonts.mono }}>{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="noir-c-message"
                  className="block mb-2 text-[9px] font-black uppercase tracking-[0.2em]"
                  style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
                >
                  Message *
                </label>
                <textarea
                  id="noir-c-message"
                  rows={5}
                  placeholder="Tell me about your project, timeline, and budget..."
                  disabled={isSending}
                  {...register("message")}
                  className="w-full bg-transparent border rounded-xl px-5 py-3.5 text-sm outline-none resize-none transition-all duration-300 placeholder:opacity-25 disabled:opacity-40"
                  style={{
                    color: tokens.colors.primary,
                    borderColor: tokens.colors.border,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = tokens.colors.primary;
                    e.target.style.boxShadow = `0 0 0 1px ${tokens.colors.primary}1a`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = tokens.colors.border;
                    e.target.style.boxShadow = "none";
                  }}
                />
                {errors.message && <p className="text-red-500 text-[10px] font-bold mt-1" style={{ fontFamily: tokens.fonts.mono }}>{errors.message.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSending}
                className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: tokens.colors.bg,
                  fontFamily: tokens.fonts.mono,
                }}
                data-cursor="hover"
              >
                <span
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{ backgroundColor: tokens.colors.accent }}
                />
                <span className="relative z-10 flex items-center gap-2.5">
                  {isSending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </span>
              </button>

              <p
                className="text-center text-[9px] uppercase tracking-widest opacity-25"
                style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
              >
                No spam. Replies within 24h.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
