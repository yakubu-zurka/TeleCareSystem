const mongoose = require("mongoose");

const caregiverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: [String],
  experience: String,
  availability: String,
  location: String,
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Caregiver", caregiverSchema);
