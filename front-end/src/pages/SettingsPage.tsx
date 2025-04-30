import React, { useState } from "react";
import { FaMoon, FaSun, FaBell, FaLock } from "react-icons/fa";

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

        {/* Theme Toggle */}
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-4">
            <FaMoon className="text-gray-500 text-xl" />
            <span className="text-gray-700">Dark Mode</span>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>

        {/* Notification Toggle */}
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-4">
            <FaBell className="text-yellow-500 text-xl" />
            <span className="text-gray-700">Enable Notifications</span>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transition peer-checked:translate-x-full peer-checked:bg-white"></div>
          </label>
        </div>

        {/* Change Password */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <FaLock className="text-red-500 text-xl" />
            <span className="text-gray-700">Change Password</span>
          </div>
          <button className="text-sm px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
