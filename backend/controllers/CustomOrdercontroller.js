// controllers/CustomOrdercontroller.js
const CustomOrder = require('../models/CustomOrder');
const fs = require('fs');
const path = require('path');

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

    // Validate required fields
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

// Fetch all custom orders (sorted by latest first)
const getCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching custom orders:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update a custom order
const updateCustomOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await CustomOrder.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating custom order:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a custom order
const deleteCustomOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await CustomOrder.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Remove uploaded file if exists
    if (order.fileURL) {
      try {
        const filename = path.basename(order.fileURL);
        const uploadsPath = path.join(__dirname, '..', 'uploads', filename);
        if (fs.existsSync(uploadsPath)) {
          fs.unlinkSync(uploadsPath);
        }
      } catch (fileErr) {
        console.warn('⚠️ Failed to remove uploaded file:', fileErr.message);
      }
    }

    await CustomOrder.findByIdAndDelete(id);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting custom order:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addCustomOrder, getCustomOrders, updateCustomOrder, deleteCustomOrder };

