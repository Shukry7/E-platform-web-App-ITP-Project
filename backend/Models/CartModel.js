const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  
    product: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1.']
    },
    price: {
      type: Number,
      required: true
    }
  
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
