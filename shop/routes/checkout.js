var db = require("../data");
var config = require("../config.json");

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
        
        // Validation
    
        // Save user in database
        db.saveUser({
                fname : req.param('name.first'),
                lname : req.param('name.last'),
                email : req.param('email'),
                password : req.param('password')
            }, 
            
            function(err) {
                res.redirect('/checkout/shipping');
        });
    },
};