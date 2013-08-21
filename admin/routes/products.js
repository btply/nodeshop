// Require needed modules
var db = require('../data'),
config = require('../../shop/config.json');

// Export functions
module.exports = {

    // Get shop home page
    getHome: function(req, res) {
        
      db.getAll(function(err, products) {
        
        
        // Render home page
        res.render('products/home', {
            store: config.store.name,
            title: config.store.tagline,
            logged: req.isAuthenticated(),
            user: req.user,
            products: products
        });
      });
    },
    
    // Get product by ID
    getByID: function(req, res) {
        
      db.findProductByID(req.params.id, function(err, product) {
        
        
        // Render home page
        res.render('products/product', {
            store: config.store.name,
            title: config.store.tagline,
            logged: req.isAuthenticated(),
            user: req.user,
            product: product
        });
      });
    },
};