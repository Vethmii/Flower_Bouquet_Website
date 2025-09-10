// backend/routes/CustomOrderRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  addCustomOrder,
  getCustomOrders,
  updateCustomOrder,
  deleteCustomOrder,
} = require('../controllers/CustomOrdercontroller');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// CRUD Routes
router.post('/', upload.single('file'), addCustomOrder); // Create new custom order
router.get('/', getCustomOrders);                         // Get all custom orders
router.put('/:id', updateCustomOrder);                    // Update a custom order by ID
router.delete('/:id', deleteCustomOrder);                // Delete a custom order by ID

module.exports = router;






