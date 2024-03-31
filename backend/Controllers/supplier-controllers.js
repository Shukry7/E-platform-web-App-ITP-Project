const HttpError = require("../Models/http-error");
const Supplier = require("../Models/SupplierModel");
const uuid = require("uuid");

const createSupplier = async (req, res, next) => {
  const { id, name, telephone, mail, address} = req.body;

  const newSupplier = {
    ID: id,
    name: name,
    telephone: telephone,
    mail: mail,
    address: address,
  };

  const supplier = await Supplier.create(newSupplier);
  return res.status(201).send(supplier);
};

const listSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.find({});
    return res.status(200).json(supplier);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);

    return res.status(200).json(supplier);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Supplier.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Supplier Not Found !" });
    }

    return res.status(200).send({ message: "Supplier Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteSupplier =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await Supplier.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'Supplier Not Found !' });
      }

      return res.status(200).send({ message: 'Supplier Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};

exports.createSupplier = createSupplier;
exports.listSupplier = listSupplier;
exports.UpdateSupplier = UpdateSupplier;
exports.listSupplierById = listSupplierById;
exports.DeleteSupplier = DeleteSupplier;
