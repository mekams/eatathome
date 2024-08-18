const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now }, // Order date
  totalItems: { type: Number, default: 0 }, // Total number of items in the order
  totalPrice: { type: Number, default: 0 }  // Total price of the order
});

module.exports = mongoose.model('Order', orderSchema);


