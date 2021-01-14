const express = require('express');
const router = express.Router();
const sizeAPIController = require('../../app/controllers/api/sizeAPIController');

const auth = require('../../middlewares/auth');

router.get('/', auth.protectAPIRequest, sizeAPIController.getSizes);

router.get('/is-VNSize-exist', auth.protectAPIRequest, sizeAPIController.isVNSizeExist);
router.get('/is-USSize-exist', auth.protectAPIRequest, sizeAPIController.isUSSizeExist);
router.get('/is-CMSize-exist', auth.protectAPIRequest, sizeAPIController.isCMSizeExist);

module.exports = router;