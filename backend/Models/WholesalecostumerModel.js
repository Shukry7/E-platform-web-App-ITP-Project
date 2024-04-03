const mongoose = require("mongoose");

const WholesalecostumerSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter Costumer ID"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please Enter Costumer Name"],
      trim: true,
    },
    telephone: {
      type: Number,
      required: [true, "Please Enter telephone No"],
      trim:true,
    },
    address: {
      type: String,
      required: [true, "Please Enter Address"],
      trim: true,
    },
    email: {
        type: String,
        default: 0,
      },
    creditlimit: {
      type: Number,
      default: 0,
    },
   
  },
  {
    timestamps: true,
  }
);

const wholesalecostumer = mongoose.model("Wholesalecostumer",WholesalecostumerSchema);
module.exports = wholesalecostumer;
