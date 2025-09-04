import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

const BASE_URL = "https://gym-management-backend-0tn2.onrender.com";

const fetchPayments = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setError("User not logged in");
    navigate("/login");
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}/api/payments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 401 || res.status === 403) {
      setError("Unauthorized. Please login again.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch");
    const paymentsData = data.payments || data;
    if (!Array.isArray(paymentsData)) throw new Error("Expected array");
    setPayments(paymentsData);
  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchPayments();
  }, []);

  const exportToExcel = () => {
    if (payments.length === 0) return;

    const dataToExport = payments.map((pay) => ({
      User: pay.user?.name || pay.user,
      Plan: pay.plan?.title || pay.plan,
      Amount: `₹${pay.amount}`,
      PaymentID: pay.paymentId,
      Status: pay.status,
      Date: new Date(pay.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "Payment_Report.xlsx");
  };

  return (
    <div className="p-8 min-h-screen bg-[#0c0c0c] text-white max-w-[95vw] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-green-400 flex items-center gap-2">
          📄 Payment History
        </h1>

        {payments.length > 0 && (
          <button
            onClick={exportToExcel}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 transition px-5 py-3 rounded-lg shadow-md font-semibold"
            aria-label="Export payments to Excel"
          >
            ⬇️ Export to Excel
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-400 text-center text-lg mt-20">Loading payments...</p>
      ) : error ? (
        <p className="text-red-500 text-center font-semibold text-lg mt-20">❌ {error}</p>
      ) : payments.length === 0 ? (
        <p className="text-gray-400 text-center text-lg mt-20">No payments found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-green-700">
          <table className="min-w-full border-collapse border border-green-700">
            <thead className="bg-[#1a1a1a] text-green-300 uppercase tracking-wider select-none">
              <tr>
                {["User", "Plan", "Amount", "Payment ID", "Status", "Date"].map((head) => (
                  <th
                    key={head}
                    className="p-4 border border-green-700 font-semibold text-left whitespace-nowrap"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr
                  key={pay._id}
                  className="hover:bg-[#1f1f1f] transition-colors cursor-pointer"
                  tabIndex={0}
                  aria-label={`Payment by ${pay.user?.name || pay.user} for plan ${pay.plan?.title || pay.plan}`}
                >
                  <td className="p-4 border border-green-800 text-sm">{pay.user?.name || pay.user}</td>
                  <td className="p-4 border border-green-800 text-sm">{pay.plan?.title || pay.plan}</td>
                  <td className="p-4 border border-green-800 font-semibold text-green-400">₹{pay.amount}</td>
                  <td className="p-4 border border-green-800 text-sm break-all">{pay.paymentId}</td>
                  <td className="p-4 border border-green-800 text-yellow-400 font-medium">{pay.status}</td>
                  <td className="p-4 border border-green-800">{new Date(pay.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payments;
