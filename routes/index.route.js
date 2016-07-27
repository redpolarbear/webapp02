var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/index');
var User = require('../api/user/model/user.model');
var authController = require('../api/user/authController');

/* GET home page. */
router.get('/', function (req, res) {
	res.sendFile('index.html');
});

//router.get('/*', function(req, res) {
//  res.redirect('/');
//})
module.exports = router;
