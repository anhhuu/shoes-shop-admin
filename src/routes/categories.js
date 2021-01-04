const express = require('express');
const router = express.Router();

const categoryController = require('../app/controllers/categoryController');

router.get('/', categoryController.index);
router.post('/create', categoryController.create);
router.put('/id/:id/update', categoryController.update);

module.exports = router;