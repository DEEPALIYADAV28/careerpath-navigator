const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const adminAuthRoutes = require("./routes/adminAuth");
const quizRoutes = require("./routes/adminQuiz");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminAuthRoutes);
 app.use("/api/admin/quiz", quizRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT || 5001, () => {
    console.log(`🚀 Admin backend running on port ${process.env.PORT || 5001}`);
  });
})
.catch((err) => {
  console.error("❌ Database connection error:", err);
});
