import React, { useState } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import ImageUpload from "../../../Shared/Components/FormElements/ImageUpload";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_PHONE,
  VALIDATOR_EMAIL,
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";


const SupplierForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      telephone: {
        value: "",
        isValid: false,
      },
      mail: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/supplier/", {
        id: 1,
        name: formState.inputs.name.value,
        telephone: formState.inputs.telephone.value,
        mail: formState.inputs.mail.value,
        address: formState.inputs.address.value,
      })
      .then((res) => {
        setLoading(false);
        navigate("/Supplier/");
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
          <h2 style={{ textAlign: "center" }}>Add Supplier</h2>
          <ImageUpload center id="image" onInput={inputHandler} />
          <Input
            element="Input"
            id="name"
            type="text"
            placeholder="Enter Supplier Name"
            label="Name :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a Name."
            onInput={inputHandler}
          />
          <Input
            element="Input"
            id="telephone"
            type="number"
            placeholder="Enter Telephone Number"
            label="Telephone :"
            validators={[VALIDATOR_PHONE]}
            errorText="Please Enter a Phone Number (10 numbers)"
            onInput={inputHandler}
          />
          <Input
            element="Input"
            id="mail"
            type="text"
            placeholder="Enter Mail"
            label="Email :"
            validators={[VALIDATOR_EMAIL]}
            errorText="Please Enter a mail."
            onInput={inputHandler}
          />
          <Input
            element="Input"
            id="address"
            type="text"
            placeholder="Enter Address"
            label="Address :"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            errorText="Please Enter a Address."
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

export default SupplierForm;
