import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const MinimalTemplate = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      className="w-full bg-white p-12 text-gray-900"
      style={{ minHeight: "297mm", fontFamily: '"Open Sans", sans-serif' }}
    >
      {/* Centered Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase mb-4 text-black">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-sm tracking-widest uppercase text-gray-500 mb-6">
          {personalInfo?.jobTitle || "Job Title"}
        </p>

        <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 text-[10px] tracking-widest text-gray-500 uppercase mt-4">
          {personalInfo?.email && (
            <span className="flex items-center gap-1.5">
              <FaEnvelope className="text-gray-300" /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-1.5">
              <FaPhoneAlt className="text-gray-300" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-gray-300" />{" "}
              {personalInfo.location}
            </span>
          )}
          {personalInfo?.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <FaLinkedin /> LinkedIn
            </a>
          )}
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <FaGithub /> GitHub
            </a>
          )}
          {personalInfo?.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <FaGlobe /> Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo?.profileSummary && (
        <div className="max-w-xl mx-auto text-center mb-12">
          <p className="text-sm leading-7 text-gray-700">
            {personalInfo.profileSummary}
          </p>
        </div>
      )}

      {/* Sections - No borders, just whitespace */}

      {/* Experience */}
      {experience?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-8 text-black">
            Professional Experience
          </h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-semibold text-base">{exp.position}</h3>
                  <span className="text-xs text-gray-500 font-mono">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div className="text-sm italic text-gray-600 mb-2">
                  {exp.company}
                </div>
                {exp.responsibilities && (
                  <ul className="text-sm leading-6 text-gray-700 list-disc list-outside ml-4">
                    {exp.responsibilities.map((res, i) => (
                      <li key={i} className="pl-1">
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
        <div className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-8 text-black">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {projects.map((proj, index) => (
              <div key={index}>
                <h3 className="font-semibold text-sm mb-1">{proj.name}</h3>
                {proj.description?.map((desc, i) => (
                  <p key={i} className="text-xs text-gray-600 leading-5">
                    {desc}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills Split */}
      <div className="grid grid-cols-2 gap-12 max-w-3xl mx-auto">
        {education?.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6 text-black">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="text-center mb-4">
                <div className="font-semibold text-sm">{edu.institution}</div>
                <div className="text-xs text-gray-600">{edu.degree}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {edu.startDate} – {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        )}

        {((data.technicalSkills &&
          Object.values(data.technicalSkills).some((arr) => arr?.length > 0)) ||
          data.competencies?.length > 0) && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6 text-black">
              Skills & Competencies
            </h2>

            {/* Technical Skills */}
            {data.technicalSkills &&
              Object.values(data.technicalSkills).some(
                (arr) => arr?.length > 0,
              ) && (
                <div className="text-center text-sm text-gray-700 leading-7 mb-4 space-y-1">
                  {data.technicalSkills.frontend?.length > 0 && (
                    <div>
                      <span className="font-semibold">Frontend:</span>{" "}
                      {data.technicalSkills.frontend.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.backend?.length > 0 && (
                    <div>
                      <span className="font-semibold">Backend:</span>{" "}
                      {data.technicalSkills.backend.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.database?.length > 0 && (
                    <div>
                      <span className="font-semibold">Database:</span>{" "}
                      {data.technicalSkills.database.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.aiDevOps?.length > 0 && (
                    <div>
                      <span className="font-semibold">AI/DevOps:</span>{" "}
                      {data.technicalSkills.aiDevOps.join(", ")}
                    </div>
                  )}
                  {data.technicalSkills.tools?.length > 0 && (
                    <div>
                      <span className="font-semibold">Tools:</span>{" "}
                      {data.technicalSkills.tools.join(", ")}
                    </div>
                  )}
                </div>
              )}

            {/* Competencies */}
            {data.competencies?.length > 0 && (
              <div className="text-center text-sm text-gray-700 leading-7 mb-4">
                <span className="font-semibold block mb-1">Competencies</span>
                {data.competencies.join(" • ")}
              </div>
            )}

            {/* Software */}
            {data.softwareProficiency?.length > 0 && (
              <div className="text-center text-sm text-gray-700 leading-7">
                <span className="font-semibold block mb-1">Software</span>
                {data.softwareProficiency.join(" • ")}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
