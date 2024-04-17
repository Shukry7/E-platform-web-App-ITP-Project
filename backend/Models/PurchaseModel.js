const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter a ID"],
      trim: true,
    },
    total: {
      type: Number,
      required: [true],
    },
    paidAmount: {
      type: Number,
      required: [true],
    },
    date: {
      type: Date,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

const purchase = mongoose.model("Purchase",purchaseSchema);
module.exports = purchase;