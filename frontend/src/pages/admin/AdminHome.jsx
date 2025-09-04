import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const AdminHome = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

       const res = await fetch("https://gym-management-backend-0tn2.onrender.com/api/admin/stats", {

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("📊 Admin Stats:", data);
        setStats(data);
      } catch (error) {
        console.error("❌ Failed to fetch admin stats", error);
      }
    };

    fetchStats();
  }, []);

  const chartOptions = {
    options: {
      chart: {
        id: 'revenue-chart',
        toolbar: { show: false },
        animations: { enabled: true, easing: 'easeinout', speed: 800 },
      },
      xaxis: {
        categories: stats?.monthlyRevenue?.map((m) => m.month) || [],
        labels: { style: { colors: '#facc15' } },
      },
      yaxis: {
        labels: { style: { colors: '#22c55e' } },
      },
      colors: ['#facc15'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: "vertical",
          gradientToColors: ['#22c55e'],
          opacityFrom: 0.6,
          opacityTo: 0.1,
        },
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      grid: { borderColor: '#1f2937' },
    },
    series: [
      {
        name: 'Revenue',
        data: stats?.monthlyRevenue?.map((m) => m.revenue) || [],
      },
    ],
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#0d0d0d] min-h-screen text-white">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-yellow-400">
        Welcome, Admin 👋
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#111827] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition border border-yellow-500">
          <h2 className="text-lg text-yellow-400 font-medium">Total Users</h2>
          <p className="text-4xl font-bold mt-2">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-[#111827] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition border border-green-500">
          <h2 className="text-lg text-green-400 font-medium">Active Memberships</h2>
          <p className="text-4xl font-bold mt-2">{stats?.activeMemberships || 0}</p>
        </div>
        <div className="bg-[#111827] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition border border-blue-500">
          <h2 className="text-lg text-blue-400 font-medium">Monthly Revenue</h2>
          <p className="text-4xl font-bold mt-2">₹{stats?.totalRevenue || 0}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#111827] p-6 rounded-2xl shadow-xl mb-10 border border-yellow-500">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">📈 Revenue Overview</h2>
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="area"
          height={320}
        />
      </div>

      {/* Active Members List */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-xl overflow-x-auto border border-green-500">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🧑‍🤝‍🧑 Active Members</h2>
        <table className="min-w-full text-sm">
          <thead className="text-left uppercase text-gray-400 border-b border-gray-600">
            <tr>
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Date Paid</th>
              <th className="py-2 px-2">Date Expiry</th>
              <th className="py-2 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {stats?.activeMembers?.length > 0 ? (
              stats.activeMembers.map((m, idx) => (
                <tr key={idx} className="border-t border-gray-700 hover:bg-gray-800 transition">
                  <td className="py-2 px-2">{m.name}</td>
                  <td className="py-2 px-2">{new Date(m.datePaid).toLocaleDateString()}</td>
                  <td className="py-2 px-2">{new Date(m.expiryDate).toLocaleDateString()}</td>
                  <td className="py-2 px-2 text-green-400 font-medium">{m.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No active members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
