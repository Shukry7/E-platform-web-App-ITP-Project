const express = require("express");
const ProfitControllers = require("../Controllers/profit-controllers");
const Router = express.Router();

Router.get("/cost", ProfitControllers.listCost);


module.exports = Router;