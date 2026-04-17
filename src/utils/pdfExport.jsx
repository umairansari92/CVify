import React from "react";
import { toast } from "react-hot-toast";

/**
 * Handles the PDF export using dynamic imports.
 * This prevents @react-pdf/renderer (heavy) and templates from bloat the main bundle.
 * They are only downloaded when the user actually clicks 'Download'.
 */
export const handleDownloadPDF = async (data, templateId) => {
  if (!data) {
    toast.error("No data available for PDF export");
    return;
  }

  const toastId = toast.loading("Preparing your professional PDF...");

  try {
    // 1. Dynamically import the heavy renderer
    const { pdf } = await import("@react-pdf/renderer");

    // 2. Dynamically import the specific template
    let TemplateComponent;
    
    // Capitalize templateId for matching component filename if needed, 
    // but we'll use a clear switch for safety during this refactor.
    switch (templateId.toLowerCase()) {
      case "modern": 
        TemplateComponent = (await import("../components/pdf/ModernPDF")).default; break;
      case "professional": 
        TemplateComponent = (await import("../components/pdf/ProfessionalPDF")).default; break;
      case "technical": 
        TemplateComponent = (await import("../components/pdf/TechnicalPDF")).default; break;
      case "executive": 
        TemplateComponent = (await import("../components/pdf/ExecutivePDF")).default; break;
      case "minimal": 
        TemplateComponent = (await import("../components/pdf/MinimalPDF")).default; break;
      case "traditional": 
        TemplateComponent = (await import("../components/pdf/TraditionalPDF")).default; break;
      case "classic": 
        TemplateComponent = (await import("../components/pdf/ClassicPDF")).default; break;
      case "bold": 
        TemplateComponent = (await import("../components/pdf/BoldPDF")).default; break;
      case "elegant": 
        TemplateComponent = (await import("../components/pdf/ElegantPDF")).default; break;
      case "clear": 
        TemplateComponent = (await import("../components/pdf/ClearPDF")).default; break;
      case "global": 
        TemplateComponent = (await import("../components/pdf/GlobalPDF")).default; break;
      case "elite": 
        TemplateComponent = (await import("../components/pdf/ElitePDF")).default; break;
      default: 
        TemplateComponent = (await import("../components/pdf/StandardPDF")).default; break;
    }

    // 3. Generate the PDF blob
    const MyDocument = <TemplateComponent data={data} />;
    const blob = await pdf(MyDocument).toBlob();

    if (!blob) throw new Error("PDF generation produced an empty result");

    // 4. Trigger browser download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cvify-resume-${data.personalInfo?.fullName?.replace(/\s+/g, "-").toLowerCase() || "resume"}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 100);

    toast.success("Resume PDF downloaded successfully", { id: toastId });
  } catch (error) {
    console.error("PDF Export Error:", error);
    toast.error(`PDF generation failed: ${error.message || "Unknown error"}`, { id: toastId });
  }
};

/**
 * Handles Cover Letter PDF generation with dynamic imports
 */
export const handleDownloadLetter = async (letter, user) => {
  if (!letter) {
    toast.error("Required data missing for PDF");
    return;
  }

  const toastId = toast.loading("Generating Cover Letter...");

  try {
    const { pdf } = await import("@react-pdf/renderer");
    const CoverLetterPDF = (await import("../components/pdf/CoverLetterPDF")).default;

    const pdfData = {
      ...letter,
      themeColor: user?.themeSettings?.accentColor || "#2563eb",
      fontFamily: user?.themeSettings?.fontPrimary || "Inter",
    };

    const MyDocument = <CoverLetterPDF letter={pdfData} user={user} />;
    const blob = await pdf(MyDocument).toBlob();

    if (!blob) throw new Error("Generated PDF blob is empty");

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Cover-Letter-${(letter.jobTitle || "cover-letter").replace(/\s+/g, "-")}.pdf`;

    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 200);

    toast.success("Cover Letter downloaded", { id: toastId });
  } catch (error) {
    console.error("Cover Letter Export Error:", error);
    toast.error(`Failed to download PDF: ${error.message}`, { id: toastId });
  }
};
