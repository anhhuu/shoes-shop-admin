const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/productController')

router.get('/', productsController.index);
router.get('/test', productsController.indexTest);

router.get('/create', productsController.getCreatePage);
router.post('/create', productsController.create);

router.get('/id/:id', productsController.showProduct);

router.post('/id/:id/create/size', productsController.sizeCreate);
router.patch('/id/:id/update/size', productsController.sizeUpdate);
router.delete('/id/:id/delete/size', productsController.sizeDelete);

router.post('/id/:id/create/image', productsController.imageCreate);
router.delete('/id/:id/delete/image', productsController.imageDelete);

router.patch('/id/:id/update/info', productsController.infoUpdate)

module.exports = router;