const express = require('express');
const router = express.Router();
const brandAPIController = require('../../app/controllers/api/brandAPIController');

/* GET users listing. */
router.get('/sizes', brandAPIController.getSizes);

module.exports = router;