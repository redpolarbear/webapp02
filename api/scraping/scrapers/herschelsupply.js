'use strict';
var request = require('request');
var cheerio = require('cheerio');

exports.list = function (url, cb) {
  request(url, function (error, resp, body) {
    var herschelsupply_item;
    if (error) {
      herschelsupply_item = 'error';
    }
    if (!error) {
      var $ = cheerio.load(body);
      var $title = $('h2[itemprop="name"]').text();
      var $partnumber = $('.sku').text();
      var $original_price = $('span.product-price').text() + ' CAD';
      var $sales_price = 'N/A';
      var $weight = "N/A";
      var $dimension = $('p.dimension').text();
      var $description = $('#product-details > div.middle-block.large-4.medium-4.small-12.columns.left > p').text();
      var $list = [];
      $('#product-details > div.middle-block.large-4.medium-4.small-12.columns.left > ul > li').each(function (i, elem) {
        $list[i] = $(this).text();
      });
      var $description_detail = [{
        head: '',
        desc: '',
        list: $list
      }];
      var $sizes = [];
      $sizes[0] = "ONE SIZE";
      var $color = $('.product-color').text();
      var $skus = [{
        original_price: $original_price,
        sales_price: $sales_price,
        color: $color,
        sizes: $sizes
      }];
      var $image_Urls = [];
      $('#product-thumbs > ul > li > img').each(function (i, elem) {
          $image_Urls[i] = 'http:' + $(this).attr('src');
        });
      var $imageUrls = [{
        color: $color,
        imageUrls: $image_Urls
      }];

      herschelsupply_item = {
          url: url
          , title: $title
          , partnumber: $partnumber
          , skus: $skus
          , weight: $weight
          , dimension: $dimension
          , description: $description
          , description_detail: $description_detail
          , imageUrls: $imageUrls
        }
      // respond with the final JSON object
      cb(herschelsupply_item);
    };
  });
};
