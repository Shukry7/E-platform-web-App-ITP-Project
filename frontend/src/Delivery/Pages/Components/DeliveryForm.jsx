import React, { useState } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import ImageUpload from "../../../Shared/Components/FormElements/ImageUpload";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PHONE,
  VALIDATOR_EMAIL,
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";

const City = [
  { value: "...." },
  { value: "Ampara" },
  { value: "Anuradhapura" },
  { value: "Badulla" },
  { value: "Batticaloa" },
  { value: "Colombo" },
  { value: "Galle" },
  { value: "Gampaha" },
  { value: "Hambantota" },
  { value: "Jaffna" },
  { value: "Kalutara" },
  { value: "Kandy" },
  { value: "Kegalle" },
  { value: "Kilinochchi" },
  { value: "Kurunegala" },
  { value: "Mannar" },
  { value: "Matale" },
  { value: "Matara" },
  { value: "Monaragala" },
  { value: "Mullaitivu" },
  { value: "Nuwara Eliya" },
  { value: "Polonnaruwa" },
  { value: "Puttalam" },
  { value: "Ratnapura" },
  { value: "Trincomalee" },
  { value: "Vavuniya" },
];


const DeliveryForm = () => {
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
      license: {
        value: "",
        isValid: false,
      },
      numberplate: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      capacity: {
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
      .post("http://localhost:5000/delivery/", {
        id: 1,
        name: formState.inputs.name.value,
        telephone: formState.inputs.telephone.value,
        mail: formState.inputs.mail.value,
        address: formState.inputs.address.value+", "+formState.inputs.city.value,
        license: formState.inputs.license.value,
        numberplate: formState.inputs.numberplate.value,
        type: formState.inputs.type.value,
        capacity: formState.inputs.capacity.value,
      })
      .then((res) => {
        setLoading(false);
        navigate("/Delivery/");
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
          <h2 style={{ textAlign: "center" }}>Add Delivery</h2>
          <ImageUpload center id="image" onInput={inputHandler} />
          <Input
            element="Input"
            id="name"
            type="text"
            placeholder="Enter Delivery Person Name"
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
            validators={[VALIDATOR_PHONE()]}
            errorText="Please Enter a valid Phone Number (10 numbers)"
            onInput={inputHandler}
          />
          <Input
            element="Input"
            id="mail"
            type="text"
            placeholder="Enter Mail"
            label="Email :"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please Enter a valid mail."
            onInput={inputHandler}
          />
          <Input
            element="Input"
            id="address"
            type="text"
            placeholder="Enter Address"
            label="Street :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter an Address."
            onInput={inputHandler}
          />
          <Dropdown
            id="city"
            options={City}
            onInput={inputHandler}
            Display=""
            label="City:"
          />
          <Input
            element="Input"
            id="license"
            type="text"
            placeholder="Enter License Number"
            label="License Number: :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a valid License Number"
            onInput={inputHandler}
          />
           <Input
            element="Input"
            id="numberplate"
            type="text"
            placeholder="Enter Number Plate"
            label="Number Plate: :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a valid Number Plate"
            onInput={inputHandler}
          />
            <Input
            element="Type"
            id="type"
            type="text"
            placeholder="Enter Type of the Vehicle"
            label="Type of Vehicle: :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a valid type of Vehicle"
            onInput={inputHandler}
          />
           <Input
            element="Capacity"
            id="capacity"
            type="text"
            placeholder="Enter Capacity of your vehicle"
            label="Capacity of Vehicle: :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a valid capacity of your Vehicle"
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

export default DeliveryForm;
