const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addCustomOrder, getCustomOrders } = require('../controllers/CustomOrderController');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST: add new custom order
router.post('/', upload.single('file'), addCustomOrder);

// GET: fetch all custom orders
router.get('/', getCustomOrders);

module.exports = router;
