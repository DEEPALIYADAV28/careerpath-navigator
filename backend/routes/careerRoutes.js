const express = require("express");
const router = express.Router();
const Career = require("../models/Career");

// GET all careers
router.get("/", async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching careers" });
  }
});

// POST new career (optional: for admin use)
router.post("/", async (req, res) => {
  try {
    const newCareer = new Career(req.body);
    await newCareer.save();
    res.status(201).json({ message: "Career added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add career" });
  }
});

module.exports = router;
