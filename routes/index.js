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
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/membership', passport.authenticate('jwt', {
	session: false
}), function (req, res) {
	var token = getToken(req.headers);
	if (token) {
		var decoded = jwt.decode(token, config.secret);
		console.log(decoded);
		User.findOne({
			email: decoded.email
		}, function (err, user) {
			console.log(user);
			if (err) throw err;
			if (!user) {
				return res.status(403).send({
					success: false
					, msg: 'Authentication failed. User not found.'
				});
			}
			else {
				res.json({
					success: true
					, msg: 'Welcome in the member area ' + user.username + '!'
				});
			}
		});
	}
	else {
		return res.status(403).send({
			success: false
			, msg: 'No token provided.'
		});
	}
});

function getToken(headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		}
		else {
			return null;
		}
	}
	else {
		return null;
	}
};
//router.get('/*', function(req, res) {
//  res.redirect('/');
//})
module.exports = router;
