const express = require('express');
const router = express.Router();

const categoryController = require('../app/controllers/categoryController');
router.get('/', categoryController.index);
module.exports = router;