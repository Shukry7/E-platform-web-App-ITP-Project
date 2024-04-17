const EmployeeAttendance = require("../Models/AttendenceModel");
const HttpError = require("../Models/http-error.js");
const uuid = require("uuid");


const markAttendance = async (req, res) => {
  console.log(req.body);

  try {
    // Insert attendance records into the database
    const insertedAttendance = await EmployeeAttendance.insertMany(req.body);

    // Retrieve the employee details for each attendance record
    const populatedAttendance = await Promise.all(
      insertedAttendance.map(async (attendance) => {
        // Retrieve employee details using the ObjectId reference
        const employee = await Employee.findById(attendance.employee);

        // Replace the ObjectId reference with the actual employee object
        return {
          ...attendance.toObject(),
          employee: employee.toObject(), // Convert to plain JavaScript object
        };
      })
    );

    console.log(populatedAttendance);
    return res.status(201).send(populatedAttendance);
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

