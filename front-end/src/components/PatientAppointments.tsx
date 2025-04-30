import { jsPDF } from "jspdf";
import React, { useEffect, useState } from "react";

interface PatientAppointment {
  id: string;
  caregiver: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: string;
}

const PatientAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<PatientAppointment | null>(null);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/book-appointment", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const openModal = (appointment: PatientAppointment) => {
    setSelectedAppointment(appointment);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  const exportAppointmentsToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(14);
    doc.text("Patient Appointments", 14, 20);

    appointments.forEach((appt, index) => {
      const yPosition = 30 + index * 20;
      doc.text(
        `${appt.caregiver} - ${appt.date} at ${appt.time}`,
        14,
        yPosition
      );
    });

    doc.save("appointments.pdf");
  };

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          📅 Your <span className="text-yellow-500">Bookings</span>
        </h2>

        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-600 text-lg">⏳ Loading appointments...</p>
          ) : appointments.length > 0 ? (
            appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-md p-5 rounded-xl flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{appt.caregiver}</h3>
                  <p className="text-sm text-black-600"> {appt.phone}</p>
                  <p className="text-sm text-black-600">📅 {appt.date} | ⏰ {appt.time}</p>
                  <p className="text-sm text-black-600"> {appt.email} </p>
                </div>
                <button
                  onClick={() => openModal(appt)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg">🚫 No upcoming appointments.</p>
          )}
        </div>

        {/* Export to PDF Button */}
        <button
          onClick={exportAppointmentsToPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition mt-6"
        >
          Export to PDF
        </button>
      </div>

      {/* Modal */}
      {selectedAppointment && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 opacity-100 visible animate-fade-in-up"
        >
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative transform transition-all duration-300">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold transition duration-300 transform hover:scale-105"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">📋 Appointment Details</h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <p><strong>Caregiver:</strong> {selectedAppointment.caregiver}</p>
              <p><strong>Email:</strong> {selectedAppointment.email}</p>
              <p><strong>Phone:</strong> {selectedAppointment.phone}</p>
              <p><strong>Date:</strong> {selectedAppointment.date}</p>
              <p><strong>Time:</strong> {selectedAppointment.time}</p>
            </div>

            <button
              onClick={closeModal}
              className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PatientAppointments;
