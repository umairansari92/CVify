import React, { Suspense, useState, useEffect } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { Document as ReactPdfDocument, Page as ReactPdfPage, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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

// Configure worker for mobile rendering. Note: version 4.x/3.x of pdf.js handles URLs this way.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
  <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center gap-4 bg-slate-100 dark:bg-midnight/50 rounded-xl">
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
 * Mobile-specific PDF Renderer using react-pdf (canvas based)
 */
const MobilePDFViewer = ({ pdfComponent }) => {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    let active = true;
    const generateBlob = async () => {
      try {
        const asPdf = pdf(pdfComponent);
        const blob = await asPdf.toBlob();
        if (active) {
          const url = URL.createObjectURL(blob);
          setBlobUrl(url);
        }
      } catch (err) {
        console.error("Failed to generate PDF blob:", err);
      }
    };
    generateBlob();

    return () => {
      active = false;
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [pdfComponent]);

  if (!blobUrl) return <PDFLoadingSkeleton />;

  const containerWidth = window.innerWidth > 100 ? window.innerWidth - 64 : 320;

  return (
    <div className="w-full flex justify-center bg-slate-200 dark:bg-midnight overflow-x-hidden min-h-[500px]">
      <ReactPdfDocument file={blobUrl} loading={<PDFLoadingSkeleton />}>
        <ReactPdfPage 
           pageNumber={1} 
           width={containerWidth} 
           renderTextLayer={false}
           renderAnnotationLayer={false}
           className="shadow-xl"
        />
      </ReactPdfDocument>
    </div>
  );
};

/**
 * PDFPreviewPanel
 * Shows a live, real-time PDF preview.
 *
 * @param {object} resume - The resume data object
 * @param {string} templateId - The selected template ID
 */
const PDFPreviewPanel = ({ resume, templateId }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!resume) {
    return <PDFLoadingSkeleton />;
  }

  const pdfComponent = getPDFComponent(templateId || "classic", resume);

  // If on mobile display, iframe from @react-pdf/renderer is strictly downloaded/blocked.
  // Use explicit react-pdf layer to render safely.
  if (isMobile) {
    return (
      <div className="w-full h-full overflow-y-auto overflow-x-hidden">
        <MobilePDFViewer pdfComponent={pdfComponent} />
      </div>
    );
  }

  // Desktop display - Native Web-API usage is more robust
  return (
    <Suspense fallback={<PDFLoadingSkeleton />}>
      <PDFViewer
        key={templateId} 
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
