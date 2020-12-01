const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/productController')

/* GET home page. */
router.get('/', productsController.index);
router.get('/products', productsController.index);
router.post('/products/save', productsController.save);

module.exports = router;