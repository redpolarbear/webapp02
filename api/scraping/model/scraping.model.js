'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scrapedItemSchema = new Schema({
  source: String,
  brandIconUrl: String,
  url: String,
  title: String,
  partnumber: String,
//  original_price: String, //CAD
//  sales_price: String, //CAD
  skus: [{
    original_price: String, //CAD
    sales_price: String, //CAD
    color: String,
    sizes: [String],
  }],
  weight: String,
  dimension: String,
  description: String,
  description_detail: [{
    head: String,
    desc: String,
    list: [String]
  }],
  imageUrls: [{
    color: String,
    imageUrls: [String]
  }],
  imageLocalUrls:[{
    color: String,
    localUrls: [String]
  }],
  creator: String,
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('scrapedItem', scrapedItemSchema);
