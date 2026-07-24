import React from "react";
import RightPanelPreview from "../panels/RightPanelPreview";

const MobilePreviewSheet = ({ isOpen, onClose, currentResume }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
      <div className="w-full h-[92vh] bg-slate-900 rounded-t-3xl overflow-hidden flex flex-col border-t border-white/10 shadow-2xl">
        <RightPanelPreview 
          resume={currentResume}
          isMobileModal={true}
          onCloseMobileModal={onClose}
        />
      </div>
    </div>
  );
};

export default MobilePreviewSheet;
