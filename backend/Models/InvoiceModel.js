const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceId:{
    type: String, 
    required: true
  },
  userId: {
    type: String, 
    default: null,
  },
  CartItems:[
    {
    productId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    }
  ],
  date: {
    type: Date,
    required: true,
  },
  
},
{
  timestamps: true,
}
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;