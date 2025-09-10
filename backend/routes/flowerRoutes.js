// backend/routes/flowerRoutes.js
const express = require('express');
const router = express.Router();
const Flower = require('../models/Flower');
const multer = require('multer');
const path = require('path');

// ---------------- Multer configuration ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ---------------- Flower Routes ----------------

// GET /api/flowers - fetch all flowers
router.get('/', async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (err) {
    console.error('Error fetching flowers:', err);
    res.status(500).json({ message: 'Server error fetching flowers' });
  }
});

// POST /api/flowers - add a new flower
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    if (!name || !price || !category || !req.file) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const flower = new Flower({
      name,
      price,
      category,
      stock: stock || 0,
      imageURL: `http://localhost:5000/uploads/${req.file.filename}`,
    });

    const savedFlower = await flower.save();
    res.status(201).json(savedFlower);
  } catch (err) {
    console.error('Error saving flower:', err);
    res.status(500).json({ message: 'Server error saving flower' });
  }
});

// PUT /api/flowers/:id - update flower
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    if (!flower) return res.status(404).json({ message: 'Flower not found' });

    const { name, price, category, stock } = req.body;
    flower.name = name || flower.name;
    flower.price = price || flower.price;
    flower.category = category || flower.category;
    flower.stock = stock || flower.stock;
    if (req.file) flower.imageURL = `http://localhost:5000/uploads/${req.file.filename}`;

    const updatedFlower = await flower.save();
    res.json(updatedFlower);
  } catch (err) {
    console.error('Error updating flower:', err);
    res.status(500).json({ message: 'Server error updating flower' });
  }
});

// DELETE /api/flowers/:id - remove flower
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Flower.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Flower not found' });
    res.json({ message: 'Flower deleted' });
  } catch (err) {
    console.error('Error deleting flower:', err);
    res.status(500).json({ message: 'Server error deleting flower' });
  }
});

// ---------------- Daily Deals ----------------

// POST /api/flowers/:id/deals - add daily deal
router.post('/:id/deals', async (req, res) => {
  try {
    const { percent, corner } = req.body;
    if (!percent) return res.status(400).json({ message: 'Percent is required' });

    const flower = await Flower.findById(req.params.id);
    if (!flower) return res.status(404).json({ message: 'Flower not found' });

    const newDeal = { percent, corner: corner || 'right' };
    flower.dailyDeals.push(newDeal);

    const updatedFlower = await flower.save();
    res.status(201).json(updatedFlower);
  } catch (err) {
    console.error('Error adding daily deal:', err);
    res.status(500).json({ message: 'Server error adding daily deal' });
  }
});

// DELETE /api/flowers/:id/deals/:dealId - remove daily deal
router.delete('/:id/deals/:dealId', async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    if (!flower) return res.status(404).json({ message: 'Flower not found' });

    flower.dailyDeals = flower.dailyDeals.filter(
      (deal) => deal._id.toString() !== req.params.dealId
    );

    const updatedFlower = await flower.save();
    res.json(updatedFlower);
  } catch (err) {
    console.error('Error removing daily deal:', err);
    res.status(500).json({ message: 'Server error removing daily deal' });
  }
});

module.exports = router;




