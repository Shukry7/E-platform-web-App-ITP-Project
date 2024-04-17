const EmployeeAttendance = require("../Models/AttendenceModel");
const HttpError = require("../Models/http-error.js");
const uuid = require("uuid");


const markAttendance = async (req, res) => {
  console.log(req.body)


    try {
      const employee = await EmployeeAttendance.insertMany(req.body);
      console.log(employee)
      return res.status(201).send(employee);
    } catch (error) {
      console.error('Error marking attendance:', error);
      res.status(500).send('Failed to mark attendance');
    }

};

const listAttendance = async (req, res) => {
  try {
    const attendance = await EmployeeAttendance.find({});
    console.log(attendance)
    return res.status(200).json(attendance);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.markAttendance = markAttendance;
exports.listAttendance = listAttendance;

