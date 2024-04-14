const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  empID: {
    type: String,
    required: true,
  },
  empName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);