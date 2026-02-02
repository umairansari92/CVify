import React from "react";
import { pdf } from "@react-pdf/renderer";
import ModernPDF from "../components/pdf/ModernPDF";
import StandardPDF from "../components/pdf/StandardPDF";
import ProfessionalPDF from "../components/pdf/ProfessionalPDF";
import TechnicalPDF from "../components/pdf/TechnicalPDF";
import ExecutivePDF from "../components/pdf/ExecutivePDF";
import MinimalPDF from "../components/pdf/MinimalPDF";
import TraditionalPDF from "../components/pdf/TraditionalPDF";
import ClassicPDF from "../components/pdf/ClassicPDF";
import BoldPDF from "../components/pdf/BoldPDF";
import ElegantPDF from "../components/pdf/ElegantPDF";
import ClearPDF from "../components/pdf/ClearPDF";

/**
 * Handles the PDF export using native @react-pdf/renderer.
 * Maps templateId to specific PDF components.
 */
export const handleDownloadPDF = async (data, templateId) => {
  if (!data) {
    console.error("No data provided for PDF export");
    return;
  }

  console.log("Exporting PDF for Template:", templateId);

  try {
    // 1. Map templateId to native PDF components
    let MyDocument;

    switch (templateId) {
      case "modern":
        MyDocument = <ModernPDF data={data} />;
        break;
      case "professional":
        MyDocument = <ProfessionalPDF data={data} />;
        break;
      case "technical":
        MyDocument = <TechnicalPDF data={data} />;
        break;
      case "executive":
        MyDocument = <ExecutivePDF data={data} />;
        break;
      case "minimal":
        MyDocument = <MinimalPDF data={data} />;
        break;
      case "traditional":
        MyDocument = <TraditionalPDF data={data} />;
        break;
      case "classic":
        MyDocument = <ClassicPDF data={data} />;
        break;
      case "bold":
        MyDocument = <BoldPDF data={data} />;
        break;
      case "elegant":
        MyDocument = <ElegantPDF data={data} />;
        break;
      case "clear":
        MyDocument = <ClearPDF data={data} />;
        break;
      // All others fallback to a clean StandardPDF
      default:
        MyDocument = <StandardPDF data={data} />;
        break;
    }

    // 2. Generate the PDF blob using the native renderer
    const blob = await pdf(MyDocument).toBlob();

    // 3. Trigger browser download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cvify-resume-${data.personalInfo?.fullName?.replace(/\s+/g, "-").toLowerCase() || "resume"}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error("PDF Export Error:", error);
    alert("Native PDF generation failed. Check console for details.");
  }
};
