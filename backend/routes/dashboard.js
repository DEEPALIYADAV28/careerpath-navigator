const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.get('/student-dashboard', verifyToken, async (req, res) => {
  res.json({ message: `Welcome to your dashboard, User ID: ${req.user.id}` });
});

module.exports = router;