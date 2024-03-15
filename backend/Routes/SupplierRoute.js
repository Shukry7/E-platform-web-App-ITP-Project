const express = require("express");
const SupplierControllers = require("../Controllers/supplier-controllers");
const Router = express.Router();

Router.post("/", SupplierControllers.createSupplier);
Router.get("/", SupplierControllers.listSupplier);
Router.delete("/:id", SupplierControllers.DeleteSupplier);
Router.get("/:id", SupplierControllers.listSupplierById);
Router.put("/:id", SupplierControllers.UpdateSupplier);


module.exports = Router;
