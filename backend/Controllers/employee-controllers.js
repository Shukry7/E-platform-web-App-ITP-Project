const HttpError = require("../Models/http-error");
const Product = require("../Models/EmployeeModel");
const uuid = require("uuid");

// get details from body and assigned to variables
const createEmployee = async (req, res, next) => {
  const { id, name, address, telephone, type, wage } = req.body;

  const newEmployee = {
    ID: id,
    name: name,
    address: address,
    telephone: telephone,
    type: type,
    hourlywage: wage,
  };

// new employee is created
  const employee = await Employee.create(newEmployee);
  return res.status(201).send(employee);
};

// responding employees
const listEmployee = async (req, res) => {
  try {
    const employee = await Employee.find({});
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "employee Not Find !" });
    }

    return res.status(200).send({ message: "employee Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteEmployee =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await Employee.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'employee Not Find !' });
      }

      return res.status(200).send({ message: 'employee Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};

exports.createEmployee = createEmployee;
exports.listEmployee = listEmployee;
exports.UpdateEmployee = UpdateEmployee;
exports.listEmployeeById = listEmployeeById;
exports.DeleteEmployee = DeleteEmployee;
