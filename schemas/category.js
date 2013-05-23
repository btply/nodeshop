var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: { type: String, required: true },
    seo: { type: String, required: true },
    topnav: { type: Boolean, required: false, default: true }});
  
module.exports = mongoose.model('Category', CategorySchema);