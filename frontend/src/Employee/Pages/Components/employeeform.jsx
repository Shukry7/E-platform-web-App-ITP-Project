import React, { useState } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import ImageUpload from "../../../Shared/Components/FormElements/ImageUpload";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  
  VALIDATOR_MIN,
  VALIDATOR_PHONE,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";

const Type = [
  { value: "...." },
  { value: "Sales person" },
  { value: "System Administrator" },
  { value: "Manager" },
  { value: "Store Keeper" },
  { value: "Cashier" },
  {value: "Others"},
];

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      
      address: {
        value: "",
        isValid: false,
      },
      telephone: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      hourlywage: {
        value: "",
        isValid: false,
      },
      
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/employee/new", {
        id: 1,
        name: formState.inputs.name.value,
        telephone: formState.inputs.telephone.value,
        address: formState.inputs.address.value,
        type: formState.inputs.type.value,
        hourlywage: formState.inputs.hourlywage.value,
        
      })
      .then((res) => {
        setLoading(false);
        navigate("/Employee/");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    console.log(formState);
  };

  return (
    <form onSubmit={submitHandler}>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>Add Employee</h2>
          
          <Input
            element="Input"
            id="name"
            type="text"
            placeholder="Enter Employee Name"
            label="Name :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a Name."
            onInput={inputHandler}
          />
          <Input
            element="Input"
            id="address"
            type="text"
            placeholder="Enter address"
            label="Address :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a address."
            onInput={inputHandler}
          />
        
          <Input
            id="telephone"
            type="number"
            placeholder="Enter phone number"
            label="Phone Number :"
            validators={[VALIDATOR_PHONE()]}
            errorText="Please Enter a valid Phone Number (10 numbers)"
            onInput={inputHandler}
          />
          
          <Dropdown
            id="type"
            options={Type}
            onInput={inputHandler}
            Display=""
            label="Employee Type:"
          />
          <Input
            element="Input"
            id="hourlywage"
            type="number"
            placeholder="Enter hourlywage"
            label="Hourly Wage :"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            errorText="Please Enter Hourly Wage."
            onInput={inputHandler}
          />
          <Button
            type="submit"
            style={{ left: "76%", position: "relative" }}
            disabled={!formState.isValid}
          >
            Add
          </Button>
        </>
      )}
    </form>
  );
};

export default EmployeeForm;
export { Type };
