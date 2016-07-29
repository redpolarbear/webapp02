'use strict';

var config = require('../config/index');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/model/user.model');
var validateJwt = expressJwt({
  secret: config.secret
});
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isLoggedin() {
  return compose()
    // Validate jwt
    .use(function (req, res, next) {
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function (req, res, next) {
      User.findById(req.user._id, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        if (req.user._id == user._id) {
          next();
        } else {
          return res.send(401);
        };
      });
    });
};

var isParamsLegal = function (req, res, next) {
  if (req.params.creator == req.user.username) {
    next();
  } else {
    return res.send(401);
  }
};

exports.isLoggedin = isLoggedin;
exports.isParamsLegal = isParamsLegal;
