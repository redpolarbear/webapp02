'use strict';
var User = require('./model/user.model');
var config = require('../../config/index');
//var jwt = require('jwt-simple');
var jwt = require('jsonwebtoken');

exports.signup = function (req, res) {
  var newUser = new User({
    username: req.body.username
    , email: req.body.email
    , password: req.body.password
  });
  // save the user
  newUser.save(function (err, newUser) {
    var token = jwt.sign(newUser, config.secret, {
      expiresIn: '1d'
    });
    res.json({
      success: true
      , token: 'Bearer ' + token
      , msg: 'Successfully created new user.'
    });
  });
};

exports.login = function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({
        success: false
        , msg: 'Authentication failed. User not found.'
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user, config.secret, {
            expiresIn: '1d'
          });
          // return the information including token as JSON
          res.json({
            success: true
            , token: 'Bearer ' + token
            , msg: 'Successfully logged in.'
          });
        } else {
          res.json({
            success: false
            , msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
};

exports.checkUsername = function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({
        isAvailable: true, //the username inputed is ready to go
        msg: 'Username is OK to go.'
      });
    } else {
      res.json({
        isAvailable: false, //already existed
        msg: 'Username is already existed.'
      });
    };
  });
};

exports.checkEmail = function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({
        isAvailable: true, //the username inputed is ready to go
        msg: 'Email is OK to go.'
      });
    } else {
      res.json({
        isAvailable: false, //already existed
        msg: 'Email is already existed.'
      });
    };
  });
};


