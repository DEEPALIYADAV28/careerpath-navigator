const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const User = require("../models/User");
const tagMapper = require("../utils/tagMapper");

// PATCH: Save quiz answers and generate tags
router.patch("/user/quiz", verifyToken, async (req, res) => {
  try {
    const answers = req.body.answers;

    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ message: "Invalid or missing answers." });
    }

    const tags = tagMapper(answers);

    await User.findByIdAndUpdate(
      req.user.id,
      { quizAnswers: answers, tags },
      { new: true }
    );

    res.json({ message: "Quiz responses saved successfully", tags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save quiz answers" });
  }
});

// GET: Get user profile (for dashboard use)
router.get("/user/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});

module.exports = router;
