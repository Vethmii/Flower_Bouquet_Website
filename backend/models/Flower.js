// models/Flower.js
const mongoose = require('mongoose');

// Sub-schema for a daily deal
const dailyDealSchema = new mongoose.Schema(
  {
    percent: { type: Number, required: true }, // e.g. 20 means 20% off
    corner: { type: String, enum: ["left", "right"], default: "right" }, // which corner to display
    createdAt: { type: Date, default: Date.now }, // when the deal was added
  },
  { _id: true } // each deal has its own _id for easy deletion
);

// Main flower schema
const flowerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageURL: { type: String, required: true },
    stock: { type: Number, default: 0 },

    // Array of daily deals
    dailyDeals: [dailyDealSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Flower', flowerSchema);

