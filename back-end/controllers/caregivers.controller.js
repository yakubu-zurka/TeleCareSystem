const Caregiver = require("../models/caregiversModel"); // ✅ Ensure correct model file name

// ✅ Get all caregivers
const getCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find();
    res.status(200).json(caregivers);
  } catch (error) {
    console.error("❌ Error fetching caregivers:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
};

// ✅ Create a new caregiver
const createCaregiver = async (req, res) => {
  try {
    const { name, skills, experience, availability, location, phone, email } = req.body;

    // ✅ Validate required fields
    if (!name || !skills || !experience || !availability || !location || !phone || !email) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    const newCaregiver = new Caregiver({
      name,
      skills,
      experience,
      availability,
      location,
      phone,
      email
    });

    await newCaregiver.save();

    res.status(201).json({ message: "✅ Caregiver created successfully", caregiver: newCaregiver });
  } catch (error) {
    console.error("❌ Error creating caregiver:", error);
    res.status(400).json({ message: "❌ Invalid data", error: error.message });
  }
};

module.exports = { getCaregivers, createCaregiver };
