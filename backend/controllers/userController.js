const User = require("../models/User");
const mapAnswersToTags = require("../utils/tagMapper");

exports.submitQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const { answers } = req.body;

    const tags = mapAnswersToTags(answers);

    await User.findByIdAndUpdate(userId, {
      quizAnswers: answers,
      tags: tags,
    });

    res.json({ message: "Quiz submitted successfully", tags });
  } catch (err) {
    console.error("Quiz submission failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
