var db = require("../data");
var config = require("../config.json");
var request = require('request');

// Export functions
module.exports = {
    
    // Display cart
    getCart: function (req,res) {
                res.render('checkout/cart', {
                store: config.store.name,
                title: 'Your Cart',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
            });
    },
    
    // Guest checkout
    getGuest: function (req,res) {
                res.render('checkout/guest', {
                store: config.store.name,
                title: 'Guest Checkout',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
            });
    },
    
    // Handle posted guest checkout
    postGuest: function(req, res) {
    
        // Save user in database
        db.saveUser({
            fname : req.param('nameFirst'),
            lname : req.param('nameLast'),
            email : req.param('email'),
            password : req.param('password'),
            contactNum : req.param('contactNum'),
            address1: req.param('address1'), 
            address2: req.param('address2'), 
            town: req.param('addressTown'), 
            province: req.param('addressProvince'), 
            pcd: req.param('addressPcd'), 
            country : req.param('addressCountry')
        }, 
            
            function(err) {
                if (err) {console.log(err);}
                
                res.redirect('/checkout/order');
        });
    },

    
    // Order form
    getOrder: function (req,res) {
                res.render('checkout/order', {
                store: config.store.name,
                title: 'Your Order',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
            });
    },
    
    // Handle posted order
    postOrder: function(req, res) {
        
        

    },
};