import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ExecutiveTemplate = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      className="w-full bg-[#fdfdfd] text-slate-800 p-12 leading-snug shadow-inner border-x-4 border-slate-200"
      style={{ padding: "15mm" }}
    >
      {/* Header - Formal & Center */}
      <div className="text-center border-b-4 border-gray-900 pb-8 mb-10">
        <h1 className="text-4xl font-extrabold uppercase tracking-widest text-gray-900 mb-2">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-lg uppercase tracking-wide font-semibold text-gray-600 mb-6">
          {personalInfo?.jobTitle || "Job Title"}
        </p>

        <div className="flex justify-center flex-wrap text-sm font-bold text-gray-800 border-t border-gray-300 pt-6 mt-4 w-full">
          {personalInfo?.email && (
            <span className="flex items-center gap-2 uppercase tracking-tighter mx-5 mb-4">
              <FaEnvelope className="text-gray-400" /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-2 uppercase tracking-tighter mx-5 mb-4">
              <FaPhoneAlt className="text-gray-400" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-2 uppercase tracking-tighter mx-5 mb-4">
              <FaMapMarkerAlt className="text-gray-400" />{" "}
              {personalInfo.location}
            </span>
          )}
        </div>
      </div>

      <div className="w-full">
        {/* Main Column */}
        <div
          style={{
            display: "inline-block",
            width: "65%",
            verticalAlign: "top",
            paddingRight: "1.5rem",
          }}
        >
          {/* Summary */}
          {personalInfo?.profileSummary && (
            <div className="mb-10">
              <h3 className="text-lg font-bold uppercase border-b-2 border-gray-900 mb-4 pb-1">
                Professional Profile
              </h3>
              <p className="text-justify text-gray-800 leading-relaxed font-medium">
                {personalInfo.profileSummary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-bold uppercase border-b-2 border-gray-900 mb-6 pb-1">
                Professional Experience
              </h3>
              <div className="">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="mb-8"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-xl font-bold text-gray-900">
                        {exp.position}
                      </h4>
                      <span className="font-bold text-gray-600 text-sm">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div className="text-lg text-gray-700 font-semibold mb-3">
                      {exp.company}
                    </div>
                    {exp.responsibilities && (
                      <ul className="list-square list-outside ml-5 text-gray-800 space-y-2">
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

          {projects?.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-bold uppercase border-b-2 border-gray-900 mb-6 pb-1">
                Key Initiatives
              </h3>
              <div className="space-y-4">
                {projects.map((proj, index) => (
                  <div
                    key={index}
                    className="mb-4"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    <h4 className="font-bold text-gray-900">{proj.name}</h4>
                    <p className="text-sm text-gray-700">
                      {proj.description?.join(". ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Boxed */}
        <div
          style={{
            display: "inline-block",
            width: "35%",
            verticalAlign: "top",
            paddingLeft: "1.5rem",
          }}
        >
          {/* Education Box */}
          {education?.length > 0 && (
            <div
              className="bg-gray-100 p-6 border-l-4 border-gray-900 mb-10"
              style={{ pageBreakInside: "avoid" }}
            >
              <h3 className="text-base font-bold uppercase mb-4 text-gray-900">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="font-bold text-gray-900">
                      {edu.institution}
                    </div>
                    <div className="text-sm text-gray-700">{edu.degree}</div>
                    <div className="text-xs text-gray-500 font-bold">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competencies Box */}
          {/* Technical Skills Box */}
          {data.technicalSkills &&
            Object.values(data.technicalSkills).some(
              (arr) => arr?.length > 0,
            ) && (
              <div
                className="bg-gray-100 p-6 border-l-4 border-gray-900 mb-10"
                style={{ pageBreakInside: "avoid" }}
              >
                <h3 className="text-base font-bold uppercase mb-4 text-gray-900">
                  Technical Expertise
                </h3>
                <div className="text-sm text-gray-800">
                  {data.technicalSkills.frontend?.length > 0 && (
                    <div className="mb-3">
                      <span className="font-bold underline">Frontend:</span>{" "}
                      {data.technicalSkills.frontend.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.backend?.length > 0 && (
                    <div className="mb-3">
                      <span className="font-bold underline">Backend:</span>{" "}
                      {data.technicalSkills.backend.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.database?.length > 0 && (
                    <div className="mb-3">
                      <span className="font-bold underline">Database:</span>{" "}
                      {data.technicalSkills.database.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.aiDevOps?.length > 0 && (
                    <div className="mb-3">
                      <span className="font-bold underline">AI/DevOps:</span>{" "}
                      {data.technicalSkills.aiDevOps.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Competencies Box */}
          {data.competencies?.length > 0 && (
            <div
              className="bg-gray-100 p-6 border-l-4 border-gray-900 mb-10"
              style={{ pageBreakInside: "avoid" }}
            >
              <h3 className="text-base font-bold uppercase mb-4 text-gray-900">
                Core Competencies
              </h3>
              <ul className="">
                {data.competencies.map((skill, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-800 font-semibold border-b border-gray-300 pb-2 mb-2 last:border-0"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Software Box */}
          {data.softwareProficiency?.length > 0 && (
            <div className="bg-gray-100 p-6 border-l-4 border-gray-900">
              <h3 className="text-base font-bold uppercase mb-4 text-gray-900">
                Software
              </h3>
              <div className="flex flex-wrap gap-2 text-sm text-gray-800 font-medium">
                {data.softwareProficiency.join(" • ")}
              </div>
            </div>
          )}

          {/* Links Box */}
          <div className="bg-gray-800 text-white p-6">
            <h3 className="text-base font-bold uppercase mb-6 text-white text-center border-b border-gray-700 pb-3">
              Professional Links
            </h3>
            <div className="space-y-4">
              {personalInfo?.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-blue-300 transition-colors mb-4"
                >
                  <FaLinkedin className="text-gray-400" /> LinkedIn Profile
                </a>
              )}
              {personalInfo?.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-slate-300 transition-colors"
                >
                  <FaGithub className="text-gray-400" /> GitHub Profile
                </a>
              )}
              {personalInfo?.portfolio && (
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-blue-300 transition-colors"
                >
                  <FaGlobe className="text-gray-400" /> Digital Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
