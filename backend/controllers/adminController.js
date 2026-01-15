const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Medicine = require("../models/Medicine");
const Appointment = require("../models/Appointment");
const Order = require("../models/Order");

// GET dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const [userCount, doctorCount, medicineCount, appointmentCount, orderCount] = await Promise.all([
      User.countDocuments({ role: { $ne: "admin" } }),
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
      .populate("patient", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    const upcomingAppointments = await Appointment.find({
        // For a true "upcoming" check, we'd compare dates, 
        // but for now we'll just get the latest 5 appointments
    })
      .populate("patient", "name")
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
        const orders = await Order.find().populate("patient", "name email").sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patient", "name email")
            .populate("doctor", "name specialization")
            .sort({ createdAt: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET all doctors (for admin list)
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().sort({ name: 1 });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE doctor availability
exports.updateDoctorAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { available } = req.body;
        
        const doctor = await Doctor.findByIdAndUpdate(id, { available }, { new: true });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        
        res.json({ message: "Doctor availability updated", doctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE appointment status
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // booked or cancelled
        
        const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });
        
        res.json({ message: `Appointment ${status}`, appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // placed or delivered
        
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        
        res.json({ message: `Order marked as ${status}`, order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE payment status
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentStatus } = req.body; // paid or pending
        
        const order = await Order.findByIdAndUpdate(id, { paymentStatus }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        
        res.json({ message: `Payment status updated to ${paymentStatus}`, order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE medicine details (price and stock)
exports.updateMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const { price, stock } = req.body;
        
        const medicine = await Medicine.findByIdAndUpdate(
            id, 
            { price, stock }, 
            { new: true, runValidators: true }
        );
        
        if (!medicine) return res.status(404).json({ message: "Medicine not found" });
        
        res.json({ message: "Medicine updated successfully", medicine });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
