
require("dotenv").config();
const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");
const Medicine = require("./models/Medicine");

const doctors = [
  {
    name: "Dr. Aditi Sharma",
    specialization: "General physician",
    experience: 8,
    consultationFee: 500,
    image: "/images/doctor-avatar-girl.png",
    rating: 4.8,
    available: true,
  },
  {
    name: "Dr. Rahul Mehta",
    specialization: "Dermatologist",
    experience: 10,
    consultationFee: 700,
    image: "/images/doctor-avatar-boy.png",
    rating: 4.7,
    available: true,
  },
  {
    name: "Dr. Priya Verma",
    specialization: "Gynecologist",
    experience: 9,
    consultationFee: 600,
    image: "/images/doctor-avatar-girl.png",
    rating: 4.9,
    available: true,
  },
  {
    name: "Dr. Karan Malhotra",
    specialization: "Pediatricians",
    experience: 7,
    consultationFee: 550,
    image: "/images/doctor-avatar-boy.png",
    rating: 4.6,
    available: true,
  },
  {
    name: "Dr. Neha Kapoor",
    specialization: "Neurologist",
    experience: 12,
    consultationFee: 900,
    image: "/images/doctor-avatar-girl.png",
    rating: 4.8,
    available: true,
  },
  {
    name: "Dr. Arjun Singh",
    specialization: "Gastroenterologist",
    experience: 11,
    consultationFee: 800,
    image: "/images/doctor-avatar-boy.png",
    rating: 4.7,
    available: true,
  },
];

const medicines = [
  {
    name: "Paracetamol 500mg",
    category: "FEVER & COLD",
    price: 30,
    stock: 100,
    image: "https://placehold.co/300x200?text=Paracetamol",
  },
  {
    name: "Cetirizine 10mg",
    category: "FEVER & COLD",
    price: 25,
    stock: 80,
    image: "https://placehold.co/300x200?text=Cetirizine",
  },
  {
    name: "Vitamin C Tablets",
    category: "SUPPLEMENTS",
    price: 150,
    stock: 60,
    image: "https://placehold.co/300x200?text=Vitamin+C",
  },
  {
    name: "Multivitamin Tablets",
    category: "SUPPLEMENTS",
    price: 220,
    stock: 50,
    image: "https://placehold.co/300x200?text=Multivitamins",
  },
  {
    name: "Antiseptic Cream",
    category: "OTHERS",
    price: 90,
    stock: 40,
    image: "https://placehold.co/300x200?text=Antiseptic",
  },
  {
    name: "Digital Thermometer",
    category: "OTHERS",
    price: 250,
    stock: 30,
    image: "https://placehold.co/300x200?text=Thermometer",
  },
  {
    name: "Amoxicillin 500mg",
    category: "ANTIBIOTICS",
    price: 120,
    stock: 40,
    image: "https://placehold.co/300x200?text=Amoxicillin",
  },
  {
    name: "Azithromycin 500mg",
    category: "ANTIBIOTICS",
    price: 100,
    stock: 35,
    image: "https://placehold.co/300x200?text=Azithromycin",
  },
];

async function seedData() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const doctorCount = await Doctor.countDocuments();
    const medicineCount = await Medicine.countDocuments();

    if (doctorCount === 0) {
      await Doctor.insertMany(doctors);
      console.log("Inserted sample doctors");
    } else {
      console.log(`Doctors already exist: ${doctorCount}. Skipping.`);
    }

    if (medicineCount === 0) {
      await Medicine.insertMany(medicines);
      console.log("Inserted sample medicines");
    } else {
      console.log(`Medicines already exist: ${medicineCount}. Skipping.`);
    }
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedData();
