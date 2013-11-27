// Require needed modules
var Product = require('../../schemas/product');
var config = require('../../shop/config.json');

// Export functions
module.exports = {

    // Get shop home page
    getHome: function(req, res) {
        
      Product.find({}, function(err, products) {
        
        
        // Render home page
        res.render('products/home', {
            store: config.store.name,
            title: 'Products',
            logged: req.isAuthenticated(),
            user: req.user,
            products: products
        });
      });
    },
    
    // Get product by ID
    getByID: function(req, res) {
        
      Product.findOne({_id : req.params.id}, function(err, product) {
        
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
    
    // Get new product view
    getNew: function(req, res) {
        
        
        // Render home page
        res.render('products/product', {
            store: config.store.name,
            title: 'New Product',
            logged: req.isAuthenticated(),
            user: req.user,
            product: {
                name : "New Product",
                pricing : {
                    retail : "0.00"
                    },
                shipping : {
                    weight : "0.00"
                    }
                }
            
        });
        
    },
    
    // Handle posted product
    Save: function(req, res) {
        
        // Check if posted product id exists in db
        Product.findOne({_id : req.params.id}, function (err, product){
            
            if (!product) {
                
                // Build new product if not
                var newProduct = new Product ({
                        name: req.body.name,
                        make: req.body.make,
                        model: req.body.model,
                        category: req.body.category,
                        seo: req.body.seo,
                        pricing: {
                            retail: req.body.retail,
                            sale: req.body.sale,
                            cost: req.body.cost
                        },
                    });
                    
                newProduct.save(function(err){
                    
                    if (err) {throw err;}
                    
                    // Redirect back to categories
                    res.redirect('/products');
                });
                
            } else {
                
                // Update found product
                product.name = req.body.name;
                product.make = req.body.make;
                product.model = req.body.model;
                product.category = req.body.category;
                product.seo = req.body.seo;
                product.pricing.retail = req.body.retail;
                product.pricing.sale = req.body.sale;
                product.pricing.cost = req.body.cost;
                
                product.save(function(err) {
                    
                    if (err) {throw err;}
                    
                    // Redirect back to categories
                    res.redirect('/products');
                });
            }        
        });
    },
    
    // A quick n dirty remove function
    Remove: function(req, res) {
        Product.findOne({_id : req.params.id}).remove(function(){res.send()});
    }
};