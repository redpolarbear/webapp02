'use strict';

var _ = require('lodash');
var request = require('request');
var scrapedItem = require('../scraping/model/scraping.model');
var orderItem = require('../order/model/order.model');
var user = require('../user/model/user.model');
var express = require('express');
var path = require('path');
var utils = require('../utils/utils.js');

//get user's collections
exports.getUserOrder = function (req, res) {
  var creator = req.params.creator;
  orderItem.find({creator: creator})
    .populate('scrapedItem')
    .exec(function(err, orderItems) {
      console.log(orderItems);
      if (err) {
        throw err;
      } else {
        res.json(orderItems);
      }
    });
};

//save the scrapedItem to user's collection
exports.saveToOrder = function (req, res) {
  var newOrderedItem = new orderItem();
  newOrderedItem.title = req.body.title;
  newOrderedItem.url = req.body.url;
  newOrderedItem.partnumber = req.body.partnumber;
  newOrderedItem.orderedSku = req.body.orderedSku;
  newOrderedItem.quantity = req.body.quantity;
  newOrderedItem.imageLocalUrls = req.body.imageLocalUrls;
  newOrderedItem.weidianProductUrl = req.body.weidianProductUrl;
  newOrderedItem.creator = req.body.creator;
  newOrderedItem.scrapedItem = req.body.scrapedItem;
  newOrderedItem.save(function(err) {
    if (err) {
      throw err;
      res.json({
        success: false
      });
    } else {
      res.json({
        success: true
      });
    };
  });
};


