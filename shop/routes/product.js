// Require needed modules
var db = require('../data');
var config = require("../config.json");

// Export functions
module.exports = {

    // Show a product from url request
    getBySEO: function(req, res) {
        
        // Get categories for top nav
        db.getTopCategories(function(err, categories) { 
            if (err) {console.log(err)}
        
            // Fing requested product
            db.findProductBySEO(req.params.seo, function(err, product) { 
                if (err) {console.log(err)}
            
                // Render product view
                res.render('product', {
                    store: config.store.name,
                    title: product.name,
                    logged: req.isAuthenticated(),
                    user: req.user,
                    cart: req.session.cart,
                    categories: categories,
                    product: product
                });
            });
        });
    }
};