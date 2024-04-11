const Supplier = require("../Models/SupplierModel");
const fs = require("fs");

const createSupplier = async (req, res, next) => {
  const { name, telephone, mail, address, city} = req.body;

  console.log(name)

  const latestSupplier = await Supplier.find().sort({ _id: -1 }).limit(1);
  let id;

  if (latestSupplier.length !==0) {
    const latestId = parseInt(latestSupplier[0].ID.slice(1)); 
    id = "S" + String(latestId + 1).padStart(4, "0"); 
  } else {
    id = "S0001"; 
  }

  let path = 'uploads/images/No-Image-Placeholder.png' 
  if(req.file && req.file.path )
    path = req.file.path

  const newSupplier = {
    ID: id,
    name: name,
    telephone: telephone,
    mail: mail,
    address: address,
    city: city,
    image: path,
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
      const supplier = await Supplier.findById(id);

      const path = supplier.image;
      if(path !== 'uploads/images/No-Image-Placeholder.png'){
        fs.unlink(path, err => {
          console.log(err)
        })
      }
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
