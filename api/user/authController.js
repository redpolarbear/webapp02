'use strict';
var passport = require('passport');
var User = require('./model/user.model');
var config = require('../../config/index');
var jwt = require('jwt-simple');
exports.signup = function (req, res) {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.json({
      success: false
      , msg: 'Please pass name and password.'
    });
  }
  else {
    var newUser = new User({
      username: req.body.username
      , email: req.body.email
      , password: req.body.password
    });
    // save the user
    newUser.save(function (err, newUser) {
      if (err) {
        return res.json({
          success: false
          , msg: 'Username already exists.'
        });
      };
      var token = jwt.encode(newUser, config.secret);
      res.json({
        success: true
        , token: 'Bearer ' + token
        , msg: 'Successfully created new user.'
      });
    });
  }
};
exports.login = function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.send({
        success: false
        , msg: 'Authentication failed. User not found.'
      });
    }
    else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({
            success: true
            , token: 'Bearer ' + token
            , msg: 'Successfully logged in.'
          });
        }
        else {
          res.send({
            success: false
            , msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
};
exports.membership = function (req, res) {
  console.log(req);
  res.send(req.user);
};
