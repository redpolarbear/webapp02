'use strict';

// var controller = require('./look.controller');
var scrapingController = require('../api/scraping/scrapingController');
var weidianController = require('../api/weidian/weidianController');
var weidianTokenController = require('../api/weidian/weidianTokenController');
var collectionController = require('../api/collection/collectionController');
var orderController = require('../api/order/orderController');
var auth = require('../auth/auth.middleware');

var express = require('express');

var router = express.Router();

router.post('/scrape', auth.isLoggedin(), scrapingController.scrapeItem);
router.post('/save', scrapingController.saveItem);
router.post('/urlvalidation', scrapingController.verifyUrl);

router.post('/uploadimage', weidianController.uploadImage);
router.post('/uploadproduct', weidianController.uploadProduct);
router.post('/saveorder', weidianController.saveOrder);

router.get('/collection/:creator', collectionController.getUserCollection);
router.post('/collection/action/save', collectionController.saveToCollection);

router.get('/gettoken', weidianTokenController.returnToken);

module.exports = router;