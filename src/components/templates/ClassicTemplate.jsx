import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ClassicTemplate = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    customSections,
    themeColor = "#0f172a",
    fontFamily = "Inter",
  } = data;

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
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          {personalInfo?.jobTitle || "Job Title"}
        </p>

        <div className="flex flex-wrap mt-3 text-sm text-gray-600">
          {personalInfo?.email && (
            <span className="flex items-center gap-2 mr-6 mb-2">
              <FaEnvelope /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-2 mr-6 mb-2">
              <FaPhoneAlt /> {personalInfo.phone}
            </span>
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
            <FaLinkedin /> LinkedIn
          </a>
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-900 hover:underline mr-6 mb-2"
            >
              <FaGithub /> GitHub
            </a>
          )}
          {personalInfo?.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-800 hover:underline mr-6 mb-2"
            >
              <FaGlobe /> Portfolio
            </a>
          )}
        </div>

        {personalInfo?.profileSummary && (
          <p className="mt-4 text-sm leading-relaxed max-w-2xl text-gray-700">
            {personalInfo.profileSummary}
          </p>
        )}
      </div>

      {/* Experience */}
      {experience?.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold uppercase border-b mb-4 pb-1"
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
                    {exp.responsibilities.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
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
                      Link
                    </a>
                  )}
                </div>
                <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
                  {proj.description?.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
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
      {data.technicalSkills &&
        Object.values(data.technicalSkills).some((arr) => arr?.length > 0) && (
          <div className="mb-6">
            <h2
              className="text-xl font-bold uppercase border-b mb-4 pb-1"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 text-sm text-gray-700">
              {data.technicalSkills.frontend?.length > 0 && (
                <div className="mb-2 mr-8">
                  <span className="font-bold">Frontend:</span>{" "}
                  {data.technicalSkills.frontend.join(", ")}
                </div>
              )}
              {data.technicalSkills.backend?.length > 0 && (
                <div className="mb-2 mr-8">
                  <span className="font-bold">Backend:</span>{" "}
                  {data.technicalSkills.backend.join(", ")}
                </div>
              )}
              {data.technicalSkills.database?.length > 0 && (
                <div className="mb-2 mr-8">
                  <span className="font-bold">Database:</span>{" "}
                  {data.technicalSkills.database.join(", ")}
                </div>
              )}
              {data.technicalSkills.aiDevOps?.length > 0 && (
                <div className="mb-2 mr-8">
                  <span className="font-bold">AI / DevOps:</span>{" "}
                  {data.technicalSkills.aiDevOps.join(", ")}
                </div>
              )}
              {data.technicalSkills.tools?.length > 0 && (
                <div className="mb-2 mr-8">
                  <span className="font-bold">Tools:</span>{" "}
                  {data.technicalSkills.tools.join(", ")}
                </div>
              )}
            </div>
          </div>
        )}

      {/* Competencies & Proficiency */}
      {(data.competencies?.length > 0 ||
        data.softwareProficiency?.length > 0) && (
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
            {data.softwareProficiency?.length > 0 && (
              <div className="mb-2">
                <span className="font-bold">Software:</span>{" "}
                {data.softwareProficiency.join(", ")}
              </div>
            )}
            {data.competencies?.length > 0 && (
              <div className="mb-2">
                <span className="font-bold">Competencies:</span>{" "}
                {data.competencies.join(" • ")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interests */}
      {data.interests?.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold uppercase border-b mb-4 pb-1"
            style={{ color: themeColor, borderColor: `${themeColor}40` }}
          >
            Interests
          </h2>
          <p className="text-sm text-gray-700">{data.interests.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
