/**
 * Module dependencies
 */
var express  = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var errorHandler   = require('errorhandler');
var morgan   = require('morgan');
var http     = require('http');
var path     = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');


var routes   = require('./routes/index');
var api      = require('./routes/apis');

var app = module.exports = express();

// DB Configuration
mongoose.connect('mongodb://localhost/shopapp-dev');
  /**
   * Configuration
   */
  // all environments
app.set('port', process.env.PORT || 9000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'ilovesarthursfunkyclub' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./config/passport')(passport); // pass passport for configuration

//require('./routes/routes')(app, passport);

app.use('/api', api);
app.use('/', routes);

app.route('/*').get(function (req, res) {
  res.sendFile(path.join(__dirname, 'public') + '/index.html');
});

var env = process.env.NODE_ENV || 'development';
// development only
if (env === 'development') {
  app.use(errorHandler());
}
// production only
/*if (env === 'production') {
   // TODO
}*/
/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
