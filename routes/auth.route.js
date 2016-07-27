'use strict';

var express = require('express');
var router = express.Router();

var authController = require('../api/user/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

//router.get('/membership', jwt({secret: config.secret}), authController.membership);
//router.get('/*', function(req, res) {
//  res.redirect('/');
//})
module.exports = router;
