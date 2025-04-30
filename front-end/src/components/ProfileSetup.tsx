import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSetup: React.FC = () => {
  const [profile, setProfile] = useState({
    name: "",
    skills: "",
    experience: "",
    availability: "",
    location: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/caregivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        toast.success("✅ Profile saved successfully!",  { position: "top-center" });
        setProfile({
          name: "",
          skills: "",
          experience: "",
          availability: "",
          location: "",
          phone: "",
          email: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(`❌ Failed to save profile: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("❌ An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🚀 Profile Setup</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (e.g., Elderly Care, CPR)"
            value={profile.skills}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            required
          />

          <textarea
            name="experience"
            placeholder="Experience (e.g., 5 years in healthcare)"
            value={profile.experience}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 resize-none"
            required
          />

          <input
            type="text"
            name="availability"
            placeholder="Availability (e.g., Weekdays 9AM-5PM)"
            value={profile.availability}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location (e.g., New York)"
            value={profile.location}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "⏳ Saving..." : "✅ Save Profile"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfileSetup;
