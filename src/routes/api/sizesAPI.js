const express = require('express');
const router = express.Router();
const sizeAPIController = require('../../app/controllers/api/sizeAPIController');

/* GET users listing. */
router.get('/', sizeAPIController.getSizes);

module.exports = router;