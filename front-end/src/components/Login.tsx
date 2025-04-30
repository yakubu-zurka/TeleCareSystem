import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import styles

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Success: Show Toast & Redirect
      toast.success("Login successful! Redirecting...",  { position: "top-center" });

      // Store the token in localStorage for further API calls
      if (data.token) {
        localStorage.setItem("token", data.token); // Save token in localStorage
      }

      // Redirect based on user type
      setTimeout(() => {
        if (data.userType === "caregiver") {
          navigate("/dashboard/caregiver");
        } else {
          navigate("/dashboard/patient");
        }
      }, 2000);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-6">
      <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-2xl w-96 transform transition-all hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center mb-6">Login</h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-4 transition-all hover:bg-blue-500 shadow-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </span>
        </div>
      </div>

      <ToastContainer /> {/* Add this to display the toast notifications */}
    </div>
  );
};

export default Login;
