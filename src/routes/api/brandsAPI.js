const express = require('express');
const router = express.Router();
const brandAPIController = require('../../app/controllers/api/brandAPIController');

const auth = require('../../middlewares/auth');

router.get('/is-name-exist', auth.protectAPIRequest, brandAPIController.isExistByName);
router.get('/is-url-exist', auth.protectAPIRequest, brandAPIController.isExistByURL);

module.exports = router;