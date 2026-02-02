import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export const handleDownloadPDF = async () => {
  const input = document.getElementById("resume-preview");
  if (!input) return;

  try {
    // We use onclone to modify the element for capture without affecting the live UI
    const canvas = await html2canvas(input, {
      scale: 2, // Retain high quality
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedInput = clonedDoc.getElementById("resume-preview");
        if (clonedInput) {
          // Remove transform/scale that interferes with capture dimensions
          clonedInput.style.transform = "none";
          clonedInput.style.scale = "none";
          clonedInput.style.margin = "0";
          clonedInput.style.padding = "0";
          clonedInput.style.borderRadius = "0";
          clonedInput.style.boxShadow = "none";
          // Ensure it's treated as a single long block for capture
          clonedInput.style.height = "auto";
          clonedInput.style.minHeight = "297mm";
        }
      },
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const canvasImgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = canvasImgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, canvasImgHeight);
    heightLeft -= pageHeight;

    // Add subsequent pages if content overflows
    while (heightLeft > 0) {
      position = heightLeft - canvasImgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, canvasImgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("cvify-resume.pdf");
  } catch (error) {
    console.error("PDF Export Error:", error);
    alert("Failed to generate PDF");
  }
};
