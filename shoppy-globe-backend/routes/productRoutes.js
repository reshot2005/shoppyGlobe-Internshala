const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productController');

// get all items
router.get('/', getProducts);

// get one item
router.get('/:id', getProductById);

module.exports = router;
