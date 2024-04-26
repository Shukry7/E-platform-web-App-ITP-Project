const express = require("express");
const Salarycontrollers = require("../Controllers/salary-controllers");
const Router = express.Router();

Router.post("/new", Salarycontrollers.createSalary);
Router.get("/salaryform",Salarycontrollers.listSalary );

module.exports = Router;
