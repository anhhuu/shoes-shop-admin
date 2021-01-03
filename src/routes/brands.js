const express = require('express');
const router = express.Router();

const brandController = require('../app/controllers/brandController');

router.get('/', brandController.index);
router.post('/create', brandController.create);

router.get('/id/:id', brandController.getBrandEditPage);

router.put('/id/:id/update', brandController.updateBrand);

router.delete('/id/:id/sizes/delete', brandController.deleteSize);
router.post('/id/:id/sizes/create', brandController.createSize);

module.exports = router;