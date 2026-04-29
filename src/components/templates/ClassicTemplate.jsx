import React from "react";
import { getDynamicWhatsAppLink } from "../../utils/whatsappUtils";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import InlineEditable from "../common/InlineEditable";

const ClassicTemplate = ({ data, isEditable = false }) => {
  const {
    personalInfo,
    education,
    experience,
    projects,
    skills,
    technicalSkills,
    interests,
    competencies,
    softwareProficiency,
    customSections,
    themeColor = "#0f172a",
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
      className="w-full bg-white p-8 shadow-lg text-gray-800 transition-all duration-500"
      style={{
        minHeight: "297mm",
        padding: "15mm",
        fontFamily: getFontFamily(fontFamily),
      }}
    >
      {/* Header */}
      <div className="border-b-2 pb-4 mb-6" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-bold uppercase text-gray-900 tracking-wider">
          {isEditable ? (
            <InlineEditable 
              value={personalInfo?.fullName} 
              path="personalInfo.fullName" 
            />
          ) : (
            personalInfo?.fullName || "Your Name"
          )}
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          {isEditable ? (
            <InlineEditable 
              value={personalInfo?.jobTitle} 
              path="personalInfo.jobTitle" 
            />
          ) : (
            personalInfo?.jobTitle || "Job Title"
          )}
        </p>

        <div className="flex flex-wrap mt-3 text-sm text-gray-600">
          {personalInfo?.email && (
            <span className="flex items-center gap-2 mr-6 mb-2">
              <FaEnvelope /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <>
              <span className="flex items-center gap-2 mr-6 mb-2">
                <FaPhoneAlt /> {personalInfo.phone}
              </span>
              <a
                href={getDynamicWhatsAppLink(personalInfo?.fullName, personalInfo?.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mr-6 mb-2 hover:underline text-green-600 font-bold"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-2 mr-6 mb-2">
              <FaMapMarkerAlt /> {personalInfo.location}
            </span>
          )}
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline mr-6 mb-2"
            style={{ color: themeColor }}
          >
            <FaLinkedin /> {personalInfo.linkedin.replace(/^https?:\/\//, "")}
          </a>
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-900 hover:underline mr-6 mb-2"
            >
              <FaGithub /> {personalInfo.github.replace(/^https?:\/\//, "")}
            </a>
          )}
          {personalInfo?.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-800 hover:underline mr-6 mb-2"
            >
              <FaGlobe />
            </a>
          )}
        </div>

        {personalInfo?.profileSummary && (
          <p className="mt-4 text-sm leading-relaxed max-w-2xl text-gray-700">
            {isEditable ? (
              <InlineEditable 
                value={personalInfo.profileSummary} 
                path="personalInfo.profileSummary" 
                multiline={true}
              />
            ) : (
              personalInfo.profileSummary
            )}
          </p>
        )}
      </div>

      {/* Experience */}
      {experience?.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold border-b mb-4 pb-1"
            style={{ color: themeColor, borderColor: `${themeColor}40` }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="mb-4"
                style={{ pageBreakInside: "avoid" }}
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 italic text-sm">{exp.company}</p>
                {exp.responsibilities && (
                  <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                    {Array.isArray(exp.responsibilities) 
                      ? exp.responsibilities.map((res, i) => (
                          <li key={i}>{res}</li>
                        ))
                      : <li className="list-none">{exp.responsibilities}</li>
                    }
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold uppercase border-b mb-4 pb-1"
            style={{ color: themeColor, borderColor: `${themeColor}40` }}
          >
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj, index) => (
              <div
                key={index}
                className="mb-4"
                style={{ pageBreakInside: "avoid" }}
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-800">{proj.name}</h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      className="text-blue-600 text-xs underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
                  {Array.isArray(proj.description) 
                    ? proj.description?.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))
                    : <li className="list-none">{proj.description}</li>
                  }
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold uppercase border-b mb-4 pb-1"
            style={{ color: themeColor, borderColor: `${themeColor}40` }}
          >
            Education
          </h2>
          <div className="">
            {education.map((edu, index) => (
              <div
                key={index}
                className="mb-2"
                style={{ pageBreakInside: "avoid" }}
              >
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{edu.degree}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Skills */}
      {((skills?.technical?.length > 0) || (skills?.strategic?.length > 0) || (technicalSkills && Object.values(technicalSkills).some((arr) => arr?.length > 0))) && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold uppercase border-b mb-4 pb-1"
            style={{ color: themeColor, borderColor: `${themeColor}40` }}
          >
            Technical Expertise
          </h2>
          <div className="grid grid-cols-2 text-sm text-gray-700">
            {/* New Structure */}
            {skills?.technical?.length > 0 && (
              <div className="mb-2 mr-8">
                <span className="font-bold">Technical:</span>{" "}
                {skills.technical.join(", ")}
              </div>
            )}
            {skills?.strategic?.length > 0 && (
              <div className="mb-2 mr-8">
                <span className="font-bold">Strategic:</span>{" "}
                {skills.strategic.join(", ")}
              </div>
            )}

            {/* Legacy Fallback */}
            {technicalSkills?.frontend?.length > 0 && (
              <div className="mb-2 mr-8">
                <span className="font-bold">Skills:</span>{" "}
                {technicalSkills.frontend.join(", ")}
              </div>
            )}
            {technicalSkills?.backend?.length > 0 && (
              <div className="mb-2 mr-8">
                <span className="font-bold">Backend:</span>{" "}
                {technicalSkills.backend.join(", ")}
              </div>
            )}
            {technicalSkills?.database?.length > 0 && (
              <div className="mb-2 mr-8">
                <span className="font-bold">Database:</span>{" "}
                {technicalSkills.database.join(", ")}
              </div>
            )}
            {technicalSkills?.aiDevOps?.length > 0 && (
              <div className="mb-2 mr-8">
                <span className="font-bold">AI / DevOps:</span>{" "}
                {technicalSkills.aiDevOps.join(", ")}
              </div>
            )}
            {technicalSkills?.tools?.length > 0 && (
              <div className="mb-2 mr-8">
                <span className="font-bold">Tools:</span>{" "}
                {technicalSkills.tools.join(", ")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Competencies & Proficiency */}
      {(competencies?.length > 0 ||
        softwareProficiency?.length > 0) && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold uppercase border-b mb-4 pb-1"
            style={{ color: themeColor, borderColor: `${themeColor}40` }}
          >
            Proficiency & Competencies
          </h2>
          <div
            className="text-sm text-gray-700"
            style={{ pageBreakInside: "avoid" }}
          >
            {softwareProficiency?.length > 0 && (
              <div className="mb-2">
                <span className="font-bold">Software:</span>{" "}
                {softwareProficiency.join(", ")}
              </div>
            )}
            {competencies?.length > 0 && (
              <div className="mb-2">
                <span className="font-bold">Competencies:</span>{" "}
                {competencies.join(" • ")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interests */}
      {interests?.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold uppercase border-b mb-4 pb-1"
            style={{ color: themeColor, borderColor: `${themeColor}40` }}
          >
            Interests & Hobbies
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed italic">
            {(interests || []).join(", ")}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {data.customSections?.map((section, i) => (
        <div key={i} className="mb-6">
          <h2
            className="text-xl font-bold uppercase border-b mb-4 pb-1"
            style={{ color: themeColor, borderColor: `${themeColor}40` }}
          >
            {section.title}
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {section.content.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ClassicTemplate;
