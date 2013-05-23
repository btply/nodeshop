// Require needed modules
var db = require('../data');
var config = require('../config.json')

// Export functions
module.exports = {

    // Show products in category form url request
    getBySEO: function(req, res) {
    
        // Get categories for top nav
        db.getTopCategories(function(err, categories) { 
            if (err) {console.log(err)}
        
            // Get the products from selected category
            db.getCategoryProducts(req.params.seo, function(err, products, category) { 
                if (err) {console.log(err)}
            
                // Render category view
                res.render('category', {
                    store: config.store.name,
                    title: category,
                    logged: req.isAuthenticated(),
                    user: req.user,
                    cart: req.session.cart,
                    categories: categories,
                    products : products
                });
            });
        });
    }
};