import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import TraditionalTemplate from "./templates/TraditionalTemplate";
import ClearTemplate from "./templates/ClearTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import BoldTemplate from "./templates/BoldTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import TechnicalTemplate from "./templates/TechnicalTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import GlobalTemplate from "./templates/GlobalTemplate";
import EliteTemplate from "./templates/EliteTemplate";

const ResumePreview = ({ resume, templateId }) => {
  if (!resume) return <div className="text-gray-500">No resume data</div>;

  // Template Switcher Logic
  const renderTemplate = () => {
    switch (templateId) {
      case "classic":
        return <ClassicTemplate data={resume} />;
      case "traditional":
        return <TraditionalTemplate data={resume} />;
      case "clear":
        return <ClearTemplate data={resume} />;
      case "modern":
        return <ModernTemplate data={resume} />;
      case "bold":
        return <BoldTemplate data={resume} />;
      case "minimal":
        return <MinimalTemplate data={resume} />;
      case "professional":
        return <ProfessionalTemplate data={resume} />;
      case "elegant":
        return <ElegantTemplate data={resume} />;
      case "technical":
        return <TechnicalTemplate data={resume} />;
      case "executive":
        return <ExecutiveTemplate data={resume} />;
      case "global":
        return <GlobalTemplate data={resume} />;
      case "elite":
        return <EliteTemplate data={resume} />;
      default:
        return <ClassicTemplate data={resume} />;
    }
  };

  return (
    <div
      id="resume-preview"
      className="relative w-full h-[297mm] bg-white overflow-hidden print-page shadow-2xl transition-all duration-300 transform scale-75 md:scale-90 lg:scale-100 origin-top"
      style={{
        width: "210mm",
        borderRadius: "2px",
      }}
    >
      {/* Background Watermark Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[100] flex items-center justify-center"
        style={{
          opacity: 0.05, // slightly more visible out of caution
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Ctext x='50%25' y='50%25' font-size='50' fill='black' font-weight='bold' font-family='Arial' text-anchor='middle' alignment-baseline='middle' transform='rotate(-45, 250, 250)'%3ECVify.pro%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      ></div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full h-[calc(100%-40px)]">
        {renderTemplate()}
      </div>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-gray-400 z-10 whitespace-nowrap">
        {"Designed and developed by CVify | https://cvifypro.vercel.app"}
      </footer>
    </div>
  );
};

export default ResumePreview;
