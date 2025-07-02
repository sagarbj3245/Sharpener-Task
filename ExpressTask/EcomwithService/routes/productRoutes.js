const express = require('express');
const router = express.Router();

// Import product controller
const productController = require('../controllers/productController');

// Route: GET /products
router.get('/', productController.getAllProducts);

// Route: GET /products/:id
router.get('/:id', productController.getProductById);

// Route: POST /products
router.post('/', productController.addProduct);

module.exports = router;
