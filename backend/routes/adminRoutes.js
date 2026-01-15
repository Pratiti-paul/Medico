const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { 
    getDashboardStats, 
    getRecentActivity, 
    getAllOrders, 
    getAllAppointments 
} = require("../controllers/adminController");

const router = express.Router();

// Apply protection to all admin routes
router.use(protect);
router.use(admin);

router.get("/stats", getDashboardStats);
router.get("/recent-activity", getRecentActivity);
router.get("/orders", getAllOrders);
router.get("/appointments", getAllAppointments);

module.exports = router;
