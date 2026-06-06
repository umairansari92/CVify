import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { tokens } from "./tokens";

const Contact = ({ user, contactForm, setContactForm, handleContactSubmit, isSending }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const socialLinks = user?.socialLinks || {};
  const socials = [
    { key: "linkedin", icon: FaLinkedin, label: "LINKEDIN", url: socialLinks.linkedin },
    { key: "github",   icon: FaGithub,   label: "GITHUB",   url: socialLinks.github },
    { key: "twitter",  icon: FaTwitter,  label: "TWITTER",  url: socialLinks.twitter },
  ].filter((s) => s.url);

  const otherSocials = Object.entries(socialLinks)
    .filter(([key, url]) => url && !["linkedin", "github", "twitter"].includes(key))
    .map(([key, url]) => ({ key, label: key.toUpperCase(), url }));

  const allSocials = [...socials, ...otherSocials];

  const handleCopy = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputStyle = {
    backgroundColor: tokens.colors.backgroundFaint,
    borderColor: tokens.colors.borderDim,
    color: tokens.colors.foreground,
    fontFamily: tokens.fonts.body,
  };

  return (
    <section
      id="contact-ad"
      ref={ref}
      className="w-full py-32 px-8 md:px-16 lg:px-24 border-t"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT: "LET'S BUILD SOMETHING" */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-black uppercase leading-none tracking-tighter"
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              color: tokens.colors.foreground,
            }}
          >
            LET'S{" "}
            <span style={{ color: "rgba(255,255,255,0.15)" }}>BUILD</span>
            <br />
            <span style={{ color: tokens.colors.primary }}>SOMETHING.</span>
          </h2>

          <p className="text-base" style={{ color: tokens.colors.textDim }}>
            I am currently open to freelance projects and new opportunities.
          </p>

          {user?.email && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-3 w-fit px-7 py-3 rounded-full text-sm font-bold uppercase tracking-widest border transition-all hover:scale-105"
              style={{
                fontFamily: tokens.fonts.mono,
                borderColor: tokens.colors.foreground,
                color: tokens.colors.foreground,
              }}
            >
              <Mail size={14} />
              {copied ? "✓ COPIED!" : "COPY EMAIL"}
            </button>
          )}

          {/* Contact details */}
          <div className="flex flex-col gap-3">
            {user?.email && (
              <a
                href={`mailto:${user.email}`}
                className="text-sm"
                style={{ color: tokens.colors.textDim }}
              >
                {user.email}
              </a>
            )}
            {user?.phoneNumber && (
              <span className="text-sm" style={{ color: tokens.colors.textDim }}>
                {user.phoneNumber}
              </span>
            )}
            {user?.location && (
              <span className="text-sm flex items-center gap-2" style={{ color: tokens.colors.textDim }}>
                <MapPin size={12} /> {user.location}
              </span>
            )}
          </div>

          {/* Contact Form */}
          {handleContactSubmit && (
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 mt-4 max-w-md">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={contactForm?.name || ""}
                  onChange={(e) => setContactForm?.({ ...contactForm, name: e.target.value })}
                  required
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contactForm?.email || ""}
                  onChange={(e) => setContactForm?.({ ...contactForm, email: e.target.value })}
                  required
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={contactForm?.subject || ""}
                onChange={(e) => setContactForm?.({ ...contactForm, subject: e.target.value })}
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                style={inputStyle}
              />
              <textarea
                placeholder="Your message..."
                value={contactForm?.message || ""}
                onChange={(e) => setContactForm?.({ ...contactForm, message: e.target.value })}
                required
                rows={4}
                className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none"
                style={inputStyle}
              />
              <button
                type="submit"
                disabled={isSending}
                className="self-start flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 disabled:opacity-50"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: "#000",
                  fontFamily: tokens.fonts.mono,
                }}
              >
                <Send size={14} />
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>

        {/* RIGHT: Social links vertical list */}
        {allSocials.length > 0 && (
          <motion.div
            className="flex flex-col gap-0"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {allSocials.map(({ key, label, url }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-6 border-b group hover:pl-4 transition-all"
                style={{ borderColor: tokens.colors.borderFaint, color: tokens.colors.foreground }}
              >
                <span
                  className="text-xl font-bold uppercase tracking-widest group-hover:text-purple-400 transition-colors"
                  style={{ fontFamily: tokens.fonts.display }}
                >
                  {label}
                </span>
                <span className="text-xl">↗</span>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;
