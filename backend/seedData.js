
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgleZYUEX0cRCKJqOFrW_GDFgk3H24WIgBDvwKYEk6zg&s=10",
  },
  {
    name: "Cetirizine 10mg",
    category: "FEVER & COLD",
    price: 25,
    stock: 80,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuS3jO-CNT-znm-fBt2QrrHHVHY5eymD9t_At8Ezzp7g&s=10",
  },
  {
    name: "Vitamin C Tablets",
    category: "SUPPLEMENTS",
    price: 150,
    stock: 60,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBFlOdB_p9SMpeyrF9-ZizXSXoye7zyyStILBVXDqn4w&s=10",
  },
  {
    name: "Multivitamin Tablets",
    category: "SUPPLEMENTS",
    price: 220,
    stock: 50,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGBeh0EdIJJ3GqPjw5hs3APRxc1fsFECOvmgBqyJlzWQ&s=10",
  },
  {
    name: "Antiseptic Cream",
    category: "OTHERS",
    price: 90,
    stock: 40,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI72jbvP4PjBdCZakS2kJyCWeI7Vhqjgu78nqlCjBqNw&s=10",
  },
  {
    name: "Digital Thermometer",
    category: "OTHERS",
    price: 250,
    stock: 30,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJg3e-6N6MU9S5kI7Og53UVAiyyRt31rcNq6njdXje5Q&s=10",
  },
  {
    name: "Amoxicillin 500mg",
    category: "ANTIBIOTICS",
    price: 120,
    stock: 40,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7gDhuJ6jhdh5e-H1EdLYxmeDtec_lDRcHE6M1f0CunA&s=10",
  },
  {
    name: "Azithromycin 500mg",
    category: "ANTIBIOTICS",
    price: 100,
    stock: 35,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5fZAwJMh9Jrslgp0AB0-jCSdiFjBakObNhdqdOfXPfw&s=10",
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
      const doctorImageUpdates = doctors.map(({ name, image }) => ({
        updateOne: {
          filter: { name },
          update: { $set: { image } },
        },
      }));

      const result = await Doctor.bulkWrite(doctorImageUpdates);
      console.log(
        `Doctors already exist: ${doctorCount}. Updated ${result.modifiedCount} doctor images.`
      );
    }

    if (medicineCount === 0) {
      await Medicine.insertMany(medicines);
      console.log("Inserted sample medicines");
    } else {
      const medicineImageUpdates = medicines.map(({ name, image }) => ({
        updateOne: {
          filter: { name },
          update: { $set: { image } },
        },
      }));

      const result = await Medicine.bulkWrite(medicineImageUpdates);
      console.log(
        `Medicines already exist: ${medicineCount}. Updated ${result.modifiedCount} medicine images.`
      );
    }
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedData();
