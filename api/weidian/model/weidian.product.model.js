'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weidianProductSchema = new Schema({
  item_id: String, //true item_id return when it's successfully created.
  scrapedItem_id: {
    type: Schema.ObjectId,
    ref: 'scrapedItem'
  },
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('weidianProduct', weidianProductSchema);
