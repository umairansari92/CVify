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
    <div className="w-full bg-white text-gray-800" style={{ padding: "15mm" }}>
      {/* Sidebar (Left, Dark) */}
      <div
        style={{
          display: "inline-block",
          width: "32%",
          verticalAlign: "top",
          backgroundColor: "#1e293b",
          color: "white",
          padding: "2rem",
          minHeight: "260mm",
        }}
      >
        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-2 mb-4">
            Contact
          </h3>
          {/* ... contact details ... (no changes needed to internal flex) */}
          <div className="text-sm">
            {personalInfo?.email && (
              <div className="flex items-start gap-3 break-all mb-4">
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
              <div className="flex items-start gap-3 mb-4">
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
                className="flex items-start gap-3 group transition-colors mb-4 mt-4 block"
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
                className="flex items-start gap-3 group transition-colors mb-4 block"
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
                className="flex items-start gap-3 group transition-colors mb-4 block"
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
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-2 mb-4">
              Education
            </h3>
            <div className="">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="mb-4"
                  style={{ pageBreakInside: "avoid" }}
                >
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
        {data.technicalSkills &&
          Object.values(data.technicalSkills).some(
            (arr) => arr?.length > 0,
          ) && (
            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-2 mb-4">
                Technical Skills
              </h3>
              <div className="text-sm text-slate-300">
                {data.technicalSkills.frontend?.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs uppercase text-slate-500 mb-1">
                      Frontend
                    </div>
                    <div className="flex flex-wrap">
                      {data.technicalSkills.frontend.map((s, i) => (
                        <span
                          key={i}
                          className="bg-slate-700 px-2 py-0.5 rounded text-xs text-slate-300 mr-2 mb-2"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {data.technicalSkills.backend?.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs uppercase text-slate-500 mb-1">
                      Backend
                    </div>
                    <div className="flex flex-wrap">
                      {data.technicalSkills.backend.map((s, i) => (
                        <span
                          key={i}
                          className="bg-slate-700 px-2 py-0.5 rounded text-xs text-slate-300 mr-2 mb-2"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* ... other skills ... */}
              </div>
            </div>
          )}
      </div>

      {/* Main Content (Right, White) */}
      <div
        style={{
          display: "inline-block",
          width: "68%",
          verticalAlign: "top",
          padding: "2.5rem",
        }}
      >
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
              <div
                key={index}
                className="mb-6 last:mb-0"
                style={{ pageBreakInside: "avoid" }}
              >
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
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
