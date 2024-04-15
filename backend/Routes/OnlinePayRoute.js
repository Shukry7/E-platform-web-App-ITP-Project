const express = require("express");
const CardControllers = require("../Controllers/online_pay-controller");
const Router = express.Router();

Router.post("/onpay/new", CardControllers.OnlinePay);
Router.get("/", CardControllers.listCard);
Router.delete("/:id", CardControllers.DeleteCard);
Router.get("/onpay/list", CardControllers.listCardByUId);

module.exports = Router;