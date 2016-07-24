'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weidianTokenSchema = new Schema({
  result: {
    access_token: String,
    expire_in: String
  },
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('weidianToken', weidianTokenSchema);
