const Order = require("../models/Order");

// PLACE order
exports.placeOrder = async (req, res) => {
  try {
    const { medicines, totalAmount, paymentMethod } = req.body;
    
    // Simple custom order ID generator
    const orderId = "ORD" + Math.random().toString(36).substr(2, 9).toUpperCase();

    const order = await Order.create({
      patient: req.user._id,
      medicines,
      totalAmount,
      paymentMethod,
      orderId,
      paymentStatus: paymentMethod === "COD" ? "pending" : "paid"
    });

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET my orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      patient: req.user._id
    }).populate("medicines.medicine", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
