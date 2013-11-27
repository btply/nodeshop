// Require needed modules
config = require('../../shop/config.json');

// Export functions
module.exports = {

    // Get customers home page
    getHome: function(req, res) {
        
    // Render home page
    res.render('customers/home', {
        store: config.store.name,
        title: 'Customers',
        logged: req.isAuthenticated(),
        user: req.user
    });
    },
};