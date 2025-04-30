const express = require("express");
const { bookAppointment, getBookings, getBookingById, deleteBooking } = require("../controllers/bookingController");
const router = express.Router();

router.post("/", bookAppointment);
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.delete("/:id", deleteBooking);

module.exports = router;
