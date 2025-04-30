import React, { useState } from "react";
import PatientSidebar from "../components/PatientSidebar";
import DashboardHeader from "../components/DashboardHeader";
import BookCaregiver from "../components/BookCaregiver";
import Appointments from "../components/PatientAppointments";
import PaymentHistory from "../components/PaymentHistory";
import Reviews from "../components/Reviews";
import Messages from "../components/Messages"; // New component

const PatientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("book"); // Default tab

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 🚀 Sidebar Stays Fixed */}
      <PatientSidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* 🚀 Main Content Area (Scrollable) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 🚀 Header Stays Fixed */}
        <DashboardHeader />

        {/* 🚀 Scrollable Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "book" && <BookCaregiver />}
          {activeTab === "appointments" && <Appointments />}
          {activeTab === "payments" && <PaymentHistory />}
          {activeTab === "reviews" && <Reviews />}
          {activeTab === "messages" && <Messages />} {/* 🚀 New Tab */}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
