const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const customersController = require('../app/controllers/customersController');

router.get('/', auth.protectRequest, customersController.index);
router.get('/id/:id', auth.protectRequest, customersController.getEditPage);
router.patch('/id/:id/change-blocked-status', auth.protectRequest, customersController.changeBlockedStatus);

module.exports = router;