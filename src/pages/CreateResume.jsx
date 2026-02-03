import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initNewResume, setResumeField } from "../features/resume/resumeSlice";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import ResumePreview from "../components/ResumePreview";
import { handleDownloadPDF } from "../utils/pdfExport";

import { useNavigate, useParams } from "react-router-dom";
import {
  createResume,
  updateResume,
  getResumeById,
} from "../features/resume/resumeThunk";

const CreateResume = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentResume, loading } = useSelector((state) => state.resume);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    if (id) {
      dispatch(getResumeById(id));
    } else {
      dispatch(initNewResume());
    }
  }, [dispatch, id]);

  const handleSave = async () => {
    if (currentResume?._id) {
      await dispatch(
        updateResume({ id: currentResume._id, data: currentResume }),
      );
    } else {
      await dispatch(createResume(currentResume));
    }
    navigate("/");
  };

  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background overflow-hidden transition-colors duration-300 relative">
      {/* Left Panel - Forms */}
      <div className="w-full lg:w-1/2 p-4 lg:p-10 overflow-y-auto border-r border-border-subtle relative z-20 glass no-scrollbar">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 lg:mb-10 gap-4 lg:gap-6">
          <div>
            <h1 className="text-2xl lg:text-4xl font-black tracking-tight">
              <span className="text-gradient">CV Builder</span>
            </h1>
            <p className="text-text-muted font-bold mt-1 lg:mt-2 text-sm lg:text-lg">
              Design your professional identity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full xl:w-auto">
            <button
              onClick={handleSave}
              disabled={loading}
              className="btn-primary flex-1 xl:flex-none whitespace-nowrap text-sm lg:text-base"
              style={{ color: 'white' }}
            >
              {loading ? "Syncing..." : "Save & Finish"}
            </button>
            <button
              onClick={() =>
                handleDownloadPDF(currentResume, currentResume?.templateId)
              }
              className="btn-secondary flex-1 xl:flex-none !bg-success/10! !text-success! border-success/20 hover:!bg-success! hover:!text-white! shadow-lg shadow-success/10 text-sm lg:text-base"
            >
              Get PDF
            </button>
          </div>
        </div>

        {/* Tabs & Template Select */}
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex items-center justify-between gap-4 lg:gap-6">
            <div className="flex gap-1 lg:gap-2 p-1 lg:p-2 bg-foreground/10 rounded-2xl lg:rounded-3xl border border-border-subtle overflow-x-auto no-scrollbar w-full lg:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl text-xs lg:text-sm font-black transition-all duration-300 whitespace-nowrap flex-shrink-0
                               ${
                                 activeTab === tab.id
                                   ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                   : "text-text-muted hover:bg-white/10 hover:text-primary"
                               }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative group">
              <select
                className="appearance-none pl-6 pr-12 py-3.5 bg-midground text-text-primary font-black text-sm border-2 border-border-subtle rounded-2xl shadow-sm focus:border-primary transition-all cursor-pointer outline-none"
                value={currentResume?.templateId || "classic"}
                onChange={(e) =>
                  dispatch(
                    setResumeField({
                      field: "templateId",
                      value: e.target.value,
                    }),
                  )
                }
              >
                <option value="classic">Classic Style</option>
                <option value="traditional">Traditional</option>
                <option value="clear">Clear Layout</option>
                <option value="modern">Modern Tech</option>
                <option value="bold">Bold Impact</option>
                <option value="minimal">Minimalist</option>
                <option value="professional">Professional</option>
                <option value="elegant">Elegant Style</option>
                <option value="technical">Technical Focus</option>
                <option value="executive">Executive Tier</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content - Card Style */}
        <div className="bg-midground p-4 lg:p-10 rounded-3xl lg:rounded-3xl shadow-premium border border-border-subtle animate-fadeIn transition-all duration-500 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary/10"></div>
          <div className="relative z-10">
            {activeTab === "personal" && <PersonalInfoForm />}
            {activeTab === "education" && <EducationForm />}
            {activeTab === "experience" && <ExperienceForm />}
            {activeTab === "skills" && <SkillsForm />}
            {activeTab === "projects" && <ProjectsForm />}
          </div>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="w-full lg:w-1/2 bg-slate-200 dark:bg-midnight p-4 lg:p-10 overflow-y-auto flex justify-center items-start border-l border-slate-300 dark:border-slate-800/50 shadow-inner relative z-10 order-first lg:order-last">
        <div className="sticky top-0 w-full flex flex-col items-center">
          <div className="mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            <h2 className="text-[9px] lg:text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">
              Real-Time Canvas Preview
            </h2>
          </div>
          <div className="scale-[0.7] sm:scale-[0.8] lg:scale-[0.85] xl:scale-95 origin-top transition-transform duration-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
            <ResumePreview
              resume={currentResume}
              templateId={currentResume?.templateId || "classic"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
