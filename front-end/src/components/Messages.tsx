import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const Messages: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FiMessageSquare className="mr-2" /> Messages
      </h2>
      <p className="text-gray-600">No new messages.</p>
    </div>
  );
};

export default Messages;
