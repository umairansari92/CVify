import React from "react";
import { pdf } from "@react-pdf/renderer";
import { toast } from "react-hot-toast";
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
import GlobalPDF from "../components/pdf/GlobalPDF";
import ElitePDF from "../components/pdf/ElitePDF";

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
      case "global":
        MyDocument = <GlobalPDF data={data} />;
        break;
      case "elite":
        MyDocument = <ElitePDF data={data} />;
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
    alert(
      `PDF generation failed: ${error.message}. Please check the console for more details.`,
    );
  }
};

/**
 * Handles Cover Letter PDF generation
 */
import CoverLetterPDF from "../components/pdf/CoverLetterPDF";

export const handleDownloadLetter = async (letter, user) => {
  if (!letter) {
    console.error("Missing letter data for Cover Letter export");
    toast.error("Required data missing for PDF");
    return;
  }

  console.log("Exporting Cover Letter PDF for:", letter.jobTitle);

  try {
    const MyDocument = <CoverLetterPDF letter={letter} user={user} />;

    // Using the same flow as handleDownloadPDF for consistency
    const blob = await pdf(MyDocument).toBlob();

    if (!blob) throw new Error("Generated PDF blob is empty");

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Cover-Letter-${(letter.jobTitle || "cover-letter").replace(/\s+/g, "-")}.pdf`;

    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 200);

    console.info("Cover Letter PDF downloaded successfully");
  } catch (error) {
    console.error("Cover Letter Export Error:", error);
    toast.error(`Failed to download PDF: ${error.message}`);
  }
};
