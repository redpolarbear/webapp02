/*
using the casperjs script to scrape the lululemon.
casperjs script: lululemon.casper.js
*/
'use strict';

var spawn = require('child_process').spawn;

exports.list = function (url, cb) {
  getLululemon(url, function (data) {
//    console.log(data);
    var lululemon_item;
    if (data.trim() == 'error') {
      lululemon_item = 'error';
    } else {
      var lululemon = JSON.parse(data);
      //filter the data from the scraping - mapping to the data model !important
      var $title = lululemon.title;
      var $partnumber = lululemon.partnumber;
//      var $original_price = lululemon.original_price //.slice(1, lululemon.original_price.length - 5);
//      var $sales_price = lululemon.sales_price ? lululemon.sales_price : 'N/A'; //.slice(1, lululemon.sales_price.length - 5)
      var $skus = lululemon.skus;
      var $weight = 'N/A';
      var $dimension = 'N/A';
      var $description = lululemon.description;
      var $description_detail = lululemon.description_detail;
      var $imageUrls = lululemon.imageUrls;
      lululemon_item = {
        url: url
        , title: $title
        , partnumber: $partnumber
        , original_price: $original_price
        , sales_price: $sales_price
        , skus: $skus
        , weight: $weight
        , dimension: $dimension
        , description: $description
        , description_detail: $description_detail
        , imageUrls: $imageUrls
      };
    };
    cb(lululemon_item);
  });
};

function getLululemon(url, callback) {
  var bin = 'casperjs';
  var args = [];
  args[0] = 'api/scraping/scrapers/lululemon.casper.js';
  args[1] = url;
  var runCasperjs = spawn(bin, args);
  runCasperjs.stdout.setEncoding('utf8');
  runCasperjs.stdout.on('data', function (data) {
    callback(data);
  });
};
