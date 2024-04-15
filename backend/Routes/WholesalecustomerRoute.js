const express = require("express");
const Wholesalecustomer = require("../Controllers/wholesalecustomer-controllers");
const Router = express.Router();

Router.post("/new", Wholesalecustomer.createWholesalecustomer);
Router.get("/", Wholesalecustomer.listWholesalecustomer);
Router.delete("/:id", Wholesalecustomer.DeleteWholesalecustomer);
Router.get("/update/:id", Wholesalecustomer.listWholesalecustomerById);
Router.put("/update/:id", Wholesalecustomer.UpdateWholesalecustomer);


module.exports = Router;
