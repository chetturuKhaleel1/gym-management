import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { generatePDF } from "../../utils/pdfGenerator"; // adjust path if needed

const MemberBills = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      setError("User not logged in or missing token.");
      return;
    }

    const fetchBills = async () => {
      try {
        const response = await fetch(`/api/billing/my-bills`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Failed to fetch bills");
        }

        const data = await response.json();
        setBills(data.bills || []);
      } catch (err) {
        console.error("❌ Error fetching bills:", err.message);
        setError("Failed to load bills. Please try again later.");
      }
    };

    fetchBills();
  }, []);

const handleDownload = (bill, index) => {
  try {
    generatePDF(bill, index); // Use the utility
  } catch (err) {
    console.error("PDF generation failed:", err);
  }
};


  return (
    <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
        📄 My Payments
      </h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {bills.length === 0 && !error ? (
        <p className="text-gray-500 text-center">No bills found.</p>
      ) : (
        <ul className="space-y-6">
          {bills.map((bill, index) => (
            <li key={bill._id} className="relative border rounded-md shadow bg-white p-6">
              <div
                id={`bill-${index}`}
                className="export-area max-w-[800px] mx-auto text-black bg-white"
              >
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold">Sri Sai Raghavendra Ladies PG</h3>
                  <p className="text-sm text-gray-700">Chandapura, Bangalore</p>
                  <p className="text-sm text-gray-700">Phone: +91-XXXXXXXXXX</p>
                  <hr className="my-2 border-t" />
                  <h4 className="text-lg font-bold text-green-700">Payment Receipt</h4>
                </div>

                <table className="w-full text-sm mb-4">
                  <tbody>
                    <tr>
                      <td className="font-semibold py-1">Month:</td>
                      <td className="py-1">{bill.month}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold py-1">Amount Paid:</td>
                      <td className="py-1">₹{bill.amount}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold py-1">Payment ID:</td>
                      <td className="py-1">{bill.paymentId}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold py-1">Date:</td>
                      <td className="py-1">
                        {new Date(bill.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-xs text-gray-500 text-right mt-6">
                  This is a system-generated receipt. No signature required.
                </p>
              </div>

              <div className="mt-4 text-right">
               <button
  onClick={() => handleDownload(bill, index)} // Pass bill here
  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded"
>
  Download PDF
</button>

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberBills;
