const nodemailer = require("nodemailer");
const Appointment = require("../models/Appointment");
const Caregiver = require("../models/Caregiver");

// Create a transporter object using SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail", // Use the appropriate email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Send an email to the patient
const sendEmailNotification = async (email, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email sending failed:", err);
  }
};

// Book appointment
exports.bookAppointment = async (req, res) => {
  const { caregiverId, date, time } = req.body;
  const patientName = req.user.fullName;
  const patientEmail = req.user.email; // Assuming the patient's email is stored in the user model

  try {
    const caregiver = await Caregiver.findById(caregiverId);
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found." });
    }

    const newAppointment = new Appointment({ caregiverId, patientName, date, time });
    await newAppointment.save();

    // Send email notification to patient
    const subject = "Appointment Booked Successfully";
    const message = `Dear ${patientName},\n\nYour appointment with ${caregiver.name} is scheduled for ${date} at ${time}.\n\nBest regards,\nHealthcare Team`;
    await sendEmailNotification(patientEmail, subject, message);

    res.status(201).json({ message: "Appointment booked successfully." });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Server error while booking." });
  }
};

// Get all appointments for logged-in patient
exports.getPatientAppointments = async (req, res) => {
  try {
    const patientName = req.user.fullName;

    const appointments = await Appointment.find({ patientName })
      .populate("caregiverId", "name email phone bio specialization")
      .sort({ date: 1 });

    const formatted = appointments.map((appt) => ({
      id: appt._id,
      caregiver: appt.caregiverId.name,
      email: appt.caregiverId.email,
      phone: appt.caregiverId.phone,
      specialization: appt.caregiverId.specialization,
      date: appt.date,
      time: appt.time,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Fetch Appointments Error:", err);
    res.status(500).json({ message: "Could not fetch appointments." });
  }
};
