const HttpError = require("../Models/http-error");
const uuid = require("uuid");
const Wholesalecustomer = require("../Models/WholesalecustomerModel");

// get details from body and assigned to variables
const createWholesalecustomer = async (req, res, next) => {
  const { id, name, address, telephone, email, creditlimit, credit } = req.body;

  const newWholesalecustomer = {
    ID: id,
    name: name,
    address: address,
    telephone: telephone,
    email: email,
    creditlimit: creditlimit,
    credit: credit,
  };

// new wholesalecustomer is created
  const wholesalecustomer = await Wholesalecustomer.create(newWholesalecustomer);
  return res.status(201).send(wholesalecustomer);
};

// responding wholesalecustomers
const listWholesalecustomer = async (req, res) => {
  try {
    const wholesalecustomer = await Wholesalecustomer.find({});
    return res.status(200).json(wholesalecustomer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listWholesalecustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const wholesalecustomer = await Wholesalecustomer.findById(id);

    return res.status(200).json(wholesalecustomer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateWholesalecustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "wholesalecustomer Not Find !" });
    }

    return res.status(200).send({ message: "wholesalecustomer Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteWholesalecustomer =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await Employee.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'wholesalecustomer Not Find !' });
      }

      return res.status(200).send({ message: 'wholesalecustomer Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};

exports.createWholesalecustomer = createWholesalecustomer;
exports.listWholesalecustomer = listWholesalecustomer;
exports.UpdateWholesalecustomer = UpdateWholesalecustomer;
exports.listWholesalecustomerById = listWholesalecustomerById;
exports.DeleteWholesalecustomer = DeleteWholesalecustomer;
