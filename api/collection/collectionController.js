'use strict';
var _ = require('lodash');
var request = require('request');
var scrapedItem = require('../scraping/model/scraping.model');
var collectionItem = require('../collection/model/collection.model')
var express = require('express');
var path = require('path');
var utils = require('../utils/utils.js');

//get user's collections
exports.getUserCollection = function (req, res) {
  var creator = req.params.creator;
  collectionItem.find({creator: creator})
    .populate('scrapedItem')
    .exec(function(err, collectionItems) {
      if (err) console.log(err);
      res.json(collectionItems);
//      console.log(collectionItems);
    });
};

//save the scrapedItem to user's collection
exports.saveToCollection = function (req, res) {
      var newCollectionItem = new collectionItem();
      newCollectionItem.creator = 'matthewxu';
      newCollectionItem.scrapedItem = req.body.data._id;
      newCollectionItem.save(function(err) {
        if (err) {
          res.send('error');
        } else {
          res.send('OK');
        };
      });
}


