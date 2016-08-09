'use strict';

var casper = require('casper').create({
  pageSettings: {
    webSecurityEnabled: false
  }
  , viewportSize: {
    width: 1980
    , height: 1080
  }
  //    , verbose: true
  //    , logLevel: "info"
});
var x = require('casper').selectXPath;
var mouse = require("mouse").create(casper);

casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.72 Safari/537.36');
casper.start(casper.cli.get(0), function () {
  var lululemon_item = {
    title: ""
    , partnumber: ""
    , original_price: ""
    , sales_price: ""
    , skus: []
      //        {
      //            color: ""
      //            , sizes: []
      //        }
    , description: ""
    , description_detail: []
      //{
      //            head: "",
      //            desc: "",
      //            lists: []
      //}
    , imageUrls: []
  };

  if (!this.exists('#pdp-form')) {
    this.echo('error');
    casper.exit();
    casper.bypass(50);
  }; //make sure if it's the correct webpage, even though return the status(200)


  for (var n = 1; n < 20; n++) {
    casper.thenClick('#pdp-form > section.section-color-swatch > div.color-swatch.show-one-hook.closed > div > div > span:nth-child(' + n + ') > a', function (l) {
      casper.wait(3000, function () {
//        $('#select-size').val('2');
        if (lululemon_item.skus.length == 0) {
          //get the name of the title
          var $title = this.evaluate(function () {
            return document.querySelector('#pdp-product-attributes > div > div > div > div > div > div > div.product-description.duplicated > h1').textContent.trim();
          });
          lululemon_item.title = $title;
          //get the "why we made this" - description
          var $description = this.evaluate(function () {
            return document.querySelector('#pdp-why-we-made-it > div.dotdotdot > div').textContent.trim();
          });
          lululemon_item.description = $description;
          //get the partnumber = "n/a"
          lululemon_item.partnumber = 'N/A';
          // get the description detail
          var $description_detail_heads = this.evaluate(function () {
            return Array.prototype.map.call(document.querySelectorAll('#fabric > h4'), function (e) {
              return e.textContent.trim();
            });
          });
          var $description_detail_descs = this.evaluate(function () {
            return Array.prototype.map.call(document.querySelectorAll('#fabric > p'), function (e) {
              return e.textContent.trim();
            })
          })
          var $description_detail_lists_array = [];
          for (var i = 3; i < 30; i = i + 3) {
            $description_detail_lists_array.push(this.evaluate(function (n) {
              return Array.prototype.map.call(document.querySelectorAll('#fabric > ul:nth-child(' + n + ') > li'), function (e) {
                return e.textContent.trim();
              });
            }, {
              n: i
            }));
          };
          for (var i = 0; i < $description_detail_heads.length; i++) {
            lululemon_item.description_detail.push({
              head: $description_detail_heads[i]
              , desc: $description_detail_descs[i]
              , list: $description_detail_lists_array[i]
            });
          };
        };
        //get the original_price and sales_price
        var $original_price = this.evaluate(function () {
          return document.querySelector('#pdp-product-attributes > div > div > div > div > div > div > div.product-description.duplicated > div.price-fixed').textContent.trim();
        });
        var $sales_price = this.evaluate(function () {
//          $('#select-size option').eq(1).prop('selected',true)
          return document.querySelector('#pdp-product-attributes > div > div > div > div > div > div > div.product-description.duplicated > div.price-markdown > div.price-sale').textContent.trim();
        });
        //get the number of colors
        var color_number = this.evaluate(function () {
          return document.querySelector('#pdp-form > section.section-color-swatch > div.sub-section-heading > span').textContent.trim();
        });
        //get the color name
        var $color = this.evaluate(function () {
          return document.querySelector('#pdp-form > section.section-color-swatch > div.selected-color-wrapper > span').textContent.trim();
        });
        //get the sizes under the one color
        var $sizes = this.evaluate(function () {
          return Array.prototype.map.call(document.querySelectorAll('#select-size > option'), function (e) {
            return e.textContent.trim();
          });
        });
        $sizes = $sizes.slice(1);
        //get the image urls
        var $imageUrls = this.evaluate(function () {
          return Array.prototype.map.call(document.querySelectorAll('#pdp-media-section > section > div > ul > li > a > picture > img'), function (e) {
            return e.getAttribute('srcset');
          });
        });
        var $width = 'N/A';
        lululemon_item.skus.push({
          original_price: $original_price,
          sales_price: $sales_price,
          color: $color,
          sizes: $sizes,
          width: $width
        });
        lululemon_item.imageUrls.push({
          color: $color
          , imageUrls: $imageUrls
        });
        color_number = parseInt(color_number);
        if (color_number > 9) {
          color_number = 9
        };
        //because if the number of the pictures is more than 9, there is one icon link for the expansion instead of the color link.
        if (lululemon_item.skus.length == color_number) {
          this.echo(JSON.stringify(lululemon_item))
        };
      });
    });
  };
});
casper.run();
