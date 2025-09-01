const express = require('express');
const router = express.Router();
const { addCustomOrder } = require('../controllers/CustomOrdercontroller');

router.post('/', addCustomOrder);

module.exports = router;
