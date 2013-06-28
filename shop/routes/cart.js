// Require needed modules
var db = require('../data');
var _ = require('underscore');

// Export functions
module.exports = {

    // Add product to cart
    addProduct: function(req, res) {
        try {
        // Get product from database for given id
        db.findProductByID(req.params.id, function(err, product) { 
            if (err) {console.log(err)}
            
            // Initalise cart
            if (!req.session.cart) { 
                req.session.cart = {
                    products: {},
                    count: 0,
                    total: 0
                };
            }
            
            // Check if product already in cart
            if (!req.session.cart.products[req.params.id]) {
            
                // Add product if not
                req.session.cart.products[req.params.id] = {
                    id: product.id,
                    name: product.name,
                    price: product.pricing.retail,
                    seo: product.seo,
                    quantity: 1  
                };
            
            } else {
            
                // Increment count if already added
                req.session.cart.products[req.params.id].quantity = req.session.cart.products[req.params.id].quantity + 1;
            }
            
            // Total cart
            req.session.cart.count = 0;
            req.session.cart.total = 0;
            _.each(req.session.cart.products, function (product) {
                req.session.cart.count = req.session.cart.count + product.quantity;
                req.session.cart.total = req.session.cart.total + (product.price * product.quantity);
            });
            
            // Respond with rendered cart
            res.render('cart/cart', {cart: req.session.cart});
        
        });
        } catch(err) {
            console.log(err);
        }
    },
    
    // Remove product from cart
    remProduct: function(req, res) {
            
            // Check item count
            if (req.session.cart.products[req.params.id].quantity > 1) {
            
                // Reduce count if already added
                req.session.cart.products[req.params.id].quantity = req.session.cart.products[req.params.id].quantity - 1;
                
            } else {
                
                // Remove product 
                delete req.session.cart.products[req.params.id];
                
            }
            
            // Total cart
            req.session.cart.count = 0;
            req.session.cart.total = 0;
            _.each(req.session.cart.products, function (product) {
                req.session.cart.count = req.session.cart.count + product.quantity;
                req.session.cart.total = req.session.cart.total + (product.price * product.quantity);
            });
            
            // Remove cart if empty
            if (req.session.cart.count === 0) {
                delete req.session.cart;
                res.render('cart', {cart: undefined});
            } 
            
            // Respond with rendered cart
            res.render('cart/cart', {cart: req.session.cart});

    },
};