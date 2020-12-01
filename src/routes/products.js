const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/productController')

/* GET home page. */
router.get('/', productsController.index);
router.post('/save', productsController.save);

module.exports = router;