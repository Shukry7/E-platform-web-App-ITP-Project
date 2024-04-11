const express = require("express");
const SupplierProductControllers = require("../Controllers/SupplierProduct-controller");
const Router = express.Router();
const fileupload = require('../middleware/file-upload')

Router.post("/",fileupload.single('image'), SupplierProductControllers.createSupplierProduct);
Router.delete("/:id", SupplierProductControllers.DeleteSupplierProduct);
Router.get("/:id", SupplierProductControllers.listProductBySupplierId);
Router.get("/product/:id", SupplierProductControllers.listSupplierByProductId);
Router.put("/:id", SupplierProductControllers.UpdateSupplierProduct);


module.exports = Router;