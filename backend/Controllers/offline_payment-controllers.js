
const OffPay = require("../Models/OfflinePaymentModel");

const createProduct = async (req, res, next) => {
  const  uid  =req.body;

  

  
  let path = "uploads/images/No-Image-Placeholder.png";
  if (req.file && req.file.path) path = req.file.path;

  const newProduct = {
    UID: uid,
    image: path,
  };
  
  const product = await OffPay.create(newProduct);
  return res.status(201).send(product);
};

exports.createProduct = createProduct;
