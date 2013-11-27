// Require needed modules
var db = require('../data'),
config = require('../../shop/config.json');

// Export functions
module.exports = {

    // Get reports home page
    getHome: function(req, res) {
        
    // Render home page
    res.render('reports/home', {
        store: config.store.name,
        title: 'Reports',
        logged: req.isAuthenticated(),
        user: req.user
    });
    },
};