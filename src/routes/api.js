const express = require('express');
const router = express.Router();
const apiController = require('../app/controllers/apiController')

/* GET users listing. */
router.get('/sizes', apiController.getSizes);
router.get('/products', apiController.getProductsWithFiltters);

module.exports = router;