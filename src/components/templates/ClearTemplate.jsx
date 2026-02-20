import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ClearTemplate = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    customSections,
    themeColor = "#1e293b",
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
      className="w-full bg-slate-50 font-sans text-slate-800 flex transition-all duration-500"
      style={{
        minHeight: "297mm",
        padding: "15mm",
        fontFamily: getFontFamily(fontFamily),
      }}
    >
      {/* Left Sidebar */}
      <div
        className="w-1/3 text-white p-6"
        style={{ backgroundColor: themeColor }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">
            {personalInfo?.fullName || "Your Name"}
          </h1>
          <p className="text-sm text-slate-300 uppercase tracking-widest">
            {personalInfo?.jobTitle || "Job Title"}
          </p>
        </div>

        {/* Contact Info */}
        <div className="mb-8 text-sm">
          {personalInfo?.email && (
            <div className="flex items-center gap-2 break-all">
              <FaEnvelope className="text-slate-400" /> {personalInfo.email}
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center gap-2 mb-3">
              <FaPhoneAlt className="text-slate-400" /> {personalInfo.phone}
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center gap-2 mb-3">
              <FaMapMarkerAlt className="text-slate-400" />{" "}
              {personalInfo.location}
            </div>
          )}
          {personalInfo?.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors break-all mb-3"
            >
              <FaLinkedin className="text-slate-400" /> LinkedIn
            </a>
          )}
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-slate-300 transition-colors break-all mb-3"
            >
              <FaGithub className="text-slate-400" /> GitHub
            </a>
          )}
          {personalInfo?.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors break-all mb-3"
            >
              <FaGlobe className="text-slate-400" /> Portfolio
            </a>
          )}
        </div>

        {/* Skills */}
        {/* Technical Skills */}
        {data.technicalSkills &&
          Object.values(data.technicalSkills).some(
            (arr) => arr?.length > 0,
          ) && (
            <div className="mb-8" style={{ pageBreakInside: "avoid" }}>
              <h3 className="text-lg font-bold border-b border-slate-600 pb-1 mb-3">
                Technical Skills
              </h3>
              <div className="">
                {data.technicalSkills.frontend?.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs uppercase text-slate-400 mb-1">
                      Frontend
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {data.technicalSkills.frontend.map((s, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded text-xs mr-1 mb-1"
                          style={{
                            backgroundColor: `${themeColor}20`,
                            border: `1px solid ${themeColor}40`,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {data.technicalSkills.backend?.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs uppercase text-slate-400 mb-1">
                      Backend
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {data.technicalSkills.backend.map((s, i) => (
                        <span
                          key={i}
                          className="bg-slate-700 px-1.5 py-0.5 rounded text-xs mr-1 mb-1"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {data.technicalSkills.aiDevOps?.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs uppercase text-slate-400 mb-1">
                      AI & DevOps
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {data.technicalSkills.aiDevOps.map((s, i) => (
                        <span
                          key={i}
                          className="bg-slate-700 px-1.5 py-0.5 rounded text-xs mr-1 mb-1"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Combine others if needed or show all */}
                {(data.technicalSkills.database?.length > 0 ||
                  data.technicalSkills.tools?.length > 0) && (
                  <div>
                    <div className="text-xs uppercase text-slate-400 mb-1">
                      Tools & DB
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {[
                        ...(data.technicalSkills.database || []),
                        ...(data.technicalSkills.tools || []),
                      ].map((s, i) => (
                        <span
                          key={i}
                          className="bg-slate-700 px-1.5 py-0.5 rounded text-xs mr-1 mb-1"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Competencies */}
        {data.competencies?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold border-b border-slate-600 pb-1 mb-3">
              Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.competencies.map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-700 px-2 py-1 text-xs rounded mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Software */}
        {data.softwareProficiency?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold border-b border-slate-600 pb-1 mb-3">
              Software
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.softwareProficiency.map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-700 px-2 py-1 text-xs rounded mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education (Sidebar style) */}
        {education?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold border-b border-slate-600 pb-1 mb-3">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <p className="font-bold text-sm">{edu.institution}</p>
                  <p className="text-xs text-slate-400">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  <p className="text-xs italic">{edu.degree}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {personalInfo?.profileSummary && (
          <div className="mb-8">
            <h2
              className="text-xl font-bold uppercase border-b-2 pb-2 mb-3"
              style={{ color: themeColor, borderColor: `${themeColor}20` }}
            >
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              {personalInfo.profileSummary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xl font-bold uppercase border-b-2 pb-2 mb-4"
              style={{ color: themeColor, borderColor: `${themeColor}20` }}
            >
              Experience
            </h2>
            <div className="">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="mb-6"
                  style={{ pageBreakInside: "avoid" }}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-slate-700">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium text-sm mb-2">
                    {exp.company}
                  </p>
                  {exp.responsibilities && (
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-600">
                      {exp.responsibilities.map((res, i) => (
                        <li key={i} className="mb-1">
                          {res}
                        </li>
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
          <div className="mb-8">
            <h2 className="text-xl font-bold uppercase text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj, index) => (
                <div
                  key={index}
                  className="mb-4"
                  style={{ pageBreakInside: "avoid" }}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-md text-slate-700">
                      {proj.name}
                    </h3>
                    {proj.link && (
                      <a href={proj.link} className="text-blue-500 text-xs">
                        Link
                      </a>
                    )}
                  </div>
                  <ul className="list-disc list-outside ml-4 text-sm text-gray-600">
                    {proj.description?.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClearTemplate;
