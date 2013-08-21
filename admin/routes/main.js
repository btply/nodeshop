// Require needed modules
var db = require('../data'),
config = require('../../shop/config.json');

// Export functions
module.exports = {

    // Get shop home page
    getHome: function(req, res) {
        
                
        // Render home page
        res.render('main/home', {
            store: config.store.name,
            title: config.store.tagline,
            logged: req.isAuthenticated(),
            user: req.user,
        });
    },
};