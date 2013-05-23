var db = require('../data');
var config = require('../config.json')

module.exports = {

    // Get login modal
    getLoginModal: function(req, res) {
        res.render('modals/login');
    },

    // Get register modal
    getRegisterModal: function(req, res) {
        res.render('modals/register');
    },

    postRegister: function(req, res) {
    
        // Save user in database
        db.saveUser({
                fname : req.param('name.first'),
                lname : req.param('name.last'),
                email : req.param('email'),
                password : req.param('password')
            }, 
            
            function(err,docs) {
                res.redirect('/account/registered');
        });
    },
    
    // Get registered page
    getRegistered: function(req, res) {
        db.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
            res.render('account/registered', {
                store: config.store.name,
                title: 'Thank-you for registering!',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
                categories: categories,
            });
        });
    },

    getAccount: function(req, res) {
        db.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
            res.render('account', {
                store: config.store.name,
                title: 'My Account',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
                categories: categories,
            });
        });
    },

    getLogout: function(req, res){
    
        // Passport logout function
        req.logout();
        
        // Redirect to home page
        res.redirect('/');
    
    }
};