import { useEffect, useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { initNewResume, setResumeField } from "../features/resume/resumeSlice";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import StyleSettings from "../components/forms/StyleSettings";
import CustomSectionsForm from "../components/forms/CustomSectionsForm";
import PDFPreviewPanel from "../components/PDFPreviewPanel";
import { handleDownloadPDF } from "../utils/pdfExport";

import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
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
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  useEffect(() => {
    if (mobilePreviewOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobilePreviewOpen]);

  useEffect(() => {
    if (id) {
      dispatch(getResumeById(id));
    } else {
      dispatch(initNewResume());
    }
  }, [dispatch, id]);

  const handleSave = async (useDiamonds = false) => {
    let result;
    if (currentResume?._id) {
      result = await dispatch(
        updateResume({ id: currentResume._id, data: currentResume }),
      );
    } else {
      result = await dispatch(createResume({ ...currentResume, useDiamonds }));
    }

    if (result.type.includes("fulfilled")) {
      navigate("/dashboard");
    } else if (result.payload?.limitReached) {
      const confirm = await Swal.fire({
        title: "Resume Limit Reached",
        text: `You already have 2 resumes. To create a new one, you can either delete an old one or use 30 diamonds.`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Use 30 Diamonds",
        cancelButtonText: "Maybe Later",
        background: "var(--midground)",
        color: "var(--text-main)",
        customClass: {
          popup: "glass",
          confirmButton: "btn-primary",
          cancelButton: "btn-secondary",
        },
      });

      if (confirm.isConfirmed) {
        handleSave(true);
      }
    }
  };

  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "custom", label: "Custom" },
    { id: "style", label: "Style" },
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
              onClick={() => handleSave()}
              disabled={loading}
              className="btn-primary flex-1 xl:flex-none whitespace-nowrap text-sm lg:text-base font-black shadow-lg shadow-primary/20"
            >
              <div className="flex items-center justify-center gap-2">
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                <span>{loading ? "Syncing..." : "Save & Finish"}</span>
              </div>
            </button>
            <button
              onClick={() =>
                handleDownloadPDF(currentResume, currentResume?.templateId)
              }
              className="px-6 py-4 rounded-xl bg-success/10 text-success border border-success/20 hover:bg-success hover:text-white transition-all shadow-lg shadow-success/5 font-black text-sm lg:text-base flex-1 xl:flex-none whitespace-nowrap"
            >
              Get PDF
            </button>
          </div>
        </div>

        {/* Tabs & Template Select */}
        <div className="flex flex-col gap-6 lg:gap-8 mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-6 w-full">
            
            {/* Desktop Tabs */}
            <div className="hidden lg:flex gap-1 lg:gap-2 p-1 lg:p-2 bg-foreground/10 rounded-2xl lg:rounded-3xl border border-border-subtle overflow-x-auto no-scrollbar w-full lg:w-auto">
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

            {/* Mobile Tags / Section Switcher (Dropdown) */}
            <div className="relative group w-full lg:hidden">
              <div className="relative">
                <select
                  className="w-full appearance-none pl-6 pr-12 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest border-none rounded-2xl shadow-xl shadow-primary/20 cursor-pointer outline-none transition-all hover:bg-primary/90"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  {tabs.map((tab) => (
                    <option key={tab.id} value={tab.id} className="bg-slate-900 text-white font-bold">{tab.label} Section</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Template Select */}
            <div className="relative group w-full sm:flex-1 lg:w-auto">
              <select
                className="w-full appearance-none pl-6 pr-12 py-3.5 bg-midground text-text-primary font-black text-sm border-2 border-border-subtle rounded-2xl shadow-sm focus:border-primary transition-all cursor-pointer outline-none"
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
                <option value="global">Global Minimalist</option>
                <option value="elite">Corporate Elite</option>
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
        <div className="bg-midground p-4 lg:p-10 rounded-3xl lg:rounded-3xl shadow-premium border border-border-subtle animate-fadeIn transition-all duration-500 overflow-hidden relative mb-20 lg:mb-0">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary/10"></div>
          <div className="relative z-10 pb-10 lg:pb-0">
            {activeTab === "personal" && <PersonalInfoForm />}
            {activeTab === "education" && <EducationForm />}
            {activeTab === "experience" && <ExperienceForm />}
            {activeTab === "skills" && <SkillsForm />}
            {activeTab === "projects" && <ProjectsForm />}
            {activeTab === "custom" && <CustomSectionsForm />}
            {activeTab === "style" && <StyleSettings />}
          </div>
        </div>

        {/* Mobile Sticky Preview Button */}
        <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90] animate-bounceIn">
          <button
            onClick={() => setMobilePreviewOpen(true)}
            className="w-full py-4 px-6 bg-slate-900/70 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <FaEye size={14} />
            </div>
            <span>Preview Resume</span>
          </button>
        </div>
      </div>

      {/* Right Panel - Live PDF Preview */}
      <div
        className={`
          ${
            mobilePreviewOpen
              ? "fixed inset-0 z-[110] bg-background flex flex-col items-center justify-start overflow-y-auto p-4"
              : "hidden lg:flex w-full lg:w-1/2 bg-foreground/5 flex-col border-l border-border-subtle shadow-inner relative z-10"
          }
        `}
      >
        {/* Mobile Close Button */}
        {mobilePreviewOpen && (
          <div className="w-full max-w-4xl flex justify-end mb-4 lg:hidden shrink-0 mt-4">
            <button
              onClick={() => setMobilePreviewOpen(false)}
              className="p-3 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg backdrop-blur-sm flex items-center gap-2 font-bold"
            >
              <FaTimes className="text-xl" /> Close Preview
            </button>
          </div>
        )}

        <div className={`w-full ${mobilePreviewOpen ? "max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col min-h-[80vh]" : "flex-1 flex flex-col h-full overflow-hidden"}`}>
          {/* Header */}
          <div className="flex-shrink-0 px-4 lg:px-6 py-3 flex items-center gap-2 border-b border-slate-300 dark:border-slate-800/50 bg-white/90 dark:bg-midnight/90 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            <h2 className="text-[9px] lg:text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">
              Live PDF Preview
            </h2>
            <span className="ml-auto text-[9px] text-slate-400 font-medium hidden sm:inline">
              Exactly what you'll download
            </span>
          </div>
          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden relative">
            <PDFPreviewPanel
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
