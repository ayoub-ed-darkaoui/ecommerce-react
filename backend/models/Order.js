const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  items: { type: Array, required: true },
  total: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
