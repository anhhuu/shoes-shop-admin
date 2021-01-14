const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const categoryController = require('../app/controllers/categoryController');

router.get('/', auth.protectRequest, categoryController.index);
router.post('/create', auth.protectRequest, categoryController.create);
router.put('/id/:id/update', auth.protectRequest, categoryController.update);

module.exports = router;