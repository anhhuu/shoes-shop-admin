const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/productController')

router.get('/', productsController.index);

router.get('/create', productsController.getCreatePage);
router.post('/create', productsController.create);

router.get('/id/:id', productsController.editProduct);

router.post('/id/:id/create/size', productsController.createSize);
router.patch('/id/:id/update/size', productsController.updateSize);
router.delete('/id/:id/delete/size', productsController.deleteSize);

router.post('/id/:id/create/image', productsController.createImage);
router.delete('/id/:id/delete/image', productsController.deleteImage);

router.patch('/id/:id/update/info', productsController.updateBasicInfo)

module.exports = router;