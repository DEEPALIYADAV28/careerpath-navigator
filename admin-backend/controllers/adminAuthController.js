require("dotenv").config(); // Load environment variables at the top

const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔐 Secure Admin Register (Requires Secret Key)
exports.adminRegister = async (req, res) => {
  const { email, password, secretKey } = req.body;

  // Check invitation/secret key
  if (secretKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ message: "Invalid secret key" });
  }

  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      email,
      password: hash,
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Admin register error:", err);
    res.status(500).json({ message: "Error registering admin" });
  }
};
