const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const siteController = require('../app/controllers/siteController')

const passport = require('../config/passport');

router.get('/', auth.protectRequest, siteController.index);
router.get('/login', siteController.getLoginPage);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
router.get('/logout', siteController.logout);

module.exports = router;