const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const studentRoutes = require('./student.routes');

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Management API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/students', studentRoutes);

module.exports = router;
