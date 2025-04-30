const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Caregiver", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);
