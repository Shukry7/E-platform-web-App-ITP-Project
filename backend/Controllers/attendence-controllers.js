const EmployeeAttendance = require("../Models/AttendenceModel");
const HttpError = require("../Models/http-error.js");
const uuid = require("uuid");
const markAttendance = async (req, res) => {
  try {
    const { employeeID, status } = req.body;
    const newAttendance = new EmployeeAttendance({
      employeeID,
      status,
    });
    await newAttendance.save();
    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const attendance = await EmployeeAttendance.find({ date }).populate(
      "employeeID",
      "name"
    );
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.markAttendance = markAttendance;
exports.getAttendanceByDate = getAttendanceByDate;

