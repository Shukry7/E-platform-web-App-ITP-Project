const express = require("express");
const Wholesalecostumer = require("../Controllers/wholesalecostumer-controllers");
const Router = express.Router();

Router.post("/new", WholesalecostumerControllers.createWholesalecostumer);
Router.get("/", WholesalecostumerControllers.listWholesalecostumer);
Router.delete("/:id", WholesalecostumerControllers.DeleteWholesalecostumer);
Router.get("/update/:id", WholesalecostumerControllers.listWholesalecostumerById);
Router.put("/update/:id", WholesalecostumerControllers.UpdateWholesalecostumer);


module.exports = Router;
