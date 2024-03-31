const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter Employee ID"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please Enter a Name"],
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
    type: {
      type: String,
      default: 0,
    },
    hourlyWage: {
      type: Number,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const employee = mongoose.model("Employee",EmployeeSchema);
module.exports = employee;
