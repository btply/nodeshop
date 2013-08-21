// Require needed modules
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Require data models
var User = require('../schemas/user');
var Product = require('../schemas/product');
var Category = require("../schemas/category");

// Passport methods
passport.use(new LocalStrategy({usernameField: 'email'},function(email, password, done) {User.authenticate(email, password, function(err, user) {return done(err, user)})}));
passport.serializeUser(function(user, done) {done(null, user.id)});
passport.deserializeUser(function(id, done) {User.findById(id, function (err, user) {done(err, user)})});

// Export functions
module.exports = {

    // Connect to database
    startup: function(dbToUse) {
        
        // Connect mongoose and select db
        mongoose.connect(dbToUse);
        
        // Add listener for opened connection
        mongoose.connection.on('open', function() {
            console.log('Connected to database!');
        });
    },
    
    
    // Get all products
    getAll: function(callback) {
      
        var query = Product.find({});
        query.exec(function(err, products) {
           
           callback(err, products);
        });
      
    },
  
    // Get featured products
    getFeatured: function(callback) {
        
        // Find products where featured is true
        var query = Product.find({featured : true});
        query.exec(function(err, featuredProducts) { 
            
            // Execute callback
            callback(null, featuredProducts);
        });
    },
  
  
    // Find product for ID
    findProductByID: function(id, callback) {
        
        // Find product where _id matches given ID
        var query = Product.findOne({_id : id});
        query.exec(function(err, product) {  
            
            // Execute callback passed from route
            callback(null, product);
        });
    },


    // Close DB connection
    closeDB: function() {
        mongoose.disconnect();
    }
};