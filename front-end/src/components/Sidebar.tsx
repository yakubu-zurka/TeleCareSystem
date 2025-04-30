import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiUser,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const CaregiverSidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { key: "profile", label: "Profile Setup", icon: <FiUser size={20} /> },
    { key: "job-listings", label: "Job Listings", icon: <FiBriefcase size={20} /> },
    { key: "appointments", label: "Appointments", icon: <FiCalendar size={20} /> },
    { key: "earnings", label: "Earnings & Payments", icon: <FiDollarSign size={20} /> },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-2 left-4 z-50 bg-white text-blue p-2 rounded-full shadow-xl transition-transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 h-screen bg-blue-600/90 backdrop-blur-lg text-white shadow-xl p-6 transform transition-transform duration-300 z-40  
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        
        {/* Sidebar Header */}
        <h2 className="text-2xl font-extrabold mb-4 text-center tracking-wide py-10">🚀 Caregiver</h2>

        {/* Menu Items */}
        <ul className="space-y-5">
          {menuItems.map(({ key, label, icon }) => (
            <li key={key}>
              <button
                className={`w-full flex items-center space-x-3 px-5 py-3 rounded-lg font-medium transition-all shadow-md
                  ${
                    activeTab === key
                      ? "bg-white text-blue-600 shadow-lg scale-105"
                      : "hover:bg-white/20 hover:scale-105"
                  }`}
                onClick={() => handleTabClick(key)}
              >
                {icon} <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default CaregiverSidebar;
