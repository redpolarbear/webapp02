var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});

//router.get('/*', function(req, res) {
//  res.redirect('/');
//})

module.exports = router;
