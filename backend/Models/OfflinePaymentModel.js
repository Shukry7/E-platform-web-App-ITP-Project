const mongoose = require('mongoose');


const offpay = mongoose.Schema(
  {
    UID: {
      type: String,
      trim: true,
    },
    
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const image = mongoose.model("Offline_Payment",offpay);
module.exports = image;




