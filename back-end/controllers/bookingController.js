const Booking = require("../models/Booking");
const Caregiver = require("../models/caregiversModel");

// Book an appointment
exports.bookAppointment = async (req, res) => {
  const { patientName, caregiverId, date, time } = req.body;
   
  try {
    const caregiver = await Caregiver.findById(caregiverId);
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    const newBooking = new Booking({ patientName, caregiverId, date, time });
    await newBooking.save();

    res.status(201).json({ message: "Appointment booked successfully!", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("caregiverId", "name skills location");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve bookings" });
  }
};

// Get a single booking
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("caregiverId", "name skills location");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking" });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
};
