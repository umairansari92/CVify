import React, { useState } from "react";
import MobileHeader from "./MobileHeader";
import MobileSectionCarousel from "./MobileSectionCarousel";
import MobileEditor from "./MobileEditor";
import MobileActionDock from "./MobileActionDock";
import MobilePreviewSheet from "./MobilePreviewSheet";
import MobileAIBottomSheet from "./MobileAIBottomSheet";
import ResumeUploadModal from "../components/ResumeUploadModal";
import ResumeLimitModal from "../components/ResumeLimitModal";

const MobileResumeBuilder = ({
  currentResume,
  user,
  activeSection,
  setActiveSection,
  activeTab,
  setActiveTab,
  isImportModalOpen,
  setIsImportModalOpen,
  limitInfo,
  setLimitInfo,
  handleSave,
  handleExport,
  dispatch,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState("");

  const handleOpenAIPrompt = (prompt = "") => {
    setAiInitialPrompt(prompt);
    setIsAIOpen(true);
  };

  return (
    <div className="h-screen w-full bg-bg-primary flex flex-col overflow-hidden relative">
      {/* Mobile Component Layer 1: Compact Header + Mode Segmented Control */}
      <MobileHeader 
        currentResume={currentResume}
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsImportModalOpen={setIsImportModalOpen}
        handleExport={handleExport}
        dispatch={dispatch}
      />

      {/* Mobile Component Layer 2: Sticky Horizontal Section Selector */}
      {activeTab === "Content" && (
        <MobileSectionCarousel 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}

      {/* Mobile Component Layer 3: Main Form Editor + Progressive Disclosure */}
      <MobileEditor 
        activeSection={activeSection}
        activeTab={activeTab}
        onSave={handleSave}
        currentResume={currentResume}
        onOpenAIPrompt={handleOpenAIPrompt}
      />

      {/* Mobile Component Layer 4: Fixed Balanced 3-Target Action Dock */}
      <MobileActionDock 
        onOpenPreview={() => setIsPreviewOpen(true)}
        onOpenAI={() => handleOpenAIPrompt()}
        onSave={handleSave}
      />

      {/* Mobile Drawer 1: Live PDF & Editor Preview Sheet */}
      <MobilePreviewSheet 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        currentResume={currentResume}
      />

      {/* Mobile Drawer 2: AI Intelligence Prompt Sheet */}
      <MobileAIBottomSheet 
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        initialPrompt={aiInitialPrompt}
      />

      {/* Upload & Limit Modals */}
      <ResumeUploadModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />

      <ResumeLimitModal 
        isOpen={!!limitInfo} 
        onClose={() => setLimitInfo(null)}
        onConfirm={() => handleSave(true)}
        currentCount={limitInfo?.currentCount}
        requiredDiamonds={limitInfo?.requiredDiamonds}
      />
    </div>
  );
};

export default MobileResumeBuilder;
