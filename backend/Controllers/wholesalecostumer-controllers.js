const HttpError = require("../Models/http-error");
const uuid = require("uuid");
const Wholesalecostumer = require("../Models/WholesalecostumerModel");

// get details from body and assigned to variables
const createWholesalecostumer = async (req, res, next) => {
  const { id, name, address, telephone, email, creditlimit } = req.body;

  const newWholesalecostumer = {
    ID: id,
    name: name,
    address: address,
    telephone: telephone,
    email: email,
    creditlimit: creditlimit,
  };

// new employee is created
  const wholesalecostumer = await Wholesalecostumer.create(newWholesalecostumer);
  return res.status(201).send(wholesalecostumer);
};

// responding employees
const listWholesalecostumer = async (req, res) => {
  try {
    const wholesalecostumer = await Wholesalecostumer.find({});
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listWholesalecostumerById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Wholesalecostumer.findById(id);

    return res.status(200).json(wholesalecostumer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateWholesalecostumer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "wholesalecostumer Not Find !" });
    }

    return res.status(200).send({ message: "wholesalecostumer Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteWholesalecostumer =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await Employee.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'wholesalecostumer Not Find !' });
      }

      return res.status(200).send({ message: 'wholesalecostumer Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};

exports.createWholesalecostumer = createWholesalecostumer;
exports.listWholesalecostumer = listWholesalecostumer;
exports.UpdateWholesalecostumer = UpdateWholesalecostumer;
exports.listWholesalecostumerById = listWholesalecostumerById;
exports.DeleteWholesalecostumer = DeleteWholesalecostumer;
