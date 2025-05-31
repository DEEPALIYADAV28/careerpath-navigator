// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const password = await bcrypt.hash("admin123", 10);

  const admin = new Admin({
    email: "admin@gmail.com",
    password,
  });

  await admin.save();
  console.log("✅ Admin user created successfully");
  mongoose.disconnect();
};

createAdmin().catch((err) => {
  console.error("❌ Failed to create admin:", err);
});
