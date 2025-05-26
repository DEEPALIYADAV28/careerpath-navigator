const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  skills: [String],
  exams: [String],
  salary: String,
  careerLevel: String,
  image: String,
  moreInfoLink: String,
});

module.exports = mongoose.model("Career", careerSchema);
