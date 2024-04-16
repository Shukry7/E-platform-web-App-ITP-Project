const EmployeeAttendance = require("../Models/AttendenceModel");
const HttpError = require("../Models/http-error.js");
const uuid = require("uuid");


const markAttendance = async (req, res) => {
  const { date, attendance } = req.body;
  try {
    // Create an array of attendance records to insert into the database
    const attendanceRecords = Object.entries(attendance).map(([employeeID, status]) => ({
      employeeID,
      date,
      status
    }));

    // Use insertMany to insert the records in bulk
    await EmployeeAttendance.insertMany(attendanceRecords);
    res.status(201).send('Attendance marked successfully');
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).send('Failed to mark attendance');
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

