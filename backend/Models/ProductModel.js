const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter a ID"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please Enter a Name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please Enter a Category"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please Enter a Quantity"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Please Enter a Price"],
      trim: true,
    },
    weight: {
      type: String,
      required: [true, "Please Enter a Weight"],
      trim: true,
    },
    description: {
      type: String,
      required: false,
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

const product = mongoose.model("Product",productSchema);
module.exports = product;
