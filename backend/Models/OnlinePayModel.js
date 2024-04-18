const mongoose = require('mongoose');

const OnlinePay = mongoose.Schema(
  {
    uid: {
      type: String,
      required: [true, "Please Enter a ID"],
      trim: true,
    },
    id: {
      type: String,
      required: [true, "Please Enter a Name"],
      trim: true,
    },
    firstname: {
      type: String,
      required: [true, "Please Enter a firstname"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Please Enter a lastname"],
    },
    cvv: {
      type: String,
      required: [true, "Please Enter a cvv"],
    },
    category: {
      type: String,
      required: [true, "Please Enter a category"],
      trim: true,
    },
    expiredate: {
      type: String,
      required: [true, "Please Enter a expiredate"],
    },
    number: {
      type: String,
      required: false,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Online', OnlinePay);