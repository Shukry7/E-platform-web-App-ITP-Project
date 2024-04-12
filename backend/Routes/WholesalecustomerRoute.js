const express = require("express");
const Wholesalecustomer = require("../Controllers/wholesalecustomer-controllers");
const Router = express.Router();

Router.post("/new", WholesalecustomerControllers.createWholesalecustomer);
Router.get("/", WholesalecustomerControllers.listWholesalecustomer);
Router.delete("/:id", WholesalecustomerControllers.DeleteWholesalecustomer);
Router.get("/update/:id", WholesalecustomerControllers.listWholesalecustomerById);
Router.put("/update/:id", WholesalecustomerControllers.UpdateWholesalecustomer);


module.exports = Router;
