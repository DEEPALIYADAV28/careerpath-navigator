const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');


router.get('/student-dashboard', verifyToken, (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ message: 'Access denied' });
  res.json({ message: 'Student dashboard loaded' });
});

router.get('/mentor-dashboard', verifyToken, (req, res) => {
  if (req.user.role !== 'mentor') return res.status(403).json({ message: 'Access denied' });
  res.json({ message: 'Mentor dashboard loaded' });
});

router.get('/contributor-dashboard', verifyToken, (req, res) => {
  if (req.user.role !== 'contributor') return res.status(403).json({ message: 'Access denied' });
  res.json({ message: 'Contributor dashboard loaded' });
});

module.exports = router;