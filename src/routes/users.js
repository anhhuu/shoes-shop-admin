const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userController = require('../app/controllers/userController');
const userAPIController = require('../app/controllers/api/userAPIController');
const { route } = require('./site');

router.get('/profile', auth.protectRequest, userController.getProfilePage);
/* router.post('/profile/update', auth.protectRequest, userController.update);

router.put('/profile/change-password', auth.protectRequest, userController.changePassword); */


//[GET] users/verification/:hashedID
router.get('/verification/:token', userAPIController.verification);

module.exports = router;