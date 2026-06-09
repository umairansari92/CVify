import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ResumePreview from "../components/ResumePreview";
import { handleDownloadPDF } from "../utils/pdfExport";
import { FaFileDownload, FaEye, FaTimes } from "react-icons/fa";
import { initResumeWithData } from "../features/resume/resumeSlice";

import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";

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
    technical: [
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
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
          Portfolio Lab
        </h1>
        <p className="mt-2 text-text-secondary font-medium opacity-70">
          Explore all professional resume templates with realistic sample data.
          Download the native PDF to preview.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((tpl) => (
          <Card
            key={tpl.id}
            variant="elevated"
            className="group !p-0 overflow-hidden hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative h-[420px] overflow-hidden bg-bg-secondary">
              {/* Template Preview with Scale */}
              <div className="absolute inset-x-0 top-0 flex justify-center scale-[0.55] origin-top transition-all duration-500 group-hover:scale-[0.58]">
                <ResumePreview resume={dummyResume} templateId={tpl.id} />
              </div>

              {/* Bottom Fade */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-midground to-transparent z-10 pointer-events-none" />

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 z-20">
                <Button
                  variant="glow"
                  onClick={() => handleUseTemplate(tpl.id)}
                  className="shadow-2xl"
                >
                  Select Design
                </Button>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownloadPDF(dummyResume, tpl.id)}
                    className="p-3 bg-success text-white rounded-xl shadow-lg hover:bg-success/80 transition-all"
                    title="Download Sample PDF"
                  >
                    <FaFileDownload size={16} />
                  </button>
                  <button
                    className="p-3 bg-white text-bg-primary rounded-xl shadow-lg hover:bg-white/80 transition-all"
                    onClick={() =>
                      setSelectedTemplate({ ...tpl, data: dummyResume })
                    }
                    title="Zoom View"
                  >
                    <FaEye size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 flex justify-between items-center bg-midground border-t border-border-subtle">
              <div>
                <h3 className="text-lg font-bold text-text-primary tracking-tight">
                  {tpl.name}
                </h3>
                <p className="text-[10px] font-bold text-text-muted mt-1 uppercase tracking-widest">
                  AI-Optimized Layout
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center border border-border-subtle">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Fullscreen Overlay for Preview */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center p-6 lg:p-10 overflow-y-auto">
          <div className="max-w-4xl w-full flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white tracking-tight">
              {selectedTemplate.name} — Full Preview
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  handleDownloadPDF(dummyResume, selectedTemplate.id)
                }
                className="bg-success text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-success/80 transition-all"
              >
                <FaFileDownload /> Get PDF
              </button>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="bg-danger text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-danger/80 transition-all"
              >
                <FaTimes /> Close
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
