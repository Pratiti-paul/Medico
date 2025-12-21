const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const orderRoutes = require("./routes/orderRoutes");



const app = express();

// CORS configuration (allow localhost dev ports and preflight)
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    try {
      const u = new URL(origin);
      if (u.hostname === "localhost") return callback(null, true);
    } catch {}
    const allowList = new Set([
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175"
    ]);
    if (allowList.has(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// Handle preflight for all routes (Express 5 RegExp-compatible)
app.options(/.*/, cors(corsOptions));

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);




app.get("/", (req, res) => {
  res.send("Medico backend is running 🚀");
});

module.exports = app;
