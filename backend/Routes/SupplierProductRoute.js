const express = require("express");
const SupplierProductControllers = require("../Controllers/SupplierProduct-controller");
const Router = express.Router();

Router.post("/", SupplierProductControllers.createSupplierProduct);
Router.delete("/:id", SupplierProductControllers.DeleteSupplierProduct);
Router.get("/", SupplierProductControllers.listSupplierProduct);
Router.get("/:id", SupplierProductControllers.listSupplierProductById);
Router.get("/supplier/:id", SupplierProductControllers.listProductBySupplierId);
Router.get("/product/:id", SupplierProductControllers.listSupplierByProductId);
Router.put("/:id", SupplierProductControllers.UpdateSupplierProduct);
Router.put("/updatePrice/:id", SupplierProductControllers.UpdateSupplierProductPrice);


module.exports = Router;