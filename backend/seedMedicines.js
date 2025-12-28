
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Medicine = require("./models/Medicine");

dotenv.config();

const medicines = [
  // Antibiotics
  {
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    price: 120,
    stock: 100,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product1.jpg"
  },
  {
    name: "Azithromycin 500mg",
    category: "Antibiotics",
    price: 160,
    stock: 80,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product2.jpg"
  },
  // Analgesics
  {
    name: "Paracetamol 500mg",
    category: "Analgesic",
    price: 30,
    stock: 200,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product3.jpg"
  },
  {
    name: "Ibuprofen 400mg",
    category: "Analgesic",
    price: 45,
    stock: 150,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product4.jpg"
  },
  {
    name: "Aspirin 75mg",
    category: "Analgesic",
    price: 50,
    stock: 120,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product5.jpg"
  },
  // Antihistamines
  {
    name: "Cetirizine 10mg",
    category: "Antihistamine",
    price: 35,
    stock: 180,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product6.jpg"
  },
  {
    name: "Loratadine 10mg",
    category: "Antihistamine",
    price: 40,
    stock: 140,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product7.jpg"
  },
  // Antacids
  {
    name: "Omeprazole 20mg",
    category: "Antacid",
    price: 80,
    stock: 90,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product8.jpg"
  },
  {
    name: "Pantoprazole 40mg",
    category: "Antacid",
    price: 95,
    stock: 100,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product9.jpg"
  },
  {
    name: "Ranitidine 150mg",
    category: "Antacid",
    price: 25,
    stock: 60,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product10.jpg"
  },
  // Vitamins & Supplements
  {
    name: "Vitamin C 500mg",
    category: "Supplement",
    price: 150,
    stock: 300,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product11.jpg"
  },
  {
    name: "Vitamin D3 60000IU",
    category: "Supplement",
    price: 200,
    stock: 50,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product12.jpg"
  },
  {
    name: "Multivitamin Complex",
    category: "Supplement",
    price: 350,
    stock: 75,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product13.jpg"
  },
  {
    name: "Calcium + Vit D3",
    category: "Supplement",
    price: 220,
    stock: 110,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product14.jpg"
  },
  // First Aid
  {
    name: "Antiseptic Liquid",
    category: "Antiseptic",
    price: 60,
    stock: 40,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product.jpg"
  },
  {
    name: "Bandages (Pack of 10)",
    category: "First Aid",
    price: 50,
    stock: 200,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product1.jpg" 
  },
  {
    name: "Digital Thermometer",
    category: "Device",
    price: 250,
    stock: 30,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product2.jpg"
  },
  // Diabetes
  {
    name: "Metformin 500mg",
    category: "Diabetes",
    price: 45,
    stock: 140,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product3.jpg"
  },
  {
    name: "Glimepiride 1mg",
    category: "Diabetes",
    price: 55,
    stock: 100,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product4.jpg"
  },
  {
    name: "Insulin Syringes",
    category: "Diabetes",
    price: 150,
    stock: 80,
    image: "https://doccure-laravel.dreamstechnologies.com/public/assets/img/products/product5.jpg"
  }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

        await Medicine.deleteMany({});
        console.log("Medicines collection cleared");

        await Medicine.insertMany(medicines);
        console.log("Medicines seeded successfully with 20 items");

        process.exit();
    } catch (error) {
        console.error("Error seeding medicines:", error);
        process.exit(1);
    }
};

seedDB();
