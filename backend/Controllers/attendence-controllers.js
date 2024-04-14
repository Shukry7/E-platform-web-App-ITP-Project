const EmployeeAttendance = require("../Models/AttendenceModel");
const HttpError = require("../Models/http-error.js");


const markAttendance = async (req, res, next) => {
  try {
    const { empID, empName, date, status } = req.body;

    const newAttendance = {
      empID:empID,
      empName:empName,
      date:date,
      status:status,
    };

    //store attendnace
   const attendance = await EmployeeAttendance.create(newAttendance);
  return res.status(201).send(attendance);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
//list attendance
const listAttendance = async (req, res) => {
  try {
    const attendance = await EmployeeAttendance.find({});
    return res.status(200).json(attendance);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}




const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await EmployeeAttendance.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    return res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.markAttendance = markAttendance;
exports.listAttendance = listAttendance;

