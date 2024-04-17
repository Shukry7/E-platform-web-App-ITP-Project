const EmployeeAttendance = require("../Models/AttendenceModel");
const HttpError = require("../Models/http-error.js");
const uuid = require("uuid");


const markAttendance = async (req, res) => {
  const  {employee} = req.body;
  const Att = employee.map(item => ({
    employee:item.employee,
    date: item.date,
    status : item.status
  }))
  try {

    const Attend = await EmployeeAttendance.insertMany(Att);
    res.status(201).send('Attendance marked successfully');
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).send('Failed to mark attendance');
  }
};

const listAttendance = async (req, res) => {
  try {
    const attendance = await EmployeeAttendance.find({}).populate('employee');
    return res.status(200).json(attendance);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.markAttendance = markAttendance;
exports.listAttendance = listAttendance;

