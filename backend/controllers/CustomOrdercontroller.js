const CustomOrder = require('../models/CustomOrder');

// Add a new custom order
const addCustomOrder = async (req, res) => {
  try {
    const {
      customerName,
      contactNo,
      occasionType,
      preferredFlowers,
      wrappingStyle,
      deliveryDate,
    } = req.body;

    // Check required fields
    if (!customerName || !contactNo || !occasionType) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const newOrder = new CustomOrder({
      customerName,
      contactNo,
      occasionType,
      preferredFlowers,
      wrappingStyle,
      deliveryDate,
      fileURL: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '',
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (err) {
    console.error('Error adding custom order:', err);
    res.status(500).json({ message: err.message });
  }
};

// Fetch all custom orders (admin)
const getCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find();
    res.json(orders);
  } catch (err) {
    console.error('Error fetching custom orders:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addCustomOrder, getCustomOrders };
