import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-hot-toast';

const PDFExport = ({ targetRef }) => {
  const downloadPDF = async () => {
    try {
      if (!targetRef.current) {
        toast.error('Unable to locate document element');
        return;
      }

      // Create a clone to avoid DOM manipulation issues
      const clonedElement = targetRef.current.cloneNode(true);
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.appendChild(clonedElement);
      document.body.appendChild(container);

      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Remove temporary container
      document.body.removeChild(container);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('cvify-resume.pdf');
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('PDF Export Error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
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
