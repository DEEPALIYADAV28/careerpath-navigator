const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const verifyToken = require("../middleware/VerifyToken");
const verifyAdmin = require("../middleware/VerifyAdmin");

// Add a new quiz (Admin only)
router.post("/add", verifyToken, verifyAdmin, async (req, res) => {
  const { role, questions } = req.body;
  try {
    const existing = await Quiz.findOne({ role });
    if (existing) {
      return res.status(400).json({ message: "Quiz already exists" });
    }

    const quiz = new Quiz({ role, questions });
    await quiz.save();
    res.status(201).json({ message: "Quiz added successfully" });
  } catch (err) {
    console.error("Error adding quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update quiz questions by role (Admin only)
router.put("/update/:role", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Quiz.findOneAndUpdate(
      { role: req.params.role },
      { questions: req.body.questions },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Quiz not found for update" });
    }
    res.json(updated);
  } catch (err) {
    console.error("Error updating quiz:", err);
    res.status(500).json({ message: "Update error" });
  }
});

// Get quiz questions by role (public access)
router.get("/:role", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ role: req.params.role });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz.questions);
  } catch (err) {
    console.error("Error fetching quiz:", err);
    res.status(500).json({ message: "Fetch error" });
  }
});
 
// Get quiz statistics
router.get("/stats", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    const totalQuizzes = quizzes.length;
    const rolesCovered = [...new Set(quizzes.map(q => q.role))];
    const totalQuestions = quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0);

    res.json({
      totalQuizzes,
      rolesCovered,
      totalQuestions,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

module.exports = router;
