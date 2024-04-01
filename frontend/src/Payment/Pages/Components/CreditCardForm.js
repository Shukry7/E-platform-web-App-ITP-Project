import React, { useState } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";

const Category = [
  { value: "...." },
  { value: "VISA" },
  { value: "Mastercard" },
  
];

const CCForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      firstname: {
        value: "",
        isValid: false,
      },
      lastname: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      cvv: {
        value: "",
        isValid: false,
      },
      expiredate: {
        value: "",
        isValid: false,
      },
      number: {
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
      .post("http://localhost:5000/credit/new", {
        id: 1,
        firstname: formState.inputs.firstname.value,
        lastname: formState.inputs.lastname.value,
        cvv: formState.inputs.cvv.value,
        category: formState.inputs.category.value,
        expiredate: formState.inputs.expiredate.value,
        number: formState.inputs.number.value,
        
      })
      .then((res) => {
        setLoading(false);
        navigate("/Product/");
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
          <h2 style={{ textAlign: "center" }}>Add Product</h2>
          <Input
            element="Input"
            id="fname"
            type="text"
            placeholder="Enter First Name"
            label="First Name :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a Name."
            onInput={inputHandler}
          />
           <Input
            element="Input"
            id="lname"
            type="text"
            placeholder="Enter Last Name"
            label="Last Name :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a Name."
            onInput={inputHandler}
          />
          <Dropdown
            id="category"
            options={Category}
            onInput={inputHandler}
            Display=""
            label="Category:"
          />
           <Input
            element="Input"
            id="number"
            type="text"
            placeholder="Enter Card Number"
            label="Card Number :"
            validators={[VALIDATOR_MINLENGTH(16), VALIDATOR_MAXLENGTH(16)]}
            errorText="Please enter correct card number"
            onInput={inputHandler}
          />
          <Input
            element="Input"
            id="cvv"
            type="text"
            placeholder="Enter CVV"
            label="CVV :"
            validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(4)]}
            errorText="Please Enter your cvv"
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

export default CCForm;
export { Category };