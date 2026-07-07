import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";

const Resume = ({ user, isOwner, handleArrayUpdate }) => {
  const experiences = user?.experience || [];
  const education = user?.education || [];

  return (
    <section
      id="resume"
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: tokens.colors.darkSection, color: tokens.colors.paper }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-20">

        {/* Sticky Left Label */}
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-32"
          >
            <h2
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
            >
              Career
            </h2>
            <h3
              className="text-3xl font-bold leading-tight"
              style={{ fontFamily: tokens.fonts.heading }}
            >
              Experience
            </h3>
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-8 space-y-16">

          {/* Experience Entries */}
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <motion.div
                key={exp._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-b pb-8"
                style={{ borderColor: "#333333" }}
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                  {/* Date column */}
                  <div
                    className="w-36 flex-shrink-0 text-sm tracking-widest uppercase"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                  >
                    {exp.from || exp.startDate || "—"} – {exp.current || exp.isCurrent ? "Present" : (exp.to || exp.endDate || "—")}
                  </div>

                  {/* Role & Company */}
                  <div className="flex-1">
                    <h4
                      className="text-xl font-bold mb-1"
                      style={{ fontFamily: tokens.fonts.heading }}
                    >
                      <InlineEdit
                        value={exp.title || exp.jobTitle || exp.role || ""}
                        onSave={(val) => handleArrayUpdate?.("experience", index, { title: val, jobTitle: val, role: val })}
                        isOwner={isOwner}
                      />
                    </h4>
                    <p
                      className="text-sm tracking-widest uppercase"
                      style={{ color: tokens.colors.borders, fontFamily: tokens.fonts.mono }}
                    >
                      <InlineEdit
                        value={exp.company || exp.companyName || ""}
                        onSave={(val) => handleArrayUpdate?.("experience", index, { company: val })}
                        isOwner={isOwner}
                      />
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div
                  className="md:pl-44 text-base leading-relaxed"
                  style={{ color: "#D6D3D1", fontFamily: tokens.fonts.body }}
                >
                  <InlineEdit
                    value={exp.description || exp.achievements || ""}
                    onSave={(val) => handleArrayUpdate?.("experience", index, { description: val })}
                    isOwner={isOwner}
                    multiline
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <p
              className="text-sm italic"
              style={{ color: tokens.colors.muted, fontFamily: tokens.fonts.body }}
            >
              No experience entries yet.
            </p>
          )}

          {/* Education Section */}
          <div className="pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2
                className="text-xs uppercase tracking-[0.2em] mb-4"
                style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
              >
                Background
              </h2>
              <h3
                className="text-3xl font-bold leading-tight"
                style={{ fontFamily: tokens.fonts.heading }}
              >
                Education
              </h3>
            </motion.div>

            <div className="space-y-16">
              {education.length > 0 ? (
                education.map((edu, index) => (
                  <motion.div
                    key={edu._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border-b pb-8"
                    style={{ borderColor: "#333333" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                      {/* Date column */}
                      <div
                        className="w-36 flex-shrink-0 text-sm tracking-widest uppercase"
                        style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                      >
                        {edu.from || edu.startDate || "—"} – {edu.current ? "Present" : (edu.to || edu.endDate || "—")}
                      </div>

                      {/* Degree & School */}
                      <div className="flex-1">
                        <h4
                          className="text-xl font-bold mb-1"
                          style={{ fontFamily: tokens.fonts.heading }}
                        >
                          <InlineEdit
                            value={edu.degree || ""}
                            onSave={(val) => handleArrayUpdate?.("education", index, { degree: val })}
                            isOwner={isOwner}
                          />
                        </h4>
                        <p
                          className="text-sm tracking-widest uppercase"
                          style={{ color: tokens.colors.borders, fontFamily: tokens.fonts.mono }}
                        >
                          <InlineEdit
                            value={edu.school || edu.institution || ""}
                            onSave={(val) => handleArrayUpdate?.("education", index, { school: val })}
                            isOwner={isOwner}
                          />
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    {(edu.description || isOwner) && (
                      <div
                        className="md:pl-44 text-base leading-relaxed"
                        style={{ color: "#D6D3D1", fontFamily: tokens.fonts.body }}
                      >
                        <InlineEdit
                          value={edu.description || ""}
                          onSave={(val) => handleArrayUpdate?.("education", index, { description: val })}
                          isOwner={isOwner}
                          multiline
                        />
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <p
                  className="text-sm italic"
                  style={{ color: tokens.colors.muted, fontFamily: tokens.fonts.body }}
                >
                  No education entries yet.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
