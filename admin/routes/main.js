// Require needed modules
var config = require('../../shop/config.json');

// Export functions
module.exports = {

    // Get dashboard
    getHome: function(req, res) {
        
                
        // Render dash
        res.render('main/home', {
            store: config.store.name,
            title: 'Dash',
            logged: req.isAuthenticated(),
            user: req.user,
        });
    },
};