import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const TraditionalTemplate = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      className="w-full bg-white p-10 text-gray-900 font-serif"
      style={{ minHeight: "297mm", padding: "15mm" }}
    >
      {/* Header - Centered */}
      <div className="text-center border-b-2 border-black pb-6 mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center flex-wrap mt-4 text-xs font-bold text-gray-700">
          {personalInfo?.email && (
            <span className="flex items-center gap-1.5 mx-2 mb-2">
              <FaEnvelope className="text-gray-400" /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center ml-4">
              • <FaPhoneAlt className="text-gray-400 mr-1.5" />{" "}
              {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-1.5 mx-2 mb-2">
              • <FaMapMarkerAlt className="text-gray-400" />{" "}
              {personalInfo.location}
            </span>
          )}
          {personalInfo?.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline mx-2 mb-2"
            >
              • <FaLinkedin className="text-gray-400" /> LinkedIn
            </a>
          )}
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline mx-2 mb-2"
            >
              • <FaGithub className="text-gray-400 mr-1.5" /> GitHub
            </a>
          )}
          {personalInfo?.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline mx-2 mb-2"
            >
              • <FaGlobe className="text-gray-400" /> Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo?.profileSummary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">
            Professional Summary
          </h2>
          <p className="text-md leading-relaxed text-justify">
            {personalInfo.profileSummary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4">
            Professional Experience
          </h2>
          <div className="">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="mb-5"
                style={{ pageBreakInside: "avoid" }}
              >
                <div className="flex justify-between font-bold">
                  <h3>{exp.company}</h3>
                  <span>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="italic mb-2">{exp.position}</p>
                {exp.responsibilities && (
                  <ul className="list-disc list-outside ml-5 text-sm space-y-1">
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

      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4">
            Education
          </h2>
          {education.map((edu, index) => (
            <div
              key={index}
              className="mb-4"
              style={{ pageBreakInside: "avoid" }}
            >
              <div className="flex justify-between font-bold">
                <h3>{edu.institution}</h3>
                <span>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p>{edu.degree}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {/* Technical Skills */}
      {data.technicalSkills &&
        Object.values(data.technicalSkills).some((arr) => arr?.length > 0) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">
              Technical Skills
            </h2>
            <div className="text-sm">
              {data.technicalSkills.frontend?.length > 0 && (
                <div>
                  <span className="font-bold">Frontend:</span>{" "}
                  {data.technicalSkills.frontend.join(", ")}
                </div>
              )}
              {data.technicalSkills.backend?.length > 0 && (
                <div>
                  <span className="font-bold">Backend:</span>{" "}
                  {data.technicalSkills.backend.join(", ")}
                </div>
              )}
              {data.technicalSkills.database?.length > 0 && (
                <div>
                  <span className="font-bold">Database:</span>{" "}
                  {data.technicalSkills.database.join(", ")}
                </div>
              )}
              {data.technicalSkills.aiDevOps?.length > 0 && (
                <div>
                  <span className="font-bold">AI / DevOps:</span>{" "}
                  {data.technicalSkills.aiDevOps.join(", ")}
                </div>
              )}
              {data.technicalSkills.tools?.length > 0 && (
                <div className="mb-2">
                  <span className="font-bold">Tools:</span>{" "}
                  {data.technicalSkills.tools.join(", ")}
                </div>
              )}
            </div>
          </div>
        )}

      {/* Competencies & Software */}
      {(data.competencies?.length > 0 ||
        data.softwareProficiency?.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">
            Additional Skills
          </h2>
          <div className="text-sm">
            {data.competencies?.length > 0 && (
              <div>
                <span className="font-bold">Competencies:</span>{" "}
                {data.competencies.join(" • ")}
              </div>
            )}
            {data.softwareProficiency?.length > 0 && (
              <div>
                <span className="font-bold">Software Proficiency:</span>{" "}
                {data.softwareProficiency.join(", ")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TraditionalTemplate;
