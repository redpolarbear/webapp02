'use strict';

var scrapingController = require('../api/scraping/scrapingController');
var weidianController = require('../api/weidian/weidianController');
var weidianTokenController = require('../api/weidian/weidianTokenController');
var collectionController = require('../api/collection/collectionController');
var orderController = require('../api/order/orderController');
var config = require('../config/index');
var auth = require('../auth/auth.middleware');

var express = require('express');
var expressJWT = require('express-jwt');

var router = express.Router();


//Note: router.use(expressJWT({ secret: config.secret}));
router.use(auth.isLoggedin());
router.post('/scrape', scrapingController.scrapeItem);
router.post('/save', scrapingController.saveItem);
router.post('/urlvalidation', scrapingController.verifyUrl);

router.post('/uploadimage', weidianController.uploadImage);
router.post('/uploadproduct', weidianController.uploadProduct);
router.post('/saveorder', weidianController.saveOrder);
router.post('/appendimage', weidianController.appendImage);

router.get('/collection/:creator', auth.isParamsLegal, collectionController.getUserCollection);
router.post('/collection/action/save', collectionController.saveToCollection);
router.delete('/collection/action/remove/:id', collectionController.removeFromCollection);


router.get('/gettoken', weidianTokenController.returnToken);

module.exports = router;
