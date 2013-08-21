// Require routes

var main = require('./routes/main');
var products = require('./routes/products');

// Function to only allow acess if authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    // Redirect if not authenticated
    res.redirect('/account/login');
}

// Export routes
module.exports = function(a, p) {

    // Main routes
    a.get('/', main.getHome);
    
    // Products
    a.get('/products', products.getHome);
    a.get('/products/:id', products.getByID);
    
};