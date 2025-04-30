import React from "react";
import { FaUserEdit } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  const user = {
    fullName: "John Doe",
    email: "john@example.com",
    userType: "Admin",
    profilePic: "https://i.pravatar.cc/150?img=32", // Sample avatar
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-3xl w-full animate-fade-in">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-md transition-transform hover:scale-105"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">{user.fullName}</h2>
            <p className="text-gray-600 mt-1">{user.email}</p>
            <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
              {user.userType}
            </span>

            <div className="mt-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
                <FaUserEdit /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
