const express = require('express');
const router = express.Router();

const brandController = require('../app/controllers/brandController');

router.get('/', brandController.index);

router.get('/id/:id', brandController.editBrand);

router.put('/id/:id/update', brandController.updateBrand);

router.delete('/id/:id/delete/size', brandController.deleteSize);

module.exports = router;