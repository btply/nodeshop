var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: false, default: 1 }
});

module.exports = mongoose.model('Cart', CartSchema);