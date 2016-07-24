'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collcectionItemSchema = new Schema({
//  user_id: {
//    type: Schema.ObjectId,
//    ref: 'users'
//  },
  creator: String,
  scrapedItem: {
    type: Schema.ObjectId,
    ref: 'scrapedItem'
  },
  tags: [String],
  createTime: {
    type: Date,
    'default': Date.now
  },
});

module.exports = mongoose.model('collectionItem', collcectionItemSchema);
