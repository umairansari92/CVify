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
      className="bg-white shadow-2xl transition-all duration-300 transform scale-75 md:scale-90 lg:scale-100 origin-top"
      style={{
        width: "210mm",
        minHeight: "297mm",
        borderRadius: "2px",
      }}
    >
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
