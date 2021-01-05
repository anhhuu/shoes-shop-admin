const express = require('express');
const router = express.Router();

const customersController = require('../app/controllers/customersController');

router.get('/', customersController.index);
router.get('/id/:id', customersController.getEditPage);

module.exports = router;