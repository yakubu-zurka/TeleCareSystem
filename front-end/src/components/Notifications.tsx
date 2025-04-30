import React from "react";
import { FiBell } from "react-icons/fi";

const Notifications: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FiBell className="mr-2" /> Notifications
      </h2>
      <p className="text-gray-600">You're all caught up! No new notifications.</p>
    </div>
  );
};

export default Notifications;
