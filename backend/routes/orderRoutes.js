const express = require("express");
const { placeOrder, getMyOrders } = require("../controllers/orderController");
const { protect, demoReadOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, demoReadOnly, placeOrder);
router.get("/my", protect, getMyOrders);

module.exports = router;
