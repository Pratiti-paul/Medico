const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("./models/Doctor");
const connectDB = require("./config/db");

dotenv.config();

const doctors = [
  {
    "rating": 4.5,
    "available": true,
    "name": "Dr. Asha Mehra",
    "specialization": "Cardiologist",
    "experience": 12,
    "consultationFee": 800,
    "availableSlots": [
      "10:00",
      "11:30",
      "16:00"
    ],
    "image": "default_doctor_image"
  },
  {
    "rating": 4.5,
    "available": true,
    "name": "Dr. Rohit Sen",
    "specialization": "Dermatologist",
    "experience": 8,
    "consultationFee": 600,
    "availableSlots": [
      "09:30",
      "14:00",
      "18:30"
    ],
    "image": "default_doctor_image"
  },
  {
    "rating": 4.5,
    "available": true,
    "name": "Dr. Priya Nair",
    "specialization": "Pediatrician",
    "experience": 10,
    "consultationFee": 700,
    "availableSlots": [
      "10:15",
      "12:00",
      "17:00"
    ],
    "image": "default_doctor_image"
  },
  {
    "rating": 4.5,
    "available": true,
    "name": "Dr. Arjun Kapoor",
    "specialization": "Orthopedic",
    "experience": 9,
    "consultationFee": 750,
    "availableSlots": [
      "11:00",
      "15:30",
      "19:00"
    ],
    "image": "default_doctor_image"
  },
  {
    "rating": 4.5,
    "available": true,
    "name": "Dr. Neha Sharma",
    "specialization": "Gynecologist",
    "experience": 11,
    "consultationFee": 850,
    "availableSlots": [
      "09:00",
      "13:30",
      "18:00"
    ],
    "image": "default_doctor_image"
  },
  {
    "rating": 4.5,
    "available": true,
    "name": "Dr. Sameer Khan",
    "specialization": "Neurologist",
    "experience": 13,
    "consultationFee": 900,
    "availableSlots": [
      "10:45",
      "16:30"
    ],
    "image": "default_doctor_image"
  },
  {
    "rating": 4.5,
    "available": true,
    "name": "Dr. Kavita Rao",
    "specialization": "Ophthalmologist",
    "experience": 7,
    "consultationFee": 650,
    "availableSlots": [
      "09:45",
      "12:30",
      "17:15"
    ],
    "image": "default_doctor_image"
  },
  {
    "rating": 4.5,
    "available": true,
    "name": "Dr. Vivek Gupta",
    "specialization": "ENT Specialist",
    "experience": 10,
    "consultationFee": 700,
    "availableSlots": [
      "10:30",
      "15:00",
      "18:45"
    ],
    "image": "default_doctor_image"
  }
];

const seedDoctors = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Doctor.deleteMany();
    console.log("Doctors collection cleared");
    
    // Insert new data
    await Doctor.insertMany(doctors);
    console.log("Doctors seeded successfully");
    
    process.exit();
  } catch (error) {
    console.error("Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();
