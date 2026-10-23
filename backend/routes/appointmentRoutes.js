const express = require("express");
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  cancelAppointment
} = require("../controllers/appointmentController");
const { protect, demoReadOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// protected routes
router.post("/", protect, demoReadOnly, bookAppointment);
router.get("/my", protect, getMyAppointments);
router.delete("/:id", protect, demoReadOnly, cancelAppointment);
router.get("/doctor/:docId", getDoctorAppointments);

module.exports = router;
