import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";
import DatePickerMenu from "../../components/profile/DatePickerMenu";
import ExperienceForm from "../../components/profile-forms/ExperienceForm";
import EducationManager from "../../components/profile-forms/EducationManager";

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
        
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="sticky top-32"
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

        <div className="md:col-span-8 space-y-16">
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <motion.div
                key={exp._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative border-b pb-8"
                style={{ borderColor: "#333333" }}
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                  <div 
                    className="w-32 flex-shrink-0 text-sm tracking-widest uppercase"
                    style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                  >
                    <DatePickerMenu
                      value={exp.from}
                      onChange={(val) => handleArrayUpdate("experience", index, "from", val)}
                      isOwner={isOwner}
                    />
                    {" - "}
                    <DatePickerMenu
                      value={exp.current ? "Present" : exp.to}
                      onChange={(val) => handleArrayUpdate("experience", index, "to", val)}
                      isOwner={isOwner}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 
                      className="text-xl font-bold mb-1"
                      style={{ fontFamily: tokens.fonts.heading }}
                    >
                      <InlineEdit
                        value={exp.title}
                        onSave={(val) => handleArrayUpdate("experience", index, "title", val)}
                        isOwner={isOwner}
                      />
                    </h4>
                    <p className="text-sm tracking-widest uppercase" style={{ color: tokens.colors.borders, fontFamily: tokens.fonts.mono }}>
                      <InlineEdit
                        value={exp.company}
                        onSave={(val) => handleArrayUpdate("experience", index, "company", val)}
                        isOwner={isOwner}
                      />
                    </p>
                  </div>
                </div>

                <div 
                  className="md:pl-40 text-base leading-relaxed whitespace-pre-wrap"
                  style={{ color: "#D6D3D1", fontFamily: tokens.fonts.body }}
                >
                  <InlineEdit
                    value={exp.description}
                    onSave={(val) => handleArrayUpdate("experience", index, "description", val)}
                    isOwner={isOwner}
                    multiline
                  />
                </div>
                
                {isOwner && (
                  <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExperienceForm initialData={exp} index={index} mode="edit" />
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            isOwner && <ExperienceForm mode="add" />
          )}

          {/* Education Section */}
          <div className="pt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
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
                    className="group relative border-b pb-8"
                    style={{ borderColor: "#333333" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                      <div 
                        className="w-32 flex-shrink-0 text-sm tracking-widest uppercase"
                        style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
                      >
                        <DatePickerMenu
                          value={edu.from}
                          onChange={(val) => handleArrayUpdate("education", index, "from", val)}
                          isOwner={isOwner}
                        />
                        {" - "}
                        <DatePickerMenu
                          value={edu.current ? "Present" : edu.to}
                          onChange={(val) => handleArrayUpdate("education", index, "to", val)}
                          isOwner={isOwner}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h4 
                          className="text-xl font-bold mb-1"
                          style={{ fontFamily: tokens.fonts.heading }}
                        >
                          <InlineEdit
                            value={edu.degree}
                            onSave={(val) => handleArrayUpdate("education", index, "degree", val)}
                            isOwner={isOwner}
                          />
                        </h4>
                        <p className="text-sm tracking-widest uppercase" style={{ color: tokens.colors.borders, fontFamily: tokens.fonts.mono }}>
                          <InlineEdit
                            value={edu.school}
                            onSave={(val) => handleArrayUpdate("education", index, "school", val)}
                            isOwner={isOwner}
                          />
                        </p>
                      </div>
                    </div>

                    <div 
                      className="md:pl-40 text-base leading-relaxed whitespace-pre-wrap"
                      style={{ color: "#D6D3D1", fontFamily: tokens.fonts.body }}
                    >
                      <InlineEdit
                        value={edu.description}
                        onSave={(val) => handleArrayUpdate("education", index, "description", val)}
                        isOwner={isOwner}
                        multiline
                      />
                    </div>
                    
                    {isOwner && (
                      <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <EducationManager initialData={edu} index={index} mode="edit" />
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                isOwner && <EducationManager mode="add" />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
