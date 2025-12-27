
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("./models/Doctor");
const connectDB = require("./config/db");

dotenv.config();

const doctors = [
  {
    name: "Dr. Richard James",
    specialization: "General Physician",
    experience: 4,
    about: "Dr. Richard James has a strong commitment to delivering comprehensive medical care helping patients achieve optimal health.",
    consultationFee: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London"
    },
    image: "", 
    availableSlots: ["10:00 AM", "11:00 AM"]
  },
  {
    name: "Dr. Emily Larson",
    specialization: "Gynecologist",
    experience: 3,
    about: "Dr. Emily Larson is dedicated to women's health and wellness, providing compassionate care.",
    consultationFee: 60,
    address: {
      line1: "22nd Street, New York",
      line2: "City Center"
    },
    image: "",
    availableSlots: ["02:00 PM", "03:00 PM"]
  },
  {
    name: "Dr. Patrick Patel",
    specialization: "Dermatologist",
    experience: 5,
    about: "Dr. Patrick Patel specializes in skin care and advanced dermatological treatments.",
    consultationFee: 70,
    address: {
      line1: "10th Avenue, Mumbai",
      line2: "Andheri West"
    },
    image: "",
    availableSlots: ["09:00 AM", "10:30 AM"]
  },
  {
    name: "Dr. Christopher Lee",
    specialization: "Pediatrician",
    experience: 2,
    about: "Dr. Christopher Lee loves working with children and ensuring their healthy development.",
    consultationFee: 40,
    address: {
      line1: "5th Block, Seoul",
      line2: "Gangnam District"
    },
    image: "",
    availableSlots: ["04:00 PM", "05:00 PM"]
  },
  {
    name: "Dr. Jennifer Garcia",
    specialization: "Neurologist",
    experience: 4,
    about: "Dr. Jennifer Garcia is an expert in treating disorders of the nervous system.",
    consultationFee: 80,
    address: {
      line1: "12th Blvd, Madrid",
      line2: "Central Plaza"
    },
    image: "",
    availableSlots: ["11:00 AM", "01:00 PM"]
  },
  {
    name: "Dr. Sarah Davis",
    specialization: "Endocrinologist",
    experience: 6,
    about: "Dr. Sarah Davis helps patients manage hormone-related conditions for a balanced life.",
    consultationFee: 75,
    address: {
      line1: "8th Street, Chicago",
      line2: "Downtown"
    },
    image: "",
    availableSlots: ["09:00 AM", "11:00 AM"]
  },
  {
    name: "Dr. James Wilson",
    specialization: "Cardiologist",
    experience: 8,
    about: "Dr. James Wilson is a renowned heart specialist dedicated to cardiac health.",
    consultationFee: 100,
    address: {
      line1: "Royal Road, Sydney",
      line2: "Harbour View"
    },
    image: "",
    availableSlots: ["10:30 AM", "12:30 PM"]
  },
  {
    name: "Dr. Linda Taylor",
    specialization: "Psychiatrist",
    experience: 5,
    about: "Dr. Linda Taylor provides compassionate mental health care and therapy.",
    consultationFee: 90,
    address: {
      line1: "Sunset Blvd, Los Angeles",
      line2: "Beverly Hills"
    },
    image: "",
    availableSlots: ["01:00 PM", "04:00 PM"]
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
