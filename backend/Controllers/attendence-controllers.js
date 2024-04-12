const Attendance = require("../Models/AttendanceModel");

const markAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const newAttendance = new Attendance({ employeeId });
    await newAttendance.save();
    res.status(201).send({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { markAttendance };