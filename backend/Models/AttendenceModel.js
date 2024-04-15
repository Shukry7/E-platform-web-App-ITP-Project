const mongoose = require('mongoose');

const EmployeeAttendanceSchema = mongoose.Schema({
  employeeID: {
    type: String,
      required:true,
      trim: true,
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