const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getPatientAppointments,
} = require("../controllers/appointmentController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/appointment", authMiddleware, bookAppointment);
router.get("/", authMiddleware, getPatientAppointments);

module.exports = router;
