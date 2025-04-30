import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup: React.FC = () => {
  const [userType, setUserType] = useState<"caregiver" | "patient">("patient");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirection

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Signup Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          userType, // Send user type (caregiver or patient)
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // ✅ Success - Show Toast and Redirect
      toast.success("Signup successful! Redirecting...");

      setTimeout(() => {
        navigate(userType === "caregiver" ? "/dashboard/caregiver" : "/dashboard/patient");
      }, 2000);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="bg-blue-400 text-white p-9 rounded-2xl shadow-lg w-96 mt-14">
        <h2 className="text-3xl font-extrabold text-center mb-6">Sign Up</h2>

        {/* User Type Selection */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 rounded-full p-1 flex items-center w-48">
            <button
              className={`w-1/2 py-2 rounded-full text-sm font-medium transition-all ${
                userType === "patient" ? "bg-white text-blue-600 shadow-md" : "text-white"
              }`}
              onClick={() => setUserType("patient")}
            >
              Patient
            </button>
            <button
              className={`w-1/2 py-2 rounded-full text-sm font-medium transition-all ${
                userType === "caregiver" ? "bg-white text-blue-600 shadow-md" : "text-white"
              }`}
              onClick={() => setUserType("caregiver")}
            >
              Caregiver
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 border border-white/30 text-white rounded-lg placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 border border-white/30 text-white rounded-lg placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 border border-white/30 text-white rounded-lg placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 border border-white/30 text-white rounded-lg placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-white text-blue-600 py-3 rounded-lg font-semibold mt-4 transition-all hover:bg-blue-500 hover:text-white shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : `Sign Up as ${userType === "caregiver" ? "Caregiver" : "Patient"}`}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-white hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
