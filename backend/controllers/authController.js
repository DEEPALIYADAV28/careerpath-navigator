const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password,role } = req.body;

  // Reject common email typo
  if (email.includes("@gmil.com")) {
    return res.status(400).json({
      message: "Invalid email domain. Did you mean '@gmail.com'?",
    });
  }
    // Basic role validation
  const allowedRoles = ["student", "mentor", "contributor"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role selected." });
  }


  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hash,role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Reject common typo before proceeding
  if (email.includes("@gmil.com")) {
    return res.status(400).json({
      message: "Invalid email domain. Did you mean '@gmail.com'?",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id ,role:user.role}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });



    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email ,role:user.role},
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
