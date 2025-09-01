const CustomOrder = require('../models/CustomOrder');

// Add a new custom order
const addCustomOrder = async (req, res) => {
  const { name, email, phone, occasion, description } = req.body;

  const order = new CustomOrder({ name, email, phone, occasion, description });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { addCustomOrder };
