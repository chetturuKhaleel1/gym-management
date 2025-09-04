import jsPDF from "jspdf";

export const generatePDF = (bill, index) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Header
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Sri Sai Raghavendra Ladies PG", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Chandapura, Bangalore", 105, 27, { align: "center" });
  doc.text("Phone: +91-XXXXXXXXXX", 105, 33, { align: "center" });

  doc.line(20, 38, 190, 38); // horizontal line

  // Title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Receipt", 105, 50, { align: "center" });

  // Content
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  const details = [
    { label: "Month", value: bill.month },
{ label: "Amount Paid", value: `INR ${bill.amount}` },

    { label: "Payment ID", value: bill.paymentId },
    { label: "Date", value: new Date(bill.createdAt).toLocaleString() },
  ];

  let y = 65;
  details.forEach(({ label, value }) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 30, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 70, y);
    y += 10;
  });

  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    "This is a system-generated receipt. No signature required.",
    105,
    280,
    { align: "center" }
  );

  doc.save(`PG-Bill-${index + 1}.pdf`);
};
