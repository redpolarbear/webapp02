var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});

router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/collection/matthewxu', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

//router.get('/*', function(req, res) {
//  res.redirect('/');
//})

module.exports = router;
