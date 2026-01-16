const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const orderRoutes = require("./routes/orderRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const adminRoutes = require("./routes/adminRoutes");



const app = express();

// CORS configuration (allow localhost dev ports and preflight)
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5000","https://medico-sooty-omega.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// In Express 5, cors() handles preflight automatically; avoid wildcard options route

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);




app.get("/", (req, res) => {
  res.send("Medico backend is running 🚀");
});

app.get("/health", (req, res) => {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
    99: "uninitialized",
  };
  res.json({
    status: "ok",
    dbState: mongoose.connection.readyState,
    dbStateText: states[mongoose.connection.readyState] || "unknown",
  });
});

module.exports = app;
