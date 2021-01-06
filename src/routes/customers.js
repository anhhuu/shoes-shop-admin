const express = require('express');
const router = express.Router();

const customersController = require('../app/controllers/customersController');

router.get('/', customersController.index);
router.get('/id/:id', customersController.getEditPage);
router.patch('/id/:id/change-blocked-status', customersController.changeBlockedStatus);

module.exports = router;