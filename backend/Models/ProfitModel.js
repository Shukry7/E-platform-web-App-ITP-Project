const { mongoose } = require("mongoose")

const profitSchema = mongoose.Schema(
    {
      product: {
        type: String,
        required: [true],
      },
      quantity: {
        type: Number,
        required: [true],
      },
      price: {
        type: Number,
        required: [true],
      },
      profit: {
        type: Number,
        required: [true],
        default: 0,
      },
      date: {
        type: Date,
        required: [true],
      }
    },
    {
      timestamps: true,
    }
  );
  
  const profit = mongoose.model("Cost",profitSchema);
  module.exports = profit;