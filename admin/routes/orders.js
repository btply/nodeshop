// Require needed modules
var config = require('../../shop/config.json');

// Export functions
module.exports = {

    // Get orders home page
    getHome: function(req, res) {
        
    // Render home page
    res.render('orders/home', {
        store: config.store.name,
        title: 'Orders',
        logged: req.isAuthenticated(),
        user: req.user
    });
    },
 
    /*  
    // Get order by ID
    getOrderByID: function(req, res) {
        
      db.findProductByID(req.params.id, function(err, product) {
        
        
        // Render home page
        res.render('products/product', {
            store: config.store.name,
            title: 'Editing ' + product.name,
            logged: req.isAuthenticated(),
            user: req.user,
            product: product
        });
      });
    },
    */
    
};