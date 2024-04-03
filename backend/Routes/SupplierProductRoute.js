const express = require("express");
const SupplierProductControllers = require("../Controllers/SupplierProduct-controller");
const Router = express.Router();

Router.post("/", SupplierProductControllers.createSupplierProduct);
Router.delete("/:id", SupplierProductControllers.DeleteSupplierProduct);
Router.get("/:id", SupplierProductControllers.listProductBySupplierId);
Router.put("/:id", SupplierProductControllers.UpdateSupplierProduct);


module.exports = Router;