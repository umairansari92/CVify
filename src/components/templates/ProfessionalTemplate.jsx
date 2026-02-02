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

const ProfessionalTemplate = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="w-full flex bg-white min-h-[1122px] text-gray-800">
      {/* Sidebar (Left, Dark) */}
      <div className="w-1/3 bg-slate-800 text-white p-8 flex flex-col gap-8">
        {/* Profile Image could go here if we had one */}

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-2 mb-4">
            Contact
          </h3>
          <div className="text-sm space-y-4">
            {personalInfo?.email && (
              <div className="flex items-start gap-3 break-all">
                <FaEnvelope className="mt-1 text-blue-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-0.5">
                    Email
                  </span>
                  {personalInfo.email}
                </div>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 text-blue-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-0.5">
                    Phone
                  </span>
                  {personalInfo.phone}
                </div>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-blue-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-0.5">
                    Location
                  </span>
                  {personalInfo.location}
                </div>
              </div>
            )}
            {personalInfo?.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group transition-colors"
              >
                <FaLinkedin className="mt-1 text-blue-400 shrink-0 group-hover:text-blue-300" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-0.5">
                    LinkedIn
                  </span>
                  <span className="group-hover:underline">View Profile</span>
                </div>
              </a>
            )}
            {personalInfo?.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group transition-colors"
              >
                <FaGithub className="mt-1 text-slate-400 shrink-0 group-hover:text-white" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-0.5">
                    GitHub
                  </span>
                  <span className="group-hover:underline">Source Code</span>
                </div>
              </a>
            )}
            {personalInfo?.portfolio && (
              <a
                href={personalInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group transition-colors"
              >
                <FaGlobe className="mt-1 text-blue-400 shrink-0 group-hover:text-blue-300" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-0.5">
                    Portfolio
                  </span>
                  <span className="group-hover:underline">Visit Site</span>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Education (Sidebar) */}
        {education?.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-2 mb-4">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="font-bold text-white">{edu.degree}</div>
                  <div className="text-sm text-slate-300">
                    {edu.institution}
                  </div>
                  <div className="text-xs text-slate-400 italic mt-1">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills (Sidebar) */}
        {/* Technical Skills (Sidebar) */}
        {data.technicalSkills &&
          Object.values(data.technicalSkills).some(
            (arr) => arr?.length > 0,
          ) && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-2 mb-4">
                Technical Skills
              </h3>
              <div className="space-y-4 text-sm text-slate-300">
                {data.technicalSkills.frontend?.length > 0 && (
                  <div>
                    <div className="text-xs uppercase text-slate-500 mb-1">
                      Frontend
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.technicalSkills.frontend.map((s, i) => (
                        <span
                          key={i}
                          className="bg-slate-700 px-2 py-0.5 rounded text-xs text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {data.technicalSkills.backend?.length > 0 && (
                  <div>
                    <div className="text-xs uppercase text-slate-500 mb-1">
                      Backend
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.technicalSkills.backend.map((s, i) => (
                        <span
                          key={i}
                          className="bg-slate-700 px-2 py-0.5 rounded text-xs text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {data.technicalSkills.aiDevOps?.length > 0 && (
                  <div>
                    <div className="text-xs uppercase text-slate-500 mb-1">
                      AI & DevOps
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.technicalSkills.aiDevOps.map((s, i) => (
                        <span
                          key={i}
                          className="bg-slate-700 px-2 py-0.5 rounded text-xs text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Tools/DB/Others */}
                {(data.technicalSkills.database?.length > 0 ||
                  data.technicalSkills.tools?.length > 0) && (
                  <div>
                    <div className="text-xs uppercase text-slate-500 mb-1">
                      Tools & DB
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        ...(data.technicalSkills.database || []),
                        ...(data.technicalSkills.tools || []),
                      ].map((s, i) => (
                        <span
                          key={i}
                          className="bg-slate-700 px-2 py-0.5 rounded text-xs text-slate-300"
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

        {/* Competencies (Sidebar) */}
        {data.competencies?.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-2 mb-4">
              Competencies
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {data.competencies.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Software (Sidebar) */}
        {data.softwareProficiency?.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-2 mb-4">
              Software
            </h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {data.softwareProficiency.map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-700 px-2 py-1 rounded text-xs text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content (Right, White) */}
      <div className="w-2/3 p-10">
        {/* Name Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight mb-2">
            {personalInfo?.fullName || "Your Name"}
          </h1>
          <p className="text-xl text-blue-700 font-medium">
            {personalInfo?.jobTitle || "Job Title"}
          </p>
        </div>

        {/* Summary */}
        {personalInfo?.profileSummary && (
          <div className="mb-8">
            <p className="text-gray-700 leading-7">
              {personalInfo.profileSummary}
            </p>
          </div>
        )}

        <hr className="border-gray-200 mb-8" />

        {/* Experience */}
        {experience?.length > 0 && (
          <ResumeSection
            title="Work History"
            titleClassName="text-slate-800 border-slate-300"
          >
            {experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex justify-between items-end mb-1">
                  <h3 className="font-bold text-lg text-slate-800">
                    {exp.position}
                  </h3>
                  <span className="text-sm font-semibold text-slate-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="text-blue-700 font-medium text-sm mb-2">
                  {exp.company}
                </div>
                {exp.responsibilities && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700">
                    {exp.responsibilities.map((res, i) => (
                      <li key={i}>{res}</li>
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
            titleClassName="text-slate-800 border-slate-300"
          >
            {projects.map((proj, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-800">{proj.name}</h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      View Live
                    </a>
                  )}
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700">
                  {proj.description?.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </ResumeSection>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
