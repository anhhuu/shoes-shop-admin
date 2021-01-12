const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userController = require('../app/controllers/userController');
const { route } = require('./site');

router.get('/profile', auth.protectRequest, userController.getProfilePage);
router.post('/profile/update', auth.protectRequest, userController.update);

router.put('/profile/change-password', auth.protectRequest, userController.changePassword);

module.exports = router;