// models/CustomOrder.js
const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  contactNo: { type: String, required: true },
  occasionType: { type: String, required: true },
  preferredFlowers: { type: String },
  wrappingStyle: { type: String },
  deliveryDate: { type: Date },
  fileURL: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('CustomOrder', customOrderSchema);







