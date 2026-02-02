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

const BoldTemplate = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      className="w-full bg-white p-0 text-gray-900 font-sans leading-tight shadow-2xl relative"
      style={{ minHeight: "297mm" }}
    >
      {/* Dark Header */}
      <div className="bg-gray-900 text-white p-10 pb-12">
        <h1 className="text-4xl font-extrabold uppercase tracking-wider mb-2">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-xl text-gray-300 font-light tracking-wide mb-6">
          {personalInfo?.jobTitle || "Job Title"}
        </p>

        <div className="flex flex-wrap gap-6 text-sm text-gray-400 mt-4">
          {personalInfo?.email && (
            <span className="flex items-center gap-2">
              <FaEnvelope className="text-gray-400" /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-400" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-400" />{" "}
              {personalInfo.location}
            </span>
          )}
          {personalInfo?.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin /> LinkedIn
            </a>
          )}
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub /> GitHub
            </a>
          )}
          {personalInfo?.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaGlobe /> Portfolio
            </a>
          )}
        </div>
      </div>

      <div className="p-10 -mt-6">
        {/* Summary Card */}
        {personalInfo?.profileSummary && (
          <div className="bg-white p-6 shadow-md border-l-4 border-gray-900 mb-8 rounded-r">
            <p className="text-gray-700 leading-relaxed italic">
              "{personalInfo.profileSummary}"
            </p>
          </div>
        )}

        <div className="grid grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="col-span-8">
            {experience?.length > 0 && (
              <ResumeSection
                title="Experience"
                titleClassName="border-gray-900 text-gray-900"
              >
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="mb-6 relative pl-4 border-l-2 border-gray-200"
                  >
                    <div className="absolute w-3 h-3 bg-gray-900 rounded-full -left-[7px] top-1.5"></div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <div className="text-sm font-semibold text-gray-600 mb-1">
                      {exp.company} | {exp.startDate} - {exp.endDate}
                    </div>

                    {exp.responsibilities && (
                      <ul className="list-disc list-outside ml-4 mt-2 text-sm text-gray-700 space-y-1">
                        {exp.responsibilities.map((res, i) => (
                          <li key={i}>{res}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </ResumeSection>
            )}

            {projects?.length > 0 && (
              <ResumeSection
                title="Key Projects"
                titleClassName="border-gray-900 text-gray-900"
              >
                {projects.map((proj, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold text-gray-900 inline-block mr-2">
                      {proj.name}
                    </h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        className="text-blue-600 text-xs underline"
                      >
                        Link
                      </a>
                    )}
                    <ul className="list-none mt-1 text-sm text-gray-700">
                      {proj.description?.map((desc, i) => (
                        <li key={i} className="mb-1">
                          » {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ResumeSection>
            )}
          </div>

          {/* Side Column */}
          <div className="col-span-4 space-y-8">
            {education?.length > 0 && (
              <div className="bg-gray-50 p-5 rounded">
                <h3 className="font-bold uppercase text-gray-900 border-b border-gray-300 pb-2 mb-4">
                  Education
                </h3>
                {education.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="font-bold text-gray-800 leading-tight">
                      {edu.institution}
                    </div>
                    <div className="text-sm text-gray-600">{edu.degree}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Technical Skills - Improved */}
            {data.technicalSkills &&
              Object.values(data.technicalSkills).some(
                (arr) => arr?.length > 0,
              ) && (
                <div className="bg-gray-50 p-5 rounded">
                  <h3 className="font-bold uppercase text-gray-900 border-b border-gray-300 pb-2 mb-4">
                    Expertise
                  </h3>
                  <div className="space-y-3">
                    {data.technicalSkills.frontend?.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase">
                          Frontend
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {data.technicalSkills.frontend.map((s, i) => (
                            <span
                              key={i}
                              className="bg-gray-200 px-1.5 py-0.5 rounded text-xs"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.technicalSkills.backend?.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase">
                          Backend
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {data.technicalSkills.backend.map((s, i) => (
                            <span
                              key={i}
                              className="bg-gray-200 px-1.5 py-0.5 rounded text-xs"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.technicalSkills.database?.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase">
                          Database
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {data.technicalSkills.database.map((s, i) => (
                            <span
                              key={i}
                              className="bg-gray-200 px-1.5 py-0.5 rounded text-xs"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.technicalSkills.aiDevOps?.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase">
                          AI & DevOps
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {data.technicalSkills.aiDevOps.map((s, i) => (
                            <span
                              key={i}
                              className="bg-gray-200 px-1.5 py-0.5 rounded text-xs"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.technicalSkills.tools?.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase">
                          Tools/Others
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {data.technicalSkills.tools.map((s, i) => (
                            <span
                              key={i}
                              className="bg-gray-200 px-1.5 py-0.5 rounded text-xs"
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
              <div className="bg-gray-50 p-5 rounded">
                <h3 className="font-bold uppercase text-gray-900 border-b border-gray-300 pb-2 mb-4">
                  Core Competencies
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {data.competencies.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Software Proficiency */}
            {data.softwareProficiency?.length > 0 && (
              <div className="bg-gray-50 p-5 rounded">
                <h3 className="font-bold uppercase text-gray-900 border-b border-gray-300 pb-2 mb-4">
                  Software
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.softwareProficiency.map((s, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 px-2 py-1 text-xs rounded text-gray-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoldTemplate;
