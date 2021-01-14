const express = require('express');
const router = express.Router();
const productAPIController = require('../../app/controllers/api/productAPIController');
const auth = require('../../middlewares/auth');

router.get('/', auth.protectAPIRequest, productAPIController.getProductsWithFilters);
router.get('/is-deleted-size', auth.protectAPIRequest, productAPIController.isExistInDeletedSizeList)

module.exports = router;