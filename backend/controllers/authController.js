const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAuthResponse = (user) => ({
  token: jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  ),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});

// ================= REGISTER =================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const normalizedEmail = (email || "").trim().toLowerCase();

    // check if user exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      role: role || "user"
    });

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = (email || "").trim().toLowerCase();

    // find user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json(createAuthResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DEMO LOGIN =================
exports.loginDemoUser = async (req, res) => {
  try {
    const demoEmail = (process.env.DEMO_EMAIL || "").trim().toLowerCase();
    const demoPassword = process.env.DEMO_PASSWORD || "";

    if (!demoEmail || !demoPassword || !process.env.JWT_SECRET) {
      return res.status(503).json({ message: "Demo login is not configured" });
    }

    let user = await User.findOne({ email: demoEmail });

    if (!user) {
      user = await User.create({
        name: process.env.DEMO_NAME || "Medico Demo Patient",
        email: demoEmail,
        password: await bcrypt.hash(demoPassword, 10),
        role: "demo"
      });
    } else if (user.role !== "demo") {
      return res.status(503).json({ message: "Demo login is not configured" });
    }

    res.json(createAuthResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
