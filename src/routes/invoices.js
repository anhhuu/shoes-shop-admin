const invoiceController = require('../app/controllers/invoiceColtroller');
const express = require('express');
const router = express.Router();

router.get('/', invoiceController.index);

module.exports = router;