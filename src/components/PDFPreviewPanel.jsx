import React, { Suspense } from "react";
import { PDFViewer } from "@react-pdf/renderer";

// --- Import all PDF Templates ---
import ModernPDF from "./pdf/ModernPDF";
import ProfessionalPDF from "./pdf/ProfessionalPDF";
import TechnicalPDF from "./pdf/TechnicalPDF";
import ExecutivePDF from "./pdf/ExecutivePDF";
import MinimalPDF from "./pdf/MinimalPDF";
import TraditionalPDF from "./pdf/TraditionalPDF";
import ClassicPDF from "./pdf/ClassicPDF";
import BoldPDF from "./pdf/BoldPDF";
import ElegantPDF from "./pdf/ElegantPDF";
import ClearPDF from "./pdf/ClearPDF";
import GlobalPDF from "./pdf/GlobalPDF";
import ElitePDF from "./pdf/ElitePDF";
import StandardPDF from "./pdf/StandardPDF";

/**
 * Maps templateId to the correct PDF component
 */
const getPDFComponent = (templateId, data) => {
  switch (templateId) {
    case "modern":
      return <ModernPDF data={data} />;
    case "professional":
      return <ProfessionalPDF data={data} />;
    case "technical":
      return <TechnicalPDF data={data} />;
    case "executive":
      return <ExecutivePDF data={data} />;
    case "minimal":
      return <MinimalPDF data={data} />;
    case "traditional":
      return <TraditionalPDF data={data} />;
    case "classic":
      return <ClassicPDF data={data} />;
    case "bold":
      return <BoldPDF data={data} />;
    case "elegant":
      return <ElegantPDF data={data} />;
    case "clear":
      return <ClearPDF data={data} />;
    case "global":
      return <GlobalPDF data={data} />;
    case "elite":
      return <ElitePDF data={data} />;
    default:
      return <StandardPDF data={data} />;
  }
};

/**
 * Loading skeleton shown while PDF is rendering
 */
const PDFLoadingSkeleton = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-100 dark:bg-midnight/50 rounded-xl">
    <div className="flex flex-col items-center gap-3">
      {/* Animated PDF Icon */}
      <div className="relative w-16 h-20 bg-white dark:bg-slate-700 rounded-lg shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-600">
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[16px] border-l-transparent border-b-[16px] border-b-transparent border-t-[16px] border-t-slate-200 dark:border-t-slate-600" />
        <div className="absolute -top-[1px] -right-[1px] w-0 h-0 border-l-[15px] border-l-transparent border-b-[15px] border-b-transparent border-t-[15px] border-t-white dark:border-t-slate-700" />
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="w-8 h-1 bg-slate-200 dark:bg-slate-600 rounded animate-pulse" />
          <div className="w-6 h-1 bg-slate-200 dark:bg-slate-600 rounded animate-pulse" />
          <div className="w-8 h-1 bg-slate-200 dark:bg-slate-600 rounded animate-pulse" />
          <div className="w-5 h-1 bg-slate-200 dark:bg-slate-600 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full bg-action animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-action animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-action animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        Rendering PDF Preview...
      </p>
    </div>
  </div>
);

/**
 * PDFPreviewPanel
 * Shows a live, real-time PDF preview that exactly matches the downloadable PDF.
 *
 * @param {object} resume - The resume data object
 * @param {string} templateId - The selected template ID
 */
const PDFPreviewPanel = ({ resume, templateId }) => {
  if (!resume) {
    return <PDFLoadingSkeleton />;
  }

  const pdfComponent = getPDFComponent(templateId || "classic", resume);

  return (
    <Suspense fallback={<PDFLoadingSkeleton />}>
      <PDFViewer
        key={templateId} // Re-mount on template change for clean render
        width="100%"
        height="100%"
        showToolbar={false}
        style={{
          border: "none",
          borderRadius: "4px",
          minHeight: "842px", // A4 height in px at 96dpi
        }}
      >
        {pdfComponent}
      </PDFViewer>
    </Suspense>
  );
};

export default PDFPreviewPanel;
