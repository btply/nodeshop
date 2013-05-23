// Require needed modules
var db = require('../data'),
config = require('../config.json');

// Export functions
module.exports = {

    // Get shop home page
    getHome: function(req, res) {
        
        // Get categories for top nav
        db.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
            
            // Get featured products
            db.getFeatured(function(err, featured) { 
                if (err) {console.log(err)}
                
                // Render home page
                res.render('home', {
                    store: config.store.name,
                    title: config.store.tagline,
                    logged: req.isAuthenticated(),
                    user: req.user,
                    cart: req.session.cart,
                    categories: categories,
                    featured: featured
                });
            });
        });
    },

    // Get about page
    getAbout: function(req, res) {
        db.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
            res.render('about', {
                store: config.store.name,
                title: 'About',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
                categories: categories,
            });
        });
    },
    
    // Get contact page
    getContact: function(req, res) {
        db.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
            res.render('contact', {
                store: config.store.name,
                title: 'Contact',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
                categories: categories,
            });
        });
    },
    
    // Get terms and conditions modal
    getTermsModal: function(req, res) {
        res.render('modals/terms');
    }

};