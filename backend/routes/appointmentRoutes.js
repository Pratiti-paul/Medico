const express = require("express");
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  cancelAppointment
} = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// protected routes
router.post("/", protect, bookAppointment);
router.get("/my", protect, getMyAppointments);
router.delete("/:id", protect, cancelAppointment);
router.get("/doctor/:docId", getDoctorAppointments);

module.exports = router;
