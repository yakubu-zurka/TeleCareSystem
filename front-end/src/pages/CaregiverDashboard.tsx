import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import ProfileSetup from "../components/ProfileSetup";
import JobListings from "../components/JobListings";
import Appointments from "../components/Appointments";
import Payments from "../components/Payments";
import Messages from "../components/Messages.tsx"; // New component
import Notifications from "../components/Notifications.tsx"; // New component

const CaregiverDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Fixed) */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* 🚀 Main Content (Scrollable) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header (Fixed at Top) */}
        <DashboardHeader />

        {/* 🚀 Scrollable Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "profile" && <ProfileSetup />}
          {activeTab === "job-listings" && <JobListings />}
          {activeTab === "appointments" && <Appointments />}
          {activeTab === "earnings" && <Payments />}
          {activeTab === "messages" && <Messages />} {/* 🚀 New Tab */}
          {activeTab === "notifications" && <Notifications />} {/* 🚀 New Tab */}
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
