const express = require("express");
const DeliveryControllers = require("../Controllers/delivery-controllers");
const Router = express.Router();

Router.post("/", DeliveryControllers.createDelivery);
Router.get("/", DeliveryControllers.listDelivery);
Router.delete("/:id", DeliveryControllers.DeleteDelivery);
Router.get("/:id", DeliveryControllers.listDeliveryById);
Router.put("/:id", DeliveryControllers.UpdateDelivery);


module.exports = Router;
