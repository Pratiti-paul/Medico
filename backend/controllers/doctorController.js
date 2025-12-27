const Doctor = require("../models/Doctor");

// GET all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    let doctors = await Doctor.find();

    // Ensure at least 8 sample doctors exist (seed or top-up)
    const samplePool = [
      { name: "Dr. Asha Mehra", specialization: "Cardiologist", experience: 12, consultationFee: 800, availableSlots: ["10:00", "11:30", "16:00"] },
      { name: "Dr. Rohit Sen", specialization: "Dermatologist", experience: 8, consultationFee: 600, availableSlots: ["09:30", "14:00", "18:30"] },
      { name: "Dr. Priya Nair", specialization: "Pediatrician", experience: 10, consultationFee: 700, availableSlots: ["10:15", "12:00", "17:00"] },
      { name: "Dr. Arjun Kapoor", specialization: "Orthopedic", experience: 9, consultationFee: 750, availableSlots: ["11:00", "15:30", "19:00"] },
      { name: "Dr. Neha Sharma", specialization: "Gynecologist", experience: 11, consultationFee: 850, availableSlots: ["09:00", "13:30", "18:00"] },
      { name: "Dr. Sameer Khan", specialization: "Neurologist", experience: 13, consultationFee: 900, availableSlots: ["10:45", "16:30"] },
      { name: "Dr. Kavita Rao", specialization: "Ophthalmologist", experience: 7, consultationFee: 650, availableSlots: ["09:45", "12:30", "17:15"] },
      { name: "Dr. Vivek Gupta", specialization: "ENT Specialist", experience: 10, consultationFee: 700, availableSlots: ["10:30", "15:00", "18:45"] }
    ];

    if (!doctors || doctors.length < 8) {
      const existingNames = new Set((doctors || []).map(d => d.name));
      const needed = 8 - (doctors ? doctors.length : 0);
      const toInsert = samplePool.filter(s => !existingNames.has(s.name)).slice(0, Math.max(0, needed));
      if (toInsert.length) {
        await Doctor.insertMany(toInsert);
        doctors = await Doctor.find();
      }
    }

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
