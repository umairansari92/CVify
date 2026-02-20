import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const GlobalTemplate = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    technicalSkills,
    projects,
    competencies,
    softwareProficiency,
  } = data || {};

  return (
    <div
      className="w-full bg-white text-slate-800 p-12 font-sans shadow-lg mx-auto"
      style={{ minHeight: "297mm", maxWidth: "210mm" }}
    >
      {/* Header */}
      <header className="flex flex-col items-center text-center space-y-4 mb-10 pb-8 border-b border-slate-100">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          {personalInfo?.jobTitle || "Job Title"}
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-[11px] text-slate-600">
          {personalInfo?.email && (
            <span className="flex items-center gap-2">
              <FaEnvelope className="text-slate-400" /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="text-slate-400" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-slate-400" />{" "}
              {personalInfo.location}
            </span>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold">
          {personalInfo?.linkedin && (
            <a
              href={personalInfo.linkedin}
              className="text-slate-500 hover:text-primary flex items-center gap-2 transition-colors"
            >
              <FaLinkedin className="text-blue-500" /> LINKEDIN
            </a>
          )}
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              className="text-slate-500 hover:text-primary flex items-center gap-2 transition-colors"
            >
              <FaGithub className="text-slate-900" /> GITHUB
            </a>
          )}
          {personalInfo?.portfolio && (
            <a
              href={personalInfo.portfolio}
              className="text-slate-500 hover:text-primary flex items-center gap-2 transition-colors"
            >
              <FaGlobe className="text-orange-500" /> PORTFOLIO
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-10">
        {/* Summary */}
        {personalInfo?.profileSummary && (
          <section className="animate-fadeIn">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 mb-4 border-b border-slate-900 pb-1 w-full">
              Professional Summary
            </h2>
            <p className="text-[13px] leading-relaxed text-slate-700 text-justify">
              {personalInfo.profileSummary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section className="animate-fadeIn">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 mb-6 border-b border-slate-900 pb-1 w-full">
              Work Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {exp.position}
                    </h3>
                    <span className="text-[11px] font-medium text-slate-400">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-3">
                    {exp.company}
                  </p>
                  <ul className="space-y-2">
                    {exp.responsibilities?.map((res, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[12.5px] text-slate-700 leading-relaxed italic"
                      >
                        <span className="text-slate-300 mt-1.5">•</span>
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section className="animate-fadeIn">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 mb-6 border-b border-slate-900 pb-1 w-full">
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className="border-l-2 border-slate-100 pl-6 py-1 hover:border-primary transition-colors"
                >
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-[15px] font-bold text-slate-900">
                      {proj.name}
                    </h3>
                    <span className="text-[10px] uppercase font-black text-slate-300 tracking-widest">
                      {proj.startDate}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {proj.description?.map((desc, j) => (
                      <li
                        key={j}
                        className="text-[12.5px] text-slate-600 italic"
                      >
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          {education?.length > 0 && (
            <section className="animate-fadeIn">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 mb-6 border-b border-slate-900 pb-1 w-full">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-sm font-bold text-slate-900">
                      {edu.degree}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {edu.institution}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {edu.startDate} — {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Skills */}
          <section className="animate-fadeIn">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 mb-6 border-b border-slate-900 pb-1 w-full">
              Skills
            </h2>
            <div className="space-y-4">
              {technicalSkills &&
                Object.entries(technicalSkills).map(
                  ([cat, list], i) =>
                    list?.length > 0 && (
                      <div key={i}>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                          {cat}
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed italic">
                          {list.join(", ")}
                        </p>
                      </div>
                    ),
                )}
              {competencies?.length > 0 && (
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                    Core Strengths
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    {competencies.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GlobalTemplate;
