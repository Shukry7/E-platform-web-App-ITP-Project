const mongoose = require('mongoose');

const EmployeeAttendanceSchema = mongoose.Schema({
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Reference to the Employee model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
});

const EmployeeAttendance = mongoose.model("EmployeeAttendance",EmployeeAttendanceSchema);

module.exports = EmployeeAttendance;