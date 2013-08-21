var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  sku: { type: String, required: false },
  category: { type: String, required: false },
  name: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  upc: { type: String, required: false },
  seo: { type: String, required: false },
  featured: { type: Boolean, required: false },
  date: { type: Date, default: Date.now },

  shipping: {
    weight: { type: Number, required: false },
    dimensions: {
      width: { type: Number, required: false },
      height: { type: Number, required: false },
      depth: { type: Number, required: false }
    },
  },

  pricing: {
    list: { type: Number, required: false },
    retail: { type: Number, required: true },
    pct_savings: { type: Number, required: false }
  },

  details: {
    description: { type: String, required: false },
    artist: { type: String, required: false },
    genre: { type: String, required: false },
  },
});

module.exports = mongoose.model('Product', ProductSchema);