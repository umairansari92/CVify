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
  const [scale, setScale] = React.useState(1);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const containerWidth = entry.contentRect.width;
        // A4 width is 210mm. At 96 DPI, that's ~794px.
        // We use a slightly smaller target (794) to ensure no border clipping.
        const targetWidth = 794;
        const newScale = Math.min(1, containerWidth / targetWidth);
        setScale(newScale);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

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
    <div ref={containerRef} className="w-full flex justify-center overflow-hidden">
      <div
        id="resume-preview"
        className="relative bg-white print-page shadow-2xl transition-all duration-300 origin-top"
        style={{
          width: "210mm",
          height: "297mm",
          borderRadius: "2px",
          transform: `scale(${scale})`,
          marginBottom: `calc(297mm * ${scale - 1})`, // Offset the height change from scaling
        }}
      >
        {/* Background Watermark Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-[100] flex items-center justify-center"
          style={{
            opacity: 0.05,
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
    </div>
  );
};

export default ResumePreview;
