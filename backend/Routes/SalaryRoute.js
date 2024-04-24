const express = require("express");
const Salarycontrollers = require("../Controllers/salary-controllers");
const Router = express.Router();

Router.post("/salaryform", Salarycontrollers.createSalary);
Router.get("/salaryform",Salarycontrollers.listSalary );

module.exports = Router;
