import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import { staggerContainer, staggerChild } from "./animations";

/**
 * ORIENTAL LUXE — Skills Section
 * ────────────────────────────────
 * COMPLETELY different from default pill tags:
 * - Horizontal progress bars with percentage labels
 * - Skills grouped into categories
 * - Animated bar fill on scroll into view
 * - Clean minimal dark cards for each category
 */
const Skills = ({ user, isOwner }) => {
  const normalizedData = useMemo(() => {
    const categories = {};

    if (user?.skills && !Array.isArray(user.skills)) {
      // Object format: { technical: [], strategic: [] }
      if (user.skills.technical?.length) categories["Technical"] = user.skills.technical;
      if (user.skills.strategic?.length) categories["Strategic"] = user.skills.strategic;
    } else if (Array.isArray(user?.skills)) {
      user.skills.forEach((skill) => {
        const name = typeof skill === "string" ? skill : skill?.name || "";
        const cat = (typeof skill === "object" && skill?.category) || "Technical";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(name);
      });
    }

    // If no categories extracted, use flat list
    if (Object.keys(categories).length === 0 && Array.isArray(user?.skills)) {
      categories["Core Skills"] = user.skills.map((s) => (typeof s === "string" ? s : s?.name || ""));
    }

    return categories;
  }, [user?.skills]);

  const categoryEntries = Object.entries(normalizedData).filter(([, arr]) => arr.length > 0);
  if (categoryEntries.length === 0) return null;

  return (
    <section
      id="skills-ol"
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
            TOOLKIT
          </p>
          <h2
            className="flex items-center gap-4 text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: tokens.colors.textPrimary }}
          >
            <span className="h-8 w-1 rounded-full" style={{ backgroundColor: tokens.colors.accent }} />
            Skills & Technologies
          </h2>
        </motion.div>

        {/* Skills Grid — Each Category in a Card */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {categoryEntries.map(([category, skills], catIdx) => (
            <motion.div
              key={category}
              variants={staggerChild}
              className="rounded-xl border p-6 sm:p-8"
              style={{
                backgroundColor: `${tokens.colors.bgSoft}60`,
                borderColor: tokens.colors.border,
              }}
            >
              <h3
                className="mb-6 text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: `${tokens.colors.accent}99` }}
              >
                {category}
              </h3>

              <div className="space-y-4">
                {skills.map((skill, i) => {
                  // Generate a pseudo-random percentage for the bar
                  const pct = 70 + ((skill.length * 7 + i * 13 + catIdx * 11) % 25);
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="text-sm font-medium"
                          style={{ color: tokens.colors.textPrimary }}
                        >
                          {skill}
                        </span>
                        <span
                          className="text-xs font-medium"
                          style={{ color: tokens.colors.textMuted }}
                        >
                          {pct}%
                        </span>
                      </div>
                      <div
                        className="h-1.5 w-full rounded-full overflow-hidden"
                        style={{ backgroundColor: `${tokens.colors.accent}15` }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: i * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${tokens.colors.accent}, ${tokens.colors.accentLight})`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services (if available) */}
        {user?.services && user.services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12"
          >
            <h3
              className="mb-6 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: `${tokens.colors.accent}99` }}
            >
              SERVICES OFFERING
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {user.services.map((srv, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-6 transition-all duration-300"
                  style={{
                    backgroundColor: `${tokens.colors.bgSoft}60`,
                    borderColor: tokens.colors.border,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tokens.colors.borderHover;
                    e.currentTarget.style.boxShadow = tokens.shadows.glow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = tokens.colors.border;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h4
                    className="font-bold text-sm uppercase tracking-wider"
                    style={{ color: tokens.colors.textPrimary }}
                  >
                    {srv.title}
                  </h4>
                  <p
                    className="mt-2 text-xs leading-relaxed"
                    style={{ color: tokens.colors.textSecondary }}
                  >
                    {srv.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
