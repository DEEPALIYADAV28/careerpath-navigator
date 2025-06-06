const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "mentor", "contributor", "admin"],
    default: "student"
  },
  quizAnswers: {
    type: Object,
    default: {}
  },
  // ✅ Add this line
  tags: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model("User", userSchema);
