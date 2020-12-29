const express = require('express');
const router = express.Router();

const brandController = require('../app/controllers/brandController');

router.get('/', brandController.index);

router.get('/id/:id', brandController.editBrand)

module.exports = router;