import React from "react";
import ResumeSection from "../common/ResumeSection";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ElegantTemplate = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      className="w-full bg-[#f9f7f2] p-10 font-serif text-[#2c3e50]"
      style={{ minHeight: "297mm", padding: "15mm" }}
    >
      {/* Header - Serif Font */}
      <div className="text-center border-b-2 border-double border-gray-300 pb-8 mb-8">
        <h1 className="text-5xl mb-3" style={{ fontFamily: "Georgia, serif" }}>
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center items-center text-sm uppercase tracking-widest text-gray-500 font-medium mb-4">
          {personalInfo?.jobTitle && <span>{personalInfo.jobTitle}</span>}
        </div>

        <div className="flex justify-center text-sm text-gray-600 font-normal italic">
          {personalInfo?.email && (
            <span className="flex items-center gap-2 mx-4">
              <FaEnvelope className="text-gray-400" /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-2 mx-4">
              <FaPhoneAlt className="text-gray-400" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-2 mx-4">
              <FaMapMarkerAlt className="text-gray-400" />{" "}
              {personalInfo.location}
            </span>
          )}
        </div>
        {/* Links Row */}
        <div className="flex justify-center text-sm text-gray-600 font-normal italic mt-2">
          {personalInfo?.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#2c3e50] transition-colors mx-4"
            >
              <FaLinkedin /> LinkedIn
            </a>
          )}
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#2c3e50] transition-colors mx-4"
            >
              <FaGithub /> GitHub
            </a>
          )}
          {personalInfo?.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#2c3e50] transition-colors mx-4"
            >
              <FaGlobe /> Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Centered Summary */}
      {personalInfo?.profileSummary && (
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-gray-700 text-lg italic leading-relaxed font-serif">
            "{personalInfo.profileSummary}"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10">
        {/* Experience - Center aligned titles initially looks nice but harder to read, sticking to left for readability but serif styling */}
        {experience?.length > 0 && (
          <section>
            <h2
              className="text-center text-xl uppercase tracking-widest border-t border-b border-gray-200 py-2 mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Professional Experience
            </h2>
            <div className="">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 mb-8"
                  style={{ pageBreakInside: "avoid" }}
                >
                  <div className="col-span-3 text-right">
                    <span className="block font-bold text-gray-800">
                      {exp.startDate}
                    </span>
                    <span className="block font-bold text-gray-400 mb-1">
                      to
                    </span>
                    <span className="block font-bold text-gray-800">
                      {exp.endDate}
                    </span>
                  </div>
                  <div className="col-span-9 border-l border-gray-300 pl-6 pb-2">
                    <h3
                      className="text-xl font-bold text-gray-900"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {exp.company}
                    </h3>
                    <p className="text-gray-600 italic mb-2">{exp.position}</p>
                    {exp.responsibilities && (
                      <ul className="list-disc list-outside ml-4 text-sm text-gray-700 leading-6">
                        {exp.responsibilities.map((res, i) => (
                          <li key={i}>{res}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Projects Grid */}
        <div className="grid grid-cols-2 gap-10">
          {education?.length > 0 && (
            <section>
              <h2
                className="text-center text-xl uppercase tracking-widest border-t border-b border-gray-200 py-2 mb-6"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="text-center mb-6">
                  <h3
                    className="font-bold text-lg"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {edu.institution}
                  </h3>
                  <p className="text-gray-600 mb-1">{edu.degree}</p>
                  <span className="text-sm text-gray-500 italic">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              ))}
            </section>
          )}

          {/* Technical Skills - Elegant Style */}
          {data.technicalSkills &&
            Object.values(data.technicalSkills).some(
              (arr) => arr?.length > 0,
            ) && (
              <section>
                <h2
                  className="text-center text-xl uppercase tracking-widest border-t border-b border-gray-200 py-2 mb-6"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Technical Expertise
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  {data.technicalSkills.frontend?.length > 0 && (
                    <div className="text-center">
                      <span className="font-bold block mb-1">Frontend</span>
                      {data.technicalSkills.frontend.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.backend?.length > 0 && (
                    <div className="text-center">
                      <span className="font-bold block mb-1">Backend</span>
                      {data.technicalSkills.backend.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.database?.length > 0 && (
                    <div className="text-center">
                      <span className="font-bold block mb-1">Database</span>
                      {data.technicalSkills.database.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.aiDevOps?.length > 0 && (
                    <div className="text-center">
                      <span className="font-bold block mb-1">AI & DevOps</span>
                      {data.technicalSkills.aiDevOps.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.tools?.length > 0 && (
                    <div className="text-center">
                      <span className="font-bold block mb-1">Tools</span>
                      {data.technicalSkills.tools.join(", ")}
                    </div>
                  )}
                </div>
              </section>
            )}

          {/* Competencies */}
          {data.competencies?.length > 0 && (
            <section>
              <h2
                className="text-center text-xl uppercase tracking-widest border-t border-b border-gray-200 py-2 mb-6"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Core Competencies
              </h2>
              <div className="flex flex-wrap justify-center">
                {data.competencies.map((skill, index) => (
                  <span
                    key={index}
                    className="border border-gray-300 px-3 py-1 rounded-full text-sm text-gray-600 italic mr-3 mb-3"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Software */}
          {data.softwareProficiency?.length > 0 && (
            <section>
              <h2
                className="text-center text-xl uppercase tracking-widest border-t border-b border-gray-200 py-2 mb-6"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Software Proficiency
              </h2>
              <div className="text-center text-sm text-gray-600 italic">
                {data.softwareProficiency.join(" • ")}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElegantTemplate;
