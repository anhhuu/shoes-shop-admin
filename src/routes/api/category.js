const express = require('express');
const router = express.Router();
const brandAPIController = require('../../app/controllers/api/brandAPIController');

router.get('/is-name-exist', brandAPIController.isExistByName);
router.get('/is-url-exist', brandAPIController.isExistByURL);

module.exports = router;