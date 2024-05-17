const express = require("express");
const InvoiceController = require("../Controllers/invoice-controllers")
const Router = express.Router();

Router.post("/new", InvoiceController.createInvoice);

module.exports = Router;