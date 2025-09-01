const express = require('express');
const router = express.Router();
const { getFlowers, addFlower } = require('../controllers/flowerController');

// Get all flowers
router.get('/', getFlowers);

// Add a new flower
router.post('/', addFlower);

module.exports = router;
