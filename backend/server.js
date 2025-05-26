const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const careerRoutes = require("./routes/careerRoutes");
const dashboardRoutes=require('./routes/dashboard');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',dashboardRoutes);
app.use("/api", authRoutes);
app.use("/api/careers", careerRoutes);

app.get("/api/test", (req, res) => {
  res.send("API is working");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
