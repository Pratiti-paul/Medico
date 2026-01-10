const Doctor = require("../models/Doctor");

// GET all doctors with optional filters and sorting
exports.getAllDoctors = async (req, res) => {
  try {
    const {
      q, // name search
      specialization,
      available, // 'true' | 'false'
      sort = "recent", // recent | rating_desc | experience_desc | fee_asc | fee_desc
      limit: limitStr
    } = req.query;

    const limit = Math.min(parseInt(limitStr || "1000", 10) || 1000, 1000);

    // Build filter
    const filter = {};
    if (q) {
      filter.name = { $regex: q, $options: "i" };
    }
    if (specialization && specialization !== "All") {
      filter.specialization = specialization;
    }
    if (available === "true" || available === "false") {
      filter.available = available === "true";
    }

    // Build sort option
    const sortMap = {
      recent: { createdAt: -1 },
      rating_desc: { rating: -1 },
      experience_desc: { experience: -1 },
      fee_asc: { consultationFee: 1 },
      fee_desc: { consultationFee: -1 }
    };
    const sortOption = sortMap[sort] || sortMap.recent;

    const doctors = await Doctor.find(filter).sort(sortOption).limit(limit);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
