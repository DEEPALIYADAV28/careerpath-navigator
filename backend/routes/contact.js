const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact - Save contact form message
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // You can optionally send an email here using nodemailer or similar

    res.status(201).json({ message: "Message received successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
