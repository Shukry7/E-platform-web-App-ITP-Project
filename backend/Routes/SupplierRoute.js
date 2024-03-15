const express = require("express");
const SupplierControllers = require("../Controllers/supplier-controllers");
const Router = express.Router();

Router.post("/new", SupplierControllers.createSupplier);
Router.get("/", ProductControllers.listProduct);
Router.delete("/:id", ProductControllers.DeleteProduct);
Router.get("/update/:id", ProductControllers.listProductById);
Router.put("/update/:id", ProductControllers.UpdateProduct);


module.exports = Router;
