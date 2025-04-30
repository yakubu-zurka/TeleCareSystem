import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DashboardHeader: React.FC<HeaderProps> = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // 🔒 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  // Navigate to profile
  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  // Navigate to settings
  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    navigate("/settings");
  };

  return (
    <header className="bg-blue-600/90 backdrop-blur-lg shadow-md p-4 flex justify-between items-center">
      {/* Left Side Placeholder */}
      <div className="space-x-4">
        {/* Sidebar toggle or logo can go here */}
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <FiBell className="text-white text-2xl hover:text-yellow-300 transition" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
            3
          </span>
        </div>

        {/* Profile Icon + Dropdown */}
        <div className="relative">
          <FaUserCircle
            className="text-white text-3xl cursor-pointer hover:text-yellow-300 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden animate-fade-in z-50">
              <ul>
                <li
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                  onClick={handleProfileClick}
                >
                  👤 Profile
                </li>
                <li
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                  onClick={handleSettingsClick}
                >
                  ⚙️ Settings
                </li>
                <li
                  className="px-4 py-3 text-red-500 hover:bg-gray-100 cursor-pointer transition"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
