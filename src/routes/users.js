const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/api/usersAPIController');

//[GET] users/verification/:hashedID
router.get('/verification/:token', usersController.verification);

module.exports = router;
