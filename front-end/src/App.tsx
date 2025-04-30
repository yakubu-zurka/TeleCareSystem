import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashboardRoutes from "./routes/DashboardRoutes"; // ✅ Dashboard routing
import Telehealth from "./components/TeleHealth"; // ✅ Import Telehealth Page
import Service from "./components/Service"; // ✅ Import Services Page
import AboutUs from "./components/AboutUs"; // ✅ Import About Page
import ContactUs from "./components/ContactUs"; // ✅ Import Contact Page
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      {!isDashboard && <Navbar />}
      
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Telehealth Route */}
        <Route path="/telehealth" element={<Telehealth />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        
        {/* Home Page - Shown if NOT in Dashboard */}
        <Route path="/" element={<><HeroSection /><HowItWorks /><Testimonials /><Footer /></>} />

        {/* New Pages */}
        <Route path="/services" element={<Service />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  );
};

export default App;
