const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const siteController = require('../app/controllers/siteController')
const userRouter = require('./users');
const passport = require('../config/passport');

router.get('/', auth.protectRequest, siteController.index);
router.get('/login', siteController.getLoginPage);
router.post('/login', siteController.login);
router.get('/logout', auth.protectRequest, siteController.logout);
router.use('/users', userRouter);

module.exports = router;