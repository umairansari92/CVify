import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";

const Certifications = ({ user, isOwner, handleArrayUpdate }) => {
  const certifications = user?.certifications || [];

  if (certifications.length === 0) return null;

  return (
    <section
      className="py-20 md:py-32 border-t"
      style={{
        backgroundColor: tokens.colors.paper,
        borderColor: tokens.colors.borders,
        color: tokens.colors.primaryText,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="text-xs uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
          >
            Verification
          </h2>
          <h3
            className="text-3xl font-bold leading-tight"
            style={{ fontFamily: tokens.fonts.heading }}
          >
            Professional Certifications
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 border transition-all duration-300"
              style={{
                borderColor: tokens.colors.borders,
                backgroundColor: tokens.colors.paper,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.pureBlack;
                e.currentTarget.style.color = tokens.colors.paper;
                const mutedText = e.currentTarget.querySelectorAll('.mg-cert-meta');
                mutedText.forEach(el => el.style.color = '#78716C');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.paper;
                e.currentTarget.style.color = tokens.colors.primaryText;
                const mutedText = e.currentTarget.querySelectorAll('.mg-cert-meta');
                mutedText.forEach(el => el.style.color = tokens.colors.muted);
              }}
            >
              <div className="flex flex-col h-full justify-between gap-6">
                <div>
                  <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: tokens.fonts.heading }}>
                    <InlineEdit 
                      isOwner={isOwner} 
                      value={cert.title || cert.name} 
                      onSave={(v) => handleArrayUpdate("certifications", index, { ...cert, title: v })}
                    >
                      {cert.title || cert.name}
                    </InlineEdit>
                  </h4>
                  <p className="text-sm opacity-80" style={{ fontFamily: tokens.fonts.body }}>
                    <InlineEdit 
                      isOwner={isOwner} 
                      value={cert.issuer || cert.organization} 
                      onSave={(v) => handleArrayUpdate("certifications", index, { ...cert, issuer: v })}
                    >
                      {cert.issuer || cert.organization}
                    </InlineEdit>
                  </p>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <span
                    className="mg-cert-meta text-[10px] uppercase tracking-[0.1em]"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                  >
                    {cert.date || cert.year}
                  </span>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mg-cert-meta text-[10px] uppercase tracking-[0.1em] border-b pb-0.5 transition-colors"
                      style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted, borderColor: 'currentColor' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Credential
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
