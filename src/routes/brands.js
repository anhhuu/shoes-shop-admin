const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const brandController = require('../app/controllers/brandController');

router.get('/', auth.protectRequest, brandController.index);
router.post('/create', auth.protectRequest, brandController.create);

router.get('/id/:id', auth.protectRequest, brandController.getBrandEditPage);

router.put('/id/:id/update', auth.protectRequest, brandController.updateBrand);

router.delete('/id/:id/sizes/delete', brandController.deleteSize);
router.post('/id/:id/sizes/create', brandController.createSize);

module.exports = router;