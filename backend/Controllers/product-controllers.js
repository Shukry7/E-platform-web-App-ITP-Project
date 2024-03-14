const HttpError = require("../Models/http-error");
const Product = require("../Models/ProductModel");
const uuid = require("uuid");

const createProduct = async (req, res, next) => {
  const { id, name, category, quantity, price, weight, description } = req.body;

  const newProduct = {
    ID: id,
    name: name,
    category: category,
    quantity: quantity,
    price: price,
    weight: weight,
    description: description,
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
    const { id } = req.params;
    const product = await Product.findById(id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateProduct = async (req, res) => {
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

const DeleteProduct =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await Product.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'Product Not Find !' });
      }

      return res.status(200).send({ message: 'Product Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};

exports.createProduct = createProduct;
exports.listProduct = listProduct;
exports.UpdateProduct = UpdateProduct;
exports.listProductById = listProductById;
exports.DeleteProduct = DeleteProduct;
