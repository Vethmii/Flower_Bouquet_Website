const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
  screenshotURL: { type: String, default: "" }, // optional, can be empty
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);

