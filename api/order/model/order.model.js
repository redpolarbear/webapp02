'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderedItemSchema = new Schema({
  title: String,
  url: String,
  partnumber: String,
  orderedSku: {
    cny_price: String,
    color: String,
    size: String,
    width: String
  },
  quantity: Number,
  imageLocalUrls: [{
    localUrls: [String]
  }],
  weidianProductUrl: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  scrapedItem: {
    type: Schema.ObjectId,
    ref: 'scrapedItem'
  },
  createTime: {
    type: Date,
    'default': Date.now
  },
});

module.exports = mongoose.model('orderedItem', orderItemSchema);
