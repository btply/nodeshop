// Require routes

var main = require('./routes/main');
var orders = require('./routes/orders');
// var customers = require('./routes/customers');
// var reports = require('./routes/reports');
var products = require('./routes/products');
var categories = require('./routes/categories');

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
    
    // Orders
    a.get('/orders', orders.getHome);
    
    /*
    //Customers
    a.get('/customers', customers.getHome);
    a.get('/customers/new', customers.getNew);
    a.get('/customers/:id', customers.getByID);
    a.post('/customers/:id', customers.Save);
    
    //Reports
    a.get('/reports', reports.getHome);
    */
    
    // Products
    a.get('/products', products.getHome);
    a.get('/products/new', products.getNew);
    a.get('/products/:id', products.getByID);
    a.post('/products/:id', products.Save);
    a.post('/products/:id/remove', products.Remove);
    
    // Categories
    a.get('/categories', categories.getHome);
    a.get('/categories/new', categories.getNew);
    a.get('/categories/:id', categories.getByID);
    a.post('/categories/:id', categories.Save);
    a.post('/categories/:id/remove', categories.Remove);
    
    //Banners
};