const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Medicine = require("../models/Medicine");
const Appointment = require("../models/Appointment");
const Order = require("../models/Order");

// GET dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const [userCount, doctorCount, medicineCount, appointmentCount, orderCount] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Doctor.countDocuments(),
      Medicine.countDocuments(),
      Appointment.countDocuments(),
      Order.countDocuments()
    ]);

    res.json({
      totalUsers: userCount,
      totalDoctors: doctorCount,
      medicinesListed: medicineCount,
      appointments: appointmentCount,
      totalOrders: orderCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET recent activity (Latest orders and upcoming appointments)
exports.getRecentActivity = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    const upcomingAppointments = await Appointment.find({
        // For a true "upcoming" check, we'd compare dates, 
        // but for now we'll just get the latest 5 appointments
    })
      .populate("user", "name")
      .populate("doctor", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      recentOrders,
      upcomingAppointments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all orders (with pagination)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("user", "name email")
            .populate("doctor", "name specialization")
            .sort({ createdAt: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
