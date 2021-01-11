const express = require('express');
const router = express.Router();
const usersController = require('../../app/controllers/api/usersAPIController');
const passport = require("../../config/passport");

//[POST] api/users/signup
router.post('/signup', usersController.signup);

// [POST] api/users/forgot-password
router.post('/forgot-password',usersController.forgotPassword);

//[POST] api/users/reset-password
router.post('/reset-password',usersController.postResetPassword);

//[GET] user/reset-password/:token
router.get('/reset-password/:token',usersController.resetPassword);


module.exports = router;