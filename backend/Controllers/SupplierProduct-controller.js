const HttpError = require("../Models/http-error");
const SupplierProduct = require("../Models/SupplierProduct");
const uuid = require("uuid");

const createSupplierProduct = async (req, res, next) => {
  const { supplier, product, unitPrice} = req.body;

  const newSupplierProduct = {
    supplier: supplier,
    product: product,
    unitPrice: unitPrice,
  };
  

  const supplierProduct = await SupplierProduct.create(newSupplierProduct);
  return res.status(201).send(supplierProduct);
  
};


const listProductBySupplierId = async (req, res) => {
  try {
    const { id } = req.params;
    const supplierProduct = await SupplierProduct.find({ supplier: id });

    return res.status(200).json(supplierProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateSupplierProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SupplierProduct.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "SupplierProduct Not Found !" });
    }

    return res.status(200).send({ message: "SupplierProduct Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteSupplierProduct =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await SupplierProduct.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'SupplierProduct Not Found !' });
      }

      return res.status(200).send({ message: 'SupplierProduct Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};


exports.createSupplierProduct = createSupplierProduct;
exports.UpdateSupplierProduct = UpdateSupplierProduct;
exports.listProductBySupplierId = listProductBySupplierId;
exports.DeleteSupplierProduct = DeleteSupplierProduct;
