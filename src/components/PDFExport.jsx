import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PDFExport = ({ targetRef }) => {
  const downloadPDF = async () => {
    const canvas = await html2canvas(targetRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('cvify-resume.pdf');
  };

  return (
    <button
      onClick={downloadPDF}
      className="bg-green-600 text-white px-4 py-2"
    >
      Download PDF
    </button>
  );
};

export default PDFExport;
