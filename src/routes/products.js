const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/productController')

router.get('/', productsController.index);

router.get('/create', productsController.getCreatePage);
router.post('/create', productsController.create);

router.get('/id/:id', productsController.getProductEditPage);

router.post('/id/:id/sizes/create', productsController.createSize);
router.patch('/id/:id/sizes/update', productsController.updateSize);
router.delete('/id/:id/sizes/delete', productsController.deleteSize);

router.post('/id/:id/images/create', productsController.createImage);
router.delete('/id/:id/images/delete', productsController.deleteImage);

router.patch('/id/:id/info/update', productsController.updateBasicInfo)

module.exports = router;