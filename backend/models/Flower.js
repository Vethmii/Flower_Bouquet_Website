const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
  category: { type: String, required: true }, // Birthday, Graduation, Valentine
  stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Flower', flowerSchema);
