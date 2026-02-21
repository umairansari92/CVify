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

const ModernTemplate = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    interests,
    competencies,
    softwareProficiency,
    customSections,
    themeColor = "#2563eb", // Modern defaults to Blue
    fontFamily = "Inter",
  } = data || {};

  const getFontFamily = (font) => {
    switch (font) {
      case "Inter":
        return "'Inter', sans-serif";
      case "Manrope":
        return "'Manrope', sans-serif";
      case "Playfair Display":
        return "'Playfair Display', serif";
      case "Public Sans":
        return "'Public Sans', sans-serif";
      default:
        return "'Inter', sans-serif";
    }
  };

  return (
    <div
      className="w-full bg-white p-10 text-gray-800 transition-all duration-500"
      style={{
        padding: "15mm",
        fontFamily: getFontFamily(fontFamily),
      }}
    >
      {/* Header */}
      <div
        className="border-l-4 pl-6 mb-10"
        style={{ borderColor: themeColor }}
      >
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight leading-none mb-2">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-2xl font-medium mb-4" style={{ color: themeColor }}>
          {personalInfo?.jobTitle || "Job Title"}
        </p>

        <div className="flex flex-wrap text-sm text-gray-600 mt-4">
          {personalInfo?.email && (
            <span className="flex items-center gap-2 mr-6 mb-3">
              <FaEnvelope className="text-blue-500" /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-2 mr-6 mb-3">
              <FaPhoneAlt className="text-blue-500" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-2 mr-6 mb-3">
              <FaMapMarkerAlt className="text-blue-500" />{" "}
              {personalInfo.location}
            </span>
          )}
          {personalInfo?.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mr-6 mb-3 hover:underline"
            >
              <FaLinkedin /> LinkedIn
            </a>
          )}
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-800 hover:underline mr-6 mb-3"
            >
              <FaGithub /> GitHub
            </a>
          )}
          {personalInfo?.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mr-6 mb-3 hover:underline"
            >
              <FaGlobe /> Portfolio
            </a>
          )}
        </div>
      </div>

      {personalInfo?.profileSummary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-base">
            {personalInfo.profileSummary}
          </p>
        </div>
      )}

      {/* Skills & Competencies Grid */}
      <div className="mb-8" style={{ pageBreakInside: "avoid", clear: "both" }}>
        {((data.technicalSkills &&
          Object.values(data.technicalSkills).some((arr) => arr?.length > 0)) ||
          data.competencies?.length > 0) && (
          <div
            style={{
              display: "inline-block",
              width: "48%",
              verticalAlign: "top",
              marginRight: "4%",
            }}
          >
            <h3 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-3">
              Technical Expertise
            </h3>
            <div className="">
              {data.technicalSkills?.frontend?.length > 0 && (
                <div className="text-sm mb-2">
                  <span className="font-bold text-gray-700">Frontend:</span>{" "}
                  <span className="text-gray-600">
                    {data.technicalSkills.frontend.join(", ")}
                  </span>
                </div>
              )}
              {data.technicalSkills?.backend?.length > 0 && (
                <div className="text-sm mb-2">
                  <span className="font-bold text-gray-700">Backend:</span>{" "}
                  <span className="text-gray-600">
                    {data.technicalSkills.backend.join(", ")}
                  </span>
                </div>
              )}
              {data.technicalSkills?.aiDevOps?.length > 0 && (
                <div className="text-sm mb-2">
                  <span className="font-bold text-gray-700">AI/DevOps:</span>{" "}
                  <span className="text-gray-600">
                    {data.technicalSkills.aiDevOps.join(", ")}
                  </span>
                </div>
              )}
              {data.competencies?.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-xs font-bold uppercase text-gray-500 mb-1">
                    Competencies
                  </h4>
                  <div className="flex flex-wrap">
                    {data.competencies.map((c, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded text-xs mr-2 mb-2"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {data.softwareProficiency?.length > 0 && (
          <div
            style={{
              display: "inline-block",
              width: "48%",
              verticalAlign: "top",
            }}
          >
            <h3 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-3">
              Software Proficiency
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.softwareProficiency.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        <div style={{ clear: "both" }}></div>
      </div>

      {/* Experience */}
      {experience?.length > 0 && (
        <ResumeSection
          title="Experience"
          titleStyle={{ color: themeColor, borderColor: `${themeColor}20` }}
        >
          {experience.map((exp, index) => (
            <div
              key={index}
              className="mb-4"
              style={{ pageBreakInside: "avoid" }}
            >
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg text-gray-900">
                  {exp.position}
                </h3>
                <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-blue-600 font-medium text-sm mb-2">
                {exp.company}
              </p>
              {exp.responsibilities && (
                <ul className="list-none space-y-1.5 text-gray-700 text-sm pl-0">
                  {exp.responsibilities.map((res, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-blue-400 mt-1.5 text-[0.6rem]">
                        ●
                      </span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ResumeSection>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <ResumeSection
          title="Projects"
          titleStyle={{ color: themeColor, borderColor: `${themeColor}20` }}
        >
          {projects.map((proj, index) => (
            <div
              key={index}
              className="mb-4"
              style={{ pageBreakInside: "avoid" }}
            >
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{proj.name}</h3>
                {proj.link && (
                  <a
                    href={proj.link}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    View Project ↗
                  </a>
                )}
              </div>
              <ul className="mt-1 text-sm text-gray-700 space-y-1">
                {proj.description?.map((desc, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-gray-400">-</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ResumeSection>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <ResumeSection
          title="Education"
          titleStyle={{ color: themeColor, borderColor: `${themeColor}20` }}
        >
          {education.map((edu, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-1 mb-2"
              style={{ pageBreakInside: "avoid" }}
            >
              <div>
                <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                <p className="text-sm text-gray-600">{edu.degree}</p>
              </div>
              <span className="text-sm text-gray-500 text-right">
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
          ))}
        </ResumeSection>
      )}

      {/* Custom Sections */}
      {customSections?.map((section, i) => (
        <ResumeSection
          key={i}
          title={section.title}
          titleStyle={{ color: themeColor, borderColor: `${themeColor}20` }}
        >
          <ul className="list-none space-y-1.5 text-gray-700 text-sm pl-0">
            {section.items?.map((item, j) => (
              <li key={j} className="flex items-start">
                <span
                  className="mr-3 mt-1.5 text-[0.6rem]"
                  style={{ color: themeColor }}
                >
                  ●
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ResumeSection>
      ))}
    </div>
  );
};

export default ModernTemplate;
