const Appointment = require("../models/Appointment");

// BOOK appointment
// BOOK appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    // Check availability
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      time
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date,
      time
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET doctor's booked slots
exports.getDoctorAppointments = async (req, res) => {
  try {
    const { docId } = req.params;
    const appointments = await Appointment.find({ doctor: docId }).select("date time -_id");
    res.json(appointments);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// GET logged-in user's appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id
    }).populate("doctor", "name specialization consultationFee");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if the user is the patient
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this appointment" });
    }

    await Appointment.findByIdAndDelete(id);

    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
