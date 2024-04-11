const express = require("express");
const ProductControllers = require("../Controllers/product-controllers");
const Router = express.Router();
const fileupload = require('../middleware/file-upload')


Router.post("/new",fileupload.single('image'), ProductControllers.createProduct);
Router.get("/", ProductControllers.listProduct);
Router.delete("/:id", ProductControllers.DeleteProduct);
Router.get("/update/:id", ProductControllers.listProductById);
Router.put("/update/:id", ProductControllers.UpdateProduct);


module.exports = Router;
