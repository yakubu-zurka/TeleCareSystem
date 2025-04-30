import React from "react";
import { Routes, Route } from "react-router-dom";
import CaregiverDashboard from "../pages/CaregiverDashboard"; 
import ProfileSetup from "../components/ProfileSetup";
import JobListings from "../components/JobListings";
import Appointments from "../components/Appointments";
import Payments from "../components/Payments";
import PatientDashboard from "../pages/PatientDashboard"; 
import BookCaregiver from "../components/BookCaregiver";
import PatientAppointments from "../components/PatientAppointments";
import PaymentHistory from "../components/PaymentHistory";
import Reviews from "../components/Reviews";

const DashboardRoutes = () => {
  return (
    <Routes>
      {/* ✅ Caregiver Dashboard Routes */}
      <Route path="caregiver/*" element={<CaregiverDashboard />}>
        <Route index element={<ProfileSetup />} /> {/* Default route */}
        <Route path="profile" element={<ProfileSetup />} />
        <Route path="job-listings" element={<JobListings />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="earnings" element={<Payments />} />
      </Route>

      {/* ✅ Patient Dashboard Routes */}
      <Route path="patient/*" element={<PatientDashboard />}>
        <Route index element={<BookCaregiver />} /> {/* Default route */}
        <Route path="caregiver" element={<BookCaregiver />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="payments" element={<PaymentHistory />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
