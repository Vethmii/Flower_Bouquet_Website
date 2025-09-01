const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Customer name
  email: { type: String, required: true },
  phone: { type: String, required: true },
  occasion: { type: String, required: true }, // e.g., Birthday, Graduation
  description: { type: String, required: true }, // Custom request
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomOrder', customOrderSchema);
