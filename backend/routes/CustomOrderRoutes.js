// routes/CustomOrderRoutes.js
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

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('file'), addCustomOrder);
router.get('/', getCustomOrders);
router.put('/:id', updateCustomOrder);
router.delete('/:id', deleteCustomOrder);

module.exports = router;




