const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ["student", "mentor", "contributor"]
  },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }]
    }
  ]
});

module.exports = mongoose.model("Quiz", QuizSchema);
