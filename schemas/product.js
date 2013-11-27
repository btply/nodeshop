// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define product schema
var ProductSchema = new Schema({
    
  name: { type: String, required: true },
  make: { type: String},
  model: { type: String},
  category: { type: String},
  seo: { type: String},
  sku: { type: String},
  upc: { type: String},
  featured: { type: Boolean},
  date: { type: Date, default: Date.now },
  
  pricing: {
    retail: { type: Number, required: true },
    sale: { type: Number},
    cost: { type: Number},
  },

  details: {
    description: { type: String},
    attributes: [{ type: String}]
  },
  
  image: [{ type: String}]
  
});

// Export product model
module.exports = mongoose.model('Product', ProductSchema);