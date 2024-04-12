const fs = require("fs");
const Product = require("../Models/ProductModel");

const createProduct = async (req, res, next) => {
  const { name, category, Alert_quantity, price, weight, description } =
    req.body;

  const latestProduct = await Product.find().sort({ _id: -1 }).limit(1);
  let id;

  if (latestProduct.length !== 0) {
    const latestId = parseInt(latestProduct[0].ID.slice(1));
    id = "P" + String(latestId + 1).padStart(4, "0");
  } else {
    id = "P0001";
  }
  let path = "uploads/images/No-Image-Placeholder.png";
  if (req.file && req.file.path) path = req.file.path;

  const newProduct = {
    ID: id,
    name: name,
    category: category,
    Stock: 0,
    Alert_quantity: Alert_quantity,
    price: price,
    weight: weight,
    description: description,
    image: path,
  };

  const product = await Product.create(newProduct);
  return res.status(201).send(product);
};

const listProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    const path = product.image;
    if (path !== "uploads/images/No-Image-Placeholder.png") {
      fs.unlink(path, (err) => {
        console.log(err);
      });
    }

    const { name, category, weight, description } = req.body;

    let path2 = "uploads/images/No-Image-Placeholder.png";
    if (req.file && req.file.path) path2 = req.file.path;

    const Updateproduct = {
      name: name,
      category: category,
      weight: weight,
      description: description,
      image: path2,
    };

    const result = await Product.findByIdAndUpdate(id, Updateproduct);

    if (!result) {
      return res.status(404).send({ message: "Product Not Find !" });
    }

    return res.status(200).send({ message: "Product Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateProductPriceAndQty = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Product Not Find !" });
    }

    return res.status(200).send({ message: "Product Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    const path = product.image;
    if (path !== "uploads/images/No-Image-Placeholder.png") {
      fs.unlink(path, (err) => {
        console.log(err);
      });
    }
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Product Not Find !" });
    }

    return res.status(200).send({ message: "Product Deleted Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.createProduct = createProduct;
exports.listProduct = listProduct;
exports.UpdateProduct = UpdateProduct;
exports.listProductById = listProductById;
exports.DeleteProduct = DeleteProduct;
exports.UpdateProductPriceAndQty = UpdateProductPriceAndQty; 