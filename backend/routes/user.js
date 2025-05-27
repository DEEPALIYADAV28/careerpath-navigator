// backend/routes/user.js (Add this route)
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const User = require('../models/User');

router.patch('/user/quiz', verifyToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { quizAnswers: req.body.answers });
    res.json({ message: 'Quiz responses saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save quiz answers' });
  }
});

module.exports = router;

