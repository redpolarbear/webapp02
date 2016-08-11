'use strict';
var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var scrapedItem = require('./model/scraping.model');
var collectionItem = require('../collection/model/collection.model');
var express = require('express');
var path = require('path');
var utils = require('../utils/utils.js');
var scrapers = {};
scrapers['herschelsupply'] = require('./scrapers/herschelsupply');
scrapers['mec'] = require('./scrapers/mec');
scrapers['lululemon'] = require('./scrapers/lululemon');
scrapers['default'] = require('./scrapers/default');

//scrape the item
exports.scrapeItem = function (req, res) {
  var url = req.body.url;
  var scraperToUse;
  if (url.indexOf('herschelsupply.ca') > -1) {
    scraperToUse = 'herschelsupply';
  }
  else if (url.indexOf('mec.ca') > -1) {
    scraperToUse = 'mec';
  }
  else if (url.indexOf('lululemon.com') > -1) {
    scraperToUse = 'lululemon';
  }
  else {
    scraperToUse = 'default';
  };
  scrapers[scraperToUse].list(url, function (data) {
    res.json(data);
  });
};

//verify the url input by the users
exports.verifyUrl = function (req, res) {
  var url = req.body.url;
  request(url, function (error, response, body) {
    if (!error) {
      res.sendStatus(response.statusCode);
    }
    else {
      res.send(error);
    };
  });
};

//save the item
exports.saveItem = function (req, res) {
  var newScrapedItem = new scrapedItem();
  newScrapedItem.title = req.body.title;
  newScrapedItem.source = req.body.source;
  newScrapedItem.brandIconUrl = req.body.brandIconUrl;
  newScrapedItem.url = req.body.url;
  newScrapedItem.creator = req.body.creator;
  newScrapedItem.partnumber = req.body.partnumber;
//  newScrapedItem.original_price = req.body.original_price;
//  newScrapedItem.sales_price = req.body.sales_price;
  newScrapedItem.skus = req.body.skus;
  newScrapedItem.weight = req.body.weight;
  newScrapedItem.dimension = req.body.dimension;
  newScrapedItem.description = req.body.description;
  newScrapedItem.description_detail = req.body.description_detail;
  newScrapedItem.imageUrls = req.body.imageUrls;
  var imageLocalUrls = req.body.imageUrls;

  for (var i = 0; i < imageLocalUrls.length; i++) {
    var color = imageLocalUrls[i].color;
    var imgs = imageLocalUrls[i].imageUrls;
    var localUrls = [];
    imgs.forEach(function (element, index) {
      var random = utils.randomizer(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      var filename = 'images/itemImages/' + random + '.png';
      utils.downloadURI(element, 'public/' + filename, function (filename) {
        console.log('done - ' + filename);
      });
      localUrls.push(filename);
    });
    newScrapedItem.imageLocalUrls.push({
      color: color
      , localUrls: localUrls
    });
  };

  newScrapedItem.save(function (err, newScrapedItem) {
    if (err) {
      throw err;
      res.send('error');
    } else {
      res.json(newScrapedItem);
    };
  });
};
