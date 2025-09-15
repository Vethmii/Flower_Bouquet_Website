const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Customer name
  comment: { type: String, required: true },    // Feedback text
  rating: { type: Number, min: 1, max: 5 },     // Optional star rating
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
