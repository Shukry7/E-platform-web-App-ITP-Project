/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import ImageUpload from "../../../Shared/Components/FormElements/ImageUpload";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_PHONE,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Components/util/validate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "../../../Shared/hooks/form-hook";

const EmployeeformUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const Type = [
  { value: "...." },
  { value: "Sales person" },
  { value: "System Administrator" },
  { value: "Manager" },
  { value: "Store Keeper" },
  { value: "Cashier" },
  { value: "Others"},
  ];
  const [loading, setLoading] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      telephone: {
        value: "",
        isValid: false,
      },
      address: {
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/employee/update/${id}`)
      .then((res) => {
        setFormData(
          {
            name: {
              value: res.data.name,
              isValid: true,
            },
            telephone: {
              value: res.data.telephone,
              isValid: true,
            },
            address: {
              value: res.data.address,
              isValid: true,
            },
            type: {
              value: res.data.type,
              isValid: true,
            },
            hourlywage: {
              value: res.data.hourlywage,
              isValid: true,
            },
            
          },
          true
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, setFormData]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .put(`http://localhost:5000/product/update/${id}`, {
        name: formState.inputs.name.value,
        telephone: formState.inputs.telephone.value,
        address: formState.inputs.address.value,
        mail: formState.inputs.mail.value,
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
        <h1> LOADING...</h1>
      ) : (
        <>
         
          <Input
            element="Input"
            id="name"
            type="text"
            placeholder="Enter Employee Name"
            label="Name :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a Name."
            onInput={inputHandler}
            initialValue={formState.inputs.name.value}
          />
          <Input
            element="Input"
            id="address"
            type="text"
            placeholder="Enter Address"
            label="Address :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a address."
            onInput={inputHandler}
            initialValue={formState.inputs.address.value}
          />
          
          <Input
            id="telephone"
            type="number"
            placeholder="Enter Phone number"
            label="Phone Number :"
            validators={[VALIDATOR_PHONE()]}
            errorText="Please Enter a phone number(10 numbers)"
            onInput={inputHandler}
            initialValue={formState.inputs.telephone.value}
          />
          
                  <Input
                            
                            id="mail"
                            type="text"
                            placeholder="Enter email address"
                            label="Email Address :"
                            validators={[VALIDATOR_EMAIL()]}
                            errorText="Please Enter a valid EMail address"
                            onInput={inputHandler}
                            initialValue={formState.inputs.mail.value}
                          />
                        
         
         <Dropdown
            id="type"
            options={Type}
            onInput={inputHandler}
            Display=""
            label="Employee Type:"
            initialValue={formState.inputs.type.value}
          />
          <Input
            element="Input"
            id="hourlywage"
            type="number"
            placeholder="Enter hourly wage"
            label="Hourly Wage :"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            errorText="Please Enter a wage."
            onInput={inputHandler}
            initialValue={formState.inputs.hourlywage.value}
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

export default EmployeeformUpdate;
