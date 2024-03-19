const express = require("express");
const EmployeeControllers = require("../Controllers/employee-controllers");
const Router = express.Router();

Router.post("/new", EmployeeControllers.createEmployee);
Router.get("/", EmployeeControllers.listEmployee);
Router.delete("/:id", EmployeeControllers.DeleteEmployee);
Router.get("/update/:id", EmployeeControllers.listEmployeeById);
Router.put("/update/:id", EmployeeControllers.UpdateEmployee);


module.exports = Router;
