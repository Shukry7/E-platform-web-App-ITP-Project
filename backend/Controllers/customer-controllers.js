const HttpError = require("../Models/http-error");
const Customer = require("../Models/CustomerModel");
const uuid = require("uuid");

const createCustomer = async (req, res, next) => {
  const { name, telephone, mail, address, city, password} = req.body;

  const latestCustomer = await Customer.find().sort({ _id: -1 }).limit(1);
  let id;

  if (latestCustomer.length !==0) {
    const latestId = parseInt(latestCustomer[0].ID.slice(1)); 
    id = "C" + String(latestId + 1).padStart(4, "0"); 
  } else {
    id = "C0001"; 
  }

  const newCustomer = {
    ID: id,
    name: name,
    telephone: telephone,
    mail: mail,
    address: address,
    city: city,
    password: password,
  };
  

  const customer = await Customer.create(newCustomer);
  return res.status(201).send(customer);
  
};

const listCustomer = async (req, res) => {
  try {
    const customer = await Customer.find({});
    return res.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Customer.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Customer Not Found !" });
    }

    return res.status(200).send({ message: "Customer Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteCustomer =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await Customer.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'Customer Not Found !' });
      }

      return res.status(200).send({ message: 'Customer Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};


exports.createCustomer = createCustomer;
exports.listCustomer = listCustomer;
exports.UpdateCustomer = UpdateCustomer;
exports.listCustomerById = listCustomerById;
exports.DeleteCustomer = DeleteCustomer;