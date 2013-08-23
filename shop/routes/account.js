var db = require('../data');
var config = require('../config.json');
var passport = require('passport');

module.exports = {
    
    // Handle posted register form
    postRegister: function(req, res) {
    
        // Save user in database
        db.saveUser({
                fname : req.param('name.first'),
                lname : req.param('name.last'),
                email : req.param('email'),
                password : req.param('password')
            }, 
             
            function(err, newUser) {
                if (err) {console.log(err);}
                
                // Set user to user just saved
                req.user = newUser;
                
                // Log in new user with passport
                passport.authenticate('local')(req, res, function () {
                    
                    // Redirect new user to order page
                    res.redirect('/account/registered');
                
                });  
        });
    },
    
    // Get registered page
    getRegistered: function(req, res) {
        
        // Get categories for top nav
        db.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
            
            // Render registered page
            res.render('account/registered', {
                store: config.store.name,
                title: 'Thanks for registering!',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
                categories: categories,
            });
        });
    },

    // Get account page
    getAccount: function(req, res) {
        
        // Get categories for top nav
        db.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
            
            // Render account page
            res.render('account/account', {
                store: config.store.name,
                title: 'My Account',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
                categories: categories,
            });
        });
    },

    // Log user out when account/logout requested
    getLogout: function(req, res){
    
        // Passport logout function
        req.logout();
        
        // Redirect to home page
        res.redirect('/');
    
    },
};