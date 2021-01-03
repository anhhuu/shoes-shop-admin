const express = require('express');
const router = express.Router();
const sizeAPIController = require('../../app/controllers/api/sizeAPIController');

router.get('/', sizeAPIController.getSizes);

router.get('/is-VNSize-exist', sizeAPIController.isVNSizeExist);
router.get('/is-USSize-exist', sizeAPIController.isUSSizeExist);
router.get('/is-CMSize-exist', sizeAPIController.isCMSizeExist);

module.exports = router;