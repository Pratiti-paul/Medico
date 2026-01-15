const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { 
    getDashboardStats, 
    getRecentActivity, 
    getAllOrders, 
    getAllAppointments,
    getAllDoctors,
    updateDoctorAvailability,
    updateAppointmentStatus,
    updateOrderStatus,
    updatePaymentStatus,
    updateMedicine
} = require("../controllers/adminController");

const router = express.Router();

// Apply protection to all admin routes
router.use(protect);
router.use(admin);

router.get("/stats", getDashboardStats);
router.get("/recent-activity", getRecentActivity);
router.get("/orders", getAllOrders);
router.get("/appointments", getAllAppointments);
router.get("/doctors", getAllDoctors);

router.put("/doctors/:id/availability", updateDoctorAvailability);
router.put("/appointments/:id/status", updateAppointmentStatus);
router.put("/orders/:id/status", updateOrderStatus);
router.put("/orders/:id/payment", updatePaymentStatus);
router.put("/medicines/:id", updateMedicine);

module.exports = router;
