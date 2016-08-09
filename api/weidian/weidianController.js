'use strict';

var request = require('request');
var fs = require('fs');
var tokenCtrl = require('./weidianTokenController');
var scrapedItem = require('../scraping/model/scraping.model');
var weidianProduct = require('./model/weidian.product.model');
var orderItem = require('../order/model/order.model');
var collectionItem = require('../collection/model/collection.model');

exports.uploadImage = function (req, res) {
  var weidianAPI_url = 'http://api.vdian.com/media/upload';
  var access_token = req.body.access_token;
  var uploadImgFile = 'public/' + req.body.img;
  var formdata = {
    media: fs.createReadStream(uploadImgFile)
    , access_token: access_token
  , };
  request.post({
    url: weidianAPI_url
    , formData: formdata
  }, function (err, httpResponse, body) {
    if (err) {
      res.send('error');
    } else {
      res.json(body);
    };
  });
};

exports.appendImage = function(req, res) {
  var weidianAPI_url = 'https://api.vdian.com/api?';
  var param = {
    itemid: req.body.itemid,
    imgs: req.body.imgs
  };
  var public_param = {
    method: 'vdian.item.image.add',
    access_token: req.body.access_token,
    version: '1.0',
    format: 'json'
  };
  var requestUrl = weidianAPI_url + 'param=' + JSON.stringify(param) + '&public=' + JSON.stringify(public_param);
//  console.log(requestUrl);
  request.get(requestUrl, function(err, response, body) {
    if (err) {
      res.send('error');
    } else {
      res.json(body);
    };
  })
};

exports.uploadProduct = function (req, res) {
  var weidianAPI_url = 'https://api.vdian.com/api';
  var param = {
    price: req.body.price
    , stock: req.body.stock
    , itemName: req.body.itemName
    , bigImgs: req.body.bigImgs
    , titles: req.body.titles
    , cate_id: req.body.cate_id
    , free_delivery: req.body.free_delivery
    , remote_free_delivery: req.body.remote_free_delivery
  };
  var public_params = {
    method: "vdian.item.add"
    , access_token: req.body.access_token
    , version: "1.1"
    , format: "json"
  };
  //weidian API post request
  request.post({
    url: weidianAPI_url
    , form: {
      param: JSON.stringify(param)
      , public: JSON.stringify(public_params)
    }
  }, function (err, response, body) {
    if (err) {
      res.send('error');
    } else {
      res.json(body);
    };
  });
  // request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
};

exports.saveOrder = function (req, res) {
  var newOrderItem = new orderItem();
  newWeidianProduct.item_id = req.body.item_id;
  newWeidianProduct.scrapedItem_id = req.body.scrapedItem_id;
  newWeidianProduct.save(function (err, newWeidianProduct) {
    if (err) {
      res.send('error');
    }
    else {
      res.send(newWeidianProduct);
    };
  });
};


// https://api.vdian.com/api?param={"price":"1.5","stock":"5","itemName":"接口测试商品1","sku":[{"stock":1,"title":"型号1","price":"1"},{"stock":1,"title":"型号2","price":"1.5"}],"bigImgs":["http://wd.geilicdn.com/vshop395640-1390204649-1.jpg","http://wd.geilicdn.com/vshop395640-1390204649-2.jpg"],"titles":["图片1","图片2"],"cate_id":"747864,747860","free_delivery":"1","remote_free_delivery":"1"}&public={"method":"vdian.item.add","access_token":"xxx","version":"1.1","format":"json"}
