'use strict';

var _ = require('lodash');
var request = require('request');
var scrapedItem = require('../scraping/model/scraping.model');
var collectionItem = require('../collection/model/collection.model');
var orderItem = require('../order/model/order.model');
var express = require('express');
var path = require('path');
var utils = require('../utils/utils.js');

//get user's collections
exports.getUserOrder = function (req, res) {
  var creator = req.params.creator;
  orderItem.find({creator: creator})
    .populate('scrapedItem')
    .exec(function(err, orderItems) {
      if (err) throw err;
      res.json(orderItems);
    });
};

//save the scrapedItem to user's collection
exports.saveToOrder = function (req, res) {
      var newOrderItem = new orderItem();
      newOrderItem.creator = 'matthewxu'; //user.name
      newOrderItem.scrapedItem = req.body.data._id;
      newOrderItem.save(function(err) {
        if (err) {
          res.send('error');
        } else {
          res.send('OK');
        };
      });
}


