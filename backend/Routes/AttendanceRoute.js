const express = require("express");
const AttendanceControllers = require("../Controllers/attendance-controllers");
const Router = express.Router();

Router.post("/mark", AttendanceControllers.markAttendance);

module.exports = Router;