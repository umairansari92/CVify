import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ResumePreview from "../components/ResumePreview";
import { handleDownloadPDF } from "../utils/pdfExport";
import { FaFileDownload, FaEye } from "react-icons/fa";
import { initResumeWithData } from "../features/resume/resumeSlice";

const dummyResume = {
  personalInfo: {
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 012-3456",
    location: "San Francisco, CA",
    jobTitle: "Senior Full Stack Engineer",
    linkedin: "https://linkedin.com/in/alexrivera",
    github: "https://github.com/arivera-dev",
    portfolio: "https://alexrivera.dev",
    profileSummary:
      "Innovative Senior Full Stack Engineer with 8+ years of experience in designing and implementing scalable web applications. Expert in React, Node.js, and cloud architecture (AWS/GCP). Proven track record of leading cross-functional teams to deliver high-impact products while maintaining 99.9% system uptime and improving CI/CD efficiency by 40%.",
  },
  experience: [
    {
      company: "TechNexus Solutions",
      position: "Lead Software Architect",
      startDate: "Jan 2021",
      endDate: "Present",
      responsibilities: [
        "Architected a microservices-based e-commerce platform handling 1M+ daily active users.",
        "Reduced system latency by 35% through Redis caching and PostgreSQL optimization.",
        "Mentored a team of 15 engineers, establishing best practices for code reviews and testing.",
        "Spearheaded the migration from monolithic to serverless architecture using AWS Lambda.",
      ],
    },
    {
      company: "CloudCore Systems",
      position: "Senior Frontend Developer",
      startDate: "Jun 2017",
      endDate: "Dec 2020",
      responsibilities: [
        "Led the frontend overhaul of the main customer portal using React and TypeScript.",
        "Implemented real-time data visualization dashboards with D3.js and WebSockets.",
        "Collaborated with UI/UX designers to build a comprehensive design system (Storybook).",
        "Improved web performance scores by 25 points through lazy loading and image optimization.",
      ],
    },
  ],
  education: [
    {
      institution: "Stanford University",
      degree: "M.S. in Computer Science",
      startDate: "2015",
      endDate: "2017",
    },
    {
      institution: "UC Berkeley",
      degree: "B.S. in Software Engineering",
      startDate: "2011",
      endDate: "2015",
    },
  ],
  technicalSkills: {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "GraphQL",
    ],
    backend: ["Node.js", "Python (Django)", "Go", "gRPC", "RESTful APIs"],
    database: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
    aiDevOps: [
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD (GitHub Actions)",
      "TensorFlow",
    ],
    tools: ["Git", "Jira", "Figma", "Postman", "Sentry"],
  },
  projects: [
    {
      name: "LifeSync Hub (Productivity App)",
      link: "https://github.com/arivera-dev/lifesync",
      description: [
        "Built a full-stack productivity app with real-time sync across devices.",
        "Implemented a custom Gantt chart component for project management.",
        "Integated Google Calendar and Slack APIs for seamless workflow integration.",
      ],
    },
    {
      name: "CryptoPulse Analytics",
      link: "https://cryptopulse.live",
      description: [
        "Developed a real-time cryptocurrency tracking platform using WebSocket streams.",
        "Created complex charting libraries to visualize market sentiment.",
        "Deployed a highly reactive interface supporting 500+ coins concurrently.",
      ],
    },
  ],
  competencies: [
    "System Architecture",
    "Agile Methodology",
    "Test-Driven Development (TDD)",
    "Cloud Computing",
    "Team Leadership",
  ],
  softwareProficiency: [
    "Visual Studio Code",
    "AWS Management Console",
    "Docker Desktop",
    "MongoDB Atlas",
    "Tableau",
  ],
};

const templates = [
  { id: "modern", name: "Modern Tech" },
  { id: "professional", name: "Professional" },
  { id: "technical", name: "Technical Focus" },
  { id: "executive", name: "Executive Tier" },
  { id: "minimal", name: "Minimalist" },
  { id: "traditional", name: "Traditional" },
  { id: "classic", name: "Classic Style" },
  { id: "bold", name: "Bold Impact" },
  { id: "elegant", name: "Elegant Style" },
  { id: "clear", name: "Clear Layout" },
  { id: "global", name: "Global Minimalist" },
  { id: "elite", name: "Corporate Elite" },
];

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUseTemplate = (templateId) => {
    dispatch(initResumeWithData({ data: dummyResume, templateId }));
    navigate("/create");
  };

  return (
    <div className="p-8 bg-slate-50 dark:bg-midnight min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-primary dark:text-white tracking-tight underline decoration-action decoration-4 underline-offset-8">
            CVify Template Showcase
          </h1>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">
            Explore all our professional resume templates with realistic dummy
            data. Download the native PDF to see the high-fidelity output.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="group bg-white dark:bg-slate-blue rounded-[2rem] shadow-premium border border-slate-100 dark:border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-80 overflow-hidden bg-slate-100 dark:bg-midnight/50">
                {/* Template Preview with Scale */}
                <div className="absolute inset-x-0 top-4 flex justify-center scale-[0.35] origin-top transition-transform duration-500 group-hover:scale-[0.38]">
                  <ResumePreview resume={dummyResume} templateId={tpl.id} />
                </div>

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                  <button
                    onClick={() => handleUseTemplate(tpl.id)}
                    className="bg-white text-primary px-6 py-2 rounded-xl font-bold shadow-xl hover:bg-action hover:text-white transition-all transform hover:scale-105"
                  >
                    Edit This Design
                  </button>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleDownloadPDF(dummyResume, tpl.id)}
                      className="p-3 bg-success text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-110"
                      title="Download Sample PDF"
                    >
                      <FaFileDownload size={18} />
                    </button>
                    <button
                      className="p-3 bg-slate-100 text-primary rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-110"
                      onClick={() =>
                        setSelectedTemplate({ ...tpl, data: dummyResume })
                      }
                      title="Zoom View"
                    >
                      <FaEye size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 flex justify-between items-center decoration-slate-200">
                <div>
                  <h3 className="text-xl font-bold text-primary dark:text-white uppercase tracking-tight">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    ID: {tpl.id}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-midnight flex items-center justify-center border border-slate-100 dark:border-white/5">
                  <div className="w-2 h-2 rounded-full bg-action animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Overlay for Preview */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-md flex flex-col items-center p-10 overflow-y-auto">
          <div className="max-w-4xl w-full flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black text-white">
              {selectedTemplate.name} Full Preview
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  handleDownloadPDF(dummyResume, selectedTemplate.id)
                }
                className="bg-success text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
              >
                <FaFileDownload /> Get Sample PDF
              </button>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
          <div className="bg-white shadow-2xl rounded-sm">
            <ResumePreview
              resume={dummyResume}
              templateId={selectedTemplate.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
