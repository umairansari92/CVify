import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const EliteTemplate = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    technicalSkills,
    projects,
    competencies,
    customSections,
    themeColor = "#0f172a",
    fontFamily = "Playfair Display",
  } = data || {};

  const getFontFamily = (font) => {
    switch (font) {
      case "Inter":
        return "'Inter', sans-serif";
      case "Manrope":
        return "'Manrope', sans-serif";
      case "Playfair Display":
        return "'Playfair Display', serif";
      case "Plus Jakarta Sans":
        return "'Plus Jakarta Sans', sans-serif";
      case "Public Sans":
        return "'Public Sans', sans-serif";
      default:
        return "'Playfair Display', serif"; // Elite defaults to Serif
    }
  };

  return (
    <div
      className="w-full bg-white text-slate-900 p-[15mm] shadow-xl mx-auto border-[12px] transition-all duration-500"
      style={{
        minHeight: "297mm",
        maxWidth: "210mm",
        fontFamily: getFontFamily(fontFamily),
        borderColor: `${themeColor}10`, // 10% opacity for the border
      }}
    >
      {/* Heavy Corporate Header */}
      <header
        className="border-b-[3px] pb-6 mb-8"
        style={{ borderColor: themeColor }}
      >
        <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <h2 className="text-lg font-bold text-slate-500 uppercase tracking-widest mb-6">
          {personalInfo?.jobTitle || "Job Title"}
        </h2>

        <div className="flex flex-wrap justify-between items-center gap-4 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-700">
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
          <div className="flex gap-4">
            {personalInfo?.linkedin && (
              <a
                href={personalInfo.linkedin}
                className="p-2 bg-slate-100 rounded hover:bg-slate-900 hover:text-white transition-all"
              >
                <FaLinkedin size={14} />
              </a>
            )}
            {personalInfo?.github && (
              <a
                href={personalInfo.github}
                className="p-2 bg-slate-100 rounded hover:bg-slate-900 hover:text-white transition-all"
              >
                <FaGithub size={14} />
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="space-y-8">
        {/* Executive Summary */}
        {personalInfo?.profileSummary && (
          <section>
            <h3
              className="text-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] mb-4"
              style={{ backgroundColor: themeColor }}
            >
              Executive Summary
            </h3>
            <p className="text-sm leading-relaxed text-justify px-2 italic text-slate-700 border-l-4 border-slate-200 ml-2">
              {personalInfo.profileSummary}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experience?.length > 0 && (
          <section>
            <h3
              className="text-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] mb-6"
              style={{ backgroundColor: themeColor }}
            >
              Professional Experience
            </h3>
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-6 border-l-2 border-slate-100 hover:border-slate-900 transition-colors"
                >
                  <div
                    className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 rounded-full"
                    style={{ borderColor: themeColor }}
                  ></div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-base font-black text-slate-900 uppercase italic">
                      {exp.position}
                    </h4>
                    <span className="text-xs font-black text-slate-400 bg-slate-50 px-2 py-1 rounded">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-blue-800 mb-3">
                    {exp.company}
                  </p>
                  <ul className="space-y-2">
                    {exp.responsibilities?.map((res, j) => (
                      <li
                        key={j}
                        className="text-[13px] text-slate-700 leading-relaxed flex gap-3"
                      >
                        <span className="text-slate-900 font-bold">•</span>
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Core Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main Body (Education & Projects) */}
          <div className="md:col-span-3 space-y-8">
            {education?.length > 0 && (
              <section>
                <h3
                  className="text-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] mb-4"
                  style={{ backgroundColor: themeColor }}
                >
                  Education
                </h3>
                <div className="space-y-4 px-2">
                  {education.map((edu, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-start border-b border-slate-50 pb-2"
                    >
                      <div>
                        <p className="text-sm font-black text-slate-900">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-slate-500 font-bold uppercase mt-1">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-[10px] font-black text-slate-400">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects?.length > 0 && (
              <section>
                <h3
                  className="text-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] mb-4"
                  style={{ backgroundColor: themeColor }}
                >
                  Key Projects
                </h3>
                <div className="space-y-4 px-2">
                  {projects.map((proj, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-800 transition-colors uppercase">
                          {proj.name}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-300">
                          {proj.startDate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-slate-100 pl-4">
                        {proj.description?.join(" ")}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Area (Skills) */}
          <div className="md:col-span-1 space-y-6">
            <section>
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4 border-b-2 border-slate-900 pb-1">
                Expertise
              </h3>
              <div className="space-y-4">
                {technicalSkills &&
                  Object.entries(technicalSkills).map(
                    ([cat, list], i) =>
                      list?.length > 0 && (
                        <div key={i}>
                          <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                            {cat}
                          </p>
                          <ul className="text-[10px] text-slate-700 font-bold space-y-1">
                            {list.map((s, idx) => (
                              <li key={idx}>- {s}</li>
                            ))}
                          </ul>
                        </div>
                      ),
                  )}
                {competencies?.length > 0 && (
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                      Core Skills
                    </p>
                    <ul className="text-[10px] text-slate-700 font-bold space-y-1">
                      {competencies.map((c, idx) => (
                        <li key={idx}>- {c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Custom Sections */}
        {customSections?.map((section, i) => (
          <section key={i} className="animate-fadeIn">
            <h3
              className="text-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] mb-4"
              style={{ backgroundColor: themeColor }}
            >
              {section.title}
            </h3>
            <ul className="space-y-2 px-2">
              {section.items?.map((item, j) => (
                <li
                  key={j}
                  className="text-[13px] text-slate-700 leading-relaxed flex gap-3"
                >
                  <span
                    className="font-bold shrink-0"
                    style={{ color: themeColor }}
                  >
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default EliteTemplate;
