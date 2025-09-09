const Flower = require('../models/Flower');

// Get all flowers
const getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new flower
const addFlower = async (req, res) => {
  const { name, price, imageURL, category, stock } = req.body;

  const flower = new Flower({ name, price, imageURL, category, stock });

  try {
    const newFlower = await flower.save();
    res.status(201).json(newFlower);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getFlowers, addFlower };
