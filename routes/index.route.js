var express = require('express');
var router = express.Router();

var auth = require('../auth/auth.middleware');

/* GET home page. */
router.get('/', auth.isLoggedin, function (req, res) {
	res.sendFile('index.html');
});

//router.get('/*', function(req, res) {
//  res.redirect('/');
//})
module.exports = router;
