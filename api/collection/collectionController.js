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
  var userName = req.user._doc.username;
  if (creator !== userName) {
    res.send(401);
  } else {
  collectionItem.find({creator: creator})
    .populate('scrapedItem')
    .exec(function(err, collectionItems) {
      if (err) console.log(err);
      res.json(collectionItems);
    });
  };
};

//save the scrapedItem to user's collection
exports.saveToCollection = function (req, res) {
      var newCollectionItem = new collectionItem();
      newCollectionItem.creator = req.body.creator;
      newCollectionItem.scrapedItem = req.body._id;
      newCollectionItem.save(function(err) {
        if (err) {
          res.json({
            success: false
          });
        } else {
          res.json({
            success: true
          });
        };
      });
}


