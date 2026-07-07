import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { tokens } from "./tokens";

const Contact = ({ user, contactForm, setContactForm, handleContactSubmit, isSending }) => {
  const email = user?.email || user?.contactEmail || "";
  const phone = user?.phone || user?.phoneNumber || "";
  const location = user?.location || "";
  const socialLinks = user?.socialLinks || {};
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";

  const socials = [
    { label: "GitHub", url: socialLinks.github },
    { label: "LinkedIn", url: socialLinks.linkedin },
    { label: "Twitter", url: socialLinks.twitter },
    { label: "Website", url: socialLinks.website || socialLinks.portfolio },
  ].filter((s) => s.url);

  const safeForm = contactForm || { name: "", email: "", subject: "", message: "" };
  const safeSetForm = setContactForm || (() => {});
  const safeSubmit = handleContactSubmit || ((e) => e.preventDefault());

  return (
    <section
      id="contact"
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: tokens.colors.darkSection, color: tokens.colors.paper }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-20">

        {/* Left — Contact Info */}
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
              Let's build<br />something.
            </h3>
            <p
              className="text-base leading-relaxed mb-12"
              style={{ color: "#D6D3D1", fontFamily: tokens.fonts.body }}
            >
              Reach out to discuss a project, an opportunity, or just to say hello.
              {name && ` ${name} responds personally.`}
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              {email && (
                <div>
                  <p
                    className="text-[9px] uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                  >
                    <Mail size={10} /> Email
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="text-base hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5 inline-block"
                    style={{ fontFamily: tokens.fonts.mono }}
                  >
                    {email}
                  </a>
                </div>
              )}
              {phone && (
                <div>
                  <p
                    className="text-[9px] uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                  >
                    <Phone size={10} /> Phone
                  </p>
                  <a
                    href={`tel:${phone}`}
                    className="text-base hover:text-white transition-colors"
                    style={{ fontFamily: tokens.fonts.mono }}
                  >
                    {phone}
                  </a>
                </div>
              )}
              {location && (
                <div>
                  <p
                    className="text-[9px] uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                  >
                    <MapPin size={10} /> Location
                  </p>
                  <p className="text-base" style={{ fontFamily: tokens.fonts.mono }}>{location}</p>
                </div>
              )}
            </div>

            {/* Social Links */}
            {socials.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest transition-colors border-b border-transparent hover:border-white pb-0.5"
                    style={{ fontFamily: tokens.fonts.mono, color: "#D6D3D1" }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right — Contact Form */}
        <div className="md:col-span-7">
          <motion.form
            onSubmit={safeSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Name */}
            <div>
              <input
                type="text"
                required
                value={safeForm.name}
                onChange={(e) => safeSetForm({ ...safeForm, name: e.target.value })}
                placeholder="Your Name"
                className="w-full bg-transparent border-b py-4 text-base focus:outline-none transition-colors placeholder-[#78716C]"
                style={{
                  fontFamily: tokens.fonts.body,
                  borderColor: "#333333",
                  color: tokens.colors.paper,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#D6D3D1")}
                onBlur={(e) => (e.target.style.borderColor = "#333333")}
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                required
                value={safeForm.email}
                onChange={(e) => safeSetForm({ ...safeForm, email: e.target.value })}
                placeholder="Email Address"
                className="w-full bg-transparent border-b py-4 text-base focus:outline-none transition-colors placeholder-[#78716C]"
                style={{
                  fontFamily: tokens.fonts.body,
                  borderColor: "#333333",
                  color: tokens.colors.paper,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#D6D3D1")}
                onBlur={(e) => (e.target.style.borderColor = "#333333")}
              />
            </div>

            {/* Subject (optional) */}
            <div>
              <input
                type="text"
                value={safeForm.subject || ""}
                onChange={(e) => safeSetForm({ ...safeForm, subject: e.target.value })}
                placeholder="Subject (Optional)"
                className="w-full bg-transparent border-b py-4 text-base focus:outline-none transition-colors placeholder-[#78716C]"
                style={{
                  fontFamily: tokens.fonts.body,
                  borderColor: "#333333",
                  color: tokens.colors.paper,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#D6D3D1")}
                onBlur={(e) => (e.target.style.borderColor = "#333333")}
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                required
                rows={4}
                value={safeForm.message}
                onChange={(e) => safeSetForm({ ...safeForm, message: e.target.value })}
                placeholder="Your Message"
                className="w-full bg-transparent border-b py-4 text-base focus:outline-none transition-colors resize-none placeholder-[#78716C]"
                style={{
                  fontFamily: tokens.fonts.body,
                  borderColor: "#333333",
                  color: tokens.colors.paper,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#D6D3D1")}
                onBlur={(e) => (e.target.style.borderColor = "#333333")}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSending}
              className="group flex items-center gap-4 border px-8 py-4 text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ fontFamily: tokens.fonts.mono, borderColor: "#444" }}
            >
              {isSending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Sending…</span>
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
