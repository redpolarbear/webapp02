'use strict';

var request = require('request');
var TokenItem = require('./model/weidian.token.model');
var weidianConfig = require('../../config/weidian');

var appkey = weidianConfig.appkey;
var secret = weidianConfig.secret;

//return the final correct token;
exports.returnToken = function (req, res) {
  getToken(function (result) {
    res.json(result);
  });
};

//get the token
function getToken(callback) {
  TokenItem.findOne({}).sort({
    createTime: -1
  }).exec(function (err, newToken) {
    if (err) {
      console.log(err);
    };
    if (!newToken || !validateToken(newToken)) {
      console.log('no token existing, renewToken now');
      renewToken(function (newToken) {
        saveToken(newToken);
        newToken = JSON.parse(newToken); //JSON the return from renewToken, otherwise it's the String.
        callback(newToken);
      });
    }
    else {
      callback(newToken);
    };
  });
};

//validate the existing token to see if it's still validate. retrun - true: valid; false: invalid
function validateToken(TokenObj) {
  var createTime = Date.parse(TokenObj.createTime);
  var expire_in = parseInt(TokenObj.result.expire_in);
  var todayTime = new Date();
  todayTime = todayTime.toISOString();
  todayTime = Date.parse(todayTime);
  // var todayTime = Date.parse("2016-06-26T06:28:43.398Z");
  if (todayTime / 1000 - createTime / 1000 - expire_in < 0) {
    return true;
  }
  else {
    return false;
  }
};

function renewToken(callback) {
    var weidianAPI_url = 'https://api.vdian.com/token?grant_type=client_credential&';
    //https://api.vdian.com/token?grant_type=client_credential&appkey=xxx&secret=xxx
    weidianAPI_url = weidianAPI_url + 'appkey=' + appkey + '&secret=' + secret;

    request.get(weidianAPI_url, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            callback(body);
            // saveToken(res.json(body));
            // return: {
            //     "result": {
            //         "access_token": "xxx",
            //         "expire_in": 90000
            //     },
            //     "status": {
            //         "status_code": 0,
            //         "status_reason": "success"
            //     }
            // }
        };
    });
};


function saveToken(return_token) {
  var tokenObj = JSON.parse(return_token);
  var newTokenItem = new TokenItem();
  newTokenItem.result.access_token = tokenObj.result.access_token;
  newTokenItem.result.expire_in = tokenObj.result.expire_in;
  newTokenItem.save(function (err, newToken) {
    if (err) {
      console.log('error - Failed to save the token.');
    }
    else {
      console.log('Token saved successfully!');
    }
  });
};


