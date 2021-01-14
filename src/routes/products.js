const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/productController')
const auth = require('../middlewares/auth');

router.get('/', auth.protectRequest, productsController.index);

router.get('/create', auth.protectRequest, productsController.getCreatePage);
router.post('/create', auth.protectRequest, productsController.create);

router.get('/id/:id', auth.protectRequest, productsController.getProductEditPage);

router.post('/id/:id/sizes/create', auth.protectRequest, productsController.createSize);
router.patch('/id/:id/sizes/update', auth.protectRequest, productsController.updateSize);
router.delete('/id/:id/sizes/delete', auth.protectRequest, productsController.deleteSize);

router.post('/id/:id/images/create', auth.protectRequest, productsController.createImage);
router.delete('/id/:id/images/delete', auth.protectRequest, productsController.deleteImage);

router.patch('/id/:id/info/update', auth.protectRequest, productsController.updateBasicInfo)

router.delete('/id/:id/delete', auth.protectRequest, productsController.delete);

module.exports = router;