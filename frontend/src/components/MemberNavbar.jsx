import React from "react";
import NotificationBell from "./NotificationBell";

const MemberNavbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight">
          🏋️ <span className="text-green-600">Gym App</span>
        </h1>

        <div className="flex items-center gap-4">
          <NotificationBell />
          <img
            src="/avatar.png"
            alt="user avatar"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-gray-300 shadow-sm hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </nav>
  );
};

export default MemberNavbar;
