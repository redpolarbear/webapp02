'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderItemSchema = new Schema({
  title: String,
  url: String,
  partnumber: String,
  orderedSku: {
    cny_price: String,
    color: String,
    size: String,
    width: {
      type: String,
      'default': 'N/A'
    }
  },
  quantity: Number,
  imageLocalUrls: [{
    localUrls: [String]
  }],
  weidianProductUrl: String,
  creator: String,
  scrapedItem: {
    type: Schema.ObjectId,
    ref: 'scrapedItem'
  },
  createTime: {
    type: Date,
    'default': Date.now
  },
});

module.exports = mongoose.model('orderItem', orderItemSchema);
