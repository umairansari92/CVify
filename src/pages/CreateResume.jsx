import { useEffect, useState } from "react";
import { FaEye, FaTimes, FaFilePdf } from "react-icons/fa";
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

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  createResume,
  updateResume,
  getResumeById,
} from "../features/resume/resumeThunk";

import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const CreateResume = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentResume, loading } = useSelector((state) => state.resume);
  
  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "custom", label: "Custom Section" },
    { id: "style", label: "Styling" },
  ];

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

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (id) {
      dispatch(getResumeById(id));
    } else {
      dispatch(initNewResume());
    }
  }, [dispatch, id]);

  useEffect(() => {
    const step = searchParams.get("step");
    if (step) {
      const validTabs = tabs.map(t => t.id);
      if (validTabs.includes(step.toLowerCase())) {
        setActiveTab(step.toLowerCase());
      }
    }
  }, [searchParams]);

  const handleSave = async (useDiamonds = false) => {
    let result;
    if (currentResume?._id) {
      result = await dispatch(updateResume({ id: currentResume._id, data: currentResume }));
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
        confirmButtonText: "Use Diamonds",
        background: "var(--midground)",
        color: "var(--text-main)",
        customClass: { popup: "glass-medium", confirmButton: "btn-primary", cancelButton: "btn-secondary" },
      });
      if (confirm.isConfirmed) handleSave(true);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-bg-primary overflow-hidden">
      
      {/* LEFT COLUMN: Sections (Width: 20%) */}
      <div className="hidden lg:flex flex-col w-1/5 border-r border-border-subtle bg-bg-secondary p-6 z-20">
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tight text-text-primary">Resume Studio</h1>
          <p className="text-xs font-semibold text-text-muted mt-1 uppercase tracking-wider">Live Editor</p>
        </div>
        
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto no-scrollbar">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border font-semibold text-sm ${
                activeTab === tab.id 
                  ? "bg-primary/10 border-primary/30 text-primary shadow-glow-primary" 
                  : "bg-midground border-transparent hover:bg-white/5 text-text-muted hover:text-text-main"
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border-subtle">
           <select
              className="w-full appearance-none px-4 py-3 bg-midground text-text-primary font-bold text-xs uppercase tracking-widest border border-border-subtle rounded-xl shadow-sm focus:border-primary transition-all cursor-pointer outline-none mb-4"
              value={currentResume?.templateId || "classic"}
              onChange={(e) => dispatch(setResumeField({ field: "templateId", value: e.target.value }))}
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
          <Button variant="glow" className="w-full" onClick={() => handleSave()} disabled={loading}>
             {loading ? "Saving..." : "Save & Exit"}
          </Button>
        </div>
      </div>

      {/* Mobile Tabs Dropdown (Visible only on small screens) */}
      <div className="lg:hidden p-4 border-b border-border-subtle bg-bg-secondary flex gap-3">
         <select
            className="flex-1 px-4 py-3 bg-midground text-text-primary font-bold border border-border-subtle rounded-xl"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>{tab.label}</option>
            ))}
          </select>
          <Button variant="glow" onClick={() => handleSave()} disabled={loading}>Save</Button>
      </div>

      {/* CENTER COLUMN: PDF Preview (Width: 50%) */}
      <div className={`
          ${mobilePreviewOpen ? "fixed inset-0 z-50 bg-bg-primary p-4" : "hidden lg:flex"} 
          w-full lg:w-1/2 flex-col relative
      `}>
        {mobilePreviewOpen && (
          <div className="flex justify-end mb-4 lg:hidden">
            <button onClick={() => setMobilePreviewOpen(false)} className="p-3 bg-midground rounded-full text-text-primary">
              <FaTimes />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-hidden h-full p-4 lg:p-8 bg-black/20 flex flex-col relative">
           <div className="flex justify-between items-center mb-4 px-2">
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest">A4 Canvas Preview</span>
              <button 
                onClick={() => handleDownloadPDF(currentResume, currentResume?.templateId)}
                className="text-xs font-bold text-success flex items-center gap-2 hover:underline"
              >
                <FaFilePdf /> Export PDF
              </button>
           </div>
           <div className="flex-1 overflow-hidden rounded border border-white/5 shadow-2xl relative">
             <PDFPreviewPanel resume={currentResume} templateId={currentResume?.templateId || "classic"} />
           </div>
        </div>
      </div>

      {/* Mobile Sticky Preview Button */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-40">
        <Button variant="primary" className="w-full shadow-2xl" onClick={() => setMobilePreviewOpen(true)} icon={FaEye}>
          Preview Canvas
        </Button>
      </div>

      {/* RIGHT COLUMN: AI Coach / Form Panel (Width: 30%) */}
      <div className="w-full lg:w-[30%] bg-bg-primary border-l border-border-subtle relative z-30 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-border-subtle bg-bg-secondary flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow-primary"></div>
          <span className="text-xs font-black text-primary uppercase tracking-widest">Editor Panel</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar relative">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          <div className="relative z-10">
            {activeTab === "personal" && <PersonalInfoForm />}
            {activeTab === "education" && <EducationForm />}
            {activeTab === "experience" && <ExperienceForm />}
            {activeTab === "skills" && <SkillsForm />}
            {activeTab === "projects" && <ProjectsForm />}
            {activeTab === "custom" && <CustomSectionsForm />}
            {activeTab === "style" && <StyleSettings />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default CreateResume;
