import React, { lazy, Suspense } from "react";

const ClassicTemplate = lazy(() => import("./ClassicTemplate"));
const ModernTemplate = lazy(() => import("./ModernTemplate"));
const ProfessionalTemplate = lazy(() => import("./ProfessionalTemplate"));
const TechnicalTemplate = lazy(() => import("./TechnicalTemplate"));
const ExecutiveTemplate = lazy(() => import("./ExecutiveTemplate"));
const MinimalTemplate = lazy(() => import("./MinimalTemplate"));
const TraditionalTemplate = lazy(() => import("./TraditionalTemplate"));
const BoldTemplate = lazy(() => import("./BoldTemplate"));
const ElegantTemplate = lazy(() => import("./ElegantTemplate"));
const ClearTemplate = lazy(() => import("./ClearTemplate"));
const GlobalTemplate = lazy(() => import("./GlobalTemplate"));
const EliteTemplate = lazy(() => import("./EliteTemplate"));

export const getDOMTemplate = (templateId, data, isEditable = false) => {
  const props = { data, isEditable };
  
  switch (templateId) {
    case "classic": return <ClassicTemplate {...props} />;
    case "modern": return <ModernTemplate {...props} />;
    case "professional": return <ProfessionalTemplate {...props} />;
    case "technical": return <TechnicalTemplate {...props} />;
    case "executive": return <ExecutiveTemplate {...props} />;
    case "minimal": return <MinimalTemplate {...props} />;
    case "traditional": return <TraditionalTemplate {...props} />;
    case "bold": return <BoldTemplate {...props} />;
    case "elegant": return <ElegantTemplate {...props} />;
    case "clear": return <ClearTemplate {...props} />;
    case "global": return <GlobalTemplate {...props} />;
    case "elite": return <EliteTemplate {...props} />;
    default: return <ClassicTemplate {...props} />;
  }
};
