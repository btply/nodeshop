// Require needed modules
var Category = require("../../schemas/category");
var config = require('../../shop/config.json');

// Export functions
module.exports = {

    // Get category home page
    getHome: function(req, res) {
        
      Category.find({}, function(err, categories) {
        
        // Render home page
        res.render('categories/home', {
            store: config.store.name,
            title: 'Categories',
            logged: req.isAuthenticated(),
            user: req.user,
            categories: categories
        });
      });
    },
    
    // Get product by ID
    getByID: function(req, res) {
        
      Category.findOne({_id : req.params.id}, function(err, category) {
        
        // Render category page
        res.render('categories/category', {
            store: config.store.name,
            title: 'Editing ' + category.name,
            logged: req.isAuthenticated(),
            user: req.user,
            category: category
        });
      });
    },
    
    // Get new product view
    getNew: function(req, res) {
        
        
        // Render home page
        res.render('categories/category', {
            store: config.store.name,
            title: 'New Category',
            logged: req.isAuthenticated(),
            user: req.user,
            category: {
                _id : "new",
                name : "New Category",
                seo : "new-category",
                topnav : true
                }
            
        });
        
    },
    
        // Handle posted category
    Save: function(req, res) {
        
        Category.findOne({_id : req.params.id}, function (err, category){
            
            if (!category) {
                
                var newCategory = new Category ({
                        name: req.body.name,
                        seo: req.body.seo,
                        topnav: (req.body.topnav==="on")
                    });
            
                newCategory.save(function(err){
                    if (err) {throw err;}
                    
                    // Redirect back to categories
                    res.redirect('/categories');
                });
                
            } else {
                
                category.name = req.body.name;
                category.seo = req.body.seo;
                category.topnav = (req.body.topnav==="on");
                category.save(function(err) {
                    
                    if (err) {throw err;}
                    
                    // Redirect back to categories
                    res.redirect('/categories');
                });
            }        
        });
    },
    
    // A quick n dirty remove function
    Remove: function(req, res) {
        Category.findOne({_id : req.params.id}).remove(function(){res.send()});
    }
};