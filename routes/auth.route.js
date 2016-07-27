'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.middleware');

var passport = require('passport');
var jwt = require('express-jwt');
var config = require('../config/index'); //grab the secret
var User = require('../api/user/model/user.model');
var authController = require('../api/user/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/membership', jwt({secret: config.secret}), authController.membership);
//router.get('/*', function(req, res) {
//  res.redirect('/');
//})
module.exports = router;
