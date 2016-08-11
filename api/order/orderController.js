'use strict';

var _ = require('lodash');
var request = require('request');
var scrapedItem = require('../scraping/model/scraping.model');
var orderedItem = require('../order/model/order.model');
var user = require('../user/model/user.model');
var express = require('express');
var path = require('path');
var utils = require('../utils/utils.js');

//get user's collections
exports.getUserOrder = function (req, res) {
  var creator = req.params.creator;
  orderedItem.find({creator: creator})
    .populate('scrapedItem')
    .exec(function(err, orderedItems) {
      if (err) throw err;
      res.json(orderedItems);
    });
};

//save the scrapedItem to user's collection
exports.saveToOrder = function (req, res) {
  var newOrderedItem = new orderedItem();
  newOrderedItem.title = req.body.title;
  newOrderedItem.url = req.body.url;
  newOrderedItem.partnumber = req.body.partnumber;
  newOrderedItem.sku = {
    cny_price: req.body.cny_price,
    color: req.body.color,
    size: req.body.size,
    width: req.body.width
  };
  newOrderedItem.quantity = req.body.quantity;
  newOrderedItem.imageLocalUrls: [{
    localUrls: req.body.localUrls
  }];
  newOrderedItem.weidianProductUrl: req.body.weidianProductUrl;
  newOrderedItem.user = req.body.user_id;
  newOrderedItem.save(function(err) {
    if (err) {
      throw err;
    } else {
      res.json({
        success: true
      });
    };
  });
};


