import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResumeById } from "../../features/resume/resumeThunk";
import { initNewResume } from "../../features/resume/resumeSlice";
import LeftPanelNavigation from "./panels/LeftPanelNavigation";
import MiddlePanelEditor from "./panels/MiddlePanelEditor";
import RightPanelPreview from "./panels/RightPanelPreview";
import ResumeUploadModal from "./components/ResumeUploadModal";
import { Sparkles } from "lucide-react";
import { updateResume, createResume } from "../../features/resume/resumeThunk";
import { handleDownloadPDF } from "../../utils/pdfExport";
import toast from "react-hot-toast";

const ResumeBuilderLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("personal");
  const [activeTab, setActiveTab] = useState("Content");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const { currentResume } = useSelector((state) => state.resume);

  useEffect(() => {
    if (id) {
      dispatch(getResumeById(id));
    } else {
      dispatch(initNewResume());
    }
  }, [dispatch, id]);

  const handleSave = async () => {
    if (!currentResume) return;
    
    const toastId = toast.loading("Saving your resume...");
    try {
      if (id || currentResume._id) {
        await dispatch(updateResume({ id: id || currentResume._id, data: currentResume }));
        toast.success("Resume saved successfully!", { id: toastId });
      } else {
        const result = await dispatch(createResume(currentResume));
        if (result.type.includes("fulfilled")) {
          toast.success("Resume created successfully!", { id: toastId });
        } else {
          throw new Error(result.payload?.message || "Failed to create");
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to save", { id: toastId });
    }
  };

  const handleExport = () => {
    if (!currentResume) return toast.error("No resume data to export");
    handleDownloadPDF(currentResume, currentResume.templateId || "classic");
  };

  return (
    <div className="h-screen w-full bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <img src="/CVify Favicon.jpg" alt="Logo" className="w-8 h-8 rounded-lg" />
          <h1 className="font-black text-xl tracking-tighter">CVify<span className="text-primary">Pro</span></h1>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {["Content", "Designer", "Analyzer", "Matcher"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                tab === activeTab 
                  ? "bg-white dark:bg-slate-700 shadow-sm text-primary" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={() => setIsImportModalOpen(true)}
             className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-700 transition-all"
           >
             <Sparkles size={14} className="text-primary" /> Magic Import
           </button>
            <button 
              onClick={handleExport}
              className="px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-glow-primary hover:scale-105 transition-all"
            >
              Export PDF
            </button>
        </div>
      </nav>

      {/* Import Modal */}
      <ResumeUploadModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />

      {/* 3-Panel Main Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Panel 1: Navigation (Left) */}
        <LeftPanelNavigation 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          setActiveTab={setActiveTab}
        />

        {/* Panel 2: Editor (Center) */}
        <MiddlePanelEditor 
          activeSection={activeSection} 
          activeTab={activeTab}
          onSave={handleSave}
        />

        {/* Panel 3: Live Preview (Right) */}
        <RightPanelPreview 
          resume={currentResume} 
        />
      </main>
    </div>
  );
};

export default ResumeBuilderLayout;
