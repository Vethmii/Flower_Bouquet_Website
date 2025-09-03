const express = require('express');
const router = express.Router();
const Flower = require('../models/Flower'); // Your Flower model
const CustomOrder = require('../models/CustomOrder'); // etc.

// Example: Get all flowers for admin
router.get('/flowers', async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Example: Get all custom orders
router.get('/custom-orders', async (req, res) => {
  try {
    const orders = await CustomOrder.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
