import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogOut, Menu } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navItems = [
    { path: "/admin-dashboard", label: "Dashboard Home" },
    { path: "/admin-dashboard/members", label: "Manage Members" },
    { path: "/admin-dashboard/coaches", label: "Coaches" },
    { path: "/admin-dashboard/plans", label: "Plans" },
    { path: "/admin-dashboard/payments", label: "Payments" },
    { path: "/admin-dashboard/supplements", label: "Supplement Store" },
    { path: "/admin-dashboard/diet-details", label: "Diet Details" },
    { path: "/admin-dashboard/settings", label: "Settings" },
    { path: "/admin-dashboard/notifications", label: "Assign Notifications" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-[#111] border-b border-gray-800">
        <h1 className="text-xl font-bold text-yellow-400">Admin Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:static z-50 md:z-auto transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:flex w-64 bg-[#111] shadow-lg flex-col justify-between px-6 py-8 border-r border-gray-800 h-full`}>
        
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-10 text-center tracking-wide hidden md:block">
            Admin Panel
          </h1>

          <nav className="space-y-4">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-yellow-500 text-black font-semibold"
                      : "text-gray-400 hover:bg-gray-800 hover:text-yellow-300"
                  }`
                }
                onClick={() => setSidebarOpen(false)} // close on mobile after click
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-black mt-[56px] md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
