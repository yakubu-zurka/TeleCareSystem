import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://localhost:5000/api";

const BookCaregiver: React.FC = () => {
  const [search, setSearch] = useState("");
  const [caregivers, setCaregivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCaregiver, setSelectedCaregiver] = useState<any | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientName, setPatientName] = useState<string>(""); // Store patient's name
  const [patientLoading, setPatientLoading] = useState<boolean>(true); // Track loading state for patient data

  // Fetch the logged-in user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        toast.error("No token found. Please login again.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user profile.");
      
      const userData = await response.json();
      setPatientName(userData.fullName);
      console.log("Patient name set to:", userData.fullName);

      setPatientLoading(false); // Set loading to false after fetching user data
    } catch (error) {
      console.error("User Profile Fetch Error:", error);
      toast.error("Failed to fetch user data.");
      setPatientLoading(false); // Set loading to false in case of error
    }
  };

  // Fetch caregivers from API
  const fetchCaregivers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/caregivers`);
      if (!response.ok) throw new Error("Failed to load caregivers.");
      const data = await response.json();
      setCaregivers(data);
    } catch (error) {
      console.error("Error fetching caregivers:", error);
      toast.error("Failed to load caregivers.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserProfile(); // Fetch logged-in user
    fetchCaregivers();
  }, []);

  // Handle Booking Submission
  const confirmBooking = async () => {
    if (!selectedCaregiver || !date || !time || !patientName) {
      toast.error("Please select a caregiver, date, and time!", { position: "top-right" });
      return;
    }

    const bookingData = {
      patientName, // Automatically fetched from user profile
      caregiverId: selectedCaregiver._id,
      date,
      time,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please login again.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/book-appointment`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Booking with patientName:", patientName);

        toast.success("Appointment booked successfully!", { position: "top-center" });

        fetchCaregivers();
        setSelectedCaregiver(null);
        setDate("");
        setTime("");
      } else {
        toast.error(`Failed to book: ${result.message}`, { position: "top-center" });
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again!", { position: "top-center" });
    }
  };

  return (
    <>
      <ToastContainer /> 
      <section className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            🤝 Book a <span className="text-yellow-500">Caregiver</span>
          </h2>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search caregivers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-yellow-500"
            />
            <span className="absolute left-4 top-4 text-gray-400 text-xl">🔎</span>
          </div>

          {loading ? (
            <p className="text-center text-gray-600 text-lg">⏳ Loading caregivers...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {caregivers
                .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
                .map((c) => (
                  <div key={c._id} className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl transition duration-300">
                    <h3 className="text-xl font-bold text-yellow-600">{c.name}</h3>
                    <p className="text-sm font-semi-bold text-gray-600">{c.skills}</p>
                    <p className="text-sm font-semi-bold text-gray-500">{c.experience}</p>
                    <p className="text-sm font-semi-bold text-gray-400">{c.availability}</p>
                    <p className="text-sm font-sem-bold text-gray-500">{c.location}</p>
                    <button onClick={() => setSelectedCaregiver(c)} className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-200">
                      📅 Book Now
                    </button>
                  </div>
                ))}
            </div>
          )}

          {selectedCaregiver && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Book Appointment with {selectedCaregiver.name}
                </h3>
                <p className="text-gray-700 mb-2">Patient Name: <strong>{patientLoading ? "Loading..." : patientName || "Not loaded"}</strong></p>
                <div className="mb-4">
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-yellow-500 mb-2"
                  />
                  <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <button 
                  onClick={confirmBooking} 
                  disabled={!patientName || patientLoading}
                  className="w-full bg-green-500 text-white p-3 rounded-lg disabled:opacity-50 hover:bg-green-600 transition duration-200"
                >
                  Confirm Booking
                </button>

                <button onClick={() => setSelectedCaregiver(null)} className="w-full bg-red-500 text-white p-3 rounded-lg mt-2 hover:bg-red-600 transition duration-200">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BookCaregiver;
