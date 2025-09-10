// backend/routes/AdminRoutes.js
const express = require('express');
const router = express.Router();
const Flower = require('../models/Flower');
const CustomOrder = require('../models/CustomOrder');

// GET all flowers (for admin dashboard)
router.get('/flowers', async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (err) {
    console.error('Error fetching flowers:', err);
    res.status(500).json({ message: 'Failed to fetch flowers' });
  }
});

// GET all custom orders (for admin dashboard)
router.get('/custom-orders', async (req, res) => {
  try {
    const orders = await CustomOrder.find().sort({ createdAt: -1 }); // latest first
    res.json(orders);
  } catch (err) {
    console.error('Error fetching custom orders:', err);
    res.status(500).json({ message: 'Failed to fetch custom orders' });
  }
});

module.exports = router;

