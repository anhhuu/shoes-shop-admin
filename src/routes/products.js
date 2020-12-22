const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/productController')

router.get('/', productsController.index);

router.get('/id/:id', productsController.showProduct);

router.post('/id/:id/info-update', productsController.infoUpdate);
router.post('/id/:id/image-update', productsController.imageUpdate);

router.post('/save', productsController.save);

module.exports = router;