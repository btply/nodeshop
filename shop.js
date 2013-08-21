// Require express
var express = require('express');
// Set up express
var app = express();
// Require mongostore session storage
var mongoStore = require('connect-mongo')(express);
var passport = require('passport');
// Require needed files
var database = require('./shop/data');
var config = require('./shop/config.json');
var info = require('./package.json');

console.log('NodeShop Started!');

// Connect to database
database.startup(config.connection);
console.log('Connecting to database...');
  
// Configure Express
app.configure(function(){
    
    // Set up jade
    app.set('views', __dirname + '/shop/views');
    app.set('view engine', 'jade');
    
    app.use(express.favicon());
    app.use(express.cookieParser());
    app.use(express.bodyParser());

    // Set up sessions
    app.use(express.session({
        // Set up MongoDB session storage
        store: new mongoStore({url:config.connection}),
        // Set session to expire after 21 days
        cookie: { maxAge: new Date(Date.now() + 181440000)},
        // Get session secret from config file
        secret: config.cookie_secret
        }));
    
    // Set up passport
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Define public assets
    app.use(express.static(__dirname + '/shop/public'));
  
});
    
// Require router, passing passport for authenticating pages
require('./shop/router')(app, passport);

// Listen for requests
app.listen(process.env.PORT);

console.log('NodeShop v' + info.version + ' listening on port ' + process.env.PORT);

// Handle all uncaught errors
process.on('uncaughtException', function(err) {
    console.log(err);
});