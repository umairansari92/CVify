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
    <div className="flex h-screen bg-slate-soft dark:bg-midnight overflow-hidden transition-colors duration-300">
      {/* Left Panel - Forms */}
      <div className="w-1/2 p-6 md:p-10 overflow-y-auto border-r border-slate-200 dark:border-slate-800/50">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary dark:text-slate-50 dark:font-jakarta tracking-tight">
              CV Builder
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Design your professional identity.
            </p>
          </div>
          <div className="flex gap-3 w-full xl:w-auto">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 xl:flex-none bg-action hover:bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-premium hover:shadow-action/30 transition-all font-bold disabled:opacity-50 glow-btn"
            >
              {loading ? "Syncing..." : "Save & Finish"}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex-1 xl:flex-none bg-success hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-premium hover:shadow-success/30 transition-all font-bold"
            >
              Get PDF
            </button>
          </div>
        </div>

        {/* Tabs & Template Select */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-1.5 p-1 bg-white dark:bg-slate-blue rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap
                              ${
                                activeTab === tab.id
                                  ? "bg-action text-white shadow-md shadow-action/20"
                                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-midnight/50"
                              }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative group">
              <select
                className="appearance-none pl-5 pr-10 py-3 bg-white dark:bg-slate-blue text-primary dark:text-slate-50 font-bold text-sm border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm focus:ring-2 focus:ring-action transition-all cursor-pointer"
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
        <div className="bg-white dark:bg-slate-blue p-8 rounded-[2rem] shadow-premium border border-slate-100 dark:border-white/5 animate-fadeIn transition-all duration-500 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-action/10"></div>
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
      <div className="w-1/2 bg-slate-200 dark:bg-midnight p-10 overflow-y-auto flex justify-center items-start border-l border-slate-300 dark:border-slate-800/50 shadow-inner">
        <div className="sticky top-0 w-full flex flex-col items-center">
          <div className="mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            <h2 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">
              Real-Time Canvas Preview
            </h2>
          </div>
          <div className="scale-[0.85] xl:scale-95 origin-top transition-transform duration-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
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
