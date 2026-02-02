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

const TechnicalTemplate = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    softwareProficiency,
  } = data;

  return (
    <div
      className="w-full bg-[#1a1c24] text-gray-300 font-mono p-8 relative"
      style={{ minHeight: "297mm", padding: "15mm" }}
    >
      {/* Code Header */}
      <div className="bg-slate-900 text-green-400 p-6 rounded-md mb-6 font-mono shadow-lg">
        <div className="flex mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        </div>
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-blue-400">const</span>{" "}
          <span className="text-yellow-300">developer</span> ={" "}
          <span className="text-white">
            "{personalInfo?.fullName || "User"}"
          </span>
          ;
        </h1>
        <p className="text-slate-400 mb-4">
          <span className="text-purple-400">developer</span>.
          <span className="text-blue-300">setTitle</span>(
          <span className="text-orange-300">
            "{personalInfo?.jobTitle || "Developer"}"
          </span>
          );
        </p>

        <div className="text-[10px] text-slate-500 font-bold flex flex-wrap mt-2">
          {personalInfo?.email && (
            <span className="flex items-center mr-6 mb-2">
              <FaEnvelope className="text-slate-600 mr-1.5" />{" "}
              {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center mr-6 mb-2">
              <FaPhoneAlt className="text-slate-600 mr-1.5" />{" "}
              {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center mr-6 mb-2">
              <FaMapMarkerAlt className="text-slate-600 mr-1.5" />{" "}
              {personalInfo.location}
            </span>
          )}
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mr-6 mb-2 text-green-500 hover:text-green-400 transition-colors"
            >
              <FaGithub className="mr-1.5" /> GitHub
            </a>
          )}
          {personalInfo?.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <FaLinkedin /> LinkedIn
            </a>
          )}
          {personalInfo?.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <FaGlobe /> Portfolio
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Col: Skills & Stack */}
        <div className="col-span-1">
          {data.technicalSkills &&
            Object.values(data.technicalSkills).some(
              (arr) => arr?.length > 0,
            ) && (
              <div
                className="bg-white p-4 rounded shadow-sm border border-slate-200 mb-6"
                style={{ pageBreakInside: "avoid" }}
              >
                <h3 className="font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
                  Tech Stack
                </h3>
                <div className="space-y-3">
                  {data.technicalSkills.frontend?.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold">
                        Frontend
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.technicalSkills.frontend.map((s, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.technicalSkills.backend?.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold">
                        Backend
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.technicalSkills.backend.map((s, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.technicalSkills.database?.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold">
                        Database
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.technicalSkills.database.map((s, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.technicalSkills.aiDevOps?.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold">
                        AI/DevOps
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.technicalSkills.aiDevOps.map((s, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.technicalSkills.tools?.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold">
                        Tools
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.technicalSkills.tools.map((s, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-300"
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

          {data.competencies?.length > 0 && (
            <div className="bg-white p-4 rounded shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
                Competencies
              </h3>
              <ul className="list-disc list-inside text-xs text-slate-600 leading-5">
                {data.competencies.map((c, index) => (
                  <li key={index}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {softwareProficiency?.length > 0 && (
            <div className="bg-white p-4 rounded shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
                Tools
              </h3>
              <ul className="list-disc list-inside text-xs text-slate-600">
                {softwareProficiency.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>
          )}

          {education?.length > 0 && (
            <div className="bg-white p-4 rounded shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
                Education
              </h3>
              {education.map((edu, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="font-bold text-xs">{edu.degree}</div>
                  <div className="text-xs text-slate-500">
                    {edu.institution}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {edu.startDate}-{edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Experience & Projects */}
        <div className="col-span-2">
          {experience?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-500">function</span> getExperience(){" "}
                {"{"}
              </h2>
              <div className="border-l-2 border-slate-200 pl-6 ml-2">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative mb-6"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    <div className="absolute -left-[31px] top-0 w-4 h-4 bg-white border-2 border-blue-500 rounded-full"></div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-base text-slate-800">
                        {exp.position}
                      </h3>
                      <span className="text-xs text-slate-500">
                        [{exp.startDate} :: {exp.endDate}]
                      </span>
                    </div>
                    <div className="text-blue-600 font-semibold mb-2">
                      @ {exp.company}
                    </div>
                    {exp.responsibilities && (
                      <ul className="space-y-1 text-slate-700">
                        {exp.responsibilities.map((res, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-slate-400 select-none">{`>`}</span>
                            {res}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <span className="text-slate-400 ml-2 mt-4 block">{"}"}</span>
            </section>
          )}

          {projects?.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-500">const</span> projects = [
              </h2>
              <div className="space-y-4 pl-4">
                {projects.map((proj, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 border border-slate-200 rounded hover:border-blue-400 transition-colors mb-4"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-slate-800">{proj.name}</h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          className="text-blue-500 hover:underline"
                        >
                          git push
                        </a>
                      )}
                    </div>
                    <div className="text-slate-600 text-xs">
                      {proj.description?.join(" ")}
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-slate-900 ml-0 mt-4 block">];</span>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalTemplate;
