const express = require('express');
const router = express.Router();
const productAPIController = require('../../app/controllers/api/productAPIController');

router.get('/', productAPIController.getProductsWithFilters);
router.get('/is-deleted-size', productAPIController.isExistInDeletedSizeList)

module.exports = router;