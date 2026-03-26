import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const Certifications = React.memo(({ user, isOwner }) => {
  const certifications = user?.certifications || [
    {
      name: "Google Cloud Professional Architect",
      issuer: "Google Cloud",
      date: "2024",
      link: "#",
      description: "Advanced validation of architectural expertise on GCP."
    },
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      date: "2023",
      link: "#",
      description: "Mastery of development and deployment on AWS infrastructure."
    }
  ];

  if (!certifications.length && !isOwner) return null;

  return (
    <section id="certifications" className="py-20 lg:py-32 border-b border-[var(--card-border)] bg-[var(--bg-primary)]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary-color)] mb-4">Verification</h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)]">
            Professional <span className="text-[var(--primary-color)]">Certifications</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2.5rem] bg-[var(--card-bg)] border border-[var(--card-border)] group hover:border-[var(--primary-color)] transition-all flex flex-col items-center text-center shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary-color)]/10 text-[var(--primary-color)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award size={32} />
              </div>
              
              <h4 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-tight mb-2 leading-tight">
                {cert.name}
              </h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-color)] mb-4">
                {cert.issuer} • {cert.date}
              </p>
              
              <p className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed mb-8 line-clamp-2">
                {cert.description}
              </p>

              {cert.link && (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] opacity-40 hover:opacity-100 hover:text-[var(--primary-color)] transition-all"
                >
                  Verify Credentials <ExternalLink size={12} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Certifications;
